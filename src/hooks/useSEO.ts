import { useEffect } from 'react'

export interface SEOProps {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'software'
  schema?: Record<string, any>
}

export const useSEO = ({
  title,
  description,
  ogImage = '/favicon.ico',
  ogType = 'website',
  schema,
}: SEOProps) => {
  useEffect(() => {
    // 1. Update Document Title
    const brandSuffix = 'Kancio Development'
    document.title = title.includes(brandSuffix) ? title : `${title} | ${brandSuffix}`

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Helper to update/create meta property
    const updateOrCreateMeta = (key: string, value: string, isProperty = true) => {
      const attributeName = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attributeName}="${key}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attributeName, key)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', value)
    }

    // 3. Open Graph Metadata
    updateOrCreateMeta('og:title', title, true)
    updateOrCreateMeta('og:description', description, true)
    updateOrCreateMeta('og:image', ogImage, true)
    updateOrCreateMeta('og:url', window.location.href, true)
    updateOrCreateMeta('og:type', ogType, true)

    // 4. Twitter Metadata
    updateOrCreateMeta('twitter:card', 'summary_large_image', false)
    updateOrCreateMeta('twitter:title', title, false)
    updateOrCreateMeta('twitter:description', description, false)
    updateOrCreateMeta('twitter:image', ogImage, false)

    // 5. Schema Markup Injection
    const schemaId = 'json-ld-dynamic-schema'
    const existingSchema = document.getElementById(schemaId)
    if (existingSchema) {
      existingSchema.remove()
    }

    if (schema) {
      const script = document.createElement('script')
      script.id = schemaId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    return () => {
      // Clean up dynamic schema when component unmounts
      const currentSchema = document.getElementById(schemaId)
      if (currentSchema) {
        currentSchema.remove()
      }
    }
  }, [title, description, ogImage, ogType, schema])
}
