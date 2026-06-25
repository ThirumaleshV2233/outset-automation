/**
 * HomepageLocators – The Outset homepage CSS selectors
 *
 * Every selector here has been verified against the live theoutset.com DOM.
 * Prefer aria-labels, data-testids, and semantic selectors over brittle
 * class chains wherever possible.
 */
const HomepageLocators = {

    // ─── General ────────────────────────────────────────────────────────────
    skipToMainLink:         'a.skip-to-main-link',
    mainContent:            '#main',

    // ─── Accessibility Widget ───────────────────────────────────────────────
    accessibilityTrigger:   'button[data-testid="acsb-trigger"]',

    // ─── Promo / Announcement Bar ───────────────────────────────────────────
    promoBar:               '.promo-bar',
    promoBarText:           '.promo-bar .swiper-slide-active p',
    promoBarPrevBtn:        '.promo-bar .swiper-button-prev',
    promoBarNextBtn:        '.promo-bar .swiper-button-next',

    // ─── Header / Navigation ────────────────────────────────────────────────
    header:                 'header.header',
    navContainer:           'nav.nav',

    // Hamburger / mobile menu
    openMenuBtn:            'button[aria-label="Open Menu"]',
    closeMenuBtn:           'button[aria-label="Close Menu"]',
    navMenuWrapper:         '#navMenuWrapper',
    navMenuBackdrop:        '.nav__menu-backdrop',

    // Logo
    logo:                   '.nav-logo a',
    logoImage:              'img.logo__image',

    // ─── Primary Nav Links ──────────────────────────────────────────────────
    bestSellersLink:        'a[href="/collections/best-sellers"]',
    skincareLink:           '.nav__menu-list--main a[href="/collections/skincare"]',
    lipOasisLink:           'a[href="/pages/lip-oasis-sheer-glossy-treatment"]',
    scarlettRoutineLink:    'a[href="/pages/scarlett-johansson-skincare-routine"]',
    aboutUsLink:            'a[href="/pages/our-story"]',

    // ─── Skincare Sub-menu ──────────────────────────────────────────────────
    skincareSubmenu:                    '.menu-item__submenu',
    skincareSubmenuShopAll:             'a[href="/collections/skincare"]',
    skincareSubmenuCleansers:           'a[href="/collections/cleansers-exfoliators"]',
    skincareSubmenuSerums:              'a[href="/collections/serums-oils"]',
    skincareSubmenuMoisturizers:        'a[href="/collections/moisturizers-masks"]',
    skincareSubmenuTravelSize:          'a[href="/collections/travel-size"]',
    skincareSubmenuRefills:             'a[href="/collections/refills"]',
    skincareSubmenuValueSets:           'a[href="/collections/value-sets-and-duos"]',
    skincareSubmenuSPF:                 'a[href="/products/hydrasheer-mineral-sunscreen-spf-30"]',
    skincareSubmenuMerch:               'a[href="/collections/merch-shop"]',
    skincareSubmenuLips:                'a[href="/collections/lips"]',
    skincareSubmenuBestSeller:          'a[href="/products/daily-essentials-regimen-bundle"]',
    skincareSubmenuBuildLipOasis:       'a[href="/collections/custom-skincare-bundle"]',
    skincareSubmenuBuildSkincare:       'a[href="/collections/custom-skincare-bundle-2"]',

    // ─── About Us Sub-menu ──────────────────────────────────────────────────
    hyalurosetComplexLink:  'a[href="/pages/hyaluroset-complex"]',
    ingredientsLink:        'a[href="/pages/ingredient-list"]',
    sensitiveSkinLink:      'a[href="/pages/sensitive-skin"]',
    summerBookClubLink:     'a[href*="summer-book-club"]',

    // ─── Nav Icon Buttons (right side) ──────────────────────────────────────
    accountLink:            'a[href*="/account"]',
    searchToggleBtn:        'button[aria-label="Open search bar"]',
    miniCartBtn:            'button[aria-label="Open mini cart"]',
    cartCountBadge:         '.nav__cart-count span',
    logoutLink:             'a.nav__log-out',

    // ─── Search Bar ─────────────────────────────────────────────────────────
    searchContainer:        '.nav__search-container',
    searchInput:            'input[name="q"].js-nav-search-input',
    searchSubmitBtn:        'button[type="submit"].nav-search__icon',
    searchForm:             'form[role="search"]',
    searchBackdrop:         '.nav__search-backdrop',

    // ─── Mobile Nav Icons ───────────────────────────────────────────────────
    contactUsLinkMobile:    '.nav__icons--mobile a[href="/"]',
    loginLinkMobile:        '.nav__icons--mobile a[href="/account"]',

    // ─── Social Links (mobile menu footer) ──────────────────────────────────
    instagramLink:          'a[href="https://www.instagram.com/theoutset/"]',
    tiktokLink:             'a[href="https://www.tiktok.com/@theoutset"]',
    instagramHandle:        'a.social-links__instagram-handle',

    // ─── Hero / Banner Section ──────────────────────────────────────────────
    heroSection:            '.home-hero',
    heroCarousel:           '.swiper--home-hero',
    heroBackground:         '.hero__background',
    heroTitle1:             '.hero__title--1',
    heroTitle2:             '.hero__title--2',
    heroDescription:        '.hero__description',
    heroShopNowBtn:         '.home-hero a.button.button--primary',
    heroPrevBtn:            '.swiper--home-hero .swiper-button-prev',
    heroNextBtn:            '.swiper--home-hero .swiper-button-next',
    heroPaginationBullets:  '.swiper--home-hero .swiper-pagination-bullet',

    // ─── Marquee / Ticker Strip ─────────────────────────────────────────────
    marqueeSection:         'section.marquee',
    marqueePauseBtn:        '.js-pause-button',
    marqueeItems:           '.marquee__content-item',
    marqueeItemText:        '.marquee__content-text',

    // ─── Product Carousel ───────────────────────────────────────────────────
    productCarouselSection: '.product-carousel',
    productCarouselTitle:   '.product-carousel__title',
    productCarouselTabPanel:'#tab-panel-0',
    productCards:           '.product-card',
    productCardTitle:       '.product-card__title a',
    productCardImage:       '.product-card__image',
    productCardDescription: '.product-card__description',
    addToBagBtn:            'button.quick-add-to-cart__button',
    productCarouselPrevBtn: '.product-carousel .swiper-button-prev',
    productCarouselNextBtn: '.product-carousel .swiper-button-next',

    // ─── Footer Newsletter Form (Klaviyo embed) ─────────────────────────────
    footerNewsletterForm:   'footer form.klaviyo-form',
    footerEmailInput:       'footer input[type="email"][name="email"]',
    footerSubmitBtn:        'footer button.klaviyo-form-button',

    // ─── General Modal ──────────────────────────────────────────────────────
    modal:                  '.modal',
    modalContainer:         '.modal__container',
    modalCloseBtn:          'button[aria-label="Close modal"]',
    modalContent:           '.modal__content',
    modalOverlay:           '.modal__overlay',

};

module.exports = HomepageLocators;
