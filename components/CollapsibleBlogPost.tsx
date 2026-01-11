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
        className={`w-full text-left transition-all duration-300 ease-in-out min-h-[44px] sm:min-h-auto py-lg px-md sm:px-lg`}
        style={{
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
            className="md:col-span-1 p-md sm:p-lg border-b md:border-b-0 md:border-r"
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

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-xs mt-xs">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-1 rounded transition-colors duration-200 cursor-pointer hover:opacity-80"
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
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-3 p-md sm:p-lg overflow-x-auto">
            <div
              className="prose prose-xs sm:prose-sm md:prose-base max-w-none
                prose-headings:font-bold prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:mt-lg prose-h1:mb-md
                prose-h2:text-lg sm:prose-h2:text-xl prose-h2:mt-lg prose-h2:mb-md prose-h2:font-bold
                prose-h3:text-base sm:prose-h3:text-lg prose-h3:mt-md prose-h3:mb-sm prose-h3:font-bold
                prose-p:leading-relaxed prose-p:mb-md prose-p:text-sm sm:prose-p:text-base
                prose-a:transition-colors prose-a:duration-200 prose-a:hover:underline
                prose-strong:font-semibold
                prose-em:italic
                prose-code:text-xs sm:prose-code:text-sm prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:bg-opacity-50
                prose-pre:bg-opacity-100 prose-pre:rounded prose-pre:overflow-x-auto prose-pre:p-sm sm:prose-pre:p-md prose-pre:text-xs sm:prose-pre:text-sm prose-pre:mb-md
                prose-blockquote:border-l-4 prose-blockquote:pl-md prose-blockquote:italic prose-blockquote:my-md prose-blockquote:text-secondary
                prose-ul:list-disc prose-ul:pl-lg prose-ul:my-md prose-ol:list-decimal prose-ol:pl-lg prose-ol:my-md
                prose-li:text-sm sm:prose-li:text-base prose-li:mb-xs
                prose-img:rounded prose-img:my-md prose-img:max-w-full
                prose-table:my-md prose-table:border-collapse prose-table:w-full prose-table:text-xs sm:prose-table:text-sm
                prose-thead:bg-opacity-50 prose-th:border prose-th:px-sm sm:prose-th:px-md prose-th:py-sm prose-th:text-left
                prose-td:border prose-td:px-sm sm:prose-td:px-md prose-td:py-sm
                prose-hr:my-lg prose-hr:opacity-50"
              style={{
                color: 'var(--text-primary)',
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <style>{`
              .prose a {
                color: var(--primary);
              }
              .prose a:hover {
                color: var(--primary-hover);
              }
              .prose code {
                background-color: rgba(227, 83, 54, 0.08);
                color: var(--text-primary);
              }
              .prose pre {
                background-color: var(--bg-surface);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
              }
              .prose pre code {
                background-color: transparent;
                color: inherit;
              }
              .prose blockquote {
                color: var(--text-secondary);
                border-left-color: var(--primary);
              }
              .prose img {
                border: 1px solid var(--border-color);
              }
              .prose table {
                border-collapse: collapse;
              }
              .prose th,
              .prose td {
                border-color: var(--border-color);
              }
              .prose thead {
                background-color: var(--bg-surface-light);
              }
            `}</style>
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
