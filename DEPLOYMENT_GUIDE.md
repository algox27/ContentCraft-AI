# 🚀 Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

✅ All features working locally
✅ Credit system tested
✅ Admin panel accessible
✅ No TypeScript errors
✅ Build successful (`npm run build`)

---

## 🎯 Method 1: Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd youtube-seo-analyzer
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → contentcraft-ai (or your choice)
- **Directory?** → ./
- **Override settings?** → No

### Step 4: Production Deployment
```bash
vercel --prod
```

---

## 🌐 Method 2: Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

1. **Create GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ContentCraft AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/contentcraft-ai.git
   git push -u origin main
   ```

2. **Or use existing repo:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. **Import Git Repository**
4. Select your GitHub repo
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `youtube-seo-analyzer`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **"Deploy"**

---

## 🔐 Environment Variables

### On Vercel Dashboard:

1. Go to **Project Settings**
2. Click **"Environment Variables"**
3. Add these:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GA_MEASUREMENT_ID=your_ga_id
```

### Or via CLI:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_GA_MEASUREMENT_ID
```

---

## 📦 Build Configuration

Your `vercel.json` is already configured:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain:

1. **Vercel Dashboard** → Your Project
2. **Settings** → **Domains**
3. Add your domain (e.g., `contentcraft.ai`)
4. Follow DNS configuration steps
5. Wait for SSL certificate (automatic)

---

## 🔍 Post-Deployment Checklist

After deployment, test these:

- [ ] Homepage loads
- [ ] YouTube SEO Analyzer works
- [ ] Tag Generator works
- [ ] Instagram Tools work
- [ ] Credit system working
- [ ] Credits persist on refresh
- [ ] Admin panel accessible (`yoursite.com/#admin`)
- [ ] Telegram links working
- [ ] Support button working
- [ ] Footer links working
- [ ] Mobile responsive
- [ ] No console errors

---

## 🐛 Common Issues & Fixes

### Issue 1: Build Fails
**Error:** `TypeScript errors`
**Fix:**
```bash
npm run build
# Fix any errors shown
```

### Issue 2: Environment Variables Not Working
**Fix:** 
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check Vercel dashboard logs

### Issue 3: 404 on Refresh
**Fix:** Already handled in `vercel.json` with rewrites

### Issue 4: Credits Not Persisting
**Fix:** localStorage works on deployed site, but users need to use same browser

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Free):
1. **Project Settings** → **Analytics**
2. Enable Vercel Analytics
3. View real-time traffic

### Google Analytics:
Already integrated! Just add `VITE_GA_MEASUREMENT_ID`

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push:

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel will:
1. Detect push
2. Build project
3. Deploy to production
4. Update live site

---

## 🎯 Deployment URLs

After deployment, you'll get:

- **Production:** `https://contentcraft-ai.vercel.app`
- **Preview:** `https://contentcraft-ai-git-branch.vercel.app`
- **Custom Domain:** `https://yourdomain.com` (if added)

---

## 💡 Pro Tips

### 1. Preview Deployments
Every branch gets a preview URL for testing

### 2. Rollback
Can rollback to previous deployment in Vercel dashboard

### 3. Performance
Vercel automatically optimizes:
- Image optimization
- Edge caching
- Gzip compression
- HTTP/2

### 4. Logs
View deployment logs in Vercel dashboard for debugging

---

## 🚀 Quick Deploy Commands

```bash
# First time deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm contentcraft-ai
```

---

## 📱 Share Your Site

After deployment, share:
- **Live URL:** `https://contentcraft-ai.vercel.app`
- **Admin Panel:** `https://contentcraft-ai.vercel.app/#admin`
- **Telegram:** Share in your channel/group

---

## 🎉 You're Live!

Your ContentCraft AI is now live on Vercel! 🚀

**Next Steps:**
1. Test all features
2. Share with users
3. Monitor analytics
4. Collect feedback
5. Iterate and improve

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions

---

**Happy Deploying! 🎊**
