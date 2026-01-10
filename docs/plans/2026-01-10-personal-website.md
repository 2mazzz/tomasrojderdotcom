# Personal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional personal website with portfolio, blog, and resume using Next.js with Tailwind CSS design system.

**Architecture:**
- Design system established first with Tailwind CSS and CSS variables
- Reusable components built from design tokens (Header, Footer, Button, Card, etc.)
- Pages built using components (Home, About, Resume, Blog, Projects)
- Blog infrastructure with markdown parsing and dynamic routes
- SEO metadata applied to all pages

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, gray-matter (markdown), marked (markdown to HTML)

---

## Phase 1: Setup & Design System

### Task 1: Install Tailwind CSS and dependencies

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Modify: `app/globals.css`

**Step 1: Install Tailwind CSS and related packages**

Run:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Expected: Packages installed successfully

**Step 2: Initialize Tailwind config files**

Run:
```bash
npx tailwindcss init -p --typescript
```

Expected: Creates `tailwind.config.ts` and `postcss.config.js`

**Step 3: Configure Tailwind template paths**

Edit `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

**Step 4: Update globals.css with Tailwind directives**

Replace content of `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}
```

**Step 5: Verify Tailwind works**

Run: `npm run dev`
Navigate to http://localhost:3000
Expected: No console errors, page loads

**Step 6: Commit**

```bash
git add package.json tailwind.config.ts postcss.config.js app/globals.css
git commit -m "setup: install and configure Tailwind CSS"
```

---

### Task 2: Create design system tokens (colors, typography, spacing)

**Files:**
- Create: `app/design-system.ts`
- Modify: `tailwind.config.ts`

**Step 1: Create design system constants file**

Create `app/design-system.ts`:
```typescript
// Color palette
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    900: '#082f49',
  },
  secondary: {
    50: '#f5f3ff',
    500: '#a78bfa',
    600: '#9333ea',
    700: '#7e22ce',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  accent: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
}

// Typography scale
export const typography = {
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.875rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  small: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
}

// Spacing scale
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
}
```

**Step 2: Update Tailwind config to extend theme with design tokens**

Update `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        secondary: {
          50: '#f5f3ff',
          500: '#a78bfa',
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
    },
  },
  plugins: [],
}
export default config
```

**Step 3: Commit**

```bash
git add app/design-system.ts tailwind.config.ts
git commit -m "design: add design system tokens"
```

---

## Phase 2: Reusable Components

### Task 3: Create Button component with variants

**Files:**
- Create: `components/Button.tsx`

**Step 1: Create Button component**

Create `components/Button.tsx`:
```typescript
import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
  ghost: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 active:bg-primary-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded transition-colors duration-200 cursor-pointer'
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

**Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add components/Button.tsx
git commit -m "feat: create Button component with variants"
```

---

### Task 4: Create Card component

**Files:**
- Create: `components/Card.tsx`

**Step 1: Create Card component**

Create `components/Card.tsx`:
```typescript
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  const baseStyles = 'bg-white rounded-lg border border-neutral-200 p-6'
  const hoverStyles = hoverable ? 'hover:shadow-lg hover:border-primary-200 transition-all duration-200' : ''
  const classes = `${baseStyles} ${hoverStyles} ${className}`

  return <div className={classes}>{children}</div>
}
```

**Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Card.tsx
git commit -m "feat: create Card component"
```

---

### Task 5: Create Badge component

**Files:**
- Create: `components/Badge.tsx`

**Step 1: Create Badge component**

Create `components/Badge.tsx`:
```typescript
import React from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyles = 'inline-block px-3 py-1 rounded-full text-xs font-medium'
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`

  return <span className={classes}>{children}</span>
}
```

**Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Badge.tsx
git commit -m "feat: create Badge component"
```

---

## Phase 3: Layout Components

### Task 6: Update Header component with styling and mobile menu

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Read current Header component**

Current file exists at `components/Header.tsx`

**Step 2: Rewrite Header component with Tailwind styling**

Replace `components/Header.tsx`:
```typescript
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Tomas Rojder
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-primary-600 font-semibold'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-600 hover:text-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 border-t border-neutral-200 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-primary-600 font-semibold'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
```

**Step 3: Verify Header compiles**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Test Header in browser**

Run: `npm run dev`
Navigate to http://localhost:3000
- Verify desktop nav shows all links
- Verify mobile menu button appears on screens < 768px
- Verify hamburger menu toggles
- Verify active link styling

**Step 5: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: update Header with Tailwind styling and mobile menu"
```

---

### Task 7: Update Footer component with styling and social links

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Rewrite Footer component**

Replace `components/Footer.tsx`:
```typescript
export default function Footer() {
  const currentYear = new Date().getFullYear()

  // TODO: Replace with your actual links
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/tomasrojder', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/tomasrojder', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:hello@tomasrojder.com', icon: 'email' },
  ]

  return (
    <footer className="bg-neutral-900 text-neutral-100 border-t border-neutral-800 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <p className="text-sm text-neutral-400">
            © {currentYear} Tomas Rojder. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.icon !== 'email' ? '_blank' : undefined}
                rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Verify Footer compiles**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Test Footer in browser**

Run: `npm run dev`
Navigate to http://localhost:3000
- Verify footer is at bottom
- Verify social links are clickable
- Verify responsive layout on mobile

**Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: update Footer with Tailwind styling and social links"
```

---

## Phase 4: Core Pages

### Task 8: Build Home/Landing page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/HeroSection.tsx`
- Create: `components/ProjectCard.tsx`
- Create: `components/BlogCard.tsx`

**Step 1: Create HeroSection component**

Create `components/HeroSection.tsx`:
```typescript
import Button from './Button'

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
          Welcome to my portfolio
        </h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          I&apos;m a full-stack developer passionate about building beautiful, performant web applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            View My Work
          </Button>
          <Button variant="secondary" size="lg">
            Read My Blog
          </Button>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Create ProjectCard component**

Create `components/ProjectCard.tsx`:
```typescript
import Card from './Card'
import Badge from './Badge'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  link?: string
}

export default function ProjectCard({ title, description, techStack, link }: ProjectCardProps) {
  return (
    <Card hoverable className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="text-neutral-600">{description}</p>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech} variant="primary">
            {tech}
          </Badge>
        ))}
      </div>
      {link && (
        <a href={link} className="text-primary-600 font-semibold hover:text-primary-700 mt-2">
          View Project →
        </a>
      )}
    </Card>
  )
}
```

**Step 3: Create BlogCard component**

Create `components/BlogCard.tsx`:
```typescript
import Card from './Card'
import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  date: string
  description: string
}

export default function BlogCard({ slug, title, date, description }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card hoverable className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-neutral-900 flex-1">{title}</h3>
          <time className="text-sm text-neutral-500 ml-2">{date}</time>
        </div>
        <p className="text-neutral-600">{description}</p>
      </Card>
    </Link>
  )
}
```

**Step 4: Rewrite Home page**

Replace `app/page.tsx`:
```typescript
import HeroSection from '@/components/HeroSection'
import ProjectCard from '@/components/ProjectCard'
import BlogCard from '@/components/BlogCard'

export default function Home() {
  // TODO: Replace with actual projects
  const featuredProjects = [
    {
      title: 'Project One',
      description: 'A brief description of your first project.',
      techStack: ['React', 'TypeScript', 'Tailwind'],
      link: '#',
    },
    {
      title: 'Project Two',
      description: 'A brief description of your second project.',
      techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
      link: '#',
    },
  ]

  // TODO: Replace with actual blog posts
  const featuredPosts = [
    {
      slug: 'first-post',
      title: 'My First Blog Post',
      date: 'Jan 1, 2024',
      description: 'A brief description of the blog post.',
    },
  ]

  return (
    <div>
      <HeroSection />

      {/* Featured Projects Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Featured Projects</h2>
          <p className="text-neutral-600 mb-12">Check out some of my recent work.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Latest Articles</h2>
          <p className="text-neutral-600 mb-12">Thoughts on web development and technology.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

**Step 5: Test home page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000
- Verify hero section displays
- Verify project cards show
- Verify blog cards show
- Verify buttons are clickable
- Verify responsive layout on mobile

**Step 6: Commit**

```bash
git add app/page.tsx components/HeroSection.tsx components/ProjectCard.tsx components/BlogCard.tsx
git commit -m "feat: build home page with hero, projects, and blog sections"
```

---

### Task 9: Build About page

**Files:**
- Modify: `app/about/page.tsx`

**Step 1: Write About page**

Replace `app/about/page.tsx`:
```typescript
import Card from '@/components/Card'
import Badge from '@/components/Badge'

export default function About() {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Git',
    'REST APIs',
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-neutral-900 mb-8">About Me</h1>

      {/* Bio Section */}
      <section className="mb-12">
        <p className="text-lg text-neutral-600 leading-relaxed mb-4">
          I&apos;m a passionate full-stack developer with a love for building beautiful, performant web
          applications. With experience in both frontend and backend development, I enjoy solving complex
          problems and creating intuitive user experiences.
        </p>
        <p className="text-lg text-neutral-600 leading-relaxed">
          When I&apos;m not coding, you can find me exploring new technologies, contributing to open source,
          or sharing knowledge with the developer community.
        </p>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="primary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Background Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Background</h2>
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Professional Experience</h3>
            <p className="text-neutral-600">TODO: Add your professional experience and key achievements.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Education</h3>
            <p className="text-neutral-600">TODO: Add your education details.</p>
          </Card>
        </div>
      </section>

      {/* Interests Section */}
      <section>
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Interests & Hobbies</h2>
        <p className="text-neutral-600">
          TODO: Share what you&apos;re passionate about outside of work.
        </p>
      </section>
    </div>
  )
}
```

**Step 2: Test About page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000/about
- Verify page displays correctly
- Verify skills badges show
- Verify responsive layout

**Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: build About page"
```

---

### Task 10: Build Resume page

**Files:**
- Modify: `app/resume/page.tsx`

**Step 1: Write Resume page**

Replace `app/resume/page.tsx`:
```typescript
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-5xl font-bold text-neutral-900">Resume</h1>
        <Button variant="primary">Download PDF</Button>
      </div>

      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Experience</h2>
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
              <h3 className="text-xl font-semibold text-neutral-900">Job Title</h3>
              <span className="text-sm text-neutral-500">2023 - Present</span>
            </div>
            <p className="text-neutral-600 font-medium mb-2">Company Name</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>TODO: Add key accomplishment</li>
              <li>TODO: Add key accomplishment</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Education</h2>
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
              <h3 className="text-xl font-semibold text-neutral-900">Degree</h3>
              <span className="text-sm text-neutral-500">Year</span>
            </div>
            <p className="text-neutral-600 font-medium">University Name</p>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Technical Skills</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>TODO: Add skill</li>
              <li>TODO: Add skill</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Soft Skills</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>TODO: Add skill</li>
              <li>TODO: Add skill</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Test Resume page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000/resume
- Verify page displays correctly
- Verify layout is responsive

**Step 3: Commit**

```bash
git add app/resume/page.tsx
git commit -m "feat: build Resume page with experience, education, and skills"
```

---

## Phase 5: Blog Infrastructure

### Task 11: Set up blog post parsing with gray-matter and marked

**Files:**
- Modify: `package.json`
- Create/Modify: `lib/posts.ts`
- Create: `types/post.ts`

**Step 1: Install markdown parsing dependencies**

Run:
```bash
npm install gray-matter marked
npm install -D @types/marked
```

Expected: Dependencies installed

**Step 2: Create Post type**

Create `types/post.ts`:
```typescript
export interface PostMetadata {
  title: string
  date: string
  description: string
}

export interface Post extends PostMetadata {
  slug: string
  content: string
  html: string
}
```

**Step 3: Update posts utility**

Replace `lib/posts.ts`:
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { Post, PostMetadata } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostBySlug(slug: string): Post | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const html = marked.parse(content)

    return {
      slug,
      content,
      html: html as string,
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
    }
  } catch {
    return null
  }
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))

  const posts = files.map((file) => {
    const slug = file.replace('.md', '')
    return getPostBySlug(slug)
  })

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

**Step 4: Test post parsing**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add package.json lib/posts.ts types/post.ts
git commit -m "setup: configure markdown parsing with gray-matter and marked"
```

---

### Task 12: Create sample blog post

**Files:**
- Create: `posts/welcome-to-my-blog.md`

**Step 1: Create sample blog post**

Create `posts/welcome-to-my-blog.md`:
```markdown
---
title: Welcome to My Blog
date: 2024-01-01
description: This is my first blog post where I introduce myself and what to expect from my blog.
---

# Welcome to My Blog

This is the first post on my new blog. I'm excited to share my thoughts on web development, technology, and software engineering.

## What to Expect

Here, you'll find:

- Articles on React, Next.js, and TypeScript
- Web development best practices
- Technical tutorials and guides
- Thoughts on modern web development

## Stay Tuned

More posts coming soon! Be sure to check back regularly for new content.
```

**Step 2: Commit**

```bash
git add posts/welcome-to-my-blog.md
git commit -m "content: add welcome blog post"
```

---

### Task 13: Build Blog listing page

**Files:**
- Modify: `app/blog/page.tsx`

**Step 1: Write Blog listing page**

Replace `app/blog/page.tsx`:
```typescript
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Blog | Tomas Rojder',
  description: 'Read my latest articles on web development and technology.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-neutral-900 mb-4">Blog</h1>
      <p className="text-lg text-neutral-600 mb-12">
        Articles about web development, technology, and software engineering.
      </p>

      {posts.length === 0 ? (
        <p className="text-neutral-600">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Test Blog page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000/blog
- Verify blog posts load
- Verify layout is responsive
- Verify clicking a post navigates to detail page

**Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: build Blog listing page"
```

---

### Task 14: Build Blog post detail page

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Create: `app/blog/[slug]/layout.tsx` (optional)

**Step 1: Write Blog detail page**

Replace `app/blog/[slug]/page.tsx`:
```typescript
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Tomas Rojder`,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const postIndex = allPosts.findIndex((p) => p.slug === params.slug)
  const previousPost = postIndex > 0 ? allPosts[postIndex - 1] : null
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-neutral-900 mb-4">{post.title}</h1>
        <time className="text-neutral-600">{post.date}</time>
      </header>

      {/* Content */}
      <div
        className="prose prose-invert max-w-none mb-12 text-neutral-900"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Navigation */}
      <nav className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between gap-4">
        {previousPost ? (
          <a href={`/blog/${previousPost.slug}`} className="text-primary-600 hover:text-primary-700">
            ← {previousPost.title}
          </a>
        ) : (
          <div />
        )}
        {nextPost ? (
          <a href={`/blog/${nextPost.slug}`} className="text-primary-600 hover:text-primary-700 text-right">
            {nextPost.title} →
          </a>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
```

**Step 2: Test Blog post detail page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000/blog/welcome-to-my-blog
- Verify post content renders
- Verify metadata displays
- Verify post navigation shows (if applicable)

**Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: build Blog post detail page with navigation"
```

---

## Phase 6: Projects Page

### Task 15: Build dedicated Projects page

**Files:**
- Create: `app/projects/page.tsx`

**Step 1: Write Projects page**

Create `app/projects/page.tsx`:
```typescript
import ProjectCard from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects | Tomas Rojder',
  description: 'View my portfolio of web development projects.',
}

// TODO: Replace with actual projects
const projects = [
  {
    title: 'Project One',
    description: 'A brief description of your first project.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'A brief description of your second project.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Project Three',
    description: 'A brief description of your third project.',
    techStack: ['React Native', 'Firebase'],
    link: '#',
  },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-neutral-900 mb-4">Projects</h1>
      <p className="text-lg text-neutral-600 mb-12">A selection of projects I&apos;ve worked on.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Test Projects page in browser**

Run: `npm run dev`
Navigate to http://localhost:3000/projects
- Verify projects load
- Verify layout is responsive
- Verify project links work

**Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: build dedicated Projects page"
```

---

## Phase 7: SEO & Performance

### Task 16: Add SEO metadata to all pages

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/resume/page.tsx`
- Modify: `app/blog/page.tsx`
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`

**Step 1: Update root layout metadata**

Update `app/layout.tsx` metadata:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tomas Rojder - Full Stack Developer',
  description: 'Portfolio, blog, resume, and about me',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tomasrojder.com',
    siteName: 'Tomas Rojder',
    title: 'Tomas Rojder - Full Stack Developer',
    description: 'Portfolio, blog, resume, and about me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Rojder - Full Stack Developer',
    description: 'Portfolio, blog, resume, and about me',
  },
};
```

**Step 2: Add metadata to Home page**

Update `app/page.tsx`:
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tomas Rojder - Full Stack Developer | Portfolio',
  description: 'Explore my portfolio, blog posts, and projects. I build beautiful, performant web applications.',
}
```

**Step 3: Add metadata to other pages**

Update `app/about/page.tsx`:
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Tomas Rojder',
  description: 'Learn more about my background, skills, and experience.',
}
```

Update `app/resume/page.tsx`:
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tomas Rojder - Resume',
  description: 'Download my resume and view my professional experience.',
}
```

**Step 4: Create robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://tomasrojder.com/sitemap.xml
```

**Step 5: Create sitemap.xml**

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tomasrojder.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tomasrojder.com/blog</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tomasrojder.com/projects</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tomasrojder.com/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tomasrojder.com/resume</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx app/about/page.tsx app/resume/page.tsx app/blog/page.tsx public/robots.txt public/sitemap.xml
git commit -m "seo: add metadata to all pages and create robots.txt and sitemap.xml"
```

---

### Task 17: Optimize images and performance

**Files:**
- Modify: `app/globals.css`
- Verify: All images use Next.js Image component

**Step 1: Update global CSS for performance**

Update `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Image optimization */
img {
  max-width: 100%;
  height: auto;
}

/* Code block styling */
pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Links */
a {
  color: inherit;
  text-decoration: none;
}

/* Responsive images */
@media (max-width: 768px) {
  img {
    width: 100%;
  }
}
```

**Step 2: Verify build and performance**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 3: Test Lighthouse scores**

Run: `npm run dev`
Open Chrome DevTools → Lighthouse
Run Lighthouse audit on each page
Expected: Performance > 90, Accessibility > 90

**Step 4: Commit**

```bash
git add app/globals.css
git commit -m "perf: optimize CSS and images for better performance"
```

---

### Task 18: Set up Accessibility

**Files:**
- Verify all components use proper ARIA labels
- Ensure keyboard navigation works
- Verify color contrast

**Step 1: Test keyboard navigation**

Run: `npm run dev`
Test each page:
- Use Tab to navigate
- Use Enter to activate buttons
- Use Arrow keys where applicable

Expected: All interactive elements are keyboard accessible

**Step 2: Verify ARIA labels**

Check components for:
- Buttons have aria-label if not text
- Links have descriptive text
- Images have alt text (if used)

**Step 3: Run accessibility audit**

Open Chrome DevTools → Lighthouse
Run accessibility audit
Expected: Score 100

**Step 4: Commit**

```bash
git add -A
git commit -m "a11y: ensure accessibility compliance across all pages"
```

---

## Summary

This implementation plan covers:

1. **Design System Setup** - Tailwind CSS, colors, typography, spacing
2. **Reusable Components** - Button, Card, Badge
3. **Layout Components** - Header with mobile menu, Footer with social links
4. **Core Pages** - Home, About, Resume with complete styling
5. **Blog System** - Markdown parsing, blog listing, blog post detail with navigation
6. **Projects Page** - Dedicated page to showcase all projects
7. **SEO & Performance** - Metadata, robots.txt, sitemap, image optimization
8. **Accessibility** - Keyboard navigation, ARIA labels, color contrast

**Total Tasks:** 18
**Estimated Completion:** Follow tasks sequentially, committing after each logical group

---

## Next Steps

You need to provide:
1. GitHub URL
2. LinkedIn URL
3. Email address
4. List of 3-4 projects with descriptions, tech stacks, and links

Then we can execute this plan!
