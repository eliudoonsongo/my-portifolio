# Deployment Instructions

This portfolio can be deployed to multiple platforms. Choose the one that best fits your needs.

## Azure Static Web Apps (Recommended for Production)

Azure Static Web Apps provides free hosting with automatic SSL, global CDN, and seamless GitHub integration.

### Setup Steps

1. **Push to GitHub** (if not already done):
   ```powershell
   git init
   git add .
   git commit -m "chore: add Azure deployment"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

2. **Create Azure Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Click **Create a resource** → Search for **Static Web Apps**
   - Click **Create**

3. **Configure the App**:
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Name**: Enter a unique name (e.g., `eliud-portfolio`)
   - **Plan type**: Select **Free**
   - **Region**: Choose closest to your users
   - **Deployment details**:
     - Source: **GitHub**
     - Sign in and authorize Azure
     - Organization: Your GitHub username
     - Repository: Select this repository
     - Branch: **main**
   - **Build Details**:
     - Build Presets: **Custom**
     - App location: `/`
     - Output location: Leave empty (already static)

4. **Deploy**:
   - Click **Review + Create** → **Create**
   - Azure will automatically:
     - Add `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your GitHub repo
     - Trigger the workflow in `.github/workflows/deploy-azure.yml`
     - Deploy your site

5. **Access Your Site**:
   - After deployment completes (~2 minutes), your site will be live at:
     - `https://<generated-name>.azurestaticapps.net`
   - Find the URL in Azure Portal → Your Static Web App → Overview

### Custom Domain (Optional)

1. In Azure Portal → Your Static Web App → Custom domains
2. Click **Add** → Choose custom domain or apex domain
3. Follow the DNS configuration steps
4. Azure automatically provisions SSL certificate

---

## GitHub Pages (Quick and Free)

### Setup Steps

1. **Push to GitHub** (if not already done)
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** → **/ (root)** → Save

3. **The Workflow**:
   - `.github/workflows/deploy-gh-pages.yml` automatically deploys on every push to `main`
   - Your site will be live at: `https://<your-username>.github.io/<repo>/`

---

## Netlify (Drag & Drop)

### Quick Deploy

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your project folder
3. Site is live instantly with HTTPS

### Git Integration

1. Sign in to [Netlify](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose GitHub and select this repository
4. Build settings:
   - Base directory: Leave empty
   - Build command: Leave empty
   - Publish directory: `.`
5. Click **Deploy site**

---

## Vercel

### CLI Deploy

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Git Integration

1. Go to [Vercel](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Deploy with default settings

---

## After Deployment

### Test Your Site

- Visit your deployed URL
- Test all links and functionality
- Run Lighthouse audit (Chrome DevTools → Lighthouse)

### Monitor

- **Azure**: Check deployment status in Azure Portal → Static Web Apps → Environments
- **GitHub Pages**: Check Actions tab in GitHub repository
- **Netlify**: Check Deploys tab in Netlify dashboard
- **Vercel**: Check Deployments in Vercel dashboard

---

## Troubleshooting

### Azure Issues

- **Workflow fails**: Check that `AZURE_STATIC_WEB_APPS_API_TOKEN` secret exists in GitHub repo settings
- **404 errors**: Verify app location is `/` in workflow
- **Slow updates**: CDN cache may take a few minutes to refresh

### GitHub Pages Issues

- **Workflow fails**: Check that permissions are set in `.github/workflows/deploy-gh-pages.yml`
- **404 Page**: Ensure Pages is set to serve from `gh-pages` branch
- **Assets not loading**: Check that all paths are relative (not absolute)

### General Issues

- Clear browser cache
- Wait 2-5 minutes for DNS/CDN propagation
- Check deployment logs in respective platform

---

## Security Notes

- All platforms provide free SSL/TLS certificates
- HSTS headers are configured in `netlify.toml`, `vercel.json`, and `_headers`
- Only request HSTS preloading if you control the domain permanently
