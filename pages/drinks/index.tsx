import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getAllDrinks } = require('../../lib/drinks');

interface DrinkItem {
  slug: string;
  name: string | { en: string };
  image: string;
  category?: string;
  description?: string | { en: string };
}

interface DrinksIndexProps {
  drinks: DrinkItem[];
}

export default function DrinksIndex({ drinks }: DrinksIndexProps) {
  const { t, locale } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`${t('drinksIndex.title')} - ${siteConfig.name}`}
        description={t('drinksIndex.subtitle')}
      />
      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.drinks'), href: '/drinks/' },
        ]} />

        <div className="mb-10">
          <h1 className="font-display text-display-sm text-warm-900 mb-2">
            {t('drinksIndex.title')}
          </h1>
          <p className="text-warm-500 text-lg">
            {t('drinksIndex.subtitle')}
          </p>
        </div>

        {drinks.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 mb-6 text-warm-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 4.5H6.5L5 14.5m14 0H5m4.75-11.396V3m0 0a2.25 2.25 0 00-1.5.75M14.25 3V3m0 0a2.25 2.25 0 011.5.75" />
              </svg>
            </div>
            <p className="text-warm-500 text-lg font-medium mb-2">{t('drinksIndex.noContent')}</p>
            <p className="text-warm-400 text-sm">{t('drinksIndex.comingSoon')}</p>
          </div>
        ) : (
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {drinks.map((drink: DrinkItem) => {
              const name = (typeof drink.name === 'object' ? (drink.name as any)[locale] || drink.name.en : drink.name) || drink.slug;
              const description = typeof drink.description === 'object' ? (drink.description as any)[locale] || drink.description.en : drink.description;

              return (
                <div key={drink.slug} className="card group">
                  <Link href={`/drinks/${drink.slug}/`}>
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <Image
                        src={drink.image || '/images/placeholder.webp'}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {drink.category && (
                        <span className="badge-accent absolute top-3 left-3">
                          {drink.category}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-warm-900 mb-1">{name}</h3>
                    {description && (
                      <p className="text-warm-500 text-sm line-clamp-2">{description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();
  return {
    props: { drinks },
    revalidate: 86400,
  };
};
