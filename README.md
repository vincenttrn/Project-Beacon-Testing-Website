# Project Beacon

Marketing site for Project Beacon — hands-on robotics STEM incursions for NSW schools.

Built with React, Vite, and Tailwind CSS. Deployed on [Vercel](https://vercel.com).

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for Vercel only.

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Routing:** `vercel.json` rewrites all routes to `index.html` for React Router

Connect the GitHub repo in the Vercel dashboard. Every push to `main` triggers a production deploy automatically.
