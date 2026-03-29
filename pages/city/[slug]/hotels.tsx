import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { siteConfig } from '../../../site.config';

const { getCityBySlug, getCitySlugs } = require('../../../lib/cities');

interface Area {
  name: string;
  description: string;
  bestFor: string;
  priceRange: string;
}

interface HotelOption {
  name: string;
  type: string;
  priceRange: string;
  description: string;
}

interface Source {
  name: string;
  url: string;
}

interface HotelsData {
  slug: string;
  cityName: string;
  introduction: string;
  bestAreas: Area[];
  budgetOptions: HotelOption[];
  midrangeOptions: HotelOption[];
  luxuryOptions: HotelOption[];
  bookingTips: string[];
  sources: Source[];
}

interface CityHotelsPageProps {
  city: any;
  hotelsData: HotelsData;
}

function HotelCard({ hotel, tier }: { hotel: HotelOption; tier: 'budget' | 'midrange' | 'luxury' }) {
  const tierStyles = {
    budget: 'bg-green-50 text-green-700 border border-green-200',
    midrange: 'bg-blue-50 text-blue-700 border border-blue-200',
    luxury: 'bg-amber-50 text-amber-700 border border-amber-200',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-bold text-brand-secondary">{hotel.name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{hotel.type}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${tierStyles[tier]}`}>
          {hotel.priceRange}
        </span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{hotel.description}</p>
    </div>
  );
}

export default function CityHotelsPage({ city, hotelsData }: CityHotelsPageProps) {
  const cityName = city?.name?.en || city?.name || hotelsData.cityName;

  return (
    <>
      <SEOHead
        title={`Where to Stay in ${cityName} — Best Hotels & Areas | ${siteConfig.name}`}
        description={`Find the best places to stay in ${cityName}: top neighborhoods, budget hostels, mid-range hotels, luxury ryokan and booking tips. Complete ${cityName} accommodation guide.`}
        path={`/city/${hotelsData.slug}/hotels/`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { name: 'Home', href: '/' },
          { name: 'Cities', href: '/city/' },
          { name: cityName, href: `/city/${hotelsData.slug}/` },
          { name: 'Where to Stay', href: `/city/${hotelsData.slug}/hotels/` },
        ]} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-3">
            Where to Stay in {cityName}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Best areas, hotels, ryokan &amp; booking tips
          </p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            {hotelsData.introduction}
          </p>
        </div>

        {/* Best Areas */}
        {hotelsData.bestAreas && hotelsData.bestAreas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Best Areas to Stay
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {hotelsData.bestAreas.map((area, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-brand-secondary">{area.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                      {area.priceRange}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{area.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-600">Best for: </span>
                    {area.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Budget Options */}
        {hotelsData.budgetOptions && hotelsData.budgetOptions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-secondary mb-2">Budget Options</h2>
            <p className="text-gray-500 text-sm mb-5">Hostels, capsule hotels &amp; budget business hotels</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotelsData.budgetOptions.map((hotel, i) => (
                <HotelCard key={i} hotel={hotel} tier="budget" />
              ))}
            </div>
          </section>
        )}

        {/* Mid-range Options */}
        {hotelsData.midrangeOptions && hotelsData.midrangeOptions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-secondary mb-2">Mid-Range Options</h2>
            <p className="text-gray-500 text-sm mb-5">Comfortable hotels, boutique stays &amp; mid-tier ryokan</p>
            <div className="grid gap-4 md:grid-cols-2">
              {hotelsData.midrangeOptions.map((hotel, i) => (
                <HotelCard key={i} hotel={hotel} tier="midrange" />
              ))}
            </div>
          </section>
        )}

        {/* Luxury Options */}
        {hotelsData.luxuryOptions && hotelsData.luxuryOptions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-2">Luxury Options</h2>
            <p className="text-gray-500 text-sm mb-5">Premium hotels, top ryokan &amp; resort experiences</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotelsData.luxuryOptions.map((hotel, i) => (
                <HotelCard key={i} hotel={hotel} tier="luxury" />
              ))}
            </div>
          </section>
        )}

        {/* Booking Tips */}
        {hotelsData.bookingTips && hotelsData.bookingTips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Booking Tips
            </h2>
            <ul className="space-y-3">
              {hotelsData.bookingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <span className="text-brand-primary font-bold text-sm mt-0.5 shrink-0">{i + 1}.</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {hotelsData.sources && hotelsData.sources.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-600 mb-3">Sources</h2>
            <ul className="flex flex-wrap gap-3">
              {hotelsData.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getCitySlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  // Load hotels data
  const hotelsDataPath = path.join(process.cwd(), 'data', 'cities', `${slug}-hotels.json`);
  if (!fs.existsSync(hotelsDataPath)) {
    return { notFound: true };
  }

  const hotelsData: HotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));

  return {
    props: { city, hotelsData },
    revalidate: 604800,
  };
};
