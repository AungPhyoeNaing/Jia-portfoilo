'use client';

import { ArrowDownRight, Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { process } from '@/data/profile';

export function Process() {
  const [open, setOpen] = useState<number | null>(0);
  const interacted = useRef(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = panel.current;
    if (!interacted.current || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let active = true;
    let stop: (() => void) | undefined;
    void import('motion/mini').then(({ animate }) => {
      if (!active) return;
      const controls = animate(target, { opacity: [0.55, 1], transform: ['translateY(6px)', 'translateY(0)'] }, {
        duration: 0.25, ease: [0.22, 1, 0.36, 1],
      });
      stop = () => controls.stop();
    });
    return () => { active = false; stop?.(); };
  }, [open]);

  return (
    <ol className="process-list">
      {process.map((step, index) => (
        <li key={step.name} className={open === index ? 'process-open' : undefined}>
          <h3>
            <button type="button" id={`step-${index}`} aria-expanded={open === index} aria-controls={`step-content-${index}`}
              onClick={() => { interacted.current = true; setOpen(open === index ? null : index); }}>
              <span className="mono process-number">0{index + 1}</span>
              <span>{step.name}</span>
              <span className="process-icon">{open === index ? <Minus size={20} /> : <Plus size={20} />}</span>
            </button>
          </h3>
          <div id={`step-content-${index}`} hidden={open !== index} className="process-details">
            {open === index && <div ref={panel}>
              <p>{step.description}</p>
              <p className="process-artifact"><ArrowDownRight size={14} />{step.artifact}</p>
            </div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
