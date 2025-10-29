# 🔧 Admin Panel - Credit Management Guide

## 🚀 How to Give Credits to Paid Users

### Method 1: User on Same Device (Easy)

**Steps:**
1. **Open Admin Panel:**
   - URL: `http://localhost:5173/#admin`
   - Or manually change URL hash to `#admin`

2. **Get User ID:**
   - User ko bolo: Browser console open karo (F12)
   - Type karo: `localStorage.getItem('contentcraft_user_id')`
   - Copy karo User ID

3. **Add Credits:**
   - Admin panel mein User ID paste karo
   - Credits enter karo (100, 500, unlimited)
   - Click "Add Credits"
   - User ko page refresh karne bolo

### Method 2: Remote User (Current Limitation)

**Problem:** localStorage device-specific hai, remote users ko credits nahi de sakte directly.

**Temporary Solution:**
1. User ko ye steps bhejo:
```javascript
// Browser console mein run karo
localStorage.setItem('contentcraft_credits', '100');
location.reload();
```

2. Or user ko special link bhejo with credits code

---

## 🎯 Admin Panel Features

### 1. View Current Device Info
- User ID
- Current credits
- Last reset date

### 2. Add Credits
- Custom amount (e.g., 100, 500)
- Quick buttons (100, 500, 1000)
- Unlimited option (999999)

### 3. Reset Credits
- Reset to 5 credits
- Reset timer

---

## 💡 Usage Examples

### Starter Plan (₹99) - 100 Credits
```
1. User pays ₹99
2. Get their User ID
3. Admin Panel → Add 100 credits
4. User refreshes → 100 credits available
```

### Pro Plan (₹299) - Unlimited
```
1. User pays ₹299
2. Get their User ID
3. Admin Panel → Set Unlimited
4. User refreshes → 999999 credits
```

### Lifetime Plan (₹999) - Unlimited Forever
```
1. User pays ₹999
2. Get their User ID
3. Admin Panel → Set Unlimited
4. Note down User ID for future reference
```

---

## 🔐 Access Admin Panel

### URL Methods:
1. **Hash Navigation:**
   - `http://localhost:5173/#admin`
   - `https://yoursite.com/#admin`

2. **Manual Navigation:**
   - Browser console: `window.location.hash = 'admin'`

3. **Secret Button (Optional):**
   - Add hidden button in footer
   - Only visible to you

---

## ⚠️ Current Limitations

### localStorage Based System:
- ✅ Works: Same device
- ❌ Doesn't work: Different devices
- ❌ Doesn't work: Remote management

### Solution: Supabase Integration

**With Supabase (Future):**
- ✅ Remote credit management
- ✅ Admin dashboard
- ✅ User database
- ✅ Payment tracking
- ✅ Usage analytics

---

## 🚀 Temporary Workaround for Remote Users

### Option 1: Credit Code System

Create a simple code system:

```javascript
// User enters code in app
const redeemCode = (code) => {
  const codes = {
    'STARTER100': 100,
    'PRO999': 999999,
    'LIFETIME': 999999
  };
  
  if (codes[code]) {
    const current = parseInt(localStorage.getItem('contentcraft_credits') || '5');
    localStorage.setItem('contentcraft_credits', (current + codes[code]).toString());
    return true;
  }
  return false;
};
```

### Option 2: Special Links

Create links with credit codes:
```
https://yoursite.com/?credit=100&code=ABC123
```

Then check URL params on load and add credits.

---

## 📊 Track Paid Users

### Manual Tracking (Current):
Keep a spreadsheet:
```
User ID | Plan | Amount | Date | Credits Given
user_123 | Pro | ₹299 | 2025-10-29 | Unlimited
user_456 | Starter | ₹99 | 2025-10-29 | 100
```

### With Supabase (Future):
Automatic tracking in database with payment history.

---

## 🎯 Quick Commands for Users

### Check Credits:
```javascript
localStorage.getItem('contentcraft_credits')
```

### Check User ID:
```javascript
localStorage.getItem('contentcraft_user_id')
```

### Manually Add Credits (Emergency):
```javascript
const current = parseInt(localStorage.getItem('contentcraft_credits') || '5');
localStorage.setItem('contentcraft_credits', (current + 100).toString());
location.reload();
```

---

## 🔮 Future Enhancements

### Phase 1: Supabase Integration
- User accounts
- Remote credit management
- Admin dashboard
- Payment tracking

### Phase 2: Payment Gateway
- Razorpay/Stripe integration
- Automatic credit top-up
- Subscription management
- Invoice generation

### Phase 3: Advanced Features
- Usage analytics
- Credit history
- Refund management
- Bulk operations

---

## 📞 Support Workflow

### When User Pays:

1. **Get Payment Confirmation**
   - Screenshot
   - Transaction ID
   - Amount

2. **Get User ID**
   - Ask user to send their User ID
   - From console or settings

3. **Add Credits**
   - Open admin panel
   - Enter User ID
   - Add appropriate credits
   - Confirm with user

4. **Verify**
   - User refreshes page
   - Credits updated
   - User confirms working

---

## 🎉 You're Ready!

Admin panel is live at: `http://localhost:5173/#admin`

**Quick Start:**
1. Open admin panel
2. Click "Copy Current User ID"
3. Test adding credits to yourself
4. Verify it works
5. Use for paid users!

---

**Need Help?** Check console logs for debugging! 🔍
