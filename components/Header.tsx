'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/resume', label: 'Resume' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300" style={{
      background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(var(--bg-surface-rgb), 0.8) 100%)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(10px)',
    }}>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Tomas Röjder
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <li key={link.href} style={{ animationDelay: `${index * 0.1}s` }}>
              <Link
                href={link.href}
                className={`
                  text-sm font-medium tracking-wide transition-all duration-300 relative
                  ${
                    isActive(link.href)
                      ? 'font-semibold'
                      : ''
                  }
                `}
                style={{
                  color: isActive(link.href) ? 'var(--primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, var(--primary), transparent)',
                      animation: 'slideInRight 0.4s ease-out',
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className={`
                w-6 h-0.5 transition-all duration-300
                ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
              style={{ background: 'var(--primary)' }}
            />
            <span
              className={`
                w-6 h-0.5 transition-all duration-300
                ${isMenuOpen ? 'opacity-0' : ''}
              `}
              style={{ background: 'var(--primary)' }}
            />
            <span
              className={`
                w-6 h-0.5 transition-all duration-300
                ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
              style={{ background: 'var(--primary)' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className="md:hidden border-t transition-all duration-300"
          style={{
            borderTopColor: 'var(--border-color)',
            background: 'var(--bg-surface)',
          }}
        >
          <ul className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    block px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 border-b
                    ${
                      isActive(link.href)
                        ? 'font-semibold'
                        : ''
                    }
                  `}
                  style={{
                    color: isActive(link.href) ? 'var(--primary)' : 'var(--text-secondary)',
                    borderBottomColor: 'var(--border-color)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
