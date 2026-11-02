# Mewarix Infotech website
Next.js 14 (App Router) + TypeScript + Tailwind. Content lives in `lib/site.ts`.
## Run locally
`npm install && cp .env.example .env.local && npm run dev`
## Setup
1. **Supabase**: create a project, run `supabase/schema.sql` in the SQL editor, copy the URL and service-role key.
2. **Resend**: create an API key; verify your domain to email customers (the default sender only reaches your own address).
3. **Turnstile**: create a widget in Cloudflare, copy both keys.
4. **Vercel**: import the repo, add every variable from `.env.example` under Settings → Environment Variables, deploy.
5. Production refuses submissions if Turnstile or Supabase is unconfigured.
## Checks
`npm run typecheck && npm run build`
## Notes
Logo is a text wordmark: drop your logo into `public/` and update `components/Header.tsx`. Privacy/Terms are drafts needing legal review. Analytics (GA4) is not wired yet; `NEXT_PUBLIC_GA_ID` is reserved.
