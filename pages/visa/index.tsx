import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function VisaGuide() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('guides');

  const faqItems = [
    { question: t('visa.faq1Q'), answer: t('visa.faq1A') },
    { question: t('visa.faq2Q'), answer: t('visa.faq2A') },
    { question: t('visa.faq3Q'), answer: t('visa.faq3A') },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tCommon('nav.home'), item: siteConfig.seo.siteUrl },
      { '@type': 'ListItem', position: 2, name: t('visa.breadcrumb'), item: `${siteConfig.seo.siteUrl}/visa/` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${t('visa.seoTitle')} | ${siteConfig.name}`}
        description={t('visa.seoDescription')}
        path="/visa/"
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: tCommon('nav.home'), href: '/' },
          { name: t('visa.breadcrumb'), href: '/visa/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{t('visa.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{t('visa.intro')}</p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card-flat p-6 text-center border-t-4 border-t-brand-primary">
            <h3 className="font-display text-lg text-warm-900 mb-2">Visa-Free Entry</h3>
            <p className="text-warm-500 text-sm">68+ countries can enter Japan without a visa for 15-90 days</p>
            <span className="badge-primary mt-3">Most Common</span>
          </div>
          <div className="card-flat p-6 text-center border-t-4 border-t-brand-secondary">
            <h3 className="font-display text-lg text-warm-900 mb-2">Japan eVisa</h3>
            <p className="text-warm-500 text-sm">Apply online for eligible nationalities. Processing in 5-7 business days</p>
            <span className="badge-secondary mt-3">Expanding</span>
          </div>
          <div className="card-flat p-6 text-center border-t-4 border-t-brand-accent">
            <h3 className="font-display text-lg text-warm-900 mb-2">Visit Japan Web</h3>
            <p className="text-warm-500 text-sm">Digital registration for all visitors — immigration, customs, tax-free</p>
            <span className="badge-accent mt-3">Required</span>
          </div>
        </div>

        {/* Visa-Free Entry */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Visa-Free Entry</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom mb-6">
              <p>{t('visa.visaFreeDesc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-warm-50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-primary">90 days</span>
                  <h3 className="font-display text-base text-warm-900">Extended Stay Countries</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-warm-600 text-sm">
                  {['USA', 'Canada', 'UK', 'Australia', 'New Zealand', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Austria', 'Ireland', 'South Korea', 'Hong Kong', 'Singapore', 'Mexico'].map(country => (
                    <div key={country} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                      {country}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-warm-400 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-300 flex-shrink-0" />
                    + 50 more
                  </div>
                </div>
              </div>

              <div className="bg-warm-50 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-accent">15-30 days</span>
                  <h3 className="font-display text-base text-warm-900">Shorter Stay Countries</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-warm-600 text-sm">
                  {['Thailand (15 days)', 'Malaysia (90 days)', 'Indonesia (15 days)', 'Brunei (15 days)', 'UAE (30 days)', 'Turkey (90 days)', 'Tunisia (90 days)', 'Israel (90 days)'].map(country => (
                    <div key={country} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-600 flex-shrink-0" />
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-brand-primary-50 border border-brand-primary-200 rounded-xl p-4 mt-6">
              <p className="text-brand-primary-800 font-medium text-sm">
                <strong>Note:</strong> Visa-free periods were updated in 2023-2024. Always check with your local Japanese embassy for the latest information for your nationality.
              </p>
            </div>
          </div>
        </section>

        {/* Japan eVisa */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Japan eVisa</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{t('visa.evisaDesc')}</p>

              <h3>How to Apply</h3>
              <ol>
                <li>Visit the official Japan eVisa portal (www.evisa.mofa.go.jp)</li>
                <li>Create an account and fill in the application form</li>
                <li>Upload required documents (passport scan, photo, itinerary)</li>
                <li>Pay the application fee online</li>
                <li>Wait for processing (typically 5-7 business days)</li>
                <li>Receive your eVisa via email — print or save on your phone</li>
              </ol>

              <h3>Key Details</h3>
              <ul>
                <li><strong>Cost:</strong> Varies by nationality, typically free or ~$20-30</li>
                <li><strong>Validity:</strong> Single or multiple entry depending on nationality</li>
                <li><strong>Processing:</strong> 5-7 business days (apply at least 2 weeks before travel)</li>
                <li><strong>Eligible at:</strong> All international airports and seaports</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visit Japan Web */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Visit Japan Web</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-secondary">
            <div className="prose-custom">
              <p>{t('visa.visitJapanWebDesc')}</p>

              <h3>Registration Steps</h3>
              <ol>
                <li>Go to vjw.digital.go.jp and create an account</li>
                <li>Register your trip details (travel dates, accommodation)</li>
                <li>Enter passport information</li>
                <li>Complete immigration and customs declarations</li>
                <li>Show the QR code on arrival for faster processing</li>
              </ol>

              <div className="bg-brand-secondary-50 border border-brand-secondary-200 rounded-xl p-4 my-6 not-prose">
                <p className="text-brand-secondary-800 font-medium text-sm">
                  <strong>Pro tip:</strong> Complete your Visit Japan Web registration at least 2 weeks before your trip. You can register for tax-free shopping at the same time — saving you from filling out paper forms at stores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Required Documents</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{t('visa.requiredDocsDesc')}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { doc: 'Valid passport', detail: 'Must be valid for duration of stay (6+ months recommended)' },
                { doc: 'Return/onward ticket', detail: 'Proof of departure from Japan' },
                { doc: 'Accommodation details', detail: 'Hotel bookings or host address' },
                { doc: 'Proof of funds', detail: 'Bank statement, credit cards, or cash' },
                { doc: 'Visit Japan Web QR code', detail: 'Complete registration before arrival' },
                { doc: 'Travel insurance', detail: 'Recommended (not mandatory, but strongly advised)' },
              ].map((item) => (
                <div key={item.doc} className="flex items-start gap-3 bg-warm-50 p-4 rounded-lg">
                  <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-warm-900">{item.doc}</p>
                    <p className="text-warm-500 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processing Times */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Entry Options at a Glance</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Entry Type</th>
                    <th className="px-4 py-3 font-display text-warm-900">Processing</th>
                    <th className="px-4 py-3 font-display text-warm-900">Cost</th>
                    <th className="px-4 py-3 font-display text-warm-900">Max Stay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Visa-Free</td>
                    <td className="px-4 py-3 text-warm-600">On arrival</td>
                    <td className="px-4 py-3 text-warm-600">Free</td>
                    <td className="px-4 py-3 text-warm-600">15-90 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">eVisa</td>
                    <td className="px-4 py-3 text-warm-600">5-7 business days</td>
                    <td className="px-4 py-3 text-warm-600">Free - $30</td>
                    <td className="px-4 py-3 text-warm-600">15-90 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Embassy Visa</td>
                    <td className="px-4 py-3 text-warm-600">5-10 business days</td>
                    <td className="px-4 py-3 text-warm-600">$25-60</td>
                    <td className="px-4 py-3 text-warm-600">15-90 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Working Holiday</td>
                    <td className="px-4 py-3 text-warm-600">2-4 weeks</td>
                    <td className="px-4 py-3 text-warm-600">Free</td>
                    <td className="px-4 py-3 text-warm-600">Up to 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Tips & Common Mistakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6 border-l-4 border-l-brand-primary">
              <h3 className="font-display text-lg text-warm-900 mb-3">Do</h3>
              <ul className="space-y-2 text-warm-600 text-sm">
                <li>Register on Visit Japan Web before your flight</li>
                <li>Have your accommodation address ready at immigration</li>
                <li>Carry proof of onward travel (printed or digital)</li>
                <li>Check visa-free period for your specific nationality</li>
                <li>Arrive with some Japanese Yen cash</li>
                <li>Keep your passport with you at all times (required by law)</li>
              </ul>
            </div>
            <div className="card-flat p-6 border-l-4 border-l-brand-accent">
              <h3 className="font-display text-lg text-warm-900 mb-3">Avoid</h3>
              <ul className="space-y-2 text-warm-600 text-sm">
                <li>Don&apos;t overstay your visa — Japan takes this very seriously</li>
                <li>Don&apos;t work on a tourist visa or visa-free entry</li>
                <li>Don&apos;t bring prescription drugs without proper documentation</li>
                <li>Don&apos;t assume you can extend your stay easily</li>
                <li>Don&apos;t forget to declare items at customs</li>
                <li>Don&apos;t bring prohibited items (some cold medicines are banned)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{t('visa.faqTitle')}</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="card-flat p-6">
                <h3 className="font-display text-base text-warm-900 mb-2">{faq.question}</h3>
                <p className="text-warm-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
