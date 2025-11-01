import { type FC, useEffect, useState } from 'react';

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [accentColor, setAccentColor] = useState('#3B82F6');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedAccent = localStorage.getItem('accentColor');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedAccent) {
      setAccentColor(savedAccent);
      document.documentElement.style.setProperty('--accent-color', savedAccent);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeAccentColor = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
  };

  const accentColors = [
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Pink', color: '#EC4899' },
    { name: 'Green', color: '#10B981' },
    { name: 'Orange', color: '#F59E0B' },
    { name: 'Red', color: '#EF4444' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle dark mode"
      >
        <div
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDark ? 'translate-x-7' : 'translate-x-0'
          }`}
        >
          <span className="text-sm">
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </button>

      {/* Accent Color Picker */}
      <div className="flex gap-1">
        {accentColors.map((accent) => (
          <button
            key={accent.color}
            onClick={() => changeAccentColor(accent.color)}
            className={`w-6 h-6 rounded-full transition-all hover:scale-110 ${
              accentColor === accent.color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
            }`}
            style={{ backgroundColor: accent.color }}
            aria-label={`Set ${accent.name} accent color`}
            title={accent.name}
          />
        ))}
      </div>
    </div>
  );
};

export default DarkModeToggle;
