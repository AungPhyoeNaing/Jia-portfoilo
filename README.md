# Jia — The Art of Digital Feeling

An editorial portfolio for an independent frontend designer. The homepage opens with *Continuum*, a matcha-green glass ribbon, and leads into two frontend projects, Jia’s approach, and a contact section.

## Start with OpenCode

Install [Git](https://git-scm.com/install) and [Node.js LTS](https://nodejs.org/en/download) if you need them. Open a terminal in the folder where you want to keep the project and run the following commands.

```text
git clone https://github.com/AungPhyoeNaing/Jia-portfoilo.git
cd Jia-portfoilo
opencode
```

If you use the OpenCode desktop app, open the cloned `Jia-portfoilo` folder in the app. Paste the following prompt into OpenCode.

> Set up this portfolio and run it locally. Follow AGENTS.md, check that the homepage opens, and give me the URL and how to stop the server.

The repo’s [OpenCode instructions](AGENTS.md) give the agent the setup and verification steps. [OpenCode project instructions documentation](https://opencode.ai/docs/instructions/)

## Local development

This project uses Node.js 22 or newer and npm. The lockfile pins the resolved dependencies.

```bash
npm ci
npm run dev
```

Open the **Local** URL printed in the terminal, usually [localhost:3000](http://localhost:3000). Keep the terminal open while you use the site. Press **Ctrl+C** there to stop it. If PowerShell blocks `npm.ps1`, use `npm.cmd ci` and `npm.cmd run dev`.

Use these commands to check and preview the production build.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Edit the portfolio

| File | Content |
| --- | --- |
| `src/data/profile.ts` | Name, professional title, introduction, biography, process, photo, team award, email, availability, résumé, and the optional Lenis setting |
| `src/data/projects.ts` | Project order, labels, role, technologies, artwork, case study sections, and optional live demo and source URLs |
| `src/data/skills.ts` | Confirmed capabilities and optional tools |
| `src/data/socials.ts` | Social profiles |
| `src/lib/site.ts` | Site title, description, and structured data |
| `src/styles/` | Semantic tokens, glass variants, homepage composition, case study layouts, and motion |

- Add local images and résumé files under `public/`, then reference their paths from the relevant data file. Give each meaningful image a descriptive alt value. For externally hosted images, add an explicit Next.js image allowlist entry in `next.config.ts`.
- Add Jia’s real email to enable both the mailto link and clipboard action. Optional socials, availability, résumé, demo links, and source links render only when populated.
- Edit the text, cover image, date, and palette in the same project record. Each project’s `slug` creates its URL under `/work/`. The `wide` and `split` layouts change the opening composition. Use `concept: true` to label an added project as a concept study.
- Write case studies from Jia’s perspective as a frontend designer. Focus on the layout, interactions, and how the interface works across screen sizes.
- Review the editable first-person biography with Jia before publishing. The fern-and-glass still life appears when a portrait is unavailable.

## How the experience works

The App Router prerenders the homepage and case studies. Tailwind supplies the CSS foundation. The custom tokens define semantic colors for each theme, and five layered CSS materials handle glass tint, edge highlights, shadows, and blur. Next.js optimizes local raster artwork and self-hosts the typefaces through `next/font/local`. Cormorant Garamond and Manrope are licensed under the SIL Open Font License 1.1. Their license files are bundled in `src/app/fonts/`.

GSAP and ScrollTrigger load as visitors reach the editorial sections and handle the statement, exhibit reveals, process lighting, and hero parallax. Motion loads for the process panels on interaction. Set `smoothScroll: true` in `profile.ts` to enable Lenis for fine pointers at normal motion settings. Native scrolling is the default and anchor links work independently.

The hero starts with a still photograph in either theme. The **Explore in 3D** control appears on eligible fine-pointer desktops at 900 px and wider. It loads a single React Three Fiber canvas with a procedural ribbon, Drei transmission and environment lighting, a capped pixel ratio, and three transmission samples. Rendering pauses offscreen and when the tab is hidden. Reduced-motion and constrained devices use the still, and a runtime rendering failure restores it.

## Deploy to Vercel Hobby

1. Push the repository to a Git provider connected to your Vercel account.
2. In Vercel, import the repository into a personal Hobby project. Select **Next.js**, keep the repository root, and choose Node.js 22 or newer. The default install and build settings work.
3. Set the production environment variable `SITE_URL` to your final origin, including `https://`. Use the assigned Vercel domain or the custom domain you intend to keep. Redeploy after changing it so the canonical URLs, sitemap, and social metadata pick up the new origin.
4. Deploy, then check the homepage, the case studies, `/robots.txt`, and `/sitemap.xml` on your public URL.

The project has no database, paid API, or server-side email integration. Vercel Hobby is subject to its personal-use terms and usage limits. [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)

## Verification

The production build, ESLint, and TypeScript checks passed. Chromium browser checks exercised the homepage and case studies, mobile menu keyboard behavior, theme persistence, reduced motion, the custom 404, and a simulated WebGL context loss. Automated axe scans covered the homepage in both themes and at a mobile screen size.

Local Lighthouse results for the production homepage:

| Profile | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 93 | 100 | 100 | 100 | 3.2 s | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 |

Mobile lab LCP exceeded the 2.5 s target. Field INP and live deployment performance remain unmeasured.

## Original artwork

The sculpture and botanical still life were made with the built-in ImageGen tool and optimized to WebP. The social JPG combines the day sculpture with a typographic lockup. The Tomo + Nomo cover uses a screenshot of the live arcade, and the Trends of TUM cover shows the original frontend running locally with sample posts.

| Saved asset | Generation direction |
| --- | --- |
| `public/images/sculpture.webp` | A single large sculptural loop of solid transparent pale matcha glass, handmade as a flattened, gracefully twisted continuous ribbon. Photograph the diagonal, asymmetrical loop in a bright pearlescent gallery with believable jade refraction and soft caustics. Keep the full sculpture within a portrait frame with space around it. |
| `public/images/sculpture-night.webp` | Use the day image as the edit reference. Keep its glass shape, orientation, proportion, and placement. Move the scene into a deep forest green-black gallery with luminous sage edges, restrained white reflections, and faint pools of green caustic light. |
| `public/images/material-study.webp` | An editorial still life with two ribbed celadon glass sheets curving upward from pearl stone and a living fern between them. Use close gallery photography, angled sunlight, and a pale matcha palette. |
