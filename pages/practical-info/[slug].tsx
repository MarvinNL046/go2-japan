import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getPracticalInfoBySlug, getPracticalInfoSlugs } = require('../../lib/practical-info');

interface TranslatedString {
  en: string;
  [key: string]: string;
}

interface Section {
  title: TranslatedString;
  content: TranslatedString;
}

interface FAQ {
  question: TranslatedString;
  answer: TranslatedString;
}

interface PracticalInfoData {
  slug: string;
  name: TranslatedString;
  icon: string;
  lastUpdated: string;
  seo: {
    title: TranslatedString;
    description: TranslatedString;
  };
  description: TranslatedString;
  sections: Section[];
  tips: TranslatedString[];
  faqs: FAQ[];
}

interface Props {
  guide: PracticalInfoData;
}

export default function PracticalInfoPage({ guide }: Props) {
  const { t } = useTranslation();

  if (!guide) return null;

  const title = guide.seo?.title?.en || guide.name?.en || '';
  const description = guide.seo?.description?.en || guide.description?.en || '';

  const faqJsonLd = guide.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question.en,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer.en,
          },
        })),
      }
    : undefined;

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={`/practical-info/${guide.slug}`}
        jsonLd={faqJsonLd}
      />

      <main className="min-h-screen bg-warm-50">
        {/* Breadcrumbs */}
        <div className="container-custom pt-4 pb-2">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Practical Info', href: '/practical-info' },
              { name: guide.name.en, href: `/practical-info/${guide.slug}` },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="container-custom py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-5xl mb-4 block">{guide.icon}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-warm-900 mb-4">
              {guide.name.en}
            </h1>
            <p className="text-lg text-warm-600 leading-relaxed">
              {guide.description.en}
            </p>
            {guide.lastUpdated && (
              <p className="text-sm text-warm-500 mt-4">
                Last updated: {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        </section>

        {/* Content Sections */}
        {guide.sections?.length > 0 && (
          <section className="container-custom pb-12">
            <div className="max-w-3xl mx-auto space-y-10">
              {guide.sections.map((section, index) => (
                <div key={index} className="card-flat p-6 md:p-8">
                  <h2 className="font-display text-2xl text-warm-900 mb-4">
                    {section.title.en}
                  </h2>
                  <div className="text-warm-600 leading-relaxed whitespace-pre-line">
                    {section.content.en}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips Section */}
        {guide.tips?.length > 0 && (
          <section className="container-custom pb-12">
            <div className="max-w-3xl mx-auto">
              <div className="card-flat p-6 md:p-8">
                <h2 className="font-display text-2xl text-warm-900 mb-6">
                  Practical Tips
                </h2>
                <ul className="space-y-3">
                  {guide.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-warm-600">{tip.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {guide.faqs?.length > 0 && (
          <section className="container-custom pb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl text-warm-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="card-flat group"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-display text-warm-900 hover:text-primary-600 transition-colors">
                      <span>{faq.question.en}</span>
                      <svg
                        className="w-5 h-5 text-warm-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-warm-600 leading-relaxed">
                      {faq.answer.en}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="container-custom pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/practical-info"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Practical Info
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPracticalInfoSlugs();

  return {
    paths: slugs.map((slug: string) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const guide = getPracticalInfoBySlug(slug);

  if (!guide) {
    return { notFound: true };
  }

  return {
    props: { guide },
    revalidate: 604800,
  };
};
