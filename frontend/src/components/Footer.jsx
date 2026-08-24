import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { resumeData } from '../data/resumeData';
import { HorizonDivider } from './DiamondBullet';

export const Footer = () => {
  const { personal } = resumeData;

  return (
    <footer className="footer">
      <div className="container">
        <HorizonDivider />

        <div className="footer-social-links">
          <a
            href={personal.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personal.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="footer-social-btn"
            aria-label="Send Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s+/g, '')}`}
            className="footer-social-btn"
            aria-label="Direct Phone"
          >
            <Phone size={18} />
          </a>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} {personal.name}. Built with React, Express, & Supabase PostgreSQL.
        </p>

        <p className="footer-tech-stack-tag">
          Designed with "The Centered Horizon" Aesthetic & Geometric Diamond Typography
        </p>
      </div>
    </footer>
  );
};

export default Footer;
