const { expect } = require('@playwright/test');
const HeroLocators = require('../../Locators/components/HeroLocators');

/**
 * HeroSection – Component Page Object for the homepage main hero banner.
 */
class HeroSection {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    /** Verify the hero section, description, and Shop Now button are visible. */
    async verifyHeroSection() {
        await expect(this.page.locator(HeroLocators.heroSection)).toBeVisible();
        await expect(this.page.locator(HeroLocators.heroDescription)).toBeVisible();
        await expect(this.page.locator(HeroLocators.heroShopNowBtn).first())
            .toContainText(/Shop Now/i);
    }

    /** Click the hero "Shop Now" CTA and wait for navigation. */
    async clickHeroShopNow() {
        await this.page.locator(HeroLocators.heroShopNowBtn).first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = HeroSection;
