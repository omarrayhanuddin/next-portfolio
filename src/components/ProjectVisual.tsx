import { ArrowUpRight, Globe2, LockKeyhole } from 'lucide-react';
import type { Project } from '../data';

export default function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const preview = project.preview;
  const screenshot = preview.type === 'website' ? preview.screenshot : undefined;
  const className = `project-visual visual-${project.visual} ${large ? 'visual-large' : ''}`;

  if (preview.type === 'website' && screenshot) {
    const capturedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${screenshot.capturedOn}T00:00:00Z`));
    return (
      <div className={`${className} project-screenshot`} data-preview="screenshot">
        <div className="screenshot-browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="screenshot-domain">
            <Globe2 size={12} aria-hidden="true" /> {new URL(preview.url).hostname}
          </span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </div>
        <div className="screenshot-image-wrap">
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            loading={large ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <div className="screenshot-caption">
          <span>Public website screenshot</span>
          <span>{capturedDate}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} private-project-preview`}
      data-preview={preview.type === 'internal' ? 'internal' : 'unavailable'}
    >
      <div className="private-preview-label">
        {preview.type === 'internal' ? (
          <LockKeyhole size={17} aria-hidden="true" />
        ) : (
          <Globe2 size={17} aria-hidden="true" />
        )}
        <span>{preview.type === 'internal' ? 'Internal project' : 'Public website'}</span>
      </div>
      <strong>{project.name}</strong>
      <p>
        {preview.type === 'internal'
          ? 'Private platform. No public website or product screenshots are available.'
          : 'A public website is available. A screenshot preview has not been added.'}
      </p>
      <span className="private-preview-note">
        {preview.type === 'internal'
          ? 'Backend contributions are documented in the case study.'
          : new URL(preview.url).hostname}
      </span>
    </div>
  );
}
