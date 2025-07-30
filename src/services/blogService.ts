import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import DOMPurify from 'dompurify'
import { db } from '../config/firebase'
import { PostData } from '../components/Posts'

// Enhanced interface for Firestore blog post
export interface BlogPost extends Omit<PostData, 'date'> {
  status: 'draft' | 'published'
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
  slug: string
  metaDescription?: string
  featuredImage?: string
  content: string // Full HTML content
}

// Input interface for creating/updating posts
export interface BlogPostInput {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  image?: string
  metaDescription?: string
}

// Validation and sanitization utilities
class BlogValidator {
  static readonly MAX_TITLE_LENGTH = 200
  static readonly MAX_CONTENT_LENGTH = 50000
  static readonly MAX_EXCERPT_LENGTH = 500
  static readonly MAX_META_DESCRIPTION_LENGTH = 160
  static readonly MAX_TAGS = 10
  static readonly ALLOWED_CATEGORIES = ['Mobile App', 'Business Solution', 'Education', 'Technology']

  static validateAndSanitize(input: BlogPostInput): BlogPostInput {
    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(input.content, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target'],
      ALLOW_DATA_ATTR: false,
      FORBID_SCRIPT: true,
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
    })

    // Validate and sanitize all fields
    const sanitized: BlogPostInput = {
      title: this.sanitizeText(input.title, this.MAX_TITLE_LENGTH),
      content: sanitizedContent,
      excerpt: this.sanitizeText(input.excerpt, this.MAX_EXCERPT_LENGTH),
      category: this.validateCategory(input.category),
      tags: this.validateTags(input.tags),
      status: this.validateStatus(input.status),
      image: input.image ? this.sanitizeUrl(input.image) : undefined,
      metaDescription: input.metaDescription ? 
        this.sanitizeText(input.metaDescription, this.MAX_META_DESCRIPTION_LENGTH) : undefined
    }

    // Additional validations
    if (!sanitized.title.trim()) {
      throw new Error('Title is required')
    }

    if (!sanitized.content.trim()) {
      throw new Error('Content is required')
    }

    if (sanitized.content.length > this.MAX_CONTENT_LENGTH) {
      throw new Error(`Content exceeds maximum length of ${this.MAX_CONTENT_LENGTH} characters`)
    }

    return sanitized
  }

  private static sanitizeText(text: string, maxLength: number): string {
    const sanitized = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] })
    return sanitized.substring(0, maxLength).trim()
  }

  private static sanitizeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url)
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid URL protocol')
      }
      return parsedUrl.toString()
    } catch {
      throw new Error('Invalid URL format')
    }
  }

  private static validateCategory(category: string): string {
    if (!this.ALLOWED_CATEGORIES.includes(category)) {
      throw new Error(`Invalid category. Must be one of: ${this.ALLOWED_CATEGORIES.join(', ')}`)
    }
    return category
  }

  private static validateTags(tags: string[]): string[] {
    if (!Array.isArray(tags)) {
      throw new Error('Tags must be an array')
    }

    if (tags.length > this.MAX_TAGS) {
      throw new Error(`Maximum ${this.MAX_TAGS} tags allowed`)
    }

    return tags.map(tag => this.sanitizeText(tag, 50)).filter(tag => tag.length > 0)
  }

  private static validateStatus(status: string): 'draft' | 'published' {
    if (!['draft', 'published'].includes(status)) {
      throw new Error('Status must be either "draft" or "published"')
    }
    return status as 'draft' | 'published'
  }
}

// Utility to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 50) // Limit length
}

// Utility to estimate reading time
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Main blog service class
export class BlogService {
  private static readonly COLLECTION_NAME = 'posts'

  // Create new blog post
  static async createPost(input: BlogPostInput, authorEmail: string): Promise<string> {
    try {
      const validatedInput = BlogValidator.validateAndSanitize(input)
      const slug = generateSlug(validatedInput.title)
      
      // Check if slug already exists
      await this.ensureUniqueSlug(slug)

      const postData = {
        ...validatedInput,
        slug,
        author: 'Kancio Team', // Consistent author name
        authorEmail, // Store for audit purposes
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: validatedInput.status === 'published' ? serverTimestamp() : null,
        readTime: estimateReadTime(validatedInput.content)
      }

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), postData)
      return docRef.id
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  // Update existing blog post
  static async updatePost(postId: string, input: BlogPostInput, authorEmail: string): Promise<void> {
    try {
      const validatedInput = BlogValidator.validateAndSanitize(input)
      
      // Get current post to preserve slug if title hasn't changed significantly
      const currentPost = await this.getPostById(postId)
      if (!currentPost) {
        throw new Error('Post not found')
      }

      let slug = currentPost.slug
      const newSlug = generateSlug(validatedInput.title)
      
      // Update slug if title changed significantly
      if (newSlug !== slug) {
        await this.ensureUniqueSlug(newSlug, postId)
        slug = newSlug
      }

      const updateData = {
        ...validatedInput,
        slug,
        updatedAt: serverTimestamp(),
        readTime: estimateReadTime(validatedInput.content),
        // Update publishedAt only when status changes from draft to published
        ...(validatedInput.status === 'published' && currentPost.status === 'draft' && {
          publishedAt: serverTimestamp()
        })
      }

      const docRef = doc(db, this.COLLECTION_NAME, postId)
      await updateDoc(docRef, updateData)
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
  }

  // Delete blog post
  static async deletePost(postId: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, postId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }

  // Get published posts for public display
  static async getPublishedPosts(limitCount?: number): Promise<PostData[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        ...(limitCount ? [limit(limitCount)] : [])
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => this.convertToPostData(doc.id, doc.data() as BlogPost))
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return []
    }
  }

  // Get all posts for admin (including drafts)
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('updatedAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
    } catch (error) {
      console.error('Error fetching all posts:', error)
      throw error
    }
  }

  // Get single post by ID
  static async getPostById(postId: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, postId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as BlogPost
      }
      
      return null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  // Get post by slug for public display
  static async getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('slug', '==', slug),
        where('status', '==', 'published')
      )

      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        return {
          id: doc.id,
          ...doc.data()
        } as BlogPost
      }
      
      return null
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      return null
    }
  }

  // Helper method to ensure unique slug
  private static async ensureUniqueSlug(slug: string, excludePostId?: string): Promise<void> {
    const q = query(
      collection(db, this.COLLECTION_NAME),
      where('slug', '==', slug)
    )

    const querySnapshot = await getDocs(q)
    
    // If found and it's not the current post being updated
    if (!querySnapshot.empty && querySnapshot.docs[0].id !== excludePostId) {
      throw new Error('A post with similar title already exists. Please choose a different title.')
    }
  }

  // Convert BlogPost to PostData for public display
  private static convertToPostData(id: string, blogPost: BlogPost): PostData {
    return {
      id,
      title: blogPost.title,
      date: blogPost.publishedAt ? blogPost.publishedAt.toDate().toISOString().split('T')[0] : 
            blogPost.createdAt.toDate().toISOString().split('T')[0],
      excerpt: blogPost.excerpt,
      image: blogPost.image || `/assets/images/${blogPost.category.toLowerCase().replace(' ', '')}.png`,
      category: blogPost.category,
      readTime: blogPost.readTime,
      author: blogPost.author,
      tags: blogPost.tags
    }
  }
}

export default BlogService