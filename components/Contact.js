'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import content from '../data/content.json';

export default function Contact() {
  const { contact: info } = content;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        setStatusMsg('Message sent successfully! I\'ll get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please check your connection.');
    }

    setTimeout(() => {
      setStatus(null);
      setStatusMsg('');
    }, 5000);
  };

  const contactItems = [
    { icon: FaEnvelope, label: 'Email', value: info.email, href: `mailto:${info.email}` },
    { icon: FaPhone, label: 'Phone', value: info.phone, href: `tel:${info.phone}` },
    { icon: FaLinkedinIn, label: 'LinkedIn', value: 'om-kumar04', href: info.linkedin },
    { icon: FaMapMarkerAlt, label: 'Location', value: info.location, href: null },
  ];

  return (
    <section className="contact" id="contact">
      <div className="section-container">
        <ScrollReveal>
          <span className="section-label">Connect</span>
        </ScrollReveal>

        <SplitText className="" style={{ color: 'var(--text-inverse)' }}>
          Let&apos;s Work Together
        </SplitText>

        <div className="contact-grid" style={{ marginTop: '48px' }}>
          <ScrollReveal direction="left" delay={0.1}>
            <div className="contact-info">
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '16px', lineHeight: '1.7' }}>
                Ready to collaborate or have a question? Feel free to reach out through any of the channels below or use the form.
              </p>

              {contactItems.map((item, i) => (
                <div className="contact-info-item" key={i}>
                  <div className="contact-info-icon">
                    <item.icon />
                  </div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">
                      {item.href ? (
                        <a
                          href={item.href}
                          data-cursor="link"
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <label>Your Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Your Email</label>
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder=" "
                  value={form.subject}
                  onChange={handleChange}
                />
                <label>Subject</label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder=" "
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                />
                <label>Your Message</label>
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  className="btn btn-inverse"
                  data-cursor="button"
                  disabled={status === 'loading'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'loading' ? (
                    <span className="loading-spinner" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </MagneticButton>

              {status && status !== 'loading' && (
                <div className={`form-status ${status}`}>
                  {statusMsg}
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
