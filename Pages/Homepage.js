const { expect } = require('@playwright/test');
const HomePageLocators = require('../Locators/HomePageLocators');

class Homepage {

    constructor(page) {
        this.page = page;
    }

    // ─── Navigation ──────────────────────────────────────────────────────────

    async navigate() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    // ─── Page-Level ──────────────────────────────────────────────────────────

    async verifyPageTitleAndURL() {
        await expect(this.page).toHaveTitle(/The Outset/i);
        await expect(this.page).toHaveURL(/theoutset\.com/);
    }

    async verifyCriticalSectionsLoaded() {
        await expect(this.page.locator(HomePageLocators.header)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.heroSection)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.mainContent)).toBeVisible();
    }

    // ─── Promo Bar ───────────────────────────────────────────────────────────

    async verifyPromoBar() {
        await expect(this.page.locator(HomePageLocators.promoBar)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.promoBarText))
            .toContainText('Free Shipping');
    }

    // ─── Header & Logo ────────────────────────────────────────────────────────

    async verifyHeaderIsVisible() {
        await expect(this.page.locator(HomePageLocators.header)).toBeVisible();
    }

    async verifyLogoIsVisible() {
        await expect(this.page.locator(HomePageLocators.logoImage)).toBeVisible();
    }

    async clickLogo() {
        await this.page.locator(HomePageLocators.logo).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Primary Nav Links ────────────────────────────────────────────────────

    async verifyAllNavLinksVisible() {
        await expect(this.page.locator(HomePageLocators.bestSellersLink).first()).toBeVisible();
        await expect(this.page.locator(HomePageLocators.skincareLink).first()).toBeVisible();
        await expect(this.page.locator(HomePageLocators.lipOasisLink).first()).toBeVisible();
        await expect(this.page.locator(HomePageLocators.scarlettRoutineLink).first()).toBeVisible();
        await expect(this.page.locator(HomePageLocators.aboutUsLink).first()).toBeVisible();
    }

    async clickBestSellers() {
        await this.page.locator(HomePageLocators.bestSellersLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async hoverSkincare() {
        await this.page.locator(HomePageLocators.skincareLink).first().hover();
    }

    async hoverAboutUs() {
        await this.page.locator(HomePageLocators.aboutUsLink).first().hover();
    }

    async clickScarlettRoutine() {
        await this.page.locator(HomePageLocators.scarlettRoutineLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Search ───────────────────────────────────────────────────────────────

    async openSearch() {
        await this.page.locator(HomePageLocators.searchToggleBtn).click();
        await expect(this.page.locator(HomePageLocators.searchContainer)).toBeVisible();
    }

    async searchFor(term) {
        await this.openSearch();
        await this.page.locator(HomePageLocators.searchInput).fill(term);
        await this.page.locator(HomePageLocators.searchSubmitBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Cart ─────────────────────────────────────────────────────────────────

    async verifyCartCount(expected = '0') {
        await expect(this.page.locator(HomePageLocators.cartCountBadge)).toHaveText(expected);
    }

    async clickMiniCart() {
        await this.page.locator(HomePageLocators.miniCartBtn).click();
    }

    // ─── Hero Section ─────────────────────────────────────────────────────────

    async verifyHeroSection() {
        await expect(this.page.locator(HomePageLocators.heroSection)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.heroDescription)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.heroShopNowBtn)).toContainText('Shop Now');
    }

    async clickHeroShopNow() {
        await this.page.locator(HomePageLocators.heroShopNowBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Marquee Strip ────────────────────────────────────────────────────────

    async verifyMarqueeSection() {
        await expect(this.page.locator(HomePageLocators.marqueeSection)).toBeVisible();
        const count = await this.page.locator(HomePageLocators.marqueeItems).count();
        expect(count).toBeGreaterThan(0);
    }

    // ─── Product Carousel ─────────────────────────────────────────────────────

    async verifyProductCarousel() {
        await expect(this.page.locator(HomePageLocators.productCarouselSection)).toBeVisible();
        await expect(this.page.locator(HomePageLocators.productCarouselTitle))
            .toContainText('Discover Hydrating Skincare');
        const cards = await this.page.locator(HomePageLocators.productCards).count();
        expect(cards).toBeGreaterThan(0);
    }

    async clickFirstProductCard() {
        await this.page.locator(HomePageLocators.productCardTitle).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickAddToBagOnFirstProduct() {
        await this.page.locator(HomePageLocators.productCards).first().hover();
        await this.page.locator(HomePageLocators.addToBagBtn).first().click();
    }

    // ─── Mobile Menu ──────────────────────────────────────────────────────────

    async openMobileMenu() {
        await this.page.locator(HomePageLocators.openMenuBtn).click();
        await expect(this.page.locator(HomePageLocators.navMenuWrapper)).toBeVisible();
    }

    async closeMobileMenu() {
        await this.page.locator(HomePageLocators.closeMenuBtn).click();
    }

}

module.exports = Homepage;
