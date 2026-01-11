'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Post } from '@/lib/posts';

interface BlogSidebarProps {
  mode: 'list' | 'post';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogSidebar({ mode }: BlogSidebarProps) {
  const pathname = usePathname();
  const [postMetadata, setPostMetadata] = useState<Post['metadata'] | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch post metadata when on individual post page
  useEffect(() => {
    if (mode === 'post') {
      const slug = pathname.split('/blog/')[1];
      if (slug) {
        setLoading(true);
        fetch('/api/posts')
          .then(res => res.json())
          .then((posts: Post[]) => {
            const post = posts.find(p => p.slug === slug);
            if (post) setPostMetadata(post.metadata);
          })
          .catch(console.error)
          .finally(() => setLoading(false));
      }
    }
  }, [mode, pathname]);

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      <div className="p-lg space-y-lg">
        {mode === 'list' ? (
          // Blog List Mode - Show blog description
          <>
            <h2
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Blog
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Thoughts on web development, software engineering, and technology.
              Here I share insights, tutorials, and lessons learned from building
              production applications.
            </p>
          </>
        ) : loading ? (
          // Loading state
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        ) : postMetadata ? (
          // Post Mode - Show current post metadata
          <>
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Current Post
              </p>
              <h2
                className="text-lg font-bold leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {postMetadata.title}
              </h2>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-wider mb-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Published
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {formatDate(postMetadata.date)}
              </p>
            </div>

            {postMetadata.tags && postMetadata.tags.length > 0 && (
              <div>
                <p
                  className="text-xs uppercase tracking-wider mb-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-xs">
                  {postMetadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'rgba(227, 83, 54, 0.1)',
                        color: 'var(--primary)',
                        border: '1px solid rgba(227, 83, 54, 0.3)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
