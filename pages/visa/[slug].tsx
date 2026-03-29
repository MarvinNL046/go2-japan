import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const { getVisaBySlug, getVisaSlugs } = require('../../lib/visas');

interface VisaDetail {
  slug: string;
  name: string;
  description: string;
  eligibility?: string;
  duration?: string;
  cost?: string;
  processingTime?: string;
  requirements?: string[];
  applicationProcess?: string[];
  importantNotes?: string[];
}

interface VisaPageProps {
  visa: VisaDetail;
}

export default function VisaDetailPage({ visa }: VisaPageProps) {
  const pageTitle = `${visa.name} - Japan Visa Guide | ${siteConfig.name}`;
  const pageDescription = visa.description
    ? visa.description.slice(0, 160)
    : `Complete guide to the Japan ${visa.name}: requirements, application process, costs, and processing times.`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.seo.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Visa Information', item: `${siteConfig.seo.siteUrl}/visa/` },
      { '@type': 'ListItem', position: 3, name: visa.name, item: `${siteConfig.seo.siteUrl}/visa/${visa.slug}/` },
    ],
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        path={`/visa/${visa.slug}/`}
        jsonLd={breadcrumbJsonLd}
      />

      <div className="container-custom py-8 lg:py-12">
        <Breadcrumbs items={[
          { name: 'Home', href: '/' },
          { name: 'Visa Information', href: '/visa/' },
          { name: visa.name, href: `/visa/${visa.slug}/` },
        ]} />

        <div className="mb-10">
          <h1 className="font-display text-display-sm md:text-display-md text-warm-900 mb-4">{visa.name}</h1>
          {visa.description && (
            <p className="text-warm-600 text-lg max-w-3xl leading-relaxed">{visa.description}</p>
          )}
        </div>

        {/* Quick Facts */}
        {(visa.duration || visa.cost || visa.processingTime) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {visa.duration && (
              <div className="card-flat p-5 text-center">
                <p className="text-warm-400 text-xs font-medium uppercase tracking-wide mb-1">Duration</p>
                <p className="font-display font-bold text-warm-900">{visa.duration}</p>
              </div>
            )}
            {visa.cost && (
              <div className="card-flat p-5 text-center">
                <p className="text-warm-400 text-xs font-medium uppercase tracking-wide mb-1">Cost</p>
                <p className="font-display font-bold text-warm-900">{visa.cost}</p>
              </div>
            )}
            {visa.processingTime && (
              <div className="card-flat p-5 text-center">
                <p className="text-warm-400 text-xs font-medium uppercase tracking-wide mb-1">Processing Time</p>
                <p className="font-display font-bold text-warm-900">{visa.processingTime}</p>
              </div>
            )}
          </div>
        )}

        <div className="max-w-4xl space-y-12">
          {/* Eligibility */}
          {visa.eligibility && (
            <section>
              <h2 className="font-display text-2xl text-warm-900 mb-4">Eligibility</h2>
              <div className="card-flat p-6">
                <p className="text-warm-600 leading-relaxed">{visa.eligibility}</p>
              </div>
            </section>
          )}

          {/* Requirements */}
          {visa.requirements && visa.requirements.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-warm-900 mb-4">Requirements</h2>
              <div className="card-flat p-6">
                <ul className="space-y-3">
                  {visa.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-warm-600 text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Application Process */}
          {visa.applicationProcess && visa.applicationProcess.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-warm-900 mb-4">Application Process</h2>
              <div className="space-y-3">
                {visa.applicationProcess.map((step, index) => (
                  <div key={index} className="card-flat p-5 flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary-100 text-brand-primary flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-warm-600 text-sm leading-relaxed mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Important Notes */}
          {visa.importantNotes && visa.importantNotes.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-warm-900 mb-4">Important Notes</h2>
              <div className="card-flat p-6 border-l-4 border-l-brand-accent">
                <ul className="space-y-3">
                  {visa.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-warm-600 text-sm leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Back Link */}
          <div className="pt-6 border-t border-warm-100">
            <Link
              href="/visa/"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Visa Types
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getVisaSlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const visa = getVisaBySlug(params?.slug as string);
  if (!visa) return { notFound: true };

  return {
    props: { visa },
    revalidate: 604800,
  };
};
