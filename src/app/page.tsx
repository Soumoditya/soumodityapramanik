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
    ;(async () => { const THREE = await import('three'); cleanup = boot(THREE) })()
      .catch(() => { document.getElementById('fallback')?.classList.add('show'); document.getElementById('intro')?.classList.add('gone') })
    return () => cleanup()
  }, [])
  return (
    <>
      <canvas id="gl" />
      <div className="vig" />
      <div id="flash" />

      <div id="intro">
        <div className="scan" />
        <div className="bmload" id="bmload"><div className="ring" /></div>
        <div className="crack" id="crack" />
        <div className="stage" id="stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="fsmask" id="fsmask" src="/fsociety.png" alt="fsociety mask" />
          <div className="fslabel">fsociety</div>
          <div className="mrtitle" id="mrtitle" />
          <button className="tap" id="tapBtn">[ Enter ]</button>
        </div>
      </div>

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

  const capDPR = Math.min(window.devicePixelRatio || 1, 2)
  let holeDPR = capDPR                 // adaptive
  const archDPR = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(holeDPR); renderer.setSize(innerWidth, innerHeight); renderer.setClearColor(0x000000, 1)

  const tex = (draw: (c: CanvasRenderingContext2D, cv: HTMLCanvasElement)=>void, w: number, h?: number) => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h || w; draw(cv.getContext('2d')!, cv)
    const t = new THREE.CanvasTexture(cv); t.needsUpdate = true; t.anisotropy = 8; return t
  }
  const glowTex = (col: string) => tex((x, c) => { const g = x.createRadialGradient(c.width/2,c.width/2,0,c.width/2,c.width/2,c.width/2); g.addColorStop(0,col); g.addColorStop(.3,col); g.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.width) }, 128)
  const rr = (x:CanvasRenderingContext2D,a:number,b:number,w:number,h:number,r:number)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  const wrapText = (x:CanvasRenderingContext2D,t:string,ax:number,ay:number,max:number,lh:number)=>{const w=t.split(' ');let l='',y=ay;for(const wd of w){if(x.measureText(l+wd).width>max){x.fillText(l,ax,y);l=wd+' ';y+=lh}else l+=wd+' '}x.fillText(l,ax,y)}

  /* ---- black hole (adaptive, full-res) ---- */
  const STEPS = isMobile ? 30 : 58
  const HOLE_FS = `precision highp float;uniform vec2 u_res;uniform float u_time;uniform float u_dive;uniform vec2 u_mouse;
  float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
  float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<3;i++){s+=a*noise(p);p*=2.04;a*=.5;}return s;}
  mat3 cam(vec3 ro,vec3 ta){vec3 f=normalize(ta-ro),r=normalize(cross(vec3(0,1,0),f)),u=cross(f,r);return mat3(r,u,f);}
  void main(){
   vec2 uv=(gl_FragCoord.xy-.5*u_res.xy)/u_res.y;
   float dive=u_dive; float dist=mix(19.0,8.5,dive);
   vec3 ro=vec3(sin(u_mouse.x*0.6)*dist, mix(2.4,1.0,dive)+u_mouse.y*2.0, cos(u_mouse.x*0.6)*dist);
   mat3 cm=cam(ro,vec3(0.0)); vec3 rd=normalize(cm*vec3(uv,mix(1.5,1.05,dive)));
   vec3 pos=ro,dir=rd; float rs=1.0,dt=0.38; vec3 col=vec3(0.0); float hit=0.0,glow=0.0;
   for(int i=0;i<${STEPS};i++){
     float r=length(pos); glow+=0.0028/(0.02+abs(r-2.6));
     if(r<rs){hit=1.0;break;}
     vec3 g=-normalize(pos)*(1.35*rs)/(r*r); vec3 ndir=normalize(dir+g*dt); vec3 np=pos+ndir*dt*(r*0.55+0.6);
     if(pos.y*np.y<0.0){float t=pos.y/(pos.y-np.y);vec3 hp=mix(pos,np,t);float hr=length(hp.xz);
       if(hr>2.2&&hr<8.5){float ang=atan(hp.z,hp.x);float spin=u_time*1.35;
         float sw=fbm(vec2(hr*0.9-spin,ang*2.5+hr*0.4));float band=smoothstep(8.5,2.2,hr);
         vec3 hot=mix(vec3(1.0,0.45,0.12),vec3(1.0,0.94,0.76),band);
         vec3 orb=normalize(vec3(-hp.z,0.0,hp.x));float dop=0.55+0.95*clamp(dot(orb,-dir),-1.0,1.0);
         col+=hot*band*(0.35+sw*1.2)*dop*1.45;}}
     dir=ndir;pos=np;}
   vec3 sd=normalize(dir);float st=pow(hash(floor(sd.xy*260.0+sd.z*40.0)),42.0);
   col+=vec3(st)*0.9*(1.0-hit); col+=vec3(1.0,0.87,0.66)*glow*0.5; col*=(1.0-hit);
   col=pow(col,vec3(0.86)); gl_FragColor=vec4(col,1.0);}`
  const holeScene = new THREE.Scene(); const holeCam = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
  const holeMat = new THREE.ShaderMaterial({ uniforms:{ u_res:{value:new THREE.Vector2(renderer.domElement.width,renderer.domElement.height)}, u_time:{value:0}, u_dive:{value:0}, u_mouse:{value:new THREE.Vector2(0,0)} }, vertexShader:'void main(){gl_Position=vec4(position,1.0);}', fragmentShader:HOLE_FS })
  holeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), holeMat))

  /* ---- realistic bookshelf-library tesseract ---- */
  const archScene = new THREE.Scene(); archScene.fog = new THREE.FogExp2(0x0a0705, 0.02)
  const archCam = new THREE.PerspectiveCamera(isMobile?70:58, innerWidth/innerHeight, 0.1, 700)
  const PAL = ['#7a2f27','#8f6a2e','#324b3a','#26323f','#5b3350','#8a6a34','#442a1c','#2c3a58','#6e4325','#4a5a26','#7d5230','#3a2a44','#93843f','#5a2c22']
  const shelfTex = (seed:number) => tex((x,c)=>{
    // wood back
    const wg=x.createLinearGradient(0,0,c.width,c.height); wg.addColorStop(0,'#1c110a'); wg.addColorStop(1,'#241608'); x.fillStyle=wg; x.fillRect(0,0,c.width,c.height)
    for(let i=0;i<160;i++){ x.fillStyle=`rgba(0,0,0,${0.03+Math.random()*0.05})`; x.fillRect(Math.random()*c.width,0,1,c.height) }
    const rows=7, rh=c.height/rows
    let s=seed*97.13
    const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280 }
    for(let r=0;r<rows;r++){
      const y0=r*rh, board=12, shelfBase=y0+rh-board
      // back AO
      const ao=x.createLinearGradient(0,y0,0,y0+rh); ao.addColorStop(0,'rgba(0,0,0,0.5)'); ao.addColorStop(.35,'rgba(0,0,0,0)'); x.fillStyle=ao; x.fillRect(0,y0,c.width,rh)
      // books
      let bx=8
      while(bx<c.width-8){ const bw=16+Math.floor(rnd()*30); const bh=rh-board-6-Math.floor(rnd()*(rh*0.32)); const col=PAL[Math.floor(rnd()*PAL.length)]
        const by=shelfBase-bh
        x.fillStyle=col; x.fillRect(bx,by,bw,bh)
        x.fillStyle='rgba(255,255,255,0.10)'; x.fillRect(bx,by,2,bh)            // left highlight
        x.fillStyle='rgba(0,0,0,0.35)'; x.fillRect(bx+bw-2,by,2,bh)            // right shadow
        x.fillStyle='rgba(0,0,0,0.25)'; x.fillRect(bx,by,bw,3)                 // top edge
        if(rnd()>0.35){ x.fillStyle=rnd()>0.5?'rgba(214,180,120,0.7)':'rgba(255,255,255,0.14)'; const ty=by+bh*0.28+rnd()*bh*0.4; x.fillRect(bx+3,ty,bw-6,rnd()>0.5?3:2) } // title band
        bx+=bw+1+Math.floor(rnd()*2) }
      // wood board
      x.fillStyle='#2c1a0e'; x.fillRect(0,shelfBase,c.width,board)
      x.fillStyle='rgba(120,80,40,0.5)'; x.fillRect(0,shelfBase,c.width,2)      // board top light
      x.fillStyle='rgba(0,0,0,0.55)'; x.fillRect(0,shelfBase+board,c.width,6)   // drop shadow under board
    }
    // warm grade + vignette
    const v=x.createRadialGradient(c.width/2,c.height/2,c.width*0.2,c.width/2,c.height/2,c.width*0.75); v.addColorStop(0,'rgba(255,190,110,0.05)'); v.addColorStop(1,'rgba(0,0,0,0.5)'); x.fillStyle=v; x.fillRect(0,0,c.width,c.height)
  }, 1024, 1024)
  const corridor = new THREE.Group(); archScene.add(corridor)
  const LEN=320, HALF=13
  const wallGeo = new THREE.PlaneGeometry(LEN, HALF*2)
  const wallMat = (seed:number) => { const t=shelfTex(seed); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(LEN/26,1.3); return new THREE.MeshBasicMaterial({map:t,color:new THREE.Color(0x9a8f80),side:THREE.DoubleSide,fog:true}) }
  const wl=new THREE.Mesh(wallGeo,wallMat(1)); wl.rotation.y=Math.PI/2; wl.position.set(-HALF,0,-LEN/2+12); corridor.add(wl)
  const wr=new THREE.Mesh(wallGeo,wallMat(2)); wr.rotation.y=-Math.PI/2; wr.position.set(HALF,0,-LEN/2+12); corridor.add(wr)
  const wc=new THREE.Mesh(wallGeo,wallMat(3)); wc.rotation.x=Math.PI/2; wc.position.set(0,HALF,-LEN/2+12); corridor.add(wc)
  const wf=new THREE.Mesh(wallGeo,wallMat(4)); wf.rotation.x=-Math.PI/2; wf.position.set(0,-HALF,-LEN/2+12); corridor.add(wf)
  // cross dividers (lattice / tesseract compartments)
  const divGeo = new THREE.PlaneGeometry(HALF*2, HALF*2)
  for(let d=0; d<10; d++){ const t=shelfTex(10+d); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1.4,1.4)
    const m=new THREE.Mesh(divGeo, new THREE.MeshBasicMaterial({map:t,color:new THREE.Color(0x6a6055),side:THREE.DoubleSide,transparent:true,opacity:0.9,fog:true}))
    const side=d%2? HALF-0.1 : -HALF+0.1; m.rotation.y=Math.PI/2; m.position.set(side*0.0, 0, -18 - d*30)
    // a partial divider jutting from a wall to add lattice depth
    m.scale.set(0.5,1,1); m.position.x = d%2? HALF*0.5 : -HALF*0.5
    corridor.add(m) }
  // god-ray light shafts (additive)
  const rayTex = tex((x,c)=>{ const g=x.createLinearGradient(0,0,0,c.height); g.addColorStop(0,'rgba(255,214,150,0)'); g.addColorStop(.5,'rgba(255,220,160,0.5)'); g.addColorStop(1,'rgba(255,214,150,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.height) },16,256)
  const rays = new THREE.Group()
  for(let i=0;i<8;i++){ const m=new THREE.Mesh(new THREE.PlaneGeometry(1.2, HALF*2.2), new THREE.MeshBasicMaterial({map:rayTex,transparent:true,opacity:0.22,blending:THREE.AdditiveBlending,depthWrite:false}))
    m.position.set((i%2?1:-1)*(HALF-1), 0, -20 - i*34); m.rotation.y=(i%2?-0.4:0.4); rays.add(m) }
  corridor.add(rays)
  const vp = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex('rgba(255,205,140,0.5)'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending })); vp.position.set(0,0,-LEN+14); vp.scale.set(26,26,1); archScene.add(vp)

  // project volumes (to the side so the camera never crosses/zooms into them)
  const projMeshes:any[]=[]
  const labelTex=(p:Project)=>tex((x,c)=>{ x.fillStyle='rgba(6,5,4,0.95)'; rr(x,0,0,c.width,c.height,26); x.fill()
    const grd=x.createLinearGradient(0,0,c.width,c.height); grd.addColorStop(0,p.accent+'2e'); grd.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=grd; rr(x,0,0,c.width,c.height,26); x.fill()
    x.strokeStyle=p.accent; x.lineWidth=6; rr(x,7,7,c.width-14,c.height-14,22); x.stroke()
    x.fillStyle=p.accent; x.font='600 30px Geist Mono, monospace'; x.fillText(p.cat.toUpperCase(),42,72)
    x.fillStyle='#F0ECE2'; x.font='italic 78px Instrument Serif, Georgia, serif'; x.fillText(p.n,40,172)
    x.fillStyle='#b8b1a6'; x.font='27px Geist, sans-serif'; wrapText(x,p.desc,42,224,c.width-84,36)
    x.fillStyle=p.accent; x.font='600 25px Geist Mono, monospace'; x.fillText((p.url?p.cta:'Coming soon').toUpperCase()+'  →',42,c.height-46) },680,446)
  PROJECTS.forEach((p,i)=>{ const pw=isMobile?6.2:8.4, ph=pw*0.656
    const m=new THREE.Mesh(new THREE.PlaneGeometry(pw,ph), new THREE.MeshBasicMaterial({map:labelTex(p),transparent:true,side:THREE.DoubleSide,fog:false}))
    const side=i%2?1:-1; m.position.set(isMobile?0:side*6.5, 0.3, -16 - i*13); ;(m as any).userData.pi=i; archScene.add(m); projMeshes.push(m)
    const gs=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(p.accent+'cc'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); gs.position.copy(m.position); gs.position.z-=0.4; gs.scale.set(pw*2.1,ph*2.1,1); archScene.add(gs) })
  const ARCH_END = -16 - (PROJECTS.length-1)*13 - 16

  /* ---- state / journey ---- */
  let prog=0,target=0,mode:'hole'|'arch'='hole',running=true,raf=0,flashT=0
  const DIVE=0.42; let mx=0,my=0,cmx=0,cmy=0
  const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v))
  const rail=$('#rail')!; PROJECTS.forEach((p,i)=>{ const b=document.createElement('button'); b.title=p.n; b.onclick=()=>{ const cz=(-16-i*13)+16; target=clamp(DIVE+(1-DIVE)*((cz-8)/(ARCH_END-8)),DIVE,0.98) }; rail.appendChild(b) })

  function setRenderMode(m:'hole'|'arch'){ mode=m; renderer.setPixelRatio(m==='hole'?holeDPR:archDPR); renderer.setSize(innerWidth,innerHeight); holeMat.uniforms.u_res.value.set(renderer.domElement.width,renderer.domElement.height) }
  function onResize(){ renderer.setSize(innerWidth,innerHeight); holeMat.uniforms.u_res.value.set(renderer.domElement.width,renderer.domElement.height); archCam.aspect=innerWidth/innerHeight; archCam.updateProjectionMatrix() }
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
  const ray=new THREE.Raycaster(),m2=new THREE.Vector2(); let dx=0,dy=0
  const onPD=(e:PointerEvent)=>{ dx=e.clientX;dy=e.clientY }
  const onPU=(e:PointerEvent)=>{ if(Math.abs(e.clientX-dx)>6||Math.abs(e.clientY-dy)>6)return; if(mode!=='arch')return; m2.x=(e.clientX/innerWidth)*2-1; m2.y=-(e.clientY/innerHeight)*2+1; ray.setFromCamera(m2,archCam); const h=ray.intersectObjects(projMeshes)[0]; if(h) openProject((h.object as any).userData.pi) }
  canvas.addEventListener('pointerdown',onPD); canvas.addEventListener('pointerup',onPU)
  document.querySelectorAll('.menu [data-jump], .brand').forEach(b=> (b as HTMLElement).onclick=()=>{ target=parseFloat((b as HTMLElement).dataset.jump||'0') })
  document.querySelectorAll('.menu [data-panel]').forEach(b=> (b as HTMLElement).onclick=()=> openPanel((b as HTMLElement).dataset.panel!))

  /* ---- folder panels (black + red) ---- */
  const overlay=$('#overlay')!, folder=$('#folder')!
  function closePanel(){ overlay.classList.remove('open') }
  overlay.addEventListener('click',e=>{ if(e.target===overlay) closePanel() })
  const aboutHTML=()=>`<h3>Hello, <em>friend.</em></h3>
    <p>I&apos;m <b>Soumoditya Pramanik</b>, a developer from <b>India</b>. I mostly work with React, Next.js and TypeScript, and I build for both the web and Android.</p>
    <p>I learn by building. Some projects started as tools I wanted for myself; others try to be useful to more people. Either way I care about the details — how it feels, how it performs, and whether it genuinely helps.</p>
    <div class="filerow"><span class="ic">▸</span><span class="k">based_in</span><span class="v">India</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">works_with</span><span class="v">React · Next.js · TypeScript</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">also_builds</span><span class="v">Android apps</span></div>
    <div class="filerow"><span class="ic">▸</span><span class="k">status</span><span class="v">Open to good work</span></div>`
  const eduHTML=()=>`<h3>Where I <em>studied.</em></h3>`+EDU.map(e=>`<div class="filerow"><span class="ic">▸</span><span class="k">${e.yr}</span><span class="v">${e.inst}</span></div><p style="margin:2px 0 12px;color:#8a8580;font-family:var(--mono);font-size:12px">&nbsp;&nbsp;&nbsp;${e.deg} · ${e.place}</p>`).join('')
  const contactHTML=()=>`<h3>Let&apos;s build <em>something.</em></h3><p>Got an idea, a role, or just want to talk shop? My inbox is open.</p>
    <div class="filerow"><span class="ic">✉</span><span class="k">email</span><span class="v"><a href="mailto:${EMAIL}">${EMAIL}</a></span></div>`+
    SOCIALS.map(s=>`<div class="filerow"><span class="ic">↗</span><span class="k">${s[0].toLowerCase().replace(/ /g,'_')}</span><span class="v"><a href="${s[1]}" target="_blank" rel="noopener">${s[1].replace('https://','')}</a></span></div>`).join('')
  function renderFolder(active:string){
    const tabs=[['about','~/about'],['education','~/education'],['contact','~/contact']]
    const body = active==='about'?aboutHTML() : active==='education'?eduHTML() : contactHTML()
    folder.innerHTML = `<div class="folder-bar"><span class="fi">▣</span><span class="path">soumoditya@fsociety : <b>${active}</b></span><button class="x" aria-label="Close">✕</button></div>
      <div class="folder-tabs">${tabs.map(t=>`<button data-t="${t[0]}" class="${t[0]===active?'on':''}">${t[1]}</button>`).join('')}</div>
      <div class="folder-body">${body}</div>`
    folder.querySelector('.x')!.addEventListener('click',closePanel)
    folder.querySelectorAll('.folder-tabs button').forEach(b=> b.addEventListener('click',()=>renderFolder((b as HTMLElement).dataset.t!)))
  }
  function openPanel(kind:string){ overlay.classList.add('open'); renderFolder(kind==='education'?'education':kind==='contact'?'contact':'about') }
  function openProject(i:number){ const p=PROJECTS[i]; overlay.classList.add('open')
    const cta = p.url ? `<a class="projcta" href="${p.url}" target="_blank" rel="noopener">${p.cta} ↗</a>` : `<span class="projcta soon">${p.cta}</span>`
    folder.innerHTML = `<div class="folder-bar"><span class="fi">▣</span><span class="path">~/projects/ <b>${p.n}</b></span><button class="x" aria-label="Close">✕</button></div>
      <div class="folder-body"><h3 style="color:${p.accent}">${p.n}</h3>
      <div class="filerow"><span class="ic">▸</span><span class="k">category</span><span class="v">${p.cat}</span></div>
      <p style="margin:14px 0">${p.desc}</p>
      <div class="tagrow">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${cta}</div>`
    folder.querySelector('.x')!.addEventListener('click',closePanel)
  }

  let toastT:any; function toast(msg:string){ const el=$('#toast')!; el.textContent=msg; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2600) }

  /* ---- loop with adaptive DPR ---- */
  const tmp=new THREE.Vector3(); let last=performance.now(), acc=0, frames=0
  function loop(){
    if(!running) return; raf=requestAnimationFrame(loop)
    const now=performance.now(); const dt=now-last; last=now; acc+=dt; frames++
    prog += (target-prog)*0.06
    const t=now*0.001
    const nm:'hole'|'arch' = prog<DIVE-0.005 ? 'hole':'arch'
    if(nm!==mode){ setRenderMode(nm); if(nm==='arch'&&!(window as any).__ag){(window as any).__ag=1;toast('Scroll to move · tap a book to open · menu for About / Contact')} $('#flash')!.style.transition='none'; $('#flash')!.style.opacity='0.85'; flashT=now }
    if(flashT){ const e=(now-flashT)/650; if(e>=1){flashT=0;$('#flash')!.style.opacity='0'} else {$('#flash')!.style.transition='opacity .1s';$('#flash')!.style.opacity=String(0.85*(1-e))} }
    const nc=$('#namecard')!; nc.style.opacity=String(clamp(1-prog/0.12,0,1))
    $('#rail')!.classList.toggle('show', mode==='arch')
    if(mode==='hole'){
      cmx+=(mx-cmx)*0.05; cmy+=(my-cmy)*0.05
      holeMat.uniforms.u_time.value=t; holeMat.uniforms.u_dive.value=clamp(prog/DIVE,0,1); holeMat.uniforms.u_mouse.value.set(cmx+t*0.03,cmy)
      renderer.render(holeScene,holeCam)
      // adaptive: keep it crisp but smooth
      if(frames>=30){ const avg=acc/frames; acc=0; frames=0
        if(avg>26 && holeDPR>0.9){ holeDPR=Math.max(0.9,holeDPR-0.2); setRenderMode('hole') }
        else if(avg<15 && holeDPR<capDPR){ holeDPR=Math.min(capDPR,holeDPR+0.15); setRenderMode('hole') } }
    } else {
      const N=projMeshes.length, at=clamp((prog-DIVE)/(1-DIVE),0,1)
      let near=0
      if(isMobile){ const k=Math.round(at*(N-1)); near=k; const cz=projMeshes[k].position.z; archCam.position.set(0,0.4,cz+10.5); archCam.lookAt(0,0.35,cz) }
      else { const cz=8+(ARCH_END-8)*at; cmx+=(mx-cmx)*0.05; archCam.position.set(cmx*1.4,0.7,cz); archCam.lookAt(0,0.35,cz-18); let nd=1e9; for(let i=0;i<N;i++){const d=Math.abs(projMeshes[i].position.z-(cz-16));if(d<nd){nd=d;near=i}} }
      corridor.rotation.z = t*(isMobile?0.03:0.06)
      for(const pm of projMeshes){ tmp.copy(archCam.position); pm.lookAt(tmp.x,pm.position.y,tmp.z) }
      const dots=$('#rail')!.children; for(let i=0;i<dots.length;i++) dots[i].classList.toggle('on', i===near)
      renderer.render(archScene,archCam)
    }
  }

  /* ---- realistic glass shatter (filled shards) ---- */
  function genShatter(host: HTMLElement){
    const cv=document.createElement('canvas'); const W=cv.width=1600, H=cv.height=1000; host.appendChild(cv)
    const x=cv.getContext('2d')!; const cx=W/2, cy=H*0.42
    let s=12345; const rnd=(a=0,b=1)=>{ s=(s*9301+49297)%233280; return a+(s/233280)*(b-a) }
    const N=20, ang:number[]=[]; for(let i=0;i<N;i++) ang.push((i/N)*Math.PI*2+rnd(-0.1,0.1))
    const rings=[0,34,90,175,290,440,640,880]
    const pt=(a:number,r:number)=>[cx+Math.cos(a)*r + (r>20?rnd(-8,8):0), cy+Math.sin(a)*r*0.64 + (r>20?rnd(-8,8):0)] as [number,number]
    // shards
    for(let k=0;k<rings.length-1;k++){ for(let i=0;i<N;i++){
      const a0=ang[i], a1=ang[(i+1)%N], r0=rings[k], r1=rings[k+1]
      const A=pt(a0,r0),B=pt(a1,r0),C=pt(a1,r1),D=pt(a0,r1)
      x.beginPath(); x.moveTo(A[0],A[1]); x.lineTo(B[0],B[1]); x.lineTo(C[0],C[1]); x.lineTo(D[0],D[1]); x.closePath()
      const lit=rnd()>0.72
      x.fillStyle= lit ? `rgba(200,220,240,${rnd(0.06,0.14)})` : `rgba(120,150,180,${rnd(0.015,0.05)})`
      x.fill()
      x.lineWidth=rnd(0.6,1.8); x.strokeStyle=`rgba(255,255,255,${rnd(0.5,0.95)})`; x.shadowColor='rgba(255,255,255,0.6)'; x.shadowBlur=3; x.stroke(); x.shadowBlur=0
    }}
    // long radial cracks beyond
    for(let i=0;i<N;i++){ const a=ang[i]; let px=cx,py=cy; x.beginPath(); x.moveTo(cx,cy)
      const seg=Math.round(rnd(4,7)), rmax=rnd(700,980)
      for(let sgi=1;sgi<=seg;sgi++){ const rr2=(rmax*sgi/seg); px=cx+Math.cos(a)*rr2+rnd(-14,14); py=cy+Math.sin(a)*rr2*0.64+rnd(-14,14); x.lineTo(px,py) }
      x.lineWidth=rnd(0.7,2.2); x.strokeStyle=`rgba(255,255,255,${rnd(0.5,0.9)})`; x.stroke()
      // branch
      if(rnd()>0.4){ const bt=rnd(0.4,0.8); const bx=cx+(px-cx)*bt, by=cy+(py-cy)*bt; const ba=a+rnd(-0.8,0.8), bl=rnd(70,180); x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+Math.cos(ba)*bl,by+Math.sin(ba)*bl*0.7); x.lineWidth=rnd(0.4,1); x.stroke() } }
    // impact core
    x.fillStyle='rgba(255,255,255,0.95)'; x.beginPath(); x.arc(cx,cy,4,0,7); x.fill()
    x.strokeStyle='rgba(255,255,255,0.5)'; x.lineWidth=1; x.beginPath(); x.arc(cx,cy,16,0,7); x.stroke()
  }

  /* ---- intro ---- */
  function runIntro(){
    const bm=$('#bmload')!, crack=$('#crack')!, stage=$('#stage')!, mr=$('#mrtitle')!, tap=$('#tapBtn') as HTMLButtonElement, mask=$('#fsmask')!, intro=$('#intro')!
    genShatter(crack)
    setTimeout(breakScreen, RM?200:2300)
    function breakScreen(){ bm.classList.add('hide'); crack.classList.add('show'); intro.classList.add('breaking')
      const fl=$('#flash')!; fl.style.transition='none'; fl.style.opacity='0.97'; setTimeout(()=>{ fl.style.transition='opacity .5s'; fl.style.opacity='0' },70)
      setTimeout(()=>{ intro.classList.remove('breaking'); reveal() }, RM?0:560) }
    function reveal(){ stage.classList.add('show'); stage.style.opacity='1'; mask.classList.add('in')
      const full='HELLO, FRIEND'; let i=0
      setTimeout(()=>{ mr.classList.add('gl'); (function ty(){ if(i<=full.length){ mr.textContent=full.slice(0,i); i++; setTimeout(ty,RM?0:60) } else tap.classList.add('show') })() }, RM?0:420) }
    function go(){ intro.classList.add('gone'); $('#hud')!.classList.add('show'); $('#cue')!.classList.add('show') }  // single action
    tap.onclick=go
    addEventListener('keydown', e=>{ if(e.key==='Enter'&&!intro.classList.contains('gone')&&stage.classList.contains('show')) go() })
  }
  runIntro(); loop()

  return () => {
    cancelAnimationFrame(raf); running=false
    removeEventListener('resize',onResize); document.removeEventListener('visibilitychange',onVis)
    removeEventListener('wheel',onWheel as any); removeEventListener('mousemove',onMove); removeEventListener('keydown',onKey)
    try{ renderer.dispose() }catch{}
  }
}
