'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Real projects (all live, verified) ── */
const PROJECTS = [
  {
    name: 'ResumeForge', tag: 'AI Tool',
    desc: 'AI resume builder, analyzer & job-tailor with ATS scoring — built with Next.js, Tailwind and Google Gemini.',
    stack: ['Next.js', 'Tailwind', 'Gemini AI'],
    url: 'https://resumeforge-flame.vercel.app',
  },
  {
    name: 'Banana Chat', tag: 'Platform',
    desc: 'A real-time social & chat platform — clean, fast, and built for conversation.',
    stack: ['JavaScript', 'Realtime', 'Web'],
    url: 'https://banana-chat-app.vercel.app',
  },
  {
    name: 'soumo-os', tag: 'Experience',
    desc: 'An interactive operating-system-style web experience — a playful, boot-up personal interface.',
    stack: ['Next.js', 'TypeScript', 'Motion'],
    url: 'https://soumo-os.vercel.app',
  },
  {
    name: 'Sadhak Ayurved', tag: 'SaaS',
    desc: 'A management system for an Ayurvedic clinic — patients, records and day-to-day operations.',
    stack: ['Web App', 'Dashboard', 'CRUD'],
    url: 'https://sadhak-web.vercel.app',
  },
  {
    name: 'Vintly', tag: 'Utility',
    desc: 'A client-side study-material processor that turns raw notes into clean, usable study content.',
    stack: ['TypeScript', 'Client-side', 'Web'],
    url: 'https://vintly.vercel.app',
  },
  {
    name: 'Days Until', tag: 'Utility',
    desc: 'A minimal countdown & date-tracker for the moments you don’t want to miss.',
    stack: ['Web App', 'Countdown', 'PWA'],
    url: 'https://daysuntil.vercel.app',
  },
]

const STACK = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Tailwind CSS', 'Node.js', 'Git & GitHub', 'Vercel', 'AI APIs',
]

const SOCIALS = [
  { n: 'GitHub', url: 'https://github.com/Soumoditya' },
  { n: 'LinkedIn', url: 'https://www.linkedin.com/in/soumodityapramanik' },
  { n: 'X', url: 'https://x.com/Soumodityax' },
  { n: 'Instagram', url: 'https://www.instagram.com/soumodityapramanik' },
  { n: 'YouTube', url: 'https://youtube.com/@soumodityapramanik' },
]

const MARQUEE = ['Web Development', 'UI Engineering', 'AI Tools', 'Product Design', 'Full-Stack', 'Interfaces']

/* Arrow ↗ */
const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
)

/* ── Three.js hero: refined flowing particle field ── */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(hover: none)').matches) return // skip WebGL on touch
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parent = canvas.parentElement!
    let W = parent.offsetWidth, H = parent.offsetHeight
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 7

    // Flowing particle field
    const COUNT = 1400
    const pos = new Float32Array(COUNT * 3)
    const seed = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 13
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7
      seed[i] = Math.random() * Math.PI * 2
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.018, color: 0xEDEAE3, transparent: true, opacity: 0.55, sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Thin accent ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.004, 8, 220),
      new THREE.MeshBasicMaterial({ color: 0xB6FF3C, transparent: true, opacity: 0.10 })
    )
    ring.rotation.x = -0.4
    scene.add(ring)

    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0
    const onMove = (e: MouseEvent) => { mx = (e.clientX / W - 0.5); my = -(e.clientY / H - 0.5) }
    const onResize = () => { W = parent.offsetWidth; H = parent.offsetHeight; renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix() }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    const arr = geo.attributes.position.array as Float32Array
    const base = pos.slice()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = Date.now() * 0.0004
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t + seed[i]) * 0.14
        arr[i * 3] = base[i * 3] + Math.cos(t * 0.8 + seed[i]) * 0.10
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y = t * 0.15
      ring.rotation.z = t * 0.6
      cx += (mx * 1.1 - cx) * 0.04; cy += (my * 0.8 - cy) * 0.04
      camera.position.x = cx; camera.position.y = cy; camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf); renderer.dispose()
      window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize)
    }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

export default function Page() {
  const open = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hover = window.matchMedia('(hover: hover)').matches

    /* ── CURSOR (+ magnetic) ── */
    const cursor = document.getElementById('cursor')
    let mxr = 0, myr = 0, cxr = 0, cyr = 0
    if (cursor && hover) {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      window.addEventListener('mousemove', e => { mxr = e.clientX; myr = e.clientY })
      const loop = () => { cxr = lerp(cxr, mxr, 0.2); cyr = lerp(cyr, myr, 0.2); cursor.style.left = cxr + 'px'; cursor.style.top = cyr + 'px'; requestAnimationFrame(loop) }
      loop()
      document.querySelectorAll('a,button,.work-item,.chip,.social').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'))
      })
      // magnetic
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect()
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`
        })
        el.addEventListener('mouseleave', () => { el.style.transform = '' })
      })
    }

    /* ── PRELOADER counter ── */
    const pre = document.getElementById('pre')
    const count = document.getElementById('preCount')
    const bar = document.getElementById('preBar')
    document.body.style.overflow = 'hidden'
    let n = 0
    const dur = reduce ? 200 : 1600
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      n = Math.round(p * 100)
      if (count) count.firstChild!.textContent = String(n)
      if (bar) bar.style.width = p * 100 + '%'
      if (p < 1) requestAnimationFrame(step)
      else {
        pre?.classList.add('done')
        document.body.style.overflow = ''
        setTimeout(() => {
          document.querySelectorAll('.hero-name .line > span').forEach((s, i) => {
            setTimeout(() => ((s as HTMLElement).style.transform = 'none'), i * 120)
          })
          document.querySelector('.hero-lines')?.classList.add('in')
        }, 60)
      }
    }
    requestAnimationFrame(step)

    /* ── Reveal observer ── */
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal,.lines').forEach(el => io.observe(el))

    /* ── Lenis ── */
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    if (!reduce) import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.3, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })

    /* ── Nav stuck ── */
    const onScroll = () => document.querySelector('nav')?.classList.toggle('stuck', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => { io.disconnect(); lenis?.destroy(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const toggle = () => {
    open.current = !open.current
    const o = open.current
    document.getElementById('menu')?.classList.toggle('open', o)
    const b = document.getElementById('burger')
    if (b) {
      const s = b.querySelectorAll('span')
      s[0].style.transform = o ? 'rotate(45deg) translate(5px,5px)' : ''
      s[1].style.opacity = o ? '0' : '1'
      s[2].style.transform = o ? 'rotate(-45deg) translate(5px,-5px)' : ''
    }
  }
  const close = () => {
    open.current = false
    document.getElementById('menu')?.classList.remove('open')
    const b = document.getElementById('burger')
    if (b) { const s = b.querySelectorAll('span'); s[0].style.transform = ''; s[1].style.opacity = '1'; s[2].style.transform = '' }
  }

  return (
    <>
      <div id="grain" />
      <div id="cursor" />

      {/* PRELOADER */}
      <div id="pre">
        <div className="pre-name"><span>Soumoditya</span></div>
        <div id="preCount" className="pre-count">0<sup>%</sup></div>
        <div id="preBar" className="pre-bar" />
      </div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">SP</a>
        <div className="nav-mid">
          {['Work', 'About', 'Stack', 'Connect'].map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
        </div>
        <div className="nav-right"><span className="nav-dot" /> Available</div>
        <button id="burger" className="burger" onClick={toggle} aria-label="Menu"><span /><span /><span /></button>
      </nav>

      {/* MOBILE MENU */}
      <div id="menu">
        {['Work', 'About', 'Stack', 'Connect'].map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={close}>{l}</a>)}
        <a className="menu-mail" href="mailto:soumodityapramanik@gmail.com" onClick={close}>Get in touch →</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <HeroCanvas />
        <div className="wrap">
          <div className="hero-top">
            <span>Developer <b>&amp; Maker</b></span>
            <span>West Bengal, <b>India</b></span>
          </div>
          <h1 className="hero-name lines hero-lines">
            <span className="line"><span>Soumoditya</span></span>
            <span className="line"><span><em>Pramanik</em></span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-role reveal">
              I design and build <b>web apps and digital products</b> — from AI tools to
              interactive interfaces. Independent developer, always shipping something new.
            </p>
            <div className="hero-scroll">Scroll to explore</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className={`marquee-item ${i % 2 ? 'dim' : ''}`}>{m}<span>◆</span></span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>01</b> — About</div>
          <h2 className="about-statement reveal">
            I build things for the web that are <em>fast, clean, and worth using.</em>
          </h2>
          <div className="about-grid">
            <div className="about-bio reveal">
              <p>
                I&apos;m <b>Soumoditya Pramanik</b>, a developer from West Bengal, India. I work across
                the stack — mostly <b>React, Next.js and TypeScript</b> — building web apps, AI tools
                and small products end to end.
              </p>
              <p>
                Most of what I make starts as a personal itch: a resume tool, a chat app, a study
                utility. I like turning rough ideas into things people can actually open and use.
                Curious by default, self-taught in practice, and always building the next one.
              </p>
            </div>
            <div className="about-facts reveal">
              {[
                { k: 'Based in', v: 'West Bengal, India' },
                { k: 'Focus', v: 'Web apps · AI tools · UI' },
                { k: 'Education', v: 'BCA · Brainware University' },
                { k: 'Status', v: 'Open to interesting work' },
              ].map(f => (
                <div key={f.k} className="fact">
                  <div className="fact-k">{f.k}</div>
                  <div className="fact-v">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>02</b> — Selected Work</div>
          <div className="work-head">
            <h2 className="work-title reveal">Projects</h2>
            <span className="work-count reveal">{String(PROJECTS.length).padStart(2, '0')} / live</span>
          </div>
          <div className="work-list">
            {PROJECTS.map((p, i) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener" className="work-item reveal">
                <div className="work-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="work-main">
                  <div className="work-name">{p.name}<em>{p.tag}</em></div>
                  <div className="work-desc">{p.desc}</div>
                  <div className="work-stack">{p.stack.map(s => <span key={s} className="work-tag">{s}</span>)}</div>
                </div>
                <div className="work-go">Visit <Arrow /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>03</b> — Toolkit</div>
          <h2 className="about-statement reveal">Tools I work with.</h2>
          <div className="stack-grid">
            {STACK.map(s => <span key={s} className="chip reveal">{s}</span>)}
          </div>
          <p className="stack-note reveal">Comfortable with these day to day — and always adding to the list.</p>
          <div className="eyebrow" style={{ marginTop: 'clamp(64px,8vw,110px)' }}><b>04</b> — Education</div>
          <div className="edu-line reveal">
            Bachelor of Computer Applications <span className="yr">— Brainware University · 2025</span>
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>05</b> — Connect</div>
          <h2 className="connect-h reveal">Let&apos;s build<br /><em>something.</em></h2>
          <p className="connect-sub reveal">
            Got an idea, a project, or just want to talk shop? My inbox is open.
          </p>
          <a className="connect-mail reveal" data-magnetic href="mailto:soumodityapramanik@gmail.com">
            soumodityapramanik@gmail.com <Arrow />
          </a>
          <div className="socials">
            {SOCIALS.map(s => (
              <a key={s.n} className="social reveal" href={s.url} target="_blank" rel="noopener">{s.n} <Arrow /></a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-l">© {new Date().getFullYear()} Soumoditya Pramanik</div>
          <div className="foot-r">Built with Next.js · <a href="https://github.com/Soumoditya" target="_blank" rel="noopener">Source</a></div>
        </div>
      </footer>
    </>
  )
}
