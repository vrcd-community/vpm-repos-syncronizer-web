export interface DocPage {
  slug: string
  path: string
  title: string
  source: string
}

const sources = import.meta.glob('../../content/docs/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const preferredOrder = ['index', 'getting-started', 'faq', 'contact']

export const docs = Object.entries(sources)
  .map(([file, source]): DocPage => {
    const slug = file.split('/').pop()?.replace(/\.md$/, '') || 'index'
    const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim() || slug
    return {
      slug,
      path: slug === 'index' ? '/docs' : `/docs/${slug}`,
      title,
      source,
    }
  })
  .sort((a, b) => preferredOrder.indexOf(a.slug) - preferredOrder.indexOf(b.slug))

export function getDoc(slug?: string | string[]) {
  const normalized = Array.isArray(slug) ? slug.join('/') : slug
  return docs.find(doc => doc.slug === (normalized || 'index'))
}
