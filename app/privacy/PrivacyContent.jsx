'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PHONE_DISPLAY = '(263) 382-4336';
const CONTACT_EMAIL = 'J.J.RENOS@hotmail.com';

const t = {
  fr: {
    back: '← Accueil',
    langBtn: 'EN',
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : juin 2025',
    footerRights: '© 2025 John & Joe Rénovation Inc. Tous droits réservés.',
    footerPrivacy: 'Politique de confidentialité',
    footerLegal: 'Légal',
    footerContact: 'Contact',
    footerLicense: 'Licence',
    footerAreas: 'Zones desservies',

    s1title: 'Qui sommes-nous',
    s1: `John & Joe Rénovation Inc. est un entrepreneur général titulaire d'une licence RBQ (5867-5588-01), basé à Montréal, Québec. Nous offrons des services de rénovation résidentielle et commerciale dans les régions de Montréal, Laval, Rive-Sud et West Island.

Nous prenons au sérieux la protection de vos renseignements personnels. La présente politique explique quels renseignements nous recueillons, pourquoi et comment nous les utilisons.`,

    s2title: 'Renseignements recueillis',
    s2: `Lorsque vous remplissez notre formulaire de contact, nous recueillons :`,
    s2list: [
      'Nom complet',
      'Numéro de téléphone',
      'Adresse courriel',
      'Ville',
      'Type de projet',
      'Message décrivant votre projet',
      'Photos de projet soumises volontairement via le formulaire (traitées et hébergées par UploadThing)',
    ],
    s2b: `Nous recueillons également de manière automatique, via Google Analytics GA4 :`,
    s2blist: [
      'Adresse IP (anonymisée)',
      'Type de navigateur et système d\'exploitation',
      'Pages visitées et durée de visite',
      'Source de trafic',
    ],
    s2c: `Enfin, nous utilisons des témoins (cookies) fonctionnels et analytiques pour le bon fonctionnement du site et l'analyse de l'audience.`,

    s3title: 'Finalités du traitement',
    s3list: [
      'Répondre à vos demandes de soumission',
      'Vous contacter au sujet de votre projet de rénovation',
      'Améliorer notre site web et nos services',
      'Respecter nos obligations légales',
    ],

    s4title: 'Tiers à qui vos renseignements sont divulgués',
    s4intro: 'Nous faisons appel aux prestataires de services tiers suivants :',
    s4list: [
      { name: 'Vercel', desc: 'Hébergement du site web et journaux de serveur.' },
      { name: 'Resend', desc: 'Livraison par courriel de vos soumissions de formulaire.' },
      { name: 'Google Analytics GA4', desc: 'Analyse d\'audience — données anonymisées.' },
      { name: 'UploadThing', desc: 'Traitement et stockage des photos soumises avec vos demandes.' },
    ],
    s4outro: 'Nous ne vendons, louons ni cédons vos renseignements personnels à des tiers à des fins de marketing.',

    s5title: 'Vos droits (Loi 25 et LPRPDE)',
    s5intro: 'Conformément à la Loi 25 (LMVDRP) du Québec et à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada, vous disposez des droits suivants :',
    s5list: [
      'Droit d\'accès à vos renseignements personnels',
      'Droit de rectification des renseignements inexacts',
      'Droit à l\'effacement et à la désindexation',
      'Droit à la portabilité de vos données',
      'Droit de retirer votre consentement en tout temps',
    ],
    s5outro: `Pour exercer l'un de ces droits, communiquez avec nous à l'adresse suivante :`,

    s6title: 'Conservation des renseignements',
    s6: `Les renseignements recueillis via le formulaire de contact (nom, coordonnées, message et photos) sont conservés uniquement le temps nécessaire pour évaluer et répondre à votre demande de projet. Les photos hébergées sur UploadThing peuvent être supprimées sur demande. Les données analytiques sont conservées selon les paramètres de conservation par défaut de Google Analytics GA4.`,

    s7title: 'LCAP (Loi canadienne anti-pourriel)',
    s7: `Nous n'envoyons des messages électroniques commerciaux qu'avec le consentement exprès ou implicite obtenu au moment de votre demande de soumission. Tout message commercial contient une option de désabonnement claire et facile à utiliser. Vous pouvez retirer votre consentement en tout temps en nous écrivant à l'adresse indiquée ci-dessous.`,

    s8title: 'Responsable de la protection des renseignements personnels',
    s8: `John & Joe Rénovation Inc. est responsable des renseignements personnels qu'elle détient. Pour toute question, plainte ou demande concernant la présente politique, communiquez avec nous :`,

    s9title: 'Droit applicable',
    s9: `La présente politique est régie par les lois du Québec et du Canada, notamment la Loi 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels — LMVDRP), la LPRPDE et la LCAP.`,

    s10title: 'Modifications',
    s10: `Nous nous réservons le droit de mettre à jour cette politique en tout temps. La date de la dernière mise à jour est indiquée en haut de cette page.`,
  },
  en: {
    back: '← Home',
    langBtn: 'FR',
    title: 'Privacy Policy',
    updated: 'Last updated: June 2025',
    footerRights: '© 2025 John & Joe Rénovation Inc. All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerLegal: 'Legal',
    footerContact: 'Contact',
    footerLicense: 'License',
    footerAreas: 'Service Areas',

    s1title: 'Who We Are',
    s1: `John & Joe Rénovation Inc. is a licensed general contractor (RBQ: 5867-5588-01) based in Montreal, Quebec. We provide residential and commercial renovation services in the greater Montreal area, including Laval, the South Shore, and the West Island.

We are committed to protecting your personal information. This policy explains what information we collect, why we collect it, and how we use it.`,

    s2title: 'Information We Collect',
    s2: 'When you complete our contact form, we collect:',
    s2list: [
      'Full name',
      'Phone number',
      'Email address',
      'City',
      'Project type',
      'Message describing your project',
      'Project photos voluntarily submitted via the inquiry form (processed and stored by UploadThing)',
    ],
    s2b: 'We also collect the following automatically via Google Analytics GA4:',
    s2blist: [
      'IP address (anonymized)',
      'Browser type and operating system',
      'Pages visited and session duration',
      'Traffic source',
    ],
    s2c: 'We also use functional and analytics cookies for site operation and audience measurement.',

    s3title: 'How We Use Your Information',
    s3list: [
      'To respond to your quote requests',
      'To contact you about your renovation project',
      'To improve our website and services',
      'To comply with our legal obligations',
    ],

    s4title: 'Third Parties We Disclose To',
    s4intro: 'We use the following third-party service providers:',
    s4list: [
      { name: 'Vercel', desc: 'Website hosting and server-side logs.' },
      { name: 'Resend', desc: 'Email delivery of your form submissions.' },
      { name: 'Google Analytics GA4', desc: 'Audience analytics — anonymized data.' },
      { name: 'UploadThing', desc: 'File upload handling and storage of photos submitted with inquiries.' },
    ],
    s4outro: 'We do not sell, rent, or otherwise share your personal information with third parties for marketing purposes.',

    s5title: 'Your Rights (Quebec Law 25 & PIPEDA)',
    s5intro: 'Under Quebec Law 25 (LMVDRP) and Canada\'s Personal Information Protection and Electronic Documents Act (PIPEDA), you have the following rights:',
    s5list: [
      'Right to access your personal information',
      'Right to correction of inaccurate information',
      'Right to deletion and de-indexation',
      'Right to data portability',
      'Right to withdraw consent at any time',
    ],
    s5outro: 'To exercise any of these rights, contact us at:',

    s6title: 'Data Retention',
    s6: 'Information collected via the contact form (name, contact details, message, and photos) is retained only as long as needed to evaluate and respond to your project inquiry. Photos hosted on UploadThing may be deleted upon request. Analytics data is retained according to Google Analytics GA4 default retention settings.',

    s7title: 'CASL (Canada\'s Anti-Spam Legislation)',
    s7: 'We only send commercial electronic messages with express or implied consent obtained at the point of your inquiry. All commercial messages include a clear and easy-to-use unsubscribe option. You may withdraw your consent at any time by writing to us at the address below.',

    s8title: 'Privacy Officer',
    s8: 'John & Joe Rénovation Inc. is responsible for the personal information it holds. For any questions, complaints, or requests regarding this policy, please contact us:',

    s9title: 'Governing Law',
    s9: 'This policy is governed by the laws of Quebec and Canada, including Quebec Law 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels — LMVDRP), PIPEDA, and CASL.',

    s10title: 'Changes to This Policy',
    s10: 'We reserve the right to update this policy at any time. The date of the most recent update is shown at the top of this page.',
  },
};

export default function PrivacyContent() {
  const [lang, setLang] = useState('fr');
  const L = t[lang];
  const telHref = `tel:+12633824336`;

  return (
    <>
      {/* Minimal header */}
      <header className="privacy-header">
        <div className="container privacy-header__inner">
          <Link href="/" className="privacy-header__back">
            <Image src="/logo.png" alt="J&J Logo" width={40} height={40} />
            <span>{L.back}</span>
          </Link>
          <button
            type="button"
            className="privacy-header__lang"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            aria-label="Switch language"
          >
            {L.langBtn}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="privacy-page">
        <div className="container privacy-page__content">
          <h1>{L.title}</h1>
          <p className="privacy-meta">{L.updated}</p>

          <section>
            <h2>{L.s1title}</h2>
            {L.s1.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </section>

          <section>
            <h2>{L.s2title}</h2>
            <p>{L.s2}</p>
            <ul>
              {L.s2list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{L.s2b}</p>
            <ul>
              {L.s2blist.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{L.s2c}</p>
          </section>

          <section>
            <h2>{L.s3title}</h2>
            <ul>
              {L.s3list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2>{L.s4title}</h2>
            <p>{L.s4intro}</p>
            <ul>
              {L.s4list.map((item, i) => (
                <li key={i}><strong>{item.name}</strong> — {item.desc}</li>
              ))}
            </ul>
            <p>{L.s4outro}</p>
          </section>

          <section>
            <h2>{L.s5title}</h2>
            <p>{L.s5intro}</p>
            <ul>
              {L.s5list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>
              {L.s5outro}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </section>

          <section>
            <h2>{L.s6title}</h2>
            <p>{L.s6}</p>
          </section>

          <section>
            <h2>{L.s7title}</h2>
            <p>{L.s7}</p>
          </section>

          <section>
            <h2>{L.s8title}</h2>
            <p>{L.s8}</p>
            <address className="privacy-contact">
              <strong>John &amp; Joe Rénovation Inc.</strong><br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br />
              <a href={telHref}>{PHONE_DISPLAY}</a>
            </address>
          </section>

          <section>
            <h2>{L.s9title}</h2>
            <p>{L.s9}</p>
          </section>

          <section>
            <h2>{L.s10title}</h2>
            <p>{L.s10}</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/logo.png" alt="J&J Logo" width={56} height={56} />
            <div>
              <strong>John &amp; Joe Rénovation Inc.</strong>
            </div>
          </div>
          <div className="footer__col">
            <h4>{L.footerContact}</h4>
            <a href={telHref}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div className="footer__col">
            <h4>{L.footerLicense}</h4>
            <span>RBQ: 5867-5588-01</span>
          </div>
          <div className="footer__col">
            <h4>{L.footerAreas}</h4>
            <span>Montréal, Laval, Rive-Sud, West Island</span>
          </div>
          <div className="footer__col">
            <h4>{L.footerLegal}</h4>
            <Link href="/privacy">{L.footerPrivacy}</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{L.footerRights}</span>
        </div>
      </footer>
    </>
  );
}
