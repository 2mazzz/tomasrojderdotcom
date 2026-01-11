import { getPost, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Link from 'next/link';

// Prerender at build time, revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

async function renderMarkdown(content: string): Promise<string> {
  return await marked(content, { breaks: true });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const posts = await getPosts();
  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const htmlContent = await renderMarkdown(post.content || '');

  return (
    <div className="container py-2xl md:py-3xl">
      <article className="max-w-3xl mx-auto space-y-2xl">
        {/* Header */}
        <div className="space-y-sm border-b border-neutral-200 pb-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
            {post.metadata.title}
          </h1>
          <p className="text-neutral-600">
            {formatDate(post.metadata.date)}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-sm md:prose-base max-w-none
            prose-headings:font-bold prose-headings:text-neutral-900
            prose-h2:text-2xl prose-h2:mt-2xl prose-h2:mb-lg
            prose-h3:text-xl prose-h3:mt-lg prose-h3:mb-md
            prose-p:text-neutral-700 prose-p:leading-relaxed
            prose-a:text-primary-600 prose-a:hover:text-primary-700
            prose-code:text-red-600 prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:p-lg prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-primary-600 prose-blockquote:pl-lg prose-blockquote:italic
            prose-ul:list-disc prose-ul:pl-lg prose-ol:list-decimal prose-ol:pl-lg
            prose-li:text-neutral-700"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Navigation */}
        {(nextPost || prevPost) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-2xl border-t border-neutral-200">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`}>
                <div className="card group">
                  <p className="text-sm text-neutral-600 mb-sm">Previous Post</p>
                  <p className="text-lg font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                    {prevPost.metadata.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`}>
                <div className="card group text-right">
                  <p className="text-sm text-neutral-600 mb-sm">Next Post</p>
                  <p className="text-lg font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                    {nextPost.metadata.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="pt-lg">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
