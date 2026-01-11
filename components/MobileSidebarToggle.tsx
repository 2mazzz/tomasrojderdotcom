'use client';

import { useMobileSidebar } from '@/contexts/MobileSidebarContext';

export default function MobileSidebarToggle() {
  const { isOpen, toggle } = useMobileSidebar();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 lg:hidden z-40 p-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
      style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
      }}
      aria-label="Toggle blog sidebar"
      aria-expanded={isOpen}
    >
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
