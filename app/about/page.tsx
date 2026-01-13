import Link from 'next/link';

// Prerender at build time (no dynamic data)
export const revalidate = false;

export const metadata = {
  title: 'About | Tomas Rojder',
  description: 'Learn more about Tomas Rojder, a robotics engineer, control systems specialist, and AI enthusiast working on autonomous systems.',
};

export default function About() {
  const skills = [
    'C++',
    'Python',
    'MATLAB/Simulink',
    'ROS (Robot Operating System)',
    'Control Systems',
    'SLAM Algorithms',
    'Sensor Fusion',
    'Computer Vision',
    'AI/ML Frameworks',
    'Git',
    'Docker',
    'Big Data Processing',
  ];

  const experience = [
    {
      company: 'Väderstad AB',
      role: 'Algorithm Developer',
      period: '2025 - Present',
      description: 'Developing control algorithms and big data solutions for advanced agricultural machines. Working with C++ and Python to optimize machine performance and implement autonomous features.',
    },
    {
      company: 'Saab AB',
      role: 'Systems Engineer',
      period: '2024 - 2025',
      description: 'Worked on flight autonomy capabilities for defense systems. Developed algorithms in C++, MATLAB, and Python for autonomous navigation and decision-making systems.',
    },
    {
      company: 'Bosch Termoteknik AB',
      role: 'Software Developer',
      period: '2023 - 2024',
      description: 'Developed control software for heat pump systems using Simulink, Python, and C++. Implemented optimization algorithms for energy efficiency and system performance.',
    },
  ];

  return (
    <div className="container py-2xl md:py-3xl space-y-3xl">
      {/* Header */}
      <section className="max-w-3xl space-y-lg">
        <h1 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
          About Me
        </h1>
      </section>

      {/* Bio */}
      <section className="max-w-3xl space-y-lg">
        <div className="space-y-md">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Who I Am
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I'm a robotics and control systems engineer based in Sweden, specializing in autonomous systems and AI applications. With a Master's degree in Applied Physics and Electrical Engineering from Linköping University (Mechatronics and Control focus), I work on cutting-edge problems in agricultural automation and defense systems.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            My work spans control algorithms, sensor fusion, SLAM, and AI integration for real-world robotic systems. I'm passionate about pushing the boundaries of what autonomous machines can achieve, from agricultural tractors to aerial vehicles. When I'm not optimizing control loops, I explore personal AI projects and contribute to the robotics community.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-3xl space-y-lg">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-md">
          {skills.map((skill) => (
            <div
              key={skill}
              className="px-lg py-sm rounded-md font-medium"
              style={{
                background: 'rgba(227, 83, 54, 0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(227, 83, 54, 0.3)',
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-3xl space-y-lg">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Experience
        </h2>
        <div className="space-y-lg">
          {experience.map((job, index) => (
            <div key={index} className="card space-y-md">
              <div className="flex flex-col gap-sm">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {job.role}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {job.company}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {job.period}
                  </p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="max-w-3xl space-y-lg">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Interests
        </h2>
        <div className="space-y-md text-lg" style={{ color: 'var(--text-secondary)' }}>
          <p>
            Beyond my day-to-day work, I'm deeply interested in the intersection of AI and robotics, autonomous navigation systems, and the theoretical foundations of control theory. I stay current with advances in reinforcement learning, computer vision, and multi-agent systems.
          </p>
          <p>
            In my free time, I work on personal robotics projects, experiment with AI frameworks, and explore new approaches to SLAM and sensor fusion. I'm particularly interested in how modern AI techniques can enhance traditional control systems for more robust autonomous behavior.
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-3xl space-y-lg">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Education
        </h2>
        <div className="card space-y-md">
          <div className="flex flex-col gap-sm">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              M.Sc. Applied Physics & Electrical Engineering
            </h3>
            <div className="flex items-center justify-between">
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                Linköping University
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                2019 - 2024
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            Specialization in Mechatronics and Control Systems. Master thesis: "Evaluation of SLAM Algorithms for Quadcopters" - combining sensor fusion with image processing for autonomous navigation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="max-w-3xl border rounded-lg p-2xl space-y-lg"
        style={{
          background: 'linear-gradient(to right, rgba(227, 83, 54, 0.05), rgba(58, 125, 68, 0.05))',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Let's Connect
        </h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Interested in discussing robotics, autonomous systems, or AI? I'd love to hear from you!
        </p>
        <div className="flex flex-wrap gap-md">
          <a
            href="mailto:tomas.rojder@gmail.com"
            className="btn-primary"
          >
            Send Me an Email
          </a>
          <Link href="/resume" className="btn-ghost">
            View My Resume
          </Link>
        </div>
      </section>
    </div>
  );
}
