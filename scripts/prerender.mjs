import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { profile, projects, render } from '../.ssr/entry-server.js';

// All pages ship real HTML, then hydrate into the interactive React app.
// This does not need a server, a browser download, or a paid hosting feature.
const template = await readFile(resolve('dist/index.html'), 'utf8');
const canonicalOrigin = template.match(/rel="canonical" href="([^\"]+)"/)?.[1]?.replace(/\/$/, '');
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const pages = [
  { path: '/', output: 'index.html', title: `${profile.name} — Senior Backend Engineer` },
  ...projects.map((project) => ({
    path: `/work/${project.slug}`,
    output: `work/${project.slug}/index.html`,
    title: `${project.name} — Case Study | ${profile.name}`,
    description: project.summary,
  })),
  { path: '/not-found', output: '404.html', title: `Page not found | ${profile.name}` },
];

for (const page of pages) {
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root" data-route="${page.path}">${render(page.path)}</div>`,
  );
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`);
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*"/,
    `$1${escape(page.title)}"`,
  );
  html = html.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*"/,
    `$1${escape(page.title)}"`,
  );
  if (page.description) {
    for (const attr of [
      'name="description"',
      'property="og:description"',
      'name="twitter:description"',
    ]) {
      html = html.replace(
        new RegExp(`(<meta\\s+${attr}\\s+content=")[^"]*"`),
        `$1${escape(page.description)}"`,
      );
    }
  }
  if (canonicalOrigin) {
    const url = `${canonicalOrigin}${page.path}`;
    html = html.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${escape(url)}"`);
    html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${escape(url)}"`);
  }
  if (page.output === '404.html')
    html = html.replace('</head>', '<meta name="robots" content="noindex" /></head>');
  const target = resolve('dist', page.output);
  await mkdir(resolve(target, '..'), { recursive: true });
  await writeFile(target, html);
}

console.log(
  `Prerendered ${pages.length} pages. Static HTML + interactive React, no server required.`,
);
