'use client';

import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ContactActions({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    timer.current = setTimeout(() => setStatus('idle'), 3500);
  }

  return (
    <div className="contact-controls">
      <a href={`mailto:${email}`} className="button button-primary contact-email">
        <span>{email}</span><ArrowUpRight size={17} />
      </a>
      <button type="button" className="button button-secondary" onClick={copy}>
        {status === 'copied' ? <Check size={16} /> : <Copy size={16} />}
        {status === 'copied' ? 'Copied' : 'Copy email'}
      </button>
      <span role="status" className="sr-only">{status === 'copied' ? 'Email copied' : status === 'failed' ? 'Copy unavailable. Select the email address to copy it.' : ''}</span>
      {status === 'failed' && <span aria-hidden="true" className="contact-address">Clipboard unavailable</span>}
    </div>
  );
}
