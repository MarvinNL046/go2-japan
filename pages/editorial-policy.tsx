import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';

export default function EditorialPolicy() {
  return (
    <>
      <SEOHead
        title={`Editorial Policy - ${siteConfig.name} | How We Create Content`}
        description={`Learn about ${siteConfig.name}'s editorial policy. How we research, fact-check, and maintain our Japan travel guides with first-hand experience and verified sources.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Editorial Policy', href: '/editorial-policy' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          Editorial Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-xl text-brand-secondary font-medium">
            At {siteConfig.name}, we are committed to providing accurate, trustworthy, and genuinely helpful Japan travel information. This page explains how we create, review, and maintain our content.
          </p>

          <h2>Our Editorial Standards</h2>
          <p>
            Every piece of content published on {siteConfig.domain} must meet the following standards before publication:
          </p>
          <ul>
            <li><strong>Accuracy:</strong> All facts, prices, schedules, and practical details must be verified against official or primary sources.</li>
            <li><strong>Firsthand experience:</strong> Our guides are grounded in real travel experience. We prioritize information we have personally verified in Japan.</li>
            <li><strong>Usefulness:</strong> Content must provide clear, actionable value to travelers planning or currently on a trip to Japan.</li>
            <li><strong>Honesty:</strong> We present information truthfully, including drawbacks and limitations. We do not exaggerate or mislead.</li>
          </ul>

          <h2>Research Methodology</h2>
          <p>
            Our content is built on three pillars of research:
          </p>

          <h3>1. Firsthand Visits and Experience</h3>
          <p>
            Our team regularly travels to Japan to visit destinations, test transportation routes, sample food and accommodations, and verify practical information. This firsthand experience forms the foundation of our guides. When we recommend a hotel, restaurant, or activity, it is because we have experienced it ourselves or have reliable on-the-ground verification.
          </p>

          <h3>2. Local and Official Sources</h3>
          <p>
            We supplement our firsthand experience with information from authoritative sources, including:
          </p>
          <ul>
            <li>Japan National Tourism Organization (JNTO)</li>
            <li>Japanese Ministry of Foreign Affairs (visa and entry requirements)</li>
            <li>Local prefectural and municipal tourism boards</li>
            <li>Official transportation operators (JR Group, private railways, airlines)</li>
            <li>Our network of local contacts and Japan-based contributors</li>
          </ul>

          <h3>3. Community and Traveler Feedback</h3>
          <p>
            We actively listen to our readers. Corrections, updates, and suggestions from travelers who have recently visited Japan help us keep our content current and accurate.
          </p>

          <h2>Fact-Checking Process</h2>
          <p>
            Before any guide or article is published, it goes through a multi-step review:
          </p>
          <ol>
            <li><strong>Author research:</strong> The writer conducts thorough research using firsthand experience and official sources.</li>
            <li><strong>Cross-referencing:</strong> Key facts (prices, opening hours, visa requirements) are verified against at least two independent sources.</li>
            <li><strong>Editorial review:</strong> A second team member reviews the content for accuracy, clarity, and completeness.</li>
            <li><strong>Publication with date stamp:</strong> All published content includes the date of publication and last update.</li>
          </ol>

          <h2>Update Schedule</h2>
          <p>
            Japan travel information changes frequently -- prices adjust, new attractions open, and visa policies evolve. To keep our content reliable:
          </p>
          <ul>
            <li>All guides undergo a <strong>monthly review cycle</strong> where we check for outdated information.</li>
            <li>Breaking changes (new visa policies, major price changes, closures) are updated <strong>within 48 hours</strong> of confirmation.</li>
            <li>Seasonal content (cherry blossom forecasts, autumn foliage, ski season) is refreshed ahead of each relevant season.</li>
            <li>Every page displays its last-updated date so readers know how current the information is.</li>
          </ul>

          <h2>Source Citation Policy</h2>
          <p>
            When we reference specific data, statistics, or official policies, we cite our sources. This includes linking to official government pages for visa requirements, referencing JNTO data for tourism statistics, and noting when information comes from our own firsthand experience versus secondary research.
          </p>
          <p>
            If we cannot verify a piece of information through reliable sources, we either omit it or clearly note that it is unverified.
          </p>

          <h2>Independence from Advertisers</h2>
          <p>
            Our editorial content is completely independent from our affiliate partnerships and any advertising relationships. Here is what that means in practice:
          </p>
          <ul>
            <li>Affiliate partners <strong>never</strong> influence our recommendations, rankings, or reviews.</li>
            <li>We recommend products and services based solely on their value to travelers.</li>
            <li>We include non-affiliate alternatives alongside affiliate-linked options when relevant.</li>
            <li>Our editorial team operates independently from any business development or partnership discussions.</li>
            <li>Sponsored content, if any, is always clearly labeled as such.</li>
          </ul>

          <h2>Corrections Policy</h2>
          <p>
            We take errors seriously. If you find inaccurate information on our site:
          </p>
          <ul>
            <li>Please <a href="/contact" className="text-brand-primary hover:text-brand-primary-700">contact us</a> with the specific page and the correction needed.</li>
            <li>We will investigate and, if confirmed, update the content promptly.</li>
            <li>Significant corrections are noted on the page for transparency.</li>
          </ul>

          <h2>Questions About Our Editorial Policy</h2>
          <p>
            If you have questions about how we create or maintain our content, please reach out at{' '}
            <a href={`mailto:hello@${siteConfig.domain}`} className="text-brand-primary hover:text-brand-primary-700">
              hello@{siteConfig.domain}
            </a>. We are always happy to discuss our editorial process.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
