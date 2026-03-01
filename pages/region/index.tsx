import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import RegionCard from '../../components/RegionCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getAllRegions } = require('../../lib/regions');

interface RegionsIndexProps {
  regions: any[];
}

export default function RegionsIndex({ regions }: RegionsIndexProps) {
  const { t, locale } = useTranslation('common');

  return (
    <>
      <SEOHead
        title={`${t('regionIndex.title')} - ${siteConfig.name}`}
        description={t('regionIndex.subtitle')}
      />
      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: t('nav.regions'), href: '/region/' },
        ]} />

        <div className="mb-10">
          <h1 className="font-display text-display-sm text-warm-900 mb-2">
            {t('regionIndex.title')}
          </h1>
          <p className="text-warm-500 text-lg">
            {t('regionIndex.subtitle')}
          </p>
        </div>

        {regions.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 mb-6 text-warm-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>
            <p className="text-warm-500 text-lg font-medium mb-2">{t('regionIndex.noContent')}</p>
            <p className="text-warm-400 text-sm">{t('regionIndex.comingSoon')}</p>
          </div>
        ) : (
          <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {regions.map((region: any) => (
              <RegionCard
                key={region.slug}
                name={(typeof region.name === 'object' ? (region.name as any)[locale] || region.name.en : region.name) || region.slug}
                slug={region.slug}
                image={region.image || '/images/placeholder.webp'}
                highlights={region.highlights || []}
                description={typeof region.description === 'object' ? (region.description as any)[locale] || region.description.en : region.description}
                cities={region.cities || []}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const regions = getAllRegions();
  return {
    props: { regions },
    revalidate: 86400,
  };
};
