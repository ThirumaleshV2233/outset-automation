const { expect } = require('@playwright/test');
const PopupLocators = require('../Locators/PopupLocators');

/**
 * PopupPage – Page-object for the Klaviyo newsletter popup overlay.
 */
class PopupPage {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async resetPopupStateAndReload() {
        await this.page.evaluate(() => {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.toLowerCase().includes('klaviyo')) {
                    localStorage.removeItem(key);
                }
            }
            document.cookie.split(';').forEach(c => {
                const name = c.split('=')[0].trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }

    async closePopupIfVisible() {
        try {
            const popup = this.page.locator(PopupLocators.popupContainer);
            await popup.waitFor({ state: 'visible', timeout: 3000 });

            const closeBtn = this.page.locator(PopupLocators.closeBtn);
            if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                await closeBtn.click();
            } else {
                await this.page.locator(PopupLocators.noThanksBtn).last().click();
            }

            await popup.waitFor({ state: 'hidden', timeout: 5000 });
            console.log('✅ Popup closed successfully.');
        } catch {
            console.log('ℹ️  Popup did not appear — skipping close step.');
        }
    }

    async closeViaXButton() {
        const closeBtn = this.page.locator(PopupLocators.closeBtn);
        await closeBtn.waitFor({ state: 'visible', timeout: 10000 });
        await closeBtn.click();
        await this.page.locator(PopupLocators.popupContainer).waitFor({ state: 'hidden', timeout: 5000 });
    }

    async closeViaNoThanks() {
        const noThanksBtn = this.page.locator(PopupLocators.noThanksBtn).last();
        await noThanksBtn.waitFor({ state: 'visible', timeout: 10000 });
        await noThanksBtn.click();
        await this.page.locator(PopupLocators.popupContainer).waitFor({ state: 'hidden', timeout: 5000 });
    }

    async enterEmail(email) {
        const input = this.page.locator(PopupLocators.emailInput);
        await input.waitFor({ state: 'visible', timeout: 5000 });
        await input.fill(email);
    }

    async clickUnlockDiscount() {
        await this.page.locator(PopupLocators.unlockDiscountBtn).first().click();
    }

    async verifyPopupIsVisible() {
        await expect(this.page.locator(PopupLocators.popupContainer)).toBeVisible({ timeout: 15000 });
    }

    async verifyFormIsVisible() {
        await expect(this.page.locator(PopupLocators.form)).toBeVisible();
    }

    async verifyPopupHeading() {
        const heading = this.page.locator(PopupLocators.headingRichText).first();
        await expect(heading).toBeVisible();
    }

    async verifyHeadingText(expectedText = '15% OFF') {
        const spans = this.page.locator(PopupLocators.headingSpans);
        await expect(spans.first()).toContainText(expectedText);
    }

    async verifyEmailInput() {
        const input = this.page.locator(PopupLocators.emailInput);
        await expect(input).toBeVisible();
        await expect(input).toBeEnabled();
    }

    async verifyUnlockBtn() {
        await expect(this.page.locator(PopupLocators.unlockDiscountBtn).first()).toBeVisible();
    }

    async verifyNoThanksBtn() {
        await expect(this.page.locator(PopupLocators.noThanksBtn).last()).toBeVisible();
    }

    async verifyCloseBtn() {
        await expect(this.page.locator(PopupLocators.closeBtn)).toBeVisible();
    }

    async verifyPrivacyPolicyLink() {
        const link = this.page.locator(PopupLocators.privacyPolicyLink);
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('href', /privacy-policy/);
    }

    async verifyPopupImage() {
        const img = this.page.locator(PopupLocators.popupImage);
        await expect(img).toBeVisible();
    }

    async verifyDisclaimerText() {
        const disclaimer = this.page.locator(PopupLocators.disclaimerRichText).last();
        await expect(disclaimer).toContainText('consent to receive marketing');
    }

}

module.exports = PopupPage;
