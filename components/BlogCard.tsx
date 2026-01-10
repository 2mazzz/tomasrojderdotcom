import Link from 'next/link';

interface Post {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description?: string;
  };
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

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="card group cursor-pointer">
        <div className="flex flex-col gap-md h-full">
          <h3
            className="text-lg font-semibold transition-colors duration-200"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.metadata.title}
          </h3>
          <p className="text-sm transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
            {formatDate(post.metadata.date)}
          </p>
          {post.metadata.description && (
            <p className="text-base flex-grow transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
              {post.metadata.description}
            </p>
          )}
          <div className="pt-sm">
            <span className="inline-flex items-center font-medium group-hover:gap-sm transition-all duration-200" style={{ color: 'var(--primary)' }}>
              Read more
              <svg
                className="w-4 h-4 ml-xs group-hover:translate-x-1 transition-transform duration-200"
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
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
