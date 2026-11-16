import {
  Activity,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Fingerprint,
  LockKeyhole,
  MoreHorizontal,
  Search,
  Sparkles,
} from 'lucide-react';
import type { Project } from '../data';

export default function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${project.visual} ${large ? 'visual-large' : ''}`}
      aria-hidden="true"
    >
      <div className="visual-grain" />
      {project.visual === 'data' && (
        <>
          <div className="data-orbit orbit-one" />
          <div className="data-orbit orbit-two" />
          <div className="mock-window data-window">
            <div className="mock-titlebar">
              <span className="mock-brand">
                <span className="data-brand">d.</span> daivio
              </span>
              <span className="mock-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="data-window-content">
              <div className="mock-sidebar">
                <span className="sidebar-line active" />
                <span className="sidebar-line" />
                <span className="sidebar-line" />
                <span className="sidebar-line short" />
                <span className="sidebar-line" />
              </div>
              <div className="data-main">
                <div className="mock-heading">
                  Your data. More possibilities.<span>Dataset workspace</span>
                </div>
                <div className="data-stat-row">
                  <div>
                    <span>PIPELINE</span>
                    <strong>
                      Ready <i />
                    </strong>
                  </div>
                  <div>
                    <span>WORKSPACE</span>
                    <strong>Connected</strong>
                  </div>
                </div>
                <div className="mock-chart">
                  <div className="chart-grid" />
                  {[25, 44, 35, 60, 48, 71, 58, 82, 69, 92, 78, 100].map((height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="mock-chart-caption">
                  <span>INGEST</span>
                  <span>TRANSFORM</span>
                  <span>EXPLORE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-label data-float">
            <CheckCircle2 size={13} />
            <span>Background job complete</span>
            <span className="float-time">just now</span>
          </div>
        </>
      )}
      {project.visual === 'enterprise' && (
        <>
          <div className="enterprise-grid" />
          <div className="mock-window enterprise-window">
            <div className="mock-titlebar">
              <span className="mock-brand">
                <span className="enterprise-brand">DR</span> Operations workspace
              </span>
              <MoreHorizontal size={15} />
            </div>
            <div className="enterprise-content">
              <span className="mock-eyebrow">B2B ORDER MANAGEMENT</span>
              <div className="mock-heading">One connected operation.</div>
              <div className="order-table">
                <div className="table-header">
                  <span>ORDER</span>
                  <span>CHANNEL</span>
                  <span>STATUS</span>
                </div>
                {['B2B ordering', 'SAP integration', 'Merchandiser flow'].map((label, i) => (
                  <div className="table-row" key={label}>
                    <span>
                      <span className="order-icon">{String(i + 1).padStart(2, '0')}</span>
                      {label}
                    </span>
                    <span>{['Business', 'Enterprise', 'Field'][i]}</span>
                    <span className="order-status">
                      <Check size={10} /> Connected
                    </span>
                  </div>
                ))}
              </div>
              <div className="enterprise-footer">
                <span className="status-dot" /> Fewer manual steps. Clearer workflows.
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
          <div className="floating-label enterprise-float">
            <span className="sap-label">SAP</span>
            <span>Connected by design</span>
            <span className="connection-dot" />
          </div>
        </>
      )}
      {project.visual === 'finance' && (
        <div className="finance-composition">
          <div className="document-sheet">
            <div className="document-heading">
              <FileText size={18} />
              <span>FINANCIAL REPORT</span>
            </div>
            <div className="document-lines">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="document-highlight" />
            <div className="document-lines bottom">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="analysis-panel">
            <span className="mock-eyebrow">
              <Sparkles size={12} /> FINDOC AI
            </span>
            <strong>Beyond the fine print.</strong>
            <div className="analysis-item">
              <Search size={14} />
              <span>Extract information</span>
            </div>
            <div className="analysis-item">
              <Activity size={14} />
              <span>Surface risk signals</span>
            </div>
            <div className="analysis-item">
              <CheckCircle2 size={14} />
              <span>Support human review</span>
            </div>
          </div>
        </div>
      )}
      {project.visual === 'medical' && (
        <div className="medical-composition">
          <div className="scan-frame">
            <span className="scan-cross tl">+</span>
            <span className="scan-cross tr">+</span>
            <span className="scan-cross bl">+</span>
            <span className="scan-cross br">+</span>
            <div className="spine">
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    transform: `translateX(${Math.sin(i * 0.6) * 9}px) rotate(${Math.cos(i * 0.6) * 5}deg)`,
                    opacity: 0.45 + i * 0.055,
                  }}
                />
              ))}
            </div>
            <div className="scan-line" />
            <span className="scan-caption">CONCEPTUAL IMAGING STUDY</span>
          </div>
          <div className="medical-label">
            <Activity size={16} />
            <span>
              Intelligence meets care.<small>AI-ASSISTED INTERPRETATION</small>
            </span>
          </div>
        </div>
      )}
      {project.visual === 'talent' && (
        <div className="talent-composition">
          <div className="talent-resume">
            <span className="resume-avatar" />
            <div className="resume-name-line" />
            <div className="resume-sub-line" />
            <div className="document-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="resume-section">EXPERIENCE</span>
            <div className="document-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="resume-section">SKILLS</span>
            <div className="resume-skills">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="talent-card">
            <span className="mock-eyebrow">WRIGHT TALENT</span>
            <strong>
              Your next
              <br />
              chapter starts here.
            </strong>
            <span className="talent-lock">
              <LockKeyhole size={13} /> Candidate-first foundations
            </span>
            <span className="talent-arrow">
              <ArrowRight size={20} />
            </span>
          </div>
        </div>
      )}
      {project.visual === 'gym' && (
        <div className="gym-composition">
          <div className="gym-orbit" />
          <div className="membership-card">
            <div className="membership-top">
              <span>
                SUPER
                <br />
                <b>GYM.</b>
              </span>
              <span className="membership-symbol">↗</span>
            </div>
            <div className="membership-chip">
              <Fingerprint size={32} strokeWidth={1.3} />
            </div>
            <div className="membership-bottom">
              <span>MEMBERSHIP, CONNECTED.</span>
              <span>•••• 0106</span>
            </div>
          </div>
          <div className="floating-label access-label">
            <span className="access-icon">
              <Check size={15} />
            </span>
            <div>
              Software → physical access<small>IOT-ENABLED MEMBERSHIPS</small>
            </div>
          </div>
        </div>
      )}
      <span className="visual-caption">CONCEPT STUDY / NOT A PRODUCT SCREENSHOT</span>
      <span className="visual-corner">
        {project.number} <span>↗</span>
      </span>
    </div>
  );
}
