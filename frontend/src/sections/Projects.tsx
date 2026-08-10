import React from 'react';
import type { ProjectData } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import './Projects.css';

interface ProjectsProps {
  projects: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <SectionHeader title="Featured Projects" bgText="WORKS" subtitle="Some of the applications I have built" />

        <div className="projects__grid">
          {projects.map((project) => (
            <div key={project.id} className="projects__card">
              {project.imageUrl && (
                <div className="projects__image-wrapper">
                  <img src={project.imageUrl} alt={project.title} className="projects__image" />
                </div>
              )}
              <div className="projects__content">
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__description">{project.description}</p>
                <div className="projects__tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="projects__tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="projects__links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects__link">
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projects__link projects__link--primary">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};