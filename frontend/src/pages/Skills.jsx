import React, { useState } from 'react';
import { CenteredHeader } from '../components/CenteredHeader';
import { DiamondBullet, HorizonDivider } from '../components/DiamondBullet';
import { resumeData } from '../data/resumeData';
import {
  Code,
  Brain,
  Layers,
  Terminal,
  Sparkles,
  CheckCircle,
  Cpu,
  Database,
} from 'lucide-react';

export const Skills = () => {
  const { skills } = resumeData;
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filterCategories = ['ALL', ...skills.map((s) => s.category)];

  const filteredSkills =
    selectedFilter === 'ALL'
      ? skills
      : skills.filter((s) => s.category === selectedFilter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <Code size={22} color="var(--accent-cyan)" />;
      case 'AI/ML & Data Science':
        return <Brain size={22} color="var(--accent-emerald)" />;
      case 'Web Development & Full-Stack':
        return <Layers size={22} color="var(--accent-indigo)" />;
      case 'Developer Tools & Platforms':
        return <Terminal size={22} color="var(--accent-gold)" />;
      default:
        return <Cpu size={22} color="var(--accent-cyan)" />;
    }
  };

  return (
    <div className="skills-page">
      {/* Symmetrical Centered Header */}
      <CenteredHeader showActions={false} />

      <section className="section-wrapper">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Technical Competencies</span>
            </div>
            <h2 className="section-title">Skills & Technology Arsenal</h2>
            <p className="section-subtitle">
              A comprehensive breakdown of algorithmic frameworks, machine learning toolkits, and modern web development stacks.
            </p>

            {/* Category Filter Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '1.75rem',
              }}
            >
              {filterCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFilter(cat)}
                  className={`btn btn-sm ${
                    selectedFilter === cat ? 'btn-primary' : 'btn-secondary'
                  }`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <div className="skills-category-grid">
            {filteredSkills.map((catGroup, idx) => (
              <div key={idx} className="card-glass skill-category-card" style={{ textAlign: 'left' }}>
                <div className="skill-cat-header">
                  <div className="skill-cat-icon-box">
                    {getCategoryIcon(catGroup.category)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{catGroup.category}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>{catGroup.description}</p>
                  </div>
                </div>

                <div className="skill-items-list">
                  {catGroup.items.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item-card">
                      <div className="skill-name-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <DiamondBullet size={7} />
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-level-badge">{skill.level}</span>
                      </div>

                      {skill.tags && (
                        <div className="skill-subtags" style={{ marginTop: '0.35rem', paddingLeft: '1.25rem' }}>
                          {skill.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="tech-tag" style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <HorizonDivider text="Architecture & Workflows" />

          {/* AI/ML Pipeline & Full-Stack Workflow Diagram Box */}
          <div
            className="card-glass"
            style={{
              marginTop: '3.5rem',
              padding: '2.5rem',
              textAlign: 'left',
              background: 'linear-gradient(180deg, rgba(16, 22, 35, 0.9) 0%, rgba(10, 13, 20, 0.95) 100%)',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Full-Stack & Machine Learning Lifecycle
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              How I integrate data engineering, model training, and modern web application delivery:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>STEP 01</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>ETL & Preprocessing</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Automated tokenization, data cleaning, and feature engineering in Python.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--accent-emerald)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>STEP 02</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>Model Training</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Scikit-Learn classification pipelines & NLP hyperparameter tuning.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--accent-indigo)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', fontWeight: 700 }}>STEP 03</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>API & Database</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Express.js endpoints connected to Supabase PostgreSQL with RLS.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>STEP 04</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>Responsive UI</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Sub-1.2s React frontend with accessible, human-centric design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
