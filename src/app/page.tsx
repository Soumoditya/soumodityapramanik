'use client'
import { useEffect } from 'react'

type Project = { n: string; cat: string; accent: string; desc: string; tags: string[]; cta: string; url: string | null }
const PROJECTS: Project[] = [
  { n:'NagrikNazar', cat:'Civic Tech', accent:'#E8A24A', desc:'Tracks Indian politicians’ criminal cases, assets and budgets using public records.', tags:['Next.js','TypeScript','Data'], cta:'Visit live', url:'https://news-theta-dusky.vercel.app' },
  { n:'ResumeForge', cat:'AI Tool', accent:'#8E7BE6', desc:'An AI resume builder and analyzer with ATS scoring, powered by Gemini.', tags:['Next.js','Tailwind','Gemini'], cta:'Visit live', url:'https://resumeforge-flame.vercel.app' },
  { n:'Sadhak', cat:'Lifestyle', accent:'#D8B15A', desc:'A spiritual companion — Panchang, temple finder, japa counter, library and community.', tags:['Web App','PWA'], cta:'Visit live', url:'https://sadhak-app.vercel.app' },
  { n:'Sanskrit Guru', cat:'Learning', accent:'#D9857A', desc:'A gamified way to learn Sanskrit — build sentences and decode shlokas, even offline.', tags:['Web App','Offline'], cta:'Visit live', url:'https://sanskrit-guru.vercel.app' },
  { n:'Banana Chat', cat:'Social', accent:'#E4C860', desc:'A real-time chat platform — simple, fast and built for conversation.', tags:['JavaScript','Realtime'], cta:'Visit live', url:'https://banana-chat-app.vercel.app' },
  { n:'Sampark', cat:'Messaging', accent:'#7FEAD6', desc:'The desi messenger — real-time messaging built for how India chats.', tags:['Web App','Realtime'], cta:'Visit live', url:'https://sampark-app.vercel.app' },
  { n:'PassPredictor', cat:'Security', accent:'#6BC7E0', desc:'A password-recovery tool that ranks likely passwords from personal hints.', tags:['JavaScript','Logic'], cta:'Visit live', url:'https://pass-predictor.vercel.app' },
  { n:'Vintly', cat:'Android', accent:'#9BC46B', desc:'A study companion for Android that turns notes into usable study material.', tags:['Android','App'], cta:'Download', url:'https://github.com/Soumoditya/Vintly/releases/tag/latest' },
  { n:'Days Until', cat:'Android', accent:'#C878B0', desc:'A minimal countdown app for the dates you don’t want to miss.', tags:['Android','Play Store'], cta:'Coming to Play Store', url:null },
]
const SOCIALS: [string,string][] = [
  ['GitHub','https://github.com/Soumoditya'],['LinkedIn','https://www.linkedin.com/in/soumodityapramanik'],
  ['X','https://x.com/Soumodityax'],['Instagram','https://www.instagram.com/soumodityapramanik'],
  ['YouTube','https://youtube.com/@soumodityapramanik'],['Play Store','https://play.google.com/store/apps/dev?id=4693782516786119856'],
  ['Linktree','https://linktr.ee/soumodityapramanik'],
]
const EDU = [
  { yr:'2022 — 2025', inst:'Brainware University', deg:'Bachelor of Computer Applications (BCA)', place:'Barasat' },
  { yr:'2020 & 2022', inst:'Rampurhat Jitendralal Vidyabhaban', deg:'Secondary & Higher Secondary', place:'Rampurhat' },
]
const EMAIL = 'soumodityapramanik@gmail.com'

/* recognizable brand glyphs (24 viewBox, currentColor) */
const ICONS: Record<string,string> = {
  GitHub:'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  LinkedIn:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  X:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  Instagram:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  YouTube:'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  'Play Store':'M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.31 12l2.388-2.49zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z',
  Linktree:'M13.511 5.853l4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.334 4.229-4.108H1.001V8.122h5.909l-4.201-4.005 2.325-2.381 4.005 4.117V0h3.483zM10.028 16.744h3.483v7.256h-3.483z',
  Email:'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0z',
}
const svg = (name: string) => { const p = ICONS[name] || ICONS.Linktree; return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${p}"/></svg>` }

export default function Page() {
  useEffect(() => {
    let cleanup = () => {}
    ;(async () => { const THREE = await import('three'); cleanup = boot(THREE) })()
      .catch(() => { document.getElementById('fallback')?.classList.add('show'); document.getElementById('intro')?.classList.add('gone') })
    return () => cleanup()
  }, [])
  return (
    <>
      <canvas id="gl" />
      <div className="vig" />
      <div id="flash" />
      <audio id="snd" src="/intro.mp3" loop preload="auto" />
      <button id="mute" aria-label="Toggle sound" />

      <div id="intro">
        <div className="scan" />
        <div className="bmload" id="bmload"><div className="ring" /><div className="bmsub">loading</div></div>
        <div className="crack" id="crack" />
        <div className="stage" id="stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="fsmask" id="fsmask" src="/fsociety.png" alt="fsociety mask" />
          <div className="fslabel">fsociety</div>
          <div className="mrtitle" id="mrtitle" />
          <button className="tap" id="tapBtn">[ Enter ]</button>
        </div>
      </div>

      <div id="namecard"><p>Developer &amp; Maker — India</p><h1>Soumoditya Pramanik</h1></div>
      <div id="hud">
        <button className="brand" data-jump="0">S<b>P</b></button>
        <div className="menu">
          <button data-jump="0">Intro</button>
          <button data-jump="0.5">Work</button>
          <button data-panel="about">About</button>
          <button data-panel="education">Education</button>
          <button data-panel="contact">Contact</button>
        </div>
      </div>
      <div id="cue"><span className="m" /><br/>Scroll to fall in</div>
      <div id="work" />
      <div id="rail" />

      <div className="overlay" id="overlay"><div className="folder" id="folder" /></div>
      <div className="toast" id="toast" />

      <div id="fallback">
        <h1>Soumoditya <em>Pramanik</em></h1>
        <p className="role">I&apos;m a developer from India. I build web and mobile apps — carefully, end to end.</p>
        <div className="plist">
          {PROJECTS.map(p => (
            <div className="pc" key={p.n} style={{ ['--accent' as string]: p.accent }}>
              <div className="nm">{p.n}</div><div className="ds">{p.desc}</div>
              {p.url ? <a className="go" href={p.url} target="_blank" rel="noopener">{p.cta} ↗</a> : <span className="go">{p.cta}</span>}
            </div>
          ))}
        </div>
        <div className="soc">{SOCIALS.map(s => <a key={s[0]} href={s[1]} target="_blank" rel="noopener">{s[0]}</a>)}</div>
      </div>
      <div className="seo-only">
        <h2>Soumoditya Pramanik — Developer &amp; Maker, India</h2>
        <p>Projects: {PROJECTS.map(p=>p.n).join(', ')}. Education: Brainware University (BCA), Rampurhat Jitendralal Vidyabhaban. Contact: {EMAIL}.</p>
      </div>
    </>
  )
}

/* ===================== experience ===================== */
function boot(THREE: typeof import('three')): () => void {
  const $ = (s: string) => document.querySelector(s) as HTMLElement | null
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = matchMedia('(max-width:760px)').matches
  const canvas = document.getElementById('gl') as HTMLCanvasElement
  let renderer: any
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' }) } catch { throw new Error('no webgl') }
  if (!renderer.getContext()) throw new Error('no ctx')
  const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 2)
  renderer.setPixelRatio(DPR); renderer.setSize(innerWidth, innerHeight); renderer.setClearColor(0x000000, 1)

  const tex = (draw: (c: CanvasRenderingContext2D, cv: HTMLCanvasElement)=>void, w: number, h?: number) => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h || w; draw(cv.getContext('2d')!, cv)
    const t = new THREE.CanvasTexture(cv); t.needsUpdate = true; t.anisotropy = 8; return t
  }
  const glowTex = (col: string) => tex((x, c) => { const g = x.createRadialGradient(c.width/2,c.width/2,0,c.width/2,c.width/2,c.width/2); g.addColorStop(0,col); g.addColorStop(.28,col); g.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.width) }, 128)

  /* =========================================================
     BLACK HOLE — lightweight mesh build (i3-friendly, stable)
     event horizon + edge-on accretion disk + lensed halo ring
     + soft round stars.  No raymarch, no pixel noise.
     ========================================================= */
  const holeScene = new THREE.Scene()
  const holeCam = new THREE.PerspectiveCamera(52, innerWidth/innerHeight, 0.1, 500)

  // soft round star sprite (not square pixels)
  const dotTex = glowTex('rgba(255,255,255,1)')
  const STAR_N = isMobile ? 900 : 1600
  const spos = new Float32Array(STAR_N*3), scol = new Float32Array(STAR_N*3)
  for (let i=0;i<STAR_N;i++){ const r=60+Math.random()*180, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1)
    spos[i*3]=r*Math.sin(ph)*Math.cos(th); spos[i*3+1]=r*Math.cos(ph); spos[i*3+2]=r*Math.sin(ph)*Math.sin(th)
    const w=0.6+Math.random()*0.4, tint=Math.random(); scol[i*3]=w; scol[i*3+1]=w*(0.9+tint*0.1); scol[i*3+2]=w*(0.85+tint*0.15) }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(spos,3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(scol,3))
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size:isMobile?1.1:1.4, map:dotTex, vertexColors:true, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, sizeAttenuation:true }))
  holeScene.add(stars)

  // background bloom
  const bg = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex('rgba(255,150,80,0.30)'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending }))
  bg.scale.set(26,26,1); bg.position.set(0,0,0); holeScene.add(bg)

  // event horizon
  const horizon = new THREE.Mesh(new THREE.SphereGeometry(2.15, 40, 40), new THREE.MeshBasicMaterial({ color:0x000000 }))
  holeScene.add(horizon)

  // accretion disk (edge-on plane, turbulent hot texture)
  const diskTex = tex((x,c)=>{
    const s=c.width, cx=s/2, cy=s/2; x.clearRect(0,0,s,s)
    const g=x.createRadialGradient(cx,cy,s*0.16,cx,cy,s*0.5)
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(0.22,'rgba(90,30,10,0)')
    g.addColorStop(0.31,'rgba(255,150,60,0.55)'); g.addColorStop(0.40,'rgba(255,224,160,0.98)')
    g.addColorStop(0.49,'rgba(255,186,96,0.78)'); g.addColorStop(0.60,'rgba(196,66,24,0.24)'); g.addColorStop(0.72,'rgba(120,40,16,0.05)'); g.addColorStop(0.82,'rgba(0,0,0,0)')
    x.fillStyle=g; x.fillRect(0,0,s,s)
    // turbulent arc streaks
    for(let i=0;i<300;i++){ const ang=Math.random()*Math.PI*2, rr=s*(0.17+Math.random()*0.32)
      x.beginPath(); x.arc(cx,cy,rr,ang,ang+0.02+Math.random()*0.09)
      const a=0.03+Math.random()*0.10, hot=Math.random()>0.5
      x.strokeStyle=hot?`rgba(255,232,190,${a})`:`rgba(255,150,70,${a})`; x.lineWidth=0.6+Math.random()*2.4; x.stroke() }
    // Doppler: one side a touch brighter
    const dg=x.createLinearGradient(0,0,s,0); dg.addColorStop(0,'rgba(255,240,210,0.10)'); dg.addColorStop(0.5,'rgba(0,0,0,0)'); dg.addColorStop(1,'rgba(0,0,0,0)')
    x.globalCompositeOperation='lighter'; x.fillStyle=dg; x.fillRect(0,0,s,s); x.globalCompositeOperation='source-over'
  }, 1024)
  diskTex.center.set(0.5,0.5)
  const disk = new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshBasicMaterial({ map:diskTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, side:THREE.DoubleSide }))
  disk.rotation.x = -1.24  // near edge-on
  holeScene.add(disk)

  // lensed halo / photon ring — billboard, wraps the sphere (Interstellar look)
  const haloTex = tex((x,c)=>{
    const s=c.width, cx=s/2; x.clearRect(0,0,s,s)
    const g=x.createRadialGradient(cx,cx,s*0.30,cx,cx,s*0.5)
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(0.78,'rgba(0,0,0,0)')
    g.addColorStop(0.86,'rgba(255,196,116,0.85)'); g.addColorStop(0.92,'rgba(255,244,214,1)')
    g.addColorStop(0.96,'rgba(255,176,86,0.42)'); g.addColorStop(1,'rgba(0,0,0,0)')
    x.fillStyle=g; x.fillRect(0,0,s,s)
  }, 256)
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(5.9,5.9), new THREE.MeshBasicMaterial({ map:haloTex, transparent:true, depthWrite:false, depthTest:false, blending:THREE.AdditiveBlending }))
  holeScene.add(halo)

  /* =========================================================
     TESSERACT LIBRARY — dense warm bookshelf lattice
     ========================================================= */
  const archScene = new THREE.Scene(); archScene.fog = new THREE.FogExp2(0x0b0704, 0.019)
  const archCam = new THREE.PerspectiveCamera(isMobile?72:60, innerWidth/innerHeight, 0.1, 700)
  const PAL = ['#7a2f27','#8f6a2e','#324b3a','#26323f','#5b3350','#8a6a34','#442a1c','#2c3a58','#6e4325','#4a5a26','#7d5230','#3a2a44','#93843f','#5a2c22','#804a2a','#38506a']
  const shelfTex = (seed:number) => tex((x,c)=>{
    const wg=x.createLinearGradient(0,0,c.width,c.height); wg.addColorStop(0,'#1f120a'); wg.addColorStop(1,'#281a0b'); x.fillStyle=wg; x.fillRect(0,0,c.width,c.height)
    for(let i=0;i<200;i++){ x.fillStyle=`rgba(0,0,0,${0.03+Math.random()*0.06})`; x.fillRect(Math.random()*c.width,0,1,c.height) }
    const rows=9, rh=c.height/rows
    let s=seed*97.13; const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280 }
    for(let r=0;r<rows;r++){
      const y0=r*rh, board=10, shelfBase=y0+rh-board
      const ao=x.createLinearGradient(0,y0,0,y0+rh); ao.addColorStop(0,'rgba(0,0,0,0.55)'); ao.addColorStop(.4,'rgba(0,0,0,0)'); x.fillStyle=ao; x.fillRect(0,y0,c.width,rh)
      let bx=6
      while(bx<c.width-6){ const bw=13+Math.floor(rnd()*26); const bh=rh-board-4-Math.floor(rnd()*(rh*0.28)); const col=PAL[Math.floor(rnd()*PAL.length)]
        const by=shelfBase-bh
        x.fillStyle=col; x.fillRect(bx,by,bw,bh)
        x.fillStyle='rgba(255,255,255,0.10)'; x.fillRect(bx,by,2,bh)
        x.fillStyle='rgba(0,0,0,0.38)'; x.fillRect(bx+bw-2,by,2,bh)
        x.fillStyle='rgba(0,0,0,0.28)'; x.fillRect(bx,by,bw,3)
        if(rnd()>0.4){ x.fillStyle=rnd()>0.5?'rgba(214,180,120,0.75)':'rgba(255,255,255,0.16)'; const ty=by+bh*0.26+rnd()*bh*0.4; x.fillRect(bx+3,ty,bw-6,rnd()>0.5?3:2) }
        bx+=bw+1+Math.floor(rnd()*2) }
      x.fillStyle='#33200f'; x.fillRect(0,shelfBase,c.width,board)
      x.fillStyle='rgba(140,92,46,0.55)'; x.fillRect(0,shelfBase,c.width,2)
      x.fillStyle='rgba(0,0,0,0.6)'; x.fillRect(0,shelfBase+board,c.width,5)
    }
    const v=x.createRadialGradient(c.width/2,c.height/2,c.width*0.15,c.width/2,c.height/2,c.width*0.72); v.addColorStop(0,'rgba(255,190,110,0.06)'); v.addColorStop(1,'rgba(0,0,0,0.45)'); x.fillStyle=v; x.fillRect(0,0,c.width,c.height)
  }, 1024, 1024)
  const SHELVES = [shelfTex(1),shelfTex(2),shelfTex(3),shelfTex(4),shelfTex(5)]
  const shelfMat = (i:number, rep:[number,number], tint=0x9a8f80, op=1) => { const t=SHELVES[i%SHELVES.length].clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(rep[0],rep[1]); return new THREE.MeshBasicMaterial({map:t,color:new THREE.Color(tint),side:THREE.DoubleSide,fog:true,transparent:op<1,opacity:op}) }

  const lattice = new THREE.Group(); archScene.add(lattice)
  const LEN=340, HALF=11
  // continuous outer walls (far background so no black voids)
  const wallGeo = new THREE.PlaneGeometry(LEN, HALF*2)
  const mkWall=(i:number,rot:{x?:number,y?:number},pos:[number,number,number])=>{ const m=new THREE.Mesh(wallGeo, shelfMat(i,[LEN/22,1.6])); if(rot.x)m.rotation.x=rot.x; if(rot.y)m.rotation.y=rot.y; m.position.set(...pos); lattice.add(m) }
  mkWall(0,{y:Math.PI/2},[-HALF,0,-LEN/2+14]); mkWall(1,{y:-Math.PI/2},[HALF,0,-LEN/2+14])
  mkWall(2,{x:Math.PI/2},[0,HALF,-LEN/2+14]); mkWall(3,{x:-Math.PI/2},[0,-HALF,-LEN/2+14])
  // nested shelf frames receding -> tesseract lattice depth
  const stripH = 3.4
  const topGeo = new THREE.PlaneGeometry(HALF*2, stripH), sideGeo = new THREE.PlaneGeometry(stripH, HALF*2)
  for(let f=0; f<18; f++){
    const z = -14 - f*17, tint = 0x8a8072
    const top=new THREE.Mesh(topGeo, shelfMat(f, [2.4,0.5], tint)); top.position.set(0, HALF-stripH/2, z); lattice.add(top)
    const bot=new THREE.Mesh(topGeo, shelfMat(f+1, [2.4,0.5], tint)); bot.position.set(0,-HALF+stripH/2, z); lattice.add(bot)
    const lf=new THREE.Mesh(sideGeo, shelfMat(f+2, [0.5,2.4], tint)); lf.position.set(-HALF+stripH/2, 0, z); lattice.add(lf)
    const rt=new THREE.Mesh(sideGeo, shelfMat(f+3, [0.5,2.4], tint)); rt.position.set(HALF-stripH/2, 0, z); lattice.add(rt)
  }
  // warm god-ray shafts
  const rayTex = tex((x,c)=>{ const g=x.createLinearGradient(0,0,0,c.height); g.addColorStop(0,'rgba(255,214,150,0)'); g.addColorStop(.5,'rgba(255,222,164,0.55)'); g.addColorStop(1,'rgba(255,214,150,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.height) },16,256)
  for(let i=0;i<10;i++){ const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4, HALF*2.2), new THREE.MeshBasicMaterial({map:rayTex,transparent:true,opacity:0.20,blending:THREE.AdditiveBlending,depthWrite:false}))
    m.position.set((i%2?1:-1)*(HALF-1.2), 0, -22 - i*30); m.rotation.y=(i%2?-0.4:0.4); lattice.add(m) }
  const vp = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex('rgba(255,205,140,0.5)'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending })); vp.position.set(0,0,-LEN+40); vp.scale.set(30,30,1); archScene.add(vp)
  const ARCH_Z0 = 6, ARCH_Z1 = -14 - 17*17  // camera z travel range

  /* ---- state / journey ---- */
  let prog=0,target=0,mode:'hole'|'arch'='hole',running=true,raf=0,flashT=0
  const DIVE=0.42; let mx=0,my=0,cmx=0,cmy=0, curCard=-1
  const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v))
  const mix=(a:number,b:number,t:number)=>a+(b-a)*t

  /* ---- DOM project cards (never clip) ---- */
  const work=$('#work')!
  const cardHTML=(p:Project,i:number)=>{
    const go = p.url ? `<a class="go" href="${p.url}" target="_blank" rel="noopener">${p.cta} ↗</a>` : `<span class="go soon">${p.cta}</span>`
    return `<div class="pcard" style="--a:${p.accent}"><div class="cat">${p.cat}</div><div class="nm">${p.n}</div>`+
      `<div class="ds">${p.desc}</div><div class="tg">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${go}`+
      `<div class="pcount">${String(i+1).padStart(2,'0')} / ${String(PROJECTS.length).padStart(2,'0')}</div></div>`
  }
  function showCard(i:number){ if(i===curCard) return; curCard=i; work.innerHTML=cardHTML(PROJECTS[i],i) }

  const rail=$('#rail')!
  PROJECTS.forEach((p,i)=>{ const b=document.createElement('button'); b.title=p.n
    b.onclick=()=>{ target=clamp(DIVE + (1-DIVE)*(i/(PROJECTS.length-1)), DIVE+0.01, 1) }; rail.appendChild(b) })

  /* ---- audio (owner's file): soft on load, punch on break, mute btn ---- */
  const snd = document.getElementById('snd') as HTMLAudioElement
  const muteBtn = $('#mute')!
  const SPK='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm11.5 3a4.5 4.5 0 00-2.5-4.03v8.06A4.5 4.5 0 0014.5 12z"/></svg>'
  const MUT='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M15 9l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
  let muted=false, started=false; if(snd){ snd.volume=0 }
  muteBtn.innerHTML=SPK
  function fade(to:number,ms:number){ if(!snd) return; const f=snd.volume, t0=performance.now(); const st=()=>{ const k=clamp((performance.now()-t0)/ms,0,1); snd.volume=muted?0:mix(f,to,k); if(k<1) requestAnimationFrame(st) }; st() }
  function startAudio(){ if(started||!snd) return; snd.play().then(()=>{ started=true; if(!muted) fade(0.5,900) }).catch(()=>{}) }
  ;['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,startAudio,{passive:true}))
  muteBtn.onclick=()=>{ muted=!muted; muteBtn.innerHTML=muted?MUT:SPK; if(snd){ snd.muted=muted; if(!muted){ startAudio(); fade(0.5,500) } } }

  /* ---- events ---- */
  function onResize(){ renderer.setSize(innerWidth,innerHeight); holeCam.aspect=innerWidth/innerHeight; holeCam.updateProjectionMatrix(); archCam.aspect=innerWidth/innerHeight; archCam.updateProjectionMatrix() }
  addEventListener('resize',onResize,{passive:true})
  const onVis=()=>{ running=!document.hidden; if(running) loop() }; document.addEventListener('visibilitychange',onVis)
  const onWheel=(e:WheelEvent)=>{ target=clamp(target+e.deltaY*0.00042,0,1); $('#cue')?.classList.remove('show') }
  addEventListener('wheel',onWheel,{passive:true})
  let ty=0
  const onTS=(e:TouchEvent)=>{ ty=e.touches[0].clientY }
  const onTM=(e:TouchEvent)=>{ const y=e.touches[0].clientY; target=clamp(target+(ty-y)*0.0015,0,1); ty=y; $('#cue')?.classList.remove('show') }
  canvas.addEventListener('touchstart',onTS,{passive:true}); canvas.addEventListener('touchmove',onTM,{passive:true})
  const onMove=(e:MouseEvent)=>{ mx=(e.clientX/innerWidth-0.5)*2; my=(e.clientY/innerHeight-0.5)*2 }
  addEventListener('mousemove',onMove)
  const onKey=(e:KeyboardEvent)=>{ if(e.key==='ArrowDown'||e.key==='PageDown')target=clamp(target+0.06,0,1); if(e.key==='ArrowUp'||e.key==='PageUp')target=clamp(target-0.06,0,1); if(e.key==='Escape')closePanel() }
  addEventListener('keydown',onKey)
  document.querySelectorAll('.menu [data-jump], .brand').forEach(b=> (b as HTMLElement).onclick=()=>{ target=parseFloat((b as HTMLElement).dataset.jump||'0') })
  document.querySelectorAll('.menu [data-panel]').forEach(b=> (b as HTMLElement).onclick=()=> openPanel((b as HTMLElement).dataset.panel!))

  /* ---- folder panels (mac dots + black/red) ---- */
  const overlay=$('#overlay')!, folder=$('#folder')!
  function closePanel(){ overlay.classList.remove('open') }
  overlay.addEventListener('click',e=>{ if(e.target===overlay) closePanel() })
  const bar=(path:string)=>`<div class="folder-bar"><span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span><span class="path">${path}</span><button class="x" aria-label="Close">✕</button></div>`
  const aboutHTML=()=>`<h3>Hello, <em>friend.</em></h3>
    <p>I&apos;m <b>Soumoditya Pramanik</b>, a developer from <b>India</b>. I mostly work with React, Next.js and TypeScript, and I build for both the web and Android.</p>
    <p>I learn by building. Some projects started as tools I wanted for myself; others try to be useful to more people. Either way I care about the details — how it feels, how it performs, and whether it genuinely helps.</p>
    <div class="filerow"><span class="ic">▸</span><span class="k">based_in</span><span class="v">India</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">works_with</span><span class="v">React · Next.js · TypeScript</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">also_builds</span><span class="v">Android apps</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">status</span><span class="v">Open to good work</span></div>`
  const eduHTML=()=>`<h3>Where I <em>studied.</em></h3>`+EDU.map(e=>`<div class="filerow"><span class="ic">▸</span><span class="k">${e.yr}</span><span class="v">${e.inst}</span></div><p style="margin:2px 0 12px;color:#8a8580;font-family:var(--mono);font-size:12px">&nbsp;&nbsp;&nbsp;${e.deg} · ${e.place}</p>`).join('')
  const contactHTML=()=>`<h3>Let&apos;s build <em>something.</em></h3><p>Got an idea, a role, or just want to talk shop? My inbox is open.</p>
    <div class="filerow"><span class="ic">${svg('Email')}</span><span class="k">email</span><span class="v"><a href="mailto:${EMAIL}">${EMAIL}</a></span></div>`+
    SOCIALS.map(s=>`<div class="filerow"><span class="ic">${svg(s[0])}</span><span class="k">${s[0].toLowerCase().replace(/ /g,'_')}</span><span class="v"><a href="${s[1]}" target="_blank" rel="noopener">${s[1].replace('https://','').replace('www.','')}</a></span></div>`).join('')
  function renderFolder(active:string){
    const tabs=[['about','~/about'],['education','~/education'],['contact','~/contact']]
    const body = active==='about'?aboutHTML() : active==='education'?eduHTML() : contactHTML()
    folder.innerHTML = bar(`soumoditya@fsociety : <b>~/${active}</b>`)+
      `<div class="folder-tabs">${tabs.map(t=>`<button data-t="${t[0]}" class="${t[0]===active?'on':''}">${t[1]}</button>`).join('')}</div>`+
      `<div class="folder-body">${body}</div>`
    folder.querySelector('.x')!.addEventListener('click',closePanel)
    folder.querySelectorAll('.folder-tabs button').forEach(b=> b.addEventListener('click',()=>renderFolder((b as HTMLElement).dataset.t!)))
  }
  function openPanel(kind:string){ overlay.classList.add('open'); renderFolder(kind==='education'?'education':kind==='contact'?'contact':'about') }

  let toastT:any; function toast(msg:string){ const el=$('#toast')!; el.textContent=msg; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),3200) }

  /* ---- realistic glass shatter — radial impact fracture (Black Mirror) ---- */
  function genShatter(host: HTMLElement){
    while(host.firstChild) host.removeChild(host.firstChild)
    const cv=document.createElement('canvas'); const W=cv.width=Math.min(innerWidth*DPR,2200)|0, H=cv.height=Math.min(innerHeight*DPR,1400)|0; host.appendChild(cv)
    const x=cv.getContext('2d')!; const cx=W*(0.42+Math.random()*0.16), cy=H*(0.34+Math.random()*0.18)
    let s=(Math.random()*1e6)|0; const rnd=(a=0,b=1)=>{ s=(s*9301+49297)%233280; return a+(s/233280)*(b-a) }
    const R=Math.max(W,H), K=R/1600
    const glow=(a:number)=>{ x.shadowColor=`rgba(225,238,255,${a})`; x.shadowBlur=3*K }
    const noGlow=()=>{ x.shadowBlur=0 }
    // irregular angular spokes (chaotic, not evenly spaced)
    const N=20+Math.floor(rnd(0,6)); const ang:number[]=[]; let acc=0
    for(let i=0;i<N;i++){ ang.push(acc); acc+=(Math.PI*2/N)*rnd(0.45,1.75) }
    const norm=Math.PI*2/acc; for(let i=0;i<N;i++) ang[i]*=norm
    // jittered ring radii — a TIGHT central shatter cluster only (rest stays dark)
    const rings=[10*K]; while(rings[rings.length-1] < 0.34*R){ rings.push(rings[rings.length-1]*rnd(1.4,1.9)) }
    const jit:number[][]=rings.map(()=>ang.map(()=>rnd(-0.14,0.14)))
    const jr:number[][]=rings.map((r)=> ang.map(()=> r*rnd(0.82,1.18)))
    const pt=(ri:number,i:number)=>{ const a=ang[i]+jit[ri][i], r=jr[ri][i]; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r] as [number,number] }
    // filled irregular shards in the central cluster
    for(let k=0;k<rings.length-1;k++){ for(let i=0;i<N;i++){
      const j=(i+1)%N; const A=pt(k,i),B=pt(k,j),C=pt(k+1,j),D=pt(k+1,i)
      x.beginPath(); x.moveTo(A[0],A[1]); x.lineTo(B[0],B[1]); x.lineTo(C[0],C[1]); x.lineTo(D[0],D[1]); x.closePath()
      const lit=rnd()>0.66
      x.fillStyle= lit ? `rgba(205,224,245,${rnd(0.06,0.16)})` : `rgba(110,140,175,${rnd(0.01,0.05)})`; x.fill()
      x.lineWidth=rnd(0.5,1.8)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.4,0.9)})`; glow(0.65); x.stroke(); noGlow()
    }}
    // long radial cracks bursting outward past the cluster — irregular length, varied width, branches
    for(let i=0;i<N;i++){ if(rnd()<0.12) continue        // a few spokes don't propagate far -> irregular
      const a=ang[i]+rnd(-0.05,0.05); let px=cx,py=cy; x.beginPath(); x.moveTo(cx,cy)
      const seg=Math.round(rnd(5,9)), rmax=rnd(0.5,1.05)*R
      for(let g=1;g<=seg;g++){ const rr2=rmax*g/seg; px=cx+Math.cos(a)*rr2+rnd(-22,22)*K; py=cy+Math.sin(a)*rr2+rnd(-22,22)*K; x.lineTo(px,py) }
      x.lineWidth=rnd(0.6,2.6)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.4,0.9)})`; glow(0.5); x.stroke(); noGlow()
      // 0-2 branches
      for(let bn=0;bn<2;bn++){ if(rnd()>0.5) continue; const bt=rnd(0.35,0.85), bx=cx+(px-cx)*bt, by=cy+(py-cy)*bt, ba=a+rnd(-1.0,1.0), bl=rnd(50,190)*K
        x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+Math.cos(ba)*bl,by+Math.sin(ba)*bl); x.lineWidth=rnd(0.4,1.1)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.35,0.7)})`; x.stroke() } }
    // a few jagged cross-links in the mid zone (connect adjacent cracks) for realism
    for(let i=0;i<N;i++){ if(rnd()>0.4) continue; const j=(i+1)%N, r=rnd(0.34,0.6)*R
      const ax=cx+Math.cos(ang[i])*r, ay=cy+Math.sin(ang[i])*r, bx=cx+Math.cos(ang[j])*r*rnd(0.85,1.15), by=cy+Math.sin(ang[j])*r*rnd(0.85,1.15)
      const mxp=(ax+bx)/2+rnd(-30,30)*K, myp=(ay+by)/2+rnd(-30,30)*K
      x.beginPath(); x.moveTo(ax,ay); x.lineTo(mxp,myp); x.lineTo(bx,by); x.lineWidth=rnd(0.4,1.2)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.3,0.6)})`; x.stroke() }
    // glass dust — dense near impact, sparse outward
    for(let i=0;i<340;i++){ const a=rnd(0,Math.PI*2), r=Math.pow(rnd(),1.7)*0.5*R+8; const gx=cx+Math.cos(a)*r, gy=cy+Math.sin(a)*r
      x.fillStyle=`rgba(255,255,255,${rnd(0.12,0.85)})`; const sz=rnd(0.4,2.4)*K; x.fillRect(gx,gy,sz,sz) }
    // hot impact core
    const cg=x.createRadialGradient(cx,cy,0,cx,cy,58*K); cg.addColorStop(0,'rgba(255,255,255,0.95)'); cg.addColorStop(0.35,'rgba(220,235,255,0.28)'); cg.addColorStop(1,'rgba(255,255,255,0)')
    x.fillStyle=cg; x.beginPath(); x.arc(cx,cy,58*K,0,7); x.fill()
    cv.style.width='100%'; cv.style.height='100%'
  }

  /* ---- intro ---- */
  function runIntro(){
    const bm=$('#bmload')!, crack=$('#crack')!, stage=$('#stage')!, mr=$('#mrtitle')!, tap=$('#tapBtn') as HTMLButtonElement, mask=$('#fsmask')!, intro=$('#intro')!
    startAudio()
    setTimeout(()=>{ muteBtn.classList.add('show') }, 400)
    setTimeout(breakScreen, RM?200:2400)
    function breakScreen(){ genShatter(crack); bm.classList.add('hide'); crack.classList.add('show'); intro.classList.add('breaking')
      startAudio(); fade(1.0,60); setTimeout(()=>fade(0.5,1400),260)  // punch on break
      const fl=$('#flash')!; fl.style.transition='none'; fl.style.opacity='0.97'; setTimeout(()=>{ fl.style.transition='opacity .5s'; fl.style.opacity='0' },70)
      setTimeout(()=>{ intro.classList.remove('breaking'); reveal() }, RM?0:600) }
    function reveal(){ stage.classList.add('show'); mask.classList.add('in')
      const full='HELLO, FRIEND'; let i=0
      setTimeout(()=>{ mr.classList.add('gl'); (function typ(){ if(i<=full.length){ mr.textContent=full.slice(0,i); i++; setTimeout(typ,RM?0:62) } else tap.classList.add('show') })() }, RM?0:440) }
    function go(){ if(intro.classList.contains('gone')) return; intro.classList.add('gone'); $('#hud')!.classList.add('show'); $('#cue')!.classList.add('show'); startAudio() }
    tap.onclick=go
    addEventListener('keydown', e=>{ if(e.key==='Enter'&&stage.classList.contains('show')) go() })
  }

  /* ---- loop ---- */
  let last=performance.now()
  function loop(){
    if(!running) return; raf=requestAnimationFrame(loop)
    const now=performance.now(); const dt=Math.min(now-last,50); last=now
    prog += (target-prog)*0.06
    const t=now*0.001
    const nm:'hole'|'arch' = prog<DIVE-0.005 ? 'hole':'arch'
    if(nm!==mode){ mode=nm; if(nm==='arch'){ work.classList.add('show'); if(!(window as any).__ag){(window as any).__ag=1;toast('Scroll to move through the library · click a card to open it · menu for About / Contact')} } else { work.classList.remove('show') }
      $('#flash')!.style.transition='none'; $('#flash')!.style.opacity='0.7'; flashT=now }
    if(flashT){ const e=(now-flashT)/650; if(e>=1){flashT=0;$('#flash')!.style.opacity='0'} else {$('#flash')!.style.transition='opacity .1s';$('#flash')!.style.opacity=String(0.7*(1-e))} }
    $('#namecard')!.style.opacity=String(clamp(1-prog/0.12,0,1))
    $('#rail')!.classList.toggle('show', mode==='arch')

    if(mode==='hole'){
      cmx+=(mx-cmx)*0.04; cmy+=(my-cmy)*0.04
      const dive=clamp(prog/DIVE,0,1)
      const dist=mix(15,6.6,dive), hgt=mix(3.1,1.5,dive)+cmy*1.4, orbit=t*0.05+cmx*0.45
      holeCam.position.set(Math.sin(orbit)*dist, hgt, Math.cos(orbit)*dist); holeCam.lookAt(0,0,0)
      diskTex.rotation += dt*0.00042; halo.quaternion.copy(holeCam.quaternion); stars.rotation.y += dt*0.00002
      renderer.render(holeScene,holeCam)
    } else {
      const at=clamp((prog-DIVE)/(1-DIVE),0,1)
      const cz=mix(ARCH_Z0,ARCH_Z1,at); cmx+=(mx-cmx)*0.045; cmy+=(my-cmy)*0.045
      archCam.position.set(cmx*1.6,0.7+cmy*0.8,cz); archCam.lookAt(cmx*0.6,0.3,cz-20)
      lattice.rotation.z = t*(isMobile?0.02:0.045)
      const near=clamp(Math.round(at*(PROJECTS.length-1)),0,PROJECTS.length-1); showCard(near)
      const dots=$('#rail')!.children; for(let i=0;i<dots.length;i++) dots[i].classList.toggle('on', i===near)
      renderer.render(archScene,archCam)
    }
  }

  runIntro(); loop()

  return () => {
    cancelAnimationFrame(raf); running=false
    removeEventListener('resize',onResize); document.removeEventListener('visibilitychange',onVis)
    removeEventListener('wheel',onWheel as any); removeEventListener('mousemove',onMove); removeEventListener('keydown',onKey)
    try{ renderer.dispose() }catch{}
  }
}
