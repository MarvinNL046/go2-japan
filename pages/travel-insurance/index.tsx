import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

export default function TravelInsurance() {
  const { t } = useTranslation('common');
  const { t: tg } = useTranslation('guides');

  return (
    <>
      <SEOHead
        title={`${tg('insurance.seoTitle')} | ${siteConfig.name}`}
        description={tg('insurance.seoDescription')}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: t('nav.home'), href: '/' },
          { name: tg('insurance.breadcrumb'), href: '/travel-insurance/' },
        ]} />

        <div className="mb-12">
          <h1 className="font-display text-display-sm text-warm-900 mb-4">{tg('insurance.title')}</h1>
          <p className="text-warm-500 text-lg max-w-3xl">{tg('insurance.intro')}</p>
        </div>

        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('insurance.whyTitle')}</h2>
          <div className="card-flat p-6 lg:p-8 border-l-4 border-l-brand-primary">
            <div className="prose-custom">
              <p>{tg('insurance.whyDesc')}</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl text-warm-900 mb-6">{tg('insurance.whatToCover')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-flat p-6">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-warm-600 text-sm">{tg('insurance.medical')}</p>
            </div>
            <div className="card-flat p-6">
              <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-warm-600 text-sm">{tg('insurance.evacuation')}</p>
            </div>
            <div className="card-flat p-6">
              <div className="w-10 h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-warm-600 text-sm">{tg('insurance.tripCancel')}</p>
            </div>
            <div className="card-flat p-6">
              <p className="text-warm-600 text-sm">{tg('insurance.baggage')}</p>
            </div>
            <div className="card-flat p-6">
              <p className="text-warm-600 text-sm">{tg('insurance.adventure')}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
