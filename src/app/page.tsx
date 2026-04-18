'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── DATA ── */
const SKILLS = ['HTML5','CSS3','JavaScript','TypeScript','React.js','Next.js','Node.js','Express','MongoDB','Python','Java','MySQL','WordPress','Git','GitHub','Vercel','AWS (Basic)','REST APIs','MERN Stack']
const SOCIALS = [
  {n:'X (Twitter)',h:'@Soumodityax',url:'https://x.com/Soumodityax',bg:'rgba(255,255,255,.1)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>},
  {n:'LinkedIn',h:'soumodityapramanik',url:'https://www.linkedin.com/in/soumodityapramanik',bg:'rgba(10,102,194,.18)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>},
  {n:'GitHub',h:'Soumoditya',url:'https://github.com/Soumoditya',bg:'rgba(123,241,168,.1)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="#7BF1A8"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>},
  {n:'YouTube',h:'@soumodityapramanik',url:'https://youtube.com/@soumodityapramanik',bg:'rgba(255,0,0,.12)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="red"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>},
  {n:'Instagram',h:'@soumodityapramanik',url:'https://www.instagram.com/soumodityapramanik',bg:'rgba(251,146,60,.12)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>},
  {n:'Facebook',h:'Soumodityapramanik',url:'https://www.facebook.com/Soumodityapramanik',bg:'rgba(66,103,178,.15)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="#4267b2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>},
  {n:'Grokipedia',h:'soumoditya-pramanik',url:'http://grokipedia.com/page/soumoditya-pramanik',bg:'rgba(232,197,71,.1)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E8C547" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>},
  {n:'My Book',h:'Amazon KDP',url:'https://amzn.in/d/0j1rKv5a',bg:'rgba(232,197,71,.1)',svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E8C547" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>},
]
const MQ_ITEMS = ['Full-Stack Dev','BCA Graduate','Published Author','React · Node.js','West Bengal, India','Open to Work','MERN Stack','Vedic Astrology','WordPress Dev','Available Now']
const PROJECTS = [
  {i:'00',feat:true,n:'Shankaracharya Message',d:'Published book on Adi Shankaracharya\'s philosophy — exploring knowledge, devotion, and liberation. A rare intersection of Vedic wisdom and modern publishing. Available globally on Amazon KDP.',t:['Published Book','Amazon KDP','Non-Fiction','Vedic Philosophy'],url:'https://amzn.in/d/0j1rKv5a'},
  {i:'01',n:'Vedic Astro Engine',d:'Full-stack astrology platform generating Kundali (D1 & D9 charts), Panchang, and Navagraha analysis with an immersive Three.js animated interface.',t:['React','Node.js','MongoDB','Three.js'],url:'https://github.com/Soumoditya'},
  {i:'02',n:'Library Management System',d:'Academic BCA final-year project — complete book cataloguing, member management, and issue/return tracking with full MySQL database integration.',t:['Python','MySQL','DBMS'],url:'https://github.com/Soumoditya'},
  {i:'03',n:'MERN Stack App',d:'Full-stack web application with MongoDB, Express, React, Node.js. JWT authentication, REST API, CRUD operations, and responsive frontend.',t:['MongoDB','Express','React','Node.js'],url:'https://github.com/Soumoditya'},
  {i:'04',n:'This Portfolio',d:'Built with Next.js 14 + TypeScript + GSAP + Three.js. Static export on GitHub Pages, CI/CD via GitHub Actions, full SEO with JSON-LD structured data.',t:['Next.js','TypeScript','Three.js','GSAP'],url:'https://soumodityapramanik.in'},
]

/* ── THREE.JS HERO ── */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const W = canvas.parentElement!.offsetWidth
    const H = canvas.parentElement!.offsetHeight
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 4
    /* ring geometry */
    const ringGroup = new THREE.Group()
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.TorusGeometry(1.2 + i * 0.6, 0.008 + i * 0.004, 8, 120)
      const mat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xe8c547 : 0x333320, transparent: true, opacity: i === 0 ? 0.35 : 0.1 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = (i * Math.PI) / 5
      ringGroup.add(mesh)
    }
    scene.add(ringGroup)
    /* particles */
    const count = 2000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]=(Math.random()-0.5)*14; pos[i*3+1]=(Math.random()-0.5)*14; pos[i*3+2]=(Math.random()-0.5)*8
      const t = Math.random()
      if (t < 0.6) { col[i*3]=0.91; col[i*3+1]=0.77; col[i*3+2]=0.28 } // gold
      else { col[i*3]=0.48; col[i*3+1]=0.95; col[i*3+2]=0.66 } // mint
    }
    const pgeo = new THREE.BufferGeometry()
    pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pgeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pts = new THREE.Points(pgeo, new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.55 }))
    scene.add(pts)
    let mx = 0, my = 0
    const onM = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*1.2; my = (e.clientY/window.innerHeight-0.5)*1.2 }
    window.addEventListener('mousemove', onM)
    const onR = () => { const nW = canvas.parentElement!.offsetWidth; const nH = canvas.parentElement!.offsetHeight; renderer.setSize(nW,nH); camera.aspect=nW/nH; camera.updateProjectionMatrix() }
    window.addEventListener('resize', onR)
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      ringGroup.rotation.y += 0.002; ringGroup.rotation.x += 0.001
      pts.rotation.y += 0.0003
      camera.position.x += (mx - camera.position.x) * 0.04
      camera.position.y += (-my - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    tick()
    return () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener('mousemove',onM); window.removeEventListener('resize',onR) }
  }, [])
  return <canvas ref={ref} id="hcanvas" style={{width:'100%',height:'100%',position:'absolute',inset:0}} />
}

/* ── PAGE ── */
export default function Page() {
  const menuOpen = useRef(false)

  useEffect(() => {
    /* CURSOR */
    const cursor = document.getElementById('cursor')
    const cdot = document.getElementById('cdot')
    let cx = 0, cy = 0, dx = 0, dy = 0
    const lerp = (a: number, b: number, t: number) => a+(b-a)*t
    if (cursor && cdot && window.matchMedia('(hover:hover)').matches) {
      document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY })
      const tick = () => {
        dx=lerp(dx,cx,.1); dy=lerp(dy,cy,.1)
        cdot.style.left=cx+'px'; cdot.style.top=cy+'px'
        cursor.style.left=dx+'px'; cursor.style.top=dy+'px'
        requestAnimationFrame(tick)
      }
      tick()
      const hovers = document.querySelectorAll('a,button,.sk,.tag,.socc,.pc,.edc,.as')
      hovers.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hov'); const t=el.getAttribute('data-cursor'); if(t){const ct=cursor.querySelector('.ct'); if(ct)ct.textContent=t} })
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hov') })
      })
    }

    /* LOADER */
    const loader = document.getElementById('loader')
    const ldrN = document.querySelector('.ldr-n') as HTMLElement
    const ldrBar = document.querySelector('.ldr-bar') as HTMLElement
    let count = 0
    const interval = setInterval(() => {
      count += Math.random() * 12 + 3
      if (count >= 100) { count = 100; clearInterval(interval) }
      if (ldrN) ldrN.textContent = Math.floor(count).toString()
      if (ldrBar) ldrBar.style.width = count + '%'
      if (count >= 100) {
        setTimeout(() => {
          if (loader) loader.classList.add('exit')
          document.body.style.overflow = 'auto'
          /* hero name reveal */
          setTimeout(() => {
            document.querySelectorAll('.hnl span').forEach((s,i) => {
              setTimeout(() => s.classList.add('vis'), i*120)
            })
          }, 200)
        }, 400)
      }
    }, 60)
    document.body.style.overflow = 'hidden'

    /* LENIS SMOOTH SCROLL */
    let lenis: {raf:(t:number)=>void; destroy:()=>void} | null = null
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (t: number) => { lenis!.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })

    /* GSAP ANIMATIONS */
    const initGSAP = async () => {
      const gsapMod = await import('gsap')
      const gsap = gsapMod.default || gsapMod.gsap || gsapMod
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* scroll progress bar */
      gsap.to('.prf', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
      })

      /* nav scroll effect - done via class toggle */
      ScrollTrigger.create({
        start: 'top -60px',
        onEnter: () => document.querySelector('nav')?.classList.add('scrolled'),
        onLeaveBack: () => document.querySelector('nav')?.classList.remove('scrolled'),
      })

      /* section titles - stagger words */
      gsap.utils.toArray<HTMLElement>('.stit').forEach(title => {
        const words = title.querySelectorAll('.word span')
        gsap.fromTo(words, { yPercent: 110 }, {
          yPercent: 0, duration: 1.1, stagger: .1, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 85%' }
        })
      })

      /* eyebrow labels */
      gsap.utils.toArray<HTMLElement>('.eyeb').forEach(el => {
        gsap.fromTo(el, { opacity:0, x:-20 }, {
          opacity:1, x:0, duration:.8, ease:'power2.out',
          scrollTrigger: { trigger:el, start:'top 90%' }
        })
      })

      /* about stats count up */
      gsap.utils.toArray<HTMLElement>('.asn').forEach(el => {
        const target = parseFloat(el.getAttribute('data-val') || '0')
        const isFloat = target % 1 !== 0
        gsap.fromTo(el, { textContent: '0' }, {
          textContent: target, duration: 1.6, ease: 'power2.out', snap: { textContent: isFloat ? 0.01 : 1 },
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() { el.textContent = isFloat ? parseFloat(el.textContent||'0').toFixed(2) : Math.round(parseFloat(el.textContent||'0')).toString() }
        })
      })

      /* about body text */
      gsap.utils.toArray<HTMLElement>('.ap p').forEach((p, i) => {
        gsap.fromTo(p, { opacity:0, y:30 }, {
          opacity:1, y:0, duration:.9, ease:'power3.out', delay: i*.1,
          scrollTrigger: { trigger:p, start:'top 88%' }
        })
      })

      /* language bars */
      document.querySelectorAll<HTMLElement>('.lf').forEach(el => {
        const w = el.style.width; el.style.width = '0'
        ScrollTrigger.create({
          trigger: el, start: 'top 85%',
          onEnter: () => { el.style.transition='width 1.2s cubic-bezier(.16,1,.3,1)'; el.style.width=w }
        })
      })

      /* edu cards */
      gsap.utils.toArray<HTMLElement>('.edc').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, y:48 }, {
          opacity:1, y:0, duration:1, ease:'power3.out', delay: (i%2)*0.12,
          scrollTrigger: { trigger:el, start:'top 88%' }
        })
      })

      /* project cards stagger */
      gsap.fromTo('.pc', { opacity:0, y:40 }, {
        opacity:1, y:0, duration:.9, stagger:.08, ease:'power3.out',
        scrollTrigger: { trigger:'.pt', start:'top 85%' }
      })

      /* social cards */
      gsap.fromTo('.socc', { opacity:0, scale:.92 }, {
        opacity:1, scale:1, duration:.7, stagger:.05, ease:'back.out(1.5)',
        scrollTrigger: { trigger:'.socg', start:'top 85%' }
      })

      /* CTA section */
      gsap.fromTo('.ctit', { opacity:0, y:60 }, {
        opacity:1, y:0, duration:1.1, ease:'power3.out',
        scrollTrigger: { trigger:'.ctab', start:'top 80%' }
      })

      /* skills stagger */
      gsap.fromTo('.sk', { opacity:0, y:20 }, {
        opacity:1, y:0, duration:.5, stagger:.025, ease:'power2.out',
        scrollTrigger: { trigger:'.skg', start:'top 85%' }
      })

      /* detail blocks */
      gsap.utils.toArray<HTMLElement>('.db').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, x:-24 }, {
          opacity:1, x:0, duration:.8, ease:'power3.out', delay:i*.06,
          scrollTrigger: { trigger:el, start:'top 90%' }
        })
      })
    }
    initGSAP()

    /* NAV SCROLL CLASS */
    const navEl = document.querySelector('nav')
    const onScroll = () => navEl?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      lenis?.destroy()
      clearInterval(interval)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleMenu = () => {
    menuOpen.current = !menuOpen.current
    const mm = document.getElementById('mmenu')
    const ham = document.getElementById('ham')
    mm?.classList.toggle('open', menuOpen.current)
    if (ham) {
      const spans = ham.querySelectorAll('span')
      spans[0].style.transform = menuOpen.current ? 'rotate(45deg) translate(4px,5px)' : ''
      spans[1].style.opacity = menuOpen.current ? '0' : '1'
      spans[2].style.transform = menuOpen.current ? 'rotate(-45deg) translate(4px,-5px)' : ''
    }
  }
  const closeMenu = () => {
    menuOpen.current = false
    document.getElementById('mmenu')?.classList.remove('open')
    const ham = document.getElementById('ham')
    if (ham) { const s=ham.querySelectorAll('span'); s[0].style.transform=''; s[1].style.opacity='1'; s[2].style.transform='' }
  }

  const W = (t: string) => <span className="word" style={{overflow:'hidden',display:'inline-block',verticalAlign:'bottom'}}><span style={{display:'inline-block'}}>{t}</span></span>

  return (
    <>
      {/* NOISE */}
      <div className="noise" aria-hidden />
      {/* PROGRESS */}
      <div className="prg"><div className="prf" /></div>
      {/* CURSOR */}
      <div id="cursor"><span className="ct">View</span></div>
      <div id="cdot" />

      {/* LOADER */}
      <div id="loader">
        <div className="ldr-lbl">Loading Portfolio</div>
        <div className="ldr-n">0</div>
        <div className="ldr-bar-w"><div className="ldr-bar" /></div>
      </div>

      {/* NAV */}
      <nav id="nav" style={{transition:'background .3s, border-color .3s'}}>
        <style>{`nav.scrolled{background:rgba(12,12,10,.88);backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(244,239,230,.07)}`}</style>
        <a href="#" className="nav-logo">SP</a>
        <div className="nav-links">
          {['About','Education','Projects','Socials','Contact'].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
        <a href="mailto:soumodityapramanik@gmail.com" className="nav-hire" data-cursor="Hire">Hire Me</a>
        <button id="ham" className="ham" onClick={toggleMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div id="mmenu">
        {['About','Education','Projects','Socials','Contact'].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} className="mm-a" onClick={closeMenu}>{l}</a>
        ))}
        <a href="mailto:soumodityapramanik@gmail.com" className="mm-a" style={{color:'var(--gold)',marginTop:'24px'}} onClick={closeMenu}>
          Say Hello →
        </a>
      </div>

      {/* ── HERO ── */}
      <section id="hero">
        <HeroCanvas />
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hbadge">Open to Opportunities</div>
            <div className="hmeta">
              Rampurhat, WB · <span>India</span><br/>
              BCA Graduate · <span>2025</span>
            </div>
          </div>
          <h1 className="hname">
            <span className="hnl"><span>Soumoditya</span></span>
            <span className="hnl" style={{marginLeft:'clamp(20px,4vw,60px)'}}><span className="hn-out">Pramanik</span></span>
          </h1>
          <div className="hbot">
            <p className="hdesc">
              <strong>Full-Stack Developer & Published Author</strong> from West Bengal.
              Building web experiences and digital products with a builder&apos;s mindset.
            </p>
            <div className="hctas">
              <a href="mailto:soumodityapramanik@gmail.com" className="btn-g" data-cursor="Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                Say Hello
              </a>
              <a href="https://github.com/Soumoditya" target="_blank" rel="noopener" className="btn-o" data-cursor="Visit">
                GitHub ↗
              </a>
              <a href="https://amzn.in/d/0j1rKv5a" target="_blank" rel="noopener" className="btn-o" data-cursor="Read">
                My Book ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mqs">
        <div className="mqt">
          {[...MQ_ITEMS,...MQ_ITEMS].map((it,i)=>(
            <span key={i} className="mqi">{it}<span className="sp">✦</span></span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="sec">
        <div className="si">
          <div className="eyeb">01 — Identity</div>
          <h2 className="stit" style={{marginBottom:'0'}}>
            {W('About')}&nbsp;{W('Me')}
          </h2>
          <div className="ag">
            {/* LEFT STICKY */}
            <div className="asticky">
              <div className="ap">
                <p>I&apos;m <strong>Soumoditya Pramanik</strong>, born October 12, 2004, in Rampurhat, Birbhum, West Bengal. A recent BCA Graduate from Brainware University (CGPA 7.48), building full-stack web products with the MERN stack.</p>
                <p>Beyond code, I&apos;m a <strong>published author</strong> — exploring Shankaracharya&apos;s philosophy. I also run tech and Vedic astrology content across multiple platforms. Builder at heart, always shipping.</p>
              </div>
              <div className="asr">
                {[{v:'7.48',l:'CGPA',full:7.48},{v:'82.8',l:'Class XII %',full:82.8},{v:'1',l:'Published Book',full:1}].map(s=>(
                  <div key={s.l} className="as">
                    <div className="asn" data-val={s.full}>{s.v}</div>
                    <div className="asl">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="tc">
                {['Bengali (Native)','English','Hindi','West Bengal','BCA Graduate','Open to Work'].map((t,i)=>(
                  <span key={t} className={`tag ${i===0?'tg':''}`}>{t}</span>
                ))}
              </div>
            </div>
            {/* RIGHT */}
            <div>
              {[
                {k:'Location',v:'Rampurhat-1, Birbhum, West Bengal 731224'},
                {k:'Birthday',v:'October 12, 2004'},
                {k:'Phone',v:'+91 9064882049'},
                {k:'Email',v:'soumodityapramanik@gmail.com'},
                {k:'LinkedIn',v:'linkedin.com/in/soumodityapramanik'},
                {k:'University',v:'Brainware University, Barasat · BCA · 2022–2025'},
              ].map(r=>(
                <div key={r.k} className="db">
                  <div className="dk">{r.k}</div>
                  <div className="dv">{r.v}</div>
                </div>
              ))}
              <div className="skg">
                {SKILLS.map(s=><span key={s} className="sk">{s}</span>)}
              </div>
              <div className="lr" style={{marginTop:'32px'}}>
                <div style={{fontFamily:'var(--ff-m)',fontSize:'10px',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--ink2)',marginBottom:'20px'}}>Languages</div>
                {[{n:'Bengali',l:'Native',w:'100%'},{n:'English',l:'Proficient',w:'82%'},{n:'Hindi',l:'Conversational',w:'60%'}].map(lg=>(
                  <div key={lg.n} className="li">
                    <div className="lt"><span className="ln">{lg.n}</span><span className="ll">{lg.l}</span></div>
                    <div className="lbar"><div className="lf" style={{width:lg.w}} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="sec" style={{background:'var(--bg2)'}}>
        <div className="si">
          <div className="eyeb">02 — Background</div>
          <h2 className="stit">{W('Education')}</h2>
          <div className="edg" style={{marginTop:'64px'}}>
            {/* Brainware - featured */}
            <div className="edc ft">
              <div className="eyr">2022 – 2025</div>
              <div className="einst">Brainware University</div>
              <div className="ebd">Bachelor of Computer Applications (BCA) · Barasat, West Bengal<br/>Software Development · Web Technologies · Databases · Algorithms · OS · Networks</div>
              <div className="escs">
                <div><div className="esc">7.48</div><div className="escl">CGPA</div></div>
                <div><div className="esc">73.27%</div><div className="escl">Overall</div></div>
              </div>
            </div>
            {[
              {yr:'2022',inst:'Rampurhat Jitendralal Vidyabhaban',board:'Higher Secondary (Class XII) · WBCHSE',score:'82.8%',lbl:'Percentage'},
              {yr:'2020',inst:'Rampurhat Jitendralal Vidyabhaban',board:'Madhyamik Pariksha (Class X) · WBBSE',score:'70.29%',lbl:'Percentage'},
            ].map(e=>(
              <div key={e.yr} className="edc">
                <div className="eyr">{e.yr}</div>
                <div className="einst">{e.inst}</div>
                <div className="ebd">{e.board}</div>
                <div className="esc">{e.score}</div>
                <div className="escl">{e.lbl}</div>
              </div>
            ))}
            <div className="edc" style={{background:'var(--bg2)',opacity:.7}}>
              <div className="eyr" style={{color:'var(--ink2)',background:'rgba(244,239,230,.05)',borderColor:'var(--border)'}}>2009 – 2014</div>
              <div className="einst">Pranab Siksha Niketan</div>
              <div className="ebd">Primary School · Rampurhat, Birbhum, West Bengal · Bengali medium foundation education</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec" style={{paddingBottom:'48px'}}>
        <div className="si" style={{marginBottom:'48px'}}>
          <div className="eyeb">03 — Builds</div>
          <h2 className="stit">{W('Selected')}&nbsp;{W('Work')}</h2>
        </div>
        <div style={{overflowX:'auto',paddingBottom:'20px',cursor:'grab'}} id="proj-scroll" onMouseDown={e=>{const el=e.currentTarget;let x=e.clientX,sl=el.scrollLeft;el.style.cursor='grabbing';const mm=(ev:MouseEvent)=>{el.scrollLeft=sl-(ev.clientX-x)};const mu=()=>{el.style.cursor='grab';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu)};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu)}}>
          <div className="pt">
            {PROJECTS.map(p=>(
              <a key={p.i} href={p.url} target="_blank" rel="noopener" className={`pc ${p.feat?'ft':''}`} data-cursor={p.feat?'Read':'View'}>
                <div className="pi">{p.i}{p.feat?' · Featured · Published':''}</div>
                <div className="pn">{p.n}</div>
                <div className="pd">{p.d}</div>
                <div className="ptags">{p.t.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <div className="pl">
                  {p.feat?'View on Amazon':'View Project'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="dh">
          <div className="dhl" />
          <span>Drag to explore</span>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="sec" style={{background:'var(--bg2)'}}>
        <div className="si">
          <div className="eyeb">04 — Presence</div>
          <h2 className="stit">{W('Find')}&nbsp;{W('Me')}&nbsp;{W('Online')}</h2>
          <div className="socg">
            {SOCIALS.map(s=>(
              <a key={s.n} href={s.url} target="_blank" rel="noopener" className="socc" data-cursor="Visit">
                <div className="sic" style={{background:s.bg}}>{s.svg}</div>
                <div className="sn">{s.n}</div>
                <div className="sh">{s.h}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <div className="si">
          <div className="ctab">
            <div className="eyeb" style={{justifyContent:'center',margin:'0 auto 16px'}}>05 — Contact</div>
            <h2 className="ctit">Open for<br/><span className="gold">opportunities</span></h2>
            <p className="csub">Entry-level developer roles, freelance projects, collaborations — let&apos;s build something great.</p>
            <a href="mailto:soumodityapramanik@gmail.com" className="cem" data-cursor="Send">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
              soumodityapramanik@gmail.com
            </a>
            <a href="tel:+919064882049" className="cph">or call +91 9064882049</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fc">© 2026 Soumoditya Pramanik</div>
        <div className="floc">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/><path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
          Rampurhat, West Bengal, India
        </div>
        <div className="fls">
          <a href="https://github.com/Soumoditya" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/soumodityapramanik" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/Soumodityax" target="_blank" rel="noopener">X</a>
        </div>
      </footer>
    </>
  )
}
