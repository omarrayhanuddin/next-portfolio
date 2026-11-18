import { readFileSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { profile, projects } from './src/data';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // SITE_URL is optional locally. Set it to your public origin for canonical SEO.
  const configuredOrigin = env.SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL;
  const siteUrl = configuredOrigin
    ? new URL(
        configuredOrigin.startsWith('http') ? configuredOrigin : `https://${configuredOrigin}`,
      ).origin
    : undefined;
  return {
    plugins: [
      react(),
      {
        name: 'portfolio-seo',
        configurePreviewServer(server) {
          server.middlewares.use((request, _response, next) => {
            const path = request.url?.split('?')[0];
            if (projects.some((project) => path === `/work/${project.slug}`))
              request.url = `${path}/index.html`;
            next();
          });
        },
        transformIndexHtml(html) {
          const person = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            jobTitle: profile.role,
            email: profile.email,
            address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
            sameAs: [profile.github, profile.linkedin],
            ...(siteUrl ? { url: siteUrl } : {}),
          };
          let result = html.replace(
            '</head>',
            `<script type="application/ld+json">${JSON.stringify(person)}</script></head>`,
          );
          if (siteUrl) {
            result = result.replaceAll(
              'content="/social-card.png"',
              `content="${siteUrl}/social-card.png"`,
            );
            result = result.replace(
              '</head>',
              `<link rel="canonical" href="${siteUrl}/" /><meta property="og:url" content="${siteUrl}/" /></head>`,
            );
          }
          return result;
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'licenses/simple-icons.txt',
            source: readFileSync('node_modules/simple-icons/LICENSE.md', 'utf8'),
          });
          for (const font of ['dm-sans', 'instrument-serif', 'ibm-plex-mono']) {
            this.emitFile({
              type: 'asset',
              fileName: `licenses/${font}.txt`,
              source: readFileSync(`node_modules/@fontsource/${font}/LICENSE`, 'utf8'),
            });
          }
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
          });
          if (siteUrl)
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...projects.map((project) => `/work/${project.slug}`)].map((path) => `<url><loc>${siteUrl}${path}</loc></url>`).join('')}</urlset>`,
            });
        },
      },
    ],
    server: { port: 5173, strictPort: true },
  };
});
