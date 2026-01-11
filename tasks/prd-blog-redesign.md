# PRD: Blog Site Redesign - Continuous Scroll with Expandable Posts

## Introduction

Redesign the blog page to display all blog posts in a single continuous scrolling experience. Users see blog titles and subtitles in a compact list, and can click any post to expand it inline showing full content with metadata (header, subtitle, date, tags) displayed on the left side. The top navigation menu remains visible and accessible throughout the page.

## Goals

- Replace paginated blog view with continuous scroll experience
- Display blog posts in a list format (title + subtitle visible by default)
- Allow expanding posts inline to show full content with metadata on the left
- Keep top navigation menu persistent across all states
- Provide seamless navigation through multiple posts without page reloads
- Support smooth scrolling and collapse/expand animations

## User Stories

### US-001: Create blog list page with continuous scroll
**Description:** As a user, I want to see all blog posts on one scrollable page so I can browse through them without pagination.

**Acceptance Criteria:**
- [ ] Blog page renders all posts in a continuous scrollable list
- [ ] Each post displays in collapsed state showing: title, subtitle
- [ ] List loads all available posts (no pagination/load more)
- [ ] Smooth scroll behavior implemented
- [ ] Page structure: top nav (always visible) + blog post list area
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Display blog post metadata on the left
**Description:** As a developer, I need to structure the expanded post layout with metadata on the left side.

**Acceptance Criteria:**
- [ ] When post is expanded, left column displays: header, subtitle, date, tags
- [ ] Left column has fixed width appropriate for metadata
- [ ] Right column displays full blog post content
- [ ] Layout is responsive (metadata stacks on mobile, side-by-side on desktop)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Implement post expand/collapse functionality
**Description:** As a user, I want to click a post to expand it and read the full content.

**Acceptance Criteria:**
- [ ] Clicking a collapsed post title/subtitle expands it smoothly
- [ ] Clicking an expanded post collapses it back
- [ ] Only one post expanded at a time (collapse others when opening a new one)
- [ ] Expand/collapse uses smooth CSS animation
- [ ] Expanded state shows full post content + metadata layout
- [ ] Collapsed state shows only title and subtitle
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Display post metadata (date, tags)
**Description:** As a user, I want to see when a post was published and what topics it covers.

**Acceptance Criteria:**
- [ ] Expanded post shows publication date in left metadata section
- [ ] Post tags/categories displayed as badges in left section
- [ ] Date formatted consistently (e.g., "January 10, 2025")
- [ ] Tags styled as small clickable badges (color: var(--primary))
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Style expanded post content area
**Description:** As a user, I want the full post content to be readable and well-formatted.

**Acceptance Criteria:**
- [ ] Full post markdown content renders properly in right column
- [ ] Content uses appropriate font size and line height (readable)
- [ ] Code blocks (if present in posts) are styled with syntax highlighting
- [ ] Links in posts are styled with var(--primary) color
- [ ] Proper padding/spacing around content
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Make layout responsive for mobile
**Description:** As a mobile user, I want the blog to work well on small screens.

**Acceptance Criteria:**
- [ ] On mobile (<640px): metadata stacks above content (single column)
- [ ] On desktop (>=640px): metadata on left, content on right (two column)
- [ ] Top navigation remains visible and functional on all screen sizes
- [ ] Touch-friendly tap targets for expand/collapse
- [ ] Proper scrolling behavior on mobile devices
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Style collapsed post list
**Description:** As a user, I want the blog list to be visually clear and scannable.

**Acceptance Criteria:**
- [ ] Each collapsed post shows title (large, bold) and subtitle
- [ ] Post items have hover effect (opacity or background change)
- [ ] Clear visual distinction between collapsed and expanded states
- [ ] Consistent spacing between post items
- [ ] Uses CSS variables for colors (--text-primary, --border-color, etc.)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Ensure top navigation persistence
**Description:** As a user, I want the top menu to always be accessible as I scroll through posts.

**Acceptance Criteria:**
- [ ] Top navigation menu stays visible when scrolling down
- [ ] Top navigation does not overlap with blog content
- [ ] Navigation links remain clickable while scrolling
- [ ] Navigation styling matches existing site design
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Remove old blog page layout
**Description:** As a developer, I need to remove the previous paginated/gridded blog layout.

**Acceptance Criteria:**
- [ ] Remove old blog grid/card layout components
- [ ] Remove pagination logic from blog page
- [ ] Remove old blog page styling that conflicts with new design
- [ ] Verify existing blog links still work (redirect if necessary)
- [ ] Typecheck passes

## Functional Requirements

- **FR-1:** Blog page displays all blog posts in a single scrollable list
- **FR-2:** Each blog post shows collapsed view with title and subtitle
- **FR-3:** Clicking a post expands it inline to show full content
- **FR-4:** Expanded post displays metadata (header, subtitle, date, tags) in a left sidebar section
- **FR-5:** Full blog post markdown content renders in the right section when expanded
- **FR-6:** Only one post can be expanded at a time (expanding a new post collapses the previous one)
- **FR-7:** Expand/collapse transitions use smooth CSS animations
- **FR-8:** Top navigation menu is always visible and positioned above the blog content
- **FR-9:** Layout is responsive: single column on mobile, two-column (metadata + content) on desktop
- **FR-10:** Post tags are clickable and styled consistently with site design
- **FR-11:** Post publication date is displayed in human-readable format

## Non-Goals

- No full-page navigation between individual post pages (all posts on one page)
- No search functionality (separate feature)
- No post filtering by category (separate feature)
- No comments or user interactions on posts
- No social sharing buttons
- No related posts suggestions
- No analytics tracking

## Design Considerations

- **Layout Inspiration:** Similar to Medium's expandable post list or collapsible thread view
- **Typography:** Use existing site font stack from globals.css
- **Colors:** Use CSS variables from existing theme (--primary, --text-primary, --text-secondary, --border-color)
- **Animations:** Smooth expand/collapse with CSS transitions (~300ms duration)
- **Spacing:** Follow existing site spacing patterns (use Tailwind spacing utilities)
- **Reusable Components:** BlogCard can be adapted or replaced with new CollapsibleBlogPost component

## Technical Considerations

- **Data Source:** Blog posts from existing `/posts` directory (via `getPosts()` function)
- **Client vs Server:** Blog page remains server component (SSR) with client-side expand/collapse state
- **State Management:** Use React hooks (useState) for expanded/collapsed state of posts
- **CSS:** Leverage Tailwind CSS for responsive design + custom CSS for animations if needed
- **Performance:** Ensure smooth scrolling with all posts loaded (typical blog has <100 posts)
- **Accessibility:** Ensure expand/collapse buttons are keyboard accessible (semantic HTML)

## Success Metrics

- Blog page loads with all posts visible
- Users can expand/collapse posts smoothly without page reload
- Metadata clearly visible in expanded view
- Mobile experience is smooth and readable
- No console errors or TypeScript errors
- Visual design matches existing dark theme with industrial aesthetic

## Open Questions

- Should expanding a post auto-scroll it into view?
- Should there be a "read more" preview (truncate subtitle) for very long titles?
- Should clicking on a tag do anything, or just display for reference?
- Should expanded posts have a "share" or "copy link" feature?
