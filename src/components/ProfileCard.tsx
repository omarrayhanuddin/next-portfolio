import { ArrowUpRight, Braces, Github, Linkedin, MapPin } from 'lucide-react';
import { profile } from '../data';

export default function ProfileCard() {
  return (
    <aside className="profile-card" aria-label="Omar Rayhan Uddin's professional profile">
      <div className="profile-card-top">
        <span>
          <span className="status-dot" /> ENGINEER PROFILE
        </span>
        <Braces size={20} />
      </div>
      <div className="profile-card-identity">
        <div className="profile-avatar" aria-hidden="true">
          OR<span>.</span>
        </div>
        <div>
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
          <p>
            <MapPin size={14} /> {profile.location}
          </p>
        </div>
      </div>
      <dl className="profile-facts">
        <div>
          <dt>Currently</dt>
          <dd>
            Senior Backend Engineer<span>Daivio · Germany · Remote</span>
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
            Python · Django · PostgreSQL<span>Celery, Redis, Docker & AWS</span>
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
