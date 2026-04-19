import { PostData } from '../components/Blogs'
import { supabase } from '../config/supabase'

export interface BlogPost extends PostData {
  content: string
  relatedPosts: string[]
  status: 'published' | 'draft'
  updatedAt?: any
  metaDescription?: string
}

export interface BlogPostInput {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'published' | 'draft'
  image: string
  metaDescription?: string
}

export class BlogService {
  private static articlesCache: PostData[] | null = null;

  static async getPublishedPosts(): Promise<PostData[]> {
    if (this.articlesCache) return this.articlesCache;

    try {
      // Try Supabase first
      if (supabase) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('date', { ascending: false });

        if (!error && data && data.length > 0) {
          const posts = data.map(post => ({
            id: post.id || post.slug,
            title: post.title,
            date: post.date,
            excerpt: post.excerpt,
            image: post.image,
            category: post.category,
            readTime: post.read_time || post.readTime || '5 min read',
            author: post.author,
            tags: post.tags || []
          }));
          this.articlesCache = posts;
          return posts;
        }
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
      if (supabase) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .or(`id.eq.${slug},slug.eq.${slug}`)
          .eq('status', 'published')
          .single();

        if (!error && data) {
          return {
            id: data.id || data.slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            image: data.image,
            category: data.category,
            readTime: data.read_time || data.readTime || '5 min read',
            author: data.author,
            tags: data.tags || [],
            content: data.content,
            relatedPosts: data.related_posts || [],
            status: data.status,
            metaDescription: data.meta_description
          };
        }
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
        relatedPosts: [],
        status: 'published'
      };
    } catch (error) {
      console.error('Error loading post:', error);
      return null;
    }
  }

  static async getPostById(id: string): Promise<BlogPost | null> {
    return this.getPublishedPostBySlug(id);
  }

  /* ===== ADMIN OPERATIONS (Supabase) ===== */

  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      if (!supabase) {
        console.warn('Supabase not initialized. Admin operations unavailable.');
        return [];
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      return (data || []).map(post => ({
        id: post.id,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        image: post.image,
        category: post.category,
        readTime: post.read_time || '5 min read',
        author: post.author,
        tags: post.tags || [],
        content: post.content,
        relatedPosts: post.related_posts || [],
        status: post.status,
        updatedAt: { toDate: () => new Date(post.created_at) } // Mock Firestore timestamp
      }));
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }
  }

  static async createPost(input: BlogPostInput, author: string): Promise<void> {
    if (!supabase) throw new Error('Supabase client not initialized');

    const slug = input.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const { error } = await supabase
      .from('posts')
      .insert([{
        title: input.title,
        slug: slug,
        content: input.content,
        excerpt: input.excerpt,
        category: input.category,
        tags: input.tags,
        status: input.status,
        image: input.image,
        author: author,
        meta_description: input.metaDescription,
        read_time: `${Math.ceil(input.content.split(/\s+/).length / 200)} min read`
      }]);

    if (error) throw error;
    this.articlesCache = null; // Invalidate cache
  }

  static async updatePost(postId: string, input: BlogPostInput, author: string): Promise<void> {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { error } = await supabase
      .from('posts')
      .update({
        title: input.title,
        content: input.content,
        excerpt: input.excerpt,
        category: input.category,
        tags: input.tags,
        status: input.status,
        image: input.image,
        meta_description: input.metaDescription,
        read_time: `${Math.ceil(input.content.split(/\s+/).length / 200)} min read`
      })
      .eq('id', postId);

    if (error) throw error;
    this.articlesCache = null; // Invalidate cache
  }

  static async deletePost(postId: string): Promise<void> {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
    this.articlesCache = null; // Invalidate cache
  }
}