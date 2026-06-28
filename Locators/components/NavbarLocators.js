/**
 * NavbarLocators – Header and Navigation CSS selectors
 */
const NavbarLocators = {

    // ─── Header & Navigation Container ──────────────────────────────────────
    header:                 'header.header, nav.nav',
    navContainer:           'nav.nav',

    // ─── Hamburger / Mobile Menu ──────────────────────────────────────────────
    openMenuBtn:            'button[aria-label="Open Menu"]',
    closeMenuBtn:           'button[aria-label="Close Menu"]',
    navMenuWrapper:         '#navMenuWrapper',
    navMenuBackdrop:        '.nav__menu-backdrop',

    // ─── Logo ───────────────────────────────────────────────────────────────
    logo:                   '.nav-logo a',
    logoImage:              'img.logo__image',

    // ─── Primary Desktop Nav Links ──────────────────────────────────────────
    bestSellersLink:        'a[href="/collections/best-sellers"]',
    skincareLink:           '.nav__menu-list--main a[href="/collections/skincare"]',
    lipOasisLink:           'a[href="/pages/lip-oasis-sheer-glossy-treatment"]',
    scarlettRoutineLink:    'a[href="/pages/scarlett-johansson-skincare-routine"]',
    aboutUsLink:            'a[href="/pages/our-story"]',

    // ─── Skincare Sub-menu ──────────────────────────────────────────────────
    skincareSubmenu:                    '.menu-item__submenu',
    // Header
    skincareSubmenuHeaderDescription:   '.menu-item__description',
    skincareSubmenuHeaderShopAll:       'a.menu-item__link[href="/collections/skincare"]',
    // List links (all 13)
    skincareSubmenuShopAll:             'a.menu-item__submenu-list-link[href="/collections/skincare"]',
    skincareSubmenuBestSeller:          'a[href="/products/daily-essentials-regimen-bundle"]',
    skincareSubmenuCleansers:           'a[href="/collections/cleansers-exfoliators"]',
    skincareSubmenuLips:                'a[href="/collections/lips"]',
    skincareSubmenuSPF:                 'a[href="/products/hydrasheer-mineral-sunscreen-spf-30"]',
    skincareSubmenuMerch:               'a[href="/collections/merch-shop"]',
    skincareSubmenuMoisturizers:        'a[href="/collections/moisturizers-masks"]',
    skincareSubmenuSerums:              'a[href="/collections/serums-oils"]',
    skincareSubmenuTravelSize:          'a[href="/collections/travel-size"]',
    skincareSubmenuRefills:             'a[href="/collections/refills"]',
    skincareSubmenuValueSets:           'a[href="/collections/value-sets-and-duos"]',
    skincareSubmenuBuildLipOasis:       'a[href="/collections/custom-skincare-bundle"]',
    skincareSubmenuBuildSkincare:       'a[href="/collections/custom-skincare-bundle-2"]',
    // Spotlight product cards
    skincareSpotlightDarkSpot:          'a[href="/products/total-clarity-dark-spot-serum-vitamin-c-alternative"]',
    skincareSpotlightRescueBalm:        'a[href="/products/botanical-barrier-rescue-balm"]',
    skincareSpotlightCollagenSerum:     'a[href="/products/firming-vegan-collagen-prep-serum"]',
    skincareSpotlightImage:             '.menu-item__submenu-item .picture__img',
    skincareSpotlightLabel:             'a.menu-item__submenu-link',
    skincareSpotlightDescription:       '.menu-item__submenu-description',

    // ─── About Us Sub-menu ──────────────────────────────────────────────────
    hyalurosetComplexLink:  'a[href="/pages/hyaluroset-complex"]',
    ingredientsLink:        'a[href="/pages/ingredient-list"]',
    sensitiveSkinLink:      'a[href="/pages/sensitive-skin"]',

    // ─── Header Icon Buttons & Badges ───────────────────────────────────────
    accountLink:            'a[href*="/account"]',
    searchToggleBtn:        'button[aria-label="Open search bar"]',
    miniCartBtn:            'button[aria-label="Open mini cart"]',
    cartCountBadge:         '.nav__cart-count span',

    // ─── Search Bar Overlay ─────────────────────────────────────────────────
    searchContainer:        '.nav__search-container',
    searchInput:            'input[name="q"].js-nav-search-input',
    searchSubmitBtn:        'button[type="submit"].nav-search__icon',

    // ─── Social Links (Mobile Menu) ─────────────────────────────────────────
    instagramLink:          '#navMenuWrapper a[href="https://www.instagram.com/theoutset/"]',
    tiktokLink:             '#navMenuWrapper a[href="https://www.tiktok.com/@theoutset"]',

};

module.exports = NavbarLocators;
