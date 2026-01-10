import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content?: string;
}

const POSTS_DIR = path.join(process.cwd(), 'posts');

export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
        const { data } = matter(content);

        return {
          slug,
          metadata: {
            title: data.title || 'Untitled',
            date: data.date || '',
            description: data.description,
          } as PostMetadata,
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
    const { data, content: body } = matter(content);

    return {
      slug,
      metadata: {
        title: data.title || 'Untitled',
        date: data.date || '',
        description: data.description,
      } as PostMetadata,
      content: body,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}
