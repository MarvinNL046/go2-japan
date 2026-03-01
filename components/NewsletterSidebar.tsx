import { useNewsletterForm } from '../hooks/useNewsletterForm';
import { useTranslation } from '../hooks/useTranslation';

export default function NewsletterSidebar() {
  const { email, setEmail, status, handleSubmit } = useNewsletterForm();
  const { t } = useTranslation('common');

  return (
    <div className="bg-warm-900 text-white rounded-2xl p-6">
      {status === 'success' ? (
        <div className="text-center py-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold font-display mb-1">{t('newsletter.successTitle')}</h3>
          <p className="text-sm opacity-70">{t('newsletter.successBody')}</p>
        </div>
      ) : (
        <>
          <span className="section-label font-display text-brand-accent text-sm">{t('newsletter.sidebarLabel')}</span>
          <h3 className="text-xl font-bold font-display mb-2">{t('newsletter.sidebarTitle')}</h3>
          <p className="mb-4 text-sm opacity-90">{t('newsletter.sidebarBody')}</p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.emailPlaceholder')}
              required
              className="w-full px-4 py-2 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-primary text-white font-medium py-2 rounded-xl hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </button>
            {status === 'error' && (
              <p className="text-red-300 text-xs">{t('newsletter.errorMessage')}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
