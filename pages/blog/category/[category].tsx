import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { siteConfig } from '../../../site.config';
import { getAllCategories, getPostsByCategory } from '../../../lib/blog';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
}

interface CategoryPageProps {
  category: string;
  posts: BlogPost[];
}

export default function BlogCategoryPage({ category, posts }: CategoryPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: category, href: `/blog/category/${category}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Articles | ${siteConfig.name}`}
        description={`Explore our ${category} articles about Japan. In-depth travel guides, expert tips, local insights and stories to help plan your perfect Japan trip.`}
        path={`/blog/category/${category}/`}
      />

      <div className="bg-warm-50 min-h-screen">
        <section className="bg-warm-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <span className="font-display text-brand-accent text-lg">Category</span>
            <h1 className="text-4xl font-bold font-display capitalize">{category}</h1>
            <p className="text-lg opacity-90 mt-2">{posts.length} articles</p>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/blog/${post.slug}/`}>
                    <div className="relative h-48">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span>{post.date}</span>
                      <span>-</span>
                      <span>{post.readingTime} min</span>
                    </div>
                    <h2 className="text-xl font-bold font-display mb-3">
                      <Link href={`/blog/${post.slug}/`} className="hover:text-brand-secondary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-700 line-clamp-2">{post.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No posts found in this category.</p>
                <Link href="/blog/" className="text-brand-secondary hover:underline mt-4 inline-block">&larr; Back to blog</Link>
              </div>
            )}
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-warm-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-display mb-1">Plan Your Japan Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-secondary px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-secondary px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-secondary px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-secondary px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
                <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-secondary px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories('en');
  const paths = categories.map(category => ({
    params: { category }
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const category = params?.category as string;
  const lang = locale || 'en';
  const posts = getPostsByCategory(category, lang);

  return {
    props: { category, posts },
    revalidate: 86400
  };
};
