# Omar Rayhan Uddin — Portfolio

An original, editorial portfolio for a senior backend engineer. Built with React, TypeScript, and Vite; deploys as static files. No backend, database, API keys, paid fonts, analytics service, or serverless functions are required.

## What’s included

- Warm-paper / forest-green design with locally hosted typography.
- Responsive homepage with an interactive request-flow diagram.
- Six filterable projects, each with a dedicated engineering case study.
- Work history, skills, education, and direct contact / social links.
- Downloadable original résumé.
- Quick navigation with **Ctrl/Cmd + K**, keyboard search, and Escape dismissal.
- Reduced-motion support, visible keyboard focus, skip navigation, and a mobile menu.
- Prerendered HTML for every case study, page-specific metadata, structured data, a PNG social preview, and optional canonical URLs / sitemap.
- Unit tests and desktop/mobile browser tests, including automated accessibility checks.

## Run locally

Install **Node.js 22 or newer** (the LTS version is recommended). Then, from this folder:

```sh
npm install
npm run dev
```

Open **http://localhost:5173**. Stop the server with Ctrl+C.

### Production build

```sh
npm run build
npm run preview
```

The deployable site is in **`dist/`**. The build generates a static homepage, six static case-study pages, and a missing-page screen. React hydrates those pages to enable interactions. The `.ssr/` directory is only a build intermediate; it is **not** a production backend and should not be deployed.

## Deploy to Vercel for free

Vercel’s **Hobby** plan is suitable for this personal portfolio, subject to its current usage limits and personal/non-commercial terms. You do not need a paid plan or custom domain; a free `*.vercel.app` address is provided.

### Recommended: GitHub → Vercel

1. Create a GitHub repository and upload this project. Include `package-lock.json`; do not upload `node_modules/`, `dist/`, or `.ssr/`.
2. Sign in to [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repository.
3. Use these settings (the included `vercel.json` also configures them):

   | Setting          | Value                                |
   | ---------------- | ------------------------------------ |
   | Framework preset | Vite                                 |
   | Root directory   | The folder containing `package.json` |
   | Install command  | `npm ci`                             |
   | Build command    | `npm run build`                      |
   | Output directory | `dist`                               |
   | Node.js version  | 22.x or a newer supported LTS        |

4. Click **Deploy**. Vercel will rebuild automatically when you push changes.
5. For canonical URLs, sitemap, and absolute social-image URLs, add **`SITE_URL`** in Project Settings → Environment Variables, set to your actual public origin (for example, `https://your-project.vercel.app`), then redeploy. Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` is also used automatically when available.

`SITE_URL` is optional. It is not a secret, and it must be your website’s origin—not your email address or a URL with a nested path. A custom domain is optional and may cost money through a domain registrar.

### Alternative: Vercel CLI

From this folder:

```sh
npx vercel
```

Sign in and follow the prompts to create and link your project. When you are ready to publish a production deployment:

```sh
npx vercel --prod
```

No deployment has been made automatically on your behalf.

## Other hosting providers

- **Netlify:** Build command `npm run build`, publish directory `dist`. The included `_redirects` file supplies the SPA fallback while real static pages retain precedence.
- **Cloudflare Pages:** Build command `npm run build`, output `dist`, supported Node.js LTS. No Workers or Pages Functions are required. The included `_redirects` is compatible with Pages.
- **Any static host:** Upload the contents of `dist`. Serve directory `index.html` files for clean URLs and fall back to `/index.html` for routes that do not map to a file. Real assets (including the PDF) must be served directly.

The site currently assumes it is hosted at the domain root. Subdirectory hosting such as a GitHub Pages **project** site requires additional base-path/router configuration; it is not configured out of the box. GitHub Pages user sites and custom domains can host the generated directory pages, but unknown SPA routes will use the host’s 404 handling.

## Personalise it

| Change                                                     | File                                               |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Name, email, social links, projects, case-study narratives | `src/data.ts`                                      |
| Homepage copy and page structure                           | `src/App.tsx`                                      |
| Colours, layouts, breakpoints, typography sizes            | `src/styles.css`                                   |
| Interactive architecture illustration                      | `src/components/SystemDiagram.tsx`                 |
| Project concept illustrations                              | `src/components/ProjectVisual.tsx`                 |
| Social preview source / image                              | `public/social-card.svg`, `public/social-card.png` |
| Browser icon                                               | `public/favicon.svg`                               |
| Résumé                                                     | `public/Omar_Rayhan_Resume_2026.pdf`               |
| Static page generation                                     | `src/entry-server.tsx`, `scripts/prerender.mjs`    |
| Hosting configuration                                      | `vercel.json`                                      |

When replacing the résumé, keep the filename or update `profile.resume` in `src/data.ts`. Changing the social-card SVG does not automatically update the PNG; export it as a 1200 × 630 PNG using an image tool and replace the PNG as well.

### Content integrity

The résumé is the source for professional history and project contributions. The six project illustrations are **original conceptual visuals**, not screenshots of the actual products. Case studies distinguish documented contributions from **engineering perspectives** and **possible future improvements**. No client logos, fake testimonials, model-accuracy numbers, fabricated business metrics, or unverified project links are used.

To make the case studies even stronger later, add approved real screenshots, public demo/repository links, and verified outcomes. Get permission before publishing client data or proprietary architecture. The downloadable PDF contains your phone number and email address: review it before deployment if you prefer a public résumé with fewer personal details.

### Contact behaviour

Email links open the visitor’s email application. The copy button copies your email when the browser grants clipboard access. There is no pretend “message sent” form, email delivery service, tracking, or data collection.

## Test

```sh
npm test
```

For real-browser checks, install the test browser once, then build and test:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

The browser suite starts its own production preview on port **4173**. It checks case-study routes and refreshes, project filters, the animated demo, quick navigation, mobile navigation, the PDF and social image, static HTML, layout overflow at 320–1440px, and WCAG AA checks with axe. Automated checks complement rather than replace manual screen-reader and visual review.

## Design notes

Typography: DM Sans, Instrument Serif, and IBM Plex Mono via Fontsource, self-hosted in the build. Fonts are open-source; their licenses are included in both the installed packages and `dist/licenses/`. Icons: Lucide. The project visuals are made from CSS and SVG rather than remote stock images, so the deployed portfolio has no third-party asset dependency.
