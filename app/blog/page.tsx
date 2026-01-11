'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container py-2xl md:py-3xl">
      <section className="space-y-2xl">
        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-3xl">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Loading posts...
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-lg">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div
                  className="group p-lg rounded-lg transition-all duration-200 hover:translate-y-[-2px] cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderLeft: '4px solid var(--primary)',
                  }}
                >
                  <h2
                    className="text-xl md:text-2xl font-bold mb-sm group-hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {post.metadata.title}
                  </h2>
                  <p
                    className="text-sm mb-md"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatDate(post.metadata.date)}
                  </p>
                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
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
