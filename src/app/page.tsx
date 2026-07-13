'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* ── Real projects (all live, verified) ── */
type Project = {
  n: string; cat: string; desc: string; stack: string[]
  url: string | null; accent: string; frame: boolean
}
const PROJECTS: Project[] = [
  { n:'NagrikNazar', cat:'Civic Tech', accent:'#FF7A1A', frame:true,
    url:'https://news-theta-dusky.vercel.app',
    desc:'The citizen’s eye on Indian politics — tracks criminal cases, assets, controversies and budgets of leaders using public records.',
    stack:['Next.js','TypeScript','Data'] },
  { n:'ResumeForge', cat:'AI Tool', accent:'#7C5CFF', frame:true,
    url:'https://resumeforge-flame.vercel.app',
    desc:'AI resume builder, analyzer and job-tailor with ATS scoring — powered by Google Gemini.',
    stack:['Next.js','Tailwind','Gemini'] },
  { n:'Sadhak', cat:'Lifestyle', accent:'#FFB020', frame:true,
    url:'https://sadhak-app.vercel.app',
    desc:'A spiritual companion — Panchang, temple finder, japa counter, a sacred library and community, in one clean app.',
    stack:['Web App','PWA','Astro-calc'] },
  { n:'Banana Chat', cat:'Social', accent:'#FFE14D', frame:true,
    url:'https://banana-chat-app.vercel.app',
    desc:'A real-time social and chat platform — fast, clean, built for conversation.',
    stack:['JavaScript','Realtime','Web'] },
  { n:'PassPredictor', cat:'Security', accent:'#38E8FF', frame:true,
    url:'https://pass-predictor.vercel.app',
    desc:'A password-recovery tool that generates and ranks likely passwords from personal hints, so you can regain your own accounts.',
    stack:['JavaScript','Logic','Web'] },
  { n:'Sampark', cat:'Messaging', accent:'#FF5A3C', frame:true,
    url:'https://sampark-app.vercel.app',
    desc:'The desi messenger — a real-time messaging app built for how India actually chats.',
    stack:['Web App','Realtime','Chat'] },
  { n:'Vintly', cat:'Utility', accent:'#B6FF3C', frame:true,
    url:'https://vintly.vercel.app',
    desc:'A client-side study-material processor that turns raw notes into clean, usable study content.',
    stack:['TypeScript','Client-side','Web'] },
  { n:'Days Until', cat:'Utility', accent:'#FF3CA0', frame:true,
    url:'https://daysuntil.vercel.app',
    desc:'A minimal countdown and date tracker for the moments you don’t want to miss.',
    stack:['Web App','Countdown','PWA'] },
]

const STACK = ['HTML','CSS','JavaScript','TypeScript','React','Next.js','Tailwind CSS','Node.js','Three.js','Git & GitHub','Vercel','AI APIs']

const EDUCATION = [
  { yr:'2022 — 2025', inst:'Brainware University', deg:'Bachelor of Computer Applications (BCA)', place:'Barasat, WB' },
  { yr:'2020 & 2022', inst:'Rampurhat Jitendralal Vidyabhaban', deg:'Secondary & Higher Secondary (WBBSE / WBCHSE)', place:'Rampurhat, WB' },
]

const SOCIALS = [
  { n:'GitHub', url:'https://github.com/Soumoditya' },
  { n:'LinkedIn', url:'https://www.linkedin.com/in/soumodityapramanik' },
  { n:'X', url:'https://x.com/Soumodityax' },
  { n:'Instagram', url:'https://www.instagram.com/soumodityapramanik' },
  { n:'YouTube', url:'https://youtube.com/@soumodityapramanik' },
]

const MARQUEE = ['Web Development','UI Engineering','AI Tools','Civic Tech','Full-Stack','Product Design']

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
)

/* ── WebGL shader hero: animated flowing color field ── */
function ShaderHero() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parent = canvas.parentElement!
    let W = parent.offsetWidth, H = parent.offsetHeight
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch { return } // no WebGL → CSS fallback stays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(W, H) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
        precision highp float;
        uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
        // simplex-ish noise
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
        float snoise(vec2 v){
          const vec4 C=vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
          vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
          vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
          vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
          vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
          vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
          m=m*m;m=m*m;
          vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;
          m*=1.79284291-0.85373472*(a0*a0+h*h);
          vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
          return 130.0*dot(m,g);
        }
        float fbm(vec2 p){float s=0.0;float a=0.5;for(int i=0;i<5;i++){s+=a*snoise(p);p*=2.0;a*=0.5;}return s;}
        void main(){
          vec2 uv=gl_FragCoord.xy/u_res.xy;
          vec2 p=(gl_FragCoord.xy-0.5*u_res.xy)/min(u_res.x,u_res.y);
          float t=u_time*0.05;
          vec2 m=(u_mouse-0.5)*0.6;
          float n=fbm(p*1.6+vec2(t,-t)+m);
          float n2=fbm(p*2.4-vec2(t*0.7,t)+n);
          vec3 c1=vec3(0.486,0.361,1.0);   // violet
          vec3 c2=vec3(0.220,0.910,1.0);   // cyan
          vec3 c3=vec3(0.714,1.0,0.235);   // lime
          vec3 c4=vec3(1.0,0.353,0.235);   // coral
          vec3 col=mix(c1,c2,smoothstep(-0.6,0.6,n));
          col=mix(col,c3,smoothstep(-0.4,0.8,n2)*0.5);
          col=mix(col,c4,smoothstep(0.3,1.0,n*n2)*0.35);
          float dark=smoothstep(1.1,0.15,length(p));
          col*=0.10+0.28*dark;             // keep it deep & moody
          col+=0.02*snoise(gl_FragCoord.xy*0.5); // micro grain
          gl_FragColor=vec4(col,1.0);
        }
      `,
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)

    let mx = 0.5, my = 0.5, cmx = 0.5, cmy = 0.5, raf = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX / W; my = 1 - e.clientY / H }
    const onResize = () => { W = parent.offsetWidth; H = parent.offsetHeight; renderer.setSize(W, H); uniforms.u_res.value.set(W, H) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      uniforms.u_time.value += 1
      cmx += (mx - cmx) * 0.05; cmy += (my - cmy) * 0.05
      uniforms.u_mouse.value.set(cmx, cmy)
      renderer.render(scene, camera)
    }
    tick()
    return () => { cancelAnimationFrame(raf); renderer.dispose(); material.dispose(); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

/* ── Lazy live-preview iframe (mounts when near viewport) ── */
function LivePreview({ url, accent, initial }: { url: string; accent: string; initial: string }) {
  const holder = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const el = holder.current
    if (!el) return
    if (window.matchMedia('(max-width: 900px)').matches) return // no iframes on mobile
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setShow(true); io.disconnect() } }), { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="panel-frame-holder" ref={holder}>
      <div className="panel-fallback"><b>{initial}</b></div>
      {show && (
        <iframe
          src={url} title={url} loading="lazy" tabIndex={-1} aria-hidden="true"
          sandbox="allow-scripts allow-same-origin"
          className={ready ? 'ready' : ''}
          onLoad={() => setReady(true)}
        />
      )}
    </div>
  )
}

export default function Page() {
  const open = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hover = window.matchMedia('(hover: hover)').matches

    /* Cursor + magnetic */
    const cursor = document.getElementById('cursor')
    let mx = 0, my = 0, cx = 0, cy = 0
    if (cursor && hover) {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })
      const loop = () => { cx = lerp(cx, mx, 0.2); cy = lerp(cy, my, 0.2); cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; requestAnimationFrame(loop) }
      loop()
      document.querySelectorAll('a,button,.panel,.chip,.social,.edu-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'))
      })
      document.querySelectorAll<HTMLElement>('[data-mag]').forEach(el => {
        el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)` })
        el.addEventListener('mouseleave', () => { el.style.transform = '' })
      })
    }

    /* Preloader counter */
    const pre = document.getElementById('pre')
    const num = document.getElementById('preNum')
    document.body.style.overflow = 'hidden'
    const dur = reduce ? 200 : 1700
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      if (num) num.firstChild!.textContent = String(Math.round(p * 100))
      if (p < 1) requestAnimationFrame(step)
      else {
        pre?.classList.add('done')
        document.body.style.overflow = ''
        setTimeout(() => {
          document.querySelectorAll('.hero-name .ln > span').forEach((s, i) => setTimeout(() => ((s as HTMLElement).style.transform = 'none'), i * 130))
          document.querySelector('.hero-name')?.classList.add('in')
        }, 500)
      }
    }
    requestAnimationFrame(step)

    /* Reveals */
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal,.lines').forEach(el => io.observe(el))

    /* Lenis + GSAP horizontal gallery */
    let lenis: import('lenis').default | null = null
    let cleanupGsap: (() => void) | undefined
    ;(async () => {
      if (reduce) return
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
      ])
      lenis = new Lenis({ duration: 1.3, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      gsap.registerPlugin(ScrollTrigger)
      lenis.on('scroll', ScrollTrigger.update)

      // Horizontal pinned gallery (desktop only)
      if (window.innerWidth > 900) {
        const track = document.querySelector<HTMLElement>('.gallery-track')
        const viewport = document.querySelector<HTMLElement>('.gallery-viewport')
        if (track && viewport) {
          const dist = () => track.scrollWidth - window.innerWidth + 80
          const tween = gsap.to(track, {
            x: () => -dist(), ease: 'none',
            scrollTrigger: { trigger: viewport, start: 'top top', end: () => '+=' + dist(), scrub: 0.6, pin: true, invalidateOnRefresh: true },
          })
          cleanupGsap = () => { tween.scrollTrigger?.kill(); tween.kill() }
        }
      }
      ScrollTrigger.refresh()
    })()

    /* Nav stuck */
    const onScroll = () => document.querySelector('nav')?.classList.toggle('stuck', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => { io.disconnect(); lenis?.destroy(); cleanupGsap?.(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const toggle = () => {
    open.current = !open.current
    const o = open.current
    document.getElementById('menu')?.classList.toggle('open', o)
    const b = document.getElementById('burger')
    if (b) { const s = b.querySelectorAll('span'); s[0].style.transform = o ? 'rotate(45deg) translate(5px,5px)' : ''; s[1].style.opacity = o ? '0' : '1'; s[2].style.transform = o ? 'rotate(-45deg) translate(5px,-5px)' : '' }
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
        <div className="pre-wipe" />
        <div id="preNum" className="pre-num">0<sup>%</sup></div>
        <div className="pre-tag">Soumoditya Pramanik — Portfolio</div>
      </div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">SP</a>
        <div className="nav-mid">{['Work', 'About', 'Stack', 'Connect'].map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}</div>
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
        <div className="hero-fallback" />
        <ShaderHero />
        <div className="wrap">
          <div className="hero-top">
            <span>Developer <b>&amp; Maker</b></span>
            <span>West Bengal, <b>India</b></span>
          </div>
          <h1 className="hero-name lines">
            <span className="ln"><span>Soumoditya</span></span>
            <span className="ln"><span className="stroke"><em>Pramanik</em></span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-role reveal">
              I design and build <b>web apps, AI tools and platforms</b> — from a political-transparency engine
              to messaging apps and developer utilities. Independent, self-taught, always shipping.
            </p>
            <div className="hero-scroll">Scroll <i /></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className={`marquee-item ${i % 2 ? 'hollow' : ''}`}>{m}<i>✦</i></span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>01</b> — About</div>
          <h2 className="about-statement reveal">I turn rough ideas into things people can <em>actually open and use.</em></h2>
          <div className="about-grid">
            <div className="about-bio reveal">
              <p>I&apos;m <b>Soumoditya Pramanik</b>, a developer from West Bengal, India. I work across the stack — mostly <b>React, Next.js and TypeScript</b> — shipping real products end to end.</p>
              <p>My range is wide on purpose: <b>NagrikNazar</b> holds Indian politicians accountable with public data, <b>ResumeForge</b> uses AI to rewrite resumes, <b>Sampark</b> and <b>Banana Chat</b> are messaging platforms. I build because I&apos;m curious, and I keep building.</p>
            </div>
            <div className="facts reveal">
              {[
                { k: 'Based in', v: 'West Bengal, India' },
                { k: 'Focus', v: 'Web apps · AI · Platforms' },
                { k: 'Shipped', v: '8+ live projects' },
                { k: 'Status', v: 'Open to interesting work' },
              ].map(f => (
                <div key={f.k} className="fact"><div className="fact-k">{f.k}</div><div className="fact-v">{f.v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="work-head">
          <h2 className="work-title reveal">Selected <em>Work</em></h2>
          <span className="work-sub reveal">{PROJECTS.length} projects · all live</span>
        </div>
        <div className="gallery-viewport">
          <div className="gallery-track">
            {PROJECTS.map((p, i) => (
              <article key={p.n} className="panel" style={{ ['--accent' as string]: p.accent }}>
                <div className="panel-glow" />
                <div className="panel-preview">
                  <div className="browser-bar"><span /><span /><span /><span className="url">{p.url?.replace('https://', '')}</span></div>
                  {p.url && p.frame
                    ? <LivePreview url={p.url} accent={p.accent} initial={p.n[0]} />
                    : <div className="panel-fallback"><b>{p.n[0]}</b></div>}
                </div>
                <div className="panel-body">
                  <div className="panel-row">
                    <span className="panel-index">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                    <span className="panel-cat">{p.cat}</span>
                  </div>
                  <h3 className="panel-name">{p.n}</h3>
                  <p className="panel-desc">{p.desc}</p>
                  <div className="panel-foot">
                    <div className="panel-tags">{p.stack.map(s => <span key={s} className="panel-tag">{s}</span>)}</div>
                    {p.url
                      ? <a href={p.url} target="_blank" rel="noopener" className="panel-visit">Visit live <Arrow /></a>
                      : <span className="panel-visit panel-soon">Coming soon</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>02</b> — Toolkit</div>
          <h2 className="about-statement reveal">The tools I <em>build with.</em></h2>
          <div className="chips">{STACK.map(s => <span key={s} className="chip reveal">{s}</span>)}</div>
          <p className="stack-note reveal">Comfortable day to day — and always adding to the list.</p>

          <div className="eyebrow" style={{ marginTop: 'clamp(70px,9vw,120px)' }}><b>03</b> — Education</div>
          <div className="edu">
            {EDUCATION.map(e => (
              <div key={e.inst} className="edu-item reveal">
                <div className="edu-yr">{e.yr}</div>
                <div className="edu-main">
                  <div className="edu-inst">{e.inst}</div>
                  <div className="edu-deg">{e.deg}</div>
                </div>
                <div className="edu-place">{e.place}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section id="connect" className="sec">
        <div className="wrap">
          <div className="eyebrow"><b>04</b> — Connect</div>
          <h2 className="connect-h reveal">Let&apos;s build<br /><em>something.</em></h2>
          <p className="connect-sub reveal">Got an idea, a project, or just want to talk shop? My inbox is open.</p>
          <a className="connect-mail reveal" data-mag href="mailto:soumodityapramanik@gmail.com">soumodityapramanik@gmail.com <Arrow /></a>
          <div className="socials">
            {SOCIALS.map(s => <a key={s.n} className="social reveal" href={s.url} target="_blank" rel="noopener">{s.n} <Arrow /></a>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-l">© {new Date().getFullYear()} Soumoditya Pramanik</div>
          <div className="foot-r">Built with Next.js &amp; Three.js · <a href="https://github.com/Soumoditya" target="_blank" rel="noopener">Source</a></div>
        </div>
      </footer>
    </>
  )
}
