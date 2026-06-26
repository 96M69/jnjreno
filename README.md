# J&J Rénovation Inc — Website

Professional bilingual (FR/EN) contractor website built with Next.js 14 App Router.
Contact form sends emails via [Resend](https://resend.com).

---

## File Structure

```
jj-reno-prod/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js        ← Resend API endpoint
│   ├── globals.css             ← All styles (pure CSS, no Tailwind)
│   ├── layout.jsx              ← Root layout + metadata
│   └── page.jsx                ← Full single-page site (client component)
├── public/
│   └── logo.png                ← Company logo
├── .env.example                ← Environment variables template
├── .gitignore
├── jsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 1. Run Locally

```bash
# Clone or cd into the project
cd jj-reno-prod

# Install dependencies
npm install

# Create your local .env file
cp .env.example .env

# Edit .env with your real Resend API key:
#   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
#   CONTACT_TO_EMAIL=J.J.RENOS@hotmail.com
#   CONTACT_FROM_EMAIL=onboarding@resend.dev

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site is live.

> **Note:** The contact form needs a real `RESEND_API_KEY` to send emails.
> Get a free key at [resend.com/api-keys](https://resend.com/api-keys).

---

## 2. Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "J&J Rénovation — initial site"

# Create a repo on GitHub (via github.com or gh CLI)
gh repo create jj-renovation --private --source=. --push

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/jj-renovation.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy to Vercel

### Option A — Via Vercel Dashboard (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `jj-renovation` GitHub repo
4. Vercel auto-detects Next.js — no settings to change
5. **Before clicking Deploy**, expand **"Environment Variables"** and add:

   | Variable             | Value                          |
   |----------------------|--------------------------------|
   | `RESEND_API_KEY`     | `re_xxxxxxxxxxxxxxxxxxxx`      |
   | `CONTACT_TO_EMAIL`   | `J.J.RENOS@hotmail.com`         |
   | `CONTACT_FROM_EMAIL` | `onboarding@resend.dev`        |

6. Click **Deploy** — done!

### Option B — Via Vercel CLI

```bash
npm i -g vercel
vercel

# Follow prompts, then set env vars:
vercel env add RESEND_API_KEY
vercel env add CONTACT_TO_EMAIL
vercel env add CONTACT_FROM_EMAIL

# Redeploy
vercel --prod
```

---

## 4. Resend Setup Notes

### Using the free tier (onboarding@resend.dev)

By default, Resend lets you send from `onboarding@resend.dev`.
This works fine for testing and low-volume use.

### Using your own domain (recommended for production)

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `jjrenovation.com`)
3. Add the DNS records Resend gives you (MX, TXT, DKIM)
4. Once verified, update `CONTACT_FROM_EMAIL` in Vercel:
   - e.g., `soumissions@jjrenovation.com`
5. Redeploy (Vercel auto-redeploys on env var change)

---

## 5. Custom Domain (Optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g., `jjrenovation.com`)
3. Follow Vercel's instructions to update your DNS:
   - Usually an A record: `76.76.21.21`
   - And a CNAME for `www`: `cname.vercel-dns.com`
4. SSL is automatic

---

## Features

- ✅ Bilingual FR/EN with toggle (no external i18n library)
- ✅ Real `tel:` phone links that call immediately on mobile
- ✅ Contact form sends emails via Resend API
- ✅ Server-side validation + client-side validation
- ✅ Loading spinner + error messages on form
- ✅ Responsive mobile-first design
- ✅ Pure CSS (no Tailwind, no heavy libraries)
- ✅ Single-page layout with smooth scroll
- ✅ Sticky header with backdrop blur
- ✅ RBQ license number displayed prominently
