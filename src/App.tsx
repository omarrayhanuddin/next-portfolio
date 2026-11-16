import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Command,
  Copy,
  Download,
  Github,
  Linkedin,
  Menu,
  Search,
  X,
} from 'lucide-react';
import {
  categories,
  experience,
  filterProjects,
  profile,
  projects,
  skills,
  type Category,
} from './data';
import SystemDiagram from './components/SystemDiagram';
import ProjectVisual from './components/ProjectVisual';

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function Header({ onSearch }: { onSearch: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Omar Rayhan — home">
          <span className="monogram">
            or<span>.</span>
          </span>
          <span className="brand-name">
            Omar Rayhan<span>BACKEND ENGINEER</span>
          </span>
        </Link>
        <nav
          className={`main-nav ${menuOpen ? 'nav-open' : ''}`}
          aria-label="Main navigation"
          id="main-navigation"
        >
          <Link to="/#work" onClick={() => setMenuOpen(false)}>
            Selected work <span>06</span>
          </Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>
            Let’s talk <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
          <button className="search-toggle" onClick={onSearch} aria-label="Open quick navigation">
            <Command size={13} />
            <span>K</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const results = [
    { label: 'Selected work', subtitle: 'Explore the project index', path: '/#work' },
    { label: 'About & experience', subtitle: 'The person behind the systems', path: '/#about' },
    { label: 'Get in touch', subtitle: profile.email, path: '/#contact' },
    ...projects.map((project) => ({
      label: project.name,
      subtitle: project.discipline,
      path: `/work/${project.slug}`,
    })),
  ].filter((item) =>
    `${item.label} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase().trim()),
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      dialog.current?.showModal();
      input.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
        dialog.current?.close();
      };
    }
    dialog.current?.close();
  }, [open]);

  function go(path: string) {
    dialog.current?.close();
    onClose();
    navigate(path);
  }
  return (
    <dialog
      ref={dialog}
      className="command-dialog"
      aria-label="Quick navigation"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="command-input">
        <Search size={20} />
        <input
          ref={input}
          value={query}
          placeholder="Find a project, or jump somewhere…"
          aria-label="Search pages and projects"
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setSelected((value) => Math.min(value + 1, results.length - 1));
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setSelected((value) => Math.max(value - 1, 0));
            }
            if (event.key === 'Enter') {
              event.preventDefault();
              if (results[selected]) go(results[selected].path);
            }
          }}
        />
        <button onClick={onClose} aria-label="Close quick navigation">
          <X size={17} />
        </button>
      </div>
      <div className="command-results">
        {results.length ? (
          results.map((item, i) => (
            <button
              key={item.path}
              className={i === selected ? 'command-selected' : ''}
              onClick={() => go(item.path)}
              onMouseEnter={() => setSelected(i)}
            >
              <span>
                {item.label}
                <small>{item.subtitle}</small>
              </span>
              <ArrowUpRight size={17} />
            </button>
          ))
        ) : (
          <p className="no-results">No results. Try “AI”, “Daivio”, or “contact”.</p>
        )}
      </div>
      <div className="command-footer">
        <span>↑ ↓ to explore · Enter to open</span>
        <span>Esc to close</span>
      </div>
    </dialog>
  );
}

function Home() {
  const [category, setCategory] = useState<Category>('All work');
  const filtered = filterProjects(category);

  return (
    <>
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-eyebrow">
          <span className="eyebrow">
            <span className="status-dot" /> SENIOR BACKEND ENGINEER
          </span>
          <span className="hero-coordinate">23.8103° N · 90.4125° E</span>
        </div>
        <div className="hero-main">
          <div className="hero-copy">
            <h1 id="hero-heading">
              Built for scale.
              <br />
              <em>Made to matter.</em>
            </h1>
            <p>
              I’m Omar. I turn complex problems into reliable
              <br className="desktop-break" /> APIs, data pipelines, and systems that just work.
            </p>
            <div className="hero-cta">
              <Link to="/#work" className="button button-primary">
                Explore my work <ArrowDownRight size={18} />
              </Link>
              <a href={profile.resume} download className="resume-link">
                The résumé <Download size={15} />
              </a>
            </div>
            <div className="hero-location">
              <span className="location-marker">
                <span />
              </span>{' '}
              BASED IN DHAKA <span className="location-divider">/</span> WORKING WORLDWIDE
            </div>
          </div>
          <SystemDiagram />
        </div>
        <div className="hero-bottom">
          <span className="hero-bottom-note">
            GOOD ENGINEERING IS OFTEN INVISIBLE.
            <br />
            <strong>Here’s a closer look at mine.</strong>
          </span>
          <div className="hero-stat">
            <strong>
              5<span>+</span>
            </strong>
            <span>
              YEARS OF
              <br />
              BUILDING & SHIPPING
            </span>
          </div>
          <div className="hero-stat">
            <strong>06</strong>
            <span>
              SELECTED
              <br />
              PROJECT STORIES
            </span>
          </div>
          <Link to="/#work" className="scroll-cue" aria-label="Scroll to selected work">
            <ArrowDown size={20} />
          </Link>
        </div>
      </section>

      <div className="stack-strip">
        <div className="container stack-inner">
          <span className="stack-label">MY EVERYDAY TOOLKIT</span>
          <div className="stack-items">
            <span>Python</span>
            <span className="stack-dot">·</span>
            <span>Django</span>
            <span className="stack-dot">·</span>
            <span>PostgreSQL</span>
            <span className="stack-dot">·</span>
            <span>Celery</span>
            <span className="stack-dot">·</span>
            <span>AWS</span>
            <span className="stack-dot">·</span>
            <span>Docker</span>
          </div>
          <span className="stack-end">THE RIGHT TOOL. NOT EVERY TOOL.</span>
        </div>
      </div>

      <section
        className="work-section container section-space"
        id="work"
        aria-labelledby="work-heading"
      >
        <SectionLabel number="01">SELECTED WORK</SectionLabel>
        <div className="section-heading-row">
          <h2 id="work-heading">
            Not just code.
            <br />
            <em>Things that work.</em>
          </h2>
          <p>
            Different domains. The same intention:
            <br />
            make the complicated feel simple.
          </p>
        </div>
        <div className="work-toolbar">
          <div className="work-filters" aria-label="Filter projects">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? 'filter-active' : ''}
                aria-pressed={category === item}
              >
                {item}
                {item === 'All work' && <span>06</span>}
              </button>
            ))}
          </div>
          <span className="work-count" aria-live="polite">
            {String(filtered.length).padStart(2, '0')} PROJECTS / A CLOSER LOOK
          </span>
        </div>
        <div className="project-grid">
          {filtered.map((project) => (
            <Link
              className="project-card"
              to={`/work/${project.slug}`}
              key={project.slug}
              aria-label={`Read the ${project.name} case study`}
            >
              <ProjectVisual project={project} />
              <div className="project-card-content">
                <div className="project-card-meta">
                  <span>{project.discipline}</span>
                  <span>/{project.number}</span>
                </div>
                <div className="project-card-title">
                  <h3>{project.name}</h3>
                  <span className="project-link-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <p>{project.summary}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="work-footnote">
          <span>
            <span className="tiny-cross">+</span> BUILT WITH TEAMS. PRESENTED THROUGH MY
            CONTRIBUTIONS.
          </span>
          <span>Illustrations are conceptual; project details are résumé-based.</span>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="container about-inner">
          <div className="about-intro">
            <SectionLabel number="02">THE PERSON BEHIND THE SYSTEMS</SectionLabel>
            <h2 id="about-heading">
              A backend mind.
              <br />
              <em>A bigger picture.</em>
            </h2>
            <p className="about-lead">
              I like the part of engineering where the pieces finally fit together.
            </p>
            <p>
              For over five years, I’ve worked on production backends—from CRM and ERP platforms to
              AI-assisted products. My sweet spot is Python and Django, thoughtful data models, and
              moving the heavy lifting into the background.
            </p>
            <p>
              Today, I’m a Senior Backend Engineer at <a href="#experience">Daivio</a>,
              collaborating remotely with a team in Germany. I care about the whole path from a
              database decision to the person using the product.
            </p>
            <div className="about-signature">
              <span>Omar.</span>
              <div>
                DHAKA, BANGLADESH
                <br />
                LOCAL ROOTS. GLOBAL COLLABORATION.
              </div>
            </div>
            <div className="about-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> GitHub <ArrowUpRight size={13} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <div className="experience-block" id="experience">
            <div className="experience-label">
              <span className="eyebrow">THE JOURNEY SO FAR</span>
              <span>2022 → NOW</span>
            </div>
            {experience.map((job) => (
              <article
                className={`experience-item ${job.current ? 'current-job' : ''}`}
                key={job.company}
              >
                <div className="experience-date">
                  <span>{job.date}</span>
                  {job.current && <span className="current-badge">CURRENT</span>}
                </div>
                <h3>
                  {job.company}
                  <ArrowUpRight size={17} />
                </h3>
                <div className="experience-role">
                  {job.role}
                  <span>{job.location}</span>
                </div>
                <p>{job.detail}</p>
              </article>
            ))}
            <a href={profile.resume} download className="experience-resume">
              The full story, on one résumé <Download size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="craft-section container section-space" aria-labelledby="craft-heading">
        <SectionLabel number="03">TOOLS, WITH INTENTION</SectionLabel>
        <div className="craft-layout">
          <div className="craft-copy">
            <h2 id="craft-heading">
              Solid foundations.
              <br />
              <em>Room to grow.</em>
            </h2>
            <p>
              I work across the stack, but my home is the backend. These are the tools and practices
              I bring to the table.
            </p>
            <div className="education-card">
              <span className="eyebrow">ALWAYS LEARNING</span>
              <h3>
                B.Sc. in Computer Science
                <br />& Engineering
              </h3>
              <p>Northern University Bangladesh</p>
              <span>DEC 2023 — MAR 2026</span>
              <div className="education-secondary">
                <strong>Diploma · Data Telecommunication & Networking</strong>
                <span>Feni Govt. Computer Institute · 2019–2023</span>
              </div>
            </div>
          </div>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div className="skill-group" key={skill.label}>
                <span className="skill-index">0{i + 1}</span>
                <h3>{skill.label}</h3>
                <div>
                  {skill.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="languages-row">
              <span>ALSO, HUMAN LANGUAGES</span>
              <p>
                English <small>Fluent</small>
                <span>·</span> Bengali <small>Native</small>
                <span>·</span> Hindi <small>Conversational</small>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container contact-inner">
        <SectionLabel number="04">GOOD THINGS START WITH A CONVERSATION</SectionLabel>
        <div className="contact-heading-row">
          <h2 id="contact-heading">
            Have something
            <br />
            <em>worth building?</em>
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${profile.email}`}
            aria-label="Email Omar about your project"
          >
            <ArrowUpRight size={56} strokeWidth={1.2} />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <p>
              A thoughtful project. A tricky backend. A great team.
              <br />
              I’d love to hear what you have in mind.
            </p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
              <span role="status">
                {copied ? 'Copied!' : copyError ? 'Please select and copy the email.' : ''}
              </span>
            </div>
          </div>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight size={16} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} />
            </a>
            <a href={profile.resume} download>
              Résumé <Download size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <article className="case-study container">
        <Link to="/#work" className="back-link">
          <ArrowLeft size={15} /> BACK TO SELECTED WORK
        </Link>
        <div className="case-topline">
          <SectionLabel number={project.number}>{project.discipline}</SectionLabel>
          <span className="case-type">ENGINEERING CASE STUDY</span>
        </div>
        <div className="case-title-row">
          <div>
            <h1>
              {project.name}
              <span>
                {project.subtitle.split('\n').map((line, i) => (
                  <span key={line}>{i === 1 ? <em>{line}</em> : line}</span>
                ))}
              </span>
            </h1>
          </div>
          <div className="case-intro">
            <p>{project.summary}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <ProjectVisual project={project} large />
        <div className="case-facts">
          <div>
            <span>MY ROLE</span>
            <strong>
              {project.slug === 'daivio' ? 'Senior Backend Engineer' : 'Backend development'}
            </strong>
          </div>
          <div>
            <span>DOMAIN</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>THE FOCUS</span>
            <strong>Systems behind the experience</strong>
          </div>
          <div>
            <span>INFORMATION SOURCE</span>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              Résumé, 2026 <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="case-body">
          <aside className="case-sidebar">
            <span className="eyebrow">INSIDE THIS STORY</span>
            <a href="#context">01 / The context</a>
            <a href="#challenge">02 / The challenge</a>
            <a href="#contribution">03 / My contribution</a>
            <a href="#architecture">04 / The system, simply</a>
            <a href="#perspective">05 / Engineering perspective</a>
          </aside>
          <div className="case-narrative">
            <section id="context">
              <SectionLabel number="01">THE CONTEXT</SectionLabel>
              <h2>A little background.</h2>
              <p>{project.context}</p>
            </section>
            <section id="challenge">
              <SectionLabel number="02">THE CHALLENGE</SectionLabel>
              <h2>Where it gets interesting.</h2>
              <p>{project.challenge}</p>
            </section>
            <section id="contribution">
              <SectionLabel number="03">MY CONTRIBUTION</SectionLabel>
              <h2>The work behind the work.</h2>
              <div className="contribution-list">
                {project.contributions.map((item, i) => (
                  <div key={item.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id="architecture">
              <SectionLabel number="04">THE SYSTEM, SIMPLY</SectionLabel>
              <h2>Follow the flow.</h2>
              <div className="case-flow">
                {project.flow.map((step, i) => (
                  <div key={step}>
                    <span>0{i + 1}</span>
                    <strong>{step}</strong>
                    {i !== project.flow.length - 1 && <ChevronRight size={18} />}
                  </div>
                ))}
              </div>
              <p className="case-diagram-note">
                A simplified, conceptual workflow based on the résumé. It is not a production
                architecture diagram and does not disclose proprietary details.
              </p>
            </section>
            <section id="perspective" className="perspective-section">
              <SectionLabel number="05">ENGINEERING PERSPECTIVE</SectionLabel>
              <h2>Beyond the implementation.</h2>
              <p>{project.perspective}</p>
              <div className="next-step">
                <span className="eyebrow">
                  <ArrowUpRight size={14} /> A POSSIBLE NEXT CHAPTER
                </span>
                <p>{project.nextStep}</p>
              </div>
            </section>
            <div className="case-honesty">
              <LockIcon />
              <p>
                This story focuses on my documented backend contributions. Diagrams simplify the
                workflow, forward-looking ideas are clearly labelled, and proprietary implementation
                details stay private.
              </p>
            </div>
          </div>
        </div>
      </article>
      <section className="next-project container">
        <div>
          <span className="eyebrow">NEXT PROJECT / {nextProject.number}</span>
          <Link to={`/work/${nextProject.slug}`}>
            <h2>{nextProject.name}</h2>
            <ArrowUpRight size={44} strokeWidth={1.3} />
          </Link>
          <p>{nextProject.summary}</p>
        </div>
      </section>
      <Contact />
    </>
  );
}

function LockIcon() {
  return <span className="honesty-icon">↳</span>;
}

function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 / A LITTLE OFF THE PATH</span>
      <h1>
        No system is perfect.
        <br />
        <em>This page is missing.</em>
      </h1>
      <p>Let’s get you back to something worth exploring.</p>
      <Link to="/" className="button button-primary">
        Back to the portfolio <ArrowRight size={17} />
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-brand">
          or<span>.</span>
        </Link>
        <span>© {new Date().getFullYear()} OMAR RAYHAN UDDIN</span>
        <span className="footer-note">THOUGHTFUL SYSTEMS. HUMAN IMPACT.</span>
        <a href="#top" className="back-to-top">
          BACK TO TOP <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}

function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const project = projects.find((item) => pathname === `/work/${item.slug}`);
    const title = project
      ? `${project.name} — Case Study | Omar Rayhan Uddin`
      : pathname === '/'
        ? 'Omar Rayhan Uddin — Senior Backend Engineer'
        : 'Page not found | Omar Rayhan Uddin';
    const description =
      project?.summary ??
      'Omar Rayhan Uddin — Senior Backend Engineer. 5+ years building production APIs, async data pipelines, and enterprise platforms with Python, Django, PostgreSQL, and AWS.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const publicUrl = `${new URL(canonical.href).origin}${pathname}`;
      canonical.href = publicUrl;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', publicUrl);
    }
    const frame = requestAnimationFrame(() => {
      if (hash)
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        });
      else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  useEffect(() => {
    function handleKeys(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    }
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header onSearch={() => setPaletteOpen(true)} />
      <RouteEffects />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
