import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const { getCityBySlug, getCitySlugs } = require('../../../lib/cities');

interface MonthData {
  temp_high: number;
  temp_low: number;
  rainfall_mm: number;
  humidity: number;
  description: string;
  activities: string[];
  events: string[];
  crowd_level: string;
  price_level: string;
}

interface WeatherData {
  slug: string;
  city: string;
  climate_overview: string;
  best_months: string[];
  avoid_months: string[];
  monthly_weather: Record<string, MonthData>;
}

interface WeatherPageProps {
  city: any;
  weather: WeatherData;
}

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function CrowdBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; className: string }> = {
    very_low:  { label: 'Very Quiet', className: 'bg-green-100 text-green-800' },
    low:       { label: 'Quiet',      className: 'bg-green-100 text-green-700' },
    medium:    { label: 'Moderate',   className: 'bg-yellow-100 text-yellow-700' },
    high:      { label: 'Busy',       className: 'bg-orange-100 text-orange-700' },
    very_high: { label: 'Very Busy',  className: 'bg-red-100 text-red-700' },
  };
  const c = config[level] || config['medium'];
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.className}`}>
      {c.label}
    </span>
  );
}

function PriceBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; className: string }> = {
    very_low:  { label: '¥',    className: 'bg-green-100 text-green-800' },
    low:       { label: '¥¥',   className: 'bg-green-100 text-green-700' },
    medium:    { label: '¥¥¥',  className: 'bg-yellow-100 text-yellow-700' },
    high:      { label: '¥¥¥¥', className: 'bg-orange-100 text-orange-700' },
    very_high: { label: '¥¥¥¥¥', className: 'bg-red-100 text-red-700' },
  };
  const c = config[level] || config['medium'];
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.className}`}>
      {c.label}
    </span>
  );
}

export default function CityWeatherPage({ city, weather }: WeatherPageProps) {
  const { t } = useTranslation('common');
  const cityName = city.name?.en || city.name || city.slug;

  const currentMonth = new Date().getMonth(); // 0-indexed

  return (
    <>
      <SEOHead
        title={`${cityName} Weather Guide – Best Time to Visit | ${siteConfig.name}`}
        description={`Month-by-month weather guide for ${cityName}, Japan. Temperature, rainfall, crowd levels, and the best time to visit ${cityName}.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.cities'), href: '/city/' },
          { name: cityName, href: `/city/${city.slug}/` },
          { name: 'Weather', href: `/city/${city.slug}/weather/` },
        ]} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-900 mb-3">
            {cityName} Weather Guide
          </h1>
          <p className="text-warm-500 text-lg max-w-3xl">
            Month-by-month weather, best times to visit, and seasonal highlights for {cityName}, Japan.
          </p>
        </div>

        {/* Climate Overview */}
        <section className="mb-10">
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 lg:p-8">
            <h2 className="text-xl font-bold text-warm-900 mb-3">Climate Overview</h2>
            <p className="text-warm-700 leading-relaxed">{weather.climate_overview}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-2">Best Months</p>
                <div className="flex flex-wrap gap-1.5">
                  {weather.best_months.map((m) => (
                    <span key={m} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-2">Avoid If Possible</p>
                <div className="flex flex-wrap gap-1.5">
                  {weather.avoid_months.map((m) => (
                    <span key={m} className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Temperature Bar Chart */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">Monthly Temperature &amp; Rainfall</h2>
          <div className="bg-white border border-warm-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Month</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">High (°C)</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Low (°C)</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Rain (mm)</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Humidity</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Crowds</th>
                    <th className="px-4 py-3 text-left font-semibold text-warm-700">Prices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {MONTH_NAMES.map((month, i) => {
                    const data = weather.monthly_weather[month];
                    if (!data) return null;
                    const isCurrentMonth = i === currentMonth;
                    return (
                      <tr
                        key={month}
                        className={`hover:bg-warm-50 transition-colors ${isCurrentMonth ? 'bg-pink-50' : ''}`}
                      >
                        <td className="px-4 py-3 font-medium text-warm-900">
                          {MONTH_LABELS[i]}
                          {isCurrentMonth && (
                            <span className="ml-2 text-xs text-pink-600 font-semibold">Now</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-warm-700">{data.temp_high}°</td>
                        <td className="px-4 py-3 text-warm-600">{data.temp_low}°</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 rounded-full bg-blue-200" style={{ width: `${Math.min(data.rainfall_mm / 4, 80)}px` }} />
                            <span className="text-warm-600">{data.rainfall_mm}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-warm-600">{data.humidity}%</td>
                        <td className="px-4 py-3"><CrowdBadge level={data.crowd_level} /></td>
                        <td className="px-4 py-3"><PriceBadge level={data.price_level} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Monthly Deep-Dive Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-warm-900 mb-6">{cityName} Month by Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MONTH_NAMES.map((month, i) => {
              const data = weather.monthly_weather[month];
              if (!data) return null;
              const isCurrentMonth = i === currentMonth;
              const isBest = weather.best_months.includes(MONTH_LABELS[i].slice(0, 3) === MONTH_LABELS[i] ? month.charAt(0).toUpperCase() + month.slice(1) : month.charAt(0).toUpperCase() + month.slice(1));
              return (
                <div
                  key={month}
                  className={`rounded-xl border overflow-hidden ${isCurrentMonth ? 'border-pink-400 ring-2 ring-pink-200' : 'border-warm-200'}`}
                >
                  {/* Month Header */}
                  <div className={`px-5 py-4 flex items-center justify-between ${isCurrentMonth ? 'bg-pink-50' : 'bg-warm-50'}`}>
                    <div>
                      <h3 className="font-bold text-warm-900 text-lg capitalize">{month.charAt(0).toUpperCase() + month.slice(1)}</h3>
                      <p className="text-warm-500 text-sm mt-0.5">
                        {data.temp_high}° / {data.temp_low}° · {data.rainfall_mm}mm rain
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <CrowdBadge level={data.crowd_level} />
                      <PriceBadge level={data.price_level} />
                    </div>
                  </div>

                  {/* Month Body */}
                  <div className="px-5 py-4 bg-white">
                    <p className="text-warm-700 text-sm leading-relaxed mb-4">{data.description}</p>

                    {data.activities && data.activities.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-1.5">What to Do</p>
                        <div className="flex flex-wrap gap-1.5">
                          {data.activities.map((a, j) => (
                            <span key={j} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.events && data.events.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-1.5">Events &amp; Festivals</p>
                        <ul className="space-y-1">
                          {data.events.map((e, j) => (
                            <li key={j} className="text-xs text-warm-600 flex items-start gap-1.5">
                              <span className="text-pink-400 mt-0.5 flex-shrink-0">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Navigation Links */}
        <section className="mt-8 pt-8 border-t border-warm-200">
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/city/${city.slug}/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-700 hover:text-pink-600 transition-colors"
            >
              ← Back to {cityName} Overview
            </Link>
            <Link
              href={`/city/${city.slug}/attractions/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-700 hover:text-pink-600 transition-colors"
            >
              {cityName} Top Attractions →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const weatherDir = path.join(process.cwd(), 'data', 'weather');
  let slugs: string[] = [];
  try {
    slugs = fs.readdirSync(weatherDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''));
  } catch {
    slugs = getCitySlugs();
  }

  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  try {
    const weatherPath = path.join(process.cwd(), 'data', 'weather', `${slug}.json`);
    if (!fs.existsSync(weatherPath)) return { notFound: true };
    const weather: WeatherData = JSON.parse(fs.readFileSync(weatherPath, 'utf8'));
    return {
      props: { city, weather },
      revalidate: 604800,
    };
  } catch {
    return { notFound: true };
  }
};
