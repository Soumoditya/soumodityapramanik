'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SOCIALS = [
  { n:'X / Twitter', h:'@Soumodityax', url:'https://x.com/Soumodityax', bg:'rgba(255,255,255,0.08)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { n:'LinkedIn', h:'soumodityapramanik', url:'https://www.linkedin.com/in/soumodityapramanik', bg:'rgba(10,102,194,0.15)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { n:'GitHub', h:'Soumoditya', url:'https://github.com/Soumoditya', bg:'rgba(200,241,53,0.08)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#C8F135"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  { n:'YouTube', h:'@soumodityapramanik', url:'https://youtube.com/@soumodityapramanik', bg:'rgba(255,0,0,0.1)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  { n:'Instagram', h:'@soumodityapramanik', url:'https://www.instagram.com/soumodityapramanik', bg:'rgba(225,48,108,0.1)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { n:'Facebook', h:'Soumodityapramanik', url:'https://www.facebook.com/Soumodityapramanik', bg:'rgba(24,119,242,0.1)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { n:'Grokipedia', h:'soumoditya-pramanik', url:'http://grokipedia.com/page/soumoditya-pramanik', bg:'rgba(200,241,53,0.06)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { n:'My Book', h:'Amazon KDP', url:'https://amzn.in/d/0j1rKv5a', bg:'rgba(255,153,0,0.1)',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
]

const SKILLS = ['HTML5','CSS3','JavaScript','TypeScript','React.js','Next.js','Node.js','Express','MongoDB','Python','Java','MySQL','WordPress','Git','GitHub','Vercel','AWS (Basic)','REST APIs','MERN Stack']

const PROJECTS = [
  { feat:true, i:'00 · Published',n:'Shankaracharya Message',d:'A published work exploring Adi Shankaracharya\'s philosophical teachings — knowledge, devotion, and liberation. Available globally on Amazon KDP.',t:['Published Book','Amazon KDP','Vedic Philosophy'],url:'https://amzn.in/d/0j1rKv5a' },
  { i:'01',n:'Vedic Astro Engine',d:'Full-stack astrology platform — Kundali (D1 & D9), Panchang, Navagraha analysis with animated Three.js interface.',t:['React','Node.js','MongoDB'],url:'https://github.com/Soumoditya' },
  { i:'02',n:'Library Management System',d:'BCA final-year project — book cataloguing, member management, issue/return tracking with MySQL integration.',t:['Python','MySQL','DBMS'],url:'https://github.com/Soumoditya' },
  { i:'03',n:'MERN Stack App',d:'Full-stack application with JWT auth, REST API, and responsive React frontend. CRUD operations with MongoDB.',t:['MongoDB','Express','React','Node.js'],url:'https://github.com/Soumoditya' },
  { i:'04',n:'Portfolio v5',d:'This site — Next.js 14, TypeScript, GSAP, Three.js, Lenis. Static export to GitHub Pages, CI/CD via Actions.',t:['Next.js','TypeScript','GSAP','Three.js'],url:'https://soumodityapramanik.in' },
]

const MQ = ['Full-Stack Dev','BCA Graduate 2025','React + Node.js','Published Author','West Bengal, India','Open to Work','MERN Stack','WordPress Dev','Vedic Astrology','Available Now']

/* ── Three.js canvas ── */
function ThreeHero() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const parent = canvas.parentElement!
    let W = parent.offsetWidth, H = parent.offsetHeight
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.z = 5

    // Subtle grid of dots
    const gridCount = 30
    const spacing = 0.55
    const positions: number[] = [], cols: number[] = []
    const offset = (gridCount - 1) * spacing * 0.5
    for (let i = 0; i < gridCount; i++) for (let j = 0; j < gridCount; j++) {
      positions.push(i*spacing - offset, j*spacing - offset*0.6, (Math.random()-0.5)*0.5)
      const t = Math.random()
      if (t < 0.15) { cols.push(0.78,0.95,0.21) } // lime
      else { cols.push(0.24,0.22,0.2) } // dark dot
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(cols), 3))
    const dots = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.7 }))
    scene.add(dots)

    // Single elegant ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.006, 6, 120),
      new THREE.MeshBasicMaterial({ color: 0xC8F135, transparent: true, opacity: 0.12 })
    )
    ring.rotation.x = -0.3
    scene.add(ring)

    let mx = 0, my = 0, raf: number
    const onM = (e: MouseEvent) => { mx = (e.clientX/W - 0.5)*0.8; my = -(e.clientY/H - 0.5)*0.8 }
    window.addEventListener('mousemove', onM)
    const onR = () => {
      W = parent.offsetWidth; H = parent.offsetHeight
      renderer.setSize(W, H); camera.aspect = W/H; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onR)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      dots.rotation.z += 0.0003
      ring.rotation.z += 0.001
      camera.position.x += (mx - camera.position.x) * 0.03
      camera.position.y += (my - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    tick()
    return () => { cancelAnimationFrame(raf); renderer.dispose(); window.removeEventListener('mousemove',onM); window.removeEventListener('resize',onR) }
  }, [])
  return <canvas ref={ref} id="hc" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} />
}

export default function Page() {
  const menuOpen = useRef(false)

  useEffect(() => {
    /* ─ CURSOR ─ */
    const cur = document.getElementById('cur')
    let cx = 0, cy = 0, dx = 0, dy = 0
    if (cur && window.matchMedia('(hover:hover)').matches) {
      const lerp = (a:number,b:number,t:number) => a+(b-a)*t
      document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY })
      const t = () => { dx=lerp(dx,cx,.13); dy=lerp(dy,cy,.13); cur.style.left=dx+'px'; cur.style.top=dy+'px'; requestAnimationFrame(t) }
      t()
      document.querySelectorAll('a,button,.sk,.soc-card,.proj-card,.edu-card,.strip-cell').forEach(el => {
        el.addEventListener('mouseenter', () => cur.classList.add('expand'))
        el.addEventListener('mouseleave', () => cur.classList.remove('expand'))
      })
    }

    /* ─ LOADER ─ */
    const loader = document.getElementById('loader')
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      loader?.classList.add('out')
      document.body.style.overflow = ''
      // hero name reveal
      setTimeout(() => {
        document.querySelectorAll('.hero-name .row span').forEach((s, i) => {
          setTimeout(() => s.classList.add('in'), i * 130)
        })
      }, 100)
    }, 1400)

    /* ─ LENIS ─ */
    let lenis: {raf:(t:number)=>void; destroy:()=>void} | null = null
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.4, easing: (t:number) => Math.min(1,1.001-Math.pow(2,-10*t)) })
      const raf = (time:number) => { lenis!.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })

    /* ─ GSAP ─ */
    const initGSAP = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Progress bar
      gsap.to('.progress-fill', { scaleX:1, ease:'none', scrollTrigger:{trigger:'body',start:'top top',end:'bottom bottom',scrub:true} })

      // Nav stuck class
      ScrollTrigger.create({ start:'top -50', onEnter:()=>document.querySelector('nav')?.classList.add('stuck'), onLeaveBack:()=>document.querySelector('nav')?.classList.remove('stuck') })

      // Sec headers
      gsap.utils.toArray<HTMLElement>('.sec-h').forEach(el => {
        gsap.fromTo(el, { opacity:0, y:32 }, { opacity:1, y:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el,start:'top 88%'} })
      })
      gsap.utils.toArray<HTMLElement>('.sec-label').forEach(el => {
        gsap.fromTo(el, { opacity:0, x:-16 }, { opacity:1, x:0, duration:.7, ease:'power2.out', scrollTrigger:{trigger:el,start:'top 90%'} })
      })

      // Stats count up
      document.querySelectorAll<HTMLElement>('.strip-num').forEach(el => {
        const v = parseFloat(el.dataset.v||'0'); const dec = v%1!==0
        gsap.to({val:0}, {val:v,duration:1.6,ease:'power2.out',
          onUpdate(){ el.textContent = dec?(this.targets()[0] as {val:number}).val.toFixed(2):Math.round((this.targets()[0] as {val:number}).val).toString() },
          scrollTrigger:{trigger:el,start:'top 88%'}
        })
      })

      // About bio
      gsap.utils.toArray<HTMLElement>('.about-bio p').forEach((p,i) => {
        gsap.fromTo(p, { opacity:0,y:20 }, { opacity:1,y:0,duration:.8,ease:'power3.out',delay:i*.1, scrollTrigger:{trigger:p,start:'top 90%'} })
      })

      // Detail rows
      gsap.utils.toArray<HTMLElement>('.drow').forEach((el,i) => {
        gsap.fromTo(el, { opacity:0,x:-20 }, { opacity:1,x:0,duration:.7,ease:'power3.out',delay:i*.05, scrollTrigger:{trigger:el,start:'top 92%'} })
      })

      // Skills
      gsap.fromTo('.sk', { opacity:0,y:16 }, { opacity:1,y:0,duration:.5,stagger:.025,ease:'power2.out', scrollTrigger:{trigger:'.skills-cloud',start:'top 88%'} })

      // Lang bars via CSS class
      document.querySelectorAll<HTMLElement>('.lfill').forEach(el => {
        ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:()=>el.classList.add('on') })
      })

      // Tags
      gsap.fromTo('.tag', { opacity:0,y:12 }, { opacity:1,y:0,duration:.5,stagger:.06,ease:'power2.out', scrollTrigger:{trigger:'.tags',start:'top 90%'} })

      // Edu cards
      gsap.utils.toArray<HTMLElement>('.edu-card').forEach((el,i) => {
        gsap.fromTo(el, { opacity:0,y:36 }, { opacity:1,y:0,duration:.9,ease:'power3.out',delay:(i%2)*.1, scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Proj cards
      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((el,i) => {
        gsap.fromTo(el, { opacity:0,y:36 }, { opacity:1,y:0,duration:.9,ease:'power3.out',delay:(i%2)*.1, scrollTrigger:{trigger:el,start:'top 88%'} })
      })

      // Social cards
      gsap.fromTo('.soc-card', { opacity:0,scale:.92 }, { opacity:1,scale:1,duration:.7,stagger:.05,ease:'back.out(1.4)', scrollTrigger:{trigger:'.soc-grid',start:'top 86%'} })

      // CTA
      gsap.fromTo('.cta-h', { opacity:0,y:48 }, { opacity:1,y:0,duration:1.1,ease:'power3.out', scrollTrigger:{trigger:'.cta-inner',start:'top 80%'} })
    }
    initGSAP()

    /* ─ NAV ─ */
    const onScroll = () => document.querySelector('nav')?.classList.toggle('stuck', window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive:true })

    return () => { clearTimeout(t); lenis?.destroy(); window.removeEventListener('scroll',onScroll) }
  }, [])

  const toggleMenu = () => {
    menuOpen.current = !menuOpen.current
    const o = menuOpen.current
    document.getElementById('mob')?.classList.toggle('open', o)
    const h = document.getElementById('ham')
    if (h) {
      const s = h.querySelectorAll('span')
      s[0].style.transform = o ? 'rotate(45deg) translate(4px,4px)' : ''
      s[1].style.opacity = o ? '0' : '1'
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
      <div className="progress"><div className="progress-fill" /></div>
      <div id="cur" />

      {/* LOADER */}
      <div id="loader">
        <div className="loader-word">
          <span>Soumoditya</span>
          <span>.</span>
        </div>
        <div className="loader-sub">Crafting Portfolio</div>
      </div>

      {/* NAV */}
      <nav id="nav">
        <a href="#" className="nav-l">SP</a>
        <div className="nav-c">
          {['About','Education','Projects','Socials','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
        <div className="nav-r hidden md:block">
          <a href="mailto:soumodityapramanik@gmail.com">Hire Me</a>
        </div>
        <button id="ham" className="ham" onClick={toggleMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div id="mob">
        {['About','Education','Projects','Socials','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a>
        ))}
        <a href="mailto:soumodityapramanik@gmail.com" className="cta-link" onClick={closeMenu}>
          Hire Me →
        </a>
      </div>

      {/* ── HERO ── */}
      <section id="hero">
        <ThreeHero />
        <div className="hero-body">
          <div className="hero-tag">Available for opportunities</div>
          <h1 className="hero-name">
            <span className="row"><span>Soumoditya</span></span>
            <span className="row"><span className="italic">Pramanik</span></span>
          </h1>
          <div className="hero-foot">
            <p className="hero-desc">
              <strong>Full-Stack Developer & Published Author</strong> from Rampurhat, West Bengal.
              BCA Graduate building web experiences and digital products.
            </p>
            <div className="hero-btns">
              <div className="hero-meta">
                <em>Rampurhat, WB</em> · India<br />
                BCA · <em>Brainware University</em> · 2025
              </div>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <a href="mailto:soumodityapramanik@gmail.com" className="btn-primary">
                  Say Hello →
                </a>
                <a href="https://github.com/Soumoditya" target="_blank" rel="noopener" className="btn-secondary">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mq">
        <div className="mq-t">
          {[...MQ,...MQ].map((item,i) => (
            <span key={i} className="mq-i">{item}<span className="mq-dot">◆</span></span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="sec">
        <div className="si">
          <div className="sec-label rv">01 — Identity</div>
          <h2 className="sec-h" style={{marginBottom:'clamp(40px,4vw,64px)'}}>About <i>Me</i></h2>

          <div className="about-wrap">
            {/* Stats strip */}
            <div className="about-strip rv">
              {[{n:'7.48',l:'University CGPA',v:7.48},{n:'82.8',l:'Class XII %',v:82.8},{n:'73.27',l:'BCA Overall %',v:73.27}].map(s => (
                <div key={s.l} className="strip-cell">
                  <div className="strip-num" data-v={s.v}>{s.n}</div>
                  <div className="strip-lbl">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Two column — no sticky */}
            <div className="about-cols">
              <div className="about-bio">
                <p>I&apos;m <strong>Soumoditya Pramanik</strong>, born October 12, 2004, in Rampurhat, Birbhum, West Bengal. A BCA Graduate from Brainware University (CGPA 7.48), building full-stack web products with the MERN stack.</p>
                <p>Beyond code, I&apos;m a <strong>published author</strong> — exploring Shankaracharya&apos;s philosophy through writing. I also create tech and Vedic astrology content across multiple platforms. Builder at heart, always shipping.</p>

                <div className="skills-wrap">
                  <div className="skills-lbl">Tech Stack</div>
                  <div className="skills-cloud">
                    {SKILLS.map(s => <span key={s} className="sk">{s}</span>)}
                  </div>
                </div>

                <div className="langs" style={{marginTop:'32px'}}>
                  <div className="skills-lbl">Languages</div>
                  {[{n:'Bengali',p:'Native',w:1},{n:'English',p:'Proficient',w:.82},{n:'Hindi',p:'Conversational',w:.6}].map(l => (
                    <div key={l.n}>
                      <div className="lang-lbl-row">
                        <span className="lang-name">{l.n}</span>
                        <span className="lang-pct">{l.p}</span>
                      </div>
                      <div className="lbar"><div className="lfill" style={{transform:`scaleX(${l.w})`}} /></div>
                    </div>
                  ))}
                </div>

                <div className="tags" style={{marginTop:'28px'}}>
                  {['Bengali (Native)','English','Hindi','West Bengal','Open to Work','BCA Graduate'].map((t,i) => (
                    <span key={t} className={`tag ${i===0?'tag-hl':''}`}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="about-details">
                {[
                  { k:'Birthday', v:'October 12, 2004' },
                  { k:'Location', v:'Rampurhat-1, Birbhum, West Bengal — 731224' },
                  { k:'Email', v:<a href="mailto:soumodityapramanik@gmail.com">soumodityapramanik@gmail.com</a> },
                  { k:'LinkedIn', v:<a href="https://www.linkedin.com/in/soumodityapramanik" target="_blank" rel="noopener">linkedin.com/in/soumodityapramanik ↗</a> },
                  { k:'GitHub', v:<a href="https://github.com/Soumoditya" target="_blank" rel="noopener">github.com/Soumoditya ↗</a> },
                  { k:'University', v:'Brainware University, Barasat · BCA · 2022–2025' },
                  { k:'Status', v:'Available for entry-level roles & freelance' },
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
          <div className="edu-grid">
            <div className="edu-card span2">
              <div className="edu-yr">2022 – 2025</div>
              <div className="edu-inst">Brainware University</div>
              <div className="edu-board">Bachelor of Computer Applications (BCA) · Barasat, West Bengal<br/>Software Development · Web Technologies · Databases · OS · Networks</div>
              <div className="edu-scores">
                <div><div className="edu-score-v">7.48</div><div className="edu-score-l">CGPA</div></div>
                <div><div className="edu-score-v">73.27%</div><div className="edu-score-l">Overall</div></div>
              </div>
            </div>
            {[
              {yr:'2022',inst:'Rampurhat Jitendralal Vidyabhaban',board:'Higher Secondary (Class XII) · WBCHSE',score:'82.8%'},
              {yr:'2020',inst:'Rampurhat Jitendralal Vidyabhaban',board:'Madhyamik Pariksha (Class X) · WBBSE',score:'70.29%'},
            ].map(e => (
              <div key={e.yr} className="edu-card">
                <div className="edu-yr">{e.yr}</div>
                <div className="edu-inst">{e.inst}</div>
                <div className="edu-board">{e.board}</div>
                <div className="edu-score-v">{e.score}</div>
                <div className="edu-score-l">Percentage</div>
              </div>
            ))}
            <div className="edu-card" style={{opacity:.65}}>
              <div className="edu-yr" style={{color:'var(--ink2)',background:'rgba(240,235,227,0.04)',borderColor:'var(--bd)'}}>2009 – 2014</div>
              <div className="edu-inst">Pranab Siksha Niketan</div>
              <div className="edu-board">Primary School · Rampurhat, Birbhum · Bengali medium foundation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec">
        <div className="si">
          <div className="sec-label rv">03 — Builds</div>
          <h2 className="sec-h">Selected Work</h2>
          <div className="proj-grid">
            {PROJECTS.map(p => (
              <a key={p.i} href={p.url} target="_blank" rel="noopener" className={`proj-card ${p.feat?'feat':''}`}>
                <div className="proj-i">{p.i}</div>
                <div className="proj-n">{p.n}</div>
                <div className="proj-d">{p.d}</div>
                <div className="proj-tags">{p.t.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <div className="proj-link">View {p.feat?'on Amazon':'Project'} <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>
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
              <a key={s.n} href={s.url} target="_blank" rel="noopener" className="soc-card">
                <div className="soc-ic" style={{background:s.bg}}>{s.icon}</div>
                <div className="soc-n">{s.n}</div>
                <div className="soc-h">{s.h}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <div className="si">
          <div className="cta-inner">
            <div className="sec-label rv" style={{justifyContent:'center',marginBottom:'16px'}}>05 — Contact</div>
            <h2 className="cta-h">Let&apos;s work<br/><i>together</i></h2>
            <p className="cta-sub">Entry-level roles, freelance projects, or just a conversation — I&apos;m open to all of it.</p>
            <a href="mailto:soumodityapramanik@gmail.com" className="cta-email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
              soumodityapramanik@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fc">© 2026 Soumoditya Pramanik</div>
        <div className="flinks">
          <a href="https://github.com/Soumoditya" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/soumodityapramanik" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/Soumodityax" target="_blank" rel="noopener">X</a>
          <a href="https://amzn.in/d/0j1rKv5a" target="_blank" rel="noopener">Book</a>
        </div>
      </footer>
    </>
  )
}
