'use client';

import { useMobileSidebar } from '@/contexts/MobileSidebarContext';
import { useEffect, ReactNode } from 'react';

interface MobileSidebarOverlayProps {
  children: ReactNode;
}

export default function MobileSidebarOverlay({ children }: MobileSidebarOverlayProps) {
  const { isOpen, close } = useMobileSidebar();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 lg:hidden z-40">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className="absolute inset-y-0 left-0 w-64 sm:w-72 z-45 shadow-xl transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--bg-surface)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Blog sidebar"
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors"
          style={{
            color: 'var(--text-secondary)',
          }}
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto pt-16">
          {children}
        </div>
      </div>
    </div>
  );
}
