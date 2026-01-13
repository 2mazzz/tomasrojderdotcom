'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-dark) 100%)',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Copyright */}
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          &copy; {currentYear} Tomas Rojder. Engineered with precision.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/2mazzz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:drop-shadow-lg focus:outline-none rounded"
            aria-label="GitHub"
            style={{
              color: 'var(--text-secondary)',
              filter: 'drop-shadow(0 0 0px var(--primary))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--primary))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px var(--primary))';
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.546 2.914 1.19.092-.926.35-1.546.636-1.903-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/tomasröjder"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:drop-shadow-lg focus:outline-none rounded"
            aria-label="LinkedIn"
            style={{
              color: 'var(--text-secondary)',
              filter: 'drop-shadow(0 0 0px var(--primary))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--primary))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px var(--primary))';
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.194-2.292-1.195 0-1.38.932-1.38 1.891v4.579H8.265V9.359h2.518v1.02h.035c.348-.66 1.191-1.357 2.457-1.357 2.619 0 3.1 1.724 3.1 3.972v4.344zM3.83 7.773c-.884 0-1.592-.71-1.592-1.584 0-.874.708-1.583 1.592-1.583.883 0 1.59.71 1.59 1.583 0 .874-.707 1.584-1.59 1.584zm1.368 8.565H2.462V9.359h2.736v7.019zM17.7 2H2.3C1.031 2 0 3.031 0 4.3v11.4c0 1.269 1.031 2.3 2.3 2.3h15.4c1.269 0 2.3-1.031 2.3-2.3V4.3C20 3.031 18.969 2 17.7 2z" />
            </svg>
          </a>

          <a
            href="mailto:tomas.rojder@gmail.com"
            className="transition-all duration-300 hover:drop-shadow-lg focus:outline-none rounded"
            aria-label="Email"
            style={{
              color: 'var(--text-secondary)',
              filter: 'drop-shadow(0 0 0px var(--primary))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--primary))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px var(--primary))';
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
