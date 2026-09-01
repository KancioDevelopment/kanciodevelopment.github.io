import { useEffect } from 'react'

export interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'software'
  schema?: Record<string, any>
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/favicon.ico',
  ogType = 'website',
  schema,
}: SEOProps) => {
  useEffect(() => {
    // 1. Update Document Title
    const brandSuffix = 'Kancio Development'
    document.title = title.includes(brandSuffix) ? title : `${title} | ${brandSuffix}`

    // Helper to update/create meta tag
    const updateOrCreateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attributeName, nameOrProperty)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', value)
    }

    // 2. Meta Description
    updateOrCreateMeta('description', description, false)

    // 3. Meta Keywords
    if (keywords) {
      updateOrCreateMeta('keywords', keywords, false)
    }

    // 4. Canonical URL
    const canonicalHref = canonicalUrl || window.location.href.split('#')[0].split('?')[0]
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalHref)

    // 5. Open Graph Metadata
    updateOrCreateMeta('og:title', title, true)
    updateOrCreateMeta('og:description', description, true)
    updateOrCreateMeta('og:image', ogImage.startsWith('http') ? ogImage : `https://kancio.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`, true)
    updateOrCreateMeta('og:url', canonicalHref, true)
    updateOrCreateMeta('og:type', ogType, true)
    updateOrCreateMeta('og:locale', 'id_ID', true)
    updateOrCreateMeta('og:site_name', 'Kancio Development', true)

    // 6. Twitter Metadata
    updateOrCreateMeta('twitter:card', 'summary_large_image', false)
    updateOrCreateMeta('twitter:title', title, false)
    updateOrCreateMeta('twitter:description', description, false)
    updateOrCreateMeta('twitter:image', ogImage.startsWith('http') ? ogImage : `https://kancio.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`, false)
    updateOrCreateMeta('twitter:url', canonicalHref, false)

    // 7. Schema Markup Injection
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
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema])
}
