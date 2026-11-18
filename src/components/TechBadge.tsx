import type { CSSProperties } from 'react';
import {
  Braces,
  Building2,
  Cloud,
  Code2,
  FileSearch,
  FileText,
  Layers3,
  Network,
  Nfc,
  PlugZap,
  RefreshCw,
  Server,
  ShieldAlert,
  Sparkles,
  TestTubeDiagonal,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import {
  siCelery,
  siDjango,
  siDocker,
  siFastapi,
  siGin,
  siGit,
  siGo,
  siGraphql,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
} from 'simple-icons';

type TechnologyIcon = {
  color: string;
  path?: string;
  symbol?: LucideIcon;
  label?: string;
  detail?: string;
};

// Brand paths are bundled locally. Symbols distinguish non-brand practices and domains.
export const technologyIcons: Record<string, TechnologyIcon> = {
  Python: { path: siPython.path, color: '#7eaddb' },
  JavaScript: { path: siJavascript.path, color: '#f7df1e' },
  Go: { path: siGo.path, color: '#5ac7db' },
  Django: { path: siDjango.path, color: '#87c49b' },
  DRF: { path: siDjango.path, color: '#a1d6af' },
  FastAPI: { path: siFastapi.path, color: '#53c8b1' },
  Gin: { path: siGin.path, color: '#81cec0' },
  'Graphene Django': { symbol: Network, color: '#dc9bcc' },
  PostgreSQL: { path: siPostgresql.path, color: '#8eb7df' },
  MySQL: { path: siMysql.path, color: '#d9af76' },
  MongoDB: { path: siMongodb.path, color: '#7ac974' },
  Redis: { path: siRedis.path, color: '#f17975' },
  Celery: { path: siCelery.path, color: '#a7d387' },
  'AWS · EC2 / S3 / Lambda': {
    symbol: Cloud,
    color: '#f6bf72',
    label: 'AWS',
    detail: 'EC2 · S3 · Lambda',
  },
  AWS: { symbol: Cloud, color: '#f6bf72' },
  Docker: { path: siDocker.path, color: '#69b9f2' },
  Git: { path: siGit.path, color: '#f29177' },
  REST: { symbol: Braces, color: '#b5d5a5' },
  'REST APIs': { symbol: Braces, color: '#b5d5a5' },
  GraphQL: { path: siGraphql.path, color: '#ef9ed0' },
  WebSocket: { symbol: PlugZap, color: '#b8c7fa' },
  TDD: { symbol: TestTubeDiagonal, color: '#a4d9c2' },
  'Agile / Scrum': { symbol: Workflow, color: '#e6c28b' },
  React: { path: siReact.path, color: '#61dafb' },
  'Next.js': { path: siNextdotjs.path, color: '#e6ede5' },
  'SAP integration': { symbol: Building2, color: '#e7bc78' },
  'B2B ordering': { symbol: Building2, color: '#dfc29a' },
  Automation: { symbol: Workflow, color: '#c3ed91' },
  'Document analysis': { symbol: FileSearch, color: '#a6cba9' },
  'Data extraction': { symbol: FileText, color: '#b4d3ab' },
  'Risk flagging': { symbol: ShieldAlert, color: '#e9bc91' },
  'Medical imaging': { symbol: Layers3, color: '#a1d5db' },
  'AI integration': { symbol: Sparkles, color: '#b7cedb' },
  'Backend systems': { symbol: Server, color: '#acc9cc' },
  'Job portal': { symbol: Users, color: '#d0b8e4' },
  'Résumé builder': { symbol: FileText, color: '#c9afea' },
  'Candidate management': { symbol: Users, color: '#d4c2e3' },
  'IoT access': { symbol: Nfc, color: '#d7e895' },
  Memberships: { symbol: Users, color: '#c7dc9d' },
  'Automated renewals': { symbol: RefreshCw, color: '#bad69d' },
};

export default function TechBadge({ name, className = '' }: { name: string; className?: string }) {
  const definition: TechnologyIcon = technologyIcons[name] ?? { symbol: Code2, color: '#c3d3b7' };
  const Symbol = definition.symbol;
  return (
    <span
      className={`tech-badge ${className}`}
      data-tech={name}
      style={{ '--tech-color': definition.color } as CSSProperties}
    >
      <span
        className="tech-mark"
        aria-hidden="true"
        data-icon-kind={definition.path ? 'brand' : 'symbol'}
      >
        {definition.path ? (
          <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
            <path d={definition.path} />
          </svg>
        ) : Symbol ? (
          <Symbol size={18} strokeWidth={1.7} />
        ) : null}
      </span>
      <span className="tech-label">
        {definition.label ?? name}
        {definition.detail && <small>{definition.detail}</small>}
      </span>
    </span>
  );
}
