const { expect } = require('@playwright/test');
const NavbarLocators = require('../../Locators/components/NavbarLocators');

/**
 * Navbar – Component Page Object for header navigation, search, cart, and mobile menu.
 */
class Navbar {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    // ─── Header & Logo ──────────────────────────────────────────────────────

    /** Verify the site header is visible. */
    async verifyHeaderIsVisible() {
        await expect(this.page.locator(NavbarLocators.header).first()).toBeVisible();
    }

    /** Verify the logo image is rendered and visible. */
    async verifyLogoIsVisible() {
        await expect(this.page.locator(NavbarLocators.logoImage)).toBeVisible();
    }

    /** Click the logo to navigate back to the homepage. */
    async clickLogo() {
        await this.page.locator(NavbarLocators.logo).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Primary Nav Links ──────────────────────────────────────────────────

    /** Verify all primary desktop navigation links are visible. */
    async verifyAllNavLinksVisible() {
        await expect(this.page.locator(NavbarLocators.bestSellersLink).first()).toBeVisible();
        await expect(this.page.locator(NavbarLocators.skincareLink).first()).toBeVisible();
        await expect(this.page.locator(NavbarLocators.lipOasisLink).first()).toBeVisible();
        await expect(this.page.locator(NavbarLocators.scarlettRoutineLink).first()).toBeVisible();
        await expect(this.page.locator(NavbarLocators.aboutUsLink).first()).toBeVisible();
    }

    /** Click the "Best Sellers" nav link. */
    async clickBestSellers() {
        await this.page.locator(NavbarLocators.bestSellersLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Hover over the "Skincare" nav link to open its mega-menu. */
    async hoverSkincare() {
        await this.page.locator(NavbarLocators.skincareLink).first().hover();
    }

    /** Verify all links and spotlight products in the Skincare mega-menu. */
    async verifySkincareSubmenu() {
        await this.hoverSkincare();
        const submenu = this.page.locator(NavbarLocators.skincareSubmenu).first();
        await expect(submenu).toBeVisible();

        // Header description
        await expect(submenu.locator(NavbarLocators.skincareSubmenuHeaderDescription))
            .toContainText('HEALTHY, HYDRATED SKIN STARTS HERE');

        // Verify key sub-category links
        await expect(submenu.locator(NavbarLocators.skincareSubmenuCleansers).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSubmenuSerums).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSubmenuMoisturizers).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSubmenuTravelSize).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSubmenuLips).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSubmenuRefills).first()).toBeVisible();

        // Verify spotlight items
        await expect(submenu.locator(NavbarLocators.skincareSpotlightDarkSpot).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSpotlightRescueBalm).first()).toBeVisible();
        await expect(submenu.locator(NavbarLocators.skincareSpotlightCollagenSerum).first()).toBeVisible();
    }

    /** Hover over the "About Us" nav link to open its mega-menu. */
    async hoverAboutUs() {
        await this.page.locator(NavbarLocators.aboutUsLink).first().hover();
    }

    /** Click the "Scarlett's Routine" nav link. */
    async clickScarlettRoutine() {
        await this.page.locator(NavbarLocators.scarlettRoutineLink).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Search Overlay ─────────────────────────────────────────────────────

    /** Open the search overlay by clicking the search icon. */
    async openSearch() {
        await this.page.locator(NavbarLocators.searchToggleBtn).click();
        await expect(this.page.locator(NavbarLocators.searchContainer)).toBeVisible();
    }

    /**
     * Open search, type a term, submit, and wait for results page.
     * @param {string} term – The search query
     */
    async searchFor(term) {
        await this.openSearch();
        const searchInput = this.page.locator(NavbarLocators.searchInput);
        await searchInput.waitFor({ state: 'visible', timeout: 5000 });
        await searchInput.fill(term);
        await this.page.locator(NavbarLocators.searchSubmitBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ─── Mini Cart ──────────────────────────────────────────────────────────

    /**
     * Verify the cart badge shows the expected item count.
     * @param {string} expected – Expected count text (default '0')
     */
    async verifyCartCount(expected = '0') {
        await expect(this.page.locator(NavbarLocators.cartCountBadge)).toHaveText(expected);
    }

    /** Click the mini-cart icon button. */
    async clickMiniCart() {
        await this.page.locator(NavbarLocators.miniCartBtn).click();
    }

    // ─── Mobile Menu ────────────────────────────────────────────────────────

    /** Open the mobile hamburger menu and verify it becomes visible. */
    async openMobileMenu() {
        await this.page.locator(NavbarLocators.openMenuBtn).click();
        await expect(this.page.locator(NavbarLocators.navMenuWrapper)).toBeVisible();
    }

    /** Close the mobile hamburger menu. */
    async closeMobileMenu() {
        await this.page.locator(NavbarLocators.closeMenuBtn).click();
    }

}

module.exports = Navbar;
