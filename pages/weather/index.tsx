import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function WeatherGuide() {
  const { t } = useTranslation('common');
  const { t: tg } = useTranslation('guides');

  const months = [
    { name: 'Jan', temp: '2-10', rain: 'Low', bestFor: 'Skiing, winter illuminations' },
    { name: 'Feb', temp: '2-11', rain: 'Low', bestFor: 'Skiing, plum blossoms' },
    { name: 'Mar', temp: '5-14', rain: 'Med', bestFor: 'Early cherry blossoms (south)' },
    { name: 'Apr', temp: '10-19', rain: 'Med', bestFor: 'Cherry blossoms (peak)' },
    { name: 'May', temp: '15-23', rain: 'Med', bestFor: 'Pleasant weather, Golden Week' },
    { name: 'Jun', temp: '19-26', rain: 'High', bestFor: 'Hydrangeas, rainy season starts' },
    { name: 'Jul', temp: '23-30', rain: 'High', bestFor: 'Summer festivals, Mt. Fuji climbing' },
    { name: 'Aug', temp: '24-31', rain: 'Med', bestFor: 'Festivals, fireworks, Obon' },
    { name: 'Sep', temp: '20-27', rain: 'High', bestFor: 'Fewer crowds, typhoon season' },
    { name: 'Oct', temp: '14-22', rain: 'Med', bestFor: 'Autumn foliage begins' },
    { name: 'Nov', temp: '8-17', rain: 'Low', bestFor: 'Peak autumn foliage' },
    { name: 'Dec', temp: '3-12', rain: 'Low', bestFor: 'Winter illuminations, skiing' },
  ];

  return (
    <>
      <SEOHead
        title={`${tg('weather.seoTitle')} | ${siteConfig.name}`}
        description={tg('weather.seoDescription')}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: tg('weather.breadcrumb'), href: '/weather/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{tg('weather.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{tg('weather.intro')}</p>
        </div>

        {/* Season Cards */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Japan&apos;s Four Seasons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-flat p-6 border-t-4 border-t-pink-400">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('weather.spring')}</h3>
              <p className="text-warm-600 text-sm">{tg('weather.springDesc')}</p>
            </div>
            <div className="card-flat p-6 border-t-4 border-t-green-400">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('weather.summer')}</h3>
              <p className="text-warm-600 text-sm">{tg('weather.summerDesc')}</p>
            </div>
            <div className="card-flat p-6 border-t-4 border-t-orange-400">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('weather.autumn')}</h3>
              <p className="text-warm-600 text-sm">{tg('weather.autumnDesc')}</p>
            </div>
            <div className="card-flat p-6 border-t-4 border-t-blue-400">
              <h3 className="font-display text-lg text-warm-900 mb-2">{tg('weather.winter')}</h3>
              <p className="text-warm-600 text-sm">{tg('weather.winterDesc')}</p>
            </div>
          </div>
        </section>

        {/* Monthly Table */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('weather.monthlyTitle')}</h2>
          <div className="card-flat overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-display text-warm-900">Month</th>
                    <th className="px-4 py-3 font-display text-warm-900">Avg Temp</th>
                    <th className="px-4 py-3 font-display text-warm-900">Rainfall</th>
                    <th className="px-4 py-3 font-display text-warm-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {months.map((m) => (
                    <tr key={m.name} className="hover:bg-warm-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-warm-900">{m.name}</td>
                      <td className="px-4 py-3 text-warm-600">{m.temp}&deg;C</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          m.rain === 'Low' ? 'bg-green-100 text-green-700' :
                          m.rain === 'Med' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>{m.rain}</span>
                      </td>
                      <td className="px-4 py-3 text-warm-600 text-sm">{m.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-warm-50 text-warm-500 text-xs">
              Temperatures shown are for Tokyo (central Japan). Northern regions (Hokkaido) are 5-10&deg;C cooler, southern regions (Kyushu, Okinawa) 3-8&deg;C warmer.
            </div>
          </div>
        </section>

        {/* Typhoon Season */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Typhoon Season</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>Typhoon season in Japan runs from June to October, with peak activity in August and September. While typhoons rarely cause serious issues for travelers, they can disrupt transportation and outdoor plans.</p>
              <h3>What to Expect</h3>
              <ul>
                <li>Shinkansen and flights may be delayed or cancelled during severe weather</li>
                <li>Outdoor attractions may temporarily close</li>
                <li>Southern regions (Okinawa, Kyushu) are most affected</li>
                <li>Most typhoons pass through within 1-2 days</li>
              </ul>
              <h3>Tips for Typhoon Season</h3>
              <ul>
                <li>Check weather forecasts daily and have backup indoor activities planned</li>
                <li>Travel insurance with trip interruption coverage is recommended</li>
                <li>Download the NHK World app for English weather alerts</li>
                <li>JR trains will resume quickly after storms pass</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Destination Tips */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-warm-900 mb-6">Destination Weather Tips</h2>
          <div className="space-y-4">
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-2">Tokyo</h3>
              <p className="text-warm-600 text-sm">Hot and humid summers (30-35&deg;C), mild winters (2-10&deg;C). Best visited in spring (March-May) for cherry blossoms or autumn (October-November) for pleasant weather.</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-2">Kyoto</h3>
              <p className="text-warm-600 text-sm">Similar to Tokyo but slightly more extreme. Famous for autumn foliage (mid-November to early December). Summers can be oppressively hot and humid.</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-2">Hokkaido</h3>
              <p className="text-warm-600 text-sm">Cold winters with heavy snowfall -- perfect for skiing at Niseko and Furano. Cool summers (20-25&deg;C) make it a great escape from mainland heat. No rainy season.</p>
            </div>
            <div className="card-flat p-6">
              <h3 className="font-display text-base text-warm-900 mb-2">Okinawa</h3>
              <p className="text-warm-600 text-sm">Subtropical climate with warm weather year-round (15-30&deg;C). Best for beach activities from April to October. Rainy season in May-June. Typhoons most common July-September.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
