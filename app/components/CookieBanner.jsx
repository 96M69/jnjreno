'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'jnj_cookie_consent';

const copy = {
  fr: {
    text: 'Nous utilisons des témoins (cookies) analytiques pour améliorer votre expérience. Vous pouvez accepter ou refuser.',
    policy: 'Politique de confidentialité',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  en: {
    text: 'We use analytics cookies to improve your experience. You can accept or decline.',
    policy: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline',
  },
};

function grantAnalytics() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted') {
      grantAnalytics();
      return;
    }
    if (stored === 'declined') return;

    const browserLang = navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    setLang(browserLang);
    setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    grantAnalytics();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  const T = copy[lang];

  return (
    <div className="cookie-banner" role="region" aria-label={lang === 'fr' ? 'Avis sur les témoins' : 'Cookie notice'}>
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          {T.text}{' '}
          <Link href="/privacy" className="cookie-banner__link">{T.policy}</Link>.
        </p>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={handleAccept}>
            {T.accept}
          </button>
          <button type="button" className="cookie-banner__decline" onClick={handleDecline}>
            {T.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
