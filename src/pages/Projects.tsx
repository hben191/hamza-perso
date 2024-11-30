import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  languages_url: string;
  languages: string[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USER;
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

      try {
        const response = await axios.get<Project[]>(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );

        // Fetch languages for each project
        const projectsWithLanguages = await Promise.all(
          response.data.map(async (project) => {
            try {
              const languagesResponse = await axios.get(project.languages_url, {
                headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
                },
              });
              const languages = Object.keys(languagesResponse.data); // Extract language names
              return { ...project, languages };
            } catch {
              return { ...project, languages: [] }; // Default to empty if fetch fails
            }
          })
        );

        setProjects(projectsWithLanguages);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets :", err);
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gray-900">
        <p className="text-white text-lg">Chargement des projets...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gray-900">
        <p className="text-red-500 text-lg">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-6 flex flex-col items-center bg-gray-900">
      <div className="text-center max-w-4xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-white">Mes Projets</h2>
        <p className="text-lg text-gray-200">
          Voici quelques projets récupérés depuis mon GitHub.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setSelectedProject(project.id)}
            onMouseLeave={() => setSelectedProject(null)}
            className={`relative bg-gray-800 rounded-lg shadow-lg p-6 
              transform transition-transform duration-200 
              hover:scale-105 cursor-pointer ${
                selectedProject === project.id ? "glow-effect" : ""
              }`}
          >
            {/* Card content */}
            <h3 className="text-xl font-semibold mb-2 text-white">
              {project.name}
            </h3>
            <p className="text-gray-300 mb-4">
              {project.description || "Pas de description disponible."}
            </p>
            {project.languages.length > 0 && (
                <div className="text-gray-400 text-sm mb-4">
                  <strong>Languages:</strong> {project.languages.join(", ")}
                </div>
              )}
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Voir le projet sur GitHub
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;
