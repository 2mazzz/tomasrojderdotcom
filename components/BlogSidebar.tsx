'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
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

  // Fetch all posts once and cache them
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    // Fetch all posts once on mount
    fetch('/api/posts')
      .then(res => res.json())
      .then((posts: Post[]) => {
        setAllPosts(posts);
      })
      .catch(console.error);
  }, []);

  // Update metadata when pathname or allPosts changes
  useEffect(() => {
    if (allPosts && mode === 'post') {
      const slug = pathname.split('/blog/')[1];
      if (slug) {
        const post = allPosts.find(p => p.slug === slug);
        if (post) {
          setPostMetadata(post.metadata);
        }
      }
    } else if (mode === 'list') {
      setPostMetadata(null);
    }
  }, [pathname, mode, allPosts]);

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      <div className="p-lg md:p-xl space-y-lg md:space-y-xl">
        {mode === 'list' ? (
          // Blog List Mode - Show blog description
          <div className="space-y-md">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Blog
              </h2>
              <div
                className="w-12 h-1 mt-md rounded-full"
                style={{ backgroundColor: 'var(--primary)' }}
              />
            </div>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Thoughts on web development, software engineering, and technology.
              Here I share insights, tutorials, and lessons learned from building
              production applications.
            </p>
          </div>
        ) : postMetadata ? (
          // Post Mode - Show current post metadata
          <div className="space-y-md md:space-y-lg">
            <div className="space-y-xs">
              <p
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: 'var(--primary)' }}
              >
                Reading
              </p>
              <h2
                className="text-lg md:text-xl font-bold leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {postMetadata.title}
              </h2>
            </div>

            <div className="pt-md" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="space-y-sm">
                <div>
                  <p
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: 'var(--primary)' }}
                  >
                    Published
                  </p>
                  <p
                    className="text-sm mt-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatDate(postMetadata.date)}
                  </p>
                </div>

                {postMetadata.tags && postMetadata.tags.length > 0 && (
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest font-semibold mb-xs"
                      style={{ color: 'var(--primary)' }}
                    >
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {postMetadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
                          style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
