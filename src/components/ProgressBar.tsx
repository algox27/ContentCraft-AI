import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}

export const ProgressBar = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  animated = true,
  color = 'blue',
}: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (!animated) {
      setAnimatedValue(percentage);
      return;
    }

    const duration = 800;
    const steps = 50;
    const increment = percentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setAnimatedValue(percentage);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [percentage, animated]);

  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-600">{Math.round(animatedValue)}%</span>
          )}
        </div>
      )}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full ${colors[color]} transition-all duration-700 ease-out rounded-full shadow-sm`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
};
