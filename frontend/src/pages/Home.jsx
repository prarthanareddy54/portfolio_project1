import React from 'react';
import { Link } from 'react-router-dom';
import { CenteredHeader } from '../components/CenteredHeader';
import { DiamondBullet, HorizonDivider } from '../components/DiamondBullet';
import { GithubIcon } from '../components/Icons';
import { resumeData } from '../data/resumeData';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Layers,
  Cpu,
  BarChart3,
  Award,
} from 'lucide-react';

export const Home = () => {
  const { projects, skills } = resumeData;

  return (
    <div className="home-page">
      {/* 1. Symmetrical Center-Aligned Header ("The Centered Horizon") */}
      <CenteredHeader showActions={true} />

      {/* 2. Structured Content Below Header (Standard Left-Aligned Format with Diamond Bullets) */}
      <section className="section-wrapper">
        <div className="container">
          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '4rem',
            }}
          >
            <div className="card-glass" style={{ textAlign: 'left', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Brain size={22} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 700 }}>
                  NLP Intelligence
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>10,000+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Text data points processed efficiently</div>
            </div>

            <div className="card-glass" style={{ textAlign: 'left', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <BarChart3 size={22} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 700 }}>
                  ML Accuracy
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>92%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Overall prediction accuracy achieved</div>
            </div>

            <div className="card-glass" style={{ textAlign: 'left', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Layers size={22} color="var(--accent-indigo)" />
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 700 }}>
                  Web Performance
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>&lt; 1.2s</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Load time & 98/100 Lighthouse score</div>
            </div>

            <div className="card-glass" style={{ textAlign: 'left', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Award size={22} color="var(--accent-gold)" />
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 700 }}>
                  Education
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold)' }}>BCA 2026</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>KLE College, Gangavathi</div>
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div className="section-header-centered">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Key Projects & Technical Innovations</span>
            </div>
            <h2 className="section-title">Engineered with Precision</h2>
            <p className="section-subtitle">
              Showcasing hands-on implementations in custom natural language processing, predictive classification, and high-speed web architecture.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="card-glass project-card">
                <div className="project-top">
                  <div className="project-header-row">
                    <span className="project-category-tag">{proj.category}</span>
                    <span className="project-badge-metric">{proj.badge}</span>
                  </div>

                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-tagline">{proj.tagline}</p>

                  {/* Diamond Bullet Points for Project Achievements */}
                  <ul className="diamond-list">
                    {proj.highlights.map((bullet, idx) => (
                      <li key={idx} className="diamond-list-item">
                        <DiamondBullet size={8} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="project-tech-tags">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <GithubIcon size={14} />
                    <span>Source Code</span>
                  </a>

                  <Link to="/projects" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
                    <span>Deep Dive</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <HorizonDivider text="Core Proficiencies" />

          {/* Core Proficiencies Summary */}
          <div className="skills-category-grid" style={{ marginTop: '3rem' }}>
            {skills.slice(0, 3).map((cat, idx) => (
              <div key={idx} className="card-glass skill-category-card">
                <div className="skill-cat-header">
                  <div className="skill-cat-icon-box">
                    {idx === 0 && <Cpu size={22} />}
                    {idx === 1 && <Brain size={22} />}
                    {idx === 2 && <Layers size={22} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{cat.category}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>{cat.items.length} Technologies</p>
                  </div>
                </div>

                <ul className="diamond-list">
                  {cat.items.map((item, i) => (
                    <li key={i} className="diamond-list-item">
                      <DiamondBullet size={7} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{item.level}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div
            className="card-glass"
            style={{
              marginTop: '4.5rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Interested in collaborating or hiring?
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              I am actively seeking entry-level AI/ML Developer and Full-Stack Web roles. Let’s build intelligent, scalable solutions together.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" id="cta-contact-btn">
                <span>Send a Message</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/resume" className="btn btn-secondary" id="cta-resume-btn">
                <span>View Full Resume</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
