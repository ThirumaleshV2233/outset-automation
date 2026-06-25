const { expect } = require('@playwright/test');
const HomepageLocators = require('./Locators/HomepageLocators');

/**
 * Homepage – Page-object for the main landing page of theoutset.com.
 *
 * Encapsulates navigation, interaction, and assertion helpers for
 * the header, hero, product carousel, marquee, search, cart, and
 * mobile-menu sections.
 */
class Homepage {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    // ─── Navigation ─────────────────────────────────────────────────────────

    /** Navigate to the homepage and wait for DOM content to load. */
    async navigate() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    // ─── Page-Level Assertions ──────────────────────────────────────────────

    /** Verify the page title contains "The Outset" and URL is correct. */
    async verifyPageTitleAndURL() {
        await expect(this.page).toHaveTitle(/The Outset/i);
        await expect(this.page).toHaveURL(/theoutset\.com/);
    }

    /** Verify header, hero section, and main content area are rendered. */
    async verifyCriticalSectionsLoaded() {
        await expect(this.page.locator(HomepageLocators.header)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.heroSection)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.mainContent)).toBeVisible();
    }

    // ─── Promo Bar ──────────────────────────────────────────────────────────

    /** Verify the promo/announcement bar is visible with free shipping text. */
    async verifyPromoBar() {
        await expect(this.page.locator(HomepageLocators.promoBar)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.promoBarText))
            .toContainText('Free Shipping');
    }

    // ─── Header & Logo ──────────────────────────────────────────────────────

    /** Verify the site header is visible. */
    async verifyHeaderIsVisible() {
        await expect(this.page.locator(HomepageLocators.header)).toBeVisible();
    }

    /** Verify the logo image is rendered and visible. */
    async verifyLogoIsVisible() {
        await expect(this.page.locator(HomepageLocators.logoImage)).toBeVisible();
    }

    /** Click the logo to navigate back to the homepage. */
    async clickLogo() {
        await this.page.locator(HomepageLocators.logo).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Primary Nav Links ──────────────────────────────────────────────────

    /** Verify all primary desktop navigation links are visible. */
    async verifyAllNavLinksVisible() {
        await expect(this.page.locator(HomepageLocators.bestSellersLink).first()).toBeVisible();
        await expect(this.page.locator(HomepageLocators.skincareLink).first()).toBeVisible();
        await expect(this.page.locator(HomepageLocators.lipOasisLink).first()).toBeVisible();
        await expect(this.page.locator(HomepageLocators.scarlettRoutineLink).first()).toBeVisible();
        await expect(this.page.locator(HomepageLocators.aboutUsLink).first()).toBeVisible();
    }

    /** Click the "Best Sellers" nav link. */
    async clickBestSellers() {
        await this.page.locator(HomepageLocators.bestSellersLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Hover over the "Skincare" nav link to open its mega-menu. */
    async hoverSkincare() {
        await this.page.locator(HomepageLocators.skincareLink).first().hover();
    }

    /** Hover over the "About Us" nav link to open its mega-menu. */
    async hoverAboutUs() {
        await this.page.locator(HomepageLocators.aboutUsLink).first().hover();
    }

    /** Click the "Scarlett's Routine" nav link. */
    async clickScarlettRoutine() {
        await this.page.locator(HomepageLocators.scarlettRoutineLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Search ─────────────────────────────────────────────────────────────

    /** Open the search overlay by clicking the search icon. */
    async openSearch() {
        await this.page.locator(HomepageLocators.searchToggleBtn).click();
        await expect(this.page.locator(HomepageLocators.searchContainer)).toBeVisible();
    }

    /**
     * Open search, type a term, submit, and wait for results page.
     * @param {string} term – The search query
     */
    async searchFor(term) {
        await this.openSearch();
        const searchInput = this.page.locator(HomepageLocators.searchInput);
        await searchInput.waitFor({ state: 'visible', timeout: 5000 });
        await searchInput.fill(term);
        await this.page.locator(HomepageLocators.searchSubmitBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Cart ───────────────────────────────────────────────────────────────

    /**
     * Verify the cart badge shows the expected item count.
     * @param {string} expected – Expected count text (default '0')
     */
    async verifyCartCount(expected = '0') {
        await expect(this.page.locator(HomepageLocators.cartCountBadge)).toHaveText(expected);
    }

    /** Click the mini-cart icon button. */
    async clickMiniCart() {
        await this.page.locator(HomepageLocators.miniCartBtn).click();
    }

    // ─── Hero Section ───────────────────────────────────────────────────────

    /** Verify the hero section, description, and Shop Now button are visible. */
    async verifyHeroSection() {
        await expect(this.page.locator(HomepageLocators.heroSection)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.heroDescription)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.heroShopNowBtn).first())
            .toContainText(/Shop Now/i);
    }

    /** Click the hero "Shop Now" CTA and wait for navigation. */
    async clickHeroShopNow() {
        await this.page.locator(HomepageLocators.heroShopNowBtn).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Marquee / Ticker Strip ─────────────────────────────────────────────

    /** Verify the marquee section is visible and contains items. */
    async verifyMarqueeSection() {
        await expect(this.page.locator(HomepageLocators.marqueeSection)).toBeVisible();
        const count = await this.page.locator(HomepageLocators.marqueeItems).count();
        expect(count).toBeGreaterThan(0);
    }

    // ─── Product Carousel ───────────────────────────────────────────────────

    /** Verify the product carousel section is visible with product cards. */
    async verifyProductCarousel() {
        await expect(this.page.locator(HomepageLocators.productCarouselSection)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.productCarouselTitle))
            .toBeVisible();
        const cards = await this.page.locator(HomepageLocators.productCards).count();
        expect(cards).toBeGreaterThan(0);
    }

    /** Click the first product card title link to navigate to PDP. */
    async clickFirstProductCard() {
        await this.page.locator(HomepageLocators.productCardTitle).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Hover the first product card and click the Add to Bag button. */
    async clickAddToBagOnFirstProduct() {
        await this.page.locator(HomepageLocators.productCards).first().hover();
        await this.page.locator(HomepageLocators.addToBagBtn).first().click();
    }

    // ─── Footer Newsletter ──────────────────────────────────────────────────

    /** Verify the footer newsletter form is visible. */
    async verifyFooterNewsletterForm() {
        await expect(this.page.locator(HomepageLocators.footerNewsletterForm)).toBeVisible();
    }

    /**
     * Subscribe via the footer newsletter form.
     * @param {string} email
     */
    async subscribeToNewsletter(email) {
        const input = this.page.locator(HomepageLocators.footerEmailInput);
        await input.scrollIntoViewIfNeeded();
        await input.fill(email);
        await this.page.locator(HomepageLocators.footerSubmitBtn).click();
    }

    // ─── Mobile Menu ────────────────────────────────────────────────────────

    /** Open the mobile hamburger menu and verify it becomes visible. */
    async openMobileMenu() {
        await this.page.locator(HomepageLocators.openMenuBtn).click();
        await expect(this.page.locator(HomepageLocators.navMenuWrapper)).toBeVisible();
    }

    /** Close the mobile hamburger menu. */
    async closeMobileMenu() {
        await this.page.locator(HomepageLocators.closeMenuBtn).click();
    }

}

module.exports = Homepage;
