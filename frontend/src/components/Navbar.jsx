import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, FileText, Send } from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo with Diamond Accent */}
          <Link to="/" className="nav-brand" onClick={closeMobile}>
            <span className="nav-brand-diamond" />
            <span>PRARTHANA REDDY</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <Link to="/resume" className="btn btn-secondary btn-sm" id="nav-resume-btn">
              <FileText size={15} />
              <span>Resume</span>
            </Link>

            <Link to="/contact" className="btn btn-primary btn-sm" id="nav-hire-btn">
              <Send size={14} />
              <span>Hire Me</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobile}
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          About & Education
        </NavLink>
        <NavLink
          to="/skills"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          Technical Skills
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          Projects & Portfolio
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          Contact Form
        </NavLink>
        <NavLink
          to="/resume"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
        >
          Download Resume (PDF)
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
