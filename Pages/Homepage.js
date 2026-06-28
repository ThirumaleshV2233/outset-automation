const { expect } = require('@playwright/test');
const HomepageLocators = require('../Locators/HomepageLocators');

/**
 * Homepage – Main parent Page Object for Playwright.
 */
class Homepage {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.navbar = new Navbar(page);
        this.hero = new HeroSection(page);
        this.products = new ProductContainer(page);
        this.marquee = new Marquee(page);
    }

    async navigate() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    async verifyPageTitleAndURL() {
        await expect(this.page).toHaveTitle(/The Outset/i);
        await expect(this.page).toHaveURL(/theoutset\.com/);
    }

    async verifyCriticalSectionsLoaded() {
        await this.navbar.verifyHeaderIsVisible();
        await this.hero.verifyHeroSection();
        await expect(this.page.locator(HomepageLocators.mainContent)).toBeVisible();
    }

    async verifyPromoBar() {
        await expect(this.page.locator(HomepageLocators.promoBar)).toBeVisible();
        await expect(this.page.locator(HomepageLocators.promoBarText)).toContainText('Free Shipping');
    }

    // Delegated methods
    async verifyHeaderIsVisible() { return this.navbar.verifyHeaderIsVisible(); }
    async verifyLogoIsVisible() { return this.navbar.verifyLogoIsVisible(); }
    async clickLogo() { return this.navbar.clickLogo(); }
    async verifyAllNavLinksVisible() { return this.navbar.verifyAllNavLinksVisible(); }
    async clickBestSellers() { return this.navbar.clickBestSellers(); }
    async hoverSkincare() { return this.navbar.hoverSkincare(); }
    async hoverAboutUs() { return this.navbar.hoverAboutUs(); }
    async clickScarlettRoutine() { return this.navbar.clickScarlettRoutine(); }
    async openSearch() { return this.navbar.openSearch(); }
    async searchFor(term) { return this.navbar.searchFor(term); }
    async verifyCartCount(expected) { return this.navbar.verifyCartCount(expected); }
    async clickMiniCart() { return this.navbar.clickMiniCart(); }
    async openMobileMenu() { return this.navbar.openMobileMenu(); }
    async closeMobileMenu() { return this.navbar.closeMobileMenu(); }

    async verifyHeroSection() { return this.hero.verifyHeroSection(); }
    async clickHeroShopNow() { return this.hero.clickHeroShopNow(); }

    async verifyMarqueeSection() { return this.marquee.verifyMarqueeSection(); }

    async verifyProductCarousel() { return this.products.verifyProductCarousel(); }
    async clickFirstProductCard() { return this.products.clickFirstProductCard(); }
    async clickAddToBagOnFirstProduct() { return this.products.clickAddToBagOnFirstProduct(); }
}

module.exports = Homepage;
