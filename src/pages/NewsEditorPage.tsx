import React, { useState } from 'react'
import './NewsEditorPage.css'

const NewsEditorPage: React.FC = () => {
    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [category, setCategory] = useState('Technology')
    const [author, setAuthor] = useState('Kancio Team')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')

    const handleDownload = () => {
        const date = new Date().toISOString().split('T')[0]
        const tagList = tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')

        const fileContent = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
image: "${image}"
category: "${category}"
readTime: "${estimateReadTime(content)}"
author: "${author}"
tags: [${tagList}]
---

${content}`

        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')

        const filename = `${slug}.md`
        const blob = new Blob([fileContent], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const estimateReadTime = (text: string): string => {
        const wordsPerMinute = 200
        const wordCount = text.split(/\s+/).length
        const minutes = Math.ceil(wordCount / wordsPerMinute)
        return `${minutes} min read`
    }

    return (
        <div className="news-editor-page">
            <div className="container">
                <h1>News Editor</h1>
                <p className="editor-description">Create your article and download the Markdown file. Then move it to <code>public/articles/</code>.</p>

                <div className="editor-grid">
                    <div className="editor-metadata">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Article Title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Short summary..."
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Technology">Technology</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Business Solution">Business Solution</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Cover Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="AI, Innovation, Tech"
                            />
                        </div>
                    </div>

                    <div className="editor-content">
                        <div className="form-group">
                            <label>Content (Markdown)</label>
                            <textarea
                                className="content-textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="# Writes your article here..."
                            />
                        </div>
                    </div>
                </div>

                <div className="editor-actions">
                    <button className="download-btn" onClick={handleDownload}>
                        Download Markdown File
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsEditorPage
