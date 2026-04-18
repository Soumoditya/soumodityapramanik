import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://soumodityapramanik.in'
const NAME = 'Soumoditya Pramanik'
const DESCRIPTION = 'Full-Stack Developer, Published Author & Tech Creator from Rampurhat, West Bengal, India. BCA Graduate specialising in React, Node.js, MongoDB & WordPress.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} — Developer & Author`, template: `%s | ${NAME}` },
  description: DESCRIPTION,
  keywords: ['Soumoditya Pramanik','Full Stack Developer','West Bengal Developer','BCA Graduate','React Developer India','Node.js Developer','MongoDB','WordPress Developer','Rampurhat','Brainware University','Published Author'],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', locale: 'en_IN', url: SITE_URL, siteName: NAME, title: `${NAME} — Developer & Author`, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: `${NAME} — Developer & Author`, description: DESCRIPTION, creator: '@Soumodityax' },
  alternates: { canonical: SITE_URL },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME, url: SITE_URL,
  jobTitle: 'Full-Stack Developer',
  description: DESCRIPTION,
  birthDate: '2004-10-12',
  nationality: 'Indian',
  address: { '@type': 'PostalAddress', addressLocality: 'Rampurhat', addressRegion: 'West Bengal', postalCode: '731224', addressCountry: 'IN' },
  email: 'soumodityapramanik@gmail.com',
  telephone: '+91-9064882049',
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Brainware University', location: 'Barasat, West Bengal' }],
  knowsAbout: ['JavaScript','React','Node.js','MongoDB','Python','WordPress','Web Development'],
  sameAs: ['https://www.linkedin.com/in/soumodityapramanik','https://github.com/Soumoditya','https://x.com/Soumodityax','https://www.instagram.com/soumodityapramanik','https://youtube.com/@soumodityapramanik'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#07071a" />
      </head>
      <body className="noise">{children}</body>
    </html>
  )
}
