import type { Metadata } from 'next'
import { PROJECTS, slugFor, NAME, SITE_URL, DESCRIPTION } from '../data'

const url = `${SITE_URL}/projects/`

export const metadata: Metadata = {
  title: 'Projects',
  description: `Projects by ${NAME} — web apps, AI tools and Android apps built with React, Next.js and TypeScript.`,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title: `Projects by ${NAME}`,
    description: `Web apps, AI tools and Android apps built by ${NAME}.`,
    siteName: NAME,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `Projects by ${NAME}` }],
  },
  twitter: { card: 'summary_large_image', title: `Projects by ${NAME}`, images: ['/og.png'] },
}

export default function ProjectsIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: `Projects by ${NAME}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/projects/${slugFor(p)}/`,
        name: p.n,
      })),
    },
  }

  return (
    <main className="doc">
      <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumb">
        <a href="/">Home</a> <span>/</span> <span className="here">Projects</span>
      </nav>

      <header className="head">
        <h1>Projects</h1>
        <p className="lede">{DESCRIPTION}</p>
      </header>

      <ul className="grid">
        {PROJECTS.map(p => (
          <li key={p.n}>
            <a href={`/projects/${slugFor(p)}/`} style={{ ['--accent' as string]: p.accent } as React.CSSProperties}>
              <span className="on" style={{ background: p.accent }} />
              <span className="body">
                <span className="cat">{p.cat}</span>
                <strong>{p.n}</strong>
                <span className="d">{p.desc}</span>
              </span>
              <span className="go">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="back"><a href="/">&larr; Back to {NAME}</a></p>
    </main>
  )
}

const DOC_CSS = `
  html,body{overflow:auto!important;height:auto!important;touch-action:auto!important;background:#020204}
  .doc{max-width:820px;margin:0 auto;padding:64px 24px 96px;color:#F0ECE2;font-family:var(--sans)}
  .doc a{color:inherit}
  .crumb{font-family:var(--mono);font-size:11px;letter-spacing:.08em;color:#63605a;margin-bottom:48px}
  .crumb a:hover{color:#F0ECE2}.crumb .here{color:#9A958C}.crumb span{opacity:.5;margin:0 4px}
  .head h1{font-family:var(--serif);font-size:clamp(48px,10vw,92px);line-height:1;font-weight:400;margin-bottom:20px}
  .lede{font-size:clamp(17px,2.2vw,21px);line-height:1.5;color:#C9C4BA;max-width:60ch;margin-bottom:52px}
  .grid{list-style:none;display:grid;gap:2px}
  .grid a{display:flex;align-items:flex-start;gap:16px;padding:20px 16px;border-radius:14px;border:1px solid transparent;transition:background .2s,border-color .2s}
  .grid a:hover{background:rgba(240,236,226,.04);border-color:var(--accent)}
  .grid .on{width:11px;height:11px;border-radius:50%;flex:none;margin-top:6px}
  .grid .body{display:flex;flex-direction:column;gap:5px;flex:1}
  .grid .cat{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
  .grid strong{font-family:var(--serif);font-size:26px;font-weight:400}
  .grid .d{color:#9A958C;font-size:15px;line-height:1.5;max-width:56ch}
  .grid .go{color:#63605a;font-size:20px;align-self:center}
  .grid a:hover .go{color:var(--accent)}
  .back{margin-top:44px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:#9A958C}
  .back a:hover{color:#F0ECE2}
`
