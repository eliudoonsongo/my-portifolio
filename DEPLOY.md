# Deployment instructions

Short steps to deploy this static site with HTTPS so you can run Lighthouse audits:

- GitHub Pages (recommended for quick HTTPS):
  1. Create a new GitHub repo and push this project. Example:

```powershell
git init
git add .
git commit -m "chore: add pwa + deploy configs"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

  2. The included GitHub Actions workflow will publish the repo root to the `gh-pages` branch on pushes to `main`.
  3. After the action runs, enable Pages or visit `https://<your-username>.github.io/<repo>/`.

- Netlify:
  - Drag-and-drop the repo folder onto Netlify Drop, or connect the Git repo in Netlify and set `publish` directory to `.`.
  - Netlify will serve the site over HTTPS; the `_headers` and `netlify.toml` add an HSTS header.

- Vercel:
  - Install the Vercel CLI: `npm i -g vercel`.
  - Run `vercel` to link and deploy, or connect the Git repo in the Vercel dashboard. `vercel.json` adds HSTS header.

After deployment:
- Wait for the site URL to provision TLS (usually immediate), then run Lighthouse against the HTTPS URL to validate installability and PWA audits.

Security note on HSTS/preload:
- HSTS is enabled in the configs with `max-age=63072000; includeSubDomains; preload`.
- Only request preloading to the HSTS preload list once you control the domain (not for temporary demo URLs).
