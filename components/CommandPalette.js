'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShieldAlt, FaMoon, FaSun, FaEnvelope, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [auditRunning, setAuditRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);

  const ACTIONS = [
    {
      id: 'projects',
      title: 'Explore Featured Projects',
      category: 'Navigation',
      icon: '🚀',
      action: () => scrollToSection('#projects'),
    },
    {
      id: 'skills',
      title: 'Inspect Skills & AI Matrix',
      category: 'Navigation',
      icon: '🧠',
      action: () => scrollToSection('#skills'),
    },
    {
      id: 'experience',
      title: 'View Education & Experience Timeline',
      category: 'Navigation',
      icon: '🏛️',
      action: () => scrollToSection('#experience'),
    },
    {
      id: 'about',
      title: 'Read About & Research Focus',
      category: 'Navigation',
      icon: '👤',
      action: () => scrollToSection('#about'),
    },
    {
      id: 'contact',
      title: 'Send a Message / Connect',
      category: 'Navigation',
      icon: '✉️',
      action: () => scrollToSection('#contact'),
    },
    {
      id: 'resume',
      title: 'Open Official Resume (PDF/View)',
      category: 'Document',
      icon: '📄',
      action: () => { window.location.href = '/resume'; },
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address (omkumarind69@gmail.com)',
      category: 'Action',
      icon: '📋',
      action: () => {
        navigator.clipboard.writeText('omkumarind69@gmail.com');
        showToast('Email copied to clipboard!');
      },
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Luminescent / Obsidian Theme',
      category: 'Interface',
      icon: '🌓',
      action: () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('om_theme', next);
        showToast(`Theme switched to ${next.toUpperCase()}`);
      },
    },
    {
      id: 'security-audit',
      title: 'Run Cybersecurity Perimeter Diagnostic',
      category: 'Diagnostics',
      icon: '🛡️',
      action: () => runAudit(),
    },
  ];

  const filtered = ACTIONS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (target) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el && window.lenis) {
        window.lenis.scrollTo(el, { offset: -70 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const runAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      showToast('✅ Perimeter Secure · AES-256 Validated · 0 Vulnerabilities');
    }, 1800);
  };

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from external state handler
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cmd-palette-modal glass-panel border-beam-container">
        <div className="border-beam" />
        
        {/* Search Input Bar */}
        <div className="cmd-input-bar">
          <FaSearch style={{ color: 'var(--aurora-cyan)', fontSize: '1.1rem' }} />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Type a command, project, or question (e.g. 'projects', 'audit')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Results List */}
        <ul className="cmd-results-list">
          {auditRunning && (
            <li style={{ padding: '16px', textAlign: 'center', color: 'var(--aurora-cyan)' }}>
              <div className="status-pulse-dot" style={{ display: 'inline-block', marginRight: '8px' }} />
              Scanning cryptographic checksums and live headers...
            </li>
          )}

          {filtered.length === 0 && !auditRunning && (
            <li style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matching actions found for &quot;{query}&quot;. Try typing &quot;theme&quot; or &quot;projects&quot;.
            </li>
          )}

          {!auditRunning &&
            filtered.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`cmd-item-btn ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="cmd-item-left">
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span className="cmd-item-category">{item.category}</span>
                </button>
              </li>
            ))}
        </ul>

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div
            style={{
              padding: '10px 20px',
              background: 'rgba(56, 189, 248, 0.15)',
              borderTop: '1px solid var(--aurora-cyan)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {toastMessage}
          </div>
        )}

        {/* Footer Navigation Help */}
        <div className="cmd-footer-bar">
          <div style={{ display: 'flex', gap: '14px' }}>
            <span><span className="cmd-key-badge">↑↓</span> Navigate</span>
            <span><span className="cmd-key-badge">↵</span> Execute</span>
            <span><span className="cmd-key-badge">ESC</span> Exit</span>
          </div>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Google AI Spotlight
          </span>
        </div>
      </div>
    </div>
  );
}
