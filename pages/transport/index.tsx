import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function TransportGuide() {
  const { t } = useTranslation('common');
  const { t: tg } = useTranslation('guides');

  return (
    <>
      <SEOHead
        title={`${tg('transport.seoTitle')} | ${siteConfig.name}`}
        description={tg('transport.seoDescription')}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: tg('transport.breadcrumb'), href: '/transport/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{tg('transport.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{tg('transport.intro')}</p>
        </div>

        {/* Quick Comparison */}
        <div className="card-flat p-6 lg:p-8 mb-16">
          <h2 className="font-display text-xl text-warm-900 mb-4">{tg('transport.quickComparison')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm-100">
                <tr>
                  <th className="px-4 py-3 font-display text-warm-900">{tg('transport.tableMode')}</th>
                  <th className="px-4 py-3 font-display text-warm-900">{tg('transport.tableDuration')}</th>
                  <th className="px-4 py-3 font-display text-warm-900">{tg('transport.tablePriceRange')}</th>
                  <th className="px-4 py-3 font-display text-warm-900">{tg('transport.tableComfort')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                <tr>
                  <td className="px-4 py-3 text-warm-700 font-medium">{tg('transport.shinkansen')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.shinkansenDuration')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.shinkansenPrice')}</td>
                  <td className="px-4 py-3"><span className="badge-primary">{tg('transport.shinkansenComfort')}</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-warm-700 font-medium">{tg('transport.flight')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.flightDuration')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.flightPrice')}</td>
                  <td className="px-4 py-3"><span className="badge-accent">{tg('transport.flightComfort')}</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-warm-700 font-medium">{tg('transport.highwayBus')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.highwayBusDuration')}</td>
                  <td className="px-4 py-3 text-warm-600">{tg('transport.highwayBusPrice')}</td>
                  <td className="px-4 py-3"><span className="badge-secondary">{tg('transport.highwayBusComfort')}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shinkansen */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('transport.shinkansenTitle')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{tg('transport.shinkansenIntro')}</p>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="font-display text-lg text-warm-900">{tg('transport.popularRoutes')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-warm-900">{tg('transport.tokyoKyoto')}</p>
                  <p className="text-sm text-warm-600">{tg('transport.tokyoKyotoDetails')}</p>
                </div>
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-warm-900">{tg('transport.tokyoOsaka')}</p>
                  <p className="text-sm text-warm-600">{tg('transport.tokyoOsakaDetails')}</p>
                </div>
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-warm-900">{tg('transport.tokyoHiroshima')}</p>
                  <p className="text-sm text-warm-600">{tg('transport.tokyoHiroshimaDetails')}</p>
                </div>
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-warm-900">{tg('transport.tokyoSendai')}</p>
                  <p className="text-sm text-warm-600">{tg('transport.tokyoSendaiDetails')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JR Pass */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('transport.jrPass')}</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>{tg('transport.jrPassIntro')}</p>
              <ul>
                <li>{tg('transport.jrPass7Day')}</li>
                <li>{tg('transport.jrPass14Day')}</li>
                <li>{tg('transport.jrPass21Day')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Domestic Flights */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('transport.domesticFlights')}</h2>
          <div className="card-flat p-6 lg:p-8">
            <div className="prose-custom">
              <p>{tg('transport.domesticFlightsIntro')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-warm-50 rounded-xl p-5">
                <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.ana')}</h3>
                <span className="badge-primary mb-3">Full Service</span>
                <p className="text-warm-600 text-sm mt-3">Japan&apos;s largest airline with extensive domestic network. Includes baggage and meals on most routes.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-5">
                <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.jal')}</h3>
                <span className="badge-primary mb-3">Full Service</span>
                <p className="text-warm-600 text-sm mt-3">Japan Airlines offers premium service with excellent domestic coverage, especially to smaller airports.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-5">
                <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.peach')}</h3>
                <span className="badge-accent mb-3">Budget</span>
                <p className="text-warm-600 text-sm mt-3">Japan&apos;s largest low-cost carrier based in Osaka. Frequent sales with fares from $30. Baggage extra.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-5">
                <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.jetstar')}</h3>
                <span className="badge-accent mb-3">Budget</span>
                <p className="text-warm-600 text-sm mt-3">Low-cost carrier with routes from Narita and other major airports. Good for Hokkaido and Okinawa flights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Transport */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('transport.localTransport')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.metro')}</h3>
              <p className="text-warm-600 text-sm">{tg('transport.metroDesc')}</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.icCards')}</h3>
              <p className="text-warm-600 text-sm">{tg('transport.icCardsDesc')}</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.taxi')}</h3>
              <p className="text-warm-600 text-sm">{tg('transport.taxiDesc')}</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('transport.bus')}</h3>
              <p className="text-warm-600 text-sm">{tg('transport.busDesc')}</p>
            </div>
          </div>
        </section>

        {/* IC Card Tip */}
        <section className="mb-16">
          <div className="bg-brand-primary-50 border border-brand-primary-200 rounded-xl p-6">
            <p className="text-brand-primary-800 font-medium text-sm">
              <strong>{tg('transport.bookingTip')}</strong> {tg('transport.bookingTipText')}
            </p>
          </div>
        </section>

        {/* Book Transport CTA */}
        <section className="mb-8">
          <div className="bg-brand-secondary text-white rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl mb-4">Book Your Japan Transport</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">Compare and book Shinkansen tickets, airport transfers, and bus passes for your Japan trip.</p>
            <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer nofollow" className="inline-block bg-white text-brand-secondary font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Book Transport
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
