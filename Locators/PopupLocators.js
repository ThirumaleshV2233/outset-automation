const PopupLocators = {

    // ─── Klaviyo Newsletter Popup Form ───────────────────────────────────────
    form:                   'form[data-testid="klaviyo-form-WWMLkr"]',
    formByClass:            'form.klaviyo-form',

    // ─── Heading / Rich Text ─────────────────────────────────────────────────
    headingRichText:        '#rich-text-01KVQVZFHMBGVSBKPWE9EWR26T',
    headingText:            '#rich-text-01KVQVZFHMBGVSBKPWE9EWR26T p span',

    // ─── Email Input ─────────────────────────────────────────────────────────
    emailLabel:             '#label-email_01KVQVZFHZ1EQ8HHZCYF9337ZM',
    emailInput:             '#email_01KVQVZFHZ1EQ8HHZCYF9337ZM',
    emailInputByAttr:       'input[type="email"][name="email"]',
    emailInputPlaceholder:  'input[placeholder="EMAIL"]',

    // ─── Buttons ─────────────────────────────────────────────────────────────
    unlockDiscountBtn:      'button[data-action-id="01KVQVZFDTRV1Q85AGEJNPHNKT"]',
    noThanksBtn:            'button[data-action-id="01KVQVZFDDCHXPNKRVBSJ8FA0Q"]',

    // ─── Disclaimer / Footer Rich Text ───────────────────────────────────────
    disclaimerRichText:     '#rich-text-01KVQVZFJNBD4C78EMY0SD8YC6',
    disclaimerText:         '#rich-text-01KVQVZFJNBD4C78EMY0SD8YC6 p span',
    privacyPolicyLink:      'a[href="https://theoutset.com/policies/privacy-policy"]',

    // ─── Popup Image ─────────────────────────────────────────────────────────
    popupImage:             'form[data-testid="klaviyo-form-WWMLkr"] img[alt="2"]',

    // ─── Form Rows & Components (generic) ────────────────────────────────────
    formRows:               '[data-testid="form-row"]',
    formComponents:         '[data-testid="form-component"]',

    // ─── Hidden Submit ────────────────────────────────────────────────────────
    hiddenSubmitInput:      'input[type="submit"][value="Submit"]',

};

module.exports = PopupLocators;
