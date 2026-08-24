import React from 'react';
import { resumeData } from '../data/resumeData';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumeView = () => {
  const { personal, projects, education, certifications } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prarthana_Reddy_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-view-page" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div className="container">
        {/* Top Control Bar */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            maxWidth: '860px',
            margin: '0 auto 2rem',
          }}
        >
          <Link to="/" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm" id="print-resume-btn">
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={handleDownload} className="btn btn-accent-resume btn-sm" id="download-pdf-direct-btn">
              <Download size={16} />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>

        {/* Clean Paper Document Format matching PDF layout with Centered Horizon Header */}
        <div className="resume-paper-container">
          {/* Centered Header */}
          <div className="resume-paper-header">
            <h1 className="resume-paper-name">{personal.name}</h1>
            <div className="resume-paper-contact">
              <span>{personal.location}</span>
              <span>|</span>
              <span>{personal.phone}</span>
              <span>|</span>
              <span>{personal.email}</span>
            </div>
            <div className="resume-paper-links">
              <span>LinkedIn: {personal.linkedin.display}</span>
              <span>|</span>
              <span>GitHub: {personal.github.display}</span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="resume-paper-section">
            <h2 className="resume-paper-section-title">Professional Summary</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: '#334155' }}>
              {personal.summary}
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="resume-paper-section">
            <h2 className="resume-paper-section-title">Technical Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: '#334155' }}>
              <div>
                <strong>Programming Languages: </strong> Python, JavaScript, HTML5, CSS3
              </div>
              <div>
                <strong>AI/ML & Data Science: </strong> Machine Learning, Natural Language Processing (NLP), Scikit-Learn, Predictive Modeling
              </div>
              <div>
                <strong>Web Development: </strong> Frontend Development, Responsive Web Design, UI/UX Principles, Performance Optimization
              </div>
              <div>
                <strong>Developer Tools & Platforms: </strong> Git, GitHub, VS Code
              </div>
            </div>
          </div>

          {/* Section: Key Projects */}
          <div className="resume-paper-section">
            <h2 className="resume-paper-section-title">Key Projects</h2>

            {projects.map((proj, idx) => (
              <div key={idx} className="resume-paper-item">
                <div className="resume-paper-item-title-row">
                  <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>{proj.title}</span>
                </div>
                <ul className="resume-paper-bullets">
                  {proj.highlights.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Education */}
          <div className="resume-paper-section">
            <h2 className="resume-paper-section-title">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="resume-paper-item">
                <div className="resume-paper-item-title-row">
                  <span style={{ fontWeight: 800 }}>{edu.degree}</span>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.88rem' }}>{edu.graduationYear}</span>
                </div>
                <div style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.15rem' }}>
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Certifications */}
          <div className="resume-paper-section">
            <h2 className="resume-paper-section-title">Certifications</h2>
            <ul className="resume-paper-bullets">
              {certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong>{cert.title}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeView;
