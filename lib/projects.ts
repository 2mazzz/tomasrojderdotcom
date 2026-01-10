export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    description:
      'Full-stack web application built with modern technologies. Features include real-time updates, user authentication, and responsive design.',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    featured: true,
    githubUrl: 'https://github.com/2mazzz/project-one',
  },
  {
    id: '2',
    title: 'Project Two',
    description:
      'Mobile-responsive frontend application with modern UI/UX design. Demonstrates advanced React patterns and state management.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    featured: true,
    liveUrl: 'https://project-two-demo.com',
    githubUrl: 'https://github.com/2mazzz/project-two',
  },
  {
    id: '3',
    title: 'Project Three',
    description:
      'RESTful API and backend service with robust error handling, authentication, and database optimization. Built for scalability.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    featured: true,
    githubUrl: 'https://github.com/2mazzz/project-three',
  },
  {
    id: '4',
    title: 'Project Four',
    description:
      'Open source contribution and utility library. Provides reusable components and utilities for common web development tasks.',
    techStack: ['TypeScript', 'React', 'npm'],
    liveUrl: 'https://npm.com/package/project-four',
    githubUrl: 'https://github.com/2mazzz/project-four',
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured);
  if (limit) {
    return featured.slice(0, limit);
  }
  return featured;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
