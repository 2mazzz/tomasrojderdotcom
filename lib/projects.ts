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
    title: 'Quadcopter SLAM Evaluation',
    description:
      'Master thesis project evaluating different SLAM algorithms for autonomous quadcopter navigation. Implemented sensor fusion combining IMU, camera, and depth sensors for robust localization and mapping.',
    techStack: ['C++', 'Python', 'ROS', 'OpenCV', 'Point Cloud Library'],
    featured: true,
    githubUrl: 'https://github.com/2mazzz/slam-quadcopter',
  },
  {
    id: '2',
    title: 'Agricultural Machine Control System',
    description:
      'Control algorithms for precision agriculture equipment at Väderstad. Big data processing and real-time control for optimizing planting depth, seed spacing, and soil interaction.',
    techStack: ['C++', 'Python', 'Control Theory', 'Signal Processing'],
    featured: true,
  },
  {
    id: '3',
    title: 'Autonomous Navigation Research',
    description:
      'Personal research project exploring modern approaches to autonomous navigation. Combining classical control methods with reinforcement learning for adaptive path planning in dynamic environments.',
    techStack: ['Python', 'PyTorch', 'ROS', 'Gazebo Simulator'],
    featured: true,
    githubUrl: 'https://github.com/2mazzz/autonomous-nav',
  },
  {
    id: '4',
    title: 'Sensor Fusion Framework',
    description:
      'Modular sensor fusion framework for combining multiple sensor modalities. Used for research in robust state estimation for mobile robots with applications in both ground and aerial vehicles.',
    techStack: ['C++', 'ROS', 'Kalman Filtering', 'Particle Filters'],
    githubUrl: 'https://github.com/2mazzz/sensor-fusion-framework',
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
