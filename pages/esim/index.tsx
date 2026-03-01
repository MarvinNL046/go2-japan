import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function EsimGuide() {
  const { t } = useTranslation('common');
  const { t: tg } = useTranslation('guides');

  return (
    <>
      <SEOHead
        title={`${tg('esim.seoTitle')} | ${siteConfig.name}`}
        description={tg('esim.seoDescription')}
        path="/esim/"
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: tg('esim.breadcrumb'), href: '/esim/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{tg('esim.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{tg('esim.intro')}</p>
        </div>

        {/* What is an eSIM */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">What is an eSIM?</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>An eSIM (embedded SIM) is a digital SIM built into modern smartphones. Instead of swapping physical SIM cards, you download a data plan before your trip and activate it when you land in Japan. It&apos;s the fastest, most convenient way to get connected.</p>
            </div>
          </div>
        </section>

        {/* Why eSIM */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Why Use an eSIM in Japan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Instant Setup', desc: 'Buy and install before you fly. Activate the moment you land — no waiting in airport queues.' },
              { title: 'Keep Your Number', desc: 'Your regular SIM stays in your phone. Receive calls and texts on your home number while using Japanese data.' },
              { title: 'No Physical SIM', desc: 'No tiny cards to lose, no SIM ejector tool needed. Everything is digital.' },
              { title: 'Easy Top-Up', desc: 'Running low on data? Buy more through the app instantly, no store visit needed.' },
              { title: 'Multi-Country', desc: 'Many eSIM plans cover Japan + other Asian countries. Perfect for multi-stop trips.' },
              { title: 'Great Coverage', desc: 'eSIMs use major Japanese carriers (NTT Docomo, SoftBank, KDDI) for reliable 4G/5G coverage nationwide.' },
            ].map((item) => (
              <div key={item.title} className="card-flat p-6">
                <h3 className="font-display text-base text-warm-900 mb-2">{item.title}</h3>
                <p className="text-warm-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connectivity Options Comparison */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Connectivity Options Compared</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Feature</th>
                    <th className="px-4 py-3 font-display text-warm-900">eSIM</th>
                    <th className="px-4 py-3 font-display text-warm-900">Pocket WiFi</th>
                    <th className="px-4 py-3 font-display text-warm-900">Local SIM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Setup</td>
                    <td className="px-4 py-3 text-warm-600">Before departure</td>
                    <td className="px-4 py-3 text-warm-600">Airport pickup</td>
                    <td className="px-4 py-3 text-warm-600">Airport counter</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Cost</td>
                    <td className="px-4 py-3 text-warm-600">$5-25</td>
                    <td className="px-4 py-3 text-warm-600">$5-12/day</td>
                    <td className="px-4 py-3 text-warm-600">$15-40</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Keep Your Number</td>
                    <td className="px-4 py-3"><span className="text-green-600 font-medium">Yes</span></td>
                    <td className="px-4 py-3"><span className="text-green-600 font-medium">Yes</span></td>
                    <td className="px-4 py-3"><span className="text-red-600 font-medium">No</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Extra Device</td>
                    <td className="px-4 py-3"><span className="text-green-600 font-medium">None</span></td>
                    <td className="px-4 py-3"><span className="text-red-600 font-medium">Yes (charge daily)</span></td>
                    <td className="px-4 py-3"><span className="text-green-600 font-medium">None</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Multi-Device</td>
                    <td className="px-4 py-3 text-warm-600">No</td>
                    <td className="px-4 py-3"><span className="text-green-600 font-medium">Yes (5-10 devices)</span></td>
                    <td className="px-4 py-3 text-warm-600">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-warm-700 font-medium">Best For</td>
                    <td className="px-4 py-3 text-warm-600">Solo/couples</td>
                    <td className="px-4 py-3 text-warm-600">Groups/families</td>
                    <td className="px-4 py-3 text-warm-600">Long stays</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recommended eSIM Providers */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Recommended eSIM Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6 border-t-4 border-t-brand-primary">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg text-warm-900">Saily</h3>
                <span className="badge-primary text-xs">Recommended</span>
              </div>
              <p className="text-warm-600 text-sm mb-4">By the makers of NordVPN. Affordable plans, easy app, reliable coverage on SoftBank network.</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-warm-500">1 GB / 7 days</span><span className="font-medium text-warm-900">$4.49</span></div>
                <div className="flex justify-between"><span className="text-warm-500">3 GB / 30 days</span><span className="font-medium text-warm-900">$8.49</span></div>
                <div className="flex justify-between"><span className="text-warm-500">10 GB / 30 days</span><span className="font-medium text-warm-900">$16.49</span></div>
              </div>
              <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer nofollow" className="block bg-brand-primary text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-brand-primary/90 transition-colors text-sm">
                Get Saily eSIM
              </a>
            </div>

            <div className="card-flat p-6 border-t-4 border-t-brand-secondary">
              <h3 className="font-display text-lg text-warm-900 mb-3">Airalo</h3>
              <p className="text-warm-600 text-sm mb-4">World&apos;s largest eSIM marketplace. Wide range of plans, good app, covers 200+ countries.</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-warm-500">1 GB / 7 days</span><span className="font-medium text-warm-900">$4.50</span></div>
                <div className="flex justify-between"><span className="text-warm-500">3 GB / 30 days</span><span className="font-medium text-warm-900">$11.00</span></div>
                <div className="flex justify-between"><span className="text-warm-500">10 GB / 30 days</span><span className="font-medium text-warm-900">$25.00</span></div>
              </div>
              <a href="https://www.airalo.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-brand-secondary text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-brand-secondary/90 transition-colors text-sm">
                View Airalo Plans
              </a>
            </div>

            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-3">Holafly</h3>
              <p className="text-warm-600 text-sm mb-4">Unlimited data plans. No speed throttling. Great for heavy data users who stream or video call.</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-warm-500">Unlimited / 5 days</span><span className="font-medium text-warm-900">$19.00</span></div>
                <div className="flex justify-between"><span className="text-warm-500">Unlimited / 10 days</span><span className="font-medium text-warm-900">$34.00</span></div>
                <div className="flex justify-between"><span className="text-warm-500">Unlimited / 20 days</span><span className="font-medium text-warm-900">$54.00</span></div>
              </div>
            </div>

            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-3">Nomad</h3>
              <p className="text-warm-600 text-sm mb-4">Budget-friendly option with flexible plans. Good for short trips. Data-only plans on reliable networks.</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-warm-500">1 GB / 7 days</span><span className="font-medium text-warm-900">$4.00</span></div>
                <div className="flex justify-between"><span className="text-warm-500">5 GB / 30 days</span><span className="font-medium text-warm-900">$13.00</span></div>
                <div className="flex justify-between"><span className="text-warm-500">10 GB / 30 days</span><span className="font-medium text-warm-900">$22.00</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Set Up */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">How to Set Up Your eSIM</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Check Compatibility', desc: 'Make sure your phone supports eSIM. Most iPhones (XS and later) and newer Samsung/Google Pixel phones do. Your phone must be carrier-unlocked.' },
              { step: '2', title: 'Purchase Before Travel', desc: 'Buy your eSIM plan 1-2 days before departure. You will receive a QR code via email or in the provider app.' },
              { step: '3', title: 'Install the eSIM', desc: 'Go to Settings > Cellular/Mobile > Add eSIM. Scan the QR code or install through the provider app. Label it "Japan Travel" for easy identification.' },
              { step: '4', title: 'Activate on Arrival', desc: 'Turn on the eSIM data plan when you land in Japan. Set it as your primary data line while keeping your home SIM for calls/texts.' },
            ].map((item) => (
              <div key={item.step} className="card-flat p-6 flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-lg font-bold">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display font-bold text-warm-900 mb-1">{item.title}</h3>
                  <p className="text-warm-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Japan Coverage</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom mb-6">
              <p>Japan has excellent mobile coverage. The three major carriers (NTT Docomo, KDDI/au, SoftBank) cover 99%+ of the populated area with 4G LTE, and 5G is expanding in major cities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-green-800 mb-2">Excellent Coverage</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>All major cities and towns</li>
                  <li>Shinkansen routes</li>
                  <li>Tourist attractions</li>
                  <li>Highways and major roads</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-display font-bold text-yellow-800 mb-2">Limited Coverage</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>Deep mountain areas</li>
                  <li>Remote islands</li>
                  <li>Underground (improving)</li>
                  <li>Some hiking trails</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Saving Tips */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Data Saving Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Save Your Data</h3>
              <ul className="space-y-2 text-warm-600 text-sm">
                <li>Download Google Maps Japan for offline use</li>
                <li>Pre-download translation packs in Google Translate</li>
                <li>Use Japan Transit apps (Navitime, Hyperdia) for train schedules</li>
                <li>Enable auto-update only on WiFi</li>
                <li>Connect to free WiFi at hotels, konbini, and stations</li>
              </ul>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-3">Stay Safe Online</h3>
              <ul className="space-y-2 text-warm-600 text-sm">
                <li>Use a VPN on public WiFi networks</li>
                <li>Japan has no internet censorship</li>
                <li>All messaging apps (WhatsApp, LINE, Telegram) work</li>
                <li>Online banking works normally</li>
                <li>Social media platforms are unrestricted</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pro Tip */}
        <section className="mb-16">
          <div className="bg-brand-primary-50 border border-brand-primary-200 rounded-xl p-6">
            <p className="text-brand-primary-800 font-medium text-sm">
              <strong>Pro tip:</strong> LINE is Japan&apos;s most popular messaging app (used by 90%+ of the population). Download it before your trip — many restaurants, hotels, and services communicate through LINE.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="bg-brand-secondary text-white rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl mb-4">Get Connected in Japan</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">Order your eSIM before you fly and activate it the moment you land. No queues, no SIM swapping.</p>
            <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer nofollow" className="inline-block bg-white text-brand-secondary font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Get Your Japan eSIM
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
