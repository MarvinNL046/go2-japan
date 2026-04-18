import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

// -----------------------------------------------------------------------------
// Data structures
// -----------------------------------------------------------------------------

const whyCards = [
  {
    title: 'Tallest View in Japan',
    desc: 'At 634 meters, Tokyo Skytree is the tallest freestanding structure in Japan and almost double the height of Tokyo Tower (333m). Observation decks sit at 350m and 450m for a clean sweep over the Kanto plain.',
  },
  {
    title: 'Mt Fuji on Clear Days',
    desc: 'On cold, dry winter days (Dec-Feb), Mt Fuji is visible around 30-40% of the time roughly 100 km to the southwest. Best window: the first hour after opening or the sunset slot.',
  },
  {
    title: 'Skip The Line Exists',
    desc: 'The Fast Skytree ticket bundles the combo deck pass with priority entry. It adds roughly ¥500-900 over the standard combo, but saves 30-60 minutes at peak times (weekends, public holidays, sunset).',
  },
];

const ticketTypes = [
  {
    name: 'Tembo Deck (350m)',
    weekday: '¥1800 / $12',
    weekend: '¥2100 / $14',
    notes: 'Main observation deck, standard entry',
  },
  {
    name: 'Tembo Galleria Combo (350m + 450m)',
    weekday: '¥2700 / $18',
    weekend: '¥3100 / $21',
    notes: 'Both decks, spiral glass walkway at top',
  },
  {
    name: 'Fast Skytree (skip-line + combo)',
    weekday: '¥3500 / $23',
    weekend: '¥4800 / $32',
    notes: 'Priority lane at the tower, combo included',
  },
  {
    name: 'Child (4-11)',
    weekday: '¥900 / $6',
    weekend: '¥1050 / $7',
    notes: 'Combo roughly ¥1350-1550',
  },
  {
    name: 'Teen (12-17)',
    weekday: '¥1400 / $9',
    weekend: '¥1550 / $10',
    notes: 'Combo roughly ¥2050-2400',
  },
  {
    name: 'Date-Timed Entry',
    weekday: 'Same as above',
    weekend: 'Same as above',
    notes: 'Must pre-book a specific time slot online',
  },
  {
    name: 'Sunset Slot Premium',
    weekday: '+¥500',
    weekend: '+¥500',
    notes: 'Applied on select peak sunset days',
  },
];

const providers = [
  {
    name: 'Klook',
    tagline: 'Best Price + Mobile QR',
    headerBg: 'bg-orange-500',
    url: siteConfig.affiliateLinks.klook,
    cta: 'Check Klook Prices',
    bullets: [
      'Dominant booking platform across Asia and Japan',
      'Instant confirmation, mobile-only QR at the gate',
      'Often 10-15% cheaper than the official website',
      'Date-timed entry slots with flexible changes',
    ],
  },
  {
    name: 'GetYourGuide',
    tagline: 'Free Cancellation 24h',
    headerBg: 'bg-blue-600',
    url: siteConfig.affiliateLinks.getYourGuide,
    cta: 'Book via GetYourGuide',
    bullets: [
      'Verified traveler reviews in English',
      '24-hour free cancellation on most ticket types',
      'Mobile QR voucher, no printing needed',
      'English-language customer support',
    ],
  },
  {
    name: 'Viator',
    tagline: 'Combos with Asakusa + Sumida',
    headerBg: 'bg-red-600',
    url: siteConfig.affiliateLinks.viator,
    cta: 'See Viator Bundles',
    bullets: [
      'TripAdvisor-owned, huge review database',
      'Strong for Skytree + Asakusa walking tour bundles',
      'Combined tickets with Sumida river cruise',
      'Good pick if you want a guided intro',
    ],
  },
  {
    name: 'Tokyo Skytree Official',
    tagline: 'Cheapest if Same-Day',
    headerBg: 'bg-gray-700',
    url: 'https://www.tokyo-skytree.jp/en/',
    cta: 'Open Official Site',
    bullets: [
      'Lowest base price for walk-up same-day tickets',
      'English site is clunky compared to OTAs',
      'Physical ticket pickup at counter on arrival',
      'No mobile QR for international credit cards',
    ],
  },
];

const skyTreeVsAlternatives = [
  {
    tower: 'Tokyo Skytree',
    height: '634m',
    price: '¥1800-3500',
    vibe: 'Modern, tallest, glass floor',
    bestFor: 'Big panoramas + Mt Fuji',
  },
  {
    tower: 'Tokyo Tower',
    height: '333m',
    price: '¥1200-3000',
    vibe: 'Retro Eiffel-style red tower',
    bestFor: 'Classic nostalgic photo op',
  },
  {
    tower: 'Shibuya Sky',
    height: '230m',
    price: '¥2500',
    vibe: 'Open-air rooftop, scramble view',
    bestFor: 'Outdoor rooftop + city energy',
  },
  {
    tower: 'Roppongi Hills Mori',
    height: '250m',
    price: '¥2000',
    vibe: 'Indoor + outdoor Sky Deck',
    bestFor: 'Tokyo Tower lit-up shot',
  },
];

const bestTimeToVisit = [
  {
    season: 'Winter (Dec-Feb)',
    mtFuji: 'Best (30-40% of days)',
    crowd: 'Moderate weekdays',
    note: 'Cold dry air = clear horizon, target first hour after opening',
  },
  {
    season: 'Spring (Mar-May)',
    mtFuji: 'Poor (haze starts)',
    crowd: 'Very busy (sakura + Golden Week)',
    note: 'Pre-book Fast Skytree for late April and early May',
  },
  {
    season: 'Summer (Jun-Aug)',
    mtFuji: 'Very poor (5-10%)',
    crowd: 'Busy evenings',
    note: 'Sunset slots sell out, book 3-5 days ahead',
  },
  {
    season: 'Autumn (Sep-Nov)',
    mtFuji: 'Moderate by late Nov',
    crowd: 'Moderate',
    note: 'Typhoon risk Sep, great visibility by mid-November',
  },
];

const sunsetTimes2026 = [
  { month: 'January', sunset: 'Around 16:50' },
  { month: 'March', sunset: 'Around 17:50' },
  { month: 'May', sunset: 'Around 18:45' },
  { month: 'July', sunset: 'Around 18:55' },
  { month: 'September', sunset: 'Around 17:50' },
  { month: 'November', sunset: 'Around 16:30' },
];

const commonMistakes = [
  'Buying the weekend Galleria combo when you do not actually need the 450m spiral walkway (the 350m deck already delivers the main view).',
  'Assuming Mt Fuji is visible year-round. It is only clearly visible on about 20% of days overall, heavily skewed toward winter.',
  'Not pre-booking the sunset slot in summer. Popular evenings sell out 2-5 days in advance.',
  'Going at 10am opening. This is the worst window because tour groups hit at the same time. Aim for 11am-2pm or the last 2 hours of the day.',
  'Mixing up Tokyo Tower and Tokyo Skytree. They are different towers, different sides of the city, roughly half an hour apart.',
  'Buying the Fast Skytree pass on a quiet off-peak weekday when standard entry has almost no queue and saves you real money.',
];

const faqItems = [
  {
    q: 'How much are Tokyo Skytree tickets in 2026?',
    a: 'In 2026, the Tembo Deck (350m) is ¥1800 on weekdays and ¥2100 on weekends for adults. The combo with Tembo Galleria (450m) is ¥2700 weekday and ¥3100 weekend. The skip-line Fast Skytree ticket ranges ¥3500-4800 depending on day and provider. Children 4-11 pay roughly half, teens 12-17 pay about 75%.',
  },
  {
    q: 'Is the Tokyo Skytree worth it over Tokyo Tower?',
    a: 'For views, Skytree wins by a wide margin because it is 634m vs 333m and sits further out with clearer sightlines to Mt Fuji on good days. Tokyo Tower is cheaper (¥1200) and has more retro character, and it is also the only tower you can photograph from the other tower. If you only do one, pick Skytree for the view and Tokyo Tower if you prefer vintage Showa-era vibes.',
  },
  {
    q: 'Do I need to book Tokyo Skytree tickets in advance?',
    a: 'On weekdays outside holidays you can usually walk up, but on weekends, public holidays, and peak sunset slots (especially summer), pre-booking through Klook or GetYourGuide is strongly recommended. A date-timed ticket costs the same as walk-up but guarantees your entry window.',
  },
  {
    q: 'Can you see Mt Fuji from Tokyo Skytree?',
    a: 'Yes, on clear days. Mt Fuji sits roughly 100 km southwest. Visibility is best on cold, dry winter mornings (Dec-Feb) when it shows on 30-40% of days. Summer visibility drops to 5-10% because of haze. Check the live webcam or a Fuji visibility index in the morning before booking.',
  },
  {
    q: 'What is the best time to visit Tokyo Skytree?',
    a: 'For Mt Fuji, aim for the first hour after opening (10am-11am) in winter. For photography and atmosphere, the sunset slot is unbeatable year-round. Avoid the 10am-11am weekend window and late afternoons on Japanese public holidays.',
  },
  {
    q: 'What is the Fast Skytree ticket and is it worth it?',
    a: 'Fast Skytree bundles the combo deck (350m + 450m) with priority entry. At ¥3500-4800 it costs about ¥500-900 more than the standard combo. It is worth it on weekends, public holidays, and around sunset when queues hit 30-60 minutes. On a quiet Tuesday morning, skip it.',
  },
  {
    q: 'Is Shibuya Sky or Skytree better for views?',
    a: 'Different experiences. Shibuya Sky (230m) is open-air rooftop, right above the Shibuya scramble, and feels immersive and urban. Skytree (634m) is enclosed glass at much greater height, cleaner panorama, and the only real shot at Mt Fuji. Do Shibuya Sky for sunset over the city and Skytree for sheer altitude plus Fuji.',
  },
  {
    q: 'What is the difference between Tembo Deck and Galleria?',
    a: 'Tembo Deck is the main 350m observation level with three floors, cafe, and floor-to-ceiling windows including a glass floor panel. Tembo Galleria is the upper 445-450m spiral glass walkway, narrower, with a clear top-reach point. Galleria is worth it for first-timers and photographers, skippable on a repeat visit.',
  },
];

// -----------------------------------------------------------------------------
// JSON-LD schemas
// -----------------------------------------------------------------------------

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tokyo Skytree Tickets 2026: Real Prices, Where to Book & Best Time',
  description:
    'Real 2026 Tokyo Skytree prices (¥1800-3500), where to book online with Klook, GetYourGuide, Viator, plus best time for Mt Fuji views and when the skip-line pass is worth it.',
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  datePublished: '2026-04-18',
  dateModified: '2026-04-18',
  mainEntityOfPage: `${siteConfig.seo.siteUrl}/tokyo-skytree-tickets/`,
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

// -----------------------------------------------------------------------------
// Page component
// -----------------------------------------------------------------------------

export default function TokyoSkytreeTicketsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`Tokyo Skytree Tickets 2026: Real Prices, Where to Book & Best Time | ${siteConfig.name}`}
        description="Real 2026 Tokyo Skytree prices (¥1800-3500), where to book online with Klook, GetYourGuide, Viator, plus best time for Mt Fuji views and when the skip-line pass is worth it."
        path="/tokyo-skytree-tickets/"
        jsonLd={[articleJsonLd, faqJsonLd]}
      />

      <div className="container-custom py-8 lg:py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">
            Tokyo Skytree Tickets 2026: Prices, Best Time & Where to Book
          </h1>
          <p className="text-warm-500 text-lg max-w-3xl mb-5">
            The honest 2026 guide to real Tokyo Skytree prices, which booking site gives the best deal, and exactly when to go for Mt Fuji views and the shortest queues.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">From ¥1800</span>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">Skip-the-Line Available</span>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">Mt Fuji View</span>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">Updated April 2026</span>
          </div>
        </div>

        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: 'Tokyo Skytree Tickets', href: '/tokyo-skytree-tickets/' },
        ]} />

        {/* What is Tokyo Skytree */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">What is Tokyo Skytree?</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                Tokyo Skytree is a 634 meter broadcasting and observation tower in Sumida, eastern Tokyo. It opened in 2012 and is the tallest freestanding structure in Japan and one of the tallest in the world. Two observation decks are open to the public: the Tembo Deck at 350m and the Tembo Galleria at 445-450m reached by a spiral glass walkway.
              </p>
              <p>
                The base of the tower is the Tokyo Solamachi complex, a 300-plus shop mall with the Sumida Aquarium, a planetarium, restaurant floors, and a Pokemon Center. Access is easiest via Tobu Skytree Station or a 10 minute walk from Oshiage Station on the Tokyo Metro Hanzomon line.
              </p>
            </div>
          </div>
        </section>

        {/* Why book Tokyo Skytree */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Why Book Tokyo Skytree Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <div key={card.title} className="card-flat p-6">
                <h3 className="font-display text-base text-warm-900 mb-2">{card.title}</h3>
                <p className="text-warm-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real 2026 prices */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Real 2026 Tokyo Skytree Prices</h2>
          <p className="text-warm-600 mb-6 max-w-3xl">
            Prices updated April 2026. Yen is the official currency, USD conversions are rounded at roughly ¥150/$1 for reference.
          </p>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Ticket</th>
                    <th className="px-4 py-3 font-display text-warm-900">Weekday</th>
                    <th className="px-4 py-3 font-display text-warm-900">Weekend / Holiday</th>
                    <th className="px-4 py-3 font-display text-warm-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {ticketTypes.map((row) => (
                    <tr key={row.name}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-warm-600">{row.weekday}</td>
                      <td className="px-4 py-3 text-warm-600">{row.weekend}</td>
                      <td className="px-4 py-3 text-warm-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where to book */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Where To Book Tokyo Skytree Tickets</h2>
          <p className="text-warm-600 mb-6 max-w-3xl">
            Four realistic options. For most international travelers, Klook or GetYourGuide give the best mix of price, mobile QR entry, and English support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((prov) => (
              <div key={prov.name} className="card-flat overflow-hidden flex flex-col">
                <div className={`${prov.headerBg} text-white p-5`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg">{prov.name}</h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{prov.tagline}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2 text-warm-600 text-sm mb-5 flex-1">
                    {prov.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-brand-primary font-bold">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={prov.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block bg-brand-primary text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-brand-primary/90 transition-colors text-sm"
                  >
                    {prov.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skytree vs alternatives */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Tokyo Skytree vs Tokyo Tower vs Shibuya Sky</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Tower</th>
                    <th className="px-4 py-3 font-display text-warm-900">Height</th>
                    <th className="px-4 py-3 font-display text-warm-900">Price Range</th>
                    <th className="px-4 py-3 font-display text-warm-900">Vibe</th>
                    <th className="px-4 py-3 font-display text-warm-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {skyTreeVsAlternatives.map((row) => (
                    <tr key={row.tower}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.tower}</td>
                      <td className="px-4 py-3 text-warm-600">{row.height}</td>
                      <td className="px-4 py-3 text-warm-600">{row.price}</td>
                      <td className="px-4 py-3 text-warm-600">{row.vibe}</td>
                      <td className="px-4 py-3 text-warm-600">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Best time to visit */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Best Time To Visit Tokyo Skytree</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-flat overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-warm-100">
                    <tr>
                      <th className="px-4 py-3 font-display text-warm-900">Season</th>
                      <th className="px-4 py-3 font-display text-warm-900">Mt Fuji Visible</th>
                      <th className="px-4 py-3 font-display text-warm-900">Crowds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {bestTimeToVisit.map((row) => (
                      <tr key={row.season}>
                        <td className="px-4 py-3 text-warm-700 font-medium">{row.season}</td>
                        <td className="px-4 py-3 text-warm-600">{row.mtFuji}</td>
                        <td className="px-4 py-3 text-warm-600">{row.crowd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-warm-100 text-warm-600 text-xs">
                Note column:
                <ul className="mt-2 space-y-1 list-disc pl-4">
                  {bestTimeToVisit.map((row) => (
                    <li key={row.season}><span className="font-medium text-warm-700">{row.season}:</span> {row.note}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-4">Approximate Sunset Times 2026 (Tokyo)</h3>
              <p className="text-warm-600 text-sm mb-4">
                Entry for the sunset slot is usually scheduled 45-60 minutes before sunset. Aim to be on the deck 30 minutes before last light for the full blue hour.
              </p>
              <ul className="divide-y divide-warm-100">
                {sunsetTimes2026.map((row) => (
                  <li key={row.month} className="flex justify-between py-2 text-sm">
                    <span className="text-warm-700 font-medium">{row.month}</span>
                    <span className="text-warm-600">{row.sunset}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What to expect on-site */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">What To Expect On-Site</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Tokyo Solamachi Mall</h3>
              <p className="text-warm-600 text-sm">
                The base of the tower is a 300-plus shop mall spanning seven floors. Expect Japanese lifestyle brands, a Pokemon Center, Studio Ghibli Donguri Kyowakoku, souvenir stores, and a food hall on the 1st floor. Budget 1-2 hours if you plan to browse properly.
              </p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Sumida Aquarium</h3>
              <p className="text-warm-600 text-sm">
                On floors 5 and 6 of Solamachi. Compact but modern aquarium with a large open-top penguin pool, jellyfish tanks, and touch pools. Worth adding if you travel with kids. Around ¥2500 adult, often bundled with Skytree on Klook.
              </p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Restaurant Floors</h3>
              <p className="text-warm-600 text-sm">
                Floors 6, 7, and 30-31 hold restaurants with everything from affordable ramen and tonkatsu to high-end Sky Restaurant 634 inside the tower itself at 345m. If you just want a view + meal without the hike to the top deck, the 30-31 floors of Solamachi are a smart budget option.
              </p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Konica Minolta Planetarium</h3>
              <p className="text-warm-600 text-sm">
                On the 7th floor of Solamachi. Seated dome planetarium with rotating programs including aromatherapy sessions. Fun rainy-day backup if the top of the tower is clouded over. Around ¥1600 adult.
              </p>
            </div>
          </div>
        </section>

        {/* Access */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Access From Central Tokyo</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom mb-6">
              <p>
                Tokyo Skytree sits in Sumida ward, north-east of central Tokyo. The tower is roughly 20-30 minutes from Shinjuku, Shibuya, and Tokyo Station by train.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-2">Tobu Skytree Station</h4>
                <p className="text-warm-600 text-sm">Tobu Isesaki Line. Direct 0 minute walk from the station into Solamachi. Best for arrivals from Asakusa (one stop).</p>
              </div>
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-2">Oshiage Station</h4>
                <p className="text-warm-600 text-sm">Tokyo Metro Hanzomon line, Toei Asakusa line, Keisei line. 10 minute sheltered walk through Solamachi. Best for Shibuya and Narita airport arrivals.</p>
              </div>
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-2">From Asakusa</h4>
                <p className="text-warm-600 text-sm">20-25 minute walk over Sumida river via Azuma bridge, or a ¥150 short shuttle bus. The walk past the Asahi Flame building is a classic Tokyo skyline shot.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common booking mistakes */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Common Booking Mistakes To Avoid</h2>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <ul className="space-y-3">
              {commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-3 text-orange-900 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="card-flat p-5 group">
                <summary className="font-display text-warm-900 cursor-pointer list-none flex justify-between items-start gap-4">
                  <span>{item.q}</span>
                  <span className="text-brand-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-warm-600 text-sm mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-links - siblings */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Keep Planning Your Tokyo Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/mt-fuji-day-tour/" className="card-flat p-6 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-base text-warm-900 mb-2">Mt Fuji Day Tour From Tokyo</h3>
              <p className="text-warm-600 text-sm">Real 2026 prices, best operators, and how to pick between a group tour and going self-guided by train.</p>
            </a>
            <a href="/universal-studios-japan-tickets/" className="card-flat p-6 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-base text-warm-900 mb-2">Universal Studios Japan Tickets</h3>
              <p className="text-warm-600 text-sm">USJ Osaka ticket prices, Express Pass guide, and when the skip-line pass actually saves time.</p>
            </a>
          </div>
        </section>

        {/* Related reading */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Related Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/blog/hidden-gems-tokyo/" className="card-flat p-5 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Hidden Gems in Tokyo</h3>
              <p className="text-warm-600 text-xs">Lesser-known neighborhoods worth a half-day.</p>
            </a>
            <a href="/blog/best-day-trips-tokyo/" className="card-flat p-5 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Best Day Trips From Tokyo</h3>
              <p className="text-warm-600 text-xs">Nikko, Kamakura, Hakone, Mt Fuji compared.</p>
            </a>
            <a href="/blog/teamlab-tokyo-worth-it/" className="card-flat p-5 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-sm text-warm-900 mb-1">teamLab Tokyo: Worth It?</h3>
              <p className="text-warm-600 text-xs">Planets vs Borderless, ticket tactics, honest take.</p>
            </a>
            <a href="/blog/japan-travel-guide-2026/" className="card-flat p-5 hover:border-brand-primary transition-colors block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Japan Travel Guide 2026</h3>
              <p className="text-warm-600 text-xs">Visa, JR Pass, IC cards, and budget per day.</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
