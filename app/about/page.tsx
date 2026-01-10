import Link from 'next/link';

export const metadata = {
  title: 'About | Tomas Rojder',
  description: 'Learn more about Tomas Rojder, a full-stack developer, software engineer, and passionate learner.',
};

export default function About() {
  const skills = [
    'JavaScript / TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
    'Tailwind CSS',
    'Web APIs',
    'REST APIs',
    'Git',
    'Docker',
  ];

  const experience = [
    {
      company: 'Tech Company',
      role: 'Full-Stack Developer',
      period: '2023 - Present',
      description: 'Building modern web applications with React and Next.js. Working on backend services with Node.js and PostgreSQL.',
    },
    {
      company: 'Startup',
      role: 'Frontend Developer',
      period: '2022 - 2023',
      description: 'Developed responsive user interfaces using React and Tailwind CSS. Collaborated with designers and product managers.',
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      period: '2021 - 2022',
      description: 'Built custom websites and web applications for various clients. Full-stack development from concept to deployment.',
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
            I'm a full-stack developer and software engineer based in Europe, passionate about building fast, scalable, and beautiful web applications. With over 3 years of professional experience, I specialize in modern web technologies and love solving complex problems through clean, maintainable code.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I'm a continuous learner who stays updated with the latest trends in web development. I enjoy collaborating with teams, mentoring junior developers, and contributing to open-source projects.
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
            Beyond coding, I'm interested in system design, performance optimization, and best practices in software engineering. I enjoy reading technical articles and books about web architecture and scalability.
          </p>
          <p>
            In my free time, I contribute to open-source projects, write technical blogs, and mentor junior developers. I'm always looking for opportunities to collaborate and share knowledge with the community.
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
          Let's Work Together
        </h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Interested in collaborating or want to discuss web development? I'd love to hear from you!
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
