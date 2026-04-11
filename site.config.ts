// =============================================================================
// site.config.ts - Central configuration for Go2 destination sites
// =============================================================================
//
// This is the SINGLE file you customize per destination. Everything else
// (components, pages, data loaders, translations) reads from this config.
//
// To create a new destination site:
//   1. Copy the entire go2-base-template folder
//   2. Edit ONLY this file with your destination's details
//   3. Add your data JSON files to /data/
//   4. Add destination-specific translations to /translations/
//   5. Run `npm run build` and deploy
//
// =============================================================================

// -----------------------------------------------------------------------------
// Type definitions
// -----------------------------------------------------------------------------

export interface SiteConfig {
  /** Site brand name, e.g. "Go2Bali", "Go2Japan" */
  name: string;

  /** Production domain without protocol, e.g. "go2-bali.com" */
  domain: string;

  /** Short destination name used in headings, e.g. "Bali", "Japan" */
  destination: string;

  /** Full destination with country context, e.g. "Bali, Indonesia" */
  destinationFull: string;

  /** Hero tagline shown on the homepage */
  tagline: string;

  /** Brand colors in Tailwind extended-palette format (50-900 scale) */
  colors: {
    /** Main brand color - used for header border, buttons, active states */
    primary: Record<string, string>;
    /** Secondary color - used for text, dark backgrounds, footer */
    secondary: Record<string, string>;
    /** Accent color - used for highlights, badges, stars, CTAs */
    accent: Record<string, string>;
  };

  /** Supported locales for i18n (first = default) */
  locales: string[];

  /** Default locale, must be one of `locales` */
  defaultLocale: string;

  /** Affiliate tracking links for monetization */
  affiliateLinks: {
    /** Booking.com affiliate link */
    booking: string;
    /** Trip.com affiliate link */
    tripcom: string;
    /** Transport booking (12Go Asia or equivalent) */
    transport: string;
    /** eSIM affiliate link (Saily or equivalent) */
    esim: string;
    /** GetYourGuide affiliate link */
    getYourGuide: string;
    /** Klook affiliate link */
    klook: string;
  };

  /** SEO and analytics configuration */
  seo: {
    /** Full canonical URL with protocol, e.g. "https://go2-bali.com" */
    siteUrl: string;
    /** Default Open Graph image path (relative to /public) */
    ogImage: string;
    /** Twitter/X handle without @, e.g. "go2thailand" */
    twitterHandle: string;
    /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX" */
    googleAnalyticsId: string;
    /** IndexNow API key for instant search engine indexing */
    indexNowKey: string;
  };

  /**
   * Which content sections are active on this site.
   * Set to false to hide nav links and skip page generation for
   * content types that don't apply to your destination.
   */
  contentTypes: {
    cities: boolean;
    islands: boolean;
    food: boolean;
    drinks: boolean;
    transport: boolean;
    visa: boolean;
    regions: boolean;
    weather: boolean;
    blog: boolean;
    comparisons: boolean;
    top10: boolean;
    practicalInfo: boolean;
  };

  /** Header and footer navigation structure */
  navigation: {
    /** Top-level links shown directly in the header */
    mainLinks: Array<{ key: string; href: string }>;
    /** Dropdown menus with nested items */
    dropdowns: Array<{
      key: string;
      items: Array<{ key: string; href: string }>;
    }>;
  };

  /** Other Go2 sites for cross-linking in footer / "Explore More" sections */
  sisterSites: Array<{
    name: string;
    domain: string;
    destination: string;
  }>;
}

// -----------------------------------------------------------------------------
// All Go2 sister sites (shared across every destination)
// -----------------------------------------------------------------------------

const ALL_SISTER_SITES: SiteConfig['sisterSites'] = [
  { name: 'Go2Thailand', domain: 'go2-thailand.com', destination: 'Thailand' },
  { name: 'Go2Bali', domain: 'go2-bali.com', destination: 'Bali' },
  { name: 'Go2China', domain: 'go2-china.com', destination: 'China' },
  { name: 'Go2India', domain: 'go2-india.com', destination: 'India' },
  { name: 'Go2Japan', domain: 'go2-japan.com', destination: 'Japan' },
  { name: 'Go2Mexico', domain: 'go2-mexico.com', destination: 'Mexico' },
  { name: 'Go2Morocco', domain: 'go2-morocco.com', destination: 'Morocco' },
  { name: 'Go2USA', domain: 'go2-usa.com', destination: 'USA' },
  { name: 'Go2Vietnam', domain: 'go2-vietnam.com', destination: 'Vietnam' },
];

// -----------------------------------------------------------------------------
// Configuration: Japan
// -----------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  // ---------------------------------------------------------------------------
  // Core identity
  // ---------------------------------------------------------------------------
  name: 'Go2Japan',
  domain: 'go2-japan.com',
  destination: 'Japan',
  destinationFull: 'Japan',
  tagline: 'Your Ultimate Japan Travel Guide',

  // ---------------------------------------------------------------------------
  // Colors
  // ---------------------------------------------------------------------------
  // Japan uses cherry blossom pink (sakura) + midnight indigo + vermilion red (torii gates)
  colors: {
    primary: {
      DEFAULT: '#EC4899',
      '50': '#FDF2F8',
      '100': '#FCE7F3',
      '200': '#FBCFE8',
      '300': '#F9A8D4',
      '400': '#F472B6',
      '500': '#EC4899',
      '600': '#DB2777',
      '700': '#BE185D',
      '800': '#9D174D',
      '900': '#831843',
    },
    secondary: {
      DEFAULT: '#1E1B4B',
      '50': '#EEF2FF',
      '100': '#E0E7FF',
      '200': '#C7D2FE',
      '300': '#A5B4FC',
      '400': '#818CF8',
      '500': '#6366F1',
      '600': '#4F46E5',
      '700': '#4338CA',
      '800': '#3730A3',
      '900': '#1E1B4B',
    },
    accent: {
      DEFAULT: '#EF4444',
      '50': '#FEF2F2',
      '100': '#FEE2E2',
      '200': '#FECACA',
      '300': '#FCA5A5',
      '400': '#F87171',
      '500': '#EF4444',
      '600': '#DC2626',
      '700': '#B91C1C',
      '800': '#991B1B',
      '900': '#7F1D1D',
    },
  },

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------
  locales: ['en'],
  defaultLocale: 'en',

  // ---------------------------------------------------------------------------
  // Affiliate links
  // ---------------------------------------------------------------------------
  affiliateLinks: {
    booking: 'https://booking.tpo.lv/2PT1kR82',
    tripcom: 'https://trip.tpo.lv/TmObooZ5',
    transport: 'https://12go.tpo.lv/tNA80urD',
    esim: 'https://saily.tpo.lv/rf9lidnE',
    getYourGuide: 'https://getyourguide.tpo.lv/6HngJ5FC',
    klook: 'https://klook.tpo.lv/7Dt6WApj',
  },

  // ---------------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------------
  seo: {
    siteUrl: 'https://go2-japan.com',
    ogImage: '/images/og-default.jpg',
    twitterHandle: 'go2japan',
    googleAnalyticsId: 'G-C7GTZK1N6K',
    indexNowKey: '',       // Set via env var INDEXNOW_KEY or hardcode here
  },

  // ---------------------------------------------------------------------------
  // Content types
  // ---------------------------------------------------------------------------
  contentTypes: {
    cities: true,
    islands: false,
    food: true,
    drinks: true,
    transport: true,
    visa: true,
    regions: true,
    weather: true,
    blog: true,
    comparisons: false,
    top10: false,
    practicalInfo: true,
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  navigation: {
    mainLinks: [
      { key: 'nav.home', href: '/' },
      { key: 'nav.cities', href: '/city/' },
      { key: 'nav.transport', href: '/transport/' },
      { key: 'nav.visa', href: '/visa/' },
      { key: 'nav.blog', href: '/blog/' },
    ],
    dropdowns: [
      {
        key: 'nav.foodDrinks',
        items: [
          { key: 'nav.food', href: '/food/' },
          { key: 'nav.drinks', href: '/drinks/' },
        ],
      },
      {
        key: 'nav.explore',
        items: [
          { key: 'nav.regions', href: '/region/' },
          { key: 'nav.weather', href: '/weather/' },
          { key: 'nav.practicalInfo', href: '/practical-info/' },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Sister sites
  // ---------------------------------------------------------------------------
  sisterSites: ALL_SISTER_SITES,
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

/**
 * Get the full URL for a sister site by destination name.
 * Returns undefined if the destination is not found.
 *
 * @example
 *   getSisterSiteUrl('Bali')    // 'https://go2-bali.com'
 *   getSisterSiteUrl('Japan')   // 'https://go2-japan.com'
 *   getSisterSiteUrl('Narnia')  // undefined
 */
export function getSisterSiteUrl(destination: string): string | undefined {
  const site = ALL_SISTER_SITES.find(
    (s) => s.destination.toLowerCase() === destination.toLowerCase()
  );
  return site ? `https://${site.domain}` : undefined;
}

/**
 * Get all sister sites EXCEPT the current one (for cross-linking).
 * Uses `siteConfig.destination` to determine which site to exclude.
 *
 * @example
 *   // In the Japan site, returns all sites except Go2Japan
 *   const others = getOtherSisterSites();
 */
export function getOtherSisterSites(): SiteConfig['sisterSites'] {
  return ALL_SISTER_SITES.filter(
    (s) => s.domain !== siteConfig.domain
  );
}

/**
 * Get the Tailwind color config object for use in tailwind.config.js.
 * Maps the site config colors to the format Tailwind expects.
 *
 * @example
 *   // In tailwind.config.js:
 *   const { getTailwindColors } = require('./site.config');
 *   module.exports = {
 *     theme: { extend: { colors: getTailwindColors() } }
 *   };
 */
export function getTailwindColors() {
  return {
    primary: siteConfig.colors.primary,
    secondary: siteConfig.colors.secondary,
    accent: siteConfig.colors.accent,
  };
}

/**
 * Check if a content type is enabled.
 * Useful in getStaticPaths to skip page generation for disabled types.
 *
 * @example
 *   // In pages/islands/index.tsx getStaticProps:
 *   if (!isContentTypeEnabled('islands')) return { notFound: true };
 */
export function isContentTypeEnabled(
  type: keyof SiteConfig['contentTypes']
): boolean {
  return siteConfig.contentTypes[type];
}

/**
 * Get active navigation links, filtering out items whose content type
 * is disabled. Call this instead of reading siteConfig.navigation directly.
 */
export function getActiveNavigation() {
  const contentTypeRouteMap: Record<string, keyof SiteConfig['contentTypes']> = {
    '/city/': 'cities',
    '/islands/': 'islands',
    '/food/': 'food',
    '/drinks/': 'drinks',
    '/transport/': 'transport',
    '/visa/': 'visa',
    '/region/': 'regions',
    '/weather/': 'weather',
    '/blog/': 'blog',
    '/top-10/': 'top10',
    '/practical-info/': 'practicalInfo',
    '/compare/': 'comparisons',
  };

  const isRouteActive = (href: string): boolean => {
    const contentType = contentTypeRouteMap[href];
    if (!contentType) return true; // Non-content routes (home, etc.) always active
    return siteConfig.contentTypes[contentType];
  };

  return {
    mainLinks: siteConfig.navigation.mainLinks.filter((link) =>
      isRouteActive(link.href)
    ),
    dropdowns: siteConfig.navigation.dropdowns
      .map((dropdown) => ({
        ...dropdown,
        items: dropdown.items.filter((item) => isRouteActive(item.href)),
      }))
      .filter((dropdown) => dropdown.items.length > 0),
  };
}

// Default export for convenience
export default siteConfig;
