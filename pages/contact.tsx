import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../site.config';
import { GetStaticProps } from 'next';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${siteConfig.domain}: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@${siteConfig.domain}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title={`Contact Us - ${siteConfig.name} | Get in Touch`}
        description={`Contact the ${siteConfig.name} team. Have a question about Japan travel? We respond within 48 hours. Email us at hello@${siteConfig.domain}.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Contact', href: '/contact' },
          ]}
        />

        <h1 className="text-3xl font-bold text-brand-secondary mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Have a question about traveling to {siteConfig.destination}? Found an error in one of our guides? Want to suggest a topic? We would love to hear from you.
            </p>

            <h2>Email Us</h2>
            <p>
              The best way to reach us is by email at{' '}
              <a
                href={`mailto:hello@${siteConfig.domain}`}
                className="text-brand-primary hover:text-brand-primary-700 font-semibold"
              >
                hello@{siteConfig.domain}
              </a>
            </p>

            <h2>Response Time</h2>
            <p>
              We aim to respond to all inquiries <strong>within 48 hours</strong>. During peak travel seasons, it may take slightly longer, but we read every message and will get back to you as soon as possible.
            </p>

            <h2>What We Can Help With</h2>
            <ul>
              <li>Questions about our Japan travel guides</li>
              <li>Content corrections or updates</li>
              <li>Suggestions for new guides or topics</li>
              <li>Partnership and collaboration inquiries</li>
              <li>General Japan travel questions</li>
            </ul>

            <h2>Follow Us</h2>
            <div className="not-prose flex space-x-4 mt-4">
              <a
                href={`https://twitter.com/${siteConfig.seo.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary-800 transition-colors text-sm font-medium"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>
              {/* Additional social media links can be added here */}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-brand-secondary mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-brand-primary text-4xl mb-4">&#10003;</div>
                  <h3 className="text-lg font-semibold text-brand-secondary mb-2">
                    Thank you!
                  </h3>
                  <p className="text-gray-600">
                    Your email client should have opened with your message. If it did not, please email us directly at{' '}
                    <a
                      href={`mailto:hello@${siteConfig.domain}`}
                      className="text-brand-primary hover:text-brand-primary-700"
                    >
                      hello@{siteConfig.domain}
                    </a>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 text-brand-primary hover:text-brand-primary-700 text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors resize-vertical"
                      placeholder="Your question about Japan travel..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-600 transition-colors"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    This will open your default email client to send the message.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
