export const metadata = {
  title: 'Resume | Tomas Rojder',
  description: 'Resume and CV of Tomas Rojder, full-stack developer and software engineer.',
};

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-md pb-2xl last:border-b-0" style={{ borderBottom: `1px solid var(--border-color)` }}>
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {children}
    </section>
  );
}

function ResumeItem({
  title,
  subtitle,
  period,
  description,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
}) {
  return (
    <div className="space-y-sm">
      <div className="flex items-start justify-between gap-md">
        <div className="flex-grow">
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          {subtitle && (
            <p style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
          )}
        </div>
        {period && (
          <p className="text-sm whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{period}</p>
        )}
      </div>
      {description && (
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      )}
    </div>
  );
}

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto container py-2xl md:py-3xl space-y-2xl">
      {/* Header */}
      <div className="space-y-sm pb-2xl" style={{ borderBottom: `1px solid var(--border-color)` }}>
        <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Tomas Rojder
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Full-Stack Developer & Software Engineer
        </p>
        <div className="flex flex-wrap gap-md text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href="mailto:tomas.rojder@gmail.com" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            tomas.rojder@gmail.com
          </a>
          <span>•</span>
          <a href="https://github.com/2mazzz" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            github.com/2mazzz
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/tomasrojder" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            linkedin.com/in/tomasrojder
          </a>
        </div>
      </div>

      {/* Professional Summary */}
      <ResumeSection title="Professional Summary">
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Full-stack developer with 3+ years of experience building modern web applications. Proficient in React, Next.js, TypeScript, Node.js, and database design. Strong problem-solving skills with a focus on clean, maintainable code and user-centered design. Proven track record of delivering high-quality products and collaborating with cross-functional teams.
        </p>
      </ResumeSection>

      {/* Experience */}
      <ResumeSection title="Professional Experience">
        <div className="space-y-2xl">
          <ResumeItem
            title="Full-Stack Developer"
            subtitle="Tech Company"
            period="2023 - Present"
            description="Building modern web applications using React and Next.js. Developing backend services with Node.js, Express, and PostgreSQL. Implementing responsive designs with Tailwind CSS. Collaborating with product and design teams to deliver user-centric solutions."
          />
          <ResumeItem
            title="Frontend Developer"
            subtitle="Startup"
            period="2022 - 2023"
            description="Developed responsive user interfaces with React and TypeScript. Implemented component libraries and design systems. Collaborated with designers and backend developers. Optimized performance and accessibility across web applications."
          />
          <ResumeItem
            title="Web Developer"
            subtitle="Freelance"
            period="2021 - 2022"
            description="Built custom websites and web applications for various clients. Full-stack development from concept to deployment. Implemented SEO best practices. Maintained and improved existing applications."
          />
        </div>
      </ResumeSection>

      {/* Technical Skills */}
      <ResumeSection title="Technical Skills">
        <div className="space-y-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>
            <span className="font-semibold">Languages:</span> JavaScript, TypeScript, HTML, CSS
          </p>
          <p>
            <span className="font-semibold">Frontend:</span> React, Next.js, Tailwind CSS, CSS Modules, Responsive Design
          </p>
          <p>
            <span className="font-semibold">Backend:</span> Node.js, Express, REST APIs, Authentication & Authorization
          </p>
          <p>
            <span className="font-semibold">Databases:</span> PostgreSQL, MongoDB, Data Modeling
          </p>
          <p>
            <span className="font-semibold">Tools & Platforms:</span> Git, GitHub, Docker, Vercel, AWS, VS Code
          </p>
          <p>
            <span className="font-semibold">Methodologies:</span> Agile, RESTful Design, Component-Based Architecture
          </p>
        </div>
      </ResumeSection>

      {/* Education */}
      <ResumeSection title="Education">
        <ResumeItem
          title="Bachelor of Science in Computer Science"
          subtitle="University Name"
          period="2020"
          description="Focused on software engineering, algorithms, and data structures."
        />
      </ResumeSection>

      {/* Certifications & Awards */}
      <ResumeSection title="Certifications & Awards">
        <div className="space-y-md">
          <ResumeItem
            title="React Advanced Patterns Certification"
            subtitle="Online Course"
            period="2023"
          />
          <ResumeItem
            title="Full-Stack JavaScript Developer Certificate"
            subtitle="Bootcamp"
            period="2021"
          />
        </div>
      </ResumeSection>

      {/* Print Notice */}
      <div className="mt-2xl pt-2xl text-center text-sm" style={{ borderTop: `1px solid var(--border-color)`, color: 'var(--text-muted)' }}>
        <p>This resume is best viewed as a PDF. Use your browser's print function to save as PDF for a formatted copy.</p>
      </div>
    </div>
  );
}
