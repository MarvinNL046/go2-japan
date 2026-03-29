import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { siteConfig } from '../../../site.config';

const { getCityBySlug, getCitySlugs } = require('../../../lib/cities');

interface SignatureDish {
  name: string;
  japaneseName: string;
  description: string;
  priceRange: string;
  whereToTry: string;
  tip: string;
}

interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  priceRange: string;
  description: string;
  highlight: string;
}

interface StreetFoodArea {
  name: string;
  description: string;
  bestFor: string;
}

interface Source {
  name: string;
  url: string;
}

interface FoodData {
  slug: string;
  cityName: string;
  introduction: string;
  signatureDishes: SignatureDish[];
  bestRestaurants: Restaurant[];
  streetFoodAreas: StreetFoodArea[];
  foodTips: string[];
  sources: Source[];
}

interface CityFoodPageProps {
  city: any;
  foodData: FoodData;
}

export default function CityFoodPage({ city, foodData }: CityFoodPageProps) {
  const cityName = city?.name?.en || city?.name || foodData.cityName;

  return (
    <>
      <SEOHead
        title={`${cityName} Food Guide — What to Eat & Best Restaurants | ${siteConfig.name}`}
        description={`Discover the best food in ${cityName}: signature dishes, top restaurants, street food areas, and local eating tips. Your complete ${cityName} food guide.`}
        path={`/city/${foodData.slug}/food/`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { name: 'Home', href: '/' },
          { name: 'Cities', href: '/city/' },
          { name: cityName, href: `/city/${foodData.slug}/` },
          { name: 'Food Guide', href: `/city/${foodData.slug}/food/` },
        ]} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-3">
            {cityName} Food Guide
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Signature dishes, top restaurants &amp; street food
          </p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            {foodData.introduction}
          </p>
        </div>

        {/* Signature Dishes */}
        {foodData.signatureDishes && foodData.signatureDishes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Signature Dishes
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {foodData.signatureDishes.map((dish, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-brand-secondary">{dish.name}</h3>
                      <span className="text-gray-400 text-sm">{dish.japaneseName}</span>
                    </div>
                    <span className="text-xs font-medium bg-brand-primary-50 text-brand-primary px-2 py-1 rounded-full whitespace-nowrap ml-3">
                      {dish.priceRange}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{dish.description}</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium text-gray-600">Where to try:</span> <span className="text-gray-700">{dish.whereToTry}</span></p>
                    <p className="bg-amber-50 border border-amber-100 rounded-lg p-2 text-amber-800 text-xs mt-2">
                      <span className="font-semibold">Tip: </span>{dish.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Best Restaurants */}
        {foodData.bestRestaurants && foodData.bestRestaurants.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Best Restaurants
            </h2>
            <div className="space-y-4">
              {foodData.bestRestaurants.map((r, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-brand-secondary">{r.name}</h3>
                      <p className="text-gray-500 text-sm">{r.cuisine}</p>
                    </div>
                    <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full">
                      {r.priceRange}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{r.address}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{r.description}</p>
                  <p className="bg-brand-primary-50 text-brand-primary text-xs px-3 py-2 rounded-lg font-medium">
                    {r.highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Street Food Areas */}
        {foodData.streetFoodAreas && foodData.streetFoodAreas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Street Food Areas
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {foodData.streetFoodAreas.map((area, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-base font-bold text-brand-secondary mb-2">{area.name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{area.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-600">Best for: </span>
                    {area.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Food Tips */}
        {foodData.foodTips && foodData.foodTips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand-secondary mb-6">
              Local Eating Tips
            </h2>
            <ul className="space-y-3">
              {foodData.foodTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <span className="text-brand-primary font-bold text-sm mt-0.5 shrink-0">{i + 1}.</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {foodData.sources && foodData.sources.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-600 mb-3">Sources</h2>
            <ul className="flex flex-wrap gap-3">
              {foodData.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary hover:underline"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getCitySlugs();
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  // Load food data
  const foodDataPath = path.join(process.cwd(), 'data', 'cities', `${slug}-food.json`);
  if (!fs.existsSync(foodDataPath)) {
    return { notFound: true };
  }

  const foodData: FoodData = JSON.parse(fs.readFileSync(foodDataPath, 'utf8'));

  return {
    props: { city, foodData },
    revalidate: 604800,
  };
};
