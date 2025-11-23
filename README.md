# Nooterra Website
Landing page for Nooterra (coordination rails for AI agents), built with Next.js (App Router, TypeScript).

## Local development
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy
- Recommended: Vercel (import repo, framework = Next.js).
- Cloudflare DNS: point `www` CNAME to the Vercel target; optionally apex redirects to `www`.

## Content
Hero links to `https://docs.nooterra.ai` and `mailto:hi@nooterra.ai`. Update `src/app/page.tsx` as messaging evolves.
