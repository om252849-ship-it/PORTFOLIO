'use client';

import { useState } from 'react';
import { FaEnvelope, FaLinkedinIn, FaMapMarkerAlt, FaShieldAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import content from '../data/content.json';

export default function Contact() {
  const { contact: info } = content;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [statusMsg, setStatusMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setStatusMsg('Transmission received successfully! I will respond promptly.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Message dispatch failed. Please try again or email directly.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network disruption. Please email directly at omkumarind69@gmail.com');
    }

    setTimeout(() => {
      setStatus(null);
      setStatusMsg('');
    }, 6000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Encrypted Communications</span>
          </div>
          <h2 className="section-title">
            Initiate <span className="gradient-text">Connection</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Have a project, security audit proposal, or collaborative idea? Drop an encrypted dispatch below.
          </p>
        </div>

        {/* 2-Column Contact Hub */}
        <div className="contact-grid">
          {/* Left: Channels & Security Protocol */}
          <div className="contact-channels-card glass-panel border-beam-container">
            <div className="border-beam" />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaShieldAlt style={{ color: 'var(--aurora-cyan)', fontSize: '1.4rem' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Direct Inquiries</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-tech)' }}>
                  OPEN TO OPPORTUNITIES &amp; COLLABORATION
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7' }}>
              Whether you are looking for a cybersecurity security assessment, an AI deep learning developer, or an exceptional modern web experience, I am ready to build.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Email channel with quick-copy */}
              <div className="contact-channel-item">
                <div className="channel-icon-box">
                  <FaEnvelope />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="channel-detail-label">Direct Email</div>
                  <div className="channel-detail-val">{info.email}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-glass btn-pill"
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? <FaCheck style={{ color: 'var(--aurora-emerald)' }} /> : 'Copy'}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-item"
              >
                <div className="channel-icon-box">
                  <FaLinkedinIn />
                </div>
                <div>
                  <div className="channel-detail-label">Professional Network</div>
                  <div className="channel-detail-val">linkedin.com/in/om-kumar04 ↗</div>
                </div>
              </a>

              {/* Location */}
              <div className="contact-channel-item">
                <div className="channel-icon-box">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="channel-detail-label">Base Coordinates</div>
                  <div className="channel-detail-val">{info.location}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 'auto',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(56, 189, 248, 0.07)',
                border: '1px solid var(--glass-border-subtle)',
                fontSize: '0.82rem',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-tech)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="status-pulse-dot" />
              <span>TLS 1.3 SECURED · 256-BIT ENCRYPTION ACTIVE</span>
            </div>
          </div>

          {/* Right: Interactive Glass Form */}
          <div className="contact-form-panel glass-panel border-beam-container">
            <div className="border-beam" />
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group-item">
                <label className="form-field-label" htmlFor="name">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Alex Mercer"
                  className="form-glass-input"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label className="form-field-label" htmlFor="email">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex@enterprise.com"
                  className="form-glass-input"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label className="form-field-label" htmlFor="subject">
                  Inquiry Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Cybersecurity Audit / Web Application"
                  className="form-glass-input"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label className="form-field-label" htmlFor="message">
                  Transmission Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Describe your project, timeline, and security parameters..."
                  className="form-glass-textarea"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {statusMsg && (
                <div className={`form-feedback-alert ${status}`}>
                  <span>{status === 'success' ? '✓' : '⚠'}</span>
                  <span>{statusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '6px' }}
              >
                {status === 'loading' ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane style={{ fontSize: '0.85rem' }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
