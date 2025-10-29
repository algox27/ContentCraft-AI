# 📊 Google Analytics Setup Guide

## Step 1: Create Google Analytics Account (FREE)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Create Account"
3. Enter account name (e.g., "YouTube SEO Tools")
4. Click "Next"

## Step 2: Create Property

1. Enter property name (e.g., "YouTube SEO Analyzer")
2. Select timezone and currency
3. Click "Next"

## Step 3: Get Measurement ID

1. Select "Web" platform
2. Enter website URL (your deployment URL)
3. Enter stream name (e.g., "Main Website")
4. Click "Create stream"
5. **Copy your Measurement ID** (Format: G-XXXXXXXXXX)

## Step 4: Add to Your Project

1. Open `.env` file in your project root
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
   ```
3. Save the file
4. Restart your development server

## Step 5: Verify Tracking

1. Run your app: `npm run dev`
2. Open your app in browser
3. Go to Google Analytics → Reports → Realtime
4. You should see yourself as an active user!

## What You Can Track

### 📈 Automatic Tracking:
- Page views
- User location (country/city)
- Device type (mobile/desktop)
- Browser type
- Session duration
- New vs returning users

### 🎯 Custom Events Tracked:
- **YouTube Tag Generator:**
  - Tag generation (keyword, count, tab type)
  - Tag exports (format, count)

- **Instagram Tools:**
  - Caption generation (topic, style, character count)
  - Caption exports
  - Hashtag searches (query, results)
  - Hashtag exports (count)
  - Favorites saved/deleted
  - Best times viewed (niche)

- **General:**
  - Copy actions
  - Navigation between pages
  - Session start/end

## View Your Data

### Real-time Reports:
- Go to: Reports → Realtime
- See active users right now
- See what pages they're viewing
- See what events they're triggering

### Overview Reports:
- Go to: Reports → Overview
- See total users, sessions
- See user demographics
- See top pages and events

### Custom Reports:
- Go to: Explore
- Create custom reports
- Filter by date, location, device
- Export data as CSV/PDF

## Privacy & GDPR Compliance

✅ Google Analytics is GDPR compliant
✅ No personal data is collected
✅ Users can opt-out via browser settings
✅ Data is anonymized

## Troubleshooting

### Not seeing data?
1. Check if Measurement ID is correct in `.env`
2. Restart dev server after changing `.env`
3. Clear browser cache
4. Wait 24-48 hours for full data processing

### Events not showing?
1. Go to: Configure → Events
2. Check if custom events are listed
3. Events may take a few hours to appear

## Need Help?

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

---

**That's it! You're now tracking all user activity for FREE! 🎉**
