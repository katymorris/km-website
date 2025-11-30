import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { loadProjects } from '../utils/projectUtils';
import type { Project } from '../types';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const loadedProjects = await loadProjects();
        setProjects(loadedProjects);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="container">
      <Header />
      <Navbar />
      <main>
        <section>
          <h2>Projects</h2>
          {loading && <p className="loading">Loading projects...</p>}
          {error && <p className="error">Error loading projects: {error}</p>}
          {!loading && !error && projects.length === 0 && (
            <p>No projects found.</p>
          )}
          {!loading && !error && projects.length > 0 && (
            <div className="projects-container">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Projects;

