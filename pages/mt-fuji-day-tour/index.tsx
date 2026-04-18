import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

// -----------------------------------------------------------------------------
// Data: Why book a Mt Fuji day tour vs DIY
// -----------------------------------------------------------------------------
const whyCards = [
  {
    title: 'Avoid 3 Trains + 1 Bus DIY',
    desc: 'Getting from Shinjuku to Mt Fuji 5th Station without a tour means the JR Chuo line to Otsuki, Fujikyu Railway to Kawaguchiko, plus a seasonal Fuji Subaru Line bus. A single missed connection kills your whole day.',
  },
  {
    title: 'English-Speaking Guide',
    desc: 'A licensed guide explains the volcano geology, Sengen shrine culture, and the story behind Oshino Hakkai spring village. DIY gives you the viewpoint but none of the context.',
  },
  {
    title: 'Hotel Pickup Included',
    desc: 'Most Mt Fuji day tours pick up at Shinjuku, Tokyo Station, or Asakusa between 7:00 and 8:00 and drop you back at Shinjuku by 19:00. Zero logistics stress.',
  },
];

// -----------------------------------------------------------------------------
// Data: 6 real 2026 Mt Fuji day tour types
// -----------------------------------------------------------------------------
const tourTypes = [
  {
    name: 'Budget Group Bus Tour',
    price: '¥8,000-11,000',
    usd: '$55-75',
    duration: '9-10h',
    highlights: 'Shinjuku pickup, multilingual audio guide, 3-4 stops, large bus (40+ pax)',
  },
  {
    name: 'Standard Group Tour (English Guide)',
    price: '¥12,000-15,000',
    usd: '$80-100',
    duration: '10h',
    highlights: '4 stops including 5th Station, Kawaguchi, Oshino Hakkai, Oishi Park, live English narration',
  },
  {
    name: 'Premium Small-Group Tour',
    price: '¥15,500-18,500',
    usd: '$105-125',
    duration: '10-11h',
    highlights: '8-10 pax minibus, extra photo stops, boat ride or ropeway included',
  },
  {
    name: 'Lake Kawaguchi + Hakone Combo',
    price: '¥14,000-17,000',
    usd: '$93-113',
    duration: '11h',
    highlights: 'Fuji view at Kawaguchi plus Hakone onsen area, return via Odawara Shinkansen',
  },
  {
    name: 'Private Car + Driver (up to 6)',
    price: '¥55,000-80,000',
    usd: '$365-535',
    duration: 'Flexible 9-12h',
    highlights: 'Your own itinerary, hotel door-to-door, best for families or photographers',
  },
  {
    name: 'Chureito Pagoda Sunrise Tour',
    price: '¥17,000-22,000',
    usd: '$113-147',
    duration: '10-11h',
    highlights: '4am wake-up, iconic pagoda plus Fuji plus cherry blossom frame shot, small group',
  },
];

// -----------------------------------------------------------------------------
// Data: Booking providers
// -----------------------------------------------------------------------------
const providers = [
  {
    name: 'Viator',
    tagline: 'Biggest Selection + Combos',
    href: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    hover: 'hover:bg-red-700',
    highlights: [
      '100+ Mt Fuji tour listings from multiple operators',
      'TripAdvisor-linked reviews on every tour',
      'Free cancellation on most tours up to 24h before',
      'Strong on Fuji plus Hakone and overnight combos',
    ],
    cta: 'See Viator Mt Fuji Tours',
  },
  {
    name: 'GetYourGuide',
    tagline: 'Best Cancellation + English Support',
    href: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    highlights: [
      '24h free cancellation on almost every Mt Fuji listing',
      'Mobile QR ticketing, no printed voucher needed',
      'Instant confirmation, English customer support',
      'Clean UX for comparing small-group vs budget buses',
    ],
    cta: 'Browse GetYourGuide Fuji Tours',
  },
  {
    name: 'Klook',
    tagline: 'Dominant in Asia + Mobile First',
    href: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    hover: 'hover:bg-orange-600',
    highlights: [
      'Largest Asia-market tour inventory and local operators',
      'Often 5-10% cheaper on the same identical tour',
      'App-first booking with in-app vouchers and chat',
      'Good for combo passes (Fuji plus JR pass or eSIM)',
    ],
    cta: 'Check Klook Mt Fuji Prices',
  },
];

// -----------------------------------------------------------------------------
// Data: Typical day itinerary
// -----------------------------------------------------------------------------
const itinerary = [
  { time: '7:00', stop: 'Shinjuku pickup', note: 'Meet at tour desk, passport check' },
  { time: '8:30', stop: 'Highway rest area', note: 'Restroom break, coffee, snacks' },
  { time: '9:30', stop: 'Mt Fuji 5th Station (2,305m)', note: 'Fuji Subaru Line, 1 hour stop' },
  { time: '11:00', stop: 'Lake Kawaguchi boat + lunch', note: 'Sightseeing cruise, 1.5 hours' },
  { time: '13:00', stop: 'Oshino Hakkai spring village', note: 'Eight sacred ponds, 45 minutes' },
  { time: '14:30', stop: 'Oishi Park viewpoint', note: 'Best Fuji photo framing over the lake' },
  { time: '18:30', stop: 'Shinjuku return drop-off', note: 'Traffic dependent, can extend to 19:30' },
];

// -----------------------------------------------------------------------------
// Data: Best time to visit (month-by-month visibility)
// -----------------------------------------------------------------------------
const bestTimeToVisit = [
  { month: 'November - February', visibility: '40-50% clear days', note: 'Best overall visibility. Cold at 5th Station, flowers limited.' },
  { month: 'March', visibility: '30-35% clear', note: 'Cherry blossom plus Fuji framing, peak photographer season.' },
  { month: 'April - May', visibility: '25-30% clear', note: 'Shibazakura pink moss at Fuji Motosuko festival.' },
  { month: 'June - early July', visibility: '15-20% clear', note: 'Rainy season, worst visibility of the year.' },
  { month: 'Mid July - early September', visibility: '20-25% clear', note: 'Official climbing season, summit open, very crowded.' },
  { month: 'September - October', visibility: '30-40% clear', note: 'Autumn foliage plus steadily clearer days.' },
];

// -----------------------------------------------------------------------------
// Data: Common mistakes travelers make
// -----------------------------------------------------------------------------
const commonMistakes = [
  'Assuming you will see Fuji any day. The summit is cloud-hidden 60-70% of days, even on clear Tokyo mornings.',
  'Booking a tour in climbing season expecting to ascend. Almost all day tours stop at the 5th Station only.',
  'Leaving only 3 hours in your schedule. Minimum return trip from Tokyo is 8 hours door to door.',
  'Not checking the weather the night before. Many tour operators let you cancel or rebook if cloud forecast is bad.',
  'Showing up to the 5th Station in sandals and a t-shirt. Temperature drops 10-15°C, and wind is serious.',
  'Paying ¥80,000 for a private car when two people could join a group tour at ¥14,000 each and see the same stops.',
];

// -----------------------------------------------------------------------------
// Data: FAQ
// -----------------------------------------------------------------------------
const faqItems = [
  {
    q: 'How much does a Mt Fuji day tour from Tokyo cost in 2026?',
    a: 'Budget group bus tours start at ¥8,000-11,000 ($55-75). Standard English-guided group tours run ¥12,000-15,000 ($80-100). Premium small-group tours are ¥15,500-18,500, and a full private car with driver for up to six people runs ¥55,000-80,000 for the whole group.',
  },
  {
    q: 'When is the best time to see Mt Fuji?',
    a: 'November through February gives you the highest clear-sky probability at roughly 40-50%. The worst months are June through early July (rainy season). March adds cherry blossoms, and April-May brings the shibazakura pink moss bloom near Fuji Motosuko.',
  },
  {
    q: 'Can I climb Mt Fuji on a day tour?',
    a: 'No. Standard day tours stop at the 5th Station (2,305m). Climbing to the summit requires an overnight mountain-hut stay, the official July 1 to early September window, and a ¥2,000 online entry reservation via the Mt Fuji Climbing Reservation system.',
  },
  {
    q: 'How long does a Mt Fuji day tour take?',
    a: 'Expect 9 to 11 hours door to door from Tokyo. Pickup is usually 7:00-8:00 at Shinjuku, and you return around 18:30-19:30. The drive is 2 to 2.5 hours each way, plus 4 to 5 hours at stops.',
  },
  {
    q: 'What if Mt Fuji isn\'t visible on my tour day?',
    a: 'The tour still runs. You visit Lake Kawaguchi, Oshino Hakkai, and the 5th Station regardless of visibility. Some operators allow free rescheduling if weather forecasts are bad the night before. Viator and GetYourGuide are strongest on flexible cancellation.',
  },
  {
    q: 'Is a Mt Fuji tour worth it or should I DIY?',
    a: 'For most first-timers a tour wins. DIY costs ¥6,500-9,000 round trip by train plus bus, but adds 3 transfers, timing risk, and zero cultural context. A ¥14,000 group tour includes pickup, guide, and lunch plans. DIY only makes sense if you want to stay overnight near the lakes.',
  },
  {
    q: 'Where do Mt Fuji tours pick up from in Tokyo?',
    a: 'The three most common pickup points are Shinjuku (west side, LOVE monument or tour desk), Tokyo Station (Yaesu exit), and Asakusa (Kaminarimon area). Shinjuku has the widest tour selection. Always confirm the exact meeting spot 24 hours before.',
  },
  {
    q: 'Can I combine Mt Fuji with Hakone in one day?',
    a: 'Yes, and it is one of the most popular combos. Expect 11 hours total. You get Lake Kawaguchi plus an onsen-town viewpoint, usually ending at Odawara Station with a Shinkansen return to Tokyo. Prices run ¥14,000-17,000.',
  },
];

// -----------------------------------------------------------------------------
// JSON-LD: Article + FAQPage
// -----------------------------------------------------------------------------
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mt Fuji Day Tour from Tokyo 2026: Prices, Best Tours & Where to Book',
  description:
    'Real 2026 Mt Fuji day tour prices from Tokyo, comparison of Viator, GetYourGuide, and Klook, itineraries, best-visibility months, and DIY cost math.',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  mainEntityOfPage: `${siteConfig.seo.siteUrl}/mt-fuji-day-tour/`,
  datePublished: '2026-04-18',
  dateModified: '2026-04-18',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------
export default function MtFujiDayTour() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`Mt Fuji Day Tour from Tokyo 2026: Prices, Best Tours & Where to Book | ${siteConfig.name}`}
        description="Real 2026 Mt Fuji day tour prices (¥11,000-18,000) — compare Viator, GetYourGuide, and Klook tours with itineraries, best-visibility months, and the DIY cost math."
        path="/mt-fuji-day-tour/"
        jsonLd={[articleJsonLd, faqJsonLd]}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { name: t('nav.home'), href: '/' },
            { name: 'Mt Fuji Day Tour', href: '/mt-fuji-day-tour/' },
          ]}
        />

        {/* Hero */}
        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">
            Mt Fuji Day Tour from Tokyo 2026: Prices, Best Tours, Where to Book
          </h1>
          <p className="text-warm-500 text-lg max-w-3xl mb-5">
            Real 2026 prices, a breakdown of six tour types, honest visibility odds by month, and
            the cost math on DIY versus booking a guided trip. No fluff, just the information you
            need to pick a tour and lock in a date.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">
              From ¥11,000
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">
              6 Tour Types
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-50 text-brand-primary-800 text-sm font-medium">
              English Guides
            </span>
          </div>
        </div>

        {/* What to expect */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            What to expect on a Mt Fuji day tour
          </h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                A standard Mt Fuji day tour from Tokyo is a 9 to 11 hour round trip that covers
                five canonical stops: Mt Fuji 5th Station via the Fuji Subaru Line (up to 2,305m),
                Lake Kawaguchi, the Oshino Hakkai spring village, Oishi Park viewpoint, and a
                seasonal stop at Shibazakura or Gotemba Premium Outlets. The distance from Tokyo
                to the 5th Station is 115km, about 2 to 2.5 hours by highway bus.
              </p>
              <p>
                Mt Fuji itself is hidden behind clouds on 60 to 70% of days, so tour operators
                always include the lakes and spring village as a backup experience. November
                through February are the clearest months at 40-50% visibility. Summer climbing
                season (July 1 to early September) has the highest crowds and the worst summit
                visibility at just 15-20%.
              </p>
            </div>
          </div>
        </section>

        {/* Why book a tour vs DIY */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            Why book a tour versus going DIY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <div key={card.title} className="card-flat p-6 border-l-4 border-l-brand-primary">
                <h3 className="font-display text-base text-warm-900 mb-2">{card.title}</h3>
                <p className="text-warm-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6 tour types */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            6 tour types: real 2026 prices
          </h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Tour type</th>
                    <th className="px-4 py-3 font-display text-warm-900">Price (JPY)</th>
                    <th className="px-4 py-3 font-display text-warm-900">Price (USD)</th>
                    <th className="px-4 py-3 font-display text-warm-900">Duration</th>
                    <th className="px-4 py-3 font-display text-warm-900">What is included</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {tourTypes.map((tour) => (
                    <tr key={tour.name}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{tour.name}</td>
                      <td className="px-4 py-3 text-warm-900 font-medium">{tour.price}</td>
                      <td className="px-4 py-3 text-warm-600">{tour.usd}</td>
                      <td className="px-4 py-3 text-warm-600">{tour.duration}</td>
                      <td className="px-4 py-3 text-warm-600">{tour.highlights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-warm-500 text-xs mt-3">
            Prices verified April 2026 across Viator, GetYourGuide, and Klook. JPY/USD at 150:1.
          </p>
        </section>

        {/* Where to book */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            Where to book: 3 platforms compared
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map((p) => (
              <div key={p.name} className="card-flat overflow-hidden flex flex-col">
                <div className={`${p.color} text-white p-5`}>
                  <h3 className="font-display text-lg mb-1">{p.name}</h3>
                  <p className="text-white/90 text-sm">{p.tagline}</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2 text-sm text-warm-600 mb-5 flex-1">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-brand-primary font-bold">+</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`block ${p.color} ${p.hover} text-white text-center px-4 py-2 rounded-xl font-semibold transition-colors text-sm`}
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typical day itinerary */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Typical day itinerary</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900 w-24">Time</th>
                    <th className="px-4 py-3 font-display text-warm-900">Stop</th>
                    <th className="px-4 py-3 font-display text-warm-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {itinerary.map((row) => (
                    <tr key={row.time}>
                      <td className="px-4 py-3 text-warm-900 font-medium">{row.time}</td>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.stop}</td>
                      <td className="px-4 py-3 text-warm-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Best time to see Mt Fuji */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Best time to see Mt Fuji</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Months</th>
                    <th className="px-4 py-3 font-display text-warm-900">Visibility</th>
                    <th className="px-4 py-3 font-display text-warm-900">What to expect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {bestTimeToVisit.map((row) => (
                    <tr key={row.month}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.month}</td>
                      <td className="px-4 py-3 text-warm-900 font-medium">{row.visibility}</td>
                      <td className="px-4 py-3 text-warm-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chureito Pagoda */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            Chureito Pagoda: the iconic shot
          </h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                The five-storied Chureito Pagoda at Arakurayama Sengen Park is the single most
                photographed Fuji view in Japan. It is a 100m uphill climb (about 400 steps) from
                Shimoyoshida Station on the Fujikyu Line. The iconic frame stacks the pagoda,
                cherry blossoms or autumn leaves, and Mt Fuji in a single shot.
              </p>
              <p>
                Best timing is roughly 30 minutes before sunrise for soft pink light on Fuji. Most
                dedicated sunrise tours leave Tokyo around 4:00 AM and reach the pagoda before
                dawn. During April cherry blossom peak week the viewing platform gets slammed, so
                a small-group tour with a held spot is worth the premium.
              </p>
            </div>
          </div>
        </section>

        {/* Climbing Mt Fuji */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            Climbing Mt Fuji (July-September season)
          </h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>
                The summit is only open July 1 through early September. Outside of this window
                trails are closed, mountain huts are shut, and attempting the ascent is illegal.
                The climbing fee was formalized in 2024 and is now ¥2,000 per climber, paid online
                via the official Mt Fuji Climbing Reservation system before your arrival.
              </p>
              <p>
                The most common route (Yoshida Trail) takes 5 to 7 hours up from the 5th Station
                and 3 to 5 hours back down. Nearly all climbers stay overnight in a mountain hut
                around the 7th or 8th station, then continue at 2:00 AM for the traditional summit
                sunrise. This is a completely different product from a day tour. If you want to
                climb, book a dedicated 2-day overnight climb, not a sightseeing bus.
              </p>
            </div>
          </div>
        </section>

        {/* DIY vs tour cost breakdown */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">
            DIY versus tour: the cost math
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-3">DIY (train plus bus)</h3>
              <ul className="space-y-2 text-sm text-warm-600 mb-4">
                <li>JR Shinjuku to Otsuki: ¥1,340 each way</li>
                <li>Fujikyu Railway Otsuki to Kawaguchiko: ¥1,170 each way</li>
                <li>Fuji Subaru Line bus to 5th Station: ¥2,300 round trip</li>
                <li>Lunch and snacks: ¥1,500</li>
              </ul>
              <div className="border-t border-warm-100 pt-3">
                <div className="flex justify-between font-medium text-warm-900">
                  <span>DIY total</span>
                  <span>¥6,500-9,000</span>
                </div>
                <p className="text-warm-500 text-xs mt-2">
                  Plus 3 transfers, risk of missed connections, no English commentary.
                </p>
              </div>
            </div>
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-lg text-warm-900 mb-3">Standard group tour</h3>
              <ul className="space-y-2 text-sm text-warm-600 mb-4">
                <li>Shinjuku hotel pickup</li>
                <li>English-speaking licensed guide</li>
                <li>All entry fees and the Subaru Line bus</li>
                <li>Lake Kawaguchi boat included on most tours</li>
              </ul>
              <div className="border-t border-warm-100 pt-3">
                <div className="flex justify-between font-medium text-warm-900">
                  <span>Tour total</span>
                  <span>¥12,000-15,000</span>
                </div>
                <p className="text-warm-500 text-xs mt-2">
                  Net cost over DIY: ¥5,500-6,000 for zero logistics and full commentary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Common mistakes to avoid</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <ul className="space-y-3">
              {commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-3 text-warm-700 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary-50 text-brand-primary-800 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Access from Tokyo details */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Access from Tokyo details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Pickup points</h3>
              <ul className="space-y-2 text-sm text-warm-600">
                <li><strong className="text-warm-900">Shinjuku:</strong> West exit tour desks, LOVE monument, widest tour selection</li>
                <li><strong className="text-warm-900">Tokyo Station:</strong> Yaesu central exit, good for Marunouchi hotels</li>
                <li><strong className="text-warm-900">Asakusa:</strong> Kaminarimon area, fewer tours but convenient for east Tokyo</li>
                <li><strong className="text-warm-900">Shibuya:</strong> Rare, usually only private tours</li>
              </ul>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Public transport alternative</h3>
              <ul className="space-y-2 text-sm text-warm-600">
                <li><strong className="text-warm-900">Shinjuku Highway Bus Terminal:</strong> direct bus to Kawaguchiko in 1h 45min (¥2,100)</li>
                <li><strong className="text-warm-900">Chuo Line to Otsuki:</strong> then Fujikyu Railway (~2h 15min)</li>
                <li><strong className="text-warm-900">Seasonal Subaru Line bus:</strong> closed mid-winter, check calendar</li>
                <li><strong className="text-warm-900">Self-drive:</strong> ¥12,000-16,000 all-in with tolls and fuel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What to bring */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">What to bring</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm text-warm-600">
                <li><strong className="text-warm-900">Layers:</strong> 5th Station is 10-15°C colder than Tokyo year-round</li>
                <li><strong className="text-warm-900">Closed shoes:</strong> no sandals, the ash is rough and wind picks up</li>
                <li><strong className="text-warm-900">Water:</strong> 5th Station prices double what you pay in Tokyo</li>
                <li><strong className="text-warm-900">Cash:</strong> ¥3,000-5,000 for lunch and souvenirs, some shops refuse cards</li>
              </ul>
              <ul className="space-y-2 text-sm text-warm-600">
                <li><strong className="text-warm-900">Camera with zoom:</strong> telephoto 70-200mm compresses Fuji beautifully</li>
                <li><strong className="text-warm-900">Portable charger:</strong> cold air drains batteries fast</li>
                <li><strong className="text-warm-900">Motion sickness meds:</strong> highway plus winding Subaru Line</li>
                <li><strong className="text-warm-900">Sunglasses:</strong> reflection off snow or lake is bright even on cloudy days</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="card-flat p-5 group">
                <summary className="cursor-pointer font-display text-warm-900 text-base list-none flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-brand-primary text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-warm-600 text-sm mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-links to sibling pillars */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Other Tokyo day experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/tokyo-skytree-tickets/"
              className="card-flat p-6 border-l-4 border-l-brand-primary hover:shadow-md transition-shadow"
            >
              <h3 className="font-display text-lg text-warm-900 mb-2">Tokyo Skytree Tickets</h3>
              <p className="text-warm-600 text-sm">
                Compare Tembo Deck vs Galleria tickets, skip-the-line options, and best booking
                platforms for Japan&apos;s tallest tower.
              </p>
            </a>
            <a
              href="/universal-studios-japan-tickets/"
              className="card-flat p-6 border-l-4 border-l-brand-primary hover:shadow-md transition-shadow"
            >
              <h3 className="font-display text-lg text-warm-900 mb-2">
                Universal Studios Japan Tickets
              </h3>
              <p className="text-warm-600 text-sm">
                2026 USJ ticket prices, Express Pass tiers, Super Nintendo World access, and where
                to buy without fees.
              </p>
            </a>
          </div>
        </section>

        {/* Related reading */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/blog/best-day-trips-tokyo/" className="card-flat p-5 hover:shadow-md transition-shadow">
              <h3 className="font-display text-sm text-warm-900 mb-1">Best Day Trips from Tokyo</h3>
              <p className="text-warm-500 text-xs">10 trips ranked by return time and cost</p>
            </a>
            <a href="/blog/japan-travel-guide-2026/" className="card-flat p-5 hover:shadow-md transition-shadow">
              <h3 className="font-display text-sm text-warm-900 mb-1">Japan Travel Guide 2026</h3>
              <p className="text-warm-500 text-xs">Full 2-week itinerary, visas, JR Pass math</p>
            </a>
            <a href="/blog/hidden-gems-tokyo/" className="card-flat p-5 hover:shadow-md transition-shadow">
              <h3 className="font-display text-sm text-warm-900 mb-1">Hidden Gems in Tokyo</h3>
              <p className="text-warm-500 text-xs">Off-tourist neighborhoods and small shrines</p>
            </a>
            <a href="/blog/cherry-blossom-season-japan/" className="card-flat p-5 hover:shadow-md transition-shadow">
              <h3 className="font-display text-sm text-warm-900 mb-1">Cherry Blossom Season</h3>
              <p className="text-warm-500 text-xs">Week-by-week forecast across Japan</p>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-8">
          <div className="bg-brand-secondary text-white rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl mb-4">Ready to book your Mt Fuji day tour?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Compare live 2026 prices on GetYourGuide, Viator, and Klook. Free cancellation on
              most tours up to 24 hours before pickup.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.affiliateLinks.getYourGuide}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block bg-white text-brand-secondary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Browse GetYourGuide
              </a>
              <a
                href={siteConfig.affiliateLinks.viator}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block bg-white text-brand-secondary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                See Viator Tours
              </a>
              <a
                href={siteConfig.affiliateLinks.klook}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block bg-white text-brand-secondary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Check Klook Prices
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
