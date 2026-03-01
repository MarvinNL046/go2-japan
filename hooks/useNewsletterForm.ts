import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    if (status === 'error') setStatus('idle');
  };

  return { email, setEmail: updateEmail, status, handleSubmit };
}
