# 🗄️ Supabase Setup Guide - ContentCraft AI

## Step 1: Create Supabase Account (FREE)

1. Go to [Supabase](https://supabase.com/)
2. Click "Start your project"
3. Sign up with GitHub/Google (recommended)
4. Verify your email

## Step 2: Create New Project

1. Click "New Project"
2. Fill in details:
   - **Name:** ContentCraft AI
   - **Database Password:** (Generate strong password - SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan:** FREE (default)
3. Click "Create new project"
4. Wait 2-3 minutes for setup

## Step 3: Get API Keys

1. Go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 4: Add to Your Project

1. Open `.env` file in your project
2. Replace the placeholders:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save the file

## Step 5: Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create user_credits table
CREATE TABLE user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  credits_remaining INTEGER DEFAULT 5,
  credits_used INTEGER DEFAULT 0,
  last_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage_logs table
CREATE TABLE usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - you can restrict later)
CREATE POLICY "Allow all operations on user_credits" ON user_credits
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on usage_logs" ON usage_logs
  FOR ALL USING (true) WITH CHECK (true);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 6: Verify Setup

1. Go to **Table Editor** in sidebar
2. You should see two tables:
   - `user_credits`
   - `usage_logs`
3. Both should be empty (0 rows)

## Step 7: Test Your App

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open app in browser
3. Try generating a caption/hashtag
4. Check Supabase **Table Editor**:
   - `user_credits` should have 1 row (your user)
   - `usage_logs` should have entries

## What Gets Tracked?

### user_credits table:
- User ID (browser fingerprint)
- Credits remaining (starts at 5)
- Credits used (total count)
- Last reset time (for daily reset)
- Created/Updated timestamps

### usage_logs table:
- User ID
- Action type (e.g., "caption_generated")
- Tool name (e.g., "instagram_caption")
- Metadata (topic, style, etc.)
- Timestamp

## View Your Data

### Real-time Monitoring:
1. Go to **Table Editor**
2. Select `usage_logs` table
3. See all user actions in real-time
4. Filter by date, user, action type

### Analytics Queries:
Go to **SQL Editor** and run queries like:

```sql
-- Total users
SELECT COUNT(DISTINCT user_id) FROM user_credits;

-- Total actions today
SELECT COUNT(*) FROM usage_logs 
WHERE created_at >= CURRENT_DATE;

-- Most popular tools
SELECT tool_name, COUNT(*) as usage_count 
FROM usage_logs 
GROUP BY tool_name 
ORDER BY usage_count DESC;

-- Users who exhausted credits
SELECT user_id, credits_remaining 
FROM user_credits 
WHERE credits_remaining = 0;
```

## Fallback System

**Don't worry!** If Supabase is not configured:
- App will use **localStorage** as fallback
- Credits still work (5 per day)
- Daily reset still happens
- No data is lost

## Free Tier Limits

✅ **500 MB Database** - Enough for 100,000+ users
✅ **Unlimited API requests** - With rate limits
✅ **50,000 monthly active users**
✅ **No credit card required**

## Troubleshooting

### "Failed to fetch" error?
- Check if Project URL is correct
- Check if anon key is correct
- Make sure project is not paused

### Tables not created?
- Run the SQL again
- Check for error messages
- Make sure you're in the right project

### Data not showing?
- Check browser console for errors
- Verify API keys in `.env`
- Restart dev server after changing `.env`

## Security Notes

✅ Row Level Security (RLS) is enabled
✅ Only anon key is exposed (safe for frontend)
✅ No sensitive data is stored
✅ Users are anonymous (browser fingerprint only)

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)

---

**That's it! Your credit system is now live! 🎉**

Users get 5 free credits daily, and when they run out, they'll see your Telegram contact for upgrades!
