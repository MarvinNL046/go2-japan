import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { name: 'Cities', href: '/city' },
      { name: 'Regions', href: '/region' },
    ],
  },
  {
    title: 'Travel Planning',
    links: [
      { name: 'Visa Information', href: '/visa' },
      { name: 'eSIM', href: '/esim' },
      { name: 'Transport', href: '/transport' },
      { name: 'Travel Insurance', href: '/travel-insurance' },
      { name: 'Weather', href: '/weather' },
      { name: 'Practical Info', href: '/practical-info' },
    ],
  },
  {
    title: 'Food & Drink',
    links: [
      { name: 'Food Guide', href: '/food' },
      { name: 'Drinks Guide', href: '/drinks' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { name: 'Editorial Policy', href: '/editorial-policy' },
      { name: 'How We Research', href: '/how-we-research' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Sitemap - ${siteConfig.name}`,
  description: `Complete sitemap of ${siteConfig.domain}. Find all pages and sections of our Japan travel guide.`,
  url: `https://${siteConfig.domain}/sitemap`,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
};

export default function Sitemap() {
  return (
    <>
      <SEOHead
        title={`Sitemap - ${siteConfig.name}`}
        description={`Complete sitemap of ${siteConfig.domain}. Find all pages and sections of our Japan travel guide.`}
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Sitemap', href: '/sitemap' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          Sitemap
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-brand-secondary mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-primary hover:text-brand-primary-700 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
