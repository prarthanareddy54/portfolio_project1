import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Download,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile.jpg';
import { resumeData } from '../data/resumeData';

/**
 * CenteredHeader Component - "The Centered Horizon"
 * Symmetrical layout with center-aligned Name, Title, Contact Info, and Summary
 */
export const CenteredHeader = ({ showActions = true }) => {
  const { personal } = resumeData;

  const handleDownloadResume = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Prarthana_Reddy_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="centered-horizon-hero">
      <div className="container">
        {/* Availability Badge */}
        <div className="hero-badge-pill">
          <span className="pulse-dot" />
          <span>Available for AI / ML & Full-Stack Roles (2026 Grad)</span>
        </div>

        {/* Profile Portrait loaded from local /assets folder */}
        <div className="hero-avatar-wrapper">
          <div className="hero-avatar-glow" />
          <div className="hero-avatar-frame">
            <img
              src={profileImg}
              alt="Prarthana Reddy - AI/ML Developer"
              className="hero-avatar-img"
            />
          </div>
        </div>

        {/* Center-Aligned Name */}
        <h1 className="hero-name">{personal.name}</h1>

        {/* Center-Aligned Professional Title */}
        <div className="hero-title">{personal.title}</div>

        {/* Symmetrical Center-Aligned Contact Info Row */}
        <div className="hero-contact-row">
          <span className="hero-contact-item">
            <MapPin size={15} className="item-icon" />
            <span>{personal.location}</span>
          </span>

          <span className="hero-contact-divider">•</span>

          <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="hero-contact-item">
            <Phone size={15} className="item-icon" />
            <span>{personal.phone}</span>
          </a>

          <span className="hero-contact-divider">•</span>

          <a href={`mailto:${personal.email}`} className="hero-contact-item">
            <Mail size={15} className="item-icon" />
            <span>{personal.email}</span>
          </a>

          <span className="hero-contact-divider">•</span>

          <a
            href={personal.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-contact-item"
          >
            <LinkedinIcon size={15} className="item-icon" />
            <span>LinkedIn</span>
          </a>

          <span className="hero-contact-divider">•</span>

          <a
            href={personal.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-contact-item"
          >
            <GithubIcon size={15} className="item-icon" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Brief Introductory Summary (Centered) */}
        <p className="hero-summary-box">
          {personal.summary}
        </p>

        {/* Prominent Action Buttons including Download Resume */}
        {showActions && (
          <div className="hero-actions">
            <Link to="/resume" className="btn btn-accent-resume" id="download-resume-btn">
              <Download size={18} />
              <span>Download Resume (PDF)</span>
            </Link>

            <Link to="/projects" className="btn btn-primary" id="view-projects-btn">
              <Sparkles size={18} />
              <span>Explore Projects</span>
            </Link>

            <Link to="/contact" className="btn btn-secondary" id="contact-me-btn">
              <span>Get In Touch</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default CenteredHeader;
