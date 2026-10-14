# HSR Snooker Cafe — Website

A cinematic one-page website for **HSR Snooker Cafe**, a snooker and pool hall with a cafeteria in HSR Layout, Bengaluru.

Built with React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons (Vite).

## Run locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Editing content

| What | File |
|---|---|
| Name, phone, address, closing time, rating, review excerpts, links | `src/config/business.ts` |
| Photos | `src/config/images.ts` |
| Page title, description, structured data | `index.html` |

- **Photos.** Every image slot has designed fallback art, so it never shows a broken image. The snooker visuals (hero, The Table, The Crew) are illustrated in SVG until real photos are added. The café slots use stock coffee and food photos. For the best result, put real venue photos in `public/photos/` and reference them as `'./photos/your-file.jpg'`.
- **No invented details.** There are no prices, menu items, table counts or opening hours beyond the listed 1:00 AM closing time. Add them only once they're confirmed.
- **Instagram.** The icon appears in the footer only after you add a verified URL to `links.instagram`.
- **Structured data.** If you change the phone number or address, update the JSON-LD block in `index.html` too.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Motion & accessibility

- Framer Motion handles staggered word reveals, scroll-triggered sections, parallax, the scroll-driven "One More Frame" cue-ball path, a magnetic CTA hover (desktop only) and the animated nav indicator.
- `prefers-reduced-motion` is respected throughout. Content is never hidden behind an animation for those users.
- The site is keyboard accessible, with visible focus states and a skip link. The Google Map loads only when you scroll near it.
