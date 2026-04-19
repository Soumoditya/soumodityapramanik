import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://soumodityapramanik.in'
const NAME = 'Soumoditya Pramanik'
const DESCRIPTION = 'Full-Stack Developer & Published Author from West Bengal, India. BCA Graduate (CGPA 7.48) specialising in React, Node.js, MongoDB, WordPress. Open to work.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} — Developer & Author`, template: `%s | ${NAME}` },
  description: DESCRIPTION,
  keywords: [
    'Soumoditya Pramanik','Full Stack Developer West Bengal','BCA Graduate India',
    'React Developer Rampurhat','Node.js Developer Birbhum','MongoDB Developer',
    'WordPress Developer India','Brainware University BCA','Published Author India',
    'MERN Stack Developer','Junior Developer India','Fresher Developer West Bengal',
    'soumodityapramanik.in','Soumoditya developer',
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME, publisher: NAME,
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL,
    siteName: NAME,
    title: `${NAME} — Full-Stack Developer & Author`,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NAME} — Full-Stack Developer & Author`,
    description: DESCRIPTION,
    creator: '@Soumodityax',
    images: ['/og.png'],
  },
  alternates: { canonical: SITE_URL },
  verification: { google: '' },
  category: 'technology',
  other: {
    'geo.region': 'IN-WB',
    'geo.placename': 'Rampurhat, West Bengal, India',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: NAME, url: SITE_URL,
      jobTitle: 'Full-Stack Developer',
      description: DESCRIPTION,
      birthDate: '2004-10-12',
      nationality: { '@type': 'Country', name: 'India' },
      address: { '@type': 'PostalAddress', addressLocality: 'Rampurhat', addressRegion: 'West Bengal', postalCode: '731224', addressCountry: 'IN' },
      email: 'soumodityapramanik@gmail.com',
      alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Brainware University', address: 'Barasat, West Bengal, India' }],
      knowsAbout: ['JavaScript','TypeScript','React','Next.js','Node.js','MongoDB','Python','WordPress','Web Development','Vedic Astrology'],
      sameAs: ['https://www.linkedin.com/in/soumodityapramanik','https://github.com/Soumoditya','https://x.com/Soumodityax','https://www.instagram.com/soumodityapramanik','https://youtube.com/@soumodityapramanik','https://www.facebook.com/Soumodityapramanik','http://grokipedia.com/page/soumoditya-pramanik'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL, name: NAME,
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Book',
      name: 'Shankaracharya Message',
      author: { '@id': `${SITE_URL}/#person` },
      url: 'https://amzn.in/d/0j1rKv5a',
      publisher: 'Amazon KDP',
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#080808" />
        <meta name="color-scheme" content="dark" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}
