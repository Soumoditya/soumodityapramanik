import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS, getProjectBySlug, slugFor, NAME, SITE_URL } from '../../data'

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: slugFor(p) }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProjectBySlug(params.slug)
  if (!p) return {}
  const url = `${SITE_URL}/projects/${params.slug}/`
  const title = `${p.n} — ${p.cat} by ${NAME}`
  return {
    title: `${p.n} — ${p.cat}`,
    description: p.desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: p.desc,
      siteName: NAME,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${p.n} — ${p.cat}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: p.desc,
      images: ['/og.png'],
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug)
  if (!p) notFound()

  const url = `${SITE_URL}/projects/${params.slug}/`
  const others = PROJECTS.filter(x => x.n !== p.n)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#app`,
        name: p.n,
        url,
        description: p.desc,
        applicationCategory: p.cat,
        operatingSystem: p.tags.includes('Android') ? 'Android' : 'Web',
        author: { '@id': `${SITE_URL}/#person` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        ...(p.url ? { sameAs: p.url } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects/` },
          { '@type': 'ListItem', position: 3, name: p.n, item: url },
        ],
      },
    ],
  }

  return (
    <main className="doc">
      {/* these routes are normal scrollable documents, unlike the WebGL home */}
      <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumb">
        <a href="/">Home</a> <span>/</span> <a href="/projects/">Projects</a> <span>/</span>{' '}
        <span className="here">{p.n}</span>
      </nav>

      <header className="head">
        <p className="kicker" style={{ color: p.accent }}>{p.cat}</p>
        <h1 style={{ '--accent': p.accent } as React.CSSProperties}>{p.n}</h1>
        <p className="lede">{p.desc}</p>
      </header>

      <ul className="tags">
        {p.tags.map(t => <li key={t}>{t}</li>)}
      </ul>

      <div className="cta">
        {p.url ? (
          <a className="btn" href={p.url} target="_blank" rel="noopener" style={{ borderColor: p.accent, color: p.accent }}>
            {p.cta} &rarr;
          </a>
        ) : (
          <span className="btn disabled">{p.cta}</span>
        )}
      </div>

      <section className="more">
        <h2>More projects by {NAME}</h2>
        <ul>
          {others.map(o => (
            <li key={o.n}>
              <a href={`/projects/${slugFor(o)}/`}>
                <span className="on" style={{ background: o.accent }} />
                <strong>{o.n}</strong> <em>— {o.cat}</em>
              </a>
            </li>
          ))}
        </ul>
        <p className="back"><a href="/">&larr; Back to {NAME}</a></p>
      </section>
    </main>
  )
}

const DOC_CSS = `
  html,body{overflow:auto!important;height:auto!important;touch-action:auto!important;background:#020204}
  .doc{max-width:760px;margin:0 auto;padding:64px 24px 96px;color:#F0ECE2;font-family:var(--sans)}
  .doc a{color:inherit}
  .crumb{font-family:var(--mono);font-size:11px;letter-spacing:.08em;color:#63605a;margin-bottom:48px}
  .crumb a:hover{color:#F0ECE2}
  .crumb .here{color:#9A958C}
  .crumb span{opacity:.5;margin:0 4px}
  .kicker{font-family:var(--mono);font-size:12px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:14px}
  .head h1{font-family:var(--serif);font-size:clamp(44px,9vw,88px);line-height:1;font-weight:400;margin-bottom:22px;
    background:linear-gradient(180deg,#fff, var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}
  .lede{font-size:clamp(18px,2.4vw,23px);line-height:1.5;color:#C9C4BA;max-width:62ch}
  .tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:30px 0 40px}
  .tags li{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:#9A958C;border:1px solid rgba(240,236,226,.16);border-radius:100px;padding:6px 12px}
  .cta{margin-bottom:80px}
  .btn{display:inline-block;font-family:var(--mono);font-size:13px;letter-spacing:.1em;text-transform:uppercase;
    border:1px solid rgba(240,236,226,.3);border-radius:100px;padding:14px 26px;transition:opacity .2s,transform .2s}
  .btn:hover{transform:translateY(-2px);opacity:.85}
  .btn.disabled{color:#63605a;border-color:rgba(240,236,226,.14);cursor:default}
  .more{border-top:1px solid rgba(240,236,226,.1);padding-top:40px}
  .more h2{font-family:var(--serif);font-size:24px;font-weight:400;color:#C9C4BA;margin-bottom:22px}
  .more ul{list-style:none;display:grid;gap:2px}
  .more li a{display:flex;align-items:center;gap:12px;padding:12px 10px;border-radius:10px;transition:background .2s}
  .more li a:hover{background:rgba(240,236,226,.05)}
  .more .on{width:9px;height:9px;border-radius:50%;flex:none}
  .more em{color:#63605a;font-style:normal}
  .back{margin-top:36px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:#9A958C}
  .back a:hover{color:#F0ECE2}
`
