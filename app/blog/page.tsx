import { getPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

// Prerender at build time, revalidate every hour
export const revalidate = 3600;

export const metadata = {
  title: 'Blog | Tomas Rojder',
  description: 'Read my latest articles about web development, software engineering, and technology.',
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container py-2xl md:py-3xl">
      <section className="space-y-2xl">
        {/* Header */}
        <div className="space-y-sm">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Blog
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Thoughts on web development, software engineering, and technology
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-3xl">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
