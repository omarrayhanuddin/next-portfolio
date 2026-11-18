import { ArrowUpRight, Braces, Github, Linkedin, MapPin, Workflow } from 'lucide-react';
import { profile } from '../data';
import TechBadge from './TechBadge';

export default function ProfileCard() {
  return (
    <aside className="profile-card" aria-label="Current work and core stack">
      <div className="profile-card-top">
        <span>
          <span className="status-dot" /> CURRENT FOCUS
        </span>
        <Braces size={20} />
      </div>
      <div className="profile-card-identity">
        <div className="profile-work-symbol" aria-hidden="true">
          <Workflow size={32} strokeWidth={1.5} />
        </div>
        <div>
          <strong>Data & AI platforms</strong>
          <span>APIs, pipelines & data systems</span>
          <p>
            <MapPin size={14} /> {profile.location}
          </p>
        </div>
      </div>
      <dl className="profile-facts">
        <div>
          <dt>Currently</dt>
          <dd>
            Daivio<span>Germany · Remote</span>
          </dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>
            5+ years in backend development<span>AI platforms, enterprise systems & APIs</span>
          </dd>
        </div>
        <div>
          <dt>Core stack</dt>
          <dd>
            <div className="profile-tech-stack">
              {['Python', 'Django', 'PostgreSQL'].map((name) => (
                <TechBadge key={name} name={name} className="profile-tech" />
              ))}
            </div>
          </dd>
        </div>
      </dl>
      <div className="profile-card-links">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          <Github size={17} /> GitHub <ArrowUpRight size={15} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={17} /> LinkedIn <ArrowUpRight size={15} />
        </a>
      </div>
    </aside>
  );
}
