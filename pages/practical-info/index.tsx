import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function PracticalInfo() {
  const { t } = useTranslation('common');
  const { t: tg } = useTranslation('guides');

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('nav.home'), "item": `${siteConfig.seo.siteUrl}/` },
      { "@type": "ListItem", "position": 2, "name": tg('practicalInfo.breadcrumb'), "item": `${siteConfig.seo.siteUrl}/practical-info/` },
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": tg('practicalInfo.faq1Q'), "acceptedAnswer": { "@type": "Answer", "text": tg('practicalInfo.faq1A') } },
      { "@type": "Question", "name": tg('practicalInfo.faq2Q'), "acceptedAnswer": { "@type": "Answer", "text": tg('practicalInfo.faq2A') } },
      { "@type": "Question", "name": tg('practicalInfo.faq3Q'), "acceptedAnswer": { "@type": "Answer", "text": tg('practicalInfo.faq3A') } },
    ]
  };

  return (
    <>
      <SEOHead
        title={`${tg('practicalInfo.seoTitle')} | ${siteConfig.name}`}
        description={tg('practicalInfo.seoDescription')}
        path="/practical-info/"
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: tg('practicalInfo.breadcrumb'), href: '/practical-info/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{tg('practicalInfo.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{tg('practicalInfo.intro')}</p>
        </div>

        {/* Quick Reference */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-flat p-4 text-center">
              <p className="text-warm-400 text-xs uppercase tracking-wide mb-1">Currency</p>
              <p className="font-display font-bold text-warm-900">JPY (¥)</p>
            </div>
            <div className="card-flat p-4 text-center">
              <p className="text-warm-400 text-xs uppercase tracking-wide mb-1">Time Zone</p>
              <p className="font-display font-bold text-warm-900">JST (UTC+9)</p>
            </div>
            <div className="card-flat p-4 text-center">
              <p className="text-warm-400 text-xs uppercase tracking-wide mb-1">Emergency</p>
              <p className="font-display font-bold text-warm-900">110 / 119</p>
            </div>
            <div className="card-flat p-4 text-center">
              <p className="text-warm-400 text-xs uppercase tracking-wide mb-1">Electricity</p>
              <p className="font-display font-bold text-warm-900">100V / Type A</p>
            </div>
          </div>
        </section>

        {/* Money & Payments */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.money')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{tg('practicalInfo.moneyDesc')}</p>
              <ul>
                <li>{tg('practicalInfo.atm')}</li>
                <li>{tg('practicalInfo.creditCards')}</li>
              </ul>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-warm-50 p-3 rounded-lg text-center">
                <p className="text-warm-400 text-xs">¥1,000</p>
                <p className="font-display font-bold text-warm-900">~$6.60</p>
              </div>
              <div className="bg-warm-50 p-3 rounded-lg text-center">
                <p className="text-warm-400 text-xs">¥5,000</p>
                <p className="font-display font-bold text-warm-900">~$33</p>
              </div>
              <div className="bg-warm-50 p-3 rounded-lg text-center">
                <p className="text-warm-400 text-xs">¥10,000</p>
                <p className="font-display font-bold text-warm-900">~$66</p>
              </div>
              <div className="bg-warm-50 p-3 rounded-lg text-center">
                <p className="text-warm-400 text-xs">¥50,000</p>
                <p className="font-display font-bold text-warm-900">~$330</p>
              </div>
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.language')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom mb-6">
              <p>{tg('practicalInfo.languageDesc')}</p>
            </div>
            <h3 className="font-display text-lg text-warm-900 mb-4">Essential Phrases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { en: 'Hello', jp: 'Konnichiwa', romaji: 'kon-nee-chee-wa' },
                { en: 'Thank you', jp: 'Arigatou gozaimasu', romaji: 'ah-ree-gah-toh go-zai-mas' },
                { en: 'Excuse me', jp: 'Sumimasen', romaji: 'soo-mee-mah-sen' },
                { en: 'Yes / No', jp: 'Hai / Iie', romaji: 'hai / ee-eh' },
                { en: 'How much?', jp: 'Ikura desu ka?', romaji: 'ee-koo-rah des-ka' },
                { en: 'Delicious!', jp: 'Oishii!', romaji: 'oy-shee' },
                { en: 'Sorry', jp: 'Gomen nasai', romaji: 'go-men nah-sai' },
                { en: 'The bill, please', jp: 'O-kaikei onegaishimasu', romaji: 'oh-kai-keh oh-neh-gai-shee-mas' },
              ].map((phrase) => (
                <div key={phrase.en} className="bg-warm-50 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-warm-900 font-medium">{phrase.en}</span>
                    <span className="text-warm-400 mx-2">&rarr;</span>
                    <span className="text-brand-primary font-medium">{phrase.jp}</span>
                  </div>
                  <span className="text-warm-400 text-xs italic">{phrase.romaji}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Etiquette & Customs */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.etiquette')}</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>{tg('practicalInfo.etiquetteDesc')}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Shoes Off', desc: 'Remove shoes when entering homes, temples, ryokans, and some restaurants. Look for shoe racks or genkan (entrance areas).' },
                { title: 'Bowing', desc: 'A slight bow is appropriate for greetings and thanks. Deeper bows show more respect.' },
                { title: 'No Tipping', desc: 'Tipping is not customary and can be considered rude. Service is included in prices.' },
                { title: 'Quiet on Trains', desc: 'Keep phone calls and conversations quiet. Set phones to silent (manner mode).' },
                { title: 'No Eating While Walking', desc: 'Eat at designated areas or stands. Carrying food while walking is frowned upon.' },
                { title: 'Chopstick Etiquette', desc: 'Never stick chopsticks upright in rice or pass food between chopsticks — both are funeral customs.' },
              ].map((item) => (
                <div key={item.title} className="bg-warm-50 p-4 rounded-lg">
                  <h4 className="font-display font-bold text-warm-900 mb-1">{item.title}</h4>
                  <p className="text-warm-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internet & Connectivity */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.connectivity')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{tg('practicalInfo.connectivityDesc')}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-1">eSIM</h4>
                <p className="text-warm-600 text-sm">Best option. Buy before travel. No physical SIM needed. From $5-15 for 1-10GB.</p>
                <a href="/esim/" className="text-brand-primary text-sm font-medium hover:underline mt-2 inline-block">eSIM Guide &rarr;</a>
              </div>
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-1">Pocket WiFi</h4>
                <p className="text-warm-600 text-sm">Rent at airports. Great for groups. Unlimited data from ¥500-900/day.</p>
              </div>
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-warm-900 mb-1">Free WiFi</h4>
                <p className="text-warm-600 text-sm">Available at stations, 7-Eleven, Starbucks, and most hotels. Register for Japan Wi-Fi auto-connect.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.safety')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{tg('practicalInfo.safetyDesc')}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-display font-bold text-green-800 mb-1">Police</p>
                <p className="text-green-700 text-2xl font-bold">110</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-display font-bold text-red-800 mb-1">Ambulance / Fire</p>
                <p className="text-red-700 text-2xl font-bold">119</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-display font-bold text-blue-800 mb-1">Tourist Helpline</p>
                <p className="text-blue-700 text-2xl font-bold">050-3816-2787</p>
              </div>
            </div>
          </div>
        </section>

        {/* Electricity */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Electricity & Plugs</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>Japan uses 100V electricity with Type A plugs (flat two-pin, same as North America). Important differences:</p>
              <ul>
                <li><strong>US/Canada travelers:</strong> Your plugs will fit, but voltage is 100V vs 120V. Most modern electronics (phones, laptops) work fine.</li>
                <li><strong>European/UK travelers:</strong> You need a plug adapter. Most hotels provide adapters at the front desk.</li>
                <li><strong>Eastern vs Western Japan:</strong> Eastern Japan (Tokyo) runs on 50Hz, Western Japan (Osaka, Kyoto) on 60Hz. This rarely matters for travelers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('practicalInfo.faqTitle')}</h2>
          <div className="space-y-4">
            {[
              { q: tg('practicalInfo.faq1Q'), a: tg('practicalInfo.faq1A') },
              { q: tg('practicalInfo.faq2Q'), a: tg('practicalInfo.faq2A') },
              { q: tg('practicalInfo.faq3Q'), a: tg('practicalInfo.faq3A') },
            ].map((faq, index) => (
              <div key={index} className="card-flat p-6">
                <h3 className="font-display text-base text-warm-900 mb-2">{faq.q}</h3>
                <p className="text-warm-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
