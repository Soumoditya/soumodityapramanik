import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://soumodityapramanik.in'
const NAME = 'Soumoditya Pramanik'
const DESCRIPTION = 'Developer & maker from India. I build web apps, AI tools and interactive interfaces with React, Next.js and TypeScript.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} — Developer & Maker`, template: `%s | ${NAME}` },
  description: DESCRIPTION,
  keywords: [
    'Soumoditya Pramanik','Web Developer India','React Developer India',
    'Next.js Developer','TypeScript Developer','Frontend Developer India',
    'AI Tools Developer','Full-Stack Developer','soumodityapramanik.in',
    'Soumoditya developer','NagrikNazar','ResumeForge','Sampark','Sadhak app',
    'PassPredictor','Banana Chat','Vintly',
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
    title: `${NAME} — Developer & Maker`,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NAME} — Developer & Maker`,
    description: DESCRIPTION,
    creator: '@Soumodityax',
    images: ['/og.png'],
  },
  alternates: { canonical: SITE_URL },
  category: 'technology',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: NAME, url: SITE_URL,
      jobTitle: 'Web Developer',
      description: DESCRIPTION,
      nationality: { '@type': 'Country', name: 'India' },
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      email: 'soumodityapramanik@gmail.com',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Brainware University' },
        { '@type': 'HighSchool', name: 'Rampurhat Jitendralal Vidyabhaban' },
      ],
      knowsAbout: ['JavaScript','TypeScript','React','Next.js','Node.js','Tailwind CSS','Three.js','Web Development','AI Tools'],
      sameAs: ['https://www.linkedin.com/in/soumodityapramanik','https://github.com/Soumoditya','https://x.com/Soumodityax','https://www.instagram.com/soumodityapramanik','https://youtube.com/@soumodityapramanik'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL, name: NAME,
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-IN',
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
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="dark" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}
