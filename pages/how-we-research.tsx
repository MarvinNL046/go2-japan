import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';

export default function HowWeResearch() {
  return (
    <>
      <SEOHead
        title={`How We Research - ${siteConfig.name} | Our Research Methodology`}
        description={`Discover how ${siteConfig.name} researches and verifies Japan travel information. From JNTO data to on-the-ground verification, learn about our detailed methodology.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'How We Research', href: '/how-we-research' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          How We Research
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-xl text-brand-secondary font-medium">
            We believe travelers deserve information they can trust. Here is an in-depth look at exactly how we research, verify, and maintain every guide on {siteConfig.domain}.
          </p>

          <h2>Our Primary Sources</h2>
          <p>
            We rely on a combination of official sources and firsthand experience to ensure the information on our site is accurate and up to date.
          </p>

          <h3>Official Government and Tourism Sources</h3>
          <ul>
            <li>
              <strong>Japan National Tourism Organization (JNTO):</strong> Japan's official tourism body is our primary reference for tourism statistics, regional highlights, and official travel advisories. We cross-reference JNTO data with our own experience.
            </li>
            <li>
              <strong>Ministry of Foreign Affairs of Japan (MOFA):</strong> All visa information, entry requirements, and immigration policies are sourced directly from MOFA official publications and verified against actual traveler experiences.
            </li>
            <li>
              <strong>Prefectural and Municipal Tourism Boards:</strong> Each of Japan's 47 prefectures maintains a tourism office. We consult these for regional-specific information on attractions, events, and seasonal highlights.
            </li>
            <li>
              <strong>Japan Meteorological Agency (JMA):</strong> Weather data, cherry blossom forecasts, and typhoon information come from official JMA reports.
            </li>
          </ul>

          <h3>Transportation Sources</h3>
          <ul>
            <li>
              <strong>JR Group companies:</strong> Schedules, fares, and Japan Rail Pass information are verified against official JR East, JR West, JR Central, and other JR company websites.
            </li>
            <li>
              <strong>Hyperdia and official timetables:</strong> Train schedules and route planning data are verified using official timetable sources.
            </li>
            <li>
              <strong>Airlines and ferry operators:</strong> Domestic flight and ferry information comes directly from carrier websites.
            </li>
          </ul>

          <h3>Trusted Reference Sites</h3>
          <ul>
            <li>
              <strong>japan-guide.com:</strong> One of the longest-running and most respected Japan travel resources, used as a reference for historical context and comprehensive destination coverage.
            </li>
            <li>
              <strong>Academic and cultural institutions:</strong> For cultural and historical content, we reference museums, UNESCO World Heritage documentation, and academic publications.
            </li>
          </ul>

          <h2>On-the-Ground Verification</h2>
          <p>
            Research from official sources is essential, but there is no substitute for being there in person. Our on-the-ground verification process includes:
          </p>

          <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-secondary-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brand-secondary mb-3">Destination Visits</h3>
              <p className="text-gray-600 text-sm">
                We physically visit the cities, towns, temples, and attractions we write about. Walking the streets, taking the trains, and eating the food gives us insights no desk research can provide.
              </p>
            </div>
            <div className="bg-brand-secondary-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brand-secondary mb-3">Route Testing</h3>
              <p className="text-gray-600 text-sm">
                Transportation guides are based on routes we have actually traveled. We verify transfer points, walking distances between stations, and real-world travel times.
              </p>
            </div>
            <div className="bg-brand-secondary-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brand-secondary mb-3">Accommodation Reviews</h3>
              <p className="text-gray-600 text-sm">
                When we recommend accommodation types or areas to stay, it is based on where we have actually stayed and our assessment of value, location, and quality.
              </p>
            </div>
            <div className="bg-brand-secondary-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brand-secondary mb-3">Local Conversations</h3>
              <p className="text-gray-600 text-sm">
                We speak with hotel staff, tour operators, restaurant owners, and fellow travelers to gather perspectives beyond our own experience.
              </p>
            </div>
          </div>

          <h2>Price Verification Methodology</h2>
          <p>
            Prices in Japan can change, and we take accuracy seriously. Here is how we handle pricing information:
          </p>
          <ol>
            <li>
              <strong>Official source first:</strong> Admission fees, transport fares, and other fixed costs are sourced from official operator websites.
            </li>
            <li>
              <strong>Personal verification:</strong> When possible, we verify prices during our own visits to confirm they match published rates.
            </li>
            <li>
              <strong>Currency and date stamping:</strong> All prices are listed in Japanese Yen (JPY) with approximate USD/EUR equivalents. We note when prices were last verified.
            </li>
            <li>
              <strong>Range estimates for variable costs:</strong> For costs that vary (meals, accommodation), we provide realistic ranges based on our experience rather than misleading averages.
            </li>
            <li>
              <strong>Regular rechecks:</strong> Prices are rechecked against official sources during our monthly content review cycle.
            </li>
          </ol>

          <h2>Regular Content Audits</h2>
          <p>
            Keeping content current is just as important as getting it right the first time. Our audit process includes:
          </p>
          <ul>
            <li>
              <strong>Monthly reviews:</strong> Every published guide is reviewed at least once per month. We check for outdated information, broken links, and changes in pricing or availability.
            </li>
            <li>
              <strong>Seasonal updates:</strong> Guides related to seasonal activities (cherry blossom viewing, autumn foliage, skiing, summer festivals) are comprehensively updated before each season begins.
            </li>
            <li>
              <strong>Policy change monitoring:</strong> We actively monitor changes to Japan's visa policies, entry requirements, and transportation systems. Updates are published within 48 hours of official confirmation.
            </li>
            <li>
              <strong>Reader-reported issues:</strong> We track and respond to reader feedback about outdated or incorrect information, investigating and updating as needed.
            </li>
          </ul>

          <h2>Correction Policy</h2>
          <p>
            Despite our best efforts, errors can occur. When they do, we handle them transparently:
          </p>
          <ul>
            <li>
              <strong>Minor corrections</strong> (typos, small factual updates) are made promptly and the last-updated date is refreshed.
            </li>
            <li>
              <strong>Significant corrections</strong> (wrong prices, incorrect visa information, misleading advice) are noted on the page with a brief explanation of what changed.
            </li>
            <li>
              We never silently delete content to cover mistakes. If we were wrong, we acknowledge it.
            </li>
          </ul>

          <h2>Help Us Stay Accurate</h2>
          <p>
            Recently visited Japan and noticed something different from what we have published? We genuinely appreciate corrections and updates from our readers. You are our best source for real-time ground truth.
          </p>
          <p>
            Please <a href="/contact" className="text-brand-primary hover:text-brand-primary-700">contact us</a> with:
          </p>
          <ul>
            <li>The specific page or guide with the issue</li>
            <li>What information is incorrect or outdated</li>
            <li>The correct information (with a source if possible)</li>
            <li>When you visited or verified this information</li>
          </ul>
          <p>
            Every correction makes our guides better for the next traveler. Thank you for helping us maintain the quality our readers depend on.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
