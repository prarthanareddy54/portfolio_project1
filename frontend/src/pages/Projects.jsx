import React, { useState } from 'react';
import { CenteredHeader } from '../components/CenteredHeader';
import { DiamondBullet, HorizonDivider } from '../components/DiamondBullet';
import { GithubIcon } from '../components/Icons';
import { resumeData } from '../data/resumeData';
import {
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const Projects = () => {
  const { projects } = resumeData;
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'AI / Machine Learning', 'Data Science & ML', 'Web Development'];

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="projects-page">
      {/* Symmetrical Centered Header */}
      <CenteredHeader showActions={false} />

      <section className="section-wrapper">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Project Portfolio & Engineering Case Studies</span>
            </div>
            <h2 className="section-title">Key Projects & Systems</h2>
            <p className="section-subtitle">
              Detailed technical breakdowns of custom machine learning models, ETL pipelines, and high-performance web systems.
            </p>

            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap',
                marginTop: '1.75rem',
              }}
            >
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(cat)}
                  className={`btn btn-sm ${
                    activeFilter === cat ? 'btn-primary' : 'btn-secondary'
                  }`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card-glass project-card" style={{ textAlign: 'left' }}>
                <div className="project-top">
                  <div className="project-header-row">
                    <span className="project-category-tag">{project.category}</span>
                    <span className="project-badge-metric">{project.badge}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>

                  {/* Quantitative Key Metrics Grid */}
                  <div className="project-metrics-grid">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="metric-box">
                        <div className="metric-val">{m.value}</div>
                        <div className="metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Highlights using Diamond Bullets */}
                  <div style={{ marginTop: '1.25rem' }}>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--text-faint)',
                        marginBottom: '0.6rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Technical Implementation Highlights:
                    </div>
                    <ul className="diamond-list">
                      {project.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="diamond-list-item">
                          <DiamondBullet size={8} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="project-tech-tags">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <GithubIcon size={15} />
                    <span>View Repository</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ marginLeft: 'auto' }}
                  >
                    <span>View Code</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <HorizonDivider text="Architecture Specifications" />

          {/* Deep-dive Architecture Summary for Grok-inspired NLP & Scikit Pipeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem',
              marginTop: '3.5rem',
              textAlign: 'left',
            }}
          >
            <div className="card-glass">
              <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                NLP Model Architecture
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                The custom Grok-inspired NLP model was built to eliminate reliance on external proprietary inference APIs by building lightweight tokenizer algorithms, word vectorization, and scoring pipelines in pure Python.
              </p>
              <ul className="diamond-list">
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>Custom regex & statistical tokenization engine</span>
                </li>
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>Stop-word filtering & lemmatization algorithms</span>
                </li>
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>Cosine similarity & semantic scoring heuristics</span>
                </li>
              </ul>
            </div>

            <div className="card-glass">
              <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-emerald)', marginBottom: '0.6rem' }}>
                Predictive Pipeline Architecture
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                The ML Predictive Analytics pipeline standardizes noisy input datasets through automated ETL scripting, robust outlier handling, and multi-algorithm hyperparameter grid searching.
              </p>
              <ul className="diamond-list">
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>Automated missing value imputation & scaling</span>
                </li>
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>Scikit-Learn classification pipelines with cross-validation</span>
                </li>
                <li className="diamond-list-item">
                  <DiamondBullet size={7} />
                  <span>92% precision/recall on multi-class test splits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
