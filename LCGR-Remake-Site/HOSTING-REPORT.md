# Hosting Report: LGBT Center of Greater Reading Website

**Prepared:** March 2026
**Project:** LCGR Remake Site
**Stack:** Next.js frontend + Node.js/Express/SQLite backend + React/Vite CMS admin

---

## Table of Contents

1. [Stack Overview & Requirements](#1-stack-overview--requirements)
2. [Platform Comparison](#2-platform-comparison)
3. [Detailed Platform Breakdown](#3-detailed-platform-breakdown)
4. [Recommended Architecture](#4-recommended-architecture)
5. [Nonprofit Discounts](#5-nonprofit-discounts)
6. [Domain Costs](#6-domain-costs)
7. [Final Recommendation](#7-final-recommendation)
8. [Deployment Checklist](#8-deployment-checklist)

---

## 1. Stack Overview & Requirements

| Component | Technology | Notes |
|-----------|-----------|-------|
| Frontend | Next.js (React) | ~26 pages, images via unoptimized mode, can be exported as static |
| Backend | Node.js + Express + better-sqlite3 | REST API, file uploads via multer, JWT auth |
| CMS Admin | React + Vite | SPA, can be built as static files |
| Database | SQLite via better-sqlite3 | <50MB, file-based, no external DB needed |
| File Storage | Uploaded images (multer) | 500MB-1GB total |
| Traffic | Low | ~100-500 visitors/month |

### Key Architectural Insight

- **The Next.js frontend uses `unoptimized: true` for images**, meaning it does NOT use Next.js Image Optimization. This means the frontend can be exported as a fully static site using `next export` (or `output: 'export'` in next.config.js).
- **The CMS admin (Vite/React)** is already a static SPA -- just run `npm run build` and serve the `dist/` folder.
- **The backend** is the only component that MUST run as a server process (Express + SQLite + file uploads).
- **SQLite** is file-based, so no external database service is needed. This saves significant money.

**This means: 2 of the 3 components can be deployed as static files for free.** Only the backend needs a running server.

---

## 2. Platform Comparison Summary

| Platform | Monthly Cost | Free Tier | Hosts All 3? | SSL | Custom Domain | Best For |
|----------|-------------|-----------|---------------|-----|---------------|----------|
| **Render** | $0-7 | Yes (with limits) | Yes | Yes | Yes | Best overall value |
| **Railway** | $0-5 | $5 credit/mo | Yes | Yes | Yes | Easy deployment |
| **Fly.io** | $0-5 | Yes (generous) | Yes | Yes | Yes | Technical users |
| **Vercel + Render** | $0 + $0-7 | Yes | Split deploy | Yes | Yes | Best Next.js experience |
| **DigitalOcean** | $4-6 | None (but $200 credit) | Yes (VPS) | Manual/Yes | Yes | Full control |
| **AWS Lightsail** | $3.50-5 | 3 months free | Yes (VPS) | Manual | Yes | AWS ecosystem |
| **Netlify + Render** | $0 + $0-7 | Yes | Split deploy | Yes | Yes | Great static hosting |
| **Oracle Cloud** | **$0** | Always Free tier | Yes (VPS) | Manual | Yes | Truly free forever |
| **Cloudflare Pages + VPS** | $0 + $3.50-6 | Yes | Split deploy | Yes | Yes | Best performance |

---

## 3. Detailed Platform Breakdown

### 3.1 Render

**Website:** render.com

| Feature | Details |
|---------|---------|
| **Free Tier** | 1 web service (spins down after 15 min inactivity, ~50s cold start), 750 hours/month |
| **Paid Tier** | Starter at $7/mo per service (always on) |
| **Can Host All 3?** | Yes -- backend as web service, frontend + CMS as static sites (free) |
| **SSL** | Included, auto-provisioned Let's Encrypt |
| **Custom Domain** | Yes, included on all tiers |
| **Storage** | Persistent disk available ($0.25/GB/mo on paid, NOT available on free tier) |

**Cost Estimate:**
- Frontend: Static site = **$0/mo**
- CMS Admin: Static site = **$0/mo**
- Backend: Free tier = **$0/mo** (with cold starts) OR Starter = **$7/mo** (always on)
- Persistent Disk (1GB for uploads): **$0.25/mo** (paid tier only)
- **Total: $0/mo (free tier) or $7.25/mo (paid)**

**Pros:**
- Static site hosting is genuinely free with no limits that matter for this project
- Very easy deployment from GitHub -- push to deploy
- Managed SSL and custom domains
- Dashboard is clean and simple

**Cons:**
- Free tier web services spin down after inactivity (50-second cold start for first visitor)
- Free tier does NOT support persistent disks (uploaded images would be lost on redeploy)
- The cold start issue means the CMS admin and API would be slow on first load after idle periods

**Verdict:** Great if you go paid ($7/mo). Free tier is problematic because uploaded images won't persist.

---

### 3.2 Railway

**Website:** railway.app

| Feature | Details |
|---------|---------|
| **Free Tier** | Trial plan: $5 free credit/month, 500 hours execution |
| **Paid Tier** | Hobby at $5/mo + usage (typically $0-3 for low traffic) |
| **Can Host All 3?** | Yes, as separate services or one combined service |
| **SSL** | Included |
| **Custom Domain** | Yes, included |
| **Storage** | 1GB included, volumes available |

**Cost Estimate:**
- All three as one service (serve static files from Express): **$5/mo** (hobby plan) + ~$0-2 usage
- Or split: backend on Railway + static frontend elsewhere = **$5/mo** base
- **Total: $5-7/mo**

**Pros:**
- Extremely easy deployment -- connect GitHub repo and deploy
- Good CLI tools
- Supports persistent volumes (SQLite data survives redeploys)
- Can run everything from a single Dockerfile

**Cons:**
- $5/mo minimum on Hobby plan (the free credit isn't quite enough for always-on service)
- Trial plan has execution hour limits
- Less generous free tier than Render

**Verdict:** Simple and reliable. Good option at $5-7/mo.

---

### 3.3 Fly.io

**Website:** fly.io

| Feature | Details |
|---------|---------|
| **Free Tier** | 3 shared-cpu-1x VMs, 3GB persistent volumes, 160GB bandwidth |
| **Paid Tier** | Pay as you go beyond free allowances |
| **Can Host All 3?** | Yes -- all in one VM or separate VMs |
| **SSL** | Included |
| **Custom Domain** | Yes, included |
| **Storage** | 3GB persistent volumes free |

**Cost Estimate:**
- Single VM running all 3 components: **$0/mo** (within free tier)
- Persistent volume for SQLite + uploads: **$0/mo** (under 3GB free)
- **Total: $0/mo** (genuinely free for this use case)

**Pros:**
- Generous free tier -- 3 VMs and 3GB volumes
- Persistent volumes mean SQLite and uploads survive restarts
- VMs don't spin down on the free tier (always on)
- Global edge deployment
- Good for Docker-based deployments

**Cons:**
- Requires a credit card even for free tier
- More complex setup -- uses Dockerfiles and `fly.toml` config
- Steeper learning curve than Render/Railway
- Free tier terms can change; they've adjusted them before
- CLI-focused workflow

**Verdict:** Best truly free option if you're comfortable with Docker. Everything can run on one VM for $0/mo.

---

### 3.4 Vercel (Frontend Only) + Separate Backend

**Website:** vercel.com

| Feature | Details |
|---------|---------|
| **Free Tier** | Hobby plan: unlimited static sites, 100GB bandwidth, serverless functions |
| **Can Host Backend?** | Not well -- no persistent filesystem, no SQLite, serverless only |
| **SSL** | Included |
| **Custom Domain** | Yes, 1 per project on Hobby |

**Cost Estimate:**
- Frontend on Vercel: **$0/mo**
- CMS Admin on Vercel: **$0/mo** (second project)
- Backend: Must be hosted elsewhere (see other platforms)
- **Total: $0/mo for frontend + backend hosting cost**

**Pros:**
- Best-in-class Next.js hosting (they created Next.js)
- Zero-config deployment from GitHub
- Excellent performance, global CDN
- Preview deployments for every PR
- Analytics built in

**Cons:**
- CANNOT host the Express/SQLite backend -- Vercel is serverless only
- No persistent filesystem for uploaded images
- Must split your deployment across two platforms
- Hobby plan is for personal/non-commercial use (nonprofit may not qualify)

**Verdict:** Best for the frontend alone, but you still need somewhere for the backend. This creates split-deployment complexity.

---

### 3.5 DigitalOcean

**Website:** digitalocean.com

| Feature | Details |
|---------|---------|
| **Cheapest VPS** | $4/mo (512MB RAM, 10GB SSD) or $6/mo (1GB RAM, 25GB SSD) |
| **App Platform** | $5/mo per component (basic) |
| **Free Tier** | No free tier, but $200 in credits for 60 days for new accounts |
| **Can Host All 3?** | Yes, on a single Droplet (VPS) |
| **SSL** | Manual setup with Let's Encrypt (on Droplet) or included (App Platform) |
| **Custom Domain** | Yes |

**Cost Estimate:**
- Single $6/mo Droplet running everything: **$6/mo**
- Or $4/mo Droplet if 512MB RAM is enough (tight but possible for Node.js): **$4/mo**
- **Total: $4-6/mo**

**Pros:**
- Full control over the server -- install anything
- Predictable pricing, no surprise bills
- 1GB RAM Droplet is more than enough for this stack
- Huge community with tutorials for every setup imaginable
- Can run everything on one server: Nginx + Node.js + static files
- Persistent storage is just the disk -- no special volumes needed
- Nonprofit discounts available (see Section 5)

**Cons:**
- You manage the server: security updates, firewall, SSL renewal, backups
- No automatic deploys from GitHub (unless you set up CI/CD yourself)
- More DevOps knowledge required
- SSL setup is manual (certbot + Let's Encrypt, but straightforward)

**Verdict:** Best value if you're comfortable with Linux server administration. $6/mo gets you a real server.

---

### 3.6 AWS Lightsail

**Website:** aws.amazon.com/lightsail

| Feature | Details |
|---------|---------|
| **Cheapest Plan** | $3.50/mo (512MB RAM, 20GB SSD) or $5/mo (1GB RAM, 40GB SSD) |
| **Free Tier** | First 3 months free on the $3.50 or $5 plan |
| **Can Host All 3?** | Yes, on a single instance |
| **SSL** | Manual setup with Let's Encrypt or use Lightsail load balancer ($18/mo -- not worth it) |
| **Custom Domain** | Yes, via Route 53 or external DNS |

**Cost Estimate:**
- Single $5/mo instance running everything: **$5/mo** (first 3 months free)
- **Total: $5/mo**

**Pros:**
- Predictable pricing (unlike regular AWS which can surprise you)
- 3 months free to get started
- Simple AWS interface, not overwhelming like full AWS console
- 1TB bandwidth included
- Snapshots for backups ($0.05/GB/mo)
- Can upgrade to full AWS services later if needed

**Cons:**
- Same server management burden as DigitalOcean
- AWS account complexity (billing alerts recommended)
- Slightly less community support than DigitalOcean for beginners
- SSL is manual

**Verdict:** Slightly cheaper than DigitalOcean, same trade-offs. Good option.

---

### 3.7 Netlify (Frontend/CMS Only) + Separate Backend

**Website:** netlify.com

| Feature | Details |
|---------|---------|
| **Free Tier** | 100GB bandwidth, 300 build minutes/month, 1 concurrent build |
| **Can Host Backend?** | No -- static/serverless only, no persistent filesystem |
| **SSL** | Included |
| **Custom Domain** | Yes |

**Cost Estimate:**
- Frontend (static export): **$0/mo**
- CMS Admin (static build): **$0/mo**
- Backend: Must be hosted elsewhere
- **Total: $0/mo for frontend + backend hosting cost**

**Pros:**
- Excellent free tier for static sites
- Form handling, identity (auth), and serverless functions built in
- Easy GitHub integration, deploy previews
- Great for the static Next.js export + CMS admin SPA

**Cons:**
- Cannot host Express/SQLite backend
- Same split-deployment issue as Vercel
- Next.js support is not as seamless as Vercel (no ISR, limited middleware)

**Verdict:** Good free option for the static parts. Pair with a cheap backend host.

---

### 3.8 Oracle Cloud (Always Free Tier)

**Website:** cloud.oracle.com

| Feature | Details |
|---------|---------|
| **Free Tier** | Always Free: 2 AMD VMs (1GB RAM each) + 200GB block storage + 10TB bandwidth |
| **Can Host All 3?** | Yes, on a single VM |
| **SSL** | Manual (Let's Encrypt) |
| **Custom Domain** | Yes |

**Cost Estimate:**
- Single Always Free VM: **$0/mo forever**
- **Total: $0/mo**

**Pros:**
- Truly free forever (not a trial)
- More generous than any other free tier: 1GB RAM, 200GB storage
- Can run the entire stack on one VM
- 10TB/month bandwidth (absurdly generous)

**Cons:**
- Oracle Cloud's UI is confusing and poorly documented
- Free tier VMs can be reclaimed if Oracle considers them idle (rare but reported)
- Smaller community than AWS/DO -- fewer tutorials
- Account creation can be finicky (sometimes rejects credit cards)
- Slower provisioning and less reliable than paid alternatives
- The "free forever" promise has caveats

**Verdict:** If it works, it's the cheapest option (literally free). But reliability and UX concerns make it a gamble for production.

---

### 3.9 Cloudflare Pages + Cheap VPS

**Website:** pages.cloudflare.com

| Feature | Details |
|---------|---------|
| **Free Tier** | Unlimited bandwidth, 500 builds/month, unlimited sites |
| **Can Host Backend?** | Only via Workers (serverless, no SQLite file system) |
| **SSL** | Included |
| **Custom Domain** | Yes |

**Cost Estimate:**
- Frontend + CMS on Cloudflare Pages: **$0/mo**
- Backend on a $3.50-6 VPS: **$3.50-6/mo**
- Cloudflare as CDN/proxy for the backend too: **$0/mo**
- **Total: $3.50-6/mo**

**Pros:**
- Cloudflare Pages has the most generous free tier for static hosting (unlimited bandwidth)
- Cloudflare's CDN provides security (DDoS protection) and speed
- Can proxy API requests through Cloudflare for added security
- Truly unlimited bandwidth on free plan

**Cons:**
- Split deployment (static on CF Pages, backend on VPS)
- Still need server management for the VPS
- Slightly more complex DNS/proxy setup

**Verdict:** Best performance-to-cost ratio. Free static hosting + cheap backend VPS.

---

## 4. Recommended Architecture

### Option A: Cheapest Possible ($0/mo) -- Fly.io All-in-One

```
[Fly.io VM - Free Tier]
  |-- Nginx (reverse proxy)
  |-- Node.js/Express Backend (port 3001)
  |     |-- SQLite database
  |     |-- /uploads directory
  |-- Next.js Static Export (served by Nginx)
  |-- CMS Admin Static Build (served by Nginx)

Persistent Volume: SQLite DB + uploaded images
```

**Setup:**
1. Build Next.js as static export (`next build` with `output: 'export'` in next.config.js)
2. Build CMS admin (`npm run build`)
3. Create a single Dockerfile that runs Nginx + Node.js
4. Nginx serves static files and proxies `/api/*` to Express
5. Attach a Fly.io persistent volume for the database and uploads

**Total: $0/mo** (requires credit card on file)

---

### Option B: Best Value ($5-7/mo) -- Render or DigitalOcean

#### Option B1: Render (Easiest)

```
[Render - Starter $7/mo]
  |-- Web Service: Express Backend
  |     |-- Serves API at /api/*
  |     |-- Serves Next.js static build at /*
  |     |-- Serves CMS admin at /admin/*
  |     |-- SQLite on persistent disk
  |     |-- Uploads on persistent disk
  |-- Persistent Disk: 1GB ($0.25/mo)
```

Everything runs from one Express server. Express serves the static frontend files, the CMS admin files, and the API. Total: **$7.25/mo**.

#### Option B2: DigitalOcean Droplet (Most Control)

```
[DigitalOcean Droplet - $6/mo, 1GB RAM]
  |-- Nginx
  |     |-- Serves Next.js static build (port 80/443)
  |     |-- Serves CMS admin at /admin
  |     |-- Proxies /api/* to Express
  |-- Node.js/Express (port 3001)
  |     |-- SQLite database
  |     |-- Uploads directory
  |-- Let's Encrypt SSL (auto-renewal via certbot)
```

Total: **$6/mo**. You manage the server.

---

### Option C: Split Deploy ($0-7/mo) -- Best of Both Worlds

```
[Vercel or Cloudflare Pages - Free]            [Render Free or Fly.io Free]
  |-- Next.js Frontend                           |-- Express Backend
  |-- CMS Admin (separate project)               |-- SQLite database
         |                                        |-- Uploads
         |         API calls                      |
         +----------------------------------------+
```

- Frontend + CMS: Free on Vercel/Cloudflare Pages
- Backend: Free on Fly.io (with persistent volume) or $7/mo on Render
- **Total: $0-7/mo**

**Note:** Split deployment adds CORS configuration complexity and you need to manage two deployments.

---

### Can the Frontend Be Static?

**Yes.** Your `next.config.js` already has `images: { unoptimized: true }`, which means you're not using Next.js Image Optimization. You can add `output: 'export'` to generate a fully static site:

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

This generates a static `out/` directory that can be served by any web server or static hosting platform for free.

### Can the CMS Admin Be Static?

**Yes.** It's a Vite/React SPA. Run `npm run build` and you get a `dist/` folder with static HTML/JS/CSS. Serve it from anywhere.

### Can Everything Run on One Server?

**Yes.** The Express backend can serve the static frontend and CMS admin files directly:

```js
// Serve Next.js static export
app.use(express.static('frontend/out'));

// Serve CMS admin
app.use('/admin', express.static('cms-admin/dist'));

// API routes
app.use('/api', apiRoutes);

// SPA fallback for frontend
app.get('*', (req, res) => {
  res.sendFile('frontend/out/index.html');
});
```

This is the simplest and cheapest approach -- one server, one deployment, one domain.

---

## 5. Nonprofit Discounts

| Platform | Nonprofit Program | Discount | How to Apply |
|----------|-------------------|----------|--------------|
| **Google Cloud** | Google for Nonprofits | $2,000/year in credits | Apply at google.com/nonprofits (requires 501(c)(3)) |
| **Microsoft Azure** | Azure for Nonprofits | $3,500/year in credits | Apply via Microsoft Nonprofits portal |
| **AWS** | AWS Imagine Grant | $1,000-10,000 in credits | Apply via aws.amazon.com/government-education/nonprofits |
| **DigitalOcean** | Hatch Program / Hub for Good | Up to $1,500 in credits | Apply at digitalocean.com/community/pages/hollies-hub-for-good |
| **Cloudflare** | Project Galileo | Free Pro/Business features | For organizations that promote human rights -- LGBTQ+ centers likely qualify |
| **GitHub** | GitHub for Nonprofits | Free GitHub Team | Apply via github.com/nonprofit |
| **1Password** | Teams for Nonprofits | Free Teams plan | For registered nonprofits |
| **Vercel** | No formal program | Case-by-case | Contact sales, mention nonprofit status |
| **Render** | No formal program | None documented | Worth asking via support |
| **Railway** | No formal program | None documented | Worth asking via support |
| **Fly.io** | No formal program | None documented | Worth asking via support |
| **TechSoup** | Tech marketplace | Discounted software/services | techsoup.org -- verify 501(c)(3) status here first |

### Most Relevant for This Project

1. **Cloudflare Project Galileo** -- The LGBT Center of Greater Reading likely qualifies as a human rights / civil liberties organization. This would give free Cloudflare Pro features including enhanced security, WAF, and CDN. Definitely apply.

2. **DigitalOcean Hub for Good** -- Could get up to $1,500 in credits, which would cover a $6/mo Droplet for over 20 years.

3. **Google for Nonprofits** -- The $2,000/year credit is very generous but Google Cloud is more complex to manage than needed for this project.

4. **GitHub for Nonprofits** -- Free GitHub Team features for the repository hosting.

---

## 6. Domain Costs

### .org Domain Pricing

| Registrar | First Year | Renewal | WHOIS Privacy | Notes |
|-----------|-----------|---------|---------------|-------|
| **Cloudflare Registrar** | ~$10.11/yr | ~$10.11/yr | Free | At-cost pricing, no markup |
| **Namecheap** | ~$9.98/yr | ~$13.98/yr | Free (WhoisGuard) | First year discounts often available |
| **Porkbun** | ~$9.73/yr | ~$11.73/yr | Free | Great budget option |
| **Google Domains** | Discontinued (transferred to Squarespace) | -- | -- | No longer available |
| **GoDaddy** | ~$9.99/yr | ~$22.99/yr | $10/yr extra | Avoid -- high renewals and upsells |
| **Squarespace Domains** | ~$20/yr | ~$20/yr | Free | Simple but more expensive |

### Recommendation: Cloudflare Registrar or Porkbun

- Cloudflare sells domains at wholesale cost with no markup. ~$10/yr with free WHOIS privacy.
- Porkbun is the cheapest overall and has excellent UX.
- Avoid GoDaddy -- they lure you in with low first-year prices then charge 2-3x on renewal.

### Domain Suggestions

Check availability for:
- `lgbtcenterreading.org`
- `lcgr.org` (may be taken)
- `lgbtreading.org`
- `readinglgbtcenter.org`

**Note:** The organization may already own a domain. Check if the current site has one that can be reused.

**Estimated annual domain cost: $10-12/year (~$0.85-1.00/month)**

---

## 7. Final Recommendation

### For a Nonprofit on a Budget: DigitalOcean ($6/mo) or Fly.io ($0/mo)

#### Primary Recommendation: DigitalOcean Droplet ($6/mo)

**Why DigitalOcean wins:**

1. **$6/mo is affordable and predictable** -- no surprise bills, no free tier changes
2. **Full control** -- run everything on one server with one deployment
3. **Persistent storage built in** -- SQLite and uploads just live on disk, no special volumes
4. **Nonprofit discount potential** -- Hub for Good could make it free for years
5. **Massive tutorial library** -- easy to find help for any setup question
6. **Reliable** -- enterprise-grade infrastructure, 99.99% uptime SLA
7. **Simple to understand** -- it's just a Linux server, no platform-specific abstractions

**Architecture:**
```
DigitalOcean Droplet ($6/mo, 1GB RAM, 25GB SSD)
  |-- Ubuntu 22.04 or 24.04
  |-- Nginx (reverse proxy + static file server)
  |     |-- /         -> Next.js static export
  |     |-- /admin    -> CMS admin static build
  |     |-- /api      -> proxy to localhost:3001
  |-- Node.js + Express (port 3001)
  |     |-- SQLite database (file on disk)
  |     |-- /uploads (images on disk)
  |-- Let's Encrypt SSL (auto-renewed via certbot)
  |-- PM2 (process manager to keep Node.js running)
```

**Monthly Cost Breakdown:**

| Item | Cost |
|------|------|
| DigitalOcean Droplet (1GB) | $6.00/mo |
| Domain (.org via Cloudflare) | ~$0.85/mo |
| SSL (Let's Encrypt) | $0.00 |
| **Total** | **~$6.85/mo (~$82/year)** |

#### Budget Alternative: Fly.io ($0/mo)

If $6/mo is too much, Fly.io's free tier can host everything:

| Item | Cost |
|------|------|
| Fly.io VM (free tier) | $0.00/mo |
| Fly.io Volume (3GB free) | $0.00/mo |
| Domain (.org via Porkbun) | ~$0.85/mo |
| **Total** | **~$0.85/mo (~$10/year, domain only)** |

**Risk:** Free tiers can change. Fly.io has adjusted their free tier before. For a community organization's website, a paid $6/mo plan provides more peace of mind.

#### Best Free-Forever Setup: Static Frontend + Managed Database

If you are willing to refactor the backend to not use file-based SQLite (e.g., switch to a free cloud database like Turso, PlanetScale free tier, or Supabase free tier), the entire stack could be hosted for free:

- Frontend: Vercel or Cloudflare Pages (free)
- CMS Admin: Same platform (free)
- Backend: Vercel serverless functions or Cloudflare Workers (free)
- Database: Turso (free tier, 8GB, SQLite-compatible) or Supabase (free, PostgreSQL)

**This would require backend code changes** and is only worth considering if budget is the absolute top priority.

---

## 8. Deployment Checklist

### For the Recommended DigitalOcean Setup

- [ ] **Apply for nonprofit discounts** (DigitalOcean Hub for Good, Cloudflare Project Galileo)
- [ ] **Register domain** on Cloudflare Registrar or Porkbun (~$10/yr)
- [ ] **Create DigitalOcean Droplet** (1GB RAM, Ubuntu 24.04, $6/mo)
- [ ] **Set up the server:**
  - [ ] Create a non-root user with sudo
  - [ ] Configure UFW firewall (allow SSH, HTTP, HTTPS)
  - [ ] Install Node.js (via nvm or NodeSource)
  - [ ] Install Nginx
  - [ ] Install PM2 globally (`npm install -g pm2`)
  - [ ] Install certbot for Let's Encrypt SSL
- [ ] **Update Next.js config** to add `output: 'export'` for static export
- [ ] **Build and deploy:**
  - [ ] Build Next.js frontend (`npm run build` produces static `out/` directory)
  - [ ] Build CMS admin (`npm run build` produces static `dist/` directory)
  - [ ] Upload built files + backend code to server
  - [ ] Run `npm install --production` in backend directory
  - [ ] Seed the database (`npm run seed`)
  - [ ] Start Express with PM2 (`pm2 start server.js --name lcgr-api`)
- [ ] **Configure Nginx** (proxy /api to Express, serve static files)
- [ ] **Set up SSL** (`sudo certbot --nginx -d yourdomain.org`)
- [ ] **Set up auto-deploy** (optional: GitHub Actions to build + rsync to server on push)
- [ ] **Set up backups** (DigitalOcean weekly snapshots: $1.20/mo, or manual SQLite backup cron)

---

## Appendix: Annual Cost Comparison

| Solution | Monthly | Annual | Notes |
|----------|---------|--------|-------|
| Fly.io Free + Domain | $0.85 | $10 | Risk of free tier changes |
| Oracle Cloud Free + Domain | $0.85 | $10 | Reliability concerns |
| AWS Lightsail + Domain | $4.35 | $52 | First 3 months free |
| DigitalOcean + Domain | $6.85 | $82 | **Most recommended** |
| Railway Hobby + Domain | $5.85-7.85 | $70-94 | Simple but adds up |
| Render Starter + Domain | $8.10 | $97 | Easiest PaaS option |
| Split: Vercel + Fly.io + Domain | $0.85 | $10 | More complex, two platforms |
| Split: Cloudflare + DO + Domain | $6.85 | $82 | Best performance |

---

*This report is based on publicly available pricing and features as of early 2026. Prices and free tier terms may change. Always verify current pricing on each platform's website before committing.*
