import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  // Most pages never passed `path`, so most pages shipped without a canonical -
  // including the homepage, while apex and www both serve it. Fall back to the
  // route actually being rendered. During prerender asPath can still hold the
  // unsubstituted pattern ("/city/[slug]"); emitting that as a canonical would
  // be worse than none, so those fall through to no canonical as before.
  const routePath = router?.asPath?.split(/[?#]/)[0];
  const resolved = path ?? (routePath && !routePath.includes('[') ? routePath : undefined);
  const canonicalUrl = resolved ? `${siteConfig.seo.siteUrl}${resolved}` : undefined;

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
