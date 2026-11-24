# Jia portfolio instructions

This is Jia’s Next.js portfolio. The two case studies are Tomo + Nomo and Trends of TUM. Edit portfolio content in `src/data/` and keep the writing in Jia’s voice as a frontend designer. Use plain language and focus on layout, interactions, and how the interface works on different screens.

## Help a teammate run it locally

When asked to run or preview the site, work from the repository root, where `package.json` and `package-lock.json` are located.

1. Run `node --version` and `npm --version`. The project needs Node.js 22 or newer. If either command is missing, direct the teammate to the [Node.js LTS installer](https://nodejs.org/en/download) and have them reopen their terminal after installing.
2. Run `npm ci` on a fresh clone or after the lockfile changes. This app runs locally without environment variables, a database, or API keys.
3. Start `npm run dev` and keep it running in a terminal. Open the **Local** URL Next.js prints, usually `http://localhost:3000`. If that port is in use, use the URL Next.js chooses or try `npm run dev -- --port 3001`.
4. Check that the homepage loads and that `/work/tomo-nomo` and `/work/trends-of-tum` open. Give the teammate the working URL and tell them to press **Ctrl+C** in the server terminal to stop it.

On Windows, use `npm.cmd ci` and `npm.cmd run dev` if PowerShell blocks `npm.ps1`. If OpenCode cannot keep a terminal running, give the teammate the dev command to run in a terminal they can leave open.

## Verify changes

Run `npm run lint`, `npm run typecheck`, and `npm run build` after changing the app. Use `npm start` after a successful build to preview the production version locally.
