import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { categories, experience, filterProjects, profile, projects, skills } from './data';
import { technologyIcons } from './components/TechBadge';

describe('Portfolio content', () => {
  it('includes six unique, addressable case studies', () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(6);
    for (const project of projects) expect(project.slug).toMatch(/^[a-z0-9-]+$/);
  });
  it('gives every project a complete case-study narrative', () => {
    for (const project of projects) {
      expect(project.context.length).toBeGreaterThan(100);
      expect(project.challenge.length).toBeGreaterThan(100);
      expect(project.contributions).toHaveLength(3);
      expect(project.flow.length).toBeGreaterThanOrEqual(4);
      expect(project.perspective).toBeTruthy();
      expect(project.nextStep).toBeTruthy();
    }
  });
  it('uses the contact and profile links from the résumé', () => {
    expect(profile.email).toBe('omarrahim186@gmail.com');
    expect(profile.github).toBe('https://github.com/omarrayhanuddin');
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/omarrayhanuddin');
    expect(profile.resume).toMatch(/\.pdf$/);
  });
  it('identifies only the documented current role as current', () => {
    expect(experience.filter((job) => job.current).map((job) => job.company)).toEqual(['Daivio']);
  });
  it('uses local, dated screenshots for the four supplied public websites', () => {
    const publicProjects = projects.filter((project) => project.preview.type === 'website');
    expect(publicProjects).toHaveLength(4);
    for (const project of publicProjects) {
      if (project.preview.type !== 'website') continue;
      expect(project.preview.url).toMatch(/^https:\/\//);
      const screenshot = project.preview.screenshot;
      expect(screenshot).toBeDefined();
      expect(screenshot?.src).toMatch(/^\/projects\/[a-z-]+\.webp$/);
      expect(screenshot?.alt).toContain('public homepage');
      expect(screenshot?.capturedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(existsSync(resolve('public', screenshot!.src.slice(1)))).toBe(true);
    }
  });
  it('does not invent URLs or screenshots for internal projects', () => {
    const internal = projects.filter((project) => project.preview.type === 'internal');
    expect(internal.map((project) => project.slug)).toEqual(['dubai-refreshment', 'super-gym']);
    for (const project of internal) {
      expect(project.preview.type).toBe('internal');
      expect(project.preview).not.toHaveProperty('url');
      expect(project.preview).not.toHaveProperty('screenshot');
      if (project.preview.type !== 'internal') continue;
      const illustration = project.preview.illustration;
      expect(illustration.src).toMatch(/^\/projects\/[a-z-]+-illustration\.svg$/);
      expect(illustration.alt).toContain('Not a product screenshot');
      expect(existsSync(resolve('public', illustration.src.slice(1)))).toBe(true);
    }
  });
  it('provides a real logo or relevant symbol for every listed skill', () => {
    for (const name of skills.flatMap((group) => group.items)) {
      const icon = technologyIcons[name];
      expect(icon, `${name} needs an icon definition`).toBeDefined();
      expect(Boolean(icon.path || icon.symbol)).toBe(true);
    }
    for (const name of ['Python', 'Django', 'PostgreSQL', 'Docker', 'React', 'Next.js']) {
      expect(technologyIcons[name].path).toBeTruthy();
    }
  });
});

describe('Project filtering', () => {
  it('shows all work by default', () => expect(filterProjects('All work')).toHaveLength(6));
  it('groups projects by domain', () => {
    expect(filterProjects('AI & data')).toHaveLength(3);
    expect(filterProjects('Enterprise')).toHaveLength(1);
    expect(filterProjects('Platforms')).toHaveLength(2);
  });
  it('matches all category options to content', () => {
    for (const category of categories) expect(filterProjects(category).length).toBeGreaterThan(0);
  });
  it('searches project names without case or whitespace sensitivity', () => {
    expect(filterProjects('All work', '  DAIVIO  ').map((project) => project.slug)).toEqual([
      'daivio',
    ]);
  });
  it('searches tags and respects the current category', () => {
    expect(filterProjects('AI & data', 'Celery').map((project) => project.slug)).toEqual([
      'daivio',
    ]);
    expect(filterProjects('Platforms', 'Celery')).toEqual([]);
  });
  it('returns an empty result for a nonmatching search', () =>
    expect(filterProjects('All work', 'xyz-not-a-project')).toEqual([]));
});
