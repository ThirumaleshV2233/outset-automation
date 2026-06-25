/**
 * PopupLocators – Klaviyo newsletter popup selectors
 *
 * All selectors are scoped to `[data-testid="POPUP"]` so they never
 * collide with the footer newsletter form or other Klaviyo embeds.
 *
 * We deliberately avoid dynamic Klaviyo IDs (form IDs, action IDs,
 * rich-text element IDs) because they change every time the form is
 * republished in Klaviyo.
 */
const PopupLocators = {

    // ─── Popup Container ────────────────────────────────────────────────────
    popupContainer:         '[data-testid="POPUP"]',
    form:                   '[data-testid="POPUP"] form.klaviyo-form',
    modalFormContainer:     '[data-testid="modal-form-container"]',

    // ─── Close Button (X icon) ──────────────────────────────────────────────
    closeBtn:               'button[aria-label="Close dialog"]',

    // ─── Heading / Rich Text ────────────────────────────────────────────────
    // First .klaviyo-form-richtext inside the popup is the heading block
    headingRichText:        '[data-testid="POPUP"] .klaviyo-form-richtext',
    // Grab inner spans for text assertions (e.g. "GET 15% OFF")
    headingSpans:           '[data-testid="POPUP"] .klaviyo-form-richtext:first-of-type span',

    // ─── Email Input ────────────────────────────────────────────────────────
    emailInput:             '[data-testid="POPUP"] input[type="email"][name="email"]',

    // ─── Buttons ────────────────────────────────────────────────────────────
    // The popup has exactly two .klaviyo-form-button elements:
    //   1st → "UNLOCK MY 15% OFF"   (primary CTA)
    //   2nd → "No Thanks, I'll Pay Full Price."  (dismiss)
    allButtons:             '[data-testid="POPUP"] button.klaviyo-form-button',
    unlockDiscountBtn:      '[data-testid="POPUP"] button.klaviyo-form-button:first-of-type',
    noThanksBtn:            '[data-testid="POPUP"] button.klaviyo-form-button:last-of-type',

    // ─── Disclaimer / Footer Rich Text ──────────────────────────────────────
    disclaimerRichText:     '[data-testid="POPUP"] .klaviyo-form-richtext:last-of-type',
    privacyPolicyLink:      '[data-testid="POPUP"] a[href*="privacy-policy"]',

    // ─── Popup Image ────────────────────────────────────────────────────────
    popupImage:             '[data-testid="POPUP"] form.klaviyo-form img',

    // ─── Form Rows & Components (generic) ───────────────────────────────────
    formRows:               '[data-testid="POPUP"] [data-testid="form-row"]',
    formComponents:         '[data-testid="POPUP"] [data-testid="form-component"]',

    // ─── Hidden Submit ──────────────────────────────────────────────────────
    hiddenSubmitInput:      '[data-testid="POPUP"] input[type="submit"]',

};

module.exports = PopupLocators;
