import React, { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  resumeUrl?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ resumeUrl }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'services', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#hero" className="navbar__logo">
          <span>PORTFOLIO</span>
          <span className="navbar__logo-dot">.</span>
        </a>

        <ul className="navbar__links">
          {['about', 'services', 'skills', 'experience', 'projects', 'contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`navbar__link ${activeSection === item ? 'navbar__link--active' : ''}`}
              >
                {item.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="navbar__btn">
            Resume
          </a>
        )}
      </div>
    </nav>
  );
};