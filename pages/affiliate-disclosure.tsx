import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';

export default function AffiliateDisclosure() {
  return (
    <>
      <SEOHead
        title={`Affiliate Disclosure - ${siteConfig.name} | Transparency & Trust`}
        description={`${siteConfig.name}'s affiliate disclosure. Learn how we fund our Japan travel guides, which partners we work with, and how affiliate links work. Full FTC compliance.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          Affiliate Disclosure
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <div className="not-prose bg-brand-primary-50 border-l-4 border-brand-primary rounded-r-lg p-6 mb-8">
            <p className="text-brand-secondary font-semibold text-lg mb-2">
              Transparency is a core value at {siteConfig.name}.
            </p>
            <p className="text-gray-700">
              Some of the links on {siteConfig.domain} are affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at no additional cost to you. This helps us keep our Japan travel guides free and up to date.
            </p>
          </div>

          <h2>How Affiliate Links Work</h2>
          <p>
            When you click an affiliate link on our site and make a purchase or booking on the partner's website, that partner pays us a small referral fee. This is a standard practice across travel websites and is how we fund the research, writing, and maintenance of our free travel guides.
          </p>
          <p>
            Here is what is important to know:
          </p>
          <ul>
            <li><strong>You pay the same price</strong> whether you use our affiliate link or go directly to the partner's site. Affiliate links never increase the cost to you.</li>
            <li><strong>We only link to services we trust.</strong> We do not partner with companies we would not use or recommend ourselves.</li>
            <li><strong>Affiliate relationships never influence our content.</strong> Our recommendations are based on research, firsthand experience, and what we believe is best for our readers.</li>
          </ul>

          <h2>Our Affiliate Partners</h2>
          <p>
            We currently work with the following affiliate partners. These are services we have used ourselves and believe provide genuine value to Japan travelers:
          </p>

          <div className="not-prose my-8 space-y-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">Booking.com</h3>
              <p className="text-gray-600 text-sm">
                One of the world's largest accommodation booking platforms. We link to Booking.com for hotels, ryokan, guesthouses, and other accommodation in Japan. They offer free cancellation on many properties and a wide selection across all budgets.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">Trip.com</h3>
              <p className="text-gray-600 text-sm">
                A comprehensive travel booking platform offering flights, hotels, and travel packages. We use Trip.com links primarily for flight bookings and accommodation deals specific to the Asia-Pacific region.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">Klook</h3>
              <p className="text-gray-600 text-sm">
                A leading platform for tours, activities, and attractions in Asia. We link to Klook for day tours, attraction tickets, transport passes, and unique experiences across Japan.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">GetYourGuide</h3>
              <p className="text-gray-600 text-sm">
                A global tours and activities marketplace. We recommend GetYourGuide for guided tours, skip-the-line tickets, and curated experiences in major Japanese cities and cultural destinations.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">12Go Asia</h3>
              <p className="text-gray-600 text-sm">
                A transportation booking platform specializing in Asia. We link to 12Go for train tickets, bus bookings, ferry reservations, and other ground transportation options throughout Japan.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-brand-secondary mb-2">Saily</h3>
              <p className="text-gray-600 text-sm">
                A travel eSIM provider offering data plans for international travelers. We recommend Saily for staying connected in Japan with affordable mobile data plans that work upon arrival.
              </p>
            </div>
          </div>

          <h2>What Affiliate Links Do Not Affect</h2>
          <p>
            We want to be completely clear about what our affiliate partnerships do not influence:
          </p>
          <ul>
            <li><strong>Our recommendations:</strong> We recommend what we believe is genuinely best for travelers. If a non-affiliate option is better, we recommend that instead.</li>
            <li><strong>Our rankings:</strong> The order in which we list options in our guides is based on quality, value, and relevance -- not on which partner pays us the most.</li>
            <li><strong>Our reviews:</strong> We include honest assessments with both positives and negatives. We do not hide drawbacks to protect affiliate revenue.</li>
            <li><strong>Our coverage:</strong> We cover topics and destinations based on what is useful to travelers, not on what generates affiliate income.</li>
          </ul>

          <h2>Non-Affiliate Alternatives</h2>
          <p>
            Wherever possible, we also mention non-affiliate alternatives so you can make an informed choice. For example, when discussing accommodation, we may mention booking directly with a hotel alongside our Booking.com links. We believe giving you options is more important than maximizing our revenue.
          </p>

          <h2>FTC Compliance Statement</h2>
          <p>
            In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that {siteConfig.domain} participates in affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner sites.
          </p>
          <p>
            This disclosure is provided in compliance with the FTC's 16 CFR Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising." The affiliate programs and partnerships we participate in do not influence our editorial content. Our opinions, reviews, and recommendations are our own.
          </p>

          <h2>How We Use Affiliate Revenue</h2>
          <p>
            Revenue from affiliate partnerships goes directly toward:
          </p>
          <ul>
            <li>Research trips to Japan to verify and update our content</li>
            <li>Website hosting, maintenance, and development</li>
            <li>Content creation, editing, and fact-checking</li>
            <li>Keeping all of our guides free and accessible to every traveler</li>
          </ul>

          <h2>Questions?</h2>
          <p>
            If you have any questions about our affiliate partnerships or how we fund {siteConfig.name}, please do not hesitate to{' '}
            <a href="/contact" className="text-brand-primary hover:text-brand-primary-700">contact us</a>. We are happy to discuss our approach to monetization and editorial independence.
          </p>
          <p>
            You can also read our{' '}
            <a href="/editorial-policy" className="text-brand-primary hover:text-brand-primary-700">editorial policy</a> and{' '}
            <a href="/how-we-research" className="text-brand-primary hover:text-brand-primary-700">research methodology</a> for more details on how we create our content.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
