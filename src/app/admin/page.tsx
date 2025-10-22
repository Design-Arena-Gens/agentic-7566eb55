"use client";
import { useEffect, useState } from 'react';
import { SiteContent } from '@/types/content';

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true); setStatus(null);
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${password}`,
      },
      body: JSON.stringify(content)
    });
    if (res.ok) { setStatus('Saved'); setAuthorized(true); } else setStatus('Error saving');
    setSaving(false);
  }

  if (!content) return <main className="container section"><p>Loading…</p></main>;

  return (
    <main className="container section" style={{ display: 'grid', gap: 16 }}>
      <h1>Admin</h1>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <label className="label">Admin password</label>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
      </div>

      <section className="card" style={{ display: 'grid', gap: 12 }}>
        <h2>Hero</h2>
        <input className="input" value={content.hero.headline} onChange={e => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })} />
        <textarea className="input" rows={3} value={content.hero.subheadline} onChange={e => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })} />
        <div className="form-row">
          <input className="input" value={content.hero.ctaPrimary} onChange={e => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })} />
          <input className="input" value={content.hero.ctaSecondary} onChange={e => setContent({ ...content, hero: { ...content.hero, ctaSecondary: e.target.value } })} />
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 12 }}>
        <h2>Services</h2>
        {content.services.map((s, idx) => (
          <div key={s.id} className="card" style={{ display: 'grid', gap: 8 }}>
            <div className="form-row">
              <input className="input" value={s.title} onChange={e => {
                const next = [...content.services]; next[idx] = { ...s, title: e.target.value }; setContent({ ...content, services: next });
              }} />
              <input className="input" value={s.icon} onChange={e => {
                const next = [...content.services]; next[idx] = { ...s, icon: e.target.value }; setContent({ ...content, services: next });
              }} />
            </div>
            <textarea className="input" rows={2} value={s.description} onChange={e => {
              const next = [...content.services]; next[idx] = { ...s, description: e.target.value }; setContent({ ...content, services: next });
            }} />
          </div>
        ))}
      </section>

      <section className="card" style={{ display: 'grid', gap: 12 }}>
        <h2>Contact</h2>
        <div className="form-row">
          <input className="input" value={content.contact.email} onChange={e => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} />
          <input className="input" value={content.contact.phone} onChange={e => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })} />
        </div>
        <input className="input" value={content.contact.address} onChange={e => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })} />
      </section>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn" onClick={save} disabled={saving}>{saving ? 'Saving…' : authorized ? 'Save changes' : 'Authorize & Save'}</button>
        {status && <span style={{ color: 'var(--muted)' }}>{status}</span>}
      </div>
    </main>
  );
}
