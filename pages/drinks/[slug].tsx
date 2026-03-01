import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getDrinkBySlug, getDrinkSlugs } = require('../../lib/drinks');

interface DrinkDetail {
  slug: string;
  name: string;
  japaneseName?: string;
  image: string;
  description?: string;
  history?: string;
  howToEnjoy?: string;
  whereToTry?: string;
  priceRange?: string;
  alcoholContent?: string;
  bestWith?: string[];
}

interface DrinkPageProps {
  drink: DrinkDetail;
}

export default function DrinkPage({ drink }: DrinkPageProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`${drink.name} - Japanese Drinks Guide | ${siteConfig.name}`}
        description={drink.description || `Learn about ${drink.name}, a popular Japanese drink.`}
        ogImage={drink.image}
        path={`/drinks/${drink.slug}/`}
      />
      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.drinks'), href: '/drinks/' },
          { name: drink.name, href: `/drinks/${drink.slug}/` },
        ]} />

        {/* Hero Section */}
        <div className="mb-10">
          <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-2xl mb-8">
            <Image
              src={drink.image || '/images/placeholder.webp'}
              alt={drink.name}
              fill
              priority
              className="object-cover"
            />
            {drink.alcoholContent && (
              <span className="badge-accent absolute top-4 left-4">
                {drink.alcoholContent}
              </span>
            )}
          </div>

          <h1 className="font-display text-display-sm text-warm-900 mb-2">
            {drink.name}
          </h1>
          {drink.japaneseName && (
            <p className="text-warm-500 text-xl italic mb-4">
              {drink.japaneseName}
            </p>
          )}
          {drink.description && (
            <p className="text-warm-600 text-lg leading-relaxed max-w-3xl">
              {drink.description}
            </p>
          )}
        </div>

        <div className="max-w-4xl">
          {/* History */}
          {drink.history && (
            <section className="mb-12">
              <h2 className="section-title font-display text-2xl text-warm-900 mb-4">History</h2>
              <div className="prose-custom">
                <p>{drink.history}</p>
              </div>
            </section>
          )}

          {/* How to Enjoy */}
          {drink.howToEnjoy && (
            <section className="mb-12">
              <h2 className="section-title font-display text-2xl text-warm-900 mb-4">How to Enjoy</h2>
              <div className="prose-custom">
                <p>{drink.howToEnjoy}</p>
              </div>
            </section>
          )}

          {/* Where to Try */}
          {drink.whereToTry && (
            <section className="mb-12">
              <h2 className="section-title font-display text-2xl text-warm-900 mb-4">Where to Try</h2>
              <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
                <div className="prose-custom">
                  <p>{drink.whereToTry}</p>
                </div>
              </div>
            </section>
          )}

          {/* Best With (Food Pairings) */}
          {drink.bestWith && drink.bestWith.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title font-display text-2xl text-warm-900 mb-4">Best Paired With</h2>
              <div className="flex flex-wrap gap-2">
                {drink.bestWith.map((food, index) => (
                  <span key={index} className="bg-warm-100 text-warm-700 px-4 py-2 rounded-full text-sm font-medium">
                    {food}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Price Range */}
          {drink.priceRange && (
            <section className="mb-12">
              <h2 className="section-title font-display text-2xl text-warm-900 mb-4">Price Range</h2>
              <div className="card-flat p-5 inline-flex items-center gap-3">
                <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-display font-bold text-warm-900 text-lg">{drink.priceRange}</span>
              </div>
            </section>
          )}

          {/* Back Link */}
          <div className="pt-6 border-t border-warm-100">
            <Link
              href="/drinks/"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t('drinkDetail.backToAll')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getDrinkSlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const drink = getDrinkBySlug(params?.slug as string);
  if (!drink) {
    return { notFound: true };
  }
  return {
    props: { drink },
    revalidate: 86400,
  };
};
