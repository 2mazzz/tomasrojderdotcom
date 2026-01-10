# PRD: Personal Website - Tomas Rojder Portfolio

## Introduction

Build a professional personal website that serves as a comprehensive portfolio, blog platform, and resume display. The website will showcase your work, share technical insights through blog posts, and provide a clear professional narrative for a general audience interested in your skills and experience. The design system will be clean, modern, and accessible, with consistent styling across all pages.

## Goals

- Create a professional, visually cohesive personal brand across all pages
- Establish a design system for consistency and maintainability
- Showcase portfolio projects effectively
- Enable blogging capabilities with easy content management
- Display professional background and resume
- Provide a positive first impression for visitors (potential employers, collaborators, and tech community)
- Ensure responsive design across all devices
- Achieve fast page load times and good SEO

## User Stories

### US-001: Establish Design System and Global Styles
**Description:** As a developer, I need a cohesive design system so that all pages maintain consistent styling and the codebase is maintainable.

**Acceptance Criteria:**
- [ ] Define color palette (primary, secondary, accent, neutral colors)
- [ ] Define typography scale (font families, sizes, weights, line heights)
- [ ] Create CSS variables for colors and typography in globals.css
- [ ] Define spacing scale (padding/margin increments)
- [ ] Define reusable component classes (buttons, cards, containers)
- [ ] Ensure dark mode support (optional CSS classes ready for future implementation)
- [ ] Typecheck passes
- [ ] No console errors or warnings

### US-002: Create Responsive Header Component
**Description:** As a visitor, I want a clear navigation header so I can move between pages easily on any device.

**Acceptance Criteria:**
- [ ] Header displays site logo/name and navigation links
- [ ] Navigation links: Home, Blog, About, Resume
- [ ] Mobile-responsive hamburger menu for screens under 768px
- [ ] Sticky/fixed header that stays visible while scrolling
- [ ] Active link indicator showing current page
- [ ] Follows design system colors and typography
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Create Responsive Footer Component
**Description:** As a visitor, I want footer information so I can find contact details and social links.

**Acceptance Criteria:**
- [ ] Footer displays copyright and year
- [ ] Social media links (GitHub, LinkedIn, Twitter - adjust based on your profiles)
- [ ] Contact information or contact link
- [ ] Sticky footer that doesn't overlap content on short pages
- [ ] Follows design system colors and typography
- [ ] Responsive layout for mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Build Home/Landing Page
**Description:** As a visitor, I want to understand who you are immediately so I decide whether to explore further.

**Acceptance Criteria:**
- [ ] Hero section with compelling headline and short bio
- [ ] Call-to-action buttons (View Portfolio, Read Blog, etc.)
- [ ] Featured projects section (show 3-4 recent projects)
- [ ] Featured blog posts section (show latest 2-3 posts)
- [ ] Brief about section with key highlights
- [ ] Professional photo/avatar
- [ ] Follows design system
- [ ] Responsive on mobile, tablet, desktop
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Build About Page
**Description:** As a visitor, I want to learn more about your background so I understand your experience and interests.

**Acceptance Criteria:**
- [ ] Professional photo/avatar at top
- [ ] Engaging bio with personal and professional highlights
- [ ] Key skills list or expertise areas
- [ ] Background/journey section (education, career highlights)
- [ ] Interests or hobbies section
- [ ] Link to resume/CV
- [ ] Follows design system
- [ ] Responsive layout
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Build Resume/CV Page
**Description:** As a potential employer, I want to view your resume so I can assess your qualifications.

**Acceptance Criteria:**
- [ ] Display resume in professional format (can be markdown-based or styled HTML)
- [ ] Sections: Experience, Education, Skills, Certifications (as applicable)
- [ ] Download resume as PDF button
- [ ] Clean, print-friendly styling
- [ ] Follows design system
- [ ] Responsive layout
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Set Up Blog Post Structure and Parsing
**Description:** As a writer, I need a way to manage blog posts so I can publish content easily.

**Acceptance Criteria:**
- [ ] Blog posts stored as markdown files in `/posts` directory
- [ ] Markdown parsing library configured (e.g., gray-matter for frontmatter, markdown parser)
- [ ] Posts include frontmatter: title, date, author, description, tags (optional)
- [ ] Post file naming convention: `YYYY-MM-DD-slug.md`
- [ ] `lib/posts.ts` exports functions to read and parse posts
- [ ] Post slug generation from filename
- [ ] Typecheck passes

### US-008: Build Blog Listing Page
**Description:** As a reader, I want to see all blog posts so I can browse and find articles of interest.

**Acceptance Criteria:**
- [ ] Display all blog posts in reverse chronological order (newest first)
- [ ] Each post shows: title, date, description, and tags (if using)
- [ ] Post cards are clickable to view full post
- [ ] Optional: Search or filter by tag
- [ ] Pagination if more than 10 posts (future-ready)
- [ ] Follows design system
- [ ] Responsive layout
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Build Blog Post Detail Page
**Description:** As a reader, I want to read full blog posts so I can consume the complete content.

**Acceptance Criteria:**
- [ ] Display post title, date, author
- [ ] Render markdown content as formatted HTML
- [ ] Code syntax highlighting for code blocks
- [ ] Table of contents/heading navigation (optional but nice)
- [ ] Previous/next post navigation at bottom
- [ ] Share buttons or social links (optional)
- [ ] Follows design system
- [ ] Responsive typography and layout
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Create Portfolio/Projects Showcase
**Description:** As a visitor, I want to see your projects so I understand the quality and scope of your work.

**Acceptance Criteria:**
- [ ] Display project cards with image, title, description
- [ ] Each project shows: tech stack, description, link to live demo (if applicable), link to GitHub repo
- [ ] Projects organized by category or recency
- [ ] Project cards follow design system
- [ ] Responsive grid layout
- [ ] Optional: Case study details on separate pages
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Implement SEO Metadata
**Description:** As a site owner, I need proper SEO so the site ranks well in search results.

**Acceptance Criteria:**
- [ ] Meta titles and descriptions for all pages
- [ ] Open Graph tags (og:title, og:description, og:image) for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URLs to prevent duplicate content
- [ ] robots.txt configured
- [ ] Sitemap.xml generated
- [ ] Typecheck passes

### US-012: Set Up Performance and Accessibility
**Description:** As a visitor, I want fast page loads and accessibility so I can view the site smoothly on any device.

**Acceptance Criteria:**
- [ ] Lighthouse score: 90+ on Performance, Accessibility, Best Practices
- [ ] Image optimization (lazy loading, responsive images)
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation works throughout site
- [ ] Color contrast ratio meets WCAG AA standards
- [ ] Mobile viewport configured correctly
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Design system with CSS variables for colors, typography, spacing, and component styles
- FR-2: Responsive header with navigation menu and mobile hamburger
- FR-3: Responsive footer with social links and contact info
- FR-4: Home page with hero section, featured projects, featured posts, and CTA buttons
- FR-5: About page with bio, skills, background, and interests
- FR-6: Resume page with downloadable PDF and formatted content
- FR-7: Blog post storage as markdown files with frontmatter metadata
- FR-8: Blog listing page showing all posts in reverse chronological order
- FR-9: Blog post detail page with markdown rendering and syntax highlighting
- FR-10: Project showcase with filterable/organized project cards
- FR-11: SEO metadata on all pages for search engine optimization
- FR-12: Performance optimization with image lazy loading and code splitting
- FR-13: Accessibility compliance with keyboard navigation and ARIA labels

## Non-Goals

- Comments/discussion system on blog posts (can be added later)
- User authentication or login system
- Newsletter signup integration (can be added later)
- Analytics implementation (Google Analytics setup is out of scope for MVP)
- E-commerce or donation functionality
- Dynamic blog post creation via admin panel (manual markdown files only)
- Multi-language support
- Advanced animations or interactive features beyond standard UI interactions

## Design Considerations

- **Color Palette:** Professional, modern aesthetic. Consider a primary color (tech/brand), neutral grays, and accent colors for CTAs
- **Typography:** Clean sans-serif for body text (e.g., Inter, Segoe UI, system fonts). Possibly a distinctive serif or display font for headings
- **Layout:** Max content width ~1200px for readability. Good whitespace. Mobile-first responsive design
- **Components to Build:**
  - Button (primary, secondary, ghost variants)
  - Card (project card, blog card, skill card)
  - Badge (for tags, skills, tech stack)
  - Heading hierarchy (h1-h6 with consistent sizing)
  - Link styles with hover states
- **Existing Components to Enhance:**
  - Header (already exists, needs styling and mobile menu)
  - Footer (already exists, needs styling and content)
  - BlogCard (already exists, enhance with design system)

## Technical Considerations

- **Styling:** Tailwind CSS with PostCSS and Next.js integration
- **Blog Post Parsing:** Use `gray-matter` for markdown frontmatter parsing, `marked` or `remark` for markdown to HTML conversion
- **Code Syntax Highlighting:** Use `highlight.js` or `prism.js` for code block styling
- **Image Optimization:** Use Next.js Image component for automatic optimization
- **TypeScript:** All components and utilities must be fully typed
- **Build:** Next.js handles bundling and code splitting automatically
- **Deployment:** Optimized for Vercel or similar Next.js-friendly hosting

## Success Metrics

- All pages load in under 3 seconds on 4G
- Lighthouse scores: 95+ Performance, 100 Accessibility, 100 Best Practices
- Mobile responsiveness verified on iOS Safari and Chrome Android
- All TypeScript compiles without errors
- At least 3 blog posts published and displaying correctly
- At least 3-4 projects showcased
- No 404 errors or broken links
- Social sharing works correctly

## Clarifications

### Decisions Made
- **Projects:** Dedicated projects page with top projects featured on home page
- **Social Links:** GitHub and LinkedIn in footer
- **Contact Method:** Email link (mailto:) in footer
- **Styling:** Tailwind CSS for utility-first development
- **Blog Structure:** Simple structure with title, date, description, and content (can expand later)

### Contact Information
- **GitHub:** https://github.com/2mazzz
- **LinkedIn:** https://www.linkedin.com/in/tomasröjder
- **Email:** tomas.rojder@gmail.com

### Projects
Placeholder projects for showcase:
1. **Project One** - Full-stack web application built with modern technologies
   - Tech: Next.js, React, Node.js, PostgreSQL
   - Links: TBD

2. **Project Two** - Mobile-responsive frontend application
   - Tech: React, TypeScript, Tailwind CSS
   - Links: TBD

3. **Project Three** - API and backend service
   - Tech: Node.js, Express, MongoDB
   - Links: TBD

4. **Project Four** - Open source contribution or utility
   - Tech: TBD
   - Links: TBD
