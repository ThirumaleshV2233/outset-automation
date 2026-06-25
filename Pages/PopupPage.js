const { expect } = require('@playwright/test');
const PopupLocators = require('../Locators/PopupLocators');

/**
 * PopupPage – Page-object for the Klaviyo newsletter popup overlay.
 *
 * Provides methods to interact with and verify the "GET 15% OFF"
 * email-capture popup that appears on first visit to theoutset.com.
 */
class PopupPage {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    // ─── Popup State Reset ────────────────────────────────────────────────

    /**
     * Clears Klaviyo's popup-suppression state (localStorage + cookies)
     * and reloads the page so the popup triggers again on a "fresh" visit.
     *
     * Klaviyo stores flags like `klaviyo_popup_*` in localStorage and
     * sets cookies to remember that a visitor already saw / dismissed
     * the popup.  Clearing these before reload forces the popup to
     * re-appear.
     */
    async resetPopupStateAndReload() {
        await this.page.evaluate(() => {
            // Clear all Klaviyo-related localStorage keys
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.toLowerCase().includes('klaviyo')) {
                    localStorage.removeItem(key);
                }
            }
            // Clear all cookies on this domain (including Klaviyo tracking)
            document.cookie.split(';').forEach(c => {
                const name = c.split('=')[0].trim();
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }

    // ─── Popup Dismiss Helpers ──────────────────────────────────────────────

    /**
     * Waits for the popup and closes it via the X (close dialog) button.
     * Falls back to "No Thanks" if the X button is not found.
     * Silently skips if the popup never appears.
     */
    async closePopupIfVisible() {
        try {
            const popup = this.page.locator(PopupLocators.popupContainer);
            await popup.waitFor({ state: 'visible', timeout: 15000 });

            // Prefer the X button — it's always in the same position
            const closeBtn = this.page.locator(PopupLocators.closeBtn);
            if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                await closeBtn.click();
            } else {
                // Fallback to "No Thanks" dismiss link
                await this.page.locator(PopupLocators.noThanksBtn).click();
            }

            // Wait for popup to fully disappear
            await popup.waitFor({ state: 'hidden', timeout: 5000 });
            console.log('✅ Popup closed successfully.');
        } catch {
            console.log('ℹ️  Popup did not appear — skipping close step.');
        }
    }

    /**
     * Explicitly closes the popup using only the X (close dialog) button.
     * Throws if the X button is not visible.
     */
    async closeViaXButton() {
        const closeBtn = this.page.locator(PopupLocators.closeBtn);
        await closeBtn.waitFor({ state: 'visible', timeout: 10000 });
        await closeBtn.click();
        await this.page.locator(PopupLocators.popupContainer)
            .waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Explicitly closes the popup using the "No Thanks" button.
     */
    async closeViaNoThanks() {
        const noThanksBtn = this.page.locator(PopupLocators.noThanksBtn);
        await noThanksBtn.waitFor({ state: 'visible', timeout: 10000 });
        await noThanksBtn.click();
        await this.page.locator(PopupLocators.popupContainer)
            .waitFor({ state: 'hidden', timeout: 5000 });
    }

    // ─── Interaction Methods ────────────────────────────────────────────────

    /**
     * Types an email address into the popup's email input field.
     * @param {string} email
     */
    async enterEmail(email) {
        const input = this.page.locator(PopupLocators.emailInput);
        await input.waitFor({ state: 'visible', timeout: 5000 });
        await input.fill(email);
    }

    /**
     * Clicks the primary CTA button ("UNLOCK MY 15% OFF").
     */
    async clickUnlockDiscount() {
        await this.page.locator(PopupLocators.unlockDiscountBtn).click();
    }

    // ─── Verification Methods ───────────────────────────────────────────────

    /** Asserts the popup overlay container is visible. */
    async verifyPopupIsVisible() {
        await expect(this.page.locator(PopupLocators.popupContainer))
            .toBeVisible({ timeout: 15000 });
    }

    /** Asserts the popup form is rendered inside the container. */
    async verifyFormIsVisible() {
        await expect(this.page.locator(PopupLocators.form)).toBeVisible();
    }

    /** Asserts the heading rich-text block is visible. */
    async verifyPopupHeading() {
        const heading = this.page.locator(PopupLocators.headingRichText).first();
        await expect(heading).toBeVisible();
    }

    /** Asserts the heading contains the expected discount copy. */
    async verifyHeadingText(expectedText = '15% OFF') {
        const spans = this.page.locator(PopupLocators.headingSpans);
        await expect(spans.first()).toContainText(expectedText);
    }

    /** Asserts the email input field is visible and interactable. */
    async verifyEmailInput() {
        const input = this.page.locator(PopupLocators.emailInput);
        await expect(input).toBeVisible();
        await expect(input).toBeEnabled();
    }

    /** Asserts the "UNLOCK MY 15% OFF" button is visible. */
    async verifyUnlockBtn() {
        await expect(this.page.locator(PopupLocators.unlockDiscountBtn))
            .toBeVisible();
    }

    /** Asserts the "No Thanks" dismiss button is visible. */
    async verifyNoThanksBtn() {
        await expect(this.page.locator(PopupLocators.noThanksBtn)).toBeVisible();
    }

    /** Asserts the close (X) button is visible. */
    async verifyCloseBtn() {
        await expect(this.page.locator(PopupLocators.closeBtn)).toBeVisible();
    }

    /** Asserts the privacy-policy link is visible and opens in a new tab. */
    async verifyPrivacyPolicyLink() {
        const link = this.page.locator(PopupLocators.privacyPolicyLink);
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('href', /privacy-policy/);
    }

    /** Asserts the promotional image inside the popup is visible. */
    async verifyPopupImage() {
        const img = this.page.locator(PopupLocators.popupImage);
        await expect(img).toBeVisible();
    }

    /** Asserts the disclaimer / consent text is present. */
    async verifyDisclaimerText() {
        const disclaimer = this.page.locator(PopupLocators.disclaimerRichText).last();
        await expect(disclaimer).toContainText('consent to receive marketing');
    }

}

module.exports = PopupPage;
