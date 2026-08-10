import React from 'react';
import type { ExperienceData } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import './Experience.css';

interface ExperienceProps {
  experiences: ExperienceData[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="experience">
      <div className="experience__container">
        <SectionHeader title="Work Experience" bgText="HISTORY" subtitle="My professional journey" />

        <div className="experience__timeline">
          {experiences.map((item) => (
            <div key={item.id} className="experience__item">
              <div className="experience__dot"></div>
              <div className="experience__card">
                <span className="experience__date">
                  {item.startDate} - {item.currentlyWorking ? 'Present' : item.endDate}
                </span>
                <h3 className="experience__position">{item.position}</h3>
                <h4 className="experience__company">{item.company}</h4>
                <p className="experience__description">{item.description}</p>
                <div className="experience__tech">
                  {item.technologies.map((tech, idx) => (
                    <span key={idx} className="experience__badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};