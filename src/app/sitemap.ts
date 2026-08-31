import { MetadataRoute } from 'next'
import { SITE_URL, PROJECTS, slugFor } from './data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/projects/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...PROJECTS.map(p => ({
      url: `${SITE_URL}/projects/${slugFor(p)}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
