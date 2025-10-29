# 🧩 Component Library Reference

A comprehensive guide to all available components in the YouTube SEO Analyzer.

---

## 📦 Core UI Components

### Badge

Display status indicators with different variants.

```tsx
import { Badge } from './components';

<Badge variant="success">Excellent</Badge>
<Badge variant="warning" size="lg">Warning</Badge>
<Badge variant="error" icon={<Icon />}>Error</Badge>
```

**Props:**
- `variant`: 'success' | 'warning' | 'error' | 'info' | 'default'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: ReactNode

---

### Card

Container component with optional header.

```tsx
import { Card } from './components';

<Card 
  title="Analysis Results"
  subtitle="Your SEO breakdown"
  icon={<Icon />}
  headerColor="from-blue-600 to-indigo-600"
  hoverable
>
  <p>Content goes here</p>
</Card>
```

**Props:**
- `title`: string
- `subtitle`: string
- `icon`: ReactNode
- `headerColor`: string (Tailwind gradient)
- `hoverable`: boolean
- `className`: string

---

### Modal

Overlay dialog with backdrop blur.

```tsx
import { Modal } from './components';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Export Options"
  size="lg"
>
  <p>Modal content</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'

---

### Tabs

Tabbed navigation component.

```tsx
import { Tabs } from './components';

const tabs = [
  { id: 'tab1', label: 'Overview', icon: <Icon />, content: <div>Content 1</div> },
  { id: 'tab2', label: 'Details', content: <div>Content 2</div> },
];

<Tabs tabs={tabs} defaultTab="tab1" />
```

**Props:**
- `tabs`: Array<{ id, label, icon?, content }>
- `defaultTab`: string

---

### Toast

Notification messages with auto-dismiss.

```tsx
import { Toast } from './components';

<Toast
  message="Analysis complete!"
  type="success"
  duration={3000}
  onClose={() => {}}
/>
```

**Props:**
- `message`: string
- `type`: 'success' | 'error' | 'warning' | 'info'
- `duration`: number (milliseconds)
- `onClose`: () => void

---

### Tooltip

Contextual help on hover.

```tsx
import { Tooltip } from './components';

<Tooltip content="This is helpful info" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Props:**
- `content`: string
- `position`: 'top' | 'bottom' | 'left' | 'right'

---

### Accordion

Collapsible content sections.

```tsx
import { Accordion, AccordionItem } from './components';

<Accordion>
  <AccordionItem title="Section 1" icon={<Icon />} defaultOpen>
    <p>Content 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2">
    <p>Content 2</p>
  </AccordionItem>
</Accordion>
```

**Props:**
- `title`: string
- `icon`: ReactNode
- `defaultOpen`: boolean

---

### ProgressBar

Animated progress indicator.

```tsx
import { ProgressBar } from './components';

<ProgressBar
  value={75}
  max={100}
  label="Progress"
  showPercentage
  animated
  color="blue"
/>
```

**Props:**
- `value`: number
- `max`: number
- `label`: string
- `showPercentage`: boolean
- `animated`: boolean
- `color`: 'blue' | 'green' | 'amber' | 'red' | 'purple'

---

### LoadingSpinner

Loading state indicator.

```tsx
import { LoadingSpinner } from './components';

<LoadingSpinner size="lg" color="text-blue-600" text="Loading..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `color`: string (Tailwind color class)
- `text`: string

---

### Chip

Tag-like component with optional delete.

```tsx
import { Chip } from './components';

<Chip
  label="React"
  onDelete={() => {}}
  icon={<Icon />}
  color="blue"
  size="md"
/>
```

**Props:**
- `label`: string
- `onDelete`: () => void
- `icon`: ReactNode
- `color`: 'blue' | 'green' | 'purple' | 'red' | 'gray'
- `size`: 'sm' | 'md' | 'lg'

---

### EmptyState

Display when no content is available.

```tsx
import { EmptyState } from './components';

<EmptyState
  icon={<Icon />}
  title="No results found"
  description="Try adjusting your search"
  action={{
    label: "Start Over",
    onClick: () => {}
  }}
/>
```

**Props:**
- `icon`: ReactNode
- `title`: string
- `description`: string
- `action`: { label: string, onClick: () => void }

---

## 🎯 Specialized Components

### ScoreCircle

Circular progress with animated score.

```tsx
import { ScoreCircle } from './components';

<ScoreCircle score={85} size="lg" showLabel />
```

**Props:**
- `score`: number (0-100)
- `size`: 'sm' | 'md' | 'lg'
- `showLabel`: boolean

---

### AnimatedNumber

Count-up animation for numbers.

```tsx
import { AnimatedNumber } from './components';

<AnimatedNumber
  value={1234}
  duration={1000}
  prefix="$"
  suffix="+"
  className="text-2xl font-bold"
/>
```

**Props:**
- `value`: number
- `duration`: number (milliseconds)
- `prefix`: string
- `suffix`: string
- `className`: string

---

### StatsCard

Metric display with icon and trend.

```tsx
import { StatsCard } from './components';

<StatsCard
  title="Total Views"
  value={1234}
  icon={<Icon />}
  color="blue"
  suffix="K"
  trend={{ value: 12, isPositive: true }}
/>
```

**Props:**
- `title`: string
- `value`: number
- `icon`: ReactNode
- `color`: 'blue' | 'green' | 'purple' | 'orange'
- `suffix`: string
- `trend`: { value: number, isPositive: boolean }

---

### ExportMenu

Export options dialog.

```tsx
import { ExportMenu } from './components';

<ExportMenu
  metadata={metadata}
  analysis={analysis}
  onClose={() => {}}
/>
```

**Props:**
- `metadata`: MetadataInput
- `analysis`: AnalysisResults
- `onClose`: () => void

---

### KeyboardShortcutsHelp

Keyboard shortcuts reference.

```tsx
import { KeyboardShortcutsHelp } from './components';

<KeyboardShortcutsHelp />
```

No props required.

---

### FloatingActionButton

Expandable action menu.

```tsx
import { FloatingActionButton } from './components';

const actions = [
  { icon: <Icon />, label: "Action 1", onClick: () => {}, color: "bg-blue-500" },
  { icon: <Icon />, label: "Action 2", onClick: () => {} },
];

<FloatingActionButton actions={actions} />
```

**Props:**
- `actions`: Array<{ icon, label, onClick, color? }>

---

## 🔧 Utility Components

### ThemeToggle

Dark/light mode switch.

```tsx
import { ThemeToggle } from './components';

<ThemeToggle />
```

No props required. Automatically manages theme state.

---

### Skeleton

Loading placeholder.

```tsx
import { Skeleton, SkeletonGroup } from './components';

<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width="40px" height="40px" />
<Skeleton variant="rectangular" height="200px" animation="wave" />

<SkeletonGroup count={3} />
```

**Props:**
- `variant`: 'text' | 'circular' | 'rectangular'
- `width`: string
- `height`: string
- `animation`: 'pulse' | 'wave' | 'none'
- `className`: string

---

## 🎣 Custom Hooks

### useAnimation

Trigger-based animations.

```tsx
import { useAnimation } from './hooks';

const shouldAnimate = useAnimation(trigger, 200);
```

**Parameters:**
- `trigger`: boolean
- `delay`: number (milliseconds)

**Returns:** boolean

---

### useCountUp

Number count-up animation.

```tsx
import { useCountUp } from './hooks';

const count = useCountUp(100, 1000, 0);
```

**Parameters:**
- `end`: number
- `duration`: number (milliseconds)
- `start`: number

**Returns:** number

---

### useLocalStorage

Persistent state management.

```tsx
import { useLocalStorage } from './hooks';

const [value, setValue] = useLocalStorage('key', defaultValue);
```

**Parameters:**
- `key`: string
- `initialValue`: T

**Returns:** [T, (value: T) => void]

---

### useDebounce

Debounced values.

```tsx
import { useDebounce } from './hooks';

const debouncedValue = useDebounce(value, 500);
```

**Parameters:**
- `value`: T
- `delay`: number (milliseconds)

**Returns:** T

---

### useKeyboardShortcut

Keyboard navigation.

```tsx
import { useKeyboardShortcut } from './hooks';

useKeyboardShortcut('s', handleSave, { ctrl: true });
```

**Parameters:**
- `key`: string
- `callback`: () => void
- `modifiers`: { ctrl?, shift?, alt? }

---

## 🎨 Styling Utilities

### Custom Classes

```css
/* Animations */
.animate-in
.fade-in
.slide-in-from-bottom-2
.slide-in-from-bottom-4
.slide-in-from-top-2
.slide-in-from-top-4
.zoom-in
.bounce-in

/* Durations */
.duration-200
.duration-300
.duration-500
.duration-700

/* Delays */
.delay-100
.delay-200
.delay-300

/* Effects */
.shimmer
.glass
.gradient-text
.custom-scrollbar
```

---

## 📝 Usage Examples

### Complete Form with Components

```tsx
import { Card, Badge, ProgressBar, Tooltip, Toast } from './components';

function MyForm() {
  return (
    <Card title="Video Details" hoverable>
      <div className="space-y-4">
        <div>
          <label>Title</label>
          <Tooltip content="60-70 characters recommended">
            <input type="text" />
          </Tooltip>
          <ProgressBar value={60} max={100} color="green" />
        </div>
        
        <Badge variant="success">Optimized</Badge>
      </div>
    </Card>
  );
}
```

### Dashboard with Stats

```tsx
import { StatsCard, ScoreCircle } from './components';

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard
        title="Total Score"
        value={85}
        icon={<Icon />}
        color="green"
        trend={{ value: 5, isPositive: true }}
      />
      <ScoreCircle score={85} size="lg" />
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Import from index**: `import { Badge } from './components'`
2. **Use TypeScript**: All components are fully typed
3. **Customize with props**: Most components accept className
4. **Combine components**: Build complex UIs from simple parts
5. **Follow patterns**: Check existing usage in App.tsx

---

*For more examples, see the main App.tsx file!*
