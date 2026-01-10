import fs from 'fs/promises';
import path from 'path';

interface PostMetadata {
  title: string;
  date: string;
  description?: string;
}

interface Post {
  slug: string;
  metadata: PostMetadata;
  content?: string;
}

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Parse YAML/frontmatter from markdown
function parseFrontmatter(content: string): { metadata: PostMetadata; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const metadata: PostMetadata = {
    title: '',
    date: '',
  };

  // Simple YAML parser for basic key: value pairs
  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');

    if (key && value) {
      if (key.trim() === 'title') metadata.title = value;
      if (key.trim() === 'date') metadata.date = value;
      if (key.trim() === 'description') metadata.description = value;
    }
  });

  return { metadata, body };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
        const { metadata } = parseFrontmatter(content);

        return {
          slug,
          metadata,
        };
      })
    );

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const content = await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf-8');
    const { metadata, body } = parseFrontmatter(content);

    return {
      slug,
      metadata,
      content: body,
    };
  } catch (error) {
    return null;
  }
}
