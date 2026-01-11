import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tomas Rojder | Full-Stack Developer & Software Engineer',
  description: 'Portfolio of Tomas Rojder, a full-stack developer specializing in web applications, React, Next.js, and modern web technologies.',
  keywords: ['developer', 'software engineer', 'react', 'next.js', 'typescript', 'full-stack'],
  authors: [{ name: 'Tomas Rojder', url: 'https://tomasrojder.com' }],
  creator: 'Tomas Rojder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tomasrojder.com',
    siteName: 'Tomas Rojder',
    title: 'Tomas Rojder | Full-Stack Developer',
    description: 'Portfolio of Tomas Rojder, a full-stack developer specializing in web applications.',
    images: [
      {
        url: 'https://tomasrojder.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tomas Rojder Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Rojder | Full-Stack Developer',
    description: 'Portfolio and blog of Tomas Rojder, full-stack developer',
    images: ['https://tomasrojder.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tomasrojder.com" />
        {/* Theme detection script - runs before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const theme = stored || (
                  window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'dark'
                );
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
