const { expect } = require('@playwright/test');
const MarqueeLocators = require('../../Locators/components/MarqueeLocators');

/**
 * Marquee – Component Page Object for the marquee ticker strip section.
 */
class Marquee {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    /** Verify the marquee section is visible and contains items. */
    async verifyMarqueeSection() {
        await expect(this.page.locator(MarqueeLocators.marqueeSection)).toBeVisible();
        const count = await this.page.locator(MarqueeLocators.marqueeItems).count();
        expect(count).toBeGreaterThan(0);
    }
}

module.exports = Marquee;
