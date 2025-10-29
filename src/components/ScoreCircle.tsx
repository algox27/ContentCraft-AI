import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreCircle = ({ score, size = 'md', showLabel = true }: ScoreCircleProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#10b981', text: 'text-emerald-600' };
    if (s >= 60) return { stroke: '#f59e0b', text: 'text-amber-600' };
    if (s >= 40) return { stroke: '#f97316', text: 'text-orange-600' };
    return { stroke: '#ef4444', text: 'text-red-600' };
  };

  const sizes = {
    sm: { radius: 30, strokeWidth: 4, fontSize: 'text-lg' },
    md: { radius: 50, strokeWidth: 6, fontSize: 'text-3xl' },
    lg: { radius: 70, strokeWidth: 8, fontSize: 'text-5xl' },
  };

  const { radius, strokeWidth, fontSize } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSize} font-black ${color.text}`}>{animatedScore}</span>
        {showLabel && <span className="text-xs text-gray-500 font-medium">Score</span>}
      </div>
    </div>
  );
};
