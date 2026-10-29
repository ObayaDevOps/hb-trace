'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    if (!supabase) {
      setMessage('Hosted authentication is not configured. Local mode uses the demo staff workspace.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    router.push('/staff');
    router.refresh();
  }

  return (
    <main className="auth-page">
      <Card className="auth-card" role="region" aria-labelledby="login-title">
        <CardContent>
        <Link className="auth-back" href="/">← HB-TRACE</Link>
        <p className="eyebrow">Staff access</p>
        <h1 id="login-title">Sign in to the operations workspace.</h1>
        <p className="auth-copy">Hosted mode checks your server-side identity and application role before showing staff records.</p>
        <form className="auth-form" onSubmit={submit}>
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <Button className="primary-button" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</Button>
        </form>
        {message ? <Alert variant="destructive" className="auth-message">{message}</Alert> : null}
        {!supabase ? (
          <p className="auth-local-note"><strong>Local mode:</strong> no credentials are needed for the demo. <Link href="/staff">Open demo workspace</Link>.</p>
        ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
