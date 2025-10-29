# 🚀 Quick Start Guide - YouTube SEO Analyzer

## 📦 Installation (30 seconds)

```bash
# Navigate to the project
cd youtube-seo-analyzer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open your browser to `http://localhost:5173` 🎉

---

## 🎯 First Analysis (2 minutes)

### Step 1: Enter Your Video Title
```
Example: "How to Build a React App in 2024 | Complete Tutorial"
```
- Aim for 60-70 characters
- Include keywords early
- Make it engaging

### Step 2: Write Your Description
```
Example: "Learn how to build a modern React application from scratch! 
In this comprehensive tutorial, we'll cover..."
```
- First 150 characters are crucial
- Include relevant keywords
- Add timestamps and links

### Step 3: Add Tags
```
Examples: react, tutorial, web development, javascript, coding
```
- Use 5-10 relevant tags
- Mix broad and specific keywords
- Stay under 500 characters total

### Step 4: Add Hashtags
```
Examples: #React #WebDev #Tutorial
```
- Use 3-5 hashtags
- Choose relevant, popular ones
- Don't exceed 15 total

### Step 5: Analyze!
Click "Analyze SEO Score" or press `Ctrl+Enter`

---

## 📊 Understanding Your Score

### Score Ranges
- **90-100 (A)** 🟢 Excellent - Ready to publish!
- **80-89 (B)** 🟡 Good - Minor tweaks recommended
- **70-79 (C)** 🟠 Fair - Several improvements needed
- **60-69 (D)** 🔴 Needs Work - Major changes required
- **0-59 (F)** ⚫ Poor - Significant optimization needed

### What to Look For
1. **Overall Score** - Your main metric
2. **Component Scores** - Individual breakdowns
3. **Critical Issues** - Must-fix problems
4. **Recommendations** - Prioritized suggestions

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Analyze your content |
| `Ctrl + S` | Save analysis |
| `Ctrl + E` | Export results |
| `Ctrl + K` | Clear all fields |
| `Enter` | Add tag/hashtag |
| `?` | Show shortcuts |

---

## 💾 Export Your Results

1. Click the **Export** button
2. Choose your format:
   - **JSON** - Complete data export
   - **CSV** - Spreadsheet format
   - **Clipboard** - Quick copy

---

## 🎨 Component Examples

### Using Components in Your Code

```tsx
import { Badge, Card, ScoreCircle, Toast } from './components';

// Badge
<Badge variant="success">Excellent</Badge>

// Card
<Card title="Analysis Results" subtitle="Your SEO breakdown">
  <p>Content here</p>
</Card>

// Score Circle
<ScoreCircle score={85} size="lg" />

// Toast
<Toast message="Analysis complete!" type="success" />
```

### Using Hooks

```tsx
import { useLocalStorage, useDebounce, useAnimation } from './hooks';

// Local Storage
const [data, setData] = useLocalStorage('key', defaultValue);

// Debounce
const debouncedValue = useDebounce(value, 500);

// Animation
const shouldAnimate = useAnimation(trigger, 200);
```

---

## 🎯 Pro Tips

### Title Optimization
✅ **DO**: "How to Build a React App | Complete 2024 Guide"
❌ **DON'T**: "video"

### Description Best Practices
✅ **DO**: Start with your main keyword
✅ **DO**: Include timestamps (0:00 Intro, 2:30 Setup)
✅ **DO**: Add relevant links
❌ **DON'T**: Keyword stuff
❌ **DON'T**: Use all caps

### Tag Strategy
✅ **DO**: Mix broad ("react") and specific ("react hooks tutorial")
✅ **DO**: Use 5-10 tags
❌ **DON'T**: Repeat the same tag
❌ **DON'T**: Use irrelevant tags

### Hashtag Guidelines
✅ **DO**: Use 3-5 relevant hashtags
✅ **DO**: Research popular hashtags in your niche
❌ **DON'T**: Use more than 15
❌ **DON'T**: Use banned or spam hashtags

---

## 🔧 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

### Adjust Animation Speed

Edit `src/index.css`:
```css
.duration-custom {
  animation-duration: 400ms;
}
```

---

## 🐛 Troubleshooting

### Issue: Score is too low
**Solution**: Follow the recommendations in priority order

### Issue: Can't add tags
**Solution**: Check if you've reached the 500 character limit

### Issue: Export not working
**Solution**: Check browser permissions for downloads

### Issue: Keyboard shortcuts not working
**Solution**: Make sure the app has focus (click on it first)

---

## 📚 Learn More

- [Full Documentation](./README.md)
- [Feature List](./FEATURES.md)
- [Change Log](./CHANGELOG.md)
- [Implementation Details](./IMPLEMENTATION_SUMMARY.md)

---

## 🎉 You're Ready!

Start optimizing your YouTube videos for maximum reach and engagement!

**Happy Creating! 🎥✨**

---

## 💡 Need Help?

- Check the [README](./README.md) for detailed documentation
- Review [FEATURES.md](./FEATURES.md) for all capabilities
- See [CHANGELOG.md](./CHANGELOG.md) for recent updates

---

*Made with ❤️ for content creators*
