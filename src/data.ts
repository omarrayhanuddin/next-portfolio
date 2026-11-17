export const profile = {
  name: 'Omar Rayhan Uddin',
  shortName: 'Omar Rayhan',
  role: 'Senior Backend Engineer',
  email: 'omarrahim186@gmail.com',
  location: 'Dhaka, Bangladesh',
  github: 'https://github.com/omarrayhanuddin',
  linkedin: 'https://www.linkedin.com/in/omarrayhanuddin',
  resume: '/Omar_Rayhan_Resume_2026.pdf',
};

export type Category = 'All work' | 'AI & data' | 'Enterprise' | 'Platforms';
export const categories: Category[] = ['All work', 'AI & data', 'Enterprise', 'Platforms'];

export type ProjectPreview =
  | {
      type: 'website';
      url: string;
      screenshot?: { src: string; alt: string; capturedOn: string; width: number; height: number };
    }
  | { type: 'internal'; illustration: { src: string; alt: string; width: number; height: number } };

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: Exclude<Category, 'All work'>;
  discipline: string;
  subtitle: string;
  summary: string;
  tags: string[];
  visual: 'data' | 'enterprise' | 'finance' | 'medical' | 'talent' | 'gym';
  preview: ProjectPreview;
  context: string;
  challenge: string;
  contributions: { title: string; detail: string }[];
  flow: string[];
  perspective: string;
  nextStep: string;
};

export const projects: Project[] = [
  {
    slug: 'daivio',
    number: '01',
    name: 'Daivio',
    category: 'AI & data',
    discipline: 'DATA ANALYTICS & AI TRAINING',
    subtitle: 'Making complex data\nwork harder.',
    summary: 'The backend behind dataset ingestion, transformation, and AI training workflows.',
    tags: ['REST APIs', 'PostgreSQL', 'Celery'],
    visual: 'data',
    preview: {
      type: 'website',
      url: 'https://daivio.com/',
      screenshot: {
        src: '/projects/daivio.webp',
        alt: 'Daivio public homepage showing its Microsoft Fabric analytics product.',
        capturedOn: '2026-11-17',
        width: 1440,
        height: 1000,
      },
    },
    context:
      'At Daivio, I work on a data-analytics and AI-training platform in the same problem space as Kaggle. The platform brings together dataset ingestion, processing, and visualisation. My role is to build the backend systems that support those workflows, working with data scientists and frontend engineers.',
    challenge:
      'Data-heavy operations do not fit neatly inside a short HTTP request. Dataset transformations and training triggers can run for a long time, while users still need responsive APIs and a structured way to interact with their data.',
    contributions: [
      {
        title: 'APIs that connect the workflow',
        detail:
          'Built REST APIs for dataset ingestion, transformation, and visualisation workflows, giving frontend and data teams a shared interface to the platform.',
      },
      {
        title: 'Long-running work, off the request path',
        detail:
          'Implemented Celery-based asynchronous pipelines for ETL operations and model-training triggers, separating background processing from interactive requests.',
      },
      {
        title: 'A data layer built with intent',
        detail:
          'Optimised PostgreSQL schemas and queries for large structured datasets and contributed to broader system-architecture decisions.',
      },
    ],
    flow: [
      'Dataset ingestion',
      'REST API',
      'Celery pipeline',
      'PostgreSQL',
      'Analytics / training',
    ],
    perspective:
      'The interesting architectural boundary is between accepting work and completing it. A robust data platform makes that boundary explicit: the API handles interaction, workers handle processing, and the data model carries enough structure to support both. This is a design reading of the work—not a claim about undisclosed implementation details.',
    nextStep:
      'A useful next iteration would be clearer job-state visibility, reproducible dataset versions, and richer pipeline observability. These are proposed improvements, not claims of shipped features.',
  },
  {
    slug: 'dubai-refreshment',
    number: '02',
    name: 'Dubai Refreshment',
    category: 'Enterprise',
    discipline: 'ENTERPRISE & OPERATIONS',
    subtitle: 'Connecting orders.\nSimplifying operations.',
    summary: 'SAP-connected B2B ordering and automated workflows for an enterprise operation.',
    tags: ['SAP integration', 'B2B ordering', 'Automation'],
    visual: 'enterprise',
    preview: {
      type: 'internal',
      illustration: {
        src: '/projects/dubai-refreshment-illustration.svg',
        alt: 'Conceptual illustration of beverage crates, an enterprise integration hub, order documents, and warehouse fulfilment. Not a product screenshot.',
        width: 1440,
        height: 900,
      },
    },
    context:
      'Dubai Refreshment is an enterprise-backend project connecting B2B ordering with SAP and internal operations. My work covered the integration, administration tools, and merchandiser workflows that keep the business moving.',
    challenge:
      'An order is more than a form submission. It needs to cross the boundary between customer-facing tools and enterprise systems, while staff need a manageable view of users, orders, and operational tasks.',
    contributions: [
      {
        title: 'Bridging B2B ordering and SAP',
        detail:
          'Worked on SAP integration for B2B ordering, connecting application workflows with the enterprise system.',
      },
      {
        title: 'Giving operations a control surface',
        detail: 'Built backend capabilities for an admin panel covering order and user management.',
      },
      {
        title: 'Reducing repetitive operational work',
        detail:
          'Automated merchandiser workflows to reduce operational overhead. The résumé reports reduced operational costs; no verified numerical result is available.',
      },
    ],
    flow: ['B2B order', 'Application backend', 'SAP integration', 'Operations / fulfilment'],
    perspective:
      'Enterprise integrations are a contract between two systems with different assumptions. Validation, error visibility, and clear ownership of state are important design considerations. This conceptual lens explains the problem without implying a specific retry, reconciliation, or transaction strategy was implemented.',
    nextStep:
      'An integration-health dashboard and a documented reconciliation workflow would be valuable future improvements, subject to the existing system’s capabilities.',
  },
  {
    slug: 'findoc-ai',
    number: '03',
    name: 'FinDoc AI',
    category: 'AI & data',
    discipline: 'AI-ASSISTED FINANCIAL ANALYSIS',
    subtitle: 'From documents\nto decisions.',
    summary: 'Backend systems for financial-document extraction and AI-assisted risk flagging.',
    tags: ['Document analysis', 'Data extraction', 'Risk flagging'],
    visual: 'finance',
    preview: {
      type: 'website',
      url: 'https://www.findocai.com/',
      screenshot: {
        src: '/projects/findoc-ai.webp',
        alt: 'FinDocAI public homepage introducing AI-powered financial document analysis.',
        capturedOn: '2026-11-17',
        width: 1440,
        height: 1000,
      },
    },
    context:
      'FinDoc AI applies AI-assisted analysis to financial documents. I contributed to the backend systems supporting data extraction and risk flagging, helping connect document inputs with usable analysis outputs.',
    challenge:
      'Financial documents are dense and varied. An analysis product needs to move from unstructured content to information that people can interpret, while keeping the difference between an AI signal and a final human decision clear.',
    contributions: [
      {
        title: 'Supporting document-analysis workflows',
        detail: 'Built backend systems for AI-assisted financial-document analysis.',
      },
      {
        title: 'Making extracted data usable',
        detail: 'Supported workflows for extracting information from financial documents.',
      },
      {
        title: 'Surfacing risk signals',
        detail:
          'Contributed to backend functionality supporting risk flagging as part of the document-analysis process.',
      },
    ],
    flow: [
      'Financial document',
      'Analysis backend',
      'Data extraction',
      'Risk signals',
      'Human review',
    ],
    perspective:
      'For this kind of product, explainability and provenance matter as much as producing an output. A useful engineering principle is to preserve the path from a flag back to the document evidence. This is an engineering perspective, not a verified feature of the project.',
    nextStep:
      'Potential improvements include source-linked findings, confidence indicators, and an explicit review queue. No claims are made about model accuracy or financial outcomes.',
  },
  {
    slug: 'online-spine-ai',
    number: '04',
    name: 'Online-Spine AI',
    category: 'AI & data',
    discipline: 'AI-ASSISTED MEDICAL IMAGING',
    subtitle: 'Engineering behind\nclinical insight.',
    summary: 'Backend support for AI-assisted X-ray and MRI interpretation workflows.',
    tags: ['Medical imaging', 'AI integration', 'Backend systems'],
    visual: 'medical',
    preview: {
      type: 'website',
      url: 'https://www.onlinespine.ai/',
      screenshot: {
        src: '/projects/online-spine-ai.webp',
        alt: 'Online Spine public homepage introducing its spine-health assessment service.',
        capturedOn: '2026-11-17',
        width: 1440,
        height: 1000,
      },
    },
    context:
      'Online-Spine AI is a medical-image analysis project involving X-ray and MRI interpretation. My contribution was backend engineering for the AI-assisted diagnosis workflow—not model development or clinical validation.',
    challenge:
      'Medical-imaging tools need to connect image inputs and analysis outputs in a way that is useful to a clinical workflow. The backend must support that exchange without confusing automated assistance with a clinician’s judgement.',
    contributions: [
      {
        title: 'Connecting imaging and analysis',
        detail: 'Built backend systems supporting AI-assisted medical-image analysis.',
      },
      {
        title: 'Supporting X-ray and MRI workflows',
        detail:
          'Worked on the backend for interpretation workflows involving X-ray and MRI inputs.',
      },
      {
        title: 'Staying within the engineering role',
        detail:
          'The documented contribution is backend development. Clinical accuracy, regulatory certification, and model-training results are not claimed.',
      },
    ],
    flow: [
      'X-ray / MRI input',
      'Application backend',
      'AI-assisted analysis',
      'Interpretation workflow',
    ],
    perspective:
      'Sensitive-domain software benefits from explicit boundaries: who can access an input, how an output is presented, and who makes the final decision. These are architectural considerations rather than claims of audited security or clinical compliance.',
    nextStep:
      'Potential future work includes stronger traceability of analysis versions and clinician feedback loops, with domain specialists involved in validation.',
  },
  {
    slug: 'wright-talent',
    number: '05',
    name: 'Wright Talent',
    category: 'Platforms',
    discipline: 'CAREERS & CANDIDATE PLATFORMS',
    subtitle: 'Better foundations\nfor the next chapter.',
    summary: 'A résumé-builder and job-portal backend with secure candidate management.',
    tags: ['Job portal', 'Résumé builder', 'Candidate management'],
    visual: 'talent',
    preview: {
      type: 'website',
      url: 'https://www.wrightalent.com/',
      screenshot: {
        src: '/projects/wright-talent.webp',
        alt: 'Wrightalent public homepage showing its career search and resume-building platform.',
        capturedOn: '2026-11-17',
        width: 1440,
        height: 1000,
      },
    },
    context:
      'Wright Talent brings together résumé-building and job-portal functionality. I worked on the backend and secure candidate-management capabilities that support the platform.',
    challenge:
      'Career platforms bring together personal information, résumé content, and recruitment workflows. The backend needs to organise those concerns and support the different ways candidates and hiring teams interact with the platform.',
    contributions: [
      {
        title: 'A backend for career workflows',
        detail: 'Built backend functionality for a résumé builder and job portal.',
      },
      {
        title: 'Candidate information, handled carefully',
        detail: 'Implemented secure candidate-management capabilities as described in the résumé.',
      },
      {
        title: 'Supporting the product experience',
        detail:
          'Connected the platform’s résumé and candidate workflows through its backend systems. Detailed permission models and product metrics are not publicly documented.',
      },
    ],
    flow: [
      'Candidate profile',
      'Platform backend',
      'Résumé / job workflows',
      'Candidate management',
    ],
    perspective:
      'The central design concern is ownership: a candidate’s information should remain coherent as it appears in different product flows. Clear data boundaries and permissions help make that possible; the specific project implementation is not detailed in the résumé.',
    nextStep:
      'Useful future directions could include clearer profile-version history and candidate-controlled sharing preferences.',
  },
  {
    slug: 'super-gym',
    number: '06',
    name: 'Super Gym',
    category: 'Platforms',
    discipline: 'IOT & MEMBERSHIP SYSTEMS',
    subtitle: 'Digital memberships.\nPhysical access.',
    summary: 'An IoT-enabled gym-access and membership platform with automated renewals.',
    tags: ['IoT access', 'Memberships', 'Automated renewals'],
    visual: 'gym',
    preview: {
      type: 'internal',
      illustration: {
        src: '/projects/super-gym-illustration.svg',
        alt: 'Conceptual illustration of a gym access gate, contactless membership card, dumbbell, and connected backend devices. Not a product screenshot.',
        width: 1440,
        height: 900,
      },
    },
    context:
      'Super Gym connects membership software with real-world gym access. I worked on an IoT-enabled access and membership system, including automated renewal workflows.',
    challenge:
      'Membership state has a physical consequence: whether someone can enter a facility. The application needs to connect membership workflows with IoT-enabled access and keep recurring membership administration manageable.',
    contributions: [
      {
        title: 'Connecting software to the entrance',
        detail: 'Built backend functionality for an IoT-enabled gym-access system.',
      },
      {
        title: 'Managing the membership lifecycle',
        detail: 'Supported membership-management workflows within the platform.',
      },
      {
        title: 'Automating renewals',
        detail:
          'Implemented automated membership renewals to reduce repetitive administration. Device protocols and payment-provider details are not specified in the résumé.',
      },
    ],
    flow: ['Membership state', 'Platform backend', 'IoT access', 'Gym entry'],
    perspective:
      'Connected systems need to account for the gap between a software decision and a physical event. Connectivity, stale state, and access-policy clarity are useful design questions—not assertions about the project’s device-level implementation.',
    nextStep:
      'Potential future improvements include richer access-event visibility and a carefully defined fallback policy for intermittent connectivity.',
  },
];

export const experience = [
  {
    company: 'Daivio',
    role: 'Senior Backend Engineer',
    date: 'JAN 2026 — PRESENT',
    location: 'Germany · Remote',
    current: true,
    detail:
      'Data-intensive platforms for AI training and dataset analytics. REST APIs, async ETL pipelines, and PostgreSQL optimisation.',
  },
  {
    company: 'Maptoway',
    role: 'Backend Engineer',
    date: 'JUN 2025 — JAN 2026',
    location: 'Dhaka · Contract',
    current: false,
    detail:
      'Project-based REST and GraphQL APIs, PostgreSQL schema design, and close collaboration on frontend API contracts.',
  },
  {
    company: 'W3Kernel',
    role: 'Backend Engineer',
    date: 'FEB 2022 — JUN 2025',
    location: 'Dubai · Remote',
    current: false,
    detail:
      'CRM and ERP platforms, REST and GraphQL APIs, legacy performance improvements, and AWS cloud deployments.',
  },
];

export const skills = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'Go'] },
  { label: 'Backend', items: ['Django', 'DRF', 'FastAPI', 'Gin', 'Graphene Django'] },
  { label: 'Data & async', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Celery'] },
  { label: 'Infrastructure', items: ['AWS · EC2 / S3 / Lambda', 'Docker', 'Git'] },
  {
    label: 'Interfaces & practices',
    items: ['REST', 'GraphQL', 'WebSocket', 'TDD', 'Agile / Scrum'],
  },
  { label: 'Frontend familiarity', items: ['React', 'Next.js'] },
];

export function filterProjects(category: Category, query = '') {
  const term = query.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (category === 'All work' || project.category === category) &&
      `${project.name} ${project.summary} ${project.tags.join(' ')}`.toLowerCase().includes(term),
  );
}
