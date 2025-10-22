"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import content from '../data/content.json';

export default function HomePage() {
  return (
    <main>
      <section className="section container" aria-labelledby="hero-heading">
        <div className="badge reveal">Sri Lanka • Remote worldwide</div>
        <h1 id="hero-heading" className="hero-title reveal-2 reveal">
          {content.hero.headline}
        </h1>
        <p className="hero-sub reveal-3 reveal">{content.hero.subheadline}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }} className="reveal-3 reveal">
          <Link href="#contact" className="btn">{content.hero.ctaPrimary}</Link>
          <Link href="#services" className="btn secondary">{content.hero.ctaSecondary}</Link>
        </div>
      </section>

      <section id="services" className="section container">
        <h2 style={{ marginBottom: 8 }}>What we do</h2>
        <p className="hero-sub" style={{ marginTop: 0 }}>High-impact services powered by AI and craft.</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: 24 }}>
          {content.services.map((s) => (
            <motion.div key={s.id} className="card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <h3 style={{ marginBottom: 6 }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)' }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 style={{ marginBottom: 8 }}>Results our clients love</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: 12 }}>
          {content.testimonials.map((t, i) => (
            <motion.blockquote key={i} className="card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p style={{ margin: 0, fontSize: 16 }}>“{t.quote}”</p>
              <footer style={{ marginTop: 12, color: 'var(--muted)' }}>— {t.name}, {t.role}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <ContactSection />

      <footer className="footer container">
        <small>
          <span className="kbd">S10</span> {content.footerNote}
          {' '}• <Link href="/admin">Admin</Link>
        </small>
      </footer>
    </main>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section container">
      <div className="card" style={{ display: 'grid', gap: 16 }}>
        <h2>Let’s build something great</h2>
        <p style={{ color: 'var(--muted)' }}>Tell us about your project. We’ll reply within 24 hours.</p>
        <form action="/api/contact" method="post" style={{ display: 'grid', gap: 12 }}>
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input className="input" id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <label className="label" htmlFor="email">Email</label>
              <input className="input" id="email" name="email" placeholder="you@example.com" type="email" required />
            </div>
            <div style={{ flex: 1 }}>
              <label className="label" htmlFor="service">Service</label>
              <select className="input" id="service" name="service" defaultValue="general">
                <option value="general">General inquiry</option>
                {content.services.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="message">Message</label>
            <textarea className="input" id="message" name="message" placeholder="Share a few details..." rows={5} required />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn" type="submit">Send message</button>
            <span style={{ color: 'var(--muted)' }}>
              Or email <a href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </a>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
