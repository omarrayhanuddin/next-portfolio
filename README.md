# Omar Rayhan Uddin — Portfolio

A person-first portfolio for Omar Rayhan Uddin, Senior Backend Engineer. Built with React, TypeScript, and Vite; deploys as static files. No backend, database, API keys, paid fonts, analytics service, or serverless functions are required.

## What’s included

- Charcoal / mint dark theme, softly glowing system diagrams, and locally hosted typography.
- Name-first homepage, professional profile card, and readable sans-serif typography.
- Interactive request-flow demonstration in the technical skills section.
- Six filterable projects, each with a dedicated engineering case study.
- Real screenshots of the four supplied public websites, stored locally as optimised WebP images.
- Dubai Refreshment and Super Gym are clearly marked internal, without fabricated product screenshots.
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
| Dark palette, surfaces, cards, and colour accents          | `src/dark-theme.css`                               |
| Layouts, breakpoints, and typography sizes                 | `src/styles.css`                                   |
| Interactive architecture illustration                      | `src/components/SystemDiagram.tsx`                 |
| Website screenshots and internal-project presentation      | `src/components/ProjectVisual.tsx`                 |
| Captured public website images and source metadata         | `public/projects/`                                 |
| Social preview source / image                              | `public/social-card.svg`, `public/social-card.png` |
| Browser icon                                               | `public/favicon.svg`                               |
| Résumé                                                     | `public/Omar_Rayhan_Resume_2026.pdf`               |
| Static page generation                                     | `src/entry-server.tsx`, `scripts/prerender.mjs`    |
| Hosting configuration                                      | `vercel.json`                                      |

When replacing the résumé, keep the filename or update `profile.resume` in `src/data.ts`. Changing the social-card SVG does not automatically update the PNG; export it as a 1200 × 630 PNG using an image tool and replace the PNG as well.

### Content integrity

The résumé is the source for professional history and project contributions. Daivio, FinDocAI, Online Spine, and Wrightalent use **real screenshots of their public homepages**, captured on 17 November 2026 at 1440 × 1000. The source URLs, page titles, and capture timestamps are recorded in `public/projects/captures.json`. These represent the current public sites, not private backend interfaces or proof of individual engineering outcomes. Marketing claims visible inside a screenshot belong to the respective website; they are not added to my résumé-based case-study claims.

Dubai Refreshment and Super Gym are internal projects with no supplied public URLs. They intentionally display a plain private-project panel rather than a simulated interface. The workflow diagrams in the case studies remain conceptual and clearly labelled. Case studies distinguish documented contributions from **engineering perspectives** and **possible future improvements**.

To refresh a screenshot, capture the public page in a browser, replace its WebP file in `public/projects/`, and update the capture date and description in `src/data.ts`. Screenshots are not fetched or regenerated during deployment; Vercel serves the bundled local assets.

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

Typography: DM Sans for headings, body text, and navigation, with IBM Plex Mono limited to the interactive backend diagram. Both are self-hosted through Fontsource. Small navigation and body labels have been enlarged; decorative italic headings are no longer used. Fonts are open-source; their licenses are included in both the installed packages and `dist/licenses/`. Icons: Lucide. Public-site screenshots are stored locally, while private projects have text-only panels; the deployed portfolio has no remote asset dependency.
