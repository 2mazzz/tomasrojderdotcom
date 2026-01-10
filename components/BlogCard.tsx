import Link from 'next/link';

interface Post {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description?: string;
  };
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="blog-card">
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
      </h2>
      <p className="post-meta">{post.metadata.date}</p>
      {post.metadata.description && <p>{post.metadata.description}</p>}
    </article>
  );
}
