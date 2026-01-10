import { getPost, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container">
      <article>
        <h1>{post.metadata.title}</h1>
        <p className="post-date">{post.metadata.date}</p>
        <div className="post-content">{post.content}</div>
      </article>
    </div>
  );
}
