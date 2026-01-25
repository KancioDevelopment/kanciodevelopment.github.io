import { PostData } from '../components/Blogs'

export interface BlogPost extends PostData {
  content: string
  relatedPosts: string[]
}

export class BlogService {
  private static articlesCache: PostData[] | null = null;

  static async getPublishedPosts(): Promise<PostData[]> {
    if (this.articlesCache) return this.articlesCache;

    try {
      const response = await fetch('/articles.json');
      if (!response.ok) {
        throw new Error('Failed to load articles');
      }
      const articles = await response.json();
      this.articlesCache = articles;
      return articles;
    } catch (error) {
      console.error('Error loading articles:', error);
      return [];
    }
  }

  static async getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // 1. Get metadata from index
      const posts = await this.getPublishedPosts();
      const postMeta = posts.find(p => p.id === slug);

      if (!postMeta) return null;

      // 2. Fetch markdown content
      const response = await fetch(`/articles/${slug}.md`);
      if (!response.ok) {
        throw new Error('Failed to load article content');
      }
      const text = await response.text();

      // 3. Strip frontmatter to get content
      // Simple regex to remove the first block of --- ... ---
      const content = text.replace(/^---[\s\S]*?---\n/, '');

      return {
        ...postMeta,
        content,
        relatedPosts: [] // Can be implemented by finding posts with same tags/category
      };
    } catch (error) {
      console.error('Error loading post:', error);
      return null;
    }
  }

  static async getPostById(id: string): Promise<BlogPost | null> {
    return this.getPublishedPostBySlug(id);
  }
}