import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const whyCards = [
  {
    title: 'Super Nintendo World Sold Out Daily',
    desc: 'Mario-land is access-controlled. Without an Express Pass (which includes a timed entry) you need a free same-day wristband from the park app, and those typically run out before noon during weekends and holidays. Pre-booking Express Pass is the only way to guarantee entry.',
  },
  {
    title: 'Harry Potter Wizarding World',
    desc: 'The only Harry Potter theme-park area in Asia. Hogsmeade, Hogwarts Castle, and the Forbidden Journey 4K ride draw massive crowds. Included in the Studio Pass with no separate reservation, but Forbidden Journey queues hit 90+ minutes on weekends.',
  },
  {
    title: 'Express Pass Saves 4-6h of Queuing',
    desc: 'A peak-day visitor without Express Pass typically gets through only 4 or 5 major rides. With Express Pass 7 it is realistic to hit 12+ rides including all the headliners. On weekends, the Express Pass pays for itself in saved standby time.',
  },
];

const ticketTypes = [
  { name: '1-Day Studio Pass (Adult, low season)', price: '¥8,900 ($60)', note: 'Tue-Thu in Oct, Jan, Feb' },
  { name: '1-Day Studio Pass (Adult, mid-season)', price: '¥9,800 ($65)', note: 'Most weekdays + shoulder weekends' },
  { name: '1-Day Studio Pass (Adult, peak)', price: '¥10,900 ($73)', note: 'Golden Week, Obon, Xmas, NY' },
  { name: '1-Day Studio Pass (Child 4-11)', price: '¥5,700-7,200 ($38-48)', note: 'Dynamic by date' },
  { name: '1-Day Studio Pass (Senior 65+)', price: '¥8,000-9,800 ($54-65)', note: 'Slight discount on most days' },
  { name: '2-Day Studio Pass (Adult)', price: '¥16,500-19,800 ($110-132)', note: 'Better value for Nintendo + Harry Potter' },
  { name: 'Express Pass 4 (4 rides)', price: '¥8,800-14,800 ($59-99)', note: 'Includes Super Nintendo World timed entry' },
  { name: 'Express Pass 7 (7 rides)', price: '¥17,000-28,000 ($113-187)', note: 'Covers Nintendo + Harry Potter Forbidden Journey' },
  { name: 'Super Nintendo World Timed-Entry', price: 'Free with Express Pass', note: 'Or app-based wristband lottery same-day' },
  { name: 'Year Pass', price: '¥28,000-33,000 ($187-220)', note: 'Breaks even at ~3 visits (blackout dates apply)' },
];

const providers = [
  {
    name: 'Klook',
    tagline: 'Dominant in Asia + Mobile QR',
    blurb: 'The #1 USJ reseller in Asia. Express Pass combos, instant mobile QR tickets at the gate, and frequently the same price as the official site. Best English-language app for Japan theme parks.',
    href: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    hover: 'hover:bg-orange-600',
    cta: 'Check USJ prices on Klook',
    external: true,
  },
  {
    name: 'GetYourGuide',
    tagline: 'Free 24h Cancellation',
    blurb: 'Solid backup if Klook sells out your date. Free cancellation up to 24h before, English customer support, mobile QR entry. Good for flexible travelers whose Japan dates may still shift.',
    href: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    cta: 'Compare on GetYourGuide',
    external: true,
  },
  {
    name: 'Viator',
    tagline: 'Combo Tours + Transport',
    blurb: 'Best for bundles: USJ + Osaka walking tour, USJ + Kyoto day trip, or USJ with shared shuttle from your hotel. TripAdvisor-verified reviews. Slightly pricier than Klook for standalone tickets.',
    href: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    hover: 'hover:bg-red-700',
    cta: 'Browse Viator USJ combos',
    external: true,
  },
  {
    name: 'USJ Official',
    tagline: 'Direct but No Mobile Ticket',
    blurb: 'Direct-source, but the booking UX is Japan-first and often awkward for foreign cards. Some tier tickets still require in-park pickup at the gate, which means queueing before you even enter. Use only if resellers are sold out.',
    href: 'https://www.usj.co.jp/web/en/us',
    color: 'bg-gray-700',
    hover: 'hover:bg-gray-800',
    cta: 'Visit USJ official site',
    external: true,
  },
];

const expressPassGuide = [
  {
    option: 'No Express Pass',
    good: 'Low-season weekday (Oct / mid-Jan / Feb, Tue-Thu). Arrive 7:30am, queue at the gate, rope-drop Super Nintendo World on the free wristband. Skip Harry Potter Forbidden Journey until evening.',
    skip: 'Any weekend, any holiday, any school break. You will get 4-5 rides and miss Mario.',
  },
  {
    option: 'Express Pass 4',
    good: 'Budget option. Guarantees Super Nintendo World entry + 3 other rides (usually Mario Kart, Yoshi, one minor). Fine for casual visitors who care most about Mario.',
    skip: 'Do NOT buy EP4 if your number-one want is Harry Potter Forbidden Journey. It is rarely included in the EP4 tier.',
  },
  {
    option: 'Express Pass 7',
    good: 'The premium tier. Covers Super Nintendo World + Harry Potter Forbidden Journey + Spider-Man + Jurassic Park + Flying Dinosaur + Minion Mayhem. Realistic 12-14 rides on a peak day.',
    skip: 'Overkill for a low-season Tuesday or for young kids who cannot ride the thrill attractions.',
  },
];

const bestTimeToVisit = [
  { period: 'Mid-January to mid-February', crowds: 'Low', note: 'Coldest month, shortest hours, but almost no queues. Avoid Chinese New Year week.' },
  { period: 'March to early April', crowds: 'High', note: 'Cherry blossom + school spring break. Expect peak pricing and 90-min Mario queues.' },
  { period: 'Golden Week (May 1-5)', crowds: 'Extreme', note: 'Worst week of the year. Even Express Pass 7 is stretched. Budget 2 days if you must.' },
  { period: 'Mid-May to mid-July', crowds: 'Medium', note: 'Rainy season helps. Weekdays are very manageable.' },
  { period: 'August (Obon, 13-16)', crowds: 'Extreme', note: 'Japanese domestic tourism peak + summer heat. Tickets sell out 2 weeks ahead.' },
  { period: 'September to early October', crowds: 'Low-Medium', note: 'Shoulder season. Typhoon risk but generally the best combo of price + availability.' },
  { period: 'November', crowds: 'Medium', note: 'Autumn color season. Weekends are busy, weekdays are fine.' },
  { period: 'Late December holidays', crowds: 'Extreme', note: 'Dec 28-Jan 3 is second-worst week after Golden Week.' },
];

const commonMistakes = [
  'Arriving without a Super Nintendo World timed-entry (Express Pass or app wristband) and expecting to walk in. Mario-land is hard-controlled, and wristbands usually run out before noon.',
  'Buying Express Pass 4 when your top priority is Harry Potter Forbidden Journey. Forbidden Journey is usually only in Express Pass 7 tiers. Check each EP4 variant before you buy.',
  'Visiting on a Saturday during Golden Week or Obon. Crowds run 150%+ of a normal peak day, and even with EP7 you will feel compressed.',
  'Buying a Year Pass without checking blackout dates. The cheaper Year Pass blocks out exactly the weeks you want to visit.',
  'Staying in Osaka Station area assuming the commute is short. It is still a 20-minute train ride (Osaka Loop Line then Sakurajima Line), and mornings are packed.',
  'Not pre-booking any ticket in August (Obon) or the Dec 28-Jan 3 window. Weekday tickets regularly sell out 10-14 days ahead during those windows.',
];

const comparisonRows = [
  { feature: 'Adult 1-day ticket', usj: '¥8,900-10,900', disneyland: '¥7,900-10,900', disneysea: '¥7,900-10,900' },
  { feature: 'Signature IP', usj: 'Mario, Harry Potter, Minions', disneyland: 'Classic Disney, Toontown, Fantasyland', disneysea: 'Disney + original seafaring worlds' },
  { feature: 'Location', usj: 'Osaka (20 min from Osaka Stn)', disneyland: 'Tokyo Urayasu (15 min from Tokyo Stn)', disneysea: 'Tokyo Urayasu (next door)' },
  { feature: 'Nintendo Super World', usj: 'Yes, access-controlled', disneyland: 'No', disneysea: 'No' },
  { feature: 'Harry Potter', usj: 'Yes (huge area)', disneyland: 'No', disneysea: 'No' },
  { feature: 'Best for', usj: 'Teens, gamers, Potter fans', disneyland: 'Young kids, Disney classics', disneysea: 'Adults, unique theming, drinks' },
  { feature: 'Crowds on a Saturday', usj: 'Brutal (Nintendo bottleneck)', disneyland: 'Heavy but spread out', disneysea: 'Heavy but spread out' },
];

const faqItems = [
  {
    q: 'How much are Universal Studios Japan tickets in 2026?',
    a: 'The 1-Day Studio Pass uses dynamic dated pricing in 2026. Adults pay ¥8,900 on low-season weekdays (about $60), ¥9,800 on mid-season dates (about $65), and ¥10,900 on peak holidays like Golden Week and the Dec 28 to Jan 3 window (about $73). Children 4-11 pay ¥5,700 to ¥7,200 depending on the date. Express Pass is priced separately on top.',
  },
  {
    q: 'Do I need an Express Pass for USJ?',
    a: 'You need it for any weekend, school holiday, Golden Week, Obon (mid-August), or the late-December holidays. On those days you will clear only 4 or 5 rides without Express, and you will miss Super Nintendo World entirely if the free wristband sells out. On a low-season weekday in October, January, or February, you can skip Express if you arrive by 7:30am.',
  },
  {
    q: 'How do I get into Super Nintendo World?',
    a: 'Super Nintendo World is access-controlled. You get in one of three ways: buy any Express Pass (which includes a timed entry), grab a free timed-entry wristband via the USJ app on the day (usually gone by noon on weekends), or join the end-of-day walk-in queue after the wristbands run out (often an hour-plus wait). Express Pass is the only guaranteed method.',
  },
  {
    q: 'Is Harry Potter World included in the USJ Studio Pass?',
    a: 'Yes. The Wizarding World of Harry Potter (Hogsmeade + Hogwarts) is part of the standard 1-Day Studio Pass with no separate reservation. There is no timed entry unless the park issues one on extreme peak days. Butterbeer costs ¥800, and Forbidden Journey queues hit 90 minutes on weekends unless you have Express Pass 7.',
  },
  {
    q: 'USJ vs Tokyo Disneyland, which is better?',
    a: 'USJ wins if you are into Mario, Harry Potter, Minions, or thrill rides like Flying Dinosaur and Hollywood Dream. Tokyo Disneyland wins if you want classic Disney characters and family-friendly attractions for under-10s. DisneySea is the wildcard: adults and design lovers tend to rate it higher than either USJ or Disneyland. Many travelers do USJ in Osaka and DisneySea in Tokyo on the same trip.',
  },
  {
    q: 'What is the best day of the week to visit USJ?',
    a: 'Tuesday, Wednesday, or Thursday. Avoid Saturdays at all costs, avoid Sundays if possible, and avoid Mondays that follow a Japanese public holiday. Also avoid any day in Golden Week (May 1-5), Obon (Aug 13-16), or the Dec 28 to Jan 3 window regardless of which weekday it falls on.',
  },
  {
    q: 'How do I get to USJ from Osaka Station?',
    a: 'Take the JR Osaka Loop Line to Nishikujo, then transfer to the JR Sakurajima Line to Universal-City Station. The full ride is about 20 minutes and costs ¥190 one way. Universal-City Station is a 5-minute covered walk past Universal City Walk to the park gates. Trains run every 5-10 minutes in the morning. Your ICOCA or Suica IC card works.',
  },
  {
    q: 'Can I buy USJ tickets on the day?',
    a: 'On low-season weekdays yes, at the gate. On weekends, holidays, Obon, Golden Week, or late December, same-day tickets frequently sell out and you will be turned away. Always pre-book at least 7 days ahead through Klook or GetYourGuide, especially if you also want Express Pass.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Universal Studios Japan Tickets 2026: Prices, Express Pass & Where to Book',
  description:
    'Real 2026 USJ prices (¥8,900-10,900 Studio Pass), Express Pass guide for Super Nintendo World, and where to book via Klook, GetYourGuide, Viator with English support.',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.seo.siteUrl}/universal-studios-japan-tickets/`,
  },
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

export default function UniversalStudiosJapanTicketsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`Universal Studios Japan Tickets 2026: Prices, Express Pass & Where to Book | ${siteConfig.name}`}
        description="Real 2026 USJ prices (¥8,900-10,900 Studio Pass), Express Pass guide for Super Nintendo World, and where to book via Klook, GetYourGuide, Viator with English support."
        path="/universal-studios-japan-tickets/"
        jsonLd={[articleJsonLd, faqJsonLd]}
      />

      <div className="container-custom py-8 lg:py-12">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">
            Universal Studios Japan Tickets 2026: Prices, Express Pass & Where to Book
          </h1>
          <p className="text-warm-500 text-lg max-w-3xl mb-4">
            Real 2026 USJ prices for the 1-Day Studio Pass, a straight-talking Express Pass guide for Super Nintendo World, and the three booking platforms we trust for English-language mobile tickets in Osaka.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-brand-primary-50 text-brand-primary-800 text-sm font-medium px-3 py-1 rounded-full">From ¥8,900</span>
            <span className="inline-block bg-brand-primary-50 text-brand-primary-800 text-sm font-medium px-3 py-1 rounded-full">Super Nintendo World</span>
            <span className="inline-block bg-brand-primary-50 text-brand-primary-800 text-sm font-medium px-3 py-1 rounded-full">Harry Potter</span>
            <span className="inline-block bg-brand-primary-50 text-brand-primary-800 text-sm font-medium px-3 py-1 rounded-full">Osaka, 20 min from Osaka Station</span>
          </div>
        </div>

        <Breadcrumbs
          items={[
            { name: t('nav.home'), href: '/' },
            { name: 'Universal Studios Japan Tickets', href: '/universal-studios-japan-tickets/' },
          ]}
        />

        {/* What is USJ */}
        <section className="mb-16 mt-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">What is Universal Studios Japan?</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                Universal Studios Japan (USJ) is the Osaka theme park that opened in 2001 and has since grown into one of the three most-visited parks in the world. In 2026 it covers Super Nintendo World (Mario + Donkey Kong Country, which opened December 2024), the Wizarding World of Harry Potter, Hollywood, Jurassic Park, Minion Park, and Universal Wonderland.
              </p>
              <p>
                Standard operating hours are roughly 8:30 to 21:00, with extended hours on summer nights and holidays. The park sits on Osaka Bay, a 20-minute JR train ride from Osaka Station, and hotels like the Hotel Universal Port, Keihan, and Hotel Kintetsu Universal City sit within a 5-minute walk of the gate.
              </p>
              <p>
                Unlike Tokyo Disneyland, USJ is heavily access-controlled. Super Nintendo World requires a timed-entry ticket (free wristband or Express Pass) every day, and tickets often sell out in advance during Japanese holiday weeks.
              </p>
            </div>
          </div>
        </section>

        {/* Why pre-book */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Why pre-book USJ in 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((item) => (
              <div key={item.title} className="card-flat p-6 border-l-4 border-l-brand-primary">
                <h3 className="font-display text-base text-warm-900 mb-2">{item.title}</h3>
                <p className="text-warm-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real 2026 prices */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Real 2026 Prices: 1-Day, 2-Day, Express Passes</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Ticket</th>
                    <th className="px-4 py-3 font-display text-warm-900">Price (¥ / USD)</th>
                    <th className="px-4 py-3 font-display text-warm-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {ticketTypes.map((row) => (
                    <tr key={row.name}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-warm-900 font-semibold">{row.price}</td>
                      <td className="px-4 py-3 text-warm-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-warm-500 text-xs mt-3">
            Prices are dynamic and set by USJ per date. USD conversions at ¥150 = $1. Express Pass must be combined with a Studio Pass, not bought alone.
          </p>
        </section>

        {/* Express Pass guide */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Express Pass Guide: Which One Do You Need?</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Option</th>
                    <th className="px-4 py-3 font-display text-warm-900">Good for</th>
                    <th className="px-4 py-3 font-display text-warm-900">Skip if</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {expressPassGuide.map((row) => (
                    <tr key={row.option}>
                      <td className="px-4 py-3 text-warm-900 font-semibold">{row.option}</td>
                      <td className="px-4 py-3 text-warm-600">{row.good}</td>
                      <td className="px-4 py-3 text-warm-600">{row.skip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-brand-primary-50 border border-brand-primary-200 rounded-xl p-6 mt-6">
            <p className="text-brand-primary-800 font-medium text-sm">
              <strong>Quick rule:</strong> if you are coming from overseas, visiting for 1 day only, and want both Mario and Harry Potter, Express Pass 7 is almost always the right buy. You will get it back in saved hours.
            </p>
          </div>
        </section>

        {/* Where to book */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Where to Book USJ Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((p) => (
              <div key={p.name} className="card-flat p-6 border-t-4 border-t-brand-primary flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg text-warm-900">{p.name}</h3>
                  <span className="badge-primary text-xs">{p.tagline}</span>
                </div>
                <p className="text-warm-600 text-sm mb-4 flex-grow">{p.blurb}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`block ${p.color} ${p.hover} text-white text-center px-4 py-2 rounded-xl font-semibold transition-colors text-sm`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-warm-500 text-xs mt-3">
            Tickets bought through Klook or GetYourGuide are delivered as mobile QR codes and can be scanned directly at the USJ gate, no printing or pickup required.
          </p>
        </section>

        {/* Super Nintendo World */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Super Nintendo World: The Bottleneck</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                Super Nintendo World opened in 2021 and expanded with the Donkey Kong Country zone in December 2024. Demand has not cooled. On 90%+ of days in 2025, USJ limits entry to the Mario area via a timed-entry system, and that is unlikely to change in 2026.
              </p>
              <p>There are three ways to get in:</p>
              <ol>
                <li>
                  <strong>Express Pass (any tier).</strong> Includes a guaranteed Super Nintendo World timed-entry ticket. This is the only method with zero risk. Buy from Klook, GetYourGuide, Viator, or the USJ site at least 7 days ahead.
                </li>
                <li>
                  <strong>Same-day free wristband via the USJ app.</strong> Open the app the moment you enter the park (before 9:30am on weekends) and grab a timed-entry wristband for later in the day. Supply is limited and usually gone by noon on peak days. Requires a Japanese mobile number or the official Universal Studios Japan app logged in.
                </li>
                <li>
                  <strong>Standby/walk-in queue in the evening.</strong> After the wristband supply runs out, USJ sometimes opens a standby queue in the last 1-2 hours of the day. Expect a 45-90 minute wait, no guarantee.
                </li>
              </ol>
              <p>
                The Mario Kart: Koopa&apos;s Challenge ride is the flagship. Expect 60-120 minutes standby even with a timed-entry ticket, or under 15 minutes with Express Pass 7. Yoshi&apos;s Adventure is gentler and family-friendly. Donkey Kong Country added Mine-Cart Madness, a second roller-coaster-style ride that now eats Mario traffic.
              </p>
            </div>
          </div>
        </section>

        {/* Harry Potter */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">The Wizarding World of Harry Potter</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>
                USJ is the only Harry Potter theme-park area in Asia. The zone reproduces Hogsmeade village and Hogwarts Castle at ~2/3 scale, with snowy rooftops, Honeydukes, Ollivanders, and the Hogwarts Express locomotive.
              </p>
              <p>
                Unlike Super Nintendo World, the Wizarding World does not normally use a timed-entry system. It is included in the standard 1-Day Studio Pass and you can walk in. On extreme peak days (Dec 31, Golden Week weekends) USJ has occasionally issued timed entry, but it is rare.
              </p>
              <p>
                The two rides that matter: <strong>Harry Potter and the Forbidden Journey</strong> (the flagship 4K motion simulator inside Hogwarts Castle, 90+ minute queues on weekends, covered by Express Pass 7), and <strong>Flight of the Hippogriff</strong> (a mild family coaster, 30-60 minutes typical).
              </p>
              <p>
                Butterbeer is ¥800 and comes in regular or frozen. You can pay an extra ¥600-800 for a souvenir mug. The Frog Choir and Triwizard Spirit Rally live shows rotate throughout the day in Hogsmeade village.
              </p>
            </div>
          </div>
        </section>

        {/* Best time to visit */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Best Time to Visit USJ</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Period</th>
                    <th className="px-4 py-3 font-display text-warm-900">Crowds</th>
                    <th className="px-4 py-3 font-display text-warm-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {bestTimeToVisit.map((row) => (
                    <tr key={row.period}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.period}</td>
                      <td className="px-4 py-3 text-warm-900 font-semibold">{row.crowds}</td>
                      <td className="px-4 py-3 text-warm-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-display font-bold text-green-800 mb-2">Best day of week</h4>
              <p className="text-green-700 text-sm">Tuesday, Wednesday, or Thursday. Wait times drop 30-50% versus Saturday, and Super Nintendo World wristbands last into mid-afternoon.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-display font-bold text-yellow-800 mb-2">Worst day of week</h4>
              <p className="text-yellow-700 text-sm">Saturday, plus any Monday that follows a Japanese public holiday. Domestic families pile in, and Mario wristbands vanish by 10:30am.</p>
            </div>
          </div>
        </section>

        {/* USJ vs Tokyo Disneyland vs DisneySea */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">USJ vs Tokyo Disneyland vs DisneySea</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Feature</th>
                    <th className="px-4 py-3 font-display text-warm-900">USJ</th>
                    <th className="px-4 py-3 font-display text-warm-900">Tokyo Disneyland</th>
                    <th className="px-4 py-3 font-display text-warm-900">Tokyo DisneySea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-4 py-3 text-warm-700 font-medium">{row.feature}</td>
                      <td className="px-4 py-3 text-warm-600">{row.usj}</td>
                      <td className="px-4 py-3 text-warm-600">{row.disneyland}</td>
                      <td className="px-4 py-3 text-warm-600">{row.disneysea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Common USJ Mistakes to Avoid</h2>
          <div className="space-y-3">
            {commonMistakes.map((mistake, i) => (
              <div key={i} className="card-flat p-5 flex gap-4 border-l-4 border-l-red-500">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-warm-700 text-sm">{mistake}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting there */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Getting to USJ from Osaka & Kyoto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-base text-warm-900 mb-2">From Osaka Station</h3>
              <p className="text-warm-600 text-sm mb-3">
                JR Osaka Loop Line to Nishikujo (5 stops), change to JR Sakurajima Line to Universal-City Station. Total 20 minutes, ¥190 with IC card. Trains run every 5-10 minutes.
              </p>
              <p className="text-warm-500 text-xs">Universal-City Station has a 5-minute covered walkway past Universal City Walk to the gate.</p>
            </div>
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-base text-warm-900 mb-2">From Kyoto Station</h3>
              <p className="text-warm-600 text-sm mb-3">
                JR Special Rapid to Osaka (28 min), transfer to Loop Line + Sakurajima Line as above. Total 65-75 minutes, ¥1,100 with IC card. Do not bother with Shinkansen for this route.
              </p>
              <p className="text-warm-500 text-xs">First train leaves Kyoto around 5:30am; arrive by 7:45am for a proper rope-drop.</p>
            </div>
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-base text-warm-900 mb-2">From a USJ-area hotel</h3>
              <p className="text-warm-600 text-sm mb-3">
                Hotel Universal Port, Hotel Keihan Universal Tower, and Hotel Kintetsu Universal City are all a 3-5 minute walk from the gate. Some offer free shuttles, but most guests just walk.
              </p>
              <p className="text-warm-500 text-xs">Staying on-property is the easiest way to be first at the gate on a peak day.</p>
            </div>
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-base text-warm-900 mb-2">From Kansai Airport (KIX)</h3>
              <p className="text-warm-600 text-sm mb-3">
                JR Haruka to Tennoji or Shin-Osaka, then Loop Line to Nishikujo, transfer to Sakurajima Line. Total 80-90 minutes, ¥1,800 with IC card. Or grab an airport limousine bus direct to Universal City Walk (60-70 minutes, ¥1,600).
              </p>
              <p className="text-warm-500 text-xs">Luggage storage lockers exist at Universal-City Station if you are hopping straight from the airport.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="card-flat p-5 group">
                <summary className="font-display text-warm-900 text-base cursor-pointer list-none flex justify-between items-start">
                  <span>{item.q}</span>
                  <span className="ml-4 text-brand-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="text-warm-600 text-sm mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-links sibling pillars */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Other Japan Ticket Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/tokyo-skytree-tickets/" className="card-flat p-6 border-l-4 border-l-brand-primary hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-base text-warm-900 mb-2">Tokyo Skytree Tickets 2026</h3>
              <p className="text-warm-600 text-sm">Observation-deck prices, fast-track vs standard, and the best time of day for clear Fuji views.</p>
            </a>
            <a href="/mt-fuji-day-tour/" className="card-flat p-6 border-l-4 border-l-brand-primary hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-base text-warm-900 mb-2">Mt Fuji Day Tour from Tokyo</h3>
              <p className="text-warm-600 text-sm">Lake Kawaguchi, Oshino Hakkai, and the best small-group vs self-guided options in 2026.</p>
            </a>
          </div>
        </section>

        {/* Related reading */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Related Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/blog/japan-with-kids-2026/" className="card-flat p-5 hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Japan with Kids 2026</h3>
              <p className="text-warm-500 text-xs">Family-friendly itineraries for first-time Japan visitors with children.</p>
            </a>
            <a href="/blog/japan-travel-guide-2026/" className="card-flat p-5 hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Japan Travel Guide 2026</h3>
              <p className="text-warm-500 text-xs">Our complete first-timer guide to Japan: routes, budget, and timing.</p>
            </a>
            <a href="/blog/getting-around-japan-shinkansen-buses-trains/" className="card-flat p-5 hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Getting Around Japan</h3>
              <p className="text-warm-500 text-xs">Shinkansen, buses, and local trains: when each one is worth it.</p>
            </a>
            <a href="/blog/is-japan-expensive-2026/" className="card-flat p-5 hover:shadow-lg transition-shadow block">
              <h3 className="font-display text-sm text-warm-900 mb-1">Is Japan Expensive in 2026?</h3>
              <p className="text-warm-500 text-xs">Real daily budgets for backpackers, mid-range, and luxury travelers.</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
