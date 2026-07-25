import { MetadataRoute } from 'next'
import { NAME, DESCRIPTION } from './data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${NAME} — Developer & Maker`,
    short_name: NAME.split(' ')[0],
    description: DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#020204',
    theme_color: '#020204',
    orientation: 'any',
    categories: ['portfolio', 'technology'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
