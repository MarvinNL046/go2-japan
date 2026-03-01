import Head from 'next/head';
import { ReactNode } from 'react';
import { siteConfig } from '../site.config';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children?: ReactNode;
}

export default function SEOHead({ title, description, ogImage, path, jsonLd, children }: SEOHeadProps) {
  const canonicalUrl = path ? `${siteConfig.seo.siteUrl}${path}` : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {siteConfig.seo.twitterHandle && (
        <meta name="twitter:site" content={`@${siteConfig.seo.twitterHandle}`} />
      )}
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd),
          }}
        />
      )}
      {children}
    </Head>
  );
}
