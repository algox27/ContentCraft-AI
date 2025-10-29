# 💳 Credit System - Complete Guide

## 🎯 Overview

ContentCraft AI uses a **credit-based system** to manage usage. Each user gets **5 FREE credits** that reset every **7 days**.

---

## 📊 How It Works

### Free Plan
- **5 Credits** per user
- **Resets every 7 days** automatically
- **No registration required**
- Uses browser fingerprint for tracking

### Credit Usage
Each action consumes **1 credit**:
- ✅ YouTube SEO Analysis
- ✅ Tag Generation
- ✅ Instagram Caption Generation
- ✅ Instagram Hashtag Research

---

## 🔄 Credit Reset System

### Automatic Reset
- Credits reset **every 7 days** from first use
- Timer starts when you first use the app
- Countdown visible in Credit Banner

### Example Timeline
```
Day 1: Use 3 credits → 2 remaining
Day 3: Use 2 credits → 0 remaining
Day 8: Auto reset → 5 credits available
```

---

## 💰 Paid Plans

### Starter Plan - ₹99/month
- ✅ **100 Credits/month**
- ✅ All Features
- ✅ Priority Support
- ✅ No Daily Limits

### Pro Plan - ₹299/month (Most Popular)
- ✅ **Unlimited Credits**
- ✅ Advanced AI
- ✅ API Access
- ✅ White-label Option

### Lifetime Plan - ₹999 (One-time)
- ✅ **Unlimited Forever**
- ✅ All Future Updates
- ✅ Priority Support
- ✅ Commercial License

---

## 📱 Where to See Credits

### 1. Credit Banner (Top-Right)
Shows your current credit balance:
```
🕐 3 Credits Left (Resets in 7 days)
```

When credits run out:
```
🕐 0 Credits - Contact for More
[Get More Credits] button
```

### 2. Upgrade Modal
Appears when you try to use a feature with 0 credits:
- Shows all pricing plans
- "Contact on Telegram" button
- Direct link to developer

---

## 🛒 How to Get More Credits

### Option 1: Wait for Reset
- Free credits reset every 7 days
- No action needed
- Automatic process

### Option 2: Upgrade to Paid Plan
1. Click "Get More Credits" button
2. Or click floating Support button
3. Contact on Telegram: **@H9rsh_x1**
4. Choose your plan
5. Make payment
6. Get instant access

---

## 🔧 Technical Implementation

### Storage
- **Primary:** Supabase database (cloud)
- **Fallback:** localStorage (browser)
- **Tracking:** Browser fingerprint

### Database Schema
```sql
user_credits {
  user_id: string (unique)
  credits_remaining: number
  credits_used: number
  last_reset: timestamp
  created_at: timestamp
  updated_at: timestamp
}

usage_logs {
  user_id: string
  action_type: string
  tool_name: string
  metadata: json
  created_at: timestamp
}
```

### Credit Check Flow
```
User clicks "Analyze" 
  → Check hasCredits()
  → If NO → Show Upgrade Modal
  → If YES → Use 1 credit
  → Perform action
  → Update database
  → Update UI
```

---

## 🎨 UI Components

### CreditBanner
- **Location:** Top-right corner (fixed)
- **Shows:** Current credits + reset timer
- **Action:** "Get More Credits" button (when 0)
- **Theme:** Golden gradient

### UpgradeModal
- **Trigger:** When credits = 0
- **Shows:** All pricing plans
- **Action:** Contact on Telegram
- **Theme:** Golden accents

### SupportButton
- **Location:** Bottom-right (floating)
- **Shows:** Contact options
- **Links:** Channel, Group, Developer
- **Theme:** Golden gradient

---

## 📈 Usage Analytics

### Tracked Events
- Credit usage per tool
- User actions
- Feature popularity
- Conversion rates

### Metadata Logged
```json
{
  "titleLength": 65,
  "descriptionLength": 250,
  "tagsCount": 8,
  "hashtagsCount": 5,
  "timestamp": "2025-10-29T18:00:00Z"
}
```

---

## 🔐 Security & Privacy

### User Identification
- Browser fingerprint (anonymous)
- No personal data collected
- No email/phone required
- GDPR compliant

### Data Storage
- Encrypted in Supabase
- Secure API calls
- No credit card storage
- Payment via Telegram

---

## 🐛 Troubleshooting

### Credits Not Updating?
1. Refresh the page
2. Clear browser cache
3. Check localStorage
4. Contact support

### Reset Not Working?
1. Check last reset date
2. Wait for 7 full days
3. Manual reset available via support

### Lost Credits?
1. Check usage logs
2. Contact support with user ID
3. Manual adjustment possible

---

## 📞 Support

### Get Help
- **Telegram:** @H9rsh_x1
- **Support Group:** @ContentCraftsupport
- **Channel:** @ContentCraftAi

### Response Time
- Free users: 24-48 hours
- Paid users: Priority support (2-4 hours)

---

## 🚀 Future Plans

### Coming Soon
- [ ] Monthly subscription auto-renewal
- [ ] Credit packages (buy 10, 50, 100)
- [ ] Referral system (earn credits)
- [ ] Team plans
- [ ] API access for developers

---

## 📝 FAQs

**Q: Do unused credits carry over?**
A: No, credits reset to 5 every 7 days regardless of usage.

**Q: Can I buy just 1 credit?**
A: Currently no, minimum is Starter plan (100 credits).

**Q: What happens if I run out mid-analysis?**
A: Analysis won't start without credits. Check before using.

**Q: Can I share my account?**
A: Free plan is per browser. Paid plans allow multiple devices.

**Q: Is there a refund policy?**
A: Contact support within 7 days for refund consideration.

**Q: Can I upgrade/downgrade anytime?**
A: Yes, contact support to change plans.

---

## 🎯 Best Practices

### Maximize Free Credits
1. Plan your analyses
2. Use all features strategically
3. Wait for reset if not urgent
4. Upgrade for heavy usage

### For Paid Users
1. Unlimited usage on Pro plan
2. No need to track credits
3. Access to advanced features
4. Priority support included

---

## 📊 Credit System Status

✅ **Fully Implemented**
- Credit tracking working
- Database integration active
- UI components live
- Reset system functional
- Analytics tracking enabled

🎨 **Golden Theme Applied**
- Credit Banner styled
- Upgrade Modal themed
- Support Button golden
- Footer integrated

---

**Your credits are now being tracked! Use wisely or upgrade for unlimited access! 💎**
