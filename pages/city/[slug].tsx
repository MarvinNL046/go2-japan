import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getCityBySlug, getCitySlugs } = require('../../lib/cities');

interface CityPageProps {
  city: any;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-brand-secondary mb-4 mt-10 border-b border-gray-200 pb-2">
      {children}
    </h2>
  );
}

function NeighborhoodCard({ neighborhood }: { neighborhood: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-brand-secondary text-lg">{neighborhood.name}</span>
        <span className="text-brand-primary text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-white">
          <p className="text-gray-700 leading-relaxed mb-3">{neighborhood.description}</p>
          {neighborhood.highlights && neighborhood.highlights.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {neighborhood.highlights.map((h: string, i: number) => (
                <li key={i} className="text-gray-600 text-sm">{h}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function CityPage({ city }: CityPageProps) {
  const { t } = useTranslation('common');
  const cityName = city.name?.en || city.name || city.slug;

  return (
    <>
      <SEOHead
        title={`${cityName} Travel Guide - ${siteConfig.name}`}
        description={city.description?.en || city.description || `Complete travel guide for ${cityName} in ${siteConfig.destination}.`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.cities'), href: '/city/' },
          { name: cityName, href: `/city/${city.slug}/` },
        ]} />

        {/* Hero */}
        {city.image ? (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image src={city.image} alt={cityName} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{cityName}</h1>
              {city.japaneseName && (
                <span className="block text-white/80 text-xl mt-1 font-light">{city.japaneseName}</span>
              )}
              {city.region && (
                <span className="inline-block mt-2 bg-brand-primary text-white text-sm px-3 py-1 rounded-full">{city.region}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary">
              {cityName}
              {city.japaneseName && (
                <span className="ml-3 text-gray-400 font-light">{city.japaneseName}</span>
              )}
            </h1>
            {city.region && (
              <span className="inline-block mt-2 bg-brand-primary text-white text-sm px-3 py-1 rounded-full">{city.region}</span>
            )}
          </div>
        )}

        {/* Ad slot — top */}
        <div className="ad-slot ad-slot-top my-6" data-ad-position="city-top" />

        {/* Description */}
        {(city.description?.en || city.description) && (
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {city.description?.en || city.description}
          </p>
        )}

        {/* Highlights pills */}
        {city.highlights && city.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {city.highlights.map((h: string, i: number) => (
              <span key={i} className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">{h}</span>
            ))}
          </div>
        )}

        {/* Overview */}
        {city.overview && (
          <>
            <SectionHeading>Overview</SectionHeading>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{city.overview}</p>
            </div>
          </>
        )}

        {/* Neighborhoods */}
        {city.neighborhoods && city.neighborhoods.length > 0 && (
          <>
            <SectionHeading>Neighborhoods</SectionHeading>
            <div>
              {city.neighborhoods.map((n: any, i: number) => (
                <NeighborhoodCard key={i} neighborhood={n} />
              ))}
            </div>
          </>
        )}

        {/* Must-Do Experiences */}
        {city.mustDo && city.mustDo.length > 0 && (
          <>
            <SectionHeading>Must-Do Experiences</SectionHeading>
            <div className="space-y-6">
              {city.mustDo.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-secondary text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ad slot — middle */}
        <div className="ad-slot ad-slot-middle my-8" data-ad-position="city-middle" />

        {/* Food & Drink */}
        {city.food && (
          <>
            <SectionHeading>Food &amp; Drink</SectionHeading>
            {city.food.description && (
              <p className="text-gray-700 leading-relaxed mb-4">{city.food.description}</p>
            )}
            {city.food.specialties && city.food.specialties.length > 0 && (
              <ul className="space-y-3">
                {city.food.specialties.map((s: string, i: number) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-brand-primary font-bold flex-shrink-0">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Getting There */}
        {city.gettingThere && (
          <>
            <SectionHeading>Getting There</SectionHeading>
            <div className="grid gap-4 md:grid-cols-1">
              {city.gettingThere.byAir && (
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="font-semibold text-brand-secondary mb-2 flex items-center gap-2">
                    <span>✈</span> By Air
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{city.gettingThere.byAir}</p>
                </div>
              )}
              {city.gettingThere.byTrain && (
                <div className="bg-green-50 rounded-xl p-5">
                  <h3 className="font-semibold text-brand-secondary mb-2 flex items-center gap-2">
                    <span>🚅</span> By Train
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{city.gettingThere.byTrain}</p>
                </div>
              )}
              {city.gettingThere.byBus && (
                <div className="bg-yellow-50 rounded-xl p-5">
                  <h3 className="font-semibold text-brand-secondary mb-2 flex items-center gap-2">
                    <span>🚌</span> By Bus
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{city.gettingThere.byBus}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Getting Around */}
        {city.gettingAround && (
          <>
            <SectionHeading>Getting Around</SectionHeading>
            <p className="text-gray-700 leading-relaxed">{city.gettingAround}</p>
          </>
        )}

        {/* Best Time to Visit */}
        {city.bestTimeToVisit && (
          <>
            <SectionHeading>Best Time to Visit</SectionHeading>
            {city.bestTimeToVisit.best && (
              <p className="text-brand-primary font-semibold mb-2">Best months: {city.bestTimeToVisit.best}</p>
            )}
            {city.bestTimeToVisit.description && (
              <p className="text-gray-700 leading-relaxed mb-4">{city.bestTimeToVisit.description}</p>
            )}
            {city.bestTimeToVisit.seasons && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(city.bestTimeToVisit.seasons).map(([season, text]) => (
                  <div key={season} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-brand-secondary capitalize mb-1">{season}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{String(text)}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Budget Guide */}
        {city.budget && (
          <>
            <SectionHeading>Budget Guide</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {city.budget.backpacker && (
                <div className="border-2 border-green-200 rounded-xl p-4 text-center">
                  <div className="text-xs uppercase font-bold text-green-600 mb-1">Backpacker</div>
                  <div className="text-xl font-bold text-gray-800">{city.budget.backpacker}</div>
                </div>
              )}
              {city.budget.midRange && (
                <div className="border-2 border-blue-200 rounded-xl p-4 text-center">
                  <div className="text-xs uppercase font-bold text-blue-600 mb-1">Mid-Range</div>
                  <div className="text-xl font-bold text-gray-800">{city.budget.midRange}</div>
                </div>
              )}
              {city.budget.luxury && (
                <div className="border-2 border-purple-200 rounded-xl p-4 text-center">
                  <div className="text-xs uppercase font-bold text-purple-600 mb-1">Luxury</div>
                  <div className="text-xl font-bold text-gray-800">{city.budget.luxury}</div>
                </div>
              )}
            </div>
            {city.budget.details && (
              <p className="text-gray-700 leading-relaxed text-sm">{city.budget.details}</p>
            )}
          </>
        )}

        {/* Safety */}
        {city.safety && (
          <>
            <SectionHeading>Safety</SectionHeading>
            <p className="text-gray-700 leading-relaxed">{city.safety}</p>
          </>
        )}

        {/* Local Tips */}
        {city.localTips && city.localTips.length > 0 && (
          <>
            <SectionHeading>Local Tips</SectionHeading>
            <ul className="space-y-3">
              {city.localTips.map((tip: string, i: number) => (
                <li key={i} className="flex gap-3 bg-amber-50 rounded-lg p-4">
                  <span className="text-amber-500 font-bold flex-shrink-0">💡</span>
                  <span className="text-gray-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Day Trips */}
        {city.dayTrips && city.dayTrips.length > 0 && (
          <>
            <SectionHeading>Day Trips</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {city.dayTrips.map((trip: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-brand-secondary text-lg mb-1">{trip.name}</h3>
                  {trip.distance && (
                    <p className="text-xs text-brand-primary font-medium mb-2">{trip.distance}</p>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed">{trip.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ad slot — bottom */}
        <div className="ad-slot ad-slot-bottom my-8" data-ad-position="city-bottom" />

        {/* Sources */}
        {city.sources && city.sources.length > 0 && (
          <footer className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Sources</h3>
            <ul className="space-y-1">
              {city.sources.map((source: string, i: number) => (
                <li key={i} className="text-gray-500 text-sm">{source}</li>
              ))}
            </ul>
          </footer>
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
  const city = getCityBySlug(params?.slug as string);
  if (!city) return { notFound: true };
  return {
    props: { city },
    revalidate: 604800,
  };
};
