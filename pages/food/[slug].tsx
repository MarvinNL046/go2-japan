import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getDishBySlug, getDishSlugs } = require('../../lib/food');

interface WhereToEat {
  name: string;
  location: string;
  note?: string;
}

interface Variation {
  name: string;
  description: string;
}

interface DishDetail {
  slug: string;
  name: string | { en: string };
  japaneseName?: string;
  image: string;
  category?: string;
  spiceLevel?: string;
  description?: string | { en: string };
  overview?: string;
  origin?: {
    region?: string;
    history?: string;
  };
  ingredients?: {
    main?: string[];
    spices?: string[];
    herbs?: string[];
    condiments?: string[];
  };
  variations?: Variation[];
  howToOrder?: string;
  whereToEat?: WhereToEat[];
  priceRange?: {
    street?: string;
    restaurant?: string;
    upscale?: string;
  };
  tips?: string[];
  culturalNotes?: string;
  sources?: string[];
}

interface FoodPageProps {
  dish: DishDetail;
}

const spiceLevelColors: Record<string, string> = {
  mild: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  spicy: 'bg-orange-100 text-orange-700',
  'very-spicy': 'bg-red-100 text-red-700',
  none: 'bg-warm-100 text-warm-600',
};

const spiceTranslationKeys: Record<string, string> = {
  mild: 'spice.mild',
  medium: 'spice.medium',
  spicy: 'spice.hot',
  'very-spicy': 'spice.veryHot',
  none: 'spice.noSpice',
};

export default function FoodPage({ dish }: FoodPageProps) {
  const { t, locale } = useTranslation('common');

  const name = typeof dish.name === 'object' ? ((dish.name as any)[locale] || dish.name.en) : dish.name || dish.slug;
  const description = typeof dish.description === 'object' ? ((dish.description as any)[locale] || dish.description.en) : dish.description;
  const spiceColor = dish.spiceLevel ? spiceLevelColors[dish.spiceLevel] : null;
  const spiceLabel = dish.spiceLevel && spiceTranslationKeys[dish.spiceLevel] ? t(spiceTranslationKeys[dish.spiceLevel]) : null;

  const foodJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${name} - ${t('foodDetail.foodGuide')}`,
    description: description || t('seo.foodFallbackDesc').replace('{0}', name),
    image: dish.image || undefined,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.seo.siteUrl}/food/${dish.slug}/`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: siteConfig.seo.siteUrl },
      { '@type': 'ListItem', position: 2, name: t('nav.food'), item: `${siteConfig.seo.siteUrl}/food/` },
      { '@type': 'ListItem', position: 3, name: name, item: `${siteConfig.seo.siteUrl}/food/${dish.slug}/` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${name} - ${t('foodDetail.foodGuide')} | ${siteConfig.name}`}
        description={description || t('seo.foodFallbackDesc').replace('{0}', name)}
        ogImage={dish.image}
        path={`/food/${dish.slug}/`}
        jsonLd={[foodJsonLd, breadcrumbJsonLd]}
      />
      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.food'), href: '/food/' },
          { name: name, href: `/food/${dish.slug}/` },
        ]} />

        {/* Hero Section */}
        <div className="mb-10">
          <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-2xl mb-8">
            <Image
              src={dish.image || '/images/placeholder.webp'}
              alt={name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {dish.category && (
                <span className="badge-accent">{dish.category}</span>
              )}
              {spiceColor && spiceLabel && (
                <span className={`badge ${spiceColor}`}>{spiceLabel}</span>
              )}
            </div>
          </div>

          <h1 className="font-display text-display-sm text-warm-900 mb-2">
            {name}
          </h1>
          {dish.japaneseName && (
            <p className="text-warm-500 text-xl italic mb-4">
              {dish.japaneseName}
            </p>
          )}
          {description && (
            <p className="text-warm-600 text-lg leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-4xl">
          {/* Overview */}
          {dish.overview && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('cityDetail.overview')}</h2>
              <div className="prose-custom">
                <p>{dish.overview}</p>
              </div>
            </section>
          )}

          {/* Origin & History */}
          {dish.origin && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.originHistory')}</h2>
              <div className="prose-custom">
                {dish.origin.region && (
                  <p className="text-warm-600 mb-2">
                    <span className="font-semibold text-warm-800">{t('foodDetail.region')}</span> {dish.origin.region}
                  </p>
                )}
                {dish.origin.history && (
                  <p>{dish.origin.history}</p>
                )}
              </div>
            </section>
          )}

          {/* Ingredients */}
          {dish.ingredients && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.ingredients')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dish.ingredients.main && dish.ingredients.main.length > 0 && (
                  <div className="card-flat p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-3">{t('foodDetail.mainIngredients')}</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.main.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dish.ingredients.herbs && dish.ingredients.herbs.length > 0 && (
                  <div className="card-flat p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-3">{t('foodDetail.herbsGreens')}</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.herbs.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dish.ingredients.spices && dish.ingredients.spices.length > 0 && (
                  <div className="card-flat p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-3">{t('foodDetail.spices')}</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.spices.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dish.ingredients.condiments && dish.ingredients.condiments.length > 0 && (
                  <div className="card-flat p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-3">{t('foodDetail.condiments')}</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.condiments.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-warm-400 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* How to Order */}
          {dish.howToOrder && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.howToOrder')}</h2>
              <div className="card-flat p-6 border-l-4 border-l-brand-accent">
                <p className="text-warm-600 leading-relaxed">{dish.howToOrder}</p>
              </div>
            </section>
          )}

          {/* Variations */}
          {dish.variations && dish.variations.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.variations')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dish.variations.map((variation, index) => (
                  <div key={index} className="card p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-2">{variation.name}</h3>
                    <p className="text-warm-500 text-sm">{variation.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Where to Eat */}
          {dish.whereToEat && dish.whereToEat.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.whereToEat')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dish.whereToEat.map((place, index) => (
                  <div key={index} className="card p-5">
                    <h3 className="font-display font-bold text-warm-900 mb-1">{place.name}</h3>
                    <p className="text-warm-500 text-sm mb-2">
                      <svg className="inline-block w-4 h-4 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {place.location}
                    </p>
                    {place.note && (
                      <p className="text-warm-400 text-sm italic">{place.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Price Range */}
          {dish.priceRange && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.priceRange')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {dish.priceRange.street && (
                  <div className="card-flat p-4 text-center">
                    <p className="text-warm-400 text-xs mb-1">{t('foodDetail.streetFood')}</p>
                    <p className="font-display text-warm-900 font-bold">{dish.priceRange.street}</p>
                  </div>
                )}
                {dish.priceRange.restaurant && (
                  <div className="card-flat p-4 text-center">
                    <p className="text-warm-400 text-xs mb-1">{t('foodDetail.restaurant')}</p>
                    <p className="font-display text-warm-900 font-bold">{dish.priceRange.restaurant}</p>
                  </div>
                )}
                {dish.priceRange.upscale && (
                  <div className="card-flat p-4 text-center">
                    <p className="text-warm-400 text-xs mb-1">{t('foodDetail.upscale')}</p>
                    <p className="font-display text-warm-900 font-bold">{dish.priceRange.upscale}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Tips */}
          {dish.tips && dish.tips.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.tips')}</h2>
              <ul className="space-y-3">
                {dish.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Cultural Notes */}
          {dish.culturalNotes && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-warm-900 mb-4">{t('foodDetail.culturalNotes')}</h2>
              <div className="prose-custom">
                <p>{dish.culturalNotes}</p>
              </div>
            </section>
          )}

          {/* Sources */}
          {dish.sources && dish.sources.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-warm-700 text-lg mb-3">{t('foodDetail.sources')}</h2>
              <ul className="text-warm-400 text-sm space-y-1">
                {dish.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Back Link */}
          <div className="pt-6 border-t border-warm-100">
            <Link
              href="/food/"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t('foodDetail.backToAll')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getDishSlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dish = getDishBySlug(params?.slug as string);
  if (!dish) {
    return { notFound: true };
  }
  return {
    props: { dish },
    revalidate: 604800,
  };
};
