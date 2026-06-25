const { test, expect } = require('@playwright/test');
const Homepage  = require('../Pages/Homepage');
const PopupPage = require('../Pages/PopupPage');

// ─────────────────────────────────────────────────────────────────────────────
//  The Outset – Homepage End-to-End Test Suite
//
//  Priority levels:
//    P0 = Critical  – must pass before any release
//    P1 = High      – core user journeys
//    P2 = Medium    – secondary UX & visual checks
//
//  Popup tests use a fresh browser context (no cookies/storage) so the
//  Klaviyo popup always appears as if it's a brand-new visitor.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('The Outset – Homepage', () => {

    let homepage;
    let popup;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        popup    = new PopupPage(page);
        await homepage.navigate();
        // Dismiss the Klaviyo popup before every test so it never blocks UI
        await popup.closePopupIfVisible();
    });

    // =========================================================================
    //  P0 | CRITICAL — must pass before any release
    // =========================================================================

    test.describe('P0 | Critical', () => {

        test('should load the homepage with correct title, URL, and all critical sections visible', async ({ page }) => {
            await homepage.verifyPageTitleAndURL();
            await homepage.verifyCriticalSectionsLoaded();
            await homepage.verifyLogoIsVisible();
            await homepage.verifyPromoBar();
        });

        test('should display the Klaviyo newsletter popup with all required elements on a fresh visit', async ({ browser }) => {
            // Fresh context = brand-new visitor, popup will always appear
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://theoutset.com', { waitUntil: 'domcontentloaded' });

            const freshPopup = new PopupPage(page);

            await freshPopup.verifyPopupIsVisible();
            await freshPopup.verifyFormIsVisible();
            await freshPopup.verifyPopupHeading();
            await freshPopup.verifyHeadingText('15% OFF');
            await freshPopup.verifyEmailInput();
            await freshPopup.verifyUnlockBtn();
            await freshPopup.verifyNoThanksBtn();
            await freshPopup.verifyCloseBtn();
            await freshPopup.verifyPopupImage();

            await context.close();
        });

        test('should dismiss the newsletter popup when clicking "No Thanks" and verify it disappears', async ({ browser }) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://theoutset.com', { waitUntil: 'domcontentloaded' });

            const freshPopup = new PopupPage(page);
            await freshPopup.verifyPopupIsVisible();
            await freshPopup.closeViaNoThanks();

            await expect(page.locator('[data-testid="POPUP"]')).not.toBeVisible();
            await context.close();
        });

        test('should dismiss the newsletter popup when clicking the X close button', async ({ browser }) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://theoutset.com', { waitUntil: 'domcontentloaded' });

            const freshPopup = new PopupPage(page);
            await freshPopup.verifyPopupIsVisible();
            await freshPopup.closeViaXButton();

            await expect(page.locator('[data-testid="POPUP"]')).not.toBeVisible();
            await context.close();
        });

        test('should navigate to the sunscreen product page when clicking the hero "Shop Now" CTA', async ({ page }) => {
            await homepage.verifyHeroSection();
            await homepage.clickHeroShopNow();

            await expect(page).toHaveURL(/hydrasheer-mineral-sunscreen-spf-30/);
            await expect(page).not.toHaveURL(/theoutset\.com\/?$/);
        });

        test('should render all primary desktop navigation links', async ({ page }) => {
            await homepage.verifyAllNavLinksVisible();
        });

    });

    // =========================================================================
    //  P1 | HIGH — core user journeys
    // =========================================================================

    test.describe('P1 | High Priority', () => {

        test('should navigate back to the homepage when clicking the logo from another page', async ({ page }) => {
            // Navigate away first
            await homepage.clickBestSellers();
            await expect(page).toHaveURL(/collections\/best-sellers/);

            // Click logo to return
            await homepage.clickLogo();
            await expect(page).toHaveURL(/theoutset\.com\/?$/);
        });

        test('should navigate to the Best Sellers collection when clicking the nav link', async ({ page }) => {
            await homepage.clickBestSellers();
            await expect(page).toHaveURL(/collections\/best-sellers/);
            await expect(page).toHaveTitle(/Best Sellers/i);
        });

        test('should open the Skincare mega-menu on hover and display sub-category links', async ({ page }) => {
            await homepage.hoverSkincare();

            const submenu = page.locator('.menu-item__submenu').first();
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
            await expect(firstCard.locator('button.quick-add-to-cart__button').first())
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
            await homepage.clickScarlettRoutine();
            await expect(page).toHaveURL(/scarlett-johansson-skincare-routine/);
        });

    });

    // =========================================================================
    //  P2 | MEDIUM — secondary UX & visual checks
    // =========================================================================

    test.describe('P2 | Medium Priority', () => {

        test('should display the marquee ticker strip with VEGAN, CRUELTY FREE, and FRAGRANCE FREE badges', async ({ page }) => {
            await homepage.verifyMarqueeSection();

            const badges = page.locator('.marquee__content-text');
            await expect(badges.filter({ hasText: 'VEGAN' }).first()).toBeVisible();
            await expect(badges.filter({ hasText: 'CRUELTY FREE' }).first()).toBeVisible();
            await expect(badges.filter({ hasText: 'FRAGRANCE FREE' }).first()).toBeVisible();
        });

        test('should open the About Us mega-menu on hover with sub-links', async ({ page }) => {
            await homepage.hoverAboutUs();
            await expect(page.locator('a[href="/pages/hyaluroset-complex"]').first()).toBeVisible();
            await expect(page.locator('a[href="/pages/ingredient-list"]').first()).toBeVisible();
            await expect(page.locator('a[href="/pages/sensitive-skin"]').first()).toBeVisible();
        });

        test('should open and close the mobile hamburger menu on a mobile viewport', async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
            await homepage.openMobileMenu();
            await expect(page.locator('#navMenuWrapper')).toBeVisible();

            await homepage.closeMobileMenu();
            await expect(page.locator('#navMenuWrapper')).not.toBeVisible();
        });

        test('should display Instagram and TikTok social links in the mobile menu', async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 844 });
            await homepage.openMobileMenu();
 
            await expect(page.locator('#navMenuWrapper').locator('a[href="https://www.instagram.com/theoutset/"]').first())
                .toBeVisible();
            await expect(page.locator('#navMenuWrapper').locator('a[href="https://www.tiktok.com/@theoutset"]').first())
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
