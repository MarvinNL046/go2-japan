import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getRegionBySlug, getRegionSlugs } = require('../../lib/regions');
const { getAllCities } = require('../../lib/cities');

interface TopExperience {
  title: string;
  description: string;
}

interface FoodSpecialty {
  description?: string;
  specialties?: string[];
}

interface RegionDetail {
  slug: string;
  name: string | { en: string; nl?: string };
  image?: string;
  description?: string | { en: string; nl?: string };
  overview?: string;
  highlights?: (string | { en: string; nl?: string })[];
  cities?: string[];
  bestTimeToVisit?: string;
  topExperiences?: TopExperience[];
  gettingThere?: {
    byAir?: string;
    byTrain?: string;
    byBus?: string;
    byBoat?: string;
  };
  gettingAround?: string;
  accommodation?: {
    budget?: string;
    midRange?: string;
    luxury?: string;
  };
  food?: FoodSpecialty;
  tips?: string[];
  safetyNotes?: string;
}

interface RegionPageProps {
  region: RegionDetail;
  linkedCities: any[];
}

/* ------------------------------------------------------------------ */
/*  SVG Icon helpers                                                   */
/* ------------------------------------------------------------------ */

function IconPlane() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function IconTrain() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17l-2 4m10-4l2 4M12 2v4m-6 6h12M6 12V8a6 6 0 0112 0v4M6 12a2 2 0 002 2h8a2 2 0 002-2" />
    </svg>
  );
}

function IconBus() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-4 8v-4m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function IconBoat() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17h1l1-2h14l1 2h1m-18 0v2h18v-2M5 15V8a2 2 0 012-2h10a2 2 0 012 2v7" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function RegionPage({ region, linkedCities }: RegionPageProps) {
  const { t, locale } = useTranslation('common');
  const regionName = typeof region.name === 'object' ? ((region.name as any)[locale] || region.name.en) : region.name;
  const regionDescription = typeof region.description === 'object' ? ((region.description as any)[locale] || region.description.en) : region.description;

  return (
    <>
      <SEOHead
        title={`${regionName} Travel Guide - ${siteConfig.name}`}
        description={regionDescription || t('seo.regionFallbackDesc').replace('{0}', regionName).replace('{1}', siteConfig.destination)}
        ogImage={region.image}
      />
      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.regions'), href: '/region/' },
          { name: regionName, href: `/region/${region.slug}/` },
        ]} />

        {/* Hero Image */}
        {region.image && (
          <div className="relative h-72 md:h-[28rem] rounded-2xl overflow-hidden mb-10 shadow-soft-xl">
            <Image src={region.image} alt={regionName} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="font-display text-display-sm md:text-display-md text-white mb-3">{regionName}</h1>
            </div>
          </div>
        )}

        {!region.image && (
          <div className="mb-10">
            <h1 className="font-display text-display-sm md:text-display-md text-warm-900 mb-3">{regionName}</h1>
          </div>
        )}

        {/* Highlights Pills */}
        {region.highlights && region.highlights.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            {region.highlights.map((h: any, i: number) => (
              <span
                key={i}
                className="bg-brand-secondary-50 text-brand-secondary-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-brand-secondary-100"
              >
                {typeof h === 'object' ? (h[locale] || h.en) : h}
              </span>
            ))}
          </div>
        )}

        <div className="max-w-4xl">
          {/* Overview */}
          {(region.overview || regionDescription) && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('regionDetail.overview')}</h2>
              <div className="prose-custom">
                <p>{region.overview || regionDescription}</p>
              </div>
            </section>
          )}

          {/* Top Experiences */}
          {region.topExperiences && region.topExperiences.length > 0 && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.topExperiences')}</h2>
              <p className="text-warm-500 mb-6">{t('regionDetail.bestThingsToDo')} {regionName}</p>
              <div className="space-y-4">
                {region.topExperiences.map((item, index) => (
                  <div key={index} className="card-flat p-5 flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent-100 text-brand-accent-800 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-warm-900 mb-1">{item.title}</h3>
                      <p className="text-warm-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cities in this Region */}
          {linkedCities.length > 0 && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.citiesIn')} {regionName}</h2>
              <p className="text-warm-500 mb-6">{t('regionDetail.exploreDestinations')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {linkedCities.map((city: any, index: number) => {
                  const cityName = typeof city.name === 'object' ? ((city.name as any)[locale] || city.name.en) : city.name || city.slug;
                  const cityDesc = typeof city.description === 'object' ? ((city.description as any)[locale] || city.description.en) : city.description;
                  return (
                    <Link
                      key={index}
                      href={`/city/${city.slug}/`}
                      className="card-flat p-5 flex gap-4 hover:border-brand-primary/30 transition-colors group"
                    >
                      {city.image && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={city.image} alt={cityName} fill className="object-cover" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-warm-900 group-hover:text-brand-primary transition-colors">{cityName}</h3>
                        {city.region && (
                          <p className="text-warm-400 text-xs mb-1">{city.region}</p>
                        )}
                        {cityDesc && (
                          <p className="text-warm-500 text-sm line-clamp-2">{cityDesc}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Best Time to Visit */}
          {region.bestTimeToVisit && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('regionDetail.bestTimeToVisit')}</h2>
              <div className="card p-6 flex items-center gap-4 bg-brand-accent-50 border-brand-accent-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent-100 flex items-center justify-center">
                  <IconStar />
                </div>
                <div>
                  <p className="text-warm-500 text-sm font-medium uppercase tracking-wide">{t('regionDetail.recommendedPeriod')}</p>
                  <p className="font-display font-bold text-warm-900 text-lg">{region.bestTimeToVisit}</p>
                </div>
              </div>
            </section>
          )}

          {/* Food & Specialties */}
          {region.food && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.foodSpecialties')}</h2>
              {region.food.description && (
                <div className="prose-custom mb-6">
                  <p>{region.food.description}</p>
                </div>
              )}
              {region.food.specialties && region.food.specialties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {region.food.specialties.map((item: string, index: number) => {
                    let displayName: string | undefined;
                    let displayDesc: string = item;

                    if (item.includes(' - ')) {
                      const dashIndex = item.indexOf(' - ');
                      displayName = item.substring(0, dashIndex);
                      displayDesc = item.substring(dashIndex + 3);
                    }

                    return (
                      <div key={index} className="card-flat p-5">
                        {displayName && (
                          <h3 className="font-display font-bold text-warm-900 mb-1">{displayName}</h3>
                        )}
                        <p className="text-warm-600 text-sm leading-relaxed">{displayDesc}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Getting There */}
          {region.gettingThere && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.gettingThere')}</h2>
              <p className="text-warm-500 mb-6">{t('regionDetail.howToReach')} {regionName}</p>
              <div className="grid grid-cols-1 gap-4">
                {region.gettingThere.byAir && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                        <IconPlane />
                      </div>
                      <h3 className="font-display font-bold text-warm-900">{t('regionDetail.byAir')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.gettingThere.byAir}</p>
                  </div>
                )}
                {region.gettingThere.byTrain && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <IconTrain />
                      </div>
                      <h3 className="font-display font-bold text-warm-900">{t('regionDetail.byTrain')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.gettingThere.byTrain}</p>
                  </div>
                )}
                {region.gettingThere.byBus && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                        <IconBus />
                      </div>
                      <h3 className="font-display font-bold text-warm-900">{t('regionDetail.byBus')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.gettingThere.byBus}</p>
                  </div>
                )}
                {region.gettingThere.byBoat && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0">
                        <IconBoat />
                      </div>
                      <h3 className="font-display font-bold text-warm-900">{t('regionDetail.byBoat')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.gettingThere.byBoat}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Getting Around */}
          {region.gettingAround && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('regionDetail.gettingAround')}</h2>
              <div className="prose-custom">
                <p>{region.gettingAround}</p>
              </div>
            </section>
          )}

          {/* Accommodation */}
          {region.accommodation && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.accommodation')}</h2>
              <p className="text-warm-500 mb-6">{t('regionDetail.whereToStay')} {regionName}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {region.accommodation.budget && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-sm font-bold">$</span>
                      <h3 className="font-display font-bold text-lg text-warm-900">{t('regionDetail.budget')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.accommodation.budget}</p>
                  </div>
                )}
                {region.accommodation.midRange && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold">$$</span>
                      <h3 className="font-display font-bold text-lg text-warm-900">{t('regionDetail.midRange')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.accommodation.midRange}</p>
                  </div>
                )}
                {region.accommodation.luxury && (
                  <div className="card-flat p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-sm font-bold">$$$</span>
                      <h3 className="font-display font-bold text-lg text-warm-900">{t('regionDetail.luxury')}</h3>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{region.accommodation.luxury}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Safety */}
          {region.safetyNotes && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('regionDetail.safety')}</h2>
              <div className="card-flat p-6 flex gap-4">
                <IconShield />
                <div className="prose-custom">
                  <p>{region.safetyNotes}</p>
                </div>
              </div>
            </section>
          )}

          {/* Tips */}
          {region.tips && region.tips.length > 0 && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-warm-900 mb-2">{t('regionDetail.travelTips')}</h2>
              <p className="text-warm-500 mb-6">{t('regionDetail.insiderAdvice')} {regionName}</p>
              <ul className="space-y-4">
                {region.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-accent-100 text-brand-accent-800 flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-warm-600 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Back Link */}
          <div className="pt-6 border-t border-warm-100">
            <Link
              href="/region/"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t('regionDetail.backToAll')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getRegionSlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const region = getRegionBySlug(params?.slug as string);
  if (!region) return { notFound: true };

  // Load linked city data for the cities in this region
  const allCities = getAllCities();
  const regionCitySlugs = region.cities || [];
  const linkedCities = regionCitySlugs
    .map((slug: string) => allCities.find((c: any) => c.slug === slug))
    .filter(Boolean);

  return {
    props: { region, linkedCities },
    revalidate: 86400,
  };
};
