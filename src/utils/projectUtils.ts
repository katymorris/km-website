import type { Project, ProjectsData } from '../types';

export async function loadProjects(): Promise<Project[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}projects/projects.json`);
  if (!response.ok) {
    throw new Error('Failed to load projects');
  }
  const data: ProjectsData = await response.json();
  return data.projects;
}

