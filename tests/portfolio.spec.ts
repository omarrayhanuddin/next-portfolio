import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('loads the homepage without client errors and exposes the projects', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Omar Rayhan');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Uddin');
  await expect(page.locator('.hero-role')).toHaveText('Senior Backend Engineer');
  await expect(page.locator('.profile-card')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Selected projects', exact: true })).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
});

test('uses the dark theme throughout the homepage, case studies, and quick navigation', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(12, 17, 15)');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0c110f');
  await expect(page.locator('.project-card').first()).toHaveCSS(
    'background-color',
    'rgb(18, 26, 22)',
  );
  await page.getByRole('button', { name: 'Open quick navigation' }).click();
  await expect(page.getByRole('dialog')).toHaveCSS('background-color', 'rgb(18, 26, 22)');
  await page.keyboard.press('Escape');
  await page.goto('/work/daivio');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('.perspective-section')).toHaveCSS(
    'background-color',
    'rgb(18, 26, 22)',
  );
});

test('keeps personal identity, project ownership, and body text easy to read', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-ownership')).toHaveCount(6);
  await expect(page.locator('.profile-card')).toContainText('Daivio');
  const type = await page.locator('.hero-description').evaluate((element) => {
    const style = getComputedStyle(element);
    return { size: Number.parseFloat(style.fontSize), family: style.fontFamily };
  });
  expect(type.size).toBeGreaterThanOrEqual(15);
  expect(type.family).toContain('DM Sans');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('font-style', 'normal');
  await page.goto('/work/daivio');
  const caseTextSize = await page
    .locator('.case-narrative p')
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(caseTextSize).toBeGreaterThanOrEqual(15);
});

test('keeps the owner name in the hero without repeating it across the homepage', async ({
  page,
}) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  expect(text.match(/Omar Rayhan/gi)).toHaveLength(1);
  await expect(page.locator('.brand-name')).toHaveText('Portfolio');
  await expect(page.locator('.profile-card')).not.toContainText('Omar');
  await expect(page.locator('.about-signature')).toHaveCount(0);
});

test('renders recognizable technology logos and grouped skill badges', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-skill-group]')).toHaveCount(6);
  await expect(page.locator('.skills-grid .tech-badge')).toHaveCount(23);
  await expect(page.locator('.skills-grid .tech-mark svg')).toHaveCount(23);
  await expect(page.locator('.skills-grid [data-icon-kind="brand"]')).toHaveCount(17);
  for (const name of ['Python', 'Django', 'PostgreSQL', 'Docker', 'React', 'Next.js']) {
    await expect(
      page.locator(`.skills-grid [data-tech="${name}"] .tech-mark path`).first(),
    ).toBeAttached();
  }
  await expect(page.locator('.stack-items .tech-mark svg')).toHaveCount(6);
});

test('filters the project index by domain', async ({ page }) => {
  await page.goto('/#work');
  await page.getByRole('button', { name: 'AI & data', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Enterprise', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: 'Read the Dubai Refreshment case study' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Platforms', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'All work 06' }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
});

test('shows four real local screenshots and no fabricated product interfaces', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.locator('.project-card [data-preview="screenshot"]')).toHaveCount(4);
  await expect(page.locator('.project-card [data-preview="internal"]')).toHaveCount(2);
  await expect(page.locator('.project-card .internal-project-art img')).toHaveCount(2);
  await expect(page.locator('.mock-window, .membership-card, .scan-frame')).toHaveCount(0);
  for (const image of await page.locator('.project-card .project-screenshot img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('src', /^\/projects\/[a-z-]+\.webp$/);
    const dimensions = await image.evaluate(async (element) => {
      const img = element as HTMLImageElement;
      await img.decode();
      return { width: img.naturalWidth, height: img.naturalHeight };
    });
    expect(dimensions).toEqual({ width: 1440, height: 1000 });
  }
});

test('links the public case studies to the supplied websites and keeps internal projects private', async ({
  page,
}) => {
  const websites = [
    ['daivio', 'https://daivio.com/'],
    ['findoc-ai', 'https://www.findocai.com/'],
    ['online-spine-ai', 'https://www.onlinespine.ai/'],
    ['wright-talent', 'https://www.wrightalent.com/'],
  ];
  for (const [slug, url] of websites) {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole('link', { name: 'Visit public website' })).toHaveAttribute(
      'href',
      url,
    );
    await expect(page.locator('.project-screenshot img')).toBeVisible();
    await expect(page.locator('.screenshot-caption')).toContainText('Public website screenshot');
  }
  for (const slug of ['dubai-refreshment', 'super-gym']) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('[data-preview="internal"]')).toContainText(
      'Custom concept illustration',
    );
    await expect(page.locator('[data-preview="internal"]')).toContainText(
      'Not a product screenshot',
    );
    await expect(page.locator('[data-preview="internal"] img')).toHaveCount(1);
    const illustration = page.locator('[data-preview="internal"] img');
    await expect(illustration).toHaveAttribute('src', /-illustration\.svg$/);
    const dimensions = await illustration.evaluate(async (element) => {
      const img = element as HTMLImageElement;
      await img.decode();
      return { width: img.naturalWidth, height: img.naturalHeight };
    });
    expect(dimensions).toEqual({ width: 1440, height: 900 });
    await expect(page.getByRole('link', { name: 'Visit public website' })).toHaveCount(0);
    await expect(page.locator('.case-internal-label')).toContainText('no public website');
  }
});

test('runs the conceptual request pipeline and allows another run', async ({ page }) => {
  await page.goto('/');
  const run = page.getByRole('button', { name: 'Run a simulated request through the diagram' });
  await run.click();
  await expect(run).toBeDisabled();
  await expect(page.getByText('COMPLETE · BACK TO THE USER')).toBeVisible();
  await expect(run).toBeEnabled();
  await expect(run).toContainText('RUN AGAIN');
});

test('searches and opens a case study through the command palette', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open quick navigation' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search pages and projects' }).fill('finDoc');
  await page.getByRole('textbox').press('Enter');
  await expect(page).toHaveURL('/work/findoc-ai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('FinDoc AI');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page).toHaveTitle(/FinDoc AI — Case Study/);
});

test('handles empty search and Escape without changing the route', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  await page.getByRole('textbox').fill('no-such-project');
  await expect(page.getByText('No results.')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page).toHaveURL('/');
});

for (const slug of [
  'daivio',
  'dubai-refreshment',
  'findoc-ai',
  'online-spine-ai',
  'wright-talent',
  'super-gym',
]) {
  test(`supports direct loading and refresh of ${slug}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.case-study')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What I built', exact: true })).toBeVisible();
    await page.reload();
    await expect(page.locator('.case-study')).toBeVisible();
    await page.getByRole('link', { name: 'BACK TO SELECTED WORK' }).click();
    await expect(page).toHaveURL('/#work');
    await expect(page.locator('.project-card')).toHaveCount(6);
    expect(errors).toEqual([]);
  });
}

test('serves the résumé, social preview, and crawlable static content', async ({ request }) => {
  const pdf = await request.get('/Omar_Rayhan_Resume_2026.pdf');
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  expect((await request.get('/social-card.png')).ok()).toBeTruthy();
  const homepage = await (await request.get('/')).text();
  expect(homepage).toContain('Omar Rayhan');
  expect(homepage).toContain('profile-card');
  expect(homepage).toContain('application/ld+json');
  const caseHtml = await (await request.get('/work/daivio/')).text();
  expect(caseHtml).toContain('What I built');
  expect(caseHtml).toContain('<title>Daivio — Case Study');
  expect(caseHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]).toBe(
    'The backend behind dataset ingestion, transformation, and AI training workflows.',
  );
});

test('provides real email and external profile links', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.getByRole('link', { name: 'omarrahim186@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:omarrahim186@gmail.com',
  );
  for (const link of await page.locator('a[target="_blank"]').all())
    await expect(link).toHaveAttribute('rel', /noopener/);
});

test('has no horizontal overflow at a range of viewport widths', async ({ page }) => {
  for (const width of [320, 375, 390, 650, 800, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/work/dubai-refreshment']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(sizes.content, `${path} overflows at ${width}px`).toBeLessThanOrEqual(
        sizes.viewport + 1,
      );
    }
  }
});

test('has no automated WCAG AA accessibility violations', async ({ page }) => {
  for (const path of ['/', '/work/daivio']) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      })),
    ).toEqual([]);
  }
});

test('has a useful missing-page screen', async ({ page }) => {
  await page.goto('/work/nonexistent-project');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Page not found.');
  await page.getByRole('link', { name: 'Back to the portfolio' }).click();
  await expect(page).toHaveURL('/');
});

test('mobile menu opens, navigates, and closes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL('/#about');
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
