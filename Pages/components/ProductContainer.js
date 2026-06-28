const { expect } = require('@playwright/test');
const ProductLocators = require('../../Locators/components/ProductLocators');

/**
 * ProductContainer – Component Page Object for product carousels and product cards.
 */
class ProductContainer {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    /** Verify the product carousel section is visible with product cards. */
    async verifyProductCarousel() {
        await expect(this.page.locator(ProductLocators.productCarouselSection)).toBeVisible();
        await expect(this.page.locator(ProductLocators.productCarouselTitle)).toBeVisible();
        const cards = await this.page.locator(ProductLocators.productCards).count();
        expect(cards).toBeGreaterThan(0);
    }

    /** Click the first product card title link to navigate to PDP. */
    async clickFirstProductCard() {
        await this.page.locator(ProductLocators.productCardTitle).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Hover the first product card and click the Add to Bag button. */
    async clickAddToBagOnFirstProduct() {
        await this.page.locator(ProductLocators.productCards).first().hover();
        await this.page.locator(ProductLocators.addToBagBtn).first().click();
    }
}

module.exports = ProductContainer;
