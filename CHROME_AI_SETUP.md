# 🚀 Chrome Built-in AI APIs Setup Guide

## 📋 Prerequisites

You need **Chrome Canary** or **Chrome Dev** (version 127 or higher) to use Chrome's Built-in AI APIs.

---

## 🔧 Step-by-Step Setup

### 1. Download Chrome Canary/Dev

**Option A: Chrome Canary (Recommended)**
- Download: https://www.google.com/chrome/canary/
- Most cutting-edge features
- Updates daily

**Option B: Chrome Dev**
- Download: https://www.google.com/chrome/dev/
- More stable than Canary
- Updates weekly

### 2. Enable AI Features

1. Open Chrome Canary/Dev
2. Navigate to: `chrome://flags`
3. Search and enable these flags:

#### Required Flags:

**a) Optimization Guide On-Device Model**
```
chrome://flags/#optimization-guide-on-device-model
```
Set to: **Enabled BypassPerfRequirement**

**b) Prompt API for Gemini Nano**
```
chrome://flags/#prompt-api-for-gemini-nano
```
Set to: **Enabled**

**c) Summarization API**
```
chrome://flags/#summarization-api-for-gemini-nano
```
Set to: **Enabled**

**d) Translation API**
```
chrome://flags/#translation-api
```
Set to: **Enabled**

**e) Writer API**
```
chrome://flags/#writer-api
```
Set to: **Enabled**

**f) Rewriter API**
```
chrome://flags/#rewriter-api
```
Set to: **Enabled**

4. Click **Relaunch** button at the bottom

### 3. Download AI Models

After relaunch, Chrome will automatically download the required AI models in the background. This may take 5-10 minutes.

**Check Download Status:**
1. Open DevTools (F12)
2. Go to Console
3. Type:
```javascript
await window.ai.languageModel.capabilities()
```
4. If you see `available: "readily"`, models are ready!

---

## ✅ Verify Installation

### Test in Browser Console

Open DevTools (F12) and run these tests:

#### 1. Test Writer API
```javascript
const writer = await window.ai.writer.create();
const result = await writer.write("Write a YouTube title about React");
console.log(result);
writer.destroy();
```

#### 2. Test Rewriter API
```javascript
const rewriter = await window.ai.rewriter.create({ tone: 'casual' });
const result = await rewriter.rewrite("This is a formal sentence.");
console.log(result);
rewriter.destroy();
```

#### 3. Test Summarizer API
```javascript
const summarizer = await window.ai.summarizer.create();
const result = await summarizer.summarize("Long text here...");
console.log(result);
summarizer.destroy();
```

#### 4. Test Translator API
```javascript
const translator = await window.ai.translator.create({
  sourceLanguage: 'en',
  targetLanguage: 'hi'
});
const result = await translator.translate("Hello World");
console.log(result);
translator.destroy();
```

#### 5. Test Prompt API
```javascript
const session = await window.ai.languageModel.create();
const result = await session.prompt("What is React?");
console.log(result);
session.destroy();
```

---

## 🎯 Using in ContentCraft AI

### 1. Start the Application
```bash
cd youtube-seo-analyzer
npm install
npm run dev
```

### 2. Open in Chrome Canary/Dev
```
http://localhost:5173
```

### 3. Test AI Features

Click the **🤖 AI Tools** button and try:

1. **Generate Title** (Writer API)
   - Enter: "React Hooks Tutorial"
   - Get: SEO-optimized title + description

2. **Proofread** (Writer API)
   - Enter: "this is bad grammer"
   - Get: "This is bad grammar"

3. **Rewrite Tone** (Rewriter API)
   - Enter: "Hello, how are you?"
   - Select: Funny
   - Get: Humorous version

4. **Summarize** (Summarizer API)
   - Enter: Long paragraph
   - Get: Short summary

5. **Translate** (Translator API)
   - Enter: "Hello World"
   - Select: Hindi
   - Get: "नमस्ते दुनिया"

---

## 🐛 Troubleshooting

### Issue 1: "window.ai is undefined"
**Solution:**
- Make sure you're using Chrome Canary/Dev
- Check all flags are enabled
- Restart Chrome completely

### Issue 2: "Model not available"
**Solution:**
- Wait 5-10 minutes for model download
- Check internet connection
- Try: `chrome://components` → Find "Optimization Guide" → Click "Check for update"

### Issue 3: "API not supported"
**Solution:**
- Update Chrome Canary to latest version
- Some APIs may not be available in your region yet
- Try using VPN

### Issue 4: Slow responses
**Solution:**
- First request is always slower (model initialization)
- Subsequent requests are faster
- Close other Chrome tabs to free up memory

---

## 📊 System Requirements

### Minimum:
- **RAM:** 8 GB
- **Storage:** 2 GB free (for AI models)
- **OS:** Windows 10+, macOS 11+, Linux

### Recommended:
- **RAM:** 16 GB
- **Storage:** 5 GB free
- **CPU:** Modern multi-core processor

---

## 🔒 Privacy & Security

- All AI processing happens **on-device**
- No data sent to external servers
- Models run locally in Chrome
- Complete privacy and security

---

## 📚 Additional Resources

- **Chrome AI Documentation:** https://developer.chrome.com/docs/ai/
- **Gemini Nano:** https://deepmind.google/technologies/gemini/nano/
- **API Explainer:** https://github.com/explainers-by-googlers/prompt-api

---

## 🎉 You're Ready!

Once all flags are enabled and models are downloaded, you can use all AI features in ContentCraft AI!

**Happy Creating! 🚀**

---

## 💡 Pro Tips

1. **First Launch:** Wait 5-10 minutes for model download
2. **Performance:** Close unused tabs for better performance
3. **Testing:** Use DevTools console to verify APIs
4. **Updates:** Keep Chrome Canary updated for latest features
5. **Fallback:** App works without AI, but features will be limited

---

**Need Help?** Open an issue on GitHub or check Chrome AI documentation.
