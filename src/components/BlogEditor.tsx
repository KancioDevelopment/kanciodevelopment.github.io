import React, { useState, useEffect } from 'react'
import { BlogPost, BlogPostInput } from '../services/blogService'
import './BlogEditor.css'

interface BlogEditorProps {
  initialData?: BlogPost
  onSave: (input: BlogPostInput) => Promise<void>
  onCancel: () => void
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    content: '',
    excerpt: '',
    category: 'Technology',
    tags: [],
    status: 'draft',
    image: '',
    metaDescription: ''
  })

  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const categories = ['Mobile App', 'Business Solution', 'Education', 'Technology']

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        excerpt: initialData.excerpt,
        category: initialData.category,
        tags: initialData.tags,
        status: initialData.status,
        image: initialData.image || '',
        metaDescription: initialData.metaDescription || ''
      })
    }
  }, [initialData])

  // Auto-generate excerpt from content
  useEffect(() => {
    if (formData.content && !formData.excerpt) {
      const plainText = formData.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim()

      if (plainText.length > 150) {
        setFormData(prev => ({
          ...prev,
          excerpt: plainText.substring(0, 150) + '...'
        }))
      }
    }
  }, [formData.content])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user makes changes
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    if (!formData.content.trim()) {
      setError('Content is required')
      return
    }

    if (formData.title.length > 200) {
      setError('Title must be less than 200 characters')
      return
    }

    if (formData.content.length > 50000) {
      setError('Content must be less than 50,000 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('Saving blog post...');
      console.log('Form data:', formData);
      await onSave(formData)
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      setError(error.message)
    } finally {
      console.log('Blog post saved successfully');
      setLoading(false)
    }
  }

  const insertHtmlTag = (tag: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let insertText = ''
    switch (tag) {
      case 'h2':
        insertText = `<h2>${selectedText || 'Heading 2'}</h2>`
        break
      case 'h3':
        insertText = `<h3>${selectedText || 'Heading 3'}</h3>`
        break
      case 'strong':
        insertText = `<strong>${selectedText || 'Bold text'}</strong>`
        break
      case 'em':
        insertText = `<em>${selectedText || 'Italic text'}</em>`
        break
      case 'ul':
        insertText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`
        break
      case 'ol':
        insertText = `<ol>\n  <li>${selectedText || 'List item'}</li>\n</ol>`
        break
      case 'blockquote':
        insertText = `<blockquote>${selectedText || 'Quote text'}</blockquote>`
        break
      case 'code':
        insertText = `<code>${selectedText || 'code'}</code>`
        break
      case 'a':
        insertText = `<a href="https://example.com">${selectedText || 'Link text'}</a>`
        break
    }

    const newValue = textarea.value.substring(0, start) + insertText + textarea.value.substring(end)
    setFormData(prev => ({ ...prev, content: newValue }))
  }

  return (
    <div className="blog-editor">
      <form onSubmit={handleSubmit} className="editor-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title..."
              maxLength={200}
              required
            />
            <small>{formData.title.length}/200 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Featured Image URL</label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-input">
            <div className="tags-list">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="add-tag">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add tag..."
                maxLength={50}
              />
              <button type="button" onClick={handleAddTag} disabled={formData.tags.length >= 10}>
                Add
              </button>
            </div>
          </div>
          <small>{formData.tags.length}/10 tags</small>
        </div>

        <div className="content-section">
          <div className="content-header">
            <label htmlFor="content-editor">Content *</label>
            <div className="editor-toolbar">
              <button type="button" onClick={() => insertHtmlTag('h2')} title="Heading 2">H2</button>
              <button type="button" onClick={() => insertHtmlTag('h3')} title="Heading 3">H3</button>
              <button type="button" onClick={() => insertHtmlTag('strong')} title="Bold">B</button>
              <button type="button" onClick={() => insertHtmlTag('em')} title="Italic">I</button>
              <button type="button" onClick={() => insertHtmlTag('ul')} title="Bullet List">•</button>
              <button type="button" onClick={() => insertHtmlTag('ol')} title="Numbered List">1.</button>
              <button type="button" onClick={() => insertHtmlTag('blockquote')} title="Quote">"</button>
              <button type="button" onClick={() => insertHtmlTag('code')} title="Code">&lt;&gt;</button>
              <button type="button" onClick={() => insertHtmlTag('a')} title="Link">🔗</button>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={previewMode ? 'active' : ''}
              >
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="content-preview" dangerouslySetInnerHTML={{ __html: formData.content }} />
          ) : (
            <textarea
              id="content-editor"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here... You can use HTML tags."
              rows={20}
              maxLength={50000}
              required
            />
          )}
          <small>{formData.content.length}/50,000 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Brief description of the post (auto-generated if left empty)..."
            rows={3}
            maxLength={500}
          />
          <small>{formData.excerpt.length}/500 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="metaDescription">Meta Description (SEO)</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            placeholder="SEO description for search engines..."
            rows={2}
            maxLength={160}
          />
          <small>{formData.metaDescription.length}/160 characters</small>
        </div>

        <div className="form-actions">
          <div className="status-selector">
            <label>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={handleInputChange}
              />
              Save as Draft
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={handleInputChange}
              />
              Publish
            </label>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (initialData ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogEditor