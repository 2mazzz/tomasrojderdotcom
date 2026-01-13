import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import BlogCard from '@/components/BlogCard';
import CLIHeroWrapper from '@/app/components/CLIHeroWrapper';

// Dynamic rendering to ensure CLIHero client component works properly
export const revalidate = 0;

export const metadata = {
  title: 'Tomas Rojder | Algorithm Developer & Robotics Engineer',
  description: 'Portfolio showcasing work in control algorithms, autonomous systems, and AI applications for agricultural and defense robotics.',
};

function ProjectCard({
  title,
  description,
  techStack,
  index,
}: {
  title: string;
  description: string;
  techStack: string[];
  index: number;
}) {
  return (
    <div
      className="card space-y-4 group"
      style={{
        animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.15}s backwards`,
      }}
    >
      <h3
        className="text-lg font-semibold transition-colors duration-300 hover:opacity-80"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="badge">
            {tech}
          </span>
        ))}
        {techStack.length > 3 && (
          <span className="badge-secondary">
            +{techStack.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const recentPosts = (await getPosts()).slice(0, 3);
  const featuredProjects = getFeaturedProjects(3);

  return (
    <main style={{
      background: 'linear-gradient(135deg, var(--bg-darker) 0%, var(--bg-dark) 100%)',
      transition: 'background 0.3s ease',
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* CLI Hero Section */}
      <CLIHeroWrapper />

      {/* Featured Projects */}
      <section
        className="max-w-5xl mx-auto px-6 py-20 md:py-32 space-y-12 border-t"
        style={{ borderTopColor: 'var(--border-color)' }}
      >
        <div className="space-y-4">
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{
              animation: 'fadeInLeft 0.8s ease-out',
              color: 'var(--text-primary)',
            }}
          >
            Featured Work
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{
              animation: 'fadeInLeft 0.8s ease-out 0.1s backwards',
              color: 'var(--text-secondary)',
            }}
          >
            Selection of recent projects showcasing engineering expertise and architectural thinking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              index={index}
            />
          ))}
        </div>

        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.6s backwards',
          }}
        >
          <Link
            href="/projects"
            className="font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2 hover:opacity-80"
            style={{ color: 'var(--primary)' }}
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section
        className="max-w-5xl mx-auto px-6 py-20 md:py-32 space-y-12 border-t"
        style={{ borderTopColor: 'var(--border-color)' }}
      >
        <div className="space-y-4">
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{
              animation: 'fadeInLeft 0.8s ease-out',
              color: 'var(--text-primary)',
            }}
          >
            Latest Articles
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{
              animation: 'fadeInLeft 0.8s ease-out 0.1s backwards',
              color: 'var(--text-secondary)',
            }}
          >
            Insights on autonomous systems, robotics, AI exploration, and control theory
          </p>
        </div>

        {recentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post, index) => (
                <div key={post.slug} style={{ animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s backwards` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>

            <div
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.5s backwards',
              }}
            >
              <Link
                href="/blog"
                className="font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2 hover:opacity-80"
            style={{ color: 'var(--primary)' }}
              >
                Read More Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>More articles coming soon...</p>
        )}
      </section>

      {/* About Summary CTA */}
      <section
        className="max-w-5xl mx-auto px-6 py-20 md:py-32 border-t"
        style={{ borderTopColor: 'var(--border-color)' }}
      >
        <div
          className="space-y-6 max-w-2xl"
          style={{
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            About
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Robotics and control systems engineer specializing in autonomous systems and AI applications. From agricultural automation to flight systems, I develop algorithms that bring machines to life. Passionate about SLAM, sensor fusion, and pushing the boundaries of what autonomous systems can achieve.
          </p>
          <Link href="/about" className="btn-primary inline-block">
            Learn More About Me
          </Link>
        </div>
      </section>
    </main>
  );
}
