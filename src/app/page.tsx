'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type SocialEntry = {
  n: string; h: string; url: string;
  vars: { '--soc-bg': string; '--soc-border': string; '--soc-ic-bg': string };
  icon: React.ReactNode;
}
const SOCIALS: SocialEntry[] = [
  {
    n:'X / Twitter', h:'@Soumodityax', url:'https://x.com/Soumodityax',
    vars:{'--soc-bg':'rgba(255,255,255,0.04)','--soc-border':'rgba(255,255,255,0.2)','--soc-ic-bg':'rgba(255,255,255,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  },
  {
    n:'LinkedIn', h:'soumodityapramanik', url:'https://www.linkedin.com/in/soumodityapramanik',
    vars:{'--soc-bg':'rgba(10,102,194,0.06)','--soc-border':'rgba(10,102,194,0.3)','--soc-ic-bg':'rgba(10,102,194,0.12)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
  },
  {
    n:'GitHub', h:'Soumoditya', url:'https://github.com/Soumoditya',
    vars:{'--soc-bg':'rgba(200,241,53,0.04)','--soc-border':'rgba(200,241,53,0.25)','--soc-ic-bg':'rgba(200,241,53,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="#C8F135"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
  },
  {
    n:'YouTube', h:'@soumodityapramanik', url:'https://youtube.com/@soumodityapramanik',
    vars:{'--soc-bg':'rgba(255,0,0,0.04)','--soc-border':'rgba(255,0,0,0.25)','--soc-ic-bg':'rgba(255,0,0,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
  },
  {
    n:'Instagram', h:'@soumodityapramanik', url:'https://www.instagram.com/soumodityapramanik',
    vars:{'--soc-bg':'rgba(225,48,108,0.04)','--soc-border':'rgba(225,48,108,0.25)','--soc-ic-bg':'rgba(225,48,108,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  },
  {
    n:'Facebook', h:'Soumodityapramanik', url:'https://www.facebook.com/Soumodityapramanik',
    vars:{'--soc-bg':'rgba(24,119,242,0.04)','--soc-border':'rgba(24,119,242,0.25)','--soc-ic-bg':'rgba(24,119,242,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="#1877f2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  },
  {
    n:'Grokipedia', h:'soumoditya-pramanik', url:'http://grokipedia.com/page/soumoditya-pramanik',
    vars:{'--soc-bg':'rgba(200,241,53,0.03)','--soc-border':'rgba(200,241,53,0.2)','--soc-ic-bg':'rgba(200,241,53,0.06)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  },
  {
    n:'My Book', h:'Amazon KDP', url:'https://amzn.in/d/0j1rKv5a',
    vars:{'--soc-bg':'rgba(255,153,0,0.04)','--soc-border':'rgba(255,153,0,0.25)','--soc-ic-bg':'rgba(255,153,0,0.08)'},
    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  },
]

const SKILLS = [
  'HTML5','CSS3','JavaScript','TypeScript','React.js','Next.js',
  'Node.js','Express','MongoDB','Python','Java','MySQL',
  'WordPress','Git','GitHub','Vercel','AWS (Basic)','REST APIs','MERN Stack'
]

const PROJECTS = [
  {
    feat:true, num:'00 · Published',
    name:'Shankaracharya Message',
    desc:'A published work exploring Adi Shankaracharya\'s philosophical teachings — knowledge, devotion, and liberation. Available globally on Amazon KDP.',
    tags:['Published Book','Amazon KDP','Vedic Philosophy'],
    url:'https://amzn.in/d/0j1rKv5a'
  },
  {
    feat:false, num:'01',
    name:'Vedic Astro Engine',
    desc:'Full-stack astrology platform — Kundali (D1 & D9), Panchang, Navagraha analysis with animated Three.js interface.',
    tags:['React','Node.js','MongoDB'],
    url:'https://github.com/Soumoditya'
  },
  {
    feat:false, num:'02',
    name:'Library Management System',
    desc:'BCA final-year project — book cataloguing, member management, issue/return tracking with MySQL integration.',
    tags:['Python','MySQL','DBMS'],
    url:'https://github.com/Soumoditya'
  },
  {
    feat:false, num:'03',
    name:'MERN Stack App',
    desc:'Full-stack application with JWT auth, REST API, and responsive React frontend. CRUD operations with MongoDB.',
    tags:['MongoDB','Express','React','Node.js'],
    url:'https://github.com/Soumoditya'
  },
  {
    feat:false, num:'04',
    name:'Portfolio v5',
    desc:'This site — Next.js 14, TypeScript, GSAP, Three.js, Lenis. Static export to GitHub Pages, CI/CD via Actions.',
    tags:['Next.js','TypeScript','GSAP','Three.js'],
    url:'https://soumodityapramanik.in'
  },
]

const MQ = ['Full-Stack Dev','BCA Graduate 2025','React + Node.js','Published Author','West Bengal, India','Open to Work','MERN Stack','WordPress Dev','Vedic Astrology','Available Now']

/* ── Three.js Hero: constellation particles ── */
function ThreeHero() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const parent = canvas.parentElement!
    let W = parent.offsetWidth, H = parent.offsetHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 100)
    camera.position.z = 6

    // ── Particle constellation ──
    const COUNT = 180
    const pPositions = new Float32Array(COUNT * 3)
    const pColors = new Float32Array(COUNT * 3)

    const pts: {x:number,y:number,z:number}[] = []
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 18
      const y = (Math.random() - 0.5) * 11
      const z = (Math.random() - 0.5) * 5
      pts.push({x,y,z})
      pPositions[i*3]   = x
      pPositions[i*3+1] = y
      pPositions[i*3+2] = z
      if (Math.random() < 0.13) {
        pColors[i*3] = 0.78; pColors[i*3+1] = 0.95; pColors[i*3+2] = 0.21
      } else {
        const v = 0.14 + Math.random() * 0.22
        pColors[i*3] = v + 0.04; pColors[i*3+1] = v + 0.01; pColors[i*3+2] = v
      }
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)

    // ── Constellation lines (precomputed) ──
    const lineVerts: number[] = []
    const MAX_LINES = 55
    const CONN_DIST = 2.8
    for (let i = 0; i < COUNT && lineVerts.length/6 < MAX_LINES; i++) {
      for (let j = i+1; j < COUNT && lineVerts.length/6 < MAX_LINES; j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, dz=pts[i].z-pts[j].z
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < CONN_DIST) {
          lineVerts.push(pts[i].x,pts[i].y,pts[i].z, pts[j].x,pts[j].y,pts[j].z)
        }
      }
    }
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3))
    const lMat = new THREE.LineBasicMaterial({ color: 0xC8F135, transparent: true, opacity: 0.07 })
    const lines = new THREE.LineSegments(lGeo, lMat)

    // Group everything so they rotate together
    const group = new THREE.Group()
    group.add(particles, lines)
    scene.add(group)

    // ── Rings ──
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.005, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xC8F135, transparent: true, opacity: 0.09 })
    )
    ring1.rotation.x = -0.35; ring1.rotation.y = 0.2
    scene.add(ring1)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.003, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0xF2EDE5, transparent: true, opacity: 0.03 })
    )
    ring2.rotation.x = 0.5; ring2.rotation.y = -0.25
    scene.add(ring2)

    let mx = 0, my = 0, camX = 0, camY = 0, raf: number
    const onMove = (e: MouseEvent) => { mx = (e.clientX/W - 0.5)*1.2; my = -(e.clientY/H - 0.5)*0.9 }
    const onResize = () => {
      W = parent.offsetWidth; H = parent.offsetHeight
      renderer.setSize(W, H); camera.aspect = W/H; camera.updateProjectionMatrix()
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = Date.now() * 0.001
      group.rotation.y = t * 0.018
      group.rotation.x = t * 0.009
      ring1.rotation.z = t * 0.055
      ring2.rotation.z = -t * 0.032
      camX += (mx * 0.65 - camX) * 0.042
      camY += (my * 0.45 - camY) * 0.042
      camera.position.x = camX; camera.position.y = camY
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

/* ── Arrow icon ── */
const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
)

export default function Page() {
  const menuOpen = useRef(false)

  useEffect(() => {
    /* ── CURSOR ── */
    const cur = document.getElementById('cur')
    let cx = 0, cy = 0, dx = 0, dy = 0
    if (cur && window.matchMedia('(hover:hover)').matches) {
      const lerp = (a:number,b:number,t:number) => a+(b-a)*t
      document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY })
      const trackCursor = () => {
        dx=lerp(dx,cx,.12); dy=lerp(dy,cy,.12)
        cur.style.left=dx+'px'; cur.style.top=dy+'px'
        requestAnimationFrame(trackCursor)
      }
      trackCursor()
      document.querySelectorAll('a,button,.sk,.soc-card,.proj-card,.bc,.tl-item').forEach(el => {
        el.addEventListener('mouseenter', () => cur.classList.add('expand'))
        el.addEventListener('mouseleave', () => cur.classList.remove('expand'))
      })
    }

    /* ── LOADER ── */
    document.body.style.overflow = 'hidden'
    const loaderTimer = setTimeout(() => {
      document.getElementById('loader')?.classList.add('out')
      document.body.style.overflow = ''
      setTimeout(() => {
        document.querySelectorAll('.hero-name .row span').forEach((s, i) => {
          setTimeout(() => s.classList.add('in'), i * 140)
        })
      }, 80)
    }, 1500)

    /* ── INTERSECTION OBSERVER for .rv, .rv-l, .rv-s ── */
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv,.rv-l,.rv-s').forEach(el => observer.observe(el))

    /* ── LENIS ── */
    let lenis: {raf:(t:number)=>void; destroy:()=>void} | null = null
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.35, easing: (t:number) => Math.min(1,1.001-Math.pow(2,-10*t)) })
      const raf = (time:number) => { lenis!.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })

    /* ── GSAP ── */
    ;(async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Scroll progress bar
      gsap.to('.progress-fill', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
      })

      // Nav stuck
      ScrollTrigger.create({
        start: 'top -60',
        onEnter: () => document.querySelector('nav')?.classList.add('stuck'),
        onLeaveBack: () => document.querySelector('nav')?.classList.remove('stuck')
      })

      // Section headings
      gsap.utils.toArray<HTMLElement>('.sec-h').forEach(el => {
        gsap.fromTo(el, { opacity:0, y:36 }, { opacity:1, y:0, duration:1.1, ease:'power3.out', scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Stats count-up
      document.querySelectorAll<HTMLElement>('.bc-stat-val[data-v]').forEach(el => {
        const v = parseFloat(el.dataset.v||'0'); const dec = v % 1 !== 0
        gsap.to({ val: 0 }, {
          val: v, duration: 1.8, ease: 'power2.out',
          onUpdate() { el.textContent = dec ? (this.targets()[0] as {val:number}).val.toFixed(2) : Math.round((this.targets()[0] as {val:number}).val).toString() },
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      })

      // Skills stagger
      gsap.fromTo('.sk', { opacity:0, y:14 }, { opacity:1, y:0, duration:.5, stagger:.028, ease:'power2.out', scrollTrigger:{trigger:'.skills-cloud',start:'top 88%'} })

      // Language bars
      document.querySelectorAll<HTMLElement>('.lfill').forEach(el => {
        ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:()=>el.classList.add('on') })
      })

      // Bento cards
      gsap.utils.toArray<HTMLElement>('.bc').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, y:32 }, { opacity:1, y:0, duration:.9, ease:'power3.out', delay:(i%3)*.06, scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Timeline items
      gsap.utils.toArray<HTMLElement>('.tl-item').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, x:-28 }, { opacity:1, x:0, duration:.85, ease:'power3.out', delay:i*.08, scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Project cards
      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, y:38 }, { opacity:1, y:0, duration:.9, ease:'power3.out', delay:(i%2)*.08, scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Social cards
      gsap.fromTo('.soc-card', { opacity:0, scale:.92 }, { opacity:1, scale:1, duration:.7, stagger:.05, ease:'back.out(1.5)', scrollTrigger:{trigger:'.soc-grid',start:'top 86%'} })

      // CTA
      gsap.fromTo('.cta-h', { opacity:0, y:52 }, { opacity:1, y:0, duration:1.15, ease:'power3.out', scrollTrigger:{trigger:'.cta-wrap',start:'top 80%'} })
    })()

    /* ── NAV scroll ── */
    const onScroll = () => document.querySelector('nav')?.classList.toggle('stuck', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(loaderTimer)
      lenis?.destroy()
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleMenu = () => {
    menuOpen.current = !menuOpen.current
    const o = menuOpen.current
    document.getElementById('mob')?.classList.toggle('open', o)
    const h = document.getElementById('ham')
    if (h) {
      const s = h.querySelectorAll('span')
      s[0].style.transform = o ? 'rotate(45deg) translate(4px,4px)' : ''
      s[1].style.opacity   = o ? '0' : '1'
      s[2].style.transform = o ? 'rotate(-45deg) translate(4px,-4px)' : ''
    }
  }
  const closeMenu = () => {
    menuOpen.current = false
    document.getElementById('mob')?.classList.remove('open')
    const h = document.getElementById('ham')
    if (h) { const s=h.querySelectorAll('span'); s[0].style.transform=''; s[1].style.opacity='1'; s[2].style.transform='' }
  }

  return (
    <>
      {/* Progress */}
      <div className="progress"><div className="progress-fill" /></div>

      {/* Cursor */}
      <div id="cur" />

      {/* Loader */}
      <div id="loader">
        <div className="loader-inner">
          <div className="loader-word">
            <span>Soumoditya</span>
            <span>.</span>
          </div>
        </div>
        <div className="loader-label">Crafting Portfolio</div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
      </div>

      {/* Nav */}
      <nav id="nav">
        <a href="#" className="nav-logo">SP<span>.</span></a>
        <div className="nav-links">
          {['About','Education','Projects','Socials','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
        <a href="mailto:soumodityapramanik@gmail.com" className="nav-cta hidden md:inline-flex">Hire Me</a>
        <button id="ham" className="ham" onClick={toggleMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mob">
        {['About','Education','Projects','Socials','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a>
        ))}
        <a href="mailto:soumodityapramanik@gmail.com" className="mob-cta" onClick={closeMenu}>
          Hire Me →
        </a>
      </div>

      {/* ── HERO ── */}
      <section id="hero">
        <ThreeHero />

        <div className="hero-body">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            <span className="row"><span>Soumoditya</span></span>
            <span className="row"><span className="accent">Pramanik</span></span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-desc">
              <strong>Full-Stack Developer & Published Author</strong> from Rampurhat, West Bengal.
              BCA Graduate building web experiences and digital products.
            </p>
            <div className="hero-actions">
              <div className="hero-loc">
                <em>Rampurhat, WB</em> · India<br />
                BCA · <em>Brainware University</em> · 2025
              </div>
              <div className="hero-btns">
                <a href="mailto:soumodityapramanik@gmail.com" className="btn-p">Say Hello →</a>
                <a href="https://github.com/Soumoditya" target="_blank" rel="noopener" className="btn-s">
                  GitHub <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          <span className="scroll-hint-label">Scroll</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="mq">
        <div className="mq-track fwd">
          {[...MQ,...MQ,...MQ].map((item,i) => (
            <span key={i} className="mq-item">{item}<span className="mq-sep">◆</span></span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="sec">
        <div className="si">
          <div className="sec-label rv">01 — Identity</div>
          <h2 className="sec-h">About <i>Me</i></h2>

          <div className="bento">
            {/* Bio card — spans 2 cols */}
            <div className="bc bc-bio rv">
              <div className="bc-label">Biography</div>
              <div className="about-bio-text">
                <p>I&apos;m <strong>Soumoditya Pramanik</strong>, born October 12, 2004, in Rampurhat, Birbhum, West Bengal. A BCA Graduate from Brainware University (CGPA 7.48), building full-stack web products with the MERN stack.</p>
                <p>Beyond code, I&apos;m a <strong>published author</strong> — exploring Shankaracharya&apos;s philosophy through writing. I also create tech and Vedic astrology content across multiple platforms. Builder at heart, always shipping.</p>
              </div>
              <div className="tag-row" style={{marginTop:'22px'}}>
                {['Bengali (Native)','English','Hindi','Open to Work','BCA Graduate'].map((t,i) => (
                  <span key={t} className={`tag ${i===0||i===3?'tag-hl':''}`}>{t}</span>
                ))}
              </div>
            </div>

            {/* Stat: CGPA */}
            <div className="bc bc-stat rv d1">
              <div className="bc-label">University CGPA</div>
              <div className="bc-stat-val" data-v="7.48">7.48</div>
              <div className="bc-stat-lbl">Brainware University</div>
            </div>

            {/* Stat: Class XII */}
            <div className="bc bc-stat rv d2">
              <div className="bc-label">Class XII</div>
              <div className="bc-stat-val" data-v="82.8">82.8</div>
              <div className="bc-stat-lbl">WBCHSE · Percentage</div>
            </div>

            {/* Stat: BCA Overall */}
            <div className="bc bc-stat rv d3">
              <div className="bc-label">BCA Overall</div>
              <div className="bc-stat-val" data-v="73.27">73.27</div>
              <div className="bc-stat-lbl">Overall Percentage</div>
            </div>

            {/* Skills card */}
            <div className="bc bc-skills rv d2">
              <div className="bc-label">Tech Stack</div>
              <div className="skills-cloud">
                {SKILLS.map(s => <span key={s} className="sk">{s}</span>)}
              </div>
            </div>

            {/* Languages card */}
            <div className="bc bc-langs rv d3">
              <div className="bc-label">Languages</div>
              {[
                {n:'Bengali',l:'Native',w:1},
                {n:'English',l:'Proficient',w:0.82},
                {n:'Hindi',l:'Conversational',w:0.6}
              ].map(lang => (
                <div key={lang.n} className="lang-item">
                  <div className="lang-row">
                    <span className="lang-name">{lang.n}</span>
                    <span className="lang-level">{lang.l}</span>
                  </div>
                  <div className="lbar">
                    <div className="lfill" style={{transform:`scaleX(${lang.w})`}} />
                  </div>
                </div>
              ))}
            </div>

            {/* Details card */}
            <div className="bc bc-details rv d1">
              <div className="bc-label">Details</div>
              <div className="details-grid">
                {[
                  { k:'Birthday', v:'October 12, 2004' },
                  { k:'Location', v:'Rampurhat-1, Birbhum, West Bengal — 731224' },
                  { k:'Email',    v:<a href="mailto:soumodityapramanik@gmail.com">soumodityapramanik@gmail.com</a> },
                  { k:'LinkedIn', v:<a href="https://www.linkedin.com/in/soumodityapramanik" target="_blank" rel="noopener">linkedin.com/in/soumodityapramanik ↗</a> },
                  { k:'GitHub',   v:<a href="https://github.com/Soumoditya" target="_blank" rel="noopener">github.com/Soumoditya ↗</a> },
                  { k:'Degree',   v:'BCA · Brainware University · 2022–2025' },
                  { k:'Status',   v:'Available for entry-level roles & freelance' },
                ].map(r => (
                  <div key={r.k} className="drow">
                    <div className="dkey">{r.k}</div>
                    <div className="dval">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="sec" style={{background:'var(--s1)'}}>
        <div className="si">
          <div className="sec-label rv">02 — Background</div>
          <h2 className="sec-h">Education</h2>

          <div className="timeline">
            <div className="tl-item">
              <div className="tl-left">
                <div className="tl-yr">2022 – 2025</div>
                <div className="tl-deg">Bachelor of Computer Applications</div>
              </div>
              <div className="tl-right">
                <div className="tl-inst">Brainware University</div>
                <div className="tl-board">BCA · Barasat, West Bengal · Software Development, Web Technologies, Databases, OS, Networks</div>
                <div className="tl-scores">
                  <div>
                    <div className="tl-score-val">7.48</div>
                    <div className="tl-score-lbl">CGPA</div>
                  </div>
                  <div>
                    <div className="tl-score-val">73.27%</div>
                    <div className="tl-score-lbl">Overall</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-left">
                <div className="tl-yr">2022</div>
                <div className="tl-deg">Higher Secondary (XII)</div>
              </div>
              <div className="tl-right">
                <div className="tl-inst">Rampurhat Jitendralal Vidyabhaban</div>
                <div className="tl-board">WBCHSE · Rampurhat, Birbhum, West Bengal</div>
                <div className="tl-scores">
                  <div>
                    <div className="tl-score-val">82.8%</div>
                    <div className="tl-score-lbl">Percentage</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-left">
                <div className="tl-yr">2020</div>
                <div className="tl-deg">Madhyamik (Class X)</div>
              </div>
              <div className="tl-right">
                <div className="tl-inst">Rampurhat Jitendralal Vidyabhaban</div>
                <div className="tl-board">WBBSE · Rampurhat, Birbhum, West Bengal</div>
                <div className="tl-scores">
                  <div>
                    <div className="tl-score-val">70.29%</div>
                    <div className="tl-score-lbl">Percentage</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tl-item" style={{opacity:0.5}}>
              <div className="tl-left">
                <div className="tl-yr" style={{opacity:0.6}}>2009 – 2014</div>
                <div className="tl-deg">Primary School</div>
              </div>
              <div className="tl-right">
                <div className="tl-inst">Pranab Siksha Niketan</div>
                <div className="tl-board">Rampurhat, Birbhum · Bengali medium foundation years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec">
        <div className="si">
          <div className="sec-label rv">03 — Builds</div>
          <h2 className="sec-h">Selected <i>Work</i></h2>

          <div className="proj-grid">
            {PROJECTS.map(p => (
              <a key={p.num} href={p.url} target="_blank" rel="noopener"
                className={`proj-card${p.feat?' feat':''}`}>
                {p.feat && (
                  <div className="proj-feat-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Published Work
                  </div>
                )}
                <div className="proj-num">{p.num}</div>
                <div className="proj-name">{p.name}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-stack">
                  {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
                <div className="proj-arrow">
                  {p.feat ? 'View on Amazon' : 'View Project'}
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="sec" style={{background:'var(--s1)'}}>
        <div className="si">
          <div className="sec-label rv">04 — Presence</div>
          <h2 className="sec-h">Find Me <i>Online</i></h2>

          <div className="soc-grid">
            {SOCIALS.map(s => (
              <a key={s.n} href={s.url} target="_blank" rel="noopener"
                className="soc-card"
                style={s.vars as React.CSSProperties}>
                <div className="soc-icon">{s.icon}</div>
                <div className="soc-name">{s.n}</div>
                <div className="soc-handle">{s.h}</div>
                <div className="soc-arrow">Visit <ArrowIcon /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <div className="si">
          <div className="cta-wrap">
            <div className="cta-label">05 — Contact</div>
            <h2 className="cta-h">
              Let&apos;s work<br /><i>together</i>
            </h2>
            <p className="cta-sub">
              Entry-level roles, freelance projects, or just a conversation — I&apos;m open to all of it.
            </p>
            <a href="mailto:soumodityapramanik@gmail.com" className="cta-email">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,12 2,6"/>
              </svg>
              soumodityapramanik@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="f-copy">© 2026 Soumoditya Pramanik</div>
        <div className="f-links">
          <a href="https://github.com/Soumoditya" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/soumodityapramanik" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/Soumodityax" target="_blank" rel="noopener">X</a>
          <a href="https://amzn.in/d/0j1rKv5a" target="_blank" rel="noopener">Book</a>
        </div>
      </footer>
    </>
  )
}
