'use client'
import { useEffect } from 'react'
import { PROJECTS, SOCIALS, EDU, EMAIL, type Project } from './data'


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
      <audio id="snd" src="/intro.mp3" preload="auto" />
      <button id="mute" aria-label="Toggle sound" />
      <button id="hd" aria-label="Toggle high detail">HD</button>

      <div id="intro">
        <div className="scan" />
        <div className="bmload" id="bmload"><div className="ring" /><div className="bmsub">loading</div><div className="begin" id="begin">click anywhere for sound</div></div>
        <div className="crack" id="crack" />
        <div className="stage" id="stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="fsmask" id="fsmask" src="/fsociety.png" alt="fsociety mask" />
          <div className="fslabel">fsociety</div>
          <div className="mrtitle" id="mrtitle"><span id="mr1" /><span id="mr2" /></div>
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
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false, stencil: false, powerPreference: 'high-performance' }) } catch { throw new Error('no webgl') }
  if (!renderer.getContext()) throw new Error('no ctx')
  // fragment cost scales with DPR^2 — clamp hard for integrated GPUs
  const DPR = Math.min(window.devicePixelRatio || 1, 1.25)
  renderer.setPixelRatio(DPR); renderer.setSize(innerWidth, innerHeight)
  const VOID = 0x0d0906                       // fog + background must match, else black voids
  renderer.setClearColor(VOID, 1)

  const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v))
  const mix=(a:number,b:number,t:number)=>a+(b-a)*t

  const tex = (draw: (c: CanvasRenderingContext2D, cv: HTMLCanvasElement)=>void, w: number, h?: number) => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h || w; draw(cv.getContext('2d')!, cv)
    const t = new THREE.CanvasTexture(cv); t.needsUpdate = true
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
    return t
  }
  const glowTex = (col: string) => tex((x, c) => { const g = x.createRadialGradient(c.width/2,c.width/2,0,c.width/2,c.width/2,c.width/2); g.addColorStop(0,col); g.addColorStop(.28,col); g.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.width) }, 128)

  /* =========================================================
     BLACK HOLE — light mesh build (default) + optional HD shader
     ========================================================= */
  const holeScene = new THREE.Scene(); holeScene.background = new THREE.Color(0x000000)
  const holeCam = new THREE.PerspectiveCamera(52, innerWidth/innerHeight, 1, 400)

  const dotTex = glowTex('rgba(255,255,255,1)')
  const STAR_N = isMobile ? 800 : 1400
  const spos = new Float32Array(STAR_N*3), scol = new Float32Array(STAR_N*3)
  for (let i=0;i<STAR_N;i++){ const r=60+Math.random()*160, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1)
    spos[i*3]=r*Math.sin(ph)*Math.cos(th); spos[i*3+1]=r*Math.cos(ph); spos[i*3+2]=r*Math.sin(ph)*Math.sin(th)
    const w=0.6+Math.random()*0.4, tint=Math.random(); scol[i*3]=w; scol[i*3+1]=w*(0.9+tint*0.1); scol[i*3+2]=w*(0.85+tint*0.15) }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(spos,3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(scol,3))
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size:isMobile?1.1:1.4, map:dotTex, vertexColors:true, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, sizeAttenuation:true }))
  holeScene.add(stars)

  const bg = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex('rgba(255,150,80,0.26)'), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending }))
  bg.scale.set(24,24,1); holeScene.add(bg)

  const horizon = new THREE.Mesh(new THREE.SphereGeometry(2.15, 32, 32), new THREE.MeshBasicMaterial({ color:0x000000 }))
  holeScene.add(horizon)

  // accretion disk — RING geometry (no square corners), texture is a clean annulus
  const diskTex = tex((x,c)=>{
    const s=c.width, cx=s/2, cy=s/2; x.clearRect(0,0,s,s)
    const g=x.createRadialGradient(cx,cy,s*0.16,cx,cy,s*0.5)
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(0.22,'rgba(90,30,10,0)')
    g.addColorStop(0.31,'rgba(255,150,60,0.55)'); g.addColorStop(0.40,'rgba(255,224,160,0.98)')
    g.addColorStop(0.49,'rgba(255,186,96,0.78)'); g.addColorStop(0.60,'rgba(196,66,24,0.24)'); g.addColorStop(0.72,'rgba(120,40,16,0.05)'); g.addColorStop(0.82,'rgba(0,0,0,0)')
    x.fillStyle=g; x.fillRect(0,0,s,s)
    for(let i=0;i<280;i++){ const ang=Math.random()*Math.PI*2, rr=s*(0.17+Math.random()*0.32)
      x.beginPath(); x.arc(cx,cy,rr,ang,ang+0.02+Math.random()*0.09)
      const a=0.03+Math.random()*0.10, hot=Math.random()>0.5
      x.strokeStyle=hot?`rgba(255,232,190,${a})`:`rgba(255,150,70,${a})`; x.lineWidth=0.6+Math.random()*2.4; x.stroke() }
    // Doppler brightening — source-atop so it ONLY touches existing disk pixels
    // (a 'lighter' pass over the full square is what produced the flat white sheet)
    const dg=x.createLinearGradient(0,0,s,0); dg.addColorStop(0,'rgba(255,240,210,0.30)'); dg.addColorStop(0.45,'rgba(255,255,255,0)'); dg.addColorStop(1,'rgba(255,255,255,0)')
    x.globalCompositeOperation='source-atop'; x.fillStyle=dg; x.fillRect(0,0,s,s); x.globalCompositeOperation='source-over'
  }, 512)
  diskTex.center.set(0.5,0.5)
  const disk = new THREE.Mesh(new THREE.RingGeometry(2.3, 5.0, 96, 1), new THREE.MeshBasicMaterial({ map:diskTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, side:THREE.DoubleSide }))
  disk.rotation.x = -1.24
  holeScene.add(disk)

  // lensed photon ring (billboard)
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

  /* ---- optional HD mode: real raymarched lensing (off by default) ---- */
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
   for(int i=0;i<52;i++){
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
   // round, soft stars — a raw hash of floor() gives blocky square pixels
   vec3 sd=normalize(dir);
   vec2 sc=sd.xy*210.0+sd.z*30.0; vec2 ci=floor(sc), cf=fract(sc)-0.5;
   float st=pow(hash(ci),58.0)*smoothstep(0.40,0.02,length(cf));
   col+=vec3(st)*1.5*(1.0-hit); col+=vec3(1.0,0.87,0.66)*glow*0.5; col*=(1.0-hit);
   col=pow(col,vec3(0.86)); gl_FragColor=vec4(col,1.0);}`
  let hdScene:any=null, hdCam:any=null, hdMat:any=null
  function ensureHD(){
    if(hdScene) return
    hdScene = new THREE.Scene(); hdCam = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
    hdMat = new THREE.ShaderMaterial({ uniforms:{ u_res:{value:new THREE.Vector2(1,1)}, u_time:{value:0}, u_dive:{value:0}, u_mouse:{value:new THREE.Vector2(0,0)} },
      vertexShader:'void main(){gl_Position=vec4(position,1.0);}', fragmentShader:HOLE_FS })
    hdScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), hdMat))
  }
  let hd = false
  try { hd = localStorage.getItem('sp_hd')==='1' } catch {}

  /* =========================================================
     TESSERACT — endless recycled 3D bookshelf lattice
     Shared textures + baked UVs: NO Texture.clone() (that was
     uploading ~76 copies of a 1024² texture and thrashing VRAM).
     ========================================================= */
  const archScene = new THREE.Scene()
  archScene.background = new THREE.Color(VOID)
  archScene.fog = new THREE.FogExp2(VOID, 0.0115)
  const archCam = new THREE.PerspectiveCamera(isMobile?74:64, innerWidth/innerHeight, 1, 400)

  const PAL = ['#7a2f27','#8f6a2e','#324b3a','#26323f','#5b3350','#8a6a34','#442a1c','#2c3a58','#6e4325','#4a5a26','#7d5230','#3a2a44','#93843f','#5a2c22','#804a2a','#38506a']
  // 512² (not 1024²) — 4× less VRAM, better cache behaviour on an iGPU
  const shelfTex = (seed:number) => tex((x,c)=>{
    const W=c.width, H=c.height
    const wg=x.createLinearGradient(0,0,W,H); wg.addColorStop(0,'#1d110a'); wg.addColorStop(1,'#271908'); x.fillStyle=wg; x.fillRect(0,0,W,H)
    for(let i=0;i<150;i++){ x.fillStyle=`rgba(0,0,0,${0.03+Math.random()*0.06})`; x.fillRect(Math.random()*W,0,1,H) }
    const rows=6, rh=H/rows
    let s=seed*97.13; const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280 }
    for(let r=0;r<rows;r++){
      const y0=r*rh, board=7, shelfBase=y0+rh-board
      // deep shadow at the back of each shelf
      const ao=x.createLinearGradient(0,y0,0,y0+rh); ao.addColorStop(0,'rgba(0,0,0,0.6)'); ao.addColorStop(.42,'rgba(0,0,0,0)'); x.fillStyle=ao; x.fillRect(0,y0,W,rh)
      let bx=4
      while(bx<W-4){
        const bw=7+Math.floor(rnd()*15), bh=rh-board-3-Math.floor(rnd()*(rh*0.26)), col=PAL[Math.floor(rnd()*PAL.length)]
        const by=shelfBase-bh
        x.fillStyle=col; x.fillRect(bx,by,bw,bh)
        x.fillStyle='rgba(255,255,255,0.10)'; x.fillRect(bx,by,1,bh)
        x.fillStyle='rgba(0,0,0,0.40)'; x.fillRect(bx+bw-1,by,1,bh)
        if(rnd()>0.45){ x.fillStyle=rnd()>0.5?'rgba(214,180,120,0.75)':'rgba(255,255,255,0.16)'; x.fillRect(bx+1,by+bh*0.3+rnd()*bh*0.3,bw-2,2) }
        // warm light BLEEDING between books — on unlit material a bright texel is
        // emissive, so this is the glow with zero lights and zero bloom passes
        if(rnd()>0.72){ const gx=bx+bw
          const lg=x.createLinearGradient(gx-3,0,gx+4,0); lg.addColorStop(0,'rgba(255,190,110,0)'); lg.addColorStop(0.5,'rgba(255,236,200,1)'); lg.addColorStop(1,'rgba(255,190,110,0)')
          x.fillStyle=lg; x.fillRect(gx-3,by,7,bh) }
        bx+=bw+1
      }
      // board with a hot lit top edge and deep shadow beneath
      x.fillStyle='#241408'; x.fillRect(0,shelfBase,W,board)
      x.fillStyle='rgba(255,214,150,0.85)'; x.fillRect(0,shelfBase,W,1)
      x.fillStyle='rgba(0,0,0,0.75)'; x.fillRect(0,shelfBase+board,W,4)
    }
    // a couple of blown-out light seams per panel — the film's signature streaks
    for(let i=0;i<3;i++){ const lx=rnd()*W
      const lg=x.createLinearGradient(lx-2,0,lx+3,0); lg.addColorStop(0,'rgba(255,210,150,0)'); lg.addColorStop(0.5,'rgba(255,246,225,0.95)'); lg.addColorStop(1,'rgba(255,210,150,0)')
      x.fillStyle=lg; x.fillRect(lx-2,0,5,H) }
    const v=x.createRadialGradient(W/2,H/2,W*0.12,W/2,H/2,W*0.7); v.addColorStop(0,'rgba(255,190,110,0.05)'); v.addColorStop(1,'rgba(0,0,0,0.5)'); x.fillStyle=v; x.fillRect(0,0,W,H)
  }, 512)

  const SHELF_TEX = [shelfTex(1), shelfTex(2), shelfTex(3), shelfTex(4)]
  SHELF_TEX.forEach(t=>{ t.wrapS=t.wrapT=THREE.RepeatWrapping })
  // ONE material per texture — reused by every mesh (was 76 materials + 76 textures)
  // dark multiplier: the film is deep shadow with bright warm seams, not flat tan
  const SHELF_MAT = SHELF_TEX.map(t => new THREE.MeshBasicMaterial({ map:t, color:0x6e6353, side:THREE.DoubleSide, fog:true }))

  /* quad builder — bakes per-panel tiling into UVs so the texture stays shared */
  class QB {
    pos:number[]=[]; uv:number[]=[]; idx:number[]=[]; n=0
    quad(a:number[],b:number[],c:number[],d:number[],ru:number,rv:number){
      this.pos.push(...a,...b,...c,...d)
      this.uv.push(0,0, ru,0, ru,rv, 0,rv)
      const i=this.n; this.idx.push(i,i+1,i+2, i,i+2,i+3); this.n+=4
    }
    // axis-aligned rectangle on a plane; ax = which axis is constant
    rect(ax:'x'|'y'|'z', k:number, u0:number,u1:number, v0:number,v1:number, ru:number, rv:number){
      const P=(u:number,v:number)=> ax==='x' ? [k,v,u] : ax==='y' ? [u,k,v] : [u,v,k]
      this.quad(P(u0,v0),P(u1,v0),P(u1,v1),P(u0,v1),ru,rv)
    }
    build(){ const g=new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos,3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv,2))
      g.setIndex(this.idx); g.computeVertexNormals(); return g }
  }

  const CELL = 26          // depth of one lattice ring
  const HALF = 10          // inner corridor half-size
  const OUT  = 23          // outer shell — seen THROUGH the gaps, so never black
  const BEAM = 3.0         // structural beam thickness
  const RINGS = 7

  /* One ring of the lattice — a single merged geometry (1 draw call).
     Deliberately IRREGULAR: each side sits at its own distance and the openings
     are offset, so it never reads as a uniform square tunnel. Beams cross the
     view at varied heights/depths, which is the tesseract's defining feature. */
  function buildRing(seed:number){
    let s=seed*3571.7; const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280 }
    const q=new QB()
    const z0=-0.4, z1=-CELL
    // irregular corridor: every side at a different distance
    const dL=HALF*(0.82+rnd()*0.55), dR=HALF*(0.82+rnd()*0.55)
    const dT=HALF*(0.78+rnd()*0.5),  dB=HALF*(0.86+rnd()*0.5)
    // inner walls, split into two panels with a real void between them so you
    // see past them into deeper structure
    const cut=0.30+rnd()*0.16
    const segs:[number,number][]=[[z0, z0-CELL*cut],[z0-CELL*(cut+0.20+rnd()*0.10), z1+1.2]]
    for(const [sa,sb] of segs){
      q.rect('x', -dL, sa, sb, -dB, dT, 2, 2)
      q.rect('x',  dR, sa, sb, -dB, dT, 2, 2)
      q.rect('y',  dT, -dL, dR, sa, sb, 2, 2)
      q.rect('y', -dB, -dL, dR, sa, sb, 2, 2)
    }
    // outer shell — full coverage behind the voids, so there is never black
    q.rect('x', -OUT, z0, z1, -OUT, OUT, 3, 3)
    q.rect('x',  OUT, z0, z1, -OUT, OUT, 3, 3)
    q.rect('y',  OUT, -OUT, OUT, z0, z1, 3, 3)
    q.rect('y', -OUT, -OUT, OUT, z0, z1, 3, 3)
    // stepped shelf stacks receding from the corridor out to the shell —
    // this is the "structure behind structure" depth the film has
    for(let k=0;k<3;k++){
      const zc=z0-CELL*(0.18+k*0.28+rnd()*0.06)
      const ex=HALF*(1.25+k*0.5), ey=HALF*(1.2+k*0.5)
      q.rect('z', zc, -ex, -dL, -ey, ey, 2, 3)
      q.rect('z', zc,  dR,  ex, -ey, ey, 2, 3)
      q.rect('z', zc, -dL, dR,  dT, ey, 3, 2)
      q.rect('z', zc, -dL, dR, -ey, -dB, 3, 2)
    }
    // beams crossing the corridor at varied heights/depths — offset from the
    // travel axis so the camera passes under/over/beside them
    for(let k=0;k<3;k++){
      const zb=z0-CELL*(0.22+k*0.3), horiz=rnd()>0.5
      if(horiz){ const y=(rnd()>0.5?1:-1)*(3.4+rnd()*4.6)
        q.rect('y', y, -dL, dR, zb, zb-BEAM*1.4, 3, 1)
        q.rect('y', y-BEAM*0.55, -dL, dR, zb, zb-BEAM*1.4, 3, 1)
        q.rect('z', zb, -dL, dR, y-BEAM*0.55, y, 3, 1)
      } else { const xx=(rnd()>0.5?1:-1)*(3.4+rnd()*4.2)
        q.rect('x', xx, zb, zb-BEAM*1.4, -dB, dT, 1, 3)
        q.rect('x', xx+BEAM*0.55, zb, zb-BEAM*1.4, -dB, dT, 1, 3)
        q.rect('z', zb, xx, xx+BEAM*0.55, -dB, dT, 1, 3)
      }
    }
    return q.build()
  }

  const lattice = new THREE.Group(); archScene.add(lattice)
  const ringGeos = [buildRing(1), buildRing(2), buildRing(3)]
  const rings: any[] = []
  for(let i=0;i<RINGS;i++){
    const m = new THREE.Mesh(ringGeos[i%ringGeos.length], SHELF_MAT[i%SHELF_MAT.length])
    m.position.z = -i*CELL
    lattice.add(m); rings.push(m)
  }

  // distant scaled + rotated copies — the recursive "structure inside structure"
  // that actually makes it read as a tesseract. Shares geometry+material (~0 VRAM).
  const deep: any[] = []
  ;[[0.34, 0.9, -120],[0.14, -0.6, -170]].forEach(([sc,rot,dz],i)=>{
    const m=new THREE.Mesh(ringGeos[i%ringGeos.length], SHELF_MAT[(i+1)%SHELF_MAT.length])
    m.scale.setScalar(sc as number); m.rotation.z=rot as number; ;(m as any).__dz=dz
    archScene.add(m); deep.push(m)
  })

  // backdrop shell — always something warm behind everything, never pure black
  const shellTex = tex((x,c)=>{
    const W=c.width,H=c.height
    x.fillStyle='#0d0906'; x.fillRect(0,0,W,H)
    for(let i=0;i<220;i++){ const w=2+Math.random()*7, h=10+Math.random()*70
      x.fillStyle=`rgba(${90+Math.random()*70|0},${60+Math.random()*40|0},${30+Math.random()*25|0},${0.10+Math.random()*0.16})`
      x.fillRect(Math.random()*W, Math.random()*H, w, h) }
    for(let i=0;i<26;i++){ x.fillStyle=`rgba(255,200,130,${0.05+Math.random()*0.07})`; x.fillRect(Math.random()*W, Math.random()*H, 1+Math.random()*2, 26+Math.random()*70) }
  }, 256)
  shellTex.wrapS=shellTex.wrapT=THREE.RepeatWrapping; shellTex.repeat.set(4,4)
  const shell = new THREE.Mesh(new THREE.BoxGeometry(300,300,300),
    new THREE.MeshBasicMaterial({ map:shellTex, side:THREE.BackSide, fog:false, depthWrite:false }))
  shell.renderOrder = -1; archScene.add(shell)

  // warm god-ray shafts (billboarded sprites so they never go paper-thin)
  const rayTex = tex((x,c)=>{ const g=x.createLinearGradient(0,0,0,c.height); g.addColorStop(0,'rgba(255,214,150,0)'); g.addColorStop(.5,'rgba(255,222,164,0.6)'); g.addColorStop(1,'rgba(255,214,150,0)'); x.fillStyle=g; x.fillRect(0,0,c.width,c.height) },16,256)
  const rayMat = new THREE.SpriteMaterial({ map:rayTex, transparent:true, opacity:0.30, blending:THREE.AdditiveBlending, depthWrite:false, fog:true })
  const rays:any[] = []
  for(let i=0;i<6;i++){ const s=new THREE.Sprite(rayMat); s.scale.set(3.2, HALF*2.4, 1)
    s.position.set((i%2?1:-1)*(HALF-1.4), (i%3-1)*4, -i*CELL*1.15); archScene.add(s); rays.push(s) }

  /* ---- journey state (endless) ---- */
  let prog=0, target=0, mode:'hole'|'arch'='hole', running=true, raf=0, flashT=0
  const DIVE=0.42, TRAVEL=300, CARD_SPAN=34
  let mx=0,my=0,cmx=0,cmy=0, curCard=-1

  /* ---- DOM project cards ---- */
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
    b.onclick=()=>{ target = DIVE + ((i+0.35)*CARD_SPAN)/TRAVEL }; rail.appendChild(b) })

  /* ---- audio: owner's clip, plays once from the very start ---- */
  const snd = document.getElementById('snd') as HTMLAudioElement
  const muteBtn = $('#mute')!, hdBtn = $('#hd')!
  const SPK='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm11.5 3a4.5 4.5 0 00-2.5-4.03v8.06A4.5 4.5 0 0014.5 12z"/></svg>'
  const MUT='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M15 9l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
  let muted=false, started=false
  muteBtn.innerHTML=SPK
  if(snd) snd.volume = 0.85
  // play from 0 and resolve true only once playback is actually running, so the
  // visual timeline can wait for it instead of running ahead in silence
  function startAudio(): Promise<boolean> {
    if(!snd || muted) return Promise.resolve(false)
    try{ snd.currentTime=0 }catch{}
    const pr = snd.play()
    if(!pr || !pr.then) { started=true; return Promise.resolve(true) }
    return pr.then(()=>{ started=true; return true }).catch(()=>false)
  }
  muteBtn.onclick=()=>{ muted=!muted; muteBtn.innerHTML=muted?MUT:SPK; if(snd) snd.muted=muted }
  hdBtn.classList.toggle('on', hd)
  hdBtn.onclick=()=>{ hd=!hd; hdBtn.classList.toggle('on',hd); try{ localStorage.setItem('sp_hd', hd?'1':'0') }catch{}
    if(hd) ensureHD(); toast(hd?'High detail on — heavier on low-end machines':'High detail off') }

  /* ---- events ---- */
  const panelOpen = () => !!document.querySelector('#overlay.open')
  function onResize(){ renderer.setSize(innerWidth,innerHeight)
    holeCam.aspect=innerWidth/innerHeight; holeCam.updateProjectionMatrix()
    archCam.aspect=innerWidth/innerHeight; archCam.updateProjectionMatrix()
    if(hdMat) hdMat.uniforms.u_res.value.set(renderer.domElement.width, renderer.domElement.height) }
  addEventListener('resize',onResize,{passive:true})
  const onVis=()=>{ running=!document.hidden; if(running){ last=performance.now(); loop() } }
  document.addEventListener('visibilitychange',onVis)
  // panels must scroll on their own without dragging the tesseract along
  const onWheel=(e:WheelEvent)=>{ if(panelOpen()) return; target=Math.max(0, target+e.deltaY*0.00042); $('#cue')?.classList.remove('show') }
  addEventListener('wheel',onWheel,{passive:true})
  let ty=0
  const onTS=(e:TouchEvent)=>{ ty=e.touches[0].clientY }
  const onTM=(e:TouchEvent)=>{ if(panelOpen()) return; const y=e.touches[0].clientY; target=Math.max(0, target+(ty-y)*0.0015); ty=y; $('#cue')?.classList.remove('show') }
  canvas.addEventListener('touchstart',onTS,{passive:true}); canvas.addEventListener('touchmove',onTM,{passive:true})
  const onMove=(e:MouseEvent)=>{ mx=(e.clientX/innerWidth-0.5)*2; my=(e.clientY/innerHeight-0.5)*2 }
  addEventListener('mousemove',onMove)
  const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape'){ closePanel(); return } if(panelOpen()) return
    if(e.key==='ArrowDown'||e.key==='PageDown')target=Math.max(0,target+0.06)
    if(e.key==='ArrowUp'||e.key==='PageUp')target=Math.max(0,target-0.06) }
  addEventListener('keydown',onKey)
  document.querySelectorAll('.menu [data-jump], .brand').forEach(b=> (b as HTMLElement).onclick=()=>{ target=parseFloat((b as HTMLElement).dataset.jump||'0') })
  document.querySelectorAll('.menu [data-panel]').forEach(b=> (b as HTMLElement).onclick=()=> openPanel((b as HTMLElement).dataset.panel!))

  /* ---- folder panels ---- */
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

  /* ---- realistic glass shatter — radial impact fracture ---- */
  function genShatter(host: HTMLElement){
    while(host.firstChild) host.removeChild(host.firstChild)
    const cv=document.createElement('canvas'); const W=cv.width=Math.min(innerWidth*DPR,2000)|0, H=cv.height=Math.min(innerHeight*DPR,1300)|0; host.appendChild(cv)
    const x=cv.getContext('2d')!; const cx=W*(0.42+Math.random()*0.16), cy=H*(0.34+Math.random()*0.18)
    let s=(Math.random()*1e6)|0; const rnd=(a=0,b=1)=>{ s=(s*9301+49297)%233280; return a+(s/233280)*(b-a) }
    const R=Math.max(W,H), K=R/1600
    const glow=(a:number)=>{ x.shadowColor=`rgba(225,238,255,${a})`; x.shadowBlur=3*K }
    const noGlow=()=>{ x.shadowBlur=0 }
    const N=20+Math.floor(rnd(0,6)); const ang:number[]=[]; let acc=0
    for(let i=0;i<N;i++){ ang.push(acc); acc+=(Math.PI*2/N)*rnd(0.45,1.75) }
    const norm=Math.PI*2/acc; for(let i=0;i<N;i++) ang[i]*=norm
    const ringsR=[10*K]; while(ringsR[ringsR.length-1] < 0.34*R){ ringsR.push(ringsR[ringsR.length-1]*rnd(1.4,1.9)) }
    const jit:number[][]=ringsR.map(()=>ang.map(()=>rnd(-0.14,0.14)))
    const jr:number[][]=ringsR.map((r)=> ang.map(()=> r*rnd(0.82,1.18)))
    const pt=(ri:number,i:number)=>{ const a=ang[i]+jit[ri][i], r=jr[ri][i]; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r] as [number,number] }
    for(let k=0;k<ringsR.length-1;k++){ for(let i=0;i<N;i++){
      const j=(i+1)%N; const A=pt(k,i),B=pt(k,j),C=pt(k+1,j),D=pt(k+1,i)
      x.beginPath(); x.moveTo(A[0],A[1]); x.lineTo(B[0],B[1]); x.lineTo(C[0],C[1]); x.lineTo(D[0],D[1]); x.closePath()
      const lit=rnd()>0.66
      x.fillStyle= lit ? `rgba(205,224,245,${rnd(0.06,0.16)})` : `rgba(110,140,175,${rnd(0.01,0.05)})`; x.fill()
      x.lineWidth=rnd(0.5,1.8)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.4,0.9)})`; glow(0.65); x.stroke(); noGlow()
    }}
    for(let i=0;i<N;i++){ if(rnd()<0.12) continue
      const a=ang[i]+rnd(-0.05,0.05); let px=cx,py=cy; x.beginPath(); x.moveTo(cx,cy)
      const seg=Math.round(rnd(5,9)), rmax=rnd(0.5,1.05)*R
      for(let g=1;g<=seg;g++){ const rr2=rmax*g/seg; px=cx+Math.cos(a)*rr2+rnd(-22,22)*K; py=cy+Math.sin(a)*rr2+rnd(-22,22)*K; x.lineTo(px,py) }
      x.lineWidth=rnd(0.6,2.6)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.4,0.9)})`; glow(0.5); x.stroke(); noGlow()
      for(let bn=0;bn<2;bn++){ if(rnd()>0.5) continue; const bt=rnd(0.35,0.85), bx=cx+(px-cx)*bt, by=cy+(py-cy)*bt, ba=a+rnd(-1.0,1.0), bl=rnd(50,190)*K
        x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+Math.cos(ba)*bl,by+Math.sin(ba)*bl); x.lineWidth=rnd(0.4,1.1)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.35,0.7)})`; x.stroke() } }
    for(let i=0;i<N;i++){ if(rnd()>0.4) continue; const j=(i+1)%N, r=rnd(0.34,0.6)*R
      const ax=cx+Math.cos(ang[i])*r, ay=cy+Math.sin(ang[i])*r, bx=cx+Math.cos(ang[j])*r*rnd(0.85,1.15), by=cy+Math.sin(ang[j])*r*rnd(0.85,1.15)
      const mxp=(ax+bx)/2+rnd(-30,30)*K, myp=(ay+by)/2+rnd(-30,30)*K
      x.beginPath(); x.moveTo(ax,ay); x.lineTo(mxp,myp); x.lineTo(bx,by); x.lineWidth=rnd(0.4,1.2)*K; x.strokeStyle=`rgba(255,255,255,${rnd(0.3,0.6)})`; x.stroke() }
    for(let i=0;i<340;i++){ const a=rnd(0,Math.PI*2), r=Math.pow(rnd(),1.7)*0.5*R+8; const gx=cx+Math.cos(a)*r, gy=cy+Math.sin(a)*r
      x.fillStyle=`rgba(255,255,255,${rnd(0.12,0.85)})`; const sz=rnd(0.4,2.4)*K; x.fillRect(gx,gy,sz,sz) }
    const cg=x.createRadialGradient(cx,cy,0,cx,cy,58*K); cg.addColorStop(0,'rgba(255,255,255,0.95)'); cg.addColorStop(0.35,'rgba(220,235,255,0.28)'); cg.addColorStop(1,'rgba(255,255,255,0)')
    x.fillStyle=cg; x.beginPath(); x.arc(cx,cy,58*K,0,7); x.fill()
    cv.style.width='100%'; cv.style.height='100%'
  }

  /* ---- intro: spinner runs until the crack in the audio, then the break ----
     CRACK_T is the measured impact transient in public/intro.mp3 (11.99 s clip:
     sharpest onset at 5.98 s, loudest at 6.24 s). The break is driven off
     snd.currentTime rather than a timer, so the shatter stays locked to the
     sound even if playback starts late or stalls. */
  const CRACK_T = 5.98
  const LOAD_MS = RM ? 400 : CRACK_T*1000
  const NO_INTERACT_MS = 12000        // never leave a silent visitor stuck
  function runIntro(){
    const bm=$('#bmload')!, crack=$('#crack')!, stage=$('#stage')!, tap=$('#tapBtn') as HTMLButtonElement, mask=$('#fsmask')!, intro=$('#intro')!
    const mr1=$('#mr1')!, mr2=$('#mr2')!, hint=$('#begin')!
    setTimeout(()=>{ muteBtn.classList.add('show'); hdBtn.classList.add('show') }, 500)

    let timelineStarted=false, broke=false
    function beginTimeline(withAudio:boolean){
      if(timelineStarted) return
      timelineStarted=true
      hint.classList.remove('show')
      if(withAudio && snd){
        // lock the shatter to the audio clock
        const watch=()=>{ if(broke) return
          if(snd.paused || snd.ended || snd.currentTime>=CRACK_T) return breakScreen()
          requestAnimationFrame(watch) }
        requestAnimationFrame(watch)
        setTimeout(()=>{ if(!broke) breakScreen() }, LOAD_MS+2500)   // stall guard
      } else {
        setTimeout(()=>{ if(!broke) breakScreen() }, LOAD_MS)
      }
    }

    // try to play immediately; only start the visuals once sound is really going
    startAudio().then(ok=>{
      if(ok) return beginTimeline(true)
      if(RM || muted) return beginTimeline(false)
      // autoplay blocked — hold the spinner and invite one click, then run
      // both together so the crack still lands on the sound
      hint.classList.add('show')
      const onFirst=()=>{ ;['pointerdown','keydown','touchstart'].forEach(ev=>removeEventListener(ev,onFirst))
        startAudio().then(ok2=>beginTimeline(ok2)) }
      ;['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,onFirst,{passive:true}))
      setTimeout(()=>{ if(!timelineStarted){ ;['pointerdown','keydown','touchstart'].forEach(ev=>removeEventListener(ev,onFirst)); beginTimeline(false) } }, NO_INTERACT_MS)
    })

    function breakScreen(){ if(broke) return; broke=true
      genShatter(crack); bm.classList.add('hide'); crack.classList.add('show'); intro.classList.add('breaking')
      const fl=$('#flash')!; fl.style.transition='none'; fl.style.opacity='0.97'; setTimeout(()=>{ fl.style.transition='opacity .5s'; fl.style.opacity='0' },70)
      setTimeout(()=>{ intro.classList.remove('breaking'); reveal() }, RM?0:600) }
    function reveal(){ stage.classList.add('show'); mask.classList.add('in')
      const type=(el:HTMLElement,word:string,done:()=>void)=>{ let i=0; (function t(){ if(i<=word.length){ el.textContent=word.slice(0,i); i++; setTimeout(t,RM?0:70) } else done() })() }
      setTimeout(()=>{ $('#mrtitle')!.classList.add('gl'); type(mr1,'HELLO',()=>type(mr2,'FRIEND',()=>tap.classList.add('show'))) }, RM?0:420) }
    function go(){ if(intro.classList.contains('gone')) return; intro.classList.add('gone'); $('#hud')!.classList.add('show'); $('#cue')!.classList.add('show') }
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
    if(nm!==mode){ mode=nm
      if(nm==='arch'){ work.classList.add('show'); if(!(window as any).__ag){(window as any).__ag=1;toast('Scroll to travel deeper — the library never ends · menu for About / Contact')} }
      else work.classList.remove('show')
      $('#flash')!.style.transition='none'; $('#flash')!.style.opacity='0.7'; flashT=now }
    if(flashT){ const e=(now-flashT)/650; if(e>=1){flashT=0;$('#flash')!.style.opacity='0'} else {$('#flash')!.style.transition='opacity .1s';$('#flash')!.style.opacity=String(0.7*(1-e))} }
    $('#namecard')!.style.opacity=String(clamp(1-prog/0.12,0,1))
    $('#rail')!.classList.toggle('show', mode==='arch')

    if(mode==='hole'){
      cmx+=(mx-cmx)*0.04; cmy+=(my-cmy)*0.04
      const dive=clamp(prog/DIVE,0,1)
      if(hd){
        ensureHD()
        hdMat.uniforms.u_res.value.set(renderer.domElement.width, renderer.domElement.height)
        hdMat.uniforms.u_time.value=t; hdMat.uniforms.u_dive.value=dive; hdMat.uniforms.u_mouse.value.set(cmx+t*0.03,cmy)
        renderer.render(hdScene,hdCam)
      } else {
        const dist=mix(15,6.6,dive), hgt=mix(3.1,1.5,dive)+cmy*1.4, orbit=t*0.05+cmx*0.45
        holeCam.position.set(Math.sin(orbit)*dist, hgt, Math.cos(orbit)*dist); holeCam.lookAt(0,0,0)
        diskTex.rotation += dt*0.00042; halo.quaternion.copy(holeCam.quaternion); stars.rotation.y += dt*0.00002
        renderer.render(holeScene,holeCam)
      }
    } else {
      // endless travel — camera advances forever, rings recycle around it
      const travel=(prog-DIVE)*TRAVEL
      const cz=-travel
      cmx+=(mx-cmx)*0.045; cmy+=(my-cmy)*0.045
      archCam.position.set(cmx*1.8, 0.6+cmy*1.0, cz)
      archCam.lookAt(cmx*0.7, 0.3, cz-22)
      lattice.rotation.z = Math.sin(t*0.06)*0.06          // gentle drift, no spin-induced nausea
      // treadmill: wrap every ring into the window ahead of the camera
      const SPAN=RINGS*CELL
      for(const r of rings){
        let rel = r.position.z - cz
        while(rel > CELL){ r.position.z -= SPAN; rel -= SPAN }
        while(rel < -(RINGS-1)*CELL){ r.position.z += SPAN; rel += SPAN }
      }
      for(const s of rays){ let rel=s.position.z-cz
        while(rel > CELL){ s.position.z -= SPAN; rel -= SPAN }
        while(rel < -(RINGS-1)*CELL){ s.position.z += SPAN; rel += SPAN } }
      for(const d of deep){ d.position.z = cz + (d as any).__dz; d.rotation.z += dt*0.00004 }
      shell.position.set(0,0,cz)
      const idx=((Math.floor(travel/CARD_SPAN) % PROJECTS.length)+PROJECTS.length)%PROJECTS.length
      showCard(idx)
      const dots=$('#rail')!.children; for(let i=0;i<dots.length;i++) dots[i].classList.toggle('on', i===idx)
      renderer.render(archScene,archCam)
    }
  }

  ;(window as any).__glinfo = () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles, textures: renderer.info.memory.textures, geoms: renderer.info.memory.geometries })

  runIntro(); loop()

  return () => {
    cancelAnimationFrame(raf); running=false
    removeEventListener('resize',onResize); document.removeEventListener('visibilitychange',onVis)
    removeEventListener('wheel',onWheel as any); removeEventListener('mousemove',onMove); removeEventListener('keydown',onKey)
    try{ renderer.dispose() }catch{}
  }
}
