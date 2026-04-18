'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   DATA
────────────────────────────────────────────── */
const skills = ['HTML5','CSS3','JavaScript','TypeScript','React.js','Next.js','Node.js','Express.js','MongoDB','Python','Java','MySQL','WordPress','WooCommerce','Git','GitHub','Vercel','AWS (Basic)','REST APIs','MERN Stack','DBMS']

const socials = [
  { name:'X (Twitter)', handle:'@Soumodityax', href:'https://x.com/Soumodityax', color:'rgba(255,255,255,0.15)', hoverColor:'rgba(255,255,255,0.35)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name:'LinkedIn', handle:'soumodityapramanik', href:'https://www.linkedin.com/in/soumodityapramanik', color:'rgba(10,102,194,0.25)', hoverColor:'rgba(10,102,194,0.6)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { name:'GitHub', handle:'Soumoditya', href:'https://github.com/Soumoditya', color:'rgba(168,255,120,0.15)', hoverColor:'rgba(168,255,120,0.4)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#a8ff78"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  { name:'YouTube', handle:'@soumodityapramanik', href:'https://youtube.com/@soumodityapramanik', color:'rgba(255,0,0,0.2)', hoverColor:'rgba(255,0,0,0.5)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  { name:'Instagram', handle:'@soumodityapramanik', href:'https://www.instagram.com/soumodityapramanik', color:'rgba(251,146,60,0.2)', hoverColor:'rgba(251,146,60,0.5)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { name:'Facebook', handle:'Soumodityapramanik', href:'https://www.facebook.com/Soumodityapramanik', color:'rgba(66,103,178,0.2)', hoverColor:'rgba(66,103,178,0.5)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#4267b2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name:'Grokipedia', handle:'soumoditya-pramanik', href:'http://grokipedia.com/page/soumoditya-pramanik', color:'rgba(168,120,255,0.2)', hoverColor:'rgba(168,120,255,0.5)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a878ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { name:'My Book', handle:'Amazon KDP', href:'https://amzn.in/d/0j1rKv5a', color:'rgba(251,146,60,0.2)', hoverColor:'rgba(251,146,60,0.5)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
]

const marqueeItems = ['React.js','Node.js','MongoDB','Python','WordPress','Full-Stack Dev','Published Author','West Bengal','Available for Work','BCA Graduate','Git & Vercel','MERN Stack']

/* ──────────────────────────────────────────────
   THREE.JS HERO BACKGROUND
────────────────────────────────────────────── */
function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 3

    // Particle field
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      const t = Math.random()
      if (t < 0.5) { colors[i*3]=0.66; colors[i*3+1]=1; colors[i*3+2]=0.47 }       // lime
      else if (t < 0.75) { colors[i*3]=0.22; colors[i*3+1]=0.74; colors[i*3+2]=0.98 } // sky
      else { colors[i*3]=0.66; colors[i*3+1]=0.47; colors[i*3+2]=1 }                 // purple
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({ size: 0.018, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Floating wireframe torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.35, 16, 60),
      new THREE.MeshBasicMaterial({ color: 0xa8ff78, wireframe: true, transparent: true, opacity: 0.06 })
    )
    scene.add(torus)

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize)

    let frame = 0
    const animate = () => {
      frame++
      const raf = requestAnimationFrame(animate)
      points.rotation.y += 0.0005
      points.rotation.x += 0.0002
      torus.rotation.x += 0.003
      torus.rotation.y += 0.005
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      return raf
    }
    const rafId = animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="three-canvas" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
}

/* ──────────────────────────────────────────────
   ANIMATED SECTION WRAPPER
────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(36px)', transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────── */
export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(t)
  }, [])

  // Scroll state
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Cursor
  useEffect(() => {
    const dot = document.getElementById('cur-dot')
    const ring = document.getElementById('cur-ring')
    if (!dot || !ring) return
    let rx = 0, ry = 0, mx = 0, my = 0
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)
    let af: number
    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12)
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      af = requestAnimationFrame(tick)
    }
    if (window.matchMedia('(hover:hover)').matches) {
      tick()
      document.querySelectorAll('a,button,.skill-chip,.soc-card,.proj-card,.glass,.grad-border').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'))
        el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'))
      })
    }
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(af) }
  }, [loaded])

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.3, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
      const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })
    return () => { lenis?.destroy() }
  }, [loaded])

  const navLinks = ['About','Education','Projects','Socials','Contact']

  return (
    <>
      {/* CURSOR */}
      <div id="cur-dot" />
      <div id="cur-ring" />

      {/* MESH BG */}
      <div className="mesh-bg">
        <div className="orb1" /><div className="orb2" /><div className="orb3" />
      </div>

      {/* PROGRESS BAR */}
      <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left', background: 'linear-gradient(90deg, #a8ff78, #38bdf8)', height: '2px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }} />

      {/* LOADER */}
      <div id="loader" className={loaded ? 'out' : ''}>
        <div className="loader-inner">
          <div className="loader-name">SP</div>
          <div className="loader-bar-track"><div className="loader-bar" /></div>
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase mt-2">Loading portfolio…</p>
        </div>
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[rgba(7,7,26,0.88)] backdrop-blur-xl border-b border-white/[0.06]' : ''}`}
        style={{ padding: '0 clamp(20px,5vw,60px)', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" className="font-display font-black text-xl tracking-[-0.04em] grad-text" style={{ fontSize: '22px' }}>SP</a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-mono text-[11.5px] tracking-[0.08em] uppercase text-[var(--muted)] hover:text-white transition-colors duration-200 relative group">
              {l}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--lime)] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </a>
          ))}
        </div>
        <a href="mailto:soumodityapramanik@gmail.com"
          className="hidden md:inline-flex btn-ghost text-sm" style={{ padding: '8px 20px', borderRadius: '100px' }}>
          Say Hello ↗
        </a>
        <button className="md:hidden flex flex-col gap-[5px] p-1 z-[101]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : '' }} />
          <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-10"
            style={{ background: 'rgba(7,7,26,0.97)', backdropFilter: 'blur(20px)' }}>
            {navLinks.map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 } }}
                className="font-display font-bold text-[clamp(28px,7vw,44px)] tracking-[-0.03em] text-[var(--muted)] hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden"
        style={{ padding: '100px clamp(20px,5vw,60px) 60px', zIndex: 1 }}>
        <ThreeBackground />
        <motion.div style={{ y: heroY }} className="relative z-10 max-w-[1180px] mx-auto w-full">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-10 font-mono text-[11px] tracking-[0.1em] uppercase"
            style={{ color: 'var(--lime)', background: 'rgba(168,255,120,0.08)', border: '1px solid rgba(168,255,120,0.25)', padding: '6px 14px', borderRadius: '100px' }}>
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse" style={{ boxShadow: '0 0 8px var(--lime)' }} />
            Available for opportunities
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ y: 120 }} animate={{ y: 0 }} transition={{ delay: 2.0, duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="font-display font-black leading-[0.92] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(60px,11.5vw,160px)' }}>
              <span className="outline-text block">Soumoditya</span>
              <span className="grad-text block">Pramanik</span>
            </motion.h1>
          </div>

          {/* Rotating subtitle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.6 }}
            className="flex items-center gap-4 flex-wrap mb-8">
            <span className="font-mono text-sm text-[var(--muted)]">I&apos;m a</span>
            <div className="rotate-wrap font-display font-bold tracking-[-0.02em]" style={{ fontSize: 'clamp(18px,2.2vw,26px)', color: 'var(--lime)' }}>
              <div className="rotate-inner">
                <span>Developer</span>
                <span>Author</span>
                <span>Creator</span>
              </div>
            </div>
            <span className="font-mono text-sm text-[var(--muted)]">from West Bengal.</span>
          </motion.div>

          {/* Desc */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.45, duration: 0.7 }}
            className="text-[var(--muted)] text-base leading-[1.8] mb-12 max-w-[520px]">
            <strong className="text-white font-medium">Full-Stack Developer &amp; Published Author</strong> — BCA Graduate from Brainware University.
            Building web experiences, exploring Vedic knowledge, and shipping products that matter.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 0.7 }}
            className="flex flex-wrap gap-4 mb-16">
            <a href="mailto:soumodityapramanik@gmail.com" className="btn-primary">
              Say Hello <span>→</span>
            </a>
            <a href="https://github.com/Soumoditya" target="_blank" rel="noopener" className="btn-ghost">
              GitHub <span>↗</span>
            </a>
            <a href="https://amzn.in/d/0j1rKv5a" target="_blank" rel="noopener" className="btn-ghost">
              My Book <span>↗</span>
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9, duration: 0.7 }}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]">
            <div className="scroll-line" />
            <span>Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* Floating badge bottom right */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.0, duration: 0.6 }}
          className="absolute bottom-12 right-[clamp(20px,5vw,60px)] hidden lg:flex flex-col items-end gap-2 z-10">
          <div className="glass p-4 rounded-2xl" style={{ minWidth: '200px' }}>
            <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest mb-3">Quick Info</div>
            <div className="flex flex-col gap-2">
              {[['DOB','Oct 12, 2004'],['CGPA','7.48 / 10'],['Location','Rampurhat, WB'],['Status','Open to Work']].map(([k,v]) => (
                <div key={k} className="flex justify-between text-[12px]">
                  <span className="text-[var(--muted)] font-mono">{k}</span>
                  <span className="text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'var(--ink2)', padding: '13px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="marquee-item font-mono text-[11.5px] tracking-[0.1em] uppercase text-[var(--muted)] px-8 inline-flex items-center gap-7">
                {item}<span style={{ color: 'var(--lime)', fontSize: '8px' }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT / BENTO ── */}
      <section id="about" className="section" style={{ background: 'var(--ink)' }}>
        <div className="section-inner">
          <FadeUp><div className="section-label">01 — Identity</div></FadeUp>
          <FadeUp delay={0.08}><h2 className="font-display font-black tracking-[-0.035em] mb-3" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>About Me</h2></FadeUp>
          <FadeUp delay={0.14}><p className="text-[var(--muted)] text-base max-w-[500px] leading-relaxed mb-14">Developer, creator, and author — building at the intersection of technology and culture.</p></FadeUp>

          {/* BENTO */}
          <div className="grid grid-cols-12 gap-4">

            {/* BIO - large */}
            <FadeUp delay={0.1} className="col-span-12 lg:col-span-7 xl:col-span-8">
              <div className="glass p-7 h-full" style={{ borderRadius: '20px' }}>
                <p className="text-[var(--muted)] text-base leading-[1.85] mb-4">
                  I&apos;m <strong className="text-white font-medium">Soumoditya Pramanik</strong>, born <strong className="text-white font-medium">October 12, 2004</strong>, in Rampurhat, Birbhum, West Bengal.
                  A recent <strong className="text-white font-medium">BCA Graduate from Brainware University</strong> (CGPA 7.48), specialising in full-stack web development and digital product creation.
                </p>
                <p className="text-[var(--muted)] text-base leading-[1.85] mb-6">
                  Beyond code, I&apos;m a <strong className="text-white font-medium">published author</strong> on Shankaracharya&apos;s philosophy,
                  a content creator across tech, AI, and Vedic astrology. I bring a <strong className="text-white font-medium">builder&apos;s mindset</strong> to every project.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[{ l:'Bengali', nat:true },{ l:'English' },{ l:'Hindi' },{ l:'Open to Relocate' },{ l:'West Bengal' },{ l:'BCA Grad' }].map(t => (
                    <span key={t.l} className="chip" style={t.nat ? { borderColor:'rgba(168,255,120,0.3)', color:'var(--lime)', background:'rgba(168,255,120,0.05)' } : {}}>{t.l}</span>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* ID CARD */}
            <FadeUp delay={0.18} className="col-span-12 lg:col-span-5 xl:col-span-4">
              <div className="glass p-6 h-full" style={{ borderRadius: '20px' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl mb-4 text-[var(--ink)]"
                  style={{ background: 'linear-gradient(135deg,var(--lime),var(--sky))', boxShadow: '0 8px 28px rgba(168,255,120,0.3)' }}>S</div>
                <div className="font-display font-bold text-xl tracking-tight mb-1">Soumoditya Pramanik</div>
                <div className="font-mono text-[11px] text-[var(--lime)] mb-5">// Developer · Author · Creator</div>
                {[
                  { label:'Location', value:'Rampurhat-1, Birbhum, WB · 731224' },
                  { label:'University', value:'Brainware Univ., Barasat · BCA' },
                  { label:'Phone', value:'+91 9064882049' },
                  { label:'Email', value:'soumodityapramanik@gmail.com', small: true },
                ].map(row => (
                  <div key={row.label} className="flex flex-col gap-0.5 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">{row.label}</span>
                    <span className="text-white" style={{ fontSize: row.small ? '12px' : '13px' }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="chip" style={{ borderColor:'rgba(168,255,120,0.25)', color:'var(--lime)', fontSize:'10px', padding:'3px 10px' }}>Open to Work</span>
                  <span className="chip" style={{ fontSize:'10px', padding:'3px 10px' }}>Published Author</span>
                </div>
              </div>
            </FadeUp>

            {/* STAT CARDS */}
            {[
              { v:'7.48', l:'University CGPA', d:0.1 },
              { v:'82.8%', l:'Class XII · WBCHSE', d:0.15 },
              { v:'73.27%', l:'BCA Overall Pct', d:0.2 },
              { v:'1', l:'Published Book', d:0.25 },
            ].map(s => (
              <FadeUp key={s.l} delay={s.d} className="col-span-6 sm:col-span-3">
                <div className="glass p-5 h-full" style={{ borderRadius: '16px' }}>
                  <div className="stat-val">{s.v}</div>
                  <div className="stat-lbl">{s.l}</div>
                </div>
              </FadeUp>
            ))}

            {/* SKILLS */}
            <FadeUp delay={0.1} className="col-span-12">
              <div className="glass p-6" style={{ borderRadius: '20px' }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] mb-4">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
                </div>
              </div>
            </FadeUp>

            {/* LOCATION */}
            <FadeUp delay={0.1} className="col-span-12 md:col-span-4">
              <div className="glass p-5 h-full" style={{ borderRadius: '16px' }}>
                <div className="w-full rounded-xl flex items-center justify-center text-3xl mb-3"
                  style={{ height: '80px', background:'var(--ink3)', animation:'float 3s ease-in-out infinite' }}>📍</div>
                <div className="font-display font-bold text-base mb-1">Rampurhat, West Bengal</div>
                <div className="font-mono text-[11px] text-[var(--muted)]">Birbhum · India · PIN 731224</div>
              </div>
            </FadeUp>

            {/* LANGUAGES */}
            <FadeUp delay={0.15} className="col-span-12 md:col-span-4">
              <div className="glass p-5 h-full" style={{ borderRadius: '16px' }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] mb-4">Languages</div>
                {[{ n:'Bengali', p:'Native', w:'100%' },{ n:'English', p:'Proficient', w:'82%' },{ n:'Hindi', p:'Conversational', w:'60%' }].map(lng => (
                  <div key={lng.n} className="mb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">{lng.n}</span>
                      <span className="font-mono text-[11px] text-[var(--muted)]">{lng.p}</span>
                    </div>
                    <div className="lang-bar"><div className="lang-fill" style={{ width: lng.w }} /></div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* CONTACT */}
            <FadeUp delay={0.2} className="col-span-12 md:col-span-4">
              <div className="glass p-5 h-full" style={{ borderRadius: '16px' }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] mb-4">Contact</div>
                {[
                  { label:'Email', value:'soumodityapramanik@gmail.com', href:'mailto:soumodityapramanik@gmail.com', small:true },
                  { label:'Phone', value:'+91 9064882049', href:'tel:+919064882049' },
                  { label:'LinkedIn', value:'linkedin.com/in/…pramanik ↗', href:'https://www.linkedin.com/in/soumodityapramanik' },
                ].map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                    className="flex flex-col gap-0.5 py-2.5 border-b group" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">{c.label}</span>
                    <span className="text-[var(--muted)] group-hover:text-white transition-colors" style={{ fontSize: c.small ? '11.5px' : '13px' }}>{c.value}</span>
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="section" style={{ background: 'var(--ink2)' }}>
        <div className="section-inner">
          <FadeUp><div className="section-label">02 — Background</div></FadeUp>
          <FadeUp delay={0.08}><h2 className="font-display font-black tracking-[-0.035em] mb-3" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>Education</h2></FadeUp>
          <FadeUp delay={0.14}><p className="text-[var(--muted)] text-base max-w-[500px] leading-relaxed mb-14">Academic journey through the West Bengal education system.</p></FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brainware University - Featured */}
            <FadeUp delay={0.1} className="md:col-span-2">
              <div className="grad-border p-8" style={{ borderRadius: '20px', background: 'var(--ink3)' }}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase mb-3 inline-block"
                      style={{ color:'var(--lime)', background:'rgba(168,255,120,0.1)', border:'1px solid rgba(168,255,120,0.2)', padding:'3px 10px', borderRadius:'100px' }}>
                      2022 – 2025
                    </span>
                    <h3 className="font-display font-bold text-2xl tracking-tight mt-2 mb-1">Brainware University</h3>
                    <p className="text-[var(--muted)] text-sm">Bachelor of Computer Applications (BCA) · Barasat, West Bengal</p>
                  </div>
                  <div className="flex gap-8">
                    <div><div className="font-display font-black text-4xl tracking-[-0.04em] grad-text">7.48</div><div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] mt-1">CGPA</div></div>
                    <div><div className="font-display font-black text-4xl tracking-[-0.04em] grad-text">73.27%</div><div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] mt-1">Overall</div></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Software Development','Web Technologies','Databases','Algorithms','Operating Systems','Computer Networks'].map(s => (
                    <span key={s} className="chip" style={{ fontSize: '11px', padding: '4px 10px' }}>{s}</span>
                  ))}
                </div>
              </div>
            </FadeUp>

            {[
              { year:'2022', inst:'Rampurhat Jitendralal Vidyabhaban', board:'Higher Secondary · WBCHSE', score:'82.8%', d:0.12 },
              { year:'2020', inst:'Rampurhat Jitendralal Vidyabhaban', board:'Madhyamik Pariksha · WBBSE', score:'70.29%', d:0.18 },
            ].map(edu => (
              <FadeUp key={edu.year} delay={edu.d}>
                <div className="glass p-6 h-full" style={{ borderRadius: '18px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,var(--lime),var(--sky))', transform:'scaleX(0)', transformOrigin:'left', transition:'transform .4s' }} className="edu-bar" />
                  <span className="font-mono text-[11px] tracking-[0.1em] mb-3 inline-block" style={{ color:'var(--lime)', background:'rgba(168,255,120,0.08)', border:'1px solid rgba(168,255,120,0.18)', padding:'3px 10px', borderRadius:'100px' }}>{edu.year}</span>
                  <h3 className="font-display font-bold text-lg tracking-tight mt-2 mb-1">{edu.inst}</h3>
                  <p className="text-[var(--muted)] text-sm mb-4">{edu.board}</p>
                  <div className="font-display font-black tracking-[-0.03em]" style={{ fontSize: '36px', background:'linear-gradient(135deg,var(--lime),var(--sky))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{edu.score}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] mt-1">Percentage</div>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={0.22}>
              <div className="glass p-6 h-full" style={{ borderRadius: '18px' }}>
                <span className="font-mono text-[11px] tracking-[0.1em] mb-3 inline-block" style={{ color:'var(--muted)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', padding:'3px 10px', borderRadius:'100px' }}>2009 – 2014</span>
                <h3 className="font-display font-bold text-lg tracking-tight mt-2 mb-1">Pranab Siksha Niketan</h3>
                <p className="text-[var(--muted)] text-sm">Primary School · Rampurhat, Birbhum, West Bengal · Bengali medium foundation education</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section" style={{ background: 'var(--ink)' }}>
        <div className="section-inner">
          <FadeUp><div className="section-label">03 — Builds</div></FadeUp>
          <FadeUp delay={0.08}><h2 className="font-display font-black tracking-[-0.035em] mb-3" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>Projects</h2></FadeUp>
          <FadeUp delay={0.14}><p className="text-[var(--muted)] text-base max-w-[500px] leading-relaxed mb-14">From academic builds to shipped products.</p></FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FadeUp delay={0.1} className="md:col-span-2">
              <a href="https://amzn.in/d/0j1rKv5a" target="_blank" rel="noopener" className="proj-card"
                style={{ background: 'linear-gradient(135deg, rgba(168,255,120,0.06) 0%, rgba(56,189,248,0.04) 100%)', borderColor: 'rgba(168,255,120,0.2)' }}>
                <div className="proj-num">00 · Featured · Published Work</div>
                <div className="proj-title" style={{ fontSize:'26px' }}>Shankaracharya Message</div>
                <div className="proj-desc">Published book exploring Adi Shankaracharya&apos;s philosophical teachings — guiding readers through knowledge, devotion, and liberation. A deep intersection of Vedic wisdom and modern publishing. Available globally on Amazon KDP.</div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Published Book','Amazon KDP','Vedic Philosophy','Non-Fiction'].map(t => <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="proj-arrow">View on Amazon <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>
              </a>
            </FadeUp>
            {[
              { n:'01', t:'Vedic Astro Engine', d:'Full-stack astrology platform generating Kundali (D1 & D9 charts), Panchang, and Navagraha analysis with immersive animated UI.', tags:['React','Node.js','MongoDB','Three.js'], href:'https://github.com/Soumoditya', delay:0.1 },
              { n:'02', t:'Library Management System', d:'Academic project — book cataloguing, member management, issue & return tracking with full database integration. BCA final year.', tags:['Python','MySQL','DBMS'], href:'https://github.com/Soumoditya', delay:0.18 },
              { n:'03', t:'MERN Stack App', d:'Full-stack web application built with MongoDB, Express, React, and Node.js. REST API architecture with authentication and CRUD operations.', tags:['MongoDB','Express','React','Node.js'], href:'https://github.com/Soumoditya', delay:0.26 },
              { n:'04', t:'Personal Portfolio', d:'This very site — built with Next.js + TypeScript + Framer Motion. Static export on GitHub Pages with full SEO, structured data, and 3D background.', tags:['Next.js','TypeScript','Tailwind','Three.js'], href:'https://soumodityapramanik.in', delay:0.34 },
            ].map(p => (
              <FadeUp key={p.n} delay={p.delay}>
                <a href={p.href} target="_blank" rel="noopener" className="proj-card">
                  <div className="proj-num">{p.n}</div>
                  <div className="proj-title">{p.t}</div>
                  <div className="proj-desc">{p.d}</div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map(t => <span key={t} className="chip" style={{ background:'rgba(56,189,248,0.07)', borderColor:'rgba(56,189,248,0.2)', color:'var(--sky)', fontSize:'10px', padding:'3px 9px' }}>{t}</span>)}
                  </div>
                  <div className="proj-arrow">View <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="section" style={{ background: 'var(--ink2)' }}>
        <div className="section-inner">
          <FadeUp><div className="section-label">04 — Presence</div></FadeUp>
          <FadeUp delay={0.08}><h2 className="font-display font-black tracking-[-0.035em] mb-3" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>Find Me Online</h2></FadeUp>
          <FadeUp delay={0.14}><p className="text-[var(--muted)] text-base max-w-[500px] leading-relaxed mb-14">Tech, astrology, culture — everywhere I create.</p></FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {socials.map((s, i) => (
              <FadeUp key={s.name} delay={0.06 * (i % 4)}>
                <a href={s.href} target="_blank" rel="noopener" className="soc-card"
                  style={{ borderColor: s.color, transition: 'transform .25s, box-shadow .25s, border-color .25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = s.hoverColor; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.4)` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color }}>{s.icon}</div>
                  <div className="font-display font-bold text-[15px]">{s.name}</div>
                  <div className="font-mono text-[11px] text-[var(--muted)]">{s.handle}</div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: 'var(--ink)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="cta-wrap">
              <div className="cta-glow" />
              <div style={{ position:'relative' }}>
                <div className="section-label justify-center mx-auto w-fit mb-4">05 — Let&apos;s Talk</div>
                <h2 className="font-display font-black tracking-[-0.045em] mb-4 leading-[1.0]" style={{ fontSize:'clamp(36px,6vw,76px)' }}>
                  Open for<br/>
                  <span className="grad-text">opportunities</span>
                </h2>
                <p className="text-[var(--muted)] text-base leading-[1.75] max-w-[420px] mx-auto mb-10">
                  Looking for entry-level developer roles, freelance projects, and collaborations. Let&apos;s build something great together.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <a href="mailto:soumodityapramanik@gmail.com" className="btn-primary" style={{ fontSize:'14px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                    soumodityapramanik@gmail.com
                  </a>
                  <a href="tel:+919064882049" className="font-mono text-[13px] text-[var(--muted)] hover:text-white transition-colors">
                    or call +91 9064882049
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px clamp(20px,5vw,60px)', position: 'relative', zIndex: 1, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', background:'var(--ink2)' }}>
        <div className="font-mono text-[11.5px] text-[var(--muted)]">© 2026 Soumoditya Pramanik · All rights reserved</div>
        <div className="font-mono text-[11.5px] text-[var(--muted)] flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/><path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
          Rampurhat, West Bengal, India
        </div>
        <div className="flex gap-5">
          {[['GitHub','https://github.com/Soumoditya'],['LinkedIn','https://www.linkedin.com/in/soumodityapramanik'],['X','https://x.com/Soumodityax']].map(([n,h]) => (
            <a key={n} href={h} target="_blank" rel="noopener" className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--lime)] transition-colors">{n}</a>
          ))}
        </div>
      </footer>
    </>
  )
}
