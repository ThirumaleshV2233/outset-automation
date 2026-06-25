const HomePageLocators = {

    // ─── General ────────────────────────────────────────────────────────────
    skipToMainLink:         'a.skip-to-main-link',
    mainContent:            '#main',

    // ─── Accessibility Widget ────────────────────────────────────────────────
    accessibilityTrigger:   'button[data-testid="acsb-trigger"]',
    popupDialog:            '[data-testid="popup-dialog"]',
    popupDialogCloseBtn:    '[data-testid="popup-dialog-close-button"]',

    // ─── Promo Bar ───────────────────────────────────────────────────────────
    promoBar:               '.promo-bar',
    promoBarText:           '.promo-bar .swiper-slide-active p',
    promoBarPrevBtn:        '.promo-bar .swiper-button-prev',
    promoBarNextBtn:        '.promo-bar .swiper-button-next',

    // ─── Header / Navigation ─────────────────────────────────────────────────
    header:                 'header.header',
    navContainer:           'nav.nav',

    // Hamburger menu
    openMenuBtn:            'button[aria-label="Open Menu"]',
    closeMenuBtn:           'button[aria-label="Close Menu"]',
    navMenuWrapper:         '#navMenuWrapper',
    navMenuBackdrop:        '.nav__menu-backdrop',

    // Logo
    logo:                   '.nav-logo a',
    logoImage:              'img.logo__image',

    // Primary nav links (left side)
    bestSellersLink:        'a[href="/collections/best-sellers"]',
    skincareLink:           '.nav__menu-list--main .menu-item a[href="/collections/skincare"]',
    lipOasisLink:           'a[href="/pages/lip-oasis-sheer-glossy-treatment"]',

    // Skincare sub-menu
    skincareSubmenu:                    '.menu-item__submenu',
    skincareSubmenuShopAll:             '.menu-item__submenu-list-link[href="/collections/skincare"]',
    skincareSubmenuBestSeller:          '.menu-item__submenu-list-link[href="/products/daily-essentials-regimen-bundle"]',
    skincareSubmenuCleansers:           '.menu-item__submenu-list-link[href="/collections/cleansers-exfoliators"]',
    skincareSubmenuLips:                '.menu-item__submenu-list-link[href="/collections/lips"]',
    skincareSubmenuSPF:                 '.menu-item__submenu-list-link[href="/products/hydrasheer-mineral-sunscreen-spf-30"]',
    skincareSubmenuMerch:               '.menu-item__submenu-list-link[href="/collections/merch-shop"]',
    skincareSubmenuMoisturizers:        '.menu-item__submenu-list-link[href="/collections/moisturizers-masks"]',
    skincareSubmenuSerums:              '.menu-item__submenu-list-link[href="/collections/serums-oils"]',
    skincareSubmenuTravelSize:          '.menu-item__submenu-list-link[href="/collections/travel-size"]',
    skincareSubmenuRefills:             '.menu-item__submenu-list-link[href="/collections/refills"]',
    skincareSubmenuValueSets:           '.menu-item__submenu-list-link[href="/collections/value-sets-and-duos"]',
    skincareSubmenuBuildLipOasis:       '.menu-item__submenu-list-link[href="/collections/custom-skincare-bundle"]',
    skincareSubmenuBuildSkincare:       '.menu-item__submenu-list-link[href="/collections/custom-skincare-bundle-2"]',

    // Right-side nav links
    scarlettRoutineLink:    'a[href="/pages/scarlett-johansson-skincare-routine"]',
    aboutUsLink:            'a[href="/pages/our-story"]',

    // About Us sub-menu
    hyalurosetComplexLink:  'a[href="/pages/hyaluroset-complex"]',
    ingredientsLink:        'a[href="/pages/ingredient-list"]',
    sensitiveSkinLink:      'a[href="/pages/sensitive-skin"]',
    summerBookClubLink:     'a[href="/pages/summer-book-club-shannon-garvey-june-baby"]',
    lipOasisProductLink:    'a[href="/products/lip-oasis-glossy-treatment"]',
    threeStepRegimenLink:   'a[href="/products/daily-essentials-regimen-bundle"]',

    // Nav icon links
    accountLink:            'a[href="https://shop.theoutset.com/account"]',
    searchToggleBtn:        'button[aria-label="Open search bar"]',
    miniCartBtn:            'button[aria-label="Open mini cart"]',
    cartCountBadge:         '.nav__cart-count span',
    logoutLink:             'a.nav__log-out',

    // Search bar
    searchContainer:        '.nav__search-container',
    searchInput:            'input[name="q"].js-nav-search-input',
    searchSubmitBtn:        'button[type="submit"].nav-search__icon',
    searchForm:             'form[role="search"]',
    searchBackdrop:         '.nav__search-backdrop',

    // Mobile nav icons
    contactUsLinkMobile:    '.nav__icons--mobile a[href="/"]',
    loginLinkMobile:        '.nav__icons--mobile a[href="/account"]',

    // Social links (inside mobile menu footer)
    instagramLink:          'a[href="https://www.instagram.com/theoutset/"]',
    tiktokLink:             'a[href="https://www.tiktok.com/@theoutset"]',
    instagramHandle:        'a.social-links__instagram-handle',

    // ─── Hero / Banner Section ────────────────────────────────────────────────
    heroSection:            '.home-hero',
    heroCarousel:           '.swiper--home-hero',
    heroBackground:         '.hero__background',
    heroTitle1:             '.hero__title--1',
    heroTitle2:             '.hero__title--2',
    heroDescription:        '.hero__description',
    heroShopNowBtn:         '.hero__buttons a.button--primary',
    heroPrevBtn:            '.swiper--home-hero .swiper-button-prev',
    heroNextBtn:            '.swiper--home-hero .swiper-button-next',
    heroPaginationBullets:  '.swiper--home-hero .swiper-pagination-bullet',

    // ─── Marquee / Ticker Strip ───────────────────────────────────────────────
    marqueeSection:         'section.marquee',
    marqueePauseBtn:        '.js-pause-button',
    marqueeItems:           '.marquee__content-item',
    marqueeItemText:        '.marquee__content-text',

    // ─── Product Carousel (Discover Hydrating Skincare) ───────────────────────
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

    // ─── Modal (Promo / General) ──────────────────────────────────────────────
    modal:                  '.modal',
    modalContainer:         '.modal__container',
    modalCloseBtn:          'button[aria-label="Close modal"]',
    modalContent:           '.modal__content',
    modalOverlay:           '.modal__overlay',

};

module.exports = HomePageLocators;
