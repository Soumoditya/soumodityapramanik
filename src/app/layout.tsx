import type { Metadata } from 'next'
import './globals.css'
import { NAME, SITE_URL, DESCRIPTION, EMAIL, PROJECTS, SOCIALS, EDU, SKILLS } from './data'

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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${NAME} — Developer & Maker, India`, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NAME} — Developer & Maker`,
    description: DESCRIPTION,
    site: '@Soumodityax',
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

/* Google's ProfilePage rich result REQUIRES `mainEntity` pointing at the
   Person (an `about` reference is not accepted — Search Console reports
   "Missing field 'mainEntity'"). The Person is defined inline inside
   mainEntity rather than as a bare {"@id"} reference so the required fields
   are present on the node itself; the @id is kept so publisher/author
   references elsewhere in the graph still resolve to the same entity. */
const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  jobTitle: 'Web Developer',
  description: DESCRIPTION,
  nationality: { '@type': 'Country', name: 'India' },
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  email: EMAIL,
  alumniOf: EDU.map(e => ({
    '@type': e.inst.includes('University') ? 'CollegeOrUniversity' : 'HighSchool',
    name: e.inst,
  })),
  knowsAbout: SKILLS,
  sameAs: SOCIALS.map(s => s[1]),
  mainEntityOfPage: { '@id': `${SITE_URL}/#profile` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL, name: NAME,
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: `${NAME} — Developer & Maker`,
      mainEntity: person,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en-IN',
      primaryImageOfPage: `${SITE_URL}/og.png`,
    },
    // the nine real projects, so search engines can surface them individually
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: `Projects by ${NAME}`,
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.n,
          description: p.desc,
          applicationCategory: p.cat,
          operatingSystem: p.tags.includes('Android') ? 'Android' : 'Web',
          author: { '@id': `${SITE_URL}/#person` },
          ...(p.url ? { url: p.url } : {}),
        },
      })),
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
      <body>
        {children}
        {/* real content for crawlers and anyone without JS / WebGL */}
        <noscript>
          <div className="noscript-doc">
            <h1>{NAME} — Developer &amp; Maker, India</h1>
            <p>{DESCRIPTION}</p>
            <h2>Projects</h2>
            <ul>
              {PROJECTS.map(p => (
                <li key={p.n}>
                  {p.url ? <a href={p.url}>{p.n}</a> : <strong>{p.n}</strong>}
                  {` — ${p.cat}. ${p.desc} (${p.tags.join(', ')})`}
                </li>
              ))}
            </ul>
            <h2>Education</h2>
            <ul>{EDU.map(e => <li key={e.inst}>{`${e.yr} — ${e.inst}, ${e.deg}, ${e.place}`}</li>)}</ul>
            <h2>Skills</h2>
            <p>{SKILLS.join(', ')}</p>
            <h2>Contact</h2>
            <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <ul>{SOCIALS.map(s => <li key={s[0]}><a href={s[1]}>{s[0]}</a></li>)}</ul>
          </div>
        </noscript>
      </body>
    </html>
  )
}
