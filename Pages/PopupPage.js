const { expect } = require('@playwright/test');
const PopupLocators = require('../Locators/PopUPLocators');

class PopupPage {

    constructor(page) {
        this.page = page;
    }

    /**
     * Waits for the Klaviyo popup to appear and closes it
     * by clicking the "No Thanks" button.
     * If the popup does not appear within the timeout, it is silently skipped.
     */
    async closePopupIfVisible() {
        try {
            const noThanksBtn = this.page.locator(PopupLocators.noThanksBtn);
            await noThanksBtn.waitFor({ state: 'visible', timeout: 10000 });
            await noThanksBtn.click();
            // Wait for the popup form to disappear after closing
            await this.page.locator(PopupLocators.form).waitFor({ state: 'hidden', timeout: 5000 });
            console.log('✅ Popup closed successfully.');
        } catch {
            console.log('ℹ️  Popup did not appear — skipping close step.');
        }
    }

    // ─── Popup Verifications ────────────────────────────────────────────────

    async verifyPopupIsVisible() {
        await expect(this.page.locator(PopupLocators.form)).toBeVisible();
    }

    async verifyPopupHeading() {
        await expect(this.page.locator(PopupLocators.headingRichText)).toBeVisible();
    }

    async verifyEmailInput() {
        await expect(this.page.locator(PopupLocators.emailInput)).toBeVisible();
    }

    async verifyUnlockBtn() {
        await expect(this.page.locator(PopupLocators.unlockDiscountBtn)).toBeVisible();
    }

    async verifyNoThanksBtn() {
        await expect(this.page.locator(PopupLocators.noThanksBtn)).toBeVisible();
    }

    async verifyPrivacyPolicyLink() {
        await expect(this.page.locator(PopupLocators.privacyPolicyLink)).toBeVisible();
    }

    async verifyPopupImage() {
        await expect(this.page.locator(PopupLocators.popupImage)).toBeVisible();
    }

}

module.exports = PopupPage;
