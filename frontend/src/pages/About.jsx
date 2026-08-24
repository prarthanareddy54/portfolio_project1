import React from 'react';
import { Link } from 'react-router-dom';
import { CenteredHeader } from '../components/CenteredHeader';
import { DiamondBullet, HorizonDivider } from '../components/DiamondBullet';
import { resumeData } from '../data/resumeData';
import {
  GraduationCap,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
  FileText,
  Mail,
  ArrowRight,
} from 'lucide-react';

export const About = () => {
  const { personal, education, certifications } = resumeData;

  return (
    <div className="about-page">
      {/* Symmetrical Centered Header */}
      <CenteredHeader showActions={false} />

      <section className="section-wrapper">
        <div className="container-narrow">
          {/* Detailed Narrative & Philosophies */}
          <div className="section-header-centered">
            <div className="section-badge">
              <Compass size={14} />
              <span>Background & Engineering Philosophies</span>
            </div>
            <h2 className="section-title">Bridging AI & Web Engineering</h2>
            <p className="section-subtitle">
              Passionate about turning mathematical theory and machine learning algorithms into responsive, reliable digital experiences.
            </p>
          </div>

          {/* Narrative paragraphs */}
          <div className="card-glass" style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
              Professional Profile
            </h3>
            {personal.extendedBio.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  marginBottom: '1rem',
                  color: '#cbd5e1',
                  fontSize: '1rem',
                  lineHeight: '1.75',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Philosophies */}
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            Core Engineering Principles
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3.5rem',
            }}
          >
            {personal.philosophies.map((item, idx) => (
              <div key={idx} className="card-glass" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <DiamondBullet size={9} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <HorizonDivider text="Education & Credentials" />

          {/* Education Section */}
          <div style={{ marginTop: '3rem', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <GraduationCap size={24} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Formal Education</h3>
            </div>

            <div className="edu-timeline">
              {education.map((edu, idx) => (
                <div key={idx} className="card-glass edu-card" style={{ textAlign: 'left' }}>
                  <div className="edu-header">
                    <div>
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <p className="edu-institution">{edu.institution}</p>
                    </div>
                    <span className="edu-year">{edu.graduationYear}</span>
                  </div>

                  <ul className="diamond-list">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="diamond-list-item">
                        <DiamondBullet size={8} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Award size={24} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Professional Certifications</h3>
            </div>

            <div className="cert-grid">
              {certifications.map((cert, idx) => (
                <div key={idx} className="card-glass cert-card" style={{ textAlign: 'left' }}>
                  <div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer} • {cert.year}</p>
                  </div>

                  <ul className="diamond-list" style={{ marginTop: '0.75rem' }}>
                    {cert.topics.map((topic, i) => (
                      <li key={i} className="diamond-list-item">
                        <DiamondBullet size={7} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
            <Link to="/skills" className="btn btn-primary">
              <span>View Technical Skills</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/resume" className="btn btn-secondary">
              <FileText size={16} />
              <span>Full Resume Document</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
