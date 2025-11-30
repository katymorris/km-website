import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-link-indicator">→ Visit Project</div>
      </a>
    </div>
  );
}

export default ProjectCard;

