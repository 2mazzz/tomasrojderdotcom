import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link href="/">Tomas Rojder</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
