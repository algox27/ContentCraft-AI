# 🧪 Credit System Testing Guide

## 🔍 How to Test Credits

### Method 1: Browser Console (Recommended)

1. **Open your app** in browser (http://localhost:5173)
2. **Open DevTools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Look for these logs:**

```
🆔 Existing user ID: user_1234567890_abc123
🔄 Loading credits for user: user_1234567890_abc123
⚠️ Supabase not configured, using localStorage
📊 Credit info: { stored: "5", lastReset: "2025-10-29T..." }
✅ Loaded existing credits: 5
```

### Method 2: Check localStorage

**In Console, type:**
```javascript
// Check current credits
localStorage.getItem('contentcraft_credits')

// Check last reset
localStorage.getItem('contentcraft_last_reset')

// Check user ID
localStorage.getItem('contentcraft_user_id')
```

### Method 3: Use TEST_CREDITS.html

1. **Open file:** `youtube-seo-analyzer/TEST_CREDITS.html` in browser
2. **See real-time data** from localStorage
3. **Use buttons** to test:
   - Check Credits
   - Reset to 5
   - Clear All Data
   - Use 1 Credit

---

## 🐛 Debugging Steps

### Issue: Credits reset to 5 on refresh

**Check:**
```javascript
// In console
console.log('Credits:', localStorage.getItem('contentcraft_credits'));
console.log('Last Reset:', localStorage.getItem('contentcraft_last_reset'));
```

**Expected:**
- Credits should persist (e.g., "3" if you used 2)
- Last Reset should have a date

**If both are null:**
- First time user ✅
- Will initialize to 5

**If credits exist but reset:**
- Check console logs for "🔄 Resetting credits"
- Check if 7 days passed

### Issue: Credits not decreasing

**Test manually:**
```javascript
// In console
let credits = parseInt(localStorage.getItem('contentcraft_credits') || '5');
credits--;
localStorage.setItem('contentcraft_credits', credits.toString());
console.log('New credits:', credits);
```

**Then refresh page** - should show decreased value

### Issue: CreditBanner not visible

**Check:**
1. Is it rendered? (Look in React DevTools)
2. Is z-index high enough? (Should be 9999)
3. Is position correct? (top: 20px, right: 20px)

**Force show in console:**
```javascript
// Check if component exists
document.querySelector('.credit-banner')
```

---

## ✅ Expected Behavior

### First Visit
```
1. Page loads
2. Console: "🆕 First time user - initializing"
3. localStorage set: credits=5, lastReset=now
4. Banner shows: "5 Credits Left"
```

### Using a Credit
```
1. Click "Analyze SEO"
2. Console: "🔵 useCredit called"
3. Console: "🟢 Using credit. New balance: 4"
4. Console: "💾 Saved to localStorage: 4"
5. Banner updates: "4 Credits Left"
```

### Refresh Page
```
1. Page reloads
2. Console: "✅ Loaded existing credits: 4"
3. Banner shows: "4 Credits Left"
4. Credits persist ✅
```

### After 7 Days
```
1. Page loads
2. Console: "📅 Days since last reset: 7"
3. Console: "🔄 Resetting credits (7 days passed)"
4. Credits reset to 5
5. lastReset updated to now
```

---

## 🔧 Manual Testing Commands

### Reset Everything
```javascript
localStorage.removeItem('contentcraft_user_id');
localStorage.removeItem('contentcraft_credits');
localStorage.removeItem('contentcraft_last_reset');
location.reload();
```

### Set Specific Credit Amount
```javascript
localStorage.setItem('contentcraft_credits', '3');
location.reload();
```

### Simulate 7 Days Passed
```javascript
// Set last reset to 8 days ago
const eightDaysAgo = new Date();
eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
localStorage.setItem('contentcraft_last_reset', eightDaysAgo.toISOString());
location.reload();
// Should reset to 5 credits
```

### Check if Credit System is Working
```javascript
// Run this in console
const test = () => {
  const credits = localStorage.getItem('contentcraft_credits');
  const lastReset = localStorage.getItem('contentcraft_last_reset');
  const userId = localStorage.getItem('contentcraft_user_id');
  
  console.log('=== CREDIT SYSTEM STATUS ===');
  console.log('User ID:', userId);
  console.log('Credits:', credits);
  console.log('Last Reset:', lastReset);
  console.log('Days since reset:', lastReset ? 
    Math.floor((Date.now() - new Date(lastReset).getTime()) / (1000*60*60*24)) : 
    'N/A'
  );
  console.log('===========================');
};
test();
```

---

## 📊 Console Log Reference

| Log | Meaning |
|-----|---------|
| 🆔 New user ID created | First time visitor |
| 🆔 Existing user ID | Returning visitor |
| 🔄 Loading credits | Starting credit check |
| ⚠️ Supabase not configured | Using localStorage (normal) |
| 🆕 First time user | Initializing with 5 credits |
| ✅ Loaded existing credits | Credits loaded from storage |
| 📅 Days since last reset | Checking if reset needed |
| 🔄 Resetting credits | 7 days passed, resetting to 5 |
| 🔵 useCredit called | User action triggered |
| 🟢 Using credit | Credit deducted |
| 💾 Saved to localStorage | Credit saved |
| 🔴 No credits available | Out of credits |

---

## 🎯 Quick Test Checklist

- [ ] Open app in browser
- [ ] Open DevTools Console
- [ ] See initialization logs
- [ ] Check CreditBanner visible (top-right)
- [ ] Shows "5 Credits Left"
- [ ] Click "Analyze SEO" button
- [ ] See credit deduction logs
- [ ] Banner updates to "4 Credits Left"
- [ ] Refresh page (F5)
- [ ] Credits still show "4" (not reset to 5)
- [ ] Use all 5 credits
- [ ] See "0 Credits" message
- [ ] Upgrade modal appears
- [ ] "Get More Credits" button visible

---

## 🚨 Common Issues & Fixes

### Credits always 5 on refresh
**Fix:** Check if `lastReset` is being set
```javascript
localStorage.getItem('contentcraft_last_reset') // Should not be null
```

### Credits not decreasing
**Fix:** Check if `useCredit` is being called
```javascript
// Look for this in console when clicking Analyze
"🔵 useCredit called"
```

### Banner not showing
**Fix:** Check z-index and position
```javascript
// In console
const banner = document.querySelector('.credit-banner');
console.log(banner ? 'Banner exists' : 'Banner not found');
```

### Credits reset immediately
**Fix:** Check date calculation
```javascript
const lastReset = localStorage.getItem('contentcraft_last_reset');
const daysDiff = Math.floor((Date.now() - new Date(lastReset).getTime()) / (1000*60*60*24));
console.log('Days diff:', daysDiff); // Should be < 7
```

---

## 📞 Still Having Issues?

1. **Clear all data and start fresh:**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Check console for errors** (red text)

3. **Open TEST_CREDITS.html** to see live data

4. **Contact support:** @H9rsh_x1 on Telegram

---

**Last Updated:** October 29, 2025  
**Status:** ✅ Fixed - Credits now persist on refresh
