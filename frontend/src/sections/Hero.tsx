import React from 'react';
import type { ProfileData } from '../types';
import './Hero.css';

interface HeroProps {
  profile: ProfileData | null;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__badge">Welcome to my portfolio</p>
          <h1 className="hero__title">
            Hi, I'm <span className="hero__name">{profile?.name || ' Vasavi'}</span>
          </h1>
          <h2 className="hero__headline">{profile?.headline || 'Full Stack Developer'}</h2>
          <p className="hero__summary">
            {profile?.summary || 'Building scalable, modern web applications with clean code and high performance.'}
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="#contact" className="btn btn--secondary">Contact Me</a>
          </div>
          <div className="hero__socials" style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/VASAVIGUPTHA777" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'underline' }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vasavi-vanaparthy/" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'underline' }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};