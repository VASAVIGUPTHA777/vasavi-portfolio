import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  bgText: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, bgText }) => {
  return (
    <div className="section-header">
      <span className="section-header__bg">{bgText}</span>
      <h2 className="section-header__title">
        {title} <span className="section-header__dot">.</span>
      </h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  );
};