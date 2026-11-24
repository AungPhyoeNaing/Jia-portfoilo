'use client';

import { Box, Image as ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const SculptureScene = dynamic(() => import('./sculpture-scene'), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function Sculpture({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const markFailed = useCallback(() => {
    setFailed(true);
    setReady(false);
    setInteractive(false);
  }, []);

  useEffect(() => {
    const media = matchMedia('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const constrained = (device.deviceMemory ?? 8) < 4 || (device.hardwareConcurrency || 8) < 4 || device.connection?.saveData;
    function update() {
      setEligible(media.matches && !constrained && Boolean(window.WebGL2RenderingContext));
    }
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!interactive || !frame.current) return;
    let onScreen = true;
    function update() { setVisible(onScreen && !document.hidden); }
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(frame.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [interactive]);

  const live = interactive && eligible && !failed;

  return (
    <div className={`sculpture${live && ready ? ' sculpture-live' : ''}`} ref={frame}>
      <div className="sculpture-still">{children}</div>
      {live && (
        <div className="sculpture-model" aria-hidden="true">
          <SceneBoundary onFailure={markFailed}>
            <SculptureScene running={visible} onReady={markReady} onFailure={markFailed} />
          </SceneBoundary>
        </div>
      )}
      {(eligible && !failed) && (
        <button className="sculpture-toggle glass glass-crystal mono" type="button" aria-pressed={live}
          onClick={() => { setReady(false); setInteractive(!live); }}>
          {live ? <ImageIcon size={16} /> : <Box size={16} />}
          {live ? 'View still' : 'Explore in 3D'}
        </button>
      )}
      <span className="sr-only" role="status">{failed ? '3D is unavailable. The still image is displayed.' : live && !ready ? 'Loading sculpture' : live ? 'Interactive sculpture displayed' : ''}</span>
    </div>
  );
}
