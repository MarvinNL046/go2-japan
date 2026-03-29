import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const { getCityBySlug, getCitySlugs } = require('../../../lib/cities');

interface Attraction {
  name: string;
  japaneseName: string;
  description: string;
  address: string;
  openingHours: string;
  admission: string;
  duration: string;
  tips: string;
}

interface HiddenGem {
  name: string;
  description: string;
  whyVisit: string;
}

interface DayTrip {
  name: string;
  description: string;
  distance: string;
  duration: string;
  transport: string;
}

interface AttractionsData {
  slug: string;
  city: string;
  introduction: string;
  topAttractions: Attraction[];
  hiddenGems: HiddenGem[];
  dayTrips: DayTrip[];
  sources: Array<{ name: string; url: string }>;
}

interface AttractionsPageProps {
  city: any;
  attractions: AttractionsData;
}

function AdmissionBadge({ text }: { text: string }) {
  const isFree = text.toLowerCase().startsWith('free');
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isFree ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
      {text}
    </span>
  );
}

export default function CityAttractionsPage({ city, attractions }: AttractionsPageProps) {
  const { t } = useTranslation('common');
  const cityName = city.name?.en || city.name || city.slug;

  return (
    <>
      <SEOHead
        title={`${cityName} Top Attractions – Best Things to Do | ${siteConfig.name}`}
        description={`The best things to do in ${cityName}, Japan. Top attractions, hidden gems, opening hours, admission prices in JPY, and day trip suggestions.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.cities'), href: '/city/' },
          { name: cityName, href: `/city/${city.slug}/` },
          { name: 'Attractions', href: `/city/${city.slug}/attractions/` },
        ]} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-900 mb-3">
            {cityName} Top Attractions
          </h1>
          <p className="text-warm-500 text-lg max-w-3xl">
            The best things to do in {cityName} — with opening hours, admission prices, and insider tips.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 lg:p-8">
            <p className="text-warm-700 leading-relaxed text-base">{attractions.introduction}</p>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-6">
            Top Attractions in {cityName}
          </h2>
          <div className="space-y-8">
            {attractions.topAttractions.map((attraction, index) => (
              <div key={index} className="bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {/* Attraction Header */}
                <div className="px-6 py-5 border-b border-warm-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-700 text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-warm-900">{attraction.name}</h3>
                      {attraction.japaneseName && (
                        <span className="text-warm-400 text-sm">{attraction.japaneseName}</span>
                      )}
                    </div>
                  </div>
                  <AdmissionBadge text={attraction.admission} />
                </div>

                {/* Attraction Body */}
                <div className="px-6 py-5">
                  <p className="text-warm-700 text-sm leading-relaxed mb-5">{attraction.description}</p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    <div>
                      <p className="text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1">Address</p>
                      <p className="text-warm-700 text-sm">{attraction.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1">Opening Hours</p>
                      <p className="text-warm-700 text-sm">{attraction.openingHours}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1">Admission</p>
                      <p className="text-warm-700 text-sm">{attraction.admission}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1">Time Needed</p>
                      <p className="text-warm-700 text-sm">{attraction.duration}</p>
                    </div>
                  </div>

                  {/* Tip */}
                  {attraction.tips && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Insider Tip</p>
                      <p className="text-amber-800 text-sm leading-relaxed">{attraction.tips}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Gems */}
        {attractions.hiddenGems && attractions.hiddenGems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-warm-900 mb-4">Hidden Gems in {cityName}</h2>
            <p className="text-warm-500 mb-6">Less-visited places that most tourists miss.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {attractions.hiddenGems.map((gem, index) => (
                <div key={index} className="bg-white border border-warm-200 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 text-lg">💎</span>
                    <h3 className="font-bold text-warm-900 text-base">{gem.name}</h3>
                  </div>
                  <p className="text-warm-600 text-sm leading-relaxed mb-3">{gem.description}</p>
                  <div className="bg-pink-50 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide mb-0.5">Why Visit</p>
                    <p className="text-pink-800 text-sm">{gem.whyVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Day Trips */}
        {attractions.dayTrips && attractions.dayTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-warm-900 mb-4">Day Trips from {cityName}</h2>
            <p className="text-warm-500 mb-6">Worth exploring if you have extra time.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {attractions.dayTrips.map((trip, index) => (
                <div key={index} className="bg-white border border-warm-200 rounded-xl p-5">
                  <h3 className="font-bold text-warm-900 text-base mb-2">{trip.name}</h3>
                  <p className="text-warm-600 text-sm leading-relaxed mb-4">{trip.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-warm-500">
                      <span className="font-medium text-warm-700">Distance:</span> {trip.distance}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-500">
                      <span className="font-medium text-warm-700">Duration:</span> {trip.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-500">
                      <span className="font-medium text-warm-700">How to get there:</span> {trip.transport}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {attractions.sources && attractions.sources.length > 0 && (
          <section className="mb-8 pt-6 border-t border-warm-200">
            <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wide mb-3">Sources</h3>
            <div className="flex flex-wrap gap-3">
              {attractions.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-warm-500 hover:text-pink-600 underline underline-offset-2 transition-colors"
                >
                  {source.name}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Navigation Links */}
        <section className="mt-4 pt-8 border-t border-warm-200">
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/city/${city.slug}/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-700 hover:text-pink-600 transition-colors"
            >
              ← Back to {cityName} Overview
            </Link>
            <Link
              href={`/city/${city.slug}/weather/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-700 hover:text-pink-600 transition-colors"
            >
              {cityName} Weather Guide →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const attractionsDir = path.join(process.cwd(), 'data', 'cities');
  let slugs: string[] = [];
  try {
    slugs = fs.readdirSync(attractionsDir)
      .filter((f) => f.endsWith('-attractions.json'))
      .map((f) => f.replace('-attractions.json', ''));
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
    const attractionsPath = path.join(process.cwd(), 'data', 'cities', `${slug}-attractions.json`);
    if (!fs.existsSync(attractionsPath)) return { notFound: true };
    const attractions: AttractionsData = JSON.parse(fs.readFileSync(attractionsPath, 'utf8'));
    return {
      props: { city, attractions },
      revalidate: 604800,
    };
  } catch {
    return { notFound: true };
  }
};
