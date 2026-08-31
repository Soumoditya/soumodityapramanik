/* Single source of truth for content used by both the experience (page.tsx)
   and the SEO metadata / structured data (layout.tsx), so the two can't drift. */

export type Project = {
  n: string; cat: string; accent: string; desc: string
  tags: string[]; cta: string; url: string | null
}

export const NAME = 'Soumoditya Pramanik'
export const SITE_URL = 'https://soumodityapramanik.in'
export const EMAIL = 'soumodityapramanik@gmail.com'
export const DESCRIPTION = 'Developer & maker from India. I build web apps, AI tools and interactive interfaces with React, Next.js and TypeScript.'

export const PROJECTS: Project[] = [
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

export const SOCIALS: [string,string][] = [
  ['GitHub','https://github.com/Soumoditya'],
  ['LinkedIn','https://www.linkedin.com/in/soumodityapramanik'],
  ['X','https://x.com/Soumodityax'],
  ['Instagram','https://www.instagram.com/soumodityapramanik'],
  ['YouTube','https://youtube.com/@soumodityapramanik'],
  ['Play Store','https://play.google.com/store/apps/dev?id=4693782516786119856'],
  ['Linktree','https://linktr.ee/soumodityapramanik'],
]

export const EDU = [
  { yr:'2022 — 2025', inst:'Brainware University', deg:'Bachelor of Computer Applications (BCA)', place:'Barasat' },
  { yr:'2020 & 2022', inst:'Rampurhat Jitendralal Vidyabhaban', deg:'Secondary & Higher Secondary', place:'Rampurhat' },
]

export const SKILLS = ['JavaScript','TypeScript','React','Next.js','Node.js','Tailwind CSS','Three.js','Android','Web Development','AI Tools']

/* Slugs for the per-project detail pages (/projects/<slug>/). Derived from the
   name so the project list stays the single source of truth. */
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
export const slugFor = (p: Project) => slugify(p.n)
export const getProjectBySlug = (slug: string) =>
  PROJECTS.find(p => slugFor(p) === slug)
