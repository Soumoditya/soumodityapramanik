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

export default function Page() {
  useEffect(() => {
    let cleanup = () => {}
    ;(async () => {
      const THREE = await import('three')
      cleanup = boot(THREE)
    })().catch(() => { document.getElementById('fallback')?.classList.add('show'); document.getElementById('intro')?.classList.add('gone') })
    return () => cleanup()
  }, [])

  const P = PROJECTS
  return (
    <>
      <canvas id="gl" />
      <div className="vig" />
      <div id="flash" />

      {/* INTRO */}
      <div id="intro">
        <div className="scan" />
        <div className="bmload" id="bmload">
          <div className="bmtxt">Loading</div>
          <div className="spinner"><i /><i /></div>
          <div className="bmsub">from black mirror</div>
        </div>
        <div className="crack" id="crack" />
        <div className="stage" id="stage">
          <Mask />
          <div className="fslabel">fsociety</div>
          <div className="mrtitle" id="mrtitle" />
          <button className="tap" id="tapBtn">Tap to continue</button>
        </div>
      </div>

      {/* HUD */}
      <div id="namecard"><h1>Soumoditya Pramanik</h1><p>Developer &amp; Maker — India</p></div>
      <div id="hud">
        <button className="brand" data-jump="0">Soumoditya<b>.</b></button>
        <div className="menu">
          <button data-jump="0">Intro</button>
          <button data-jump="0.5">Work</button>
          <button data-panel="about">About</button>
          <button data-panel="education">Education</button>
          <button data-panel="contact">Contact</button>
        </div>
      </div>
      <div id="cue"><span className="m" /><br/>Scroll to fall in</div>
      <div id="rail" />

      {/* TERMINAL OVERLAY */}
      <div className="overlay" id="overlay">
        <div className="term">
          <div className="term-bar"><span className="d d1"/><span className="d d2"/><span className="d d3"/><span className="t" id="termTitle">soumoditya@fsociety: ~</span><button className="x" id="termX" aria-label="Close">✕</button></div>
          <div className="term-body" id="termBody" />
        </div>
      </div>
      <div className="toast" id="toast" />

      {/* FALLBACK + SEO (crawlable) */}
      <div id="fallback">
        <h1>Soumoditya <em>Pramanik</em></h1>
        <p className="role">I&apos;m a developer from India. I build web and mobile apps — carefully, end to end.</p>
        <div className="plist">
          {P.map(p => (
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

function Mask() {
  // fsociety mask (vector recreation of the real logo). Swap for the exact PNG anytime.
  return (
    <svg className="fsmask" id="fsmask" viewBox="0 0 240 300" aria-label="fsociety mask">
      <rect x="24" y="10" width="192" height="240" fill="none" stroke="#EDE9DE" strokeWidth="7"/>
      {/* head */}
      <path fill="#EDE9DE" d="M120 30c46 0 74 26 74 78 0 30-8 56-22 80-11 19-30 40-52 46-22-6-41-27-52-46-14-24-22-50-22-80 0-52 28-78 74-78Z"/>
      {/* eyebrows — thick, angled up to center, feathered ends */}
      <path fill="#0a0b0d" d="M58 108c8-13 26-20 44-16 6 1 9 6 6 10-4 5-12 4-19 4-11 1-22 4-31 10-4 3-3-4 0-8Zm-2 2c-5 2-10 5-14 9 6-1 11-3 14-9Z"/>
      <path fill="#0a0b0d" d="M182 108c-8-13-26-20-44-16-6 1-9 6-6 10 4 5 12 4 19 4 11 1 22 4 31 10 4 3 3-4 0-8Zm2 2c5 2 10 5 14 9-6-1-11-3-14-9Z"/>
      {/* eyes — hooded smiling crescents */}
      <path fill="#0a0b0d" d="M66 130c8-11 30-11 40-1-3 9-13 15-22 14-8-1-15-6-18-13Z"/>
      <path fill="#0a0b0d" d="M134 130c10-10 32-10 40 1-3 7-10 12-18 13-9 1-19-5-22-14Z"/>
      {/* nose */}
      <path fill="#0a0b0d" d="M120 128c-3 20-9 32-2 42 3 4 1 4-4 4h-6c-5 0-6-3-3-7 4-5 3-14 9-40 1-4 6-4 6 1Z" opacity=".85"/>
      {/* handlebar mustache — big, curling up */}
      <path fill="#0a0b0d" d="M120 184c-14-16-40-22-62-16-16 4-24 18-14 27 8 7 22 5 34-1 8-4 15-9 26-9h20c11 0 18 5 26 9 12 6 26 8 34 1 10-9 2-23-14-27-22-6-48 0-62 16Z"/>
      {/* goatee */}
      <path fill="#0a0b0d" d="M104 214c6-8 26-8 32 0-3 16-29 16-32 0Z"/>
      {/* smiling mouth */}
      <path fill="#0a0b0d" d="M92 210c8 12 48 12 56 0-6 16-50 16-56 0Z"/>
    </svg>
  )
}

/* ===================== WebGL experience ===================== */
function boot(THREE: typeof import('three')): () => void {
  const $ = (s: string) => document.querySelector(s) as HTMLElement | null
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = matchMedia('(max-width:760px)').matches
  const canvas = document.getElementById('gl') as HTMLCanvasElement
  let renderer: any
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false, powerPreference: 'high-performance' }) } catch { throw new Error('no webgl') }
  if (!renderer.getContext()) throw new Error('no ctx')

  const DPR = Math.min(window.devicePixelRatio || 1, 2)
  const HOLE_DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 0.8 : 1.5)
  renderer.setPixelRatio(HOLE_DPR); renderer.setSize(innerWidth, innerHeight); renderer.setClearColor(0x000000, 1)

  const tex = (draw: (c: CanvasRenderingContext2D, cv: HTMLCanvasElement)=>void, w: number, h?: number) => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h || w; draw(cv.getContext('2d')!, cv)
    const t = new THREE.CanvasTexture(cv); t.needsUpdate = true; return t
  }
  const glowTex = (col: string) => tex((x, c) => { const g = x.createRadialGradient(c.width/2,c.width/2,0,c.width/2,c.width/2,c.width/2); g.addColorStop(0,col); g.addColorStop(.3,col); g.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.width) }, 128)
  const rr = (x:CanvasRenderingContext2D,a:number,b:number,w:number,h:number,r:number)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  const wrapText = (x:CanvasRenderingContext2D,t:string,ax:number,ay:number,max:number,lh:number)=>{const w=t.split(' ');let l='',y=ay;for(const wd of w){if(x.measureText(l+wd).width>max){x.fillText(l,ax,y);l=wd+' ';y+=lh}else l+=wd+' '}x.fillText(l,ax,y)}

  // ---- Gargantua raymarch ----
  const STEPS = isMobile ? 34 : 96
  const HOLE_FS = `precision highp float;uniform vec2 u_res;uniform float u_time;uniform float u_dive;uniform vec2 u_mouse;
  float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
  float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*noise(p);p*=2.02;a*=.5;}return s;}
  mat3 cam(vec3 ro,vec3 ta){vec3 f=normalize(ta-ro),r=normalize(cross(vec3(0,1,0),f)),u=cross(f,r);return mat3(r,u,f);}
  void main(){
   vec2 uv=(gl_FragCoord.xy-.5*u_res.xy)/u_res.y;
   float dive=u_dive; float dist=mix(19.0,8.5,dive);
   vec3 ro=vec3(sin(u_mouse.x*0.6)*dist, mix(2.6,1.1,dive)+u_mouse.y*2.0, cos(u_mouse.x*0.6)*dist);
   mat3 cm=cam(ro,vec3(0.0)); vec3 rd=normalize(cm*vec3(uv,mix(1.5,1.05,dive)));
   vec3 pos=ro,dir=rd; float rs=1.0,dt=0.34; vec3 col=vec3(0.0); float hit=0.0,glow=0.0;
   for(int i=0;i<${STEPS};i++){
     float r=length(pos); glow+=0.0026/(0.02+abs(r-2.6));
     if(r<rs){hit=1.0;break;}
     vec3 g=-normalize(pos)*(1.35*rs)/(r*r); vec3 ndir=normalize(dir+g*dt); vec3 np=pos+ndir*dt*(r*0.5+0.6);
     if(pos.y*np.y<0.0){float t=pos.y/(pos.y-np.y);vec3 hp=mix(pos,np,t);float hr=length(hp.xz);
       if(hr>2.2&&hr<8.5){float ang=atan(hp.z,hp.x);float spin=u_time*0.9;
         float sw=fbm(vec2(hr*0.9-spin,ang*2.5+hr*0.4));float band=smoothstep(8.5,2.2,hr);
         vec3 hot=mix(vec3(1.0,0.45,0.12),vec3(1.0,0.93,0.74),band);
         vec3 orb=normalize(vec3(-hp.z,0.0,hp.x));float dop=0.55+0.95*clamp(dot(orb,-dir),-1.0,1.0);
         col+=hot*band*(0.35+sw*1.15)*dop*1.4;}}
     dir=ndir;pos=np;}
   vec3 sd=normalize(dir);float st=pow(hash(floor(sd.xy*260.0+sd.z*40.0)),42.0);
   col+=vec3(st)*0.9*(1.0-hit); col+=vec3(1.0,0.86,0.66)*glow*0.5; col*=(1.0-hit);
   col=pow(col,vec3(0.86)); gl_FragColor=vec4(col,1.0);}`
  const holeScene = new THREE.Scene(); const holeCam = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
  const holeMat = new THREE.ShaderMaterial({ uniforms:{ u_res:{value:new THREE.Vector2(renderer.domElement.width,renderer.domElement.height)}, u_time:{value:0}, u_dive:{value:0}, u_mouse:{value:new THREE.Vector2(0,0)} }, vertexShader:'void main(){gl_Position=vec4(position,1.0);}', fragmentShader:HOLE_FS })
  holeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), holeMat))

  // ---- Library (Interstellar tesseract) ----
  const archScene = new THREE.Scene(); archScene.fog = new THREE.FogExp2(0x0b0805, 0.014)
  const archCam = new THREE.PerspectiveCamera(isMobile?70:60, innerWidth/innerHeight, 0.1, 600)
  // bookshelf texture: wood + colorful spines
  const shelfTex = tex((x,c)=>{
    x.fillStyle='#0c0805'; x.fillRect(0,0,c.width,c.height)
    const rows=6, rh=c.height/rows
    const cols=['#5a2b22','#63502b','#2c4238','#22333f','#4d2e42','#6b5636','#412a1e','#2a3550','#583b22','#3d4a22']
    for(let r=0;r<rows;r++){
      const y0=r*rh
      x.fillStyle='#060402'; x.fillRect(0,y0,c.width,4)
      x.fillStyle='#241a12'; x.fillRect(0,y0+rh-8,c.width,8) // shelf board
      let bx=6
      while(bx<c.width-6){ const bw=6+Math.floor((Math.sin(bx*12.9+r*7.7)*0.5+0.5)*10); const bh=rh-16-Math.floor((Math.sin(bx*3.1+r)*0.5+0.5)*8)
        const col=cols[(bx+r*3)%cols.length]; x.fillStyle=col; x.fillRect(bx,y0+rh-8-bh,bw,bh)
        x.fillStyle='rgba(255,255,255,0.05)'; x.fillRect(bx,y0+rh-8-bh,1,bh)
        x.fillStyle='rgba(0,0,0,0.35)'; x.fillRect(bx+bw-1,y0+rh-8-bh,1,bh)
        bx+=bw+1 }
    }
  }, 512, 384)
  shelfTex.wrapS = shelfTex.wrapT = THREE.RepeatWrapping
  const corridor = new THREE.Group(); archScene.add(corridor)
  const LEN = 300, HALF = 12
  const wallGeo = new THREE.PlaneGeometry(LEN, HALF*2)
  const wallCol = new THREE.Color(0x8a7f70)
  const mkMat = () => new THREE.MeshBasicMaterial({ map:shelfClone(), color:wallCol, side:THREE.DoubleSide })
  // left, right walls (vertical bookshelves) + floor + ceiling
  const wl = new THREE.Mesh(wallGeo, mkMat()); wl.rotation.y=Math.PI/2; wl.position.set(-HALF,0,-LEN/2+10)
  const wr = new THREE.Mesh(wallGeo, mkMat()); wr.rotation.y=-Math.PI/2; wr.position.set(HALF,0,-LEN/2+10)
  const wc = new THREE.Mesh(wallGeo, mkMat()); wc.rotation.x=Math.PI/2; wc.position.set(0,HALF,-LEN/2+10)
  const wf = new THREE.Mesh(wallGeo, mkMat()); wf.rotation.x=-Math.PI/2; wf.position.set(0,-HALF,-LEN/2+10)
  ;[wl,wr,wc,wf].forEach(w=>{ (w.material as any).map.repeat.set(LEN/18,1.5); corridor.add(w) })
  function shelfClone(){ const t=shelfTex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping; return t }
  // vanishing glow
  const vp = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex('rgba(255,196,130,0.32)'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending })); vp.position.set(0,0,-LEN+8); vp.scale.set(16,16,1); archScene.add(vp)

  // project "volumes"
  const projMeshes: any[] = []
  const labelTex = (p: Project) => tex((x,c)=>{ x.fillStyle='rgba(8,7,6,0.94)'; rr(x,0,0,c.width,c.height,26); x.fill()
    const grd=x.createLinearGradient(0,0,c.width,c.height); grd.addColorStop(0,p.accent+'2b'); grd.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=grd; rr(x,0,0,c.width,c.height,26); x.fill()
    x.strokeStyle=p.accent; x.lineWidth=6; rr(x,7,7,c.width-14,c.height-14,22); x.stroke()
    x.fillStyle=p.accent; x.font='600 30px Geist Mono, monospace'; x.fillText(p.cat.toUpperCase(),42,72)
    x.fillStyle='#F0ECE2'; x.font='italic 78px Instrument Serif, Georgia, serif'; x.fillText(p.n,40,172)
    x.fillStyle='#b8b1a6'; x.font='27px Geist, sans-serif'; wrapText(x,p.desc,42,224,c.width-84,36)
    x.fillStyle=p.accent; x.font='600 25px Geist Mono, monospace'; x.fillText((p.url?p.cta:'Coming soon').toUpperCase()+'  →',42,c.height-46)
  }, 680, 446)
  PROJECTS.forEach((p,i) => {
    const pw = isMobile?6.4:8.6, ph=pw*0.656
    const m = new THREE.Mesh(new THREE.PlaneGeometry(pw,ph), new THREE.MeshBasicMaterial({ map:labelTex(p), transparent:true, side:THREE.DoubleSide, fog:false }))
    m.position.set(0, 0.4, -14 - i*13); ;(m as any).userData.pi=i; archScene.add(m); projMeshes.push(m)
    const gs = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex(p.accent+'cc'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending })); gs.position.set(0,0.4,-14-i*13-0.4); gs.scale.set(pw*2.1,ph*2.1,1); archScene.add(gs)
  })
  const ARCH_END = -14 - (PROJECTS.length-1)*13 - 14

  // ---- state / journey ----
  let prog=0, target=0, mode:'hole'|'arch'='hole', running=true, raf=0, flashT=0
  const DIVE=0.42
  let mx=0,my=0,cmx=0,cmy=0
  const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v))

  // rail dots
  const rail=$('#rail')!; PROJECTS.forEach((p,i)=>{ const b=document.createElement('button'); b.title=p.n; b.onclick=()=>{ target=DIVE+(1-DIVE)*(((-14-i*13)+16-8)/(ARCH_END-8)); target=clamp(target,DIVE,1) }; rail.appendChild(b) })

  function setRenderMode(m:'hole'|'arch'){ mode=m; renderer.setPixelRatio(m==='hole'?HOLE_DPR:DPR); renderer.setSize(innerWidth,innerHeight); holeMat.uniforms.u_res.value.set(renderer.domElement.width,renderer.domElement.height) }

  function onResize(){ renderer.setSize(innerWidth,innerHeight); holeMat.uniforms.u_res.value.set(renderer.domElement.width,renderer.domElement.height); archCam.aspect=innerWidth/innerHeight; archCam.updateProjectionMatrix() }
  addEventListener('resize', onResize, { passive:true })
  const onVis=()=>{ running=!document.hidden; if(running) loop() }; document.addEventListener('visibilitychange', onVis)

  // input
  const onWheel=(e:WheelEvent)=>{ target=clamp(target+e.deltaY*0.00045,0,1); $('#cue')?.classList.remove('show') }
  addEventListener('wheel', onWheel, { passive:true })
  let ty=0
  const onTS=(e:TouchEvent)=>{ ty=e.touches[0].clientY }
  const onTM=(e:TouchEvent)=>{ const y=e.touches[0].clientY; target=clamp(target+(ty-y)*0.0016,0,1); ty=y; $('#cue')?.classList.remove('show') }
  canvas.addEventListener('touchstart', onTS, { passive:true }); canvas.addEventListener('touchmove', onTM, { passive:true })
  const onMove=(e:MouseEvent)=>{ mx=(e.clientX/innerWidth-0.5)*2; my=(e.clientY/innerHeight-0.5)*2 }
  addEventListener('mousemove', onMove)
  const onKey=(e:KeyboardEvent)=>{ if(e.key==='ArrowDown'||e.key==='PageDown') target=clamp(target+0.06,0,1); if(e.key==='ArrowUp'||e.key==='PageUp') target=clamp(target-0.06,0,1); if(e.key==='Escape') closePanel() }
  addEventListener('keydown', onKey)
  // click project
  const ray=new THREE.Raycaster(), m2=new THREE.Vector2(); let dx=0,dy=0
  const onPD=(e:PointerEvent)=>{ dx=e.clientX; dy=e.clientY }
  const onPU=(e:PointerEvent)=>{ if(Math.abs(e.clientX-dx)>6||Math.abs(e.clientY-dy)>6) return; if(mode!=='arch') return
    m2.x=(e.clientX/innerWidth)*2-1; m2.y=-(e.clientY/innerHeight)*2+1; ray.setFromCamera(m2,archCam); const h=ray.intersectObjects(projMeshes)[0]; if(h) openProject((h.object as any).userData.pi) }
  canvas.addEventListener('pointerdown', onPD); canvas.addEventListener('pointerup', onPU)

  // menu / brand
  document.querySelectorAll('.menu [data-jump], .brand').forEach(b=> (b as HTMLElement).onclick=()=>{ target=parseFloat((b as HTMLElement).dataset.jump||'0') })
  document.querySelectorAll('.menu [data-panel]').forEach(b=> (b as HTMLElement).onclick=()=> openPanel((b as HTMLElement).dataset.panel!))

  // ---- terminal panels ----
  const overlay=$('#overlay')!, termBody=$('#termBody')!, termTitle=$('#termTitle')!
  $('#termX')!.onclick=closePanel
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closePanel() })
  function closePanel(){ overlay.classList.remove('open') }
  function typeInto(html:string){ termBody.innerHTML=html }
  function openPanel(kind:string){
    overlay.classList.add('open')
    if(kind==='about'){ termTitle.textContent='soumoditya@fsociety: ~/about'
      typeInto(`<div class="row"><span class="p">$</span> <span class="c">whoami</span></div>
      <h3>Hello, friend.</h3>
      <div class="row r">I&apos;m <b>Soumoditya Pramanik</b>, a developer from <b>India</b>. I mostly work with React, Next.js and TypeScript, and I build for both the web and Android.</div>
      <div class="row r">I learn by building. Some projects started as tools I wanted for myself; others try to be useful to more people. Either way I care about the details — how it feels, how it performs, and whether it genuinely helps.</div><hr>
      <div class="row"><span class="k">based_in</span>   = "India"</div>
      <div class="row"><span class="k">works_with</span> = ["React","Next.js","TypeScript"]</div>
      <div class="row"><span class="k">also</span>       = "Android apps"</div>
      <div class="row"><span class="k">status</span>     = "open to good work"</div>`)
    } else if(kind==='education'){ termTitle.textContent='soumoditya@fsociety: ~/education'
      typeInto(`<div class="row"><span class="p">$</span> <span class="c">cat education.log</span></div><h3>Where I studied.</h3>`+
        EDU.map(e=>`<div class="row"><span class="k">[${e.yr}]</span> <b>${e.inst}</b></div><div class="row r">&nbsp;&nbsp;${e.deg} · ${e.place}</div>`).join('<hr>'))
    } else { termTitle.textContent='soumoditya@fsociety: ~/contact'
      typeInto(`<div class="row"><span class="p">$</span> <span class="c">./contact.sh</span></div><h3>Let&apos;s build something.</h3>
      <div class="row r">Got an idea, a role, or just want to talk shop? My inbox is open.</div>
      <div class="row"><span class="k">email</span> = <a href="mailto:${EMAIL}">${EMAIL}</a></div><hr>`+
      SOCIALS.map(s=>`<div class="row"><span class="k">${s[0].toLowerCase().replace(/ /g,'_')}</span> = <a href="${s[1]}" target="_blank" rel="noopener">${s[1].replace('https://','')}</a></div>`).join(''))
    }
  }
  function openProject(i:number){ const p=PROJECTS[i]; overlay.classList.add('open'); termTitle.textContent='soumoditya@fsociety: ~/projects/'+p.n.toLowerCase().replace(/ /g,'-')
    const cta = p.url ? `<a class="projcta" href="${p.url}" target="_blank" rel="noopener">${p.cta} ↗</a>` : `<span class="projcta" style="color:#8a857c;border:none">${p.cta}</span>`
    typeInto(`<div class="row"><span class="p">$</span> <span class="c">open</span> <span class="k">${p.n}</span></div><h3 style="color:${p.accent}">${p.n}</h3>
      <div class="row"><span class="k">category</span> = "${p.cat}"</div>
      <div class="row r" style="margin:10px 0">${p.desc}</div>
      <div class="row"><span class="k">stack</span> = [${p.tags.map(t=>`"${t}"`).join(', ')}]</div><hr>${cta}`)
  }

  let toastT:any; function toast(msg:string){ const el=$('#toast')!; el.textContent=msg; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2600) }

  // ---- loop ----
  const tmp=new THREE.Vector3()
  function loop(){
    if(!running) return; raf=requestAnimationFrame(loop)
    prog += (target-prog)*0.06
    const t=performance.now()*0.001
    const nm:'hole'|'arch' = prog<DIVE-0.005 ? 'hole':'arch'
    if(nm!==mode){ setRenderMode(nm); if(nm==='arch'&&!(window as any).__ag){(window as any).__ag=1;toast('Scroll to move · tap a book to open · menu for About / Contact')} $('#flash')!.style.transition='none'; $('#flash')!.style.opacity='0.9'; flashT=performance.now() }
    if(flashT){ const e=(performance.now()-flashT)/650; if(e>=1){flashT=0;$('#flash')!.style.opacity='0'} else {$('#flash')!.style.transition='opacity .1s';$('#flash')!.style.opacity=String(0.9*(1-e))} }
    const nc=$('#namecard')!; nc.style.opacity=String(clamp(1-prog/0.14,0,1))
    $('#rail')!.classList.toggle('show', mode==='arch')
    if(mode==='hole'){
      cmx+=(mx-cmx)*0.05; cmy+=(my-cmy)*0.05
      holeMat.uniforms.u_time.value=t; holeMat.uniforms.u_dive.value=clamp(prog/DIVE,0,1); holeMat.uniforms.u_mouse.value.set(cmx+t*0.03,cmy)
      renderer.render(holeScene,holeCam)
    } else {
      const N=projMeshes.length, at=clamp((prog-DIVE)/(1-DIVE),0,1)
      let near=0
      if(isMobile){ const k=Math.round(at*(N-1)); near=k; const cz=projMeshes[k].position.z; archCam.position.set(0,0.5,cz+10); archCam.lookAt(0,0.4,cz) }
      else { const cz=8+(ARCH_END-8)*at; cmx+=(mx-cmx)*0.05; archCam.position.set(cmx*1.6,0.9,cz); archCam.lookAt(0,0.4,cz-18); let nd=1e9; for(let i=0;i<N;i++){const d=Math.abs(projMeshes[i].position.z-(cz-16));if(d<nd){nd=d;near=i}} }
      corridor.rotation.z = t*(isMobile?0.04:0.09)   // tesseract rotation
      // face project cards to camera
      for(const pm of projMeshes){ tmp.copy(archCam.position); pm.lookAt(tmp.x,pm.position.y,tmp.z) }
      const dots=$('#rail')!.children; for(let i=0;i<dots.length;i++) dots[i].classList.toggle('on', i===near)
      renderer.render(archScene,archCam)
    }
  }

  // ---- realistic glass shatter (procedural) ----
  function genShatter(el: HTMLElement){
    const W=1440,H=900,cx=720,cy=430, rnd=(a:number,b:number)=>a+Math.random()*(b-a)
    const jag=(x1:number,y1:number,x2:number,y2:number,seg:number,dev:number)=>{ let d=`M${x1.toFixed(0)} ${y1.toFixed(0)}`; for(let s=1;s<=seg;s++){ const t=s/seg; const px=x1+(x2-x1)*t+(s<seg?rnd(-dev,dev):0); const py=y1+(y2-y1)*t+(s<seg?rnd(-dev,dev):0); d+=` L${px.toFixed(0)} ${py.toFixed(0)}` } return d }
    let paths=''
    const N=22, ends:[number,number][]=[]
    for(let i=0;i<N;i++){ const a=(i/N)*Math.PI*2+rnd(-0.12,0.12); const r=rnd(360,760); const ex=cx+Math.cos(a)*r, ey=cy+Math.sin(a)*r*0.62; ends.push([ex,ey])
      paths+=`<path stroke-width="${rnd(0.8,2.2).toFixed(2)}" d="${jag(cx,cy,ex,ey,Math.round(rnd(4,7)),rnd(6,20))}"/>`
      // branches
      const bN=Math.round(rnd(1,3)); for(let bl=0;bl<bN;bl++){ const bt=rnd(0.35,0.85); const bx=cx+(ex-cx)*bt, by=cy+(ey-cy)*bt; const ba=a+rnd(-0.9,0.9); const brl=rnd(60,180); paths+=`<path stroke-width="${rnd(0.5,1.2).toFixed(2)}" d="${jag(bx,by,bx+Math.cos(ba)*brl,by+Math.sin(ba)*brl*0.7,Math.round(rnd(3,5)),rnd(4,12))}"/>` } }
    // concentric fracture rings connecting radials
    for(let ring=0;ring<4;ring++){ const rr2=rnd(40,90)+ring*rnd(60,110); let d=''; for(let i=0;i<=N;i++){ const a=(i/N)*Math.PI*2; const rj=rr2*rnd(0.82,1.18); const x=cx+Math.cos(a)*rj, y=cy+Math.sin(a)*rj*0.62; d+=(i===0?'M':'L')+x.toFixed(0)+' '+y.toFixed(0)+' ' } paths+=`<path stroke-width="${rnd(0.5,1.1).toFixed(2)}" d="${d}Z"/>` }
    // fine hairlines
    for(let i=0;i<40;i++){ const a=rnd(0,Math.PI*2), r0=rnd(20,600); const x0=cx+Math.cos(a)*r0, y0=cy+Math.sin(a)*r0*0.62; const l=rnd(15,60); const a2=a+rnd(-0.6,0.6); paths+=`<path opacity="0.5" stroke-width="0.5" d="M${x0.toFixed(0)} ${y0.toFixed(0)} L${(x0+Math.cos(a2)*l).toFixed(0)} ${(y0+Math.sin(a2)*l).toFixed(0)}"/>` }
    el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${paths}<circle cx="${cx}" cy="${cy}" r="14"/><circle cx="${cx}" cy="${cy}" r="26" opacity="0.6"/></svg>`
  }

  // ---- intro sequence ----
  function runIntro(){
    const bm=$('#bmload')!, crack=$('#crack')!, stage=$('#stage')!, mr=$('#mrtitle')!, tap=$('#tapBtn') as HTMLButtonElement, mask=$('#fsmask')!, intro=$('#intro')!
    genShatter(crack)
    setTimeout(breakScreen, RM?200:2400)
    function breakScreen(){
      bm.classList.add('hide'); crack.classList.add('show'); intro.classList.add('breaking')
      const fl=$('#flash')!; fl.style.transition='none'; fl.style.opacity='0.95'
      setTimeout(()=>{ fl.style.transition='opacity .5s'; fl.style.opacity='0' },70)
      setTimeout(()=>{ intro.classList.remove('breaking'); reveal() }, RM?0:560)
    }
    function reveal(){
      stage.classList.add('show'); stage.style.opacity='1'; mask.classList.add('in')
      const full='HELLO, FRIEND'; let i=0
      setTimeout(()=>{ mr.classList.add('gl'); (function ty(){ if(i<=full.length){ mr.textContent=full.slice(0,i); i++; setTimeout(ty,RM?0:60) } else tap.classList.add('show') })() }, RM?0:420)
    }
    let s2=false
    function go(){ if(!s2){ s2=true; mr.textContent='WELCOME TO FSOCIETY.'; tap.textContent='Enter ↵'; return } intro.classList.add('gone'); $('#hud')!.classList.add('show'); $('#cue')!.classList.add('show') }
    tap.onclick=go
    addEventListener('keydown', e=>{ if(e.key==='Enter'&&!intro.classList.contains('gone')) go() })
  }
  runIntro()
  loop()

  // ---- cleanup ----
  return () => {
    cancelAnimationFrame(raf); running=false
    removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis)
    removeEventListener('wheel', onWheel as any); removeEventListener('mousemove', onMove); removeEventListener('keydown', onKey)
    try { renderer.dispose() } catch {}
  }
}
