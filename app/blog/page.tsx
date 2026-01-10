import { getPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container">
      <section>
        <h1>Blog</h1>
        <div className="posts-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
