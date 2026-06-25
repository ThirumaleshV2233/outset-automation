const { test, expect } = require('@playwright/test');
const Homepage  = require('../Pages/Homepage');
const PopupPage = require('../Pages/PopupPage');

// ─────────────────────────────────────────────────────────────────────────────
//  The Outset – Homepage E2E Test Suite
//  Priority: P0 = Critical | P1 = High | P2 = Medium
// ─────────────────────────────────────────────────────────────────────────────

test.describe('The Outset – Homepage', () => {

    let homepage;
    let popup;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        popup    = new PopupPage(page);
        await homepage.navigate();
        // Close newsletter popup before every test so it never blocks assertions
        await popup.closePopupIfVisible();
    });

    // =========================================================================
    //  P0 | CRITICAL — must pass before any release
    // =========================================================================

    test.describe('P0 | Critical', () => {

        test('Homepage loads with correct title, URL and critical sections', async ({ page }) => {
            await homepage.verifyPageTitleAndURL();
            await homepage.verifyCriticalSectionsLoaded();
            await homepage.verifyLogoIsVisible();
            await homepage.verifyPromoBar();
        });

        test('Newsletter popup appears on fresh visit and dismisses via "No Thanks"', async ({ page }) => {
            // Reload to get fresh popup trigger
            await page.reload({ waitUntil: 'domcontentloaded' });
            const freshPopup = new PopupPage(page);

            // Popup must be visible with all key elements
            await freshPopup.verifyPopupIsVisible();
            await freshPopup.verifyPopupHeading();
            await freshPopup.verifyEmailInput();
            await freshPopup.verifyUnlockBtn();
            await freshPopup.verifyNoThanksBtn();

            // Dismiss and confirm it's gone
            await freshPopup.closePopupIfVisible();
            await expect(page.locator('form[data-testid="klaviyo-form-WWMLkr"]')).not.toBeVisible();
        });

        test('Hero banner is visible and "Shop Now" CTA navigates to correct product page', async ({ page }) => {
            await homepage.verifyHeroSection();
            await homepage.clickHeroShopNow();
            await expect(page).toHaveURL(/hydrasheer-mineral-sunscreen-spf-30/);
            await expect(page).not.toHaveURL('/');
        });

        test('All primary navigation links are rendered and accessible', async ({ page }) => {
            await homepage.verifyAllNavLinksVisible();
        });

    });

    // =========================================================================
    //  P1 | HIGH — core user journeys
    // =========================================================================

    test.describe('P1 | High Priority', () => {

        test('Logo click redirects back to homepage from any state', async ({ page }) => {
            // Navigate away then click logo to return
            await homepage.clickBestSellers();
            await expect(page).toHaveURL(/collections\/best-sellers/);
            await homepage.clickLogo();
            await expect(page).toHaveURL(/theoutset\.com\/?$/);
        });

        test('"Best Sellers" nav link navigates to the Best Sellers collection', async ({ page }) => {
            await homepage.clickBestSellers();
            await expect(page).toHaveURL(/collections\/best-sellers/);
            await expect(page).toHaveTitle(/Best Sellers/i);
        });

        test('Skincare mega-menu opens on hover and displays all sub-links', async ({ page }) => {
            await homepage.hoverSkincare();
            const submenu = page.locator('.menu-item__submenu');
            await expect(submenu).toBeVisible();

            // Verify key sub-category links are present inside the submenu
            await expect(submenu.locator('a[href="/collections/cleansers-exfoliators"]')).toBeVisible();
            await expect(submenu.locator('a[href="/collections/serums-oils"]')).toBeVisible();
            await expect(submenu.locator('a[href="/collections/moisturizers-masks"]')).toBeVisible();
            await expect(submenu.locator('a[href="/collections/travel-size"]')).toBeVisible();
        });

        test('Search bar opens, accepts input, and returns results page', async ({ page }) => {
            await homepage.searchFor('sunscreen');
            await expect(page).toHaveURL(/search.*q=sunscreen/);
            // Search results page should not 404
            await expect(page.locator('body')).not.toContainText('404');
        });

        test('Product carousel renders cards with title, image, and Add to Bag button', async ({ page }) => {
            await homepage.verifyProductCarousel();
            // Hover first card to reveal Add to Bag button, then verify it is clickable
            const firstCard = page.locator('.product-card').first();
            await firstCard.hover();
            await expect(firstCard.locator('button.quick-add-to-cart__button')).toBeVisible();
        });

        test('Clicking a product card title navigates to the product detail page', async ({ page }) => {
            const firstProductTitle = await page.locator('.product-card__title a').first().innerText();
            await homepage.clickFirstProductCard();
            await expect(page).not.toHaveURL(/theoutset\.com\/?$/);
            // PDP should contain the product name in the title
            await expect(page).toHaveTitle(new RegExp(firstProductTitle.trim().split(' ')[0], 'i'));
        });

        test('Cart icon shows 0 items by default for a guest user', async ({ page }) => {
            await homepage.verifyCartCount('0');
        });

        test('"Scarlett\'s Routine" nav link navigates to the correct page', async ({ page }) => {
            await homepage.clickScarlettRoutine();
            await expect(page).toHaveURL(/scarlett-johansson-skincare-routine/);
        });

    });

    // =========================================================================
    //  P2 | MEDIUM — secondary UX & visual checks
    // =========================================================================

    test.describe('P2 | Medium Priority', () => {

        test('Marquee strip is visible and displays product claim badges', async ({ page }) => {
            await homepage.verifyMarqueeSection();
            // Verify specific claims are rendered in the ticker
            const texts = page.locator('.marquee__content-text');
            await expect(texts.filter({ hasText: 'VEGAN' }).first()).toBeVisible();
            await expect(texts.filter({ hasText: 'CRUELTY FREE' }).first()).toBeVisible();
            await expect(texts.filter({ hasText: 'FRAGRANCE FREE' }).first()).toBeVisible();
        });

        test('About Us mega-menu opens on hover with correct sub-links', async ({ page }) => {
            await homepage.hoverAboutUs();
            await expect(page.locator('a[href="/pages/hyaluroset-complex"]')).toBeVisible();
            await expect(page.locator('a[href="/pages/ingredient-list"]')).toBeVisible();
            await expect(page.locator('a[href="/pages/sensitive-skin"]')).toBeVisible();
        });

        test('Mobile hamburger menu opens and closes correctly', async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
            await homepage.openMobileMenu();
            await expect(page.locator('#navMenuWrapper')).toBeVisible();
            await homepage.closeMobileMenu();
            await expect(page.locator('#navMenuWrapper')).not.toBeVisible();
        });

        test('Mobile menu footer contains Instagram and TikTok social links', async ({ page }) => {
            await page.setViewportSize({ width: 390, height: 844 });
            await homepage.openMobileMenu();
            await expect(page.locator('a[href="https://www.instagram.com/theoutset/"]')).toBeVisible();
            await expect(page.locator('a[href="https://www.tiktok.com/@theoutset"]')).toBeVisible();
        });

        test('Promo bar "Free Shipping" message is visible for US visitors', async ({ page }) => {
            await expect(page.locator('.promo-bar .swiper-slide-active p'))
                .toContainText('Free Shipping');
        });

        test('Newsletter popup privacy policy link has correct href', async ({ page }) => {
            await page.reload({ waitUntil: 'domcontentloaded' });
            const freshPopup = new PopupPage(page);
            await freshPopup.verifyPopupIsVisible();
            await expect(page.locator('a[href="https://theoutset.com/policies/privacy-policy"]'))
                .toHaveAttribute('target', '_blank');
        });

    });

});
