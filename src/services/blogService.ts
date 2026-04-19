import { PostData } from '../components/Blogs'
import { supabase } from '../config/supabase'

export interface BlogPost extends PostData {
  content: string
  relatedPosts: string[]
}

export class BlogService {
  private static articlesCache: PostData[] | null = null;

  static async getPublishedPosts(): Promise<PostData[]> {
    if (this.articlesCache) return this.articlesCache;

    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        const posts = data.map(post => ({
          id: post.id || post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          image: post.image,
          category: post.category,
          readTime: post.read_time || post.readTime,
          author: post.author,
          tags: post.tags || []
        }));
        this.articlesCache = posts;
        return posts;
      }

      // Fallback to local JSON
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
      // 1. Try Supabase first
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .or(`id.eq.${slug},slug.eq.${slug}`)
        .single();

      if (!error && data) {
        return {
          id: data.id || data.slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          image: data.image,
          category: data.category,
          readTime: data.read_time || data.readTime,
          author: data.author,
          tags: data.tags || [],
          content: data.content,
          relatedPosts: data.related_posts || []
        };
      }

      // 2. Fallback to metadata from index
      const posts = await this.getPublishedPosts();
      const postMeta = posts.find(p => p.id === slug);

      if (!postMeta) return null;

      // 3. Fetch markdown content
      const response = await fetch(`/articles/${slug}.md`);
      if (!response.ok) {
        throw new Error('Failed to load article content');
      }
      const text = await response.text();

      // 4. Strip frontmatter to get content
      const content = text.replace(/^---[\s\S]*?---\n/, '');

      return {
        ...postMeta,
        content,
        relatedPosts: []
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