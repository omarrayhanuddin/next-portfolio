import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Braces, Check, Database, Layers3, Play, Workflow } from 'lucide-react';

const stages = [
  'Request accepted',
  'Background job queued',
  'Dataset processed',
  'Result persisted',
];

export default function SystemDiagram() {
  const [stage, setStage] = useState(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const running = stage >= 0 && stage < 4;

  useEffect(() => {
    if (running) timer.current = setTimeout(() => setStage((value) => value + 1), 650);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [stage, running]);

  return (
    <div className={`system-diagram ${running ? 'is-running' : ''}`}>
      <div className="diagram-topline">
        <span>
          <span className="tiny-cross">+</span> REQUEST FLOW
        </span>
        <span>TRY IT</span>
      </div>
      <div
        className="diagram-canvas"
        aria-label="Conceptual architecture: a client request passes through an API to a job queue, worker, and database"
      >
        <svg
          className="diagram-lines"
          viewBox="0 0 480 340"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M240 57V97M240 151V182M240 182H120V222M240 182H360V222M166 250H312M360 278V307H240V320" />
          <path className="diagram-flow" d="M240 57V97M240 151V182H120V222M166 250H312" />
          <circle cx="240" cy="182" r="4" />
          <circle cx="240" cy="307" r="3" />
        </svg>
        <div className={`diagram-client ${stage >= 0 ? 'node-active' : ''}`}>
          <span className="node-dot" /> client.request()
        </div>
        <div className={`diagram-node api-node ${stage >= 0 ? 'node-active' : ''}`}>
          <Braces size={19} />
          <div>
            <strong>API layer</strong>
            <span>VALIDATE · ROUTE</span>
          </div>
          <span className="node-live" />
        </div>
        <div className={`diagram-node worker-node ${stage >= 1 ? 'node-active' : ''}`}>
          <Workflow size={19} />
          <div>
            <strong>Async workers</strong>
            <span>QUEUE · PROCESS</span>
          </div>
        </div>
        <div className={`diagram-node database-node ${stage >= 3 ? 'node-active' : ''}`}>
          <Database size={19} />
          <div>
            <strong>Data layer</strong>
            <span>STORE · OPTIMISE</span>
          </div>
        </div>
        <div className="diagram-queue">
          <Layers3 size={12} /> job queue
        </div>
        <span className="diagram-output">
          built to keep things moving <ArrowUpRight size={12} />
        </span>
        <span className="diagram-mark mark-one">+</span>
        <span className="diagram-mark mark-two">+</span>
      </div>
      <div className="diagram-bottomline">
        <div aria-live="polite">
          <span className="status-dot" />
          <span>
            {stage === -1
              ? 'READY TO RUN'
              : stage === 4
                ? 'COMPLETE · BACK TO THE USER'
                : stages[stage].toUpperCase()}
          </span>
        </div>
        <button
          className="diagram-run"
          onClick={() => setStage(0)}
          disabled={running}
          aria-label="Run a simulated request through the diagram"
        >
          {stage === 4 ? <Check size={12} /> : <Play size={10} fill="currentColor" />}{' '}
          {running ? 'RUNNING' : stage === 4 ? 'RUN AGAIN' : 'RUN REQUEST'}
        </button>
      </div>
      <span className="diagram-note">An interactive sketch, not a live production system.</span>
    </div>
  );
}
