import { getProjects } from '@/lib/projects';
import Link from 'next/link';

// Prerender at build time
export const revalidate = false;

export const metadata = {
  title: 'Projects | Tomas Rojder',
  description: 'Explore my portfolio of web development projects, featuring full-stack applications, frontend applications, and open-source contributions.',
};

function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
}: {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}) {
  return (
    <div className="card flex flex-col gap-lg h-full">
      <div className="flex-grow space-y-md">
        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-sm">
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Tech Stack</p>
        <div className="flex flex-wrap gap-sm">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="badge"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-md pt-md" style={{ borderTop: '1px solid var(--border-color)' }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm inline-flex items-center gap-sm"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.546 2.914 1.19.092-.926.35-1.546.636-1.903-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Code
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center gap-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="container py-2xl md:py-3xl">
      <section className="space-y-2xl">
        {/* Header */}
        <div className="space-y-sm">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Projects
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            A selection of my work in web development, full-stack applications, and open source
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
