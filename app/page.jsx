'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import PhotoUpload from './components/PhotoUpload';

const PHONE_NUMBER = '+12633824336';
const PHONE_DISPLAY = '(263) 382-4336';

/* ─────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────── */
const t = {
  fr: {
    /* Header */
    call: 'Appeler',
    callNumber: PHONE_DISPLAY,
    quote: 'Soumission gratuite',
    /* Hero */
    heroTitle: 'Entrepreneur général',
    heroSub: 'Rénovation — Montréal et environs',
    heroDesc:
      'Travail de qualité, respect des délais, et un service honnête. John & Joe Rénovation transforme votre vision en réalité depuis plus de 10 ans.',
    callNow: 'Appeler maintenant',
    getQuote: 'Soumission gratuite',
    /* Trust */
    trustRbq: 'Licence RBQ',
    trustEstimate: 'Estimation gratuite',
    trustQuality: 'Travail de qualité',
    trustArea: 'Grand Montréal',
    trustEstimateSub: 'Sans engagement',
    trustQualitySub: 'Garantie de satisfaction',
    trustAreaSub: 'Montréal, Laval, Rive-Sud',
    /* Services */
    servicesTitle: 'Nos services',
    servicesSubtitle:
      'Des rénovations résidentielles et commerciales adaptées à vos besoins',
    svc1: 'Cuisine & salle de bain',
    svc1d: 'Rénovation complète de cuisines et salles de bain — design, plomberie, électricité et finition.',
    svc2: 'Finition de sous-sol',
    svc2d: 'Transformez votre sous-sol en espace de vie fonctionnel et confortable.',
    svc3: 'Gypse & peinture',
    svc3d: 'Installation de gypse, joints, texture et peinture intérieure professionnelle.',
    svc4: 'Plancher & céramique',
    svc4d: 'Installation de plancher flottant, bois franc, céramique et porcelaine.',
    svc5: 'Menuiserie & finition',
    svc5d: 'Moulures, caissons, portes, escaliers et travaux de finition sur mesure.',
    svc6: 'Rénovation commerciale',
    svc6d: "Petits projets commerciaux — bureaux, boutiques et espaces d'accueil.",
    /* Process */
    processTitle: 'Notre processus',
    processSubtitle:
      'Simple, transparent et efficace — du premier appel à la livraison finale',
    step1: 'Soumission gratuite',
    step1d: 'Visite sur place, évaluation de votre projet et soumission détaillée sans engagement.',
    step2: 'Plan & échéancier',
    step2d: 'Un plan clair avec matériaux, étapes et calendrier pour chaque phase du projet.',
    step3: 'Travaux & propreté',
    step3d: 'Exécution professionnelle avec nettoyage quotidien et respect de votre domicile.',
    step4: 'Inspection finale',
    step4d: "Visite de contrôle avec vous pour s'assurer que chaque détail est parfait.",
    /* Gallery */
    galleryTitle: 'Nos réalisations',
    gallerySubtitle:
      'Quelques projets récents réalisés dans la grande région de Montréal',
    /* Testimonials */
    testimonialsTitle: 'Ce que nos clients disent',
    testimonialsSubtitle:
      'La satisfaction de nos clients est notre meilleure publicité',
    rev1: 'John & Joe ont fait un travail exceptionnel sur notre cuisine. Propres, ponctuels et très professionnels. Je recommande à 100%!',
    rev1name: 'Marc D.',
    rev1loc: 'Montréal',
    rev2: 'Rénovation complète de notre salle de bain en moins de deux semaines. Le résultat est magnifique. Merci!',
    rev2name: 'Sophie L.',
    rev2loc: 'Laval',
    rev3: "Excellent service du début à la fin. Ils ont respecté le budget et les délais. Je n'hésiterai pas à faire appel à eux encore.",
    rev3name: 'Alex T.',
    rev3loc: 'Verdun',
    /* Form */
    formTitle: 'Demandez votre soumission gratuite',
    formSubtitle:
      'Remplissez le formulaire ci-dessous et nous vous contacterons rapidement',
    labelName: 'Nom complet',
    labelPhone: 'Téléphone',
    labelEmail: 'Courriel',
    labelCity: 'Ville',
    labelProject: 'Type de projet',
    labelMessage: 'Message / Détails du projet',
    labelFile: 'Joindre des photos (optionnel)',
    placeholderName: 'Jean Dupont',
    placeholderEmail: 'courriel@exemple.com',
    placeholderCity: 'Montréal',
    placeholderMsg: 'Décrivez votre projet...',
    optDefault: 'Sélectionnez un type de projet',
    optKitchen: 'Cuisine',
    optBathroom: 'Salle de bain',
    optBasement: 'Sous-sol',
    optPaint: 'Gypse & peinture',
    optFloor: 'Plancher & céramique',
    optCarpentry: 'Menuiserie & finition',
    optCommercial: 'Commercial',
    optOther: 'Autre',
    submit: 'Envoyer la demande',
    submitting: 'Envoi en cours...',
    successTitle: 'Merci!',
    successMsg:
      'Votre demande a bien été envoyée. Nous vous contacterons dans les 24 heures.',
    errorGeneric:
      "Une erreur est survenue. Veuillez réessayer ou nous appeler directement.",
    validationPhoneOrEmail:
      'Veuillez fournir un numéro de téléphone ou un courriel.',
    browse: 'Parcourir les fichiers',
    caslLabel: "J'accepte de recevoir des communications de John & Joe Rénovation concernant ma demande.",
    privacyNotice: 'En soumettant ce formulaire, vos informations seront traitées conformément à notre',
    privacyLink: 'Politique de confidentialité',
    /* Footer */
    footerAreas: 'Zones desservies',
    footerContact: 'Contact',
    footerLicense: 'Licence',
    footerLegal: 'Légal',
    footerPrivacy: 'Politique de confidentialité',
    footerRights: 'John & Joe Rénovation Inc. Tous droits réservés.',
    footerDemo: '',
  },
  en: {
    call: 'Call',
    callNumber: PHONE_DISPLAY,
    quote: 'Get a Quote',
    heroTitle: 'General Contractor',
    heroSub: 'Renovations — Montreal & surrounding areas',
    heroDesc:
      'Quality work, on-time delivery, and honest service. John & Joe Rénovation has been turning your vision into reality for over 10 years.',
    callNow: 'Call Now',
    getQuote: 'Get a Free Quote',
    trustRbq: 'RBQ License',
    trustEstimate: 'Free Estimates',
    trustQuality: 'Quality Work',
    trustArea: 'Greater Montreal',
    trustEstimateSub: 'No obligation',
    trustQualitySub: 'Satisfaction guaranteed',
    trustAreaSub: 'Montreal, Laval, South Shore',
    servicesTitle: 'Our Services',
    servicesSubtitle:
      'Residential and commercial renovations tailored to your needs',
    svc1: 'Kitchen & Bathroom',
    svc1d: 'Full kitchen and bathroom renovations — design, plumbing, electrical, and finishing.',
    svc2: 'Basement Finishing',
    svc2d: 'Transform your basement into a functional and comfortable living space.',
    svc3: 'Drywall & Painting',
    svc3d: 'Drywall installation, taping, texturing, and professional interior painting.',
    svc4: 'Flooring & Tile',
    svc4d: 'Laminate, hardwood, ceramic, and porcelain tile installation.',
    svc5: 'Carpentry & Finishing',
    svc5d: 'Mouldings, coffered ceilings, doors, staircases, and custom finish work.',
    svc6: 'Commercial Renovations',
    svc6d: 'Small commercial projects — offices, retail spaces, and reception areas.',
    processTitle: 'Our Process',
    processSubtitle:
      'Simple, transparent, and efficient — from first call to final delivery',
    step1: 'Free Quote',
    step1d: 'On-site visit, project assessment, and detailed no-obligation estimate.',
    step2: 'Plan & Timeline',
    step2d: 'A clear plan with materials, phases, and a schedule for every step.',
    step3: 'Quality Work & Cleanup',
    step3d: 'Professional execution with daily cleanup and respect for your home.',
    step4: 'Final Walkthrough',
    step4d: 'Review with you to ensure every detail meets your expectations.',
    galleryTitle: 'Our Work',
    gallerySubtitle:
      'Recent projects completed in the greater Montreal area',
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Client satisfaction is our best advertisement',
    rev1: 'John & Joe did exceptional work on our kitchen. Clean, punctual, and very professional. I recommend 100%!',
    rev1name: 'Marc D.',
    rev1loc: 'Montreal',
    rev2: 'Complete bathroom renovation in under two weeks. The result is stunning. Thank you!',
    rev2name: 'Sophie L.',
    rev2loc: 'Laval',
    rev3: "Excellent service from start to finish. They respected the budget and timeline. I won't hesitate to call them again.",
    rev3name: 'Alex T.',
    rev3loc: 'Verdun',
    formTitle: 'Request Your Free Quote',
    formSubtitle: "Fill out the form below and we'll get back to you quickly",
    labelName: 'Full Name',
    labelPhone: 'Phone',
    labelEmail: 'Email',
    labelCity: 'City',
    labelProject: 'Project Type',
    labelMessage: 'Message / Project Details',
    labelFile: 'Attach photos (optional)',
    placeholderName: 'John Smith',
    placeholderEmail: 'email@example.com',
    placeholderCity: 'Montreal',
    placeholderMsg: 'Describe your project...',
    optDefault: 'Select a project type',
    optKitchen: 'Kitchen',
    optBathroom: 'Bathroom',
    optBasement: 'Basement',
    optPaint: 'Drywall & Painting',
    optFloor: 'Flooring & Tile',
    optCarpentry: 'Carpentry & Finishing',
    optCommercial: 'Commercial',
    optOther: 'Other',
    submit: 'Send Request',
    submitting: 'Sending...',
    successTitle: 'Thank you!',
    successMsg:
      "Your request has been sent. We'll contact you within 24 hours.",
    errorGeneric:
      'Something went wrong. Please try again or call us directly.',
    validationPhoneOrEmail: 'Please provide a phone number or email.',
    browse: 'Browse files',
    caslLabel: 'I agree to receive communications from John & Joe Rénovation regarding my inquiry.',
    privacyNotice: 'By submitting this form, your information will be handled in accordance with our',
    privacyLink: 'Privacy Policy',
    footerAreas: 'Service Areas',
    footerContact: 'Contact',
    footerLicense: 'License',
    footerLegal: 'Legal',
    footerPrivacy: 'Privacy Policy',
    footerRights: 'John & Joe Rénovation Inc. All rights reserved.',
    footerDemo: '',
  },
};

/* ─────────────────────────────────────────────
   ICONS (inline SVGs)
───────────────────────────────────────────── */
function PhoneIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spinner-icon">
      <path d="M12 2a10 10 0 010 20 10 10 0 010-20" strokeLinecap="round" strokeDasharray="31.4 31.4" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <line x1="2" y1="11" x2="22" y2="11" />
      <circle cx="8" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
      <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
    </svg>
  );
}

function BasementIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <line x1="3" y1="14" x2="21" y2="14" />
    </svg>
  );
}

function PaintIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="8" rx="1" />
      <path d="M7 11v2a2 2 0 002 2h0a2 2 0 002-2v-2" />
      <line x1="10" y1="15" x2="10" y2="21" />
      <line x1="8" y1="21" x2="12" y2="21" />
    </svg>
  );
}

function FloorIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="9" />
      <line x1="15" y1="9" x2="15" y2="15" />
      <line x1="9" y1="15" x2="9" y2="21" />
    </svg>
  );
}

function CarpentryIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M9 22v-4h6v4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const formRef = useRef(null);
  const L = t[lang];

  /* ── Form state ── */
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: '',
    message: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [caslConsent, setCaslConsent] = useState(false);
  const uploadStartRef = useRef(0);
  const MIN_UPLOAD_DISPLAY_MS = 600;

  const finishUploadDisplay = (fn) => {
    const elapsed = Date.now() - uploadStartRef.current;
    const remaining = Math.max(0, MIN_UPLOAD_DISPLAY_MS - elapsed);
    if (remaining === 0) { fn(); return; }
    setTimeout(fn, remaining);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (formStatus === 'error') {
      setFormError('');
      setFormStatus('idle');
    }
  };

  /* ── Form submission via /api/contact ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation: need phone OR email
    if (!formData.phone.trim() && !formData.email.trim()) {
      setFormError(L.validationPhoneOrEmail);
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fileUrls: uploadedFiles.map((f) => f.url),
          caslConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || L.errorGeneric);
        setFormStatus('error');
        return;
      }

      setFormStatus('success');
    } catch {
      setFormError(L.errorGeneric);
      setFormStatus('error');
    }
  };

  /* ── Data arrays ── */
  const services = [
    { icon: <KitchenIcon />, name: L.svc1, desc: L.svc1d },
    { icon: <BasementIcon />, name: L.svc2, desc: L.svc2d },
    { icon: <PaintIcon />, name: L.svc3, desc: L.svc3d },
    { icon: <FloorIcon />, name: L.svc4, desc: L.svc4d },
    { icon: <CarpentryIcon />, name: L.svc5, desc: L.svc5d },
    { icon: <CommercialIcon />, name: L.svc6, desc: L.svc6d },
  ];

  const steps = [
    { num: '01', title: L.step1, desc: L.step1d },
    { num: '02', title: L.step2, desc: L.step2d },
    { num: '03', title: L.step3, desc: L.step3d },
    { num: '04', title: L.step4, desc: L.step4d },
  ];

  /* Job photos for gallery */
  const jobPhotos = Array.from({ length: 14 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return { src: `/jobs/job-${num}.jpg`, alt: `J&J Rénovation — Projet ${num}` };
  });

  const reviews = [
    { text: L.rev1, name: L.rev1name, loc: L.rev1loc },
    { text: L.rev2, name: L.rev2name, loc: L.rev2loc },
    { text: L.rev3, name: L.rev3name, loc: L.rev3loc },
  ];

  const projectOptions = [
    { value: '', label: L.optDefault },
    { value: 'kitchen', label: L.optKitchen },
    { value: 'bathroom', label: L.optBathroom },
    { value: 'basement', label: L.optBasement },
    { value: 'paint', label: L.optPaint },
    { value: 'floor', label: L.optFloor },
    { value: 'carpentry', label: L.optCarpentry },
    { value: 'commercial', label: L.optCommercial },
    { value: 'other', label: L.optOther },
  ];

  const telHref = `tel:${PHONE_NUMBER}`;

  return (
    <>
      {/* ═══════ HEADER ═══════ */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <div className="header__brand">
            <Image src="/logo.png" alt="J&J Logo" width={46} height={46} className="header__logo" priority />
            <span className="header__name">
              J&amp;J <span className="header__name--light">Rénovation</span>
            </span>
          </div>

          <nav className="header__nav">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              aria-label="Toggle language"
            >
              <span className={lang === 'fr' ? 'lang-active' : ''}>FR</span>
              <span className="lang-sep">/</span>
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
            </button>

            <a href={telHref} className="btn btn--outline btn--sm header__call-btn">
              <PhoneIcon size={16} /> {L.call}
            </a>

            <button className="btn btn--primary btn--sm header__quote-btn" onClick={scrollToForm}>
              {L.quote}
            </button>

            <button
              className="hamburger"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>

        {mobileMenu && (
          <div className="mobile-menu">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            >
              <span className={lang === 'fr' ? 'lang-active' : ''}>FR</span>
              <span className="lang-sep">/</span>
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
            </button>
            <a href={telHref} className="btn btn--outline" onClick={() => setMobileMenu(false)}>
              <PhoneIcon size={18} /> {L.call} — {PHONE_DISPLAY}
            </a>
            <button className="btn btn--primary" onClick={scrollToForm}>
              {L.quote}
            </button>
          </div>
        )}
      </header>

      {/* ═══════ HERO ═══════ */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__badge">RBQ: 5867-5588-01</div>
          <h1 className="hero__title">{L.heroTitle}</h1>
          <p className="hero__sub">{L.heroSub}</p>
          <p className="hero__desc">{L.heroDesc}</p>
          <div className="hero__buttons">
            <a href={telHref} className="btn btn--accent btn--lg">
              <PhoneIcon size={18} /> {L.callNow}
            </a>
            <button className="btn btn--outline-light btn--lg" onClick={scrollToForm}>
              {L.getQuote}
            </button>
          </div>
        </div>
        <div className="hero__divider">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ═══════ TRUST BAR ═══════ */}
      <section className="trust">
        <div className="container trust__grid">
          <div className="trust__item">
            <div className="trust__icon"><ShieldIcon /></div>
            <div><strong>{L.trustRbq}</strong><span>5867-5588-01</span></div>
          </div>
          <div className="trust__item">
            <div className="trust__icon"><DollarIcon /></div>
            <div><strong>{L.trustEstimate}</strong><span>{L.trustEstimateSub}</span></div>
          </div>
          <div className="trust__item">
            <div className="trust__icon"><AwardIcon /></div>
            <div><strong>{L.trustQuality}</strong><span>{L.trustQualitySub}</span></div>
          </div>
          <div className="trust__item">
            <div className="trust__icon"><MapPinIcon /></div>
            <div><strong>{L.trustArea}</strong><span>{L.trustAreaSub}</span></div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">{L.servicesTitle}</h2>
          <p className="section-subtitle">{L.servicesSubtitle}</p>
          <div className="services__grid">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.name}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section className="process">
        <div className="container">
          <h2 className="section-title section-title--light">{L.processTitle}</h2>
          <p className="section-subtitle section-subtitle--light">{L.processSubtitle}</p>
          <div className="process__grid">
            {steps.map((s, i) => (
              <div className="process-step" key={i}>
                <div className="process-step__num">{s.num}</div>
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="section-title">{L.galleryTitle}</h2>
          <p className="section-subtitle">{L.gallerySubtitle}</p>
          <div className="gallery__grid">
            {jobPhotos.map((photo, i) => (
              <div className="gallery-card" key={i}>
                <div className="gallery-card__img">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title section-title--light">{L.testimonialsTitle}</h2>
          <p className="section-subtitle section-subtitle--light">{L.testimonialsSubtitle}</p>
          <div className="testimonials__grid">
            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="review-card__stars">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="review-card__text">&ldquo;{r.text}&rdquo;</p>
                <div className="review-card__author">
                  <div className="review-card__avatar">{r.name[0]}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE FORM ═══════ */}
      <section className="form-section" id="quote" ref={formRef}>
        <div className="container">
          {formStatus !== 'success' && (
            <>
              <h2 className="section-title">{L.formTitle}</h2>
              <p className="section-subtitle">{L.formSubtitle}</p>
            </>
          )}

          {formStatus === 'success' ? (
            <div className="form-success">
              <CheckCircleIcon />
              <h3>{L.successTitle}</h3>
              <p>{L.successMsg}</p>
              <a href={telHref} className="btn btn--primary btn--lg" style={{ marginTop: 24, whiteSpace: 'normal' }}>
                <PhoneIcon size={18} /> {L.callNow} — {PHONE_DISPLAY}
              </a>
            </div>
          ) : (
            <div className="form-wrapper">
              <form className="quote-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="f-name">{L.labelName} *</label>
                    <input
                      id="f-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={updateField('name')}
                      placeholder={L.placeholderName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-phone">{L.labelPhone}</label>
                    <input
                      id="f-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={updateField('phone')}
                      placeholder="(514) 000-0000"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="f-email">{L.labelEmail}</label>
                    <input
                      id="f-email"
                      type="email"
                      value={formData.email}
                      onChange={updateField('email')}
                      placeholder={L.placeholderEmail}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-city">{L.labelCity}</label>
                    <input
                      id="f-city"
                      type="text"
                      value={formData.city}
                      onChange={updateField('city')}
                      placeholder={L.placeholderCity}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="f-project">{L.labelProject} *</label>
                  <select
                    id="f-project"
                    required
                    value={formData.projectType}
                    onChange={updateField('projectType')}
                  >
                    {projectOptions.map((o) => (
                      <option key={o.value} value={o.value} disabled={o.value === ''}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="f-message">{L.labelMessage} *</label>
                  <textarea
                    id="f-message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={updateField('message')}
                    placeholder={L.placeholderMsg}
                  />
                </div>
                <PhotoUpload
                  lang={lang}
                  uploadedFiles={uploadedFiles}
                  isUploading={isUploading}
                  onUploadComplete={(files) => {
                    finishUploadDisplay(() => {
                      setUploadedFiles(files);
                      setUploadError('');
                      setIsUploading(false);
                    });
                  }}
                  onUploadError={(msg) => {
                    finishUploadDisplay(() => {
                      setUploadError(msg);
                      setIsUploading(false);
                    });
                  }}
                  onUploadBegin={() => {
                    uploadStartRef.current = Date.now();
                    setIsUploading(true);
                    setUploadError('');
                  }}
                />

                {/* Upload error */}
                {uploadError && (
                  <div className="form-error">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="form-group casl-check">
                  <label className="casl-check__label">
                    <input
                      type="checkbox"
                      checked={caslConsent}
                      onChange={(e) => setCaslConsent(e.target.checked)}
                    />
                    <span>{L.caslLabel}</span>
                  </label>
                </div>

                {/* Form error banner */}
                {formStatus === 'error' && formError && (
                  <div className="form-error">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--lg btn--full"
                  disabled={formStatus === 'submitting' || isUploading}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <SpinnerIcon /> {L.submitting}
                    </>
                  ) : (
                    L.submit
                  )}
                </button>

                <p className="consent-notice">
                  {L.privacyNotice}{' '}
                  <a href="/privacy">{L.privacyLink}</a>.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/logo.png" alt="J&J Logo" width={56} height={56} />
            <div>
              <strong>John &amp; Joe Rénovation Inc.</strong>
              <span>{L.footerDemo}</span>
            </div>
          </div>
          <div className="footer__col">
            <h4>{L.footerContact}</h4>
            <a href={telHref}>{PHONE_DISPLAY}</a>
            <a href="mailto:J.J.RENOS@hotmail.com">J.J.RENOS@hotmail.com</a>
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
            <a href="/privacy">{L.footerPrivacy}</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {L.footerRights}</span>
        </div>
      </footer>
    </>
  );
}
