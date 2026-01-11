'use client';

import { useState } from 'react';
import { marked } from 'marked';
import type { Post } from '@/lib/posts';

interface CollapsibleBlogPostProps {
  post: Post;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
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

export default function CollapsibleBlogPost({
  post,
  isExpanded,
  onExpand,
  onCollapse,
}: CollapsibleBlogPostProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  // Render markdown when component expands
  const handleExpandClick = async () => {
    if (!isExpanded) {
      if (!htmlContent && post.content) {
        const html = await marked(post.content, { breaks: true });
        setHtmlContent(html);
      }
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'ring-1 ring-primary' : ''
      }`}
      style={{
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderRadius: '6px',
      }}
    >
      {/* Collapsed State */}
      <button
        onClick={handleExpandClick}
        className={`w-full text-left transition-all duration-300 ease-in-out ${
          isExpanded ? 'py-lg' : 'py-lg'
        }`}
        style={{
          padding: 'var(--space-lg)',
          backgroundColor: isExpanded ? 'var(--bg-surface-light)' : 'var(--bg-surface)',
          borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
        }}
      >
        <div className="flex items-start justify-between gap-md">
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-semibold transition-colors duration-200 truncate hover:text-primary"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.metadata.title}
            </h3>
            {post.metadata.description && (
              <p
                className="text-sm transition-colors duration-200 line-clamp-2 mt-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {post.metadata.description}
              </p>
            )}
          </div>
          <div
            className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${
              isExpanded ? 'rotate-180' : ''
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded State */}
      {isExpanded && (
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-0"
          style={{
            borderTopColor: 'var(--border-color)',
            borderTopWidth: '1px',
          }}
        >
          {/* Left Column - Metadata */}
          <div
            className="md:col-span-1 p-lg border-b md:border-b-0 md:border-r"
            style={{
              backgroundColor: 'var(--bg-surface-light)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="space-y-md">
              {/* Header */}
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Published
                </p>
                <p
                  className="text-sm font-medium mt-xs"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {formatDate(post.metadata.date)}
                </p>
              </div>

              {/* Subtitle/Description */}
              {post.metadata.description && (
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Description
                  </p>
                  <p
                    className="text-sm mt-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {post.metadata.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-3 p-lg">
            <div
              className="prose prose-sm md:prose-base max-w-none
                prose-headings:font-bold prose-h2:text-xl prose-h2:mt-lg prose-h2:mb-md
                prose-h3:text-lg prose-h3:mt-md prose-h3:mb-sm
                prose-p:leading-relaxed
                prose-a:transition-colors prose-a:duration-200 prose-a:hover:underline
                prose-code:text-sm prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
                prose-pre:text-sm prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:pl-md prose-blockquote:italic
                prose-ul:list-disc prose-ul:pl-lg prose-ol:list-decimal prose-ol:pl-lg
                prose-li:text-base"
              style={{
                color: 'var(--text-primary)',
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <div className="mt-lg pt-lg" style={{ borderTopColor: 'var(--border-color)', borderTopWidth: '1px' }}>
              <button
                onClick={() => onCollapse()}
                className="inline-flex items-center text-sm font-medium transition-colors duration-200 hover:underline"
                style={{ color: 'var(--primary)' }}
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
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                Collapse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
