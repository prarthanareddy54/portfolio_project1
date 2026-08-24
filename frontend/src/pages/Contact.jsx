import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CenteredHeader } from '../components/CenteredHeader';
import { DiamondBullet } from '../components/DiamondBullet';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { resumeData } from '../data/resumeData';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const Contact = ({ showToast }) => {
  const { personal } = resumeData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      showToast?.({
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter your name.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      showToast?.({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide a valid email address so I can reply to you.',
      });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMsg('Please enter a message of at least 5 characters.');
      showToast?.({
        type: 'error',
        title: 'Validation Error',
        message: 'Please write a brief message of at least 5 characters.',
      });
      return;
    }

    setLoading(true);
    setIsWakingUp(false);

    // If request takes longer than 3.5 seconds, notify user that free tier server is waking up
    const wakeUpTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 3500);

    try {
      // Send POST request to backend API (supports custom VITE_API_URL or relative proxy)
      const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'General Portfolio Inquiry',
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Trigger celebratory confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#818cf8', '#10b981', '#fbbf24'],
          });
        } catch (cErr) {
          // ignore confetti if unsupported
        }

        showToast?.({
          type: 'success',
          title: 'Message Sent!',
          message: data.message || 'Your message was successfully received. I will get back to you soon!',
        });
      } else {
        const errorText = data.error || 'Failed to submit your message. Please try again.';
        setErrorMsg(errorText);
        showToast?.({
          type: 'error',
          title: 'Submission Failed',
          message: errorText,
        });
      }
    } catch (err) {
      console.error('Submission network error:', err);
      const networkError = 'Could not connect to the backend server. The server might be waking up or offline. Please try again in 10 seconds or email directly.';
      setErrorMsg(networkError);
      showToast?.({
        type: 'error',
        title: 'Connection Error',
        message: networkError,
      });
    } finally {
      clearTimeout(wakeUpTimer);
      setLoading(false);
      setIsWakingUp(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Symmetrical Centered Header */}
      <CenteredHeader showActions={false} />

      <section className="section-wrapper">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-badge">
              <MessageSquare size={14} />
              <span>Direct Communication Channel</span>
            </div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a project in mind, an open AI/ML developer role, or want to discuss machine learning algorithms? Send a message below.
            </p>
          </div>

          <div className="contact-layout-grid">
            {/* Left Column: Direct Contact Information Cards */}
            <div className="contact-info-panel" style={{ textAlign: 'left' }}>
              <div className="card-glass">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Contact Information
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Feel free to reach out via direct phone, email, or connect across professional networks.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a
                    href={`mailto:${personal.email}`}
                    className="contact-info-card"
                  >
                    <div className="contact-icon-box">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Email Address</div>
                      <div className="contact-info-value">{personal.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                    className="contact-info-card"
                  >
                    <div className="contact-icon-box">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Phone Number</div>
                      <div className="contact-info-value">{personal.phone}</div>
                    </div>
                  </a>

                  <div className="contact-info-card">
                    <div className="contact-icon-box">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Location</div>
                      <div className="contact-info-value">{personal.location}</div>
                    </div>
                  </div>

                  <a
                    href={personal.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-card"
                  >
                    <div className="contact-icon-box">
                      <LinkedinIcon size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">LinkedIn Network</div>
                      <div className="contact-info-value">{personal.linkedin.display}</div>
                    </div>
                  </a>

                  <a
                    href={personal.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-card"
                  >
                    <div className="contact-icon-box">
                      <GithubIcon size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">GitHub Repositories</div>
                      <div className="contact-info-value">{personal.github.display}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Database & Security badge */}
              <div
                className="card-glass"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  background: 'rgba(56, 189, 248, 0.04)',
                }}
              >
                <ShieldCheck size={26} color="var(--accent-cyan)" />
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block' }}>
                    Secure PostgreSQL & Supabase
                  </strong>
                  Submissions are sanitized and stored securely with Row Level Security.
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="card-glass" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                Send a Message
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Fill out the form below and I will respond to your email as soon as possible.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <CheckCircle size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Message Received!
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                    Thank you for reaching out. Your inquiry has been securely stored in the Supabase PostgreSQL database.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  {errorMsg && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#fca5a5',
                        fontSize: '0.88rem',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Full Name <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="form-input"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="form-input"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject / Topic
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. AI/ML Developer Opportunity / Project Collaboration"
                      className="form-input"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Your Message <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, role, or question in detail..."
                      className="form-textarea"
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="submit-contact-btn"
                    disabled={loading}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{isWakingUp ? 'Waking up server (Render Free Tier)...' : 'Transmitting to Supabase API...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="form-status-indicator">
                    <DiamondBullet size={6} />
                    <span>Connected to Node.js & Express REST API on /api/contact</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
