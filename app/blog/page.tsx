'use client';

import { useState, useEffect } from 'react';
import CollapsibleBlogPost from '@/components/CollapsibleBlogPost';
import type { Post } from '@/lib/posts';

// Note: This page is now a client component to manage expand/collapse state
// We'll need to fetch posts on the client side

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPostSlug, setExpandedPostSlug] = useState<string | null>(null);
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

  const handleExpand = (slug: string) => {
    setExpandedPostSlug(slug);
  };

  const handleCollapse = () => {
    setExpandedPostSlug(null);
  };

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

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-3xl">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Loading posts...
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-md">
            {posts.map((post) => (
              <CollapsibleBlogPost
                key={post.slug}
                post={post}
                isExpanded={expandedPostSlug === post.slug}
                onExpand={() => handleExpand(post.slug)}
                onCollapse={() => handleCollapse()}
              />
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
