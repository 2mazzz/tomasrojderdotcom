'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const welcomeMessage = `Welcome to my corner of the web! I'm Tomas, a robotics and control systems engineer with a passion for autonomous systems and AI.

I work on control algorithms for agricultural machines and have experience in flight autonomy systems. This site showcases my projects in SLAM, sensor fusion, and AI exploration.

Type a command to get started, or try 'help' to see what you can do.`;

const tractorArt = `       _____________
      /            /|
     /____________/ |
    | ___    ___ |  |
    ||   |  |   || /
    ||___|  |___||/
     (==)    (==)`;

const commands: Record<string, string | null> = {
  blog: '/blog',
  projects: '/projects',
  about: '/about',
  resume: '/resume',
  help: null,
  clear: null,
};

export default function CLIHero() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [typingComplete, setTypingComplete] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Typing animation effect
  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < welcomeMessage.length) {
        setDisplayedText(welcomeMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        // Typing complete
        clearInterval(typingInterval);
        localStorage.setItem('cli-intro-seen', 'true');
        setTypingComplete(true);
      }
    }, 20);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [displayedText, commandHistory, error, typingComplete]);

  // Command handler
  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedInput = currentInput.trim().toLowerCase();

    // Add command to history
    setCommandHistory([...commandHistory, trimmedInput]);

    // Clear input
    setCurrentInput('');

    // Clear error state
    setError(null);

    if (trimmedInput === 'help') {
      const helpText = `Available commands:
  blog     - View blog posts
  projects - View my projects
  about    - Learn more about me
  resume   - View my resume
  clear    - Clear the terminal
  help     - Show this help message`;
      setCommandHistory((prev) => [...prev, helpText]);
    } else if (trimmedInput === 'clear') {
      setCommandHistory([]);
    } else if (commands[trimmedInput]) {
      const route = commands[trimmedInput];
      if (route) {
        router.push(route);
      }
    } else if (trimmedInput) {
      setError(`Command not found: '${trimmedInput}'. Type 'help' for available commands.`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl flex-grow flex items-center">
        {/* Terminal body - fixed height scrollable container */}
        <div
          ref={scrollContainerRef}
          className="w-full font-mono text-xs sm:text-sm md:text-base overflow-y-auto"
          style={{
            background: 'transparent',
            height: '500px',
            scrollBehavior: 'smooth',
          }}
          onClick={handleTerminalClick}
          role="button"
          tabIndex={0}
        >
          <div className="p-4 md:p-6 space-y-4">
            {/* Hidden help text */}
            <div id="command-help" className="sr-only">
              Type commands to navigate: blog, projects, about, resume. Type 'help' for more options.
            </div>

            {/* Live region for announcements */}
            {typingComplete && commandHistory.length === 0 && (
              <div className="sr-only" role="status" aria-live="polite">
                Welcome message complete. Command input is ready.
              </div>
            )}
            {/* ASCII art tractor */}
            <pre
              className="hidden sm:block whitespace-pre-wrap overflow-x-auto"
              style={{ color: 'var(--primary)' }}
              aria-label="ASCII art of a tractor"
            >
              {tractorArt}
            </pre>

            {/* Welcome message with typing animation */}
            <div style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
              {displayedText}
              {!typingComplete && (
                <span
                  className="inline-block ml-1"
                  style={{
                    background: 'var(--primary)',
                    width: '0.5em',
                    height: '1em',
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 100ms',
                  }}
                />
              )}
            </div>

            {/* Command history */}
            {commandHistory.map((cmd, idx) => (
              <div
                key={idx}
                style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}
              >
                {cmd.startsWith('Available commands:') || cmd.startsWith('Command not found:') ? (
                  <div>{cmd}</div>
                ) : (
                  <div>
                    <span style={{ color: 'var(--primary)' }}>$ </span>
                    {cmd}
                  </div>
                )}
              </div>
            ))}

            {/* Error display */}
            {error && (
              <div
                className="p-3 rounded border-l-4"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderLeftColor: '#ef4444',
                  color: '#dc2626',
                }}
              >
                {error}
              </div>
            )}

            {/* Command input form */}
            {typingComplete && (
              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span style={{ color: 'var(--primary)' }}>$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  placeholder="type a command..."
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal command input"
                  aria-describedby="command-help"
                  className="flex-grow bg-transparent outline-none"
                  style={{
                    color: 'var(--text-primary)',
                    caretColor: 'var(--primary)',
                  }}
                />
                {showCursor && currentInput === '' && (
                  <span
                    className="inline-block"
                    style={{
                      background: 'var(--primary)',
                      width: '0.5em',
                      height: '1em',
                    }}
                  />
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-8 flex justify-center">
        <svg
          className="w-6 h-6 animate-bounce"
          style={{ color: 'var(--text-secondary)' }}
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
      </div>
    </section>
  );
}
