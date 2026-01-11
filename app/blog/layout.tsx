'use client';

import { usePathname } from 'next/navigation';
import BlogSidebar from '@/components/BlogSidebar';
import { MobileSidebarProvider } from '@/contexts/MobileSidebarContext';
import MobileSidebarToggle from '@/components/MobileSidebarToggle';
import MobileSidebarOverlay from '@/components/MobileSidebarOverlay';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarMode = pathname === '/blog' ? 'list' : 'post';

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Desktop Sidebar - sticky, scrollable */}
        <aside className="hidden lg:block lg:w-64 xl:w-72">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <BlogSidebar mode={sidebarMode} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Mobile Components */}
        <MobileSidebarToggle />
        <MobileSidebarOverlay>
          <BlogSidebar mode={sidebarMode} />
        </MobileSidebarOverlay>
      </div>
    </MobileSidebarProvider>
  );
}
