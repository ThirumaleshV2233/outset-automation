const { test, expect } = require('@playwright/test');
const Navbar = require('../Pages/components/Navbar');
const Homepage = require('../Pages/Homepage');
const PopupPage = require('../Pages/PopupPage');

// ─────────────────────────────────────────────────────────────────────────────
//  The Outset – Homepage Navbar Test Suite
//
//  Tests header layout, logo navigation, primary desktop nav links,
//  hover mega-menus (Skincare & About Us), search overlay, cart count,
//  and mobile viewport navigation using the modular Navbar component.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('The Outset – Homepage Navbar', () => {

    let navbar;
    let homepage;
    let popup;

    test.beforeEach(async ({ page }) => {
        navbar = new Navbar(page);
        homepage = new Homepage(page);
        popup = new PopupPage(page);

        await homepage.navigate();
        // Dismiss the Klaviyo popup if visible so it never blocks UI elements
        await popup.closePopupIfVisible();
    });

    test('should display site header, logo, and all primary desktop navigation links', async () => {
        await navbar.verifyHeaderIsVisible();
        await navbar.verifyLogoIsVisible();
        await navbar.verifyAllNavLinksVisible();
    });

    test('should navigate back to the homepage when clicking the logo from another collection page', async ({ page }) => {
        await navbar.clickBestSellers();
        await expect(page).toHaveURL(/collections\/best-sellers/);

        await navbar.clickLogo();
        await expect(page).toHaveURL(/theoutset\.com\/?$/);
    });

    test('should navigate to the Best Sellers collection when clicking the nav link', async ({ page }) => {
        await homepage.clickBestSellers();
        await expect(page).toHaveURL(/collections\/best-sellers/);
        await expect(page).toHaveTitle(/Best Sellers/i);
    });

    test('should open the Skincare mega-menu on hover and display sub-category links', async ({ page }) => {
        await homepage.hoverSkincare();

        const submenu = page.locator('.menu-item__submenu');
        await expect(submenu).toBeVisible();

        // Verify key sub-category links are present
        await expect(submenu.locator('a[href="/collections/cleansers-exfoliators"]')).toBeVisible();
        await expect(submenu.locator('a[href="/collections/serums-oils"]')).toBeVisible();
        await expect(submenu.locator('a[href="/collections/moisturizers-masks"]')).toBeVisible();
        await expect(submenu.locator('a[href="/collections/travel-size"]')).toBeVisible();
    });

    test('should open search, accept a query, and navigate to the results page', async ({ page }) => {
        await homepage.searchFor('sunscreen');

        await expect(page).toHaveURL(/search.*q=sunscreen/);
        // The search results page should not be a 404
        await expect(page.locator('body')).not.toContainText('404');
    });

    test('should display product cards with titles, images, and a quick-add button on hover', async ({ page }) => {
        await homepage.verifyProductCarousel();

        // Hover the first product card to reveal the Add to Bag button
        const firstCard = page.locator('.product-card').first();
        await firstCard.hover();
        await expect(firstCard.locator('button.quick-add-to-cart__button'))
            .toBeVisible();
    });

    test('should navigate to the product detail page when clicking a product card title', async ({ page }) => {
        const firstTitleLocator = page.locator('.product-card__title a').first();
        const productName = await firstTitleLocator.innerText();

        await homepage.clickFirstProductCard();
        await expect(page).not.toHaveURL(/theoutset\.com\/?$/);

        // PDP title should contain part of the product name
        const firstWord = productName.trim().split(' ')[0];
        await expect(page).toHaveTitle(new RegExp(firstWord, 'i'));
    });

    test('should show a cart count of 0 for guest users', async ({ page }) => {
        await homepage.verifyCartCount('0');
    });

    test('should navigate to the Scarlett\'s Routine page when clicking the nav link', async ({ page }) => {
        await navbar.clickScarlettRoutine();
        await expect(page).toHaveURL(/scarlett-johansson-skincare-routine/);
    });

    test('should open the Skincare mega-menu on hover and display sub-category links and spotlight items', async () => {
        await navbar.verifySkincareSubmenu();
    });

    test('should open the About Us mega-menu on hover with sub-category links', async ({ page }) => {
        await navbar.hoverAboutUs();

        await expect(page.locator('a[href="/pages/hyaluroset-complex"]').first()).toBeVisible();
        await expect(page.locator('a[href="/pages/ingredient-list"]').first()).toBeVisible();
        await expect(page.locator('a[href="/pages/sensitive-skin"]').first()).toBeVisible();
    });

    test('should open the About Us mega-menu on hover with sub-links', async ({ page }) => {
        await homepage.hoverAboutUs();
        await expect(page.locator('a[href="/pages/hyaluroset-complex"]')).toBeVisible();
        await expect(page.locator('a[href="/pages/ingredient-list"]')).toBeVisible();
        await expect(page.locator('a[href="/pages/sensitive-skin"]')).toBeVisible();
    });

    test('should open and close the mobile hamburger menu on a mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 }); // iPhone viewport
        await navbar.openMobileMenu();
        await expect(page.locator('#navMenuWrapper')).toBeVisible();

        await navbar.closeMobileMenu();
        await expect(page.locator('#navMenuWrapper')).not.toBeVisible();
    });

    test('should display Instagram and TikTok social links in the mobile menu', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await homepage.openMobileMenu();

        await expect(page.locator('a[href="https://www.instagram.com/theoutset/"]'))
            .toBeVisible();
        await expect(page.locator('a[href="https://www.tiktok.com/@theoutset"]'))
            .toBeVisible();
    });

    test('should display the "Free Shipping" message in the promo bar', async ({ page }) => {
        await expect(page.locator('.promo-bar .swiper-slide-active p'))
            .toContainText('Free Shipping');
    });

    test('should have a privacy policy link with correct href and target="_blank" in the popup', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://theoutset.com', { waitUntil: 'domcontentloaded' });

        const freshPopup = new PopupPage(page);
        await freshPopup.verifyPopupIsVisible();
        await freshPopup.verifyPrivacyPolicyLink();

        await context.close();
    });

    test('should display the disclaimer consent text in the popup', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://theoutset.com', { waitUntil: 'domcontentloaded' });

        const freshPopup = new PopupPage(page);
        await freshPopup.verifyPopupIsVisible();
        await freshPopup.verifyDisclaimerText();

        await context.close();
    });

});

});
