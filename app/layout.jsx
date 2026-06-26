import './globals.css';
import Script from 'next/script';
import CookieBanner from './components/CookieBanner';

export const metadata = {
  title: 'John & Joe Rénovation Inc — Entrepreneur Général Montréal',
  description:
    'Entrepreneur général à Montréal. Rénovation résidentielle et commerciale. Cuisine, salle de bain, sous-sol, peinture et plus. RBQ: 5867-5588-01. Soumission gratuite.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    siteName: 'John & Joe Rénovation Inc',
    title: 'John & Joe Rénovation Inc — Entrepreneur Général Montréal',
    description:
      'Entrepreneur général à Montréal. Rénovation résidentielle et commerciale. Cuisine, salle de bain, sous-sol, peinture et plus. RBQ: 5867-5588-01. Soumission gratuite.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'John & Joe Rénovation Inc',
  url: 'https://www.jnjreno.ca',
  description:
    'Entrepreneur général à Montréal. Rénovation résidentielle et commerciale. Cuisine, salle de bain, sous-sol, peinture et plus. RBQ: 5867-5588-01. Soumission gratuite.',
  areaServed: ['Montréal', 'Laval', 'Rive-Sud', 'West Island'],
  identifier: '5867-5588-01',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        {/* GA4 consent default — must be set before gtag.js loads */}
        <Script id="ga-consent-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', { analytics_storage: 'denied' });
        `}</Script>

        <Script
          id="json-ld-general-contractor"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>

        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
