import Image from 'next/image';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';

export default function About() {
  return (
    <>
      <SEOHead
        title={`About Us - ${siteConfig.name} | Japan Travel Experts`}
        description={`Learn about the ${siteConfig.name} team. With years of Japan travel experience and 35+ prefectures visited, we help travelers plan the perfect Japan trip.`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.seo.siteUrl,
              logo: `${siteConfig.seo.siteUrl}/images/logo.png`,
              description: `${siteConfig.name} is a comprehensive Japan travel guide helping travelers plan the perfect trip to Japan.`,
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                email: `hello@${siteConfig.domain}`,
                contactType: 'customer service',
                availableLanguage: 'English',
              },
              sameAs: [
                `https://twitter.com/${siteConfig.seo.twitterHandle}`,
              ],
            }),
          }}
        />
      </SEOHead>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          About {siteConfig.name}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-xl text-brand-secondary font-medium">
            We are a team of passionate Japan travel enthusiasts dedicated to helping you plan the perfect trip to {siteConfig.destination}.
          </p>

          <h2>Our Mission</h2>
          <p>
            {siteConfig.name} exists to make Japan travel accessible, enjoyable, and stress-free for everyone. Whether you are a first-time visitor navigating the JR rail system or a returning traveler seeking hidden gems off the beaten path, our goal is to provide you with the most accurate, up-to-date, and practical information available.
          </p>
          <p>
            We believe that Japan is one of the most rewarding travel destinations in the world, and that every traveler deserves access to reliable, honest guidance to make the most of their journey.
          </p>

          <h2>Our Experience</h2>
          <p>
            Our team brings years of hands-on Japan travel experience to everything we publish. We have collectively:
          </p>
          <ul>
            <li>Visited <strong>35+ of Japan's 47 prefectures</strong>, from Hokkaido in the north to Okinawa in the south</li>
            <li>Tested countless shinkansen routes, local trains, and bus connections</li>
            <li>Stayed in everything from traditional ryokan and capsule hotels to modern city apartments</li>
            <li>Navigated visa applications, Japan Rail Passes, IC cards, and mobile connectivity firsthand</li>
            <li>Built relationships with local contacts and tourism professionals across Japan</li>
          </ul>

          <h2>How We Work</h2>
          <p>
            We visit Japan regularly to verify and update our content. Every guide, review, and recommendation is based on real travel experience combined with thorough research from official sources including the Japan National Tourism Organization (JNTO) and local tourism boards.
          </p>
          <p>
            Our content is <strong>updated monthly</strong> to reflect the latest changes in pricing, regulations, and travel conditions. When something changes -- whether it is a new visa policy, a fare adjustment, or a seasonal closure -- we update our guides promptly.
          </p>

          <h2>What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
            <div className="bg-brand-primary-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">35+</div>
              <div className="text-sm text-gray-600">Prefectures Visited</div>
            </div>
            <div className="bg-brand-primary-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">Monthly</div>
              <div className="text-sm text-gray-600">Content Updates</div>
            </div>
            <div className="bg-brand-primary-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">Local</div>
              <div className="text-sm text-gray-600">On-the-Ground Contacts</div>
            </div>
          </div>

          <h2>Our Values</h2>
          <ul>
            <li><strong>Accuracy first:</strong> We never publish information we have not verified. When we are unsure, we say so.</li>
            <li><strong>Traveler-focused:</strong> Every piece of content is written with the traveler's needs in mind, not search engines or advertisers.</li>
            <li><strong>Transparency:</strong> We are open about our affiliate partnerships and how we fund this site. Our recommendations are never influenced by commercial relationships.</li>
            <li><strong>Continuous improvement:</strong> Japan is always evolving, and so is our content. We treat every guide as a living document.</li>
          </ul>

          <h2>Meet the Founder</h2>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 not-prose my-8">
            <div className="flex-shrink-0">
              <Image
                src="/images/team/marvin.webp"
                alt="Marvin — Founder of Go2Japan"
                width={180}
                height={180}
                className="rounded-2xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-secondary mb-2">Marvin</h3>
              <p className="text-sm text-brand-primary font-medium mb-3">Founder &amp; Developer</p>
              <p className="text-gray-700 mb-3">
                Marvin is a Dutch travel technology specialist and the creator of the Go2 Travel Network — a growing
                family of independent destination guides. With a passion for exploring Japan and a background in
                web development, he builds data-driven, practical travel guides that help travelers plan better trips.
              </p>
              <p className="text-gray-700">
                The Go2 network now spans multiple destinations across Asia, Europe, and the Americas, with each site
                offering in-depth city guides, local food recommendations, transport routes, and honest travel advice.
              </p>
            </div>
          </div>

          <h2>Get in Touch</h2>
          <p>
            Have a question, suggestion, or correction? We would love to hear from you. Reach out to us at{' '}
            <a href={`mailto:hello@${siteConfig.domain}`} className="text-brand-primary hover:text-brand-primary-700">
              hello@{siteConfig.domain}
            </a>{' '}
            or visit our <a href="/contact" className="text-brand-primary hover:text-brand-primary-700">contact page</a>.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
