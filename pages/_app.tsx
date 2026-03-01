import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import ExitIntentPopup from '../components/ExitIntentPopup';
import { ToastProvider } from '../components/Toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Header />
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
      <CookieConsent />
      <ExitIntentPopup />
    </ToastProvider>
  );
}
