import type { ReactNode } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, color = 'blue', suffix = '', trend }: StatsCardProps) => {
  const colors = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600',
    },
    green: {
      bg: 'from-emerald-500 to-emerald-600',
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-600',
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      light: 'bg-orange-50',
      text: 'text-orange-600',
    },
  };

  const colorScheme = colors[color];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorScheme.bg}`}>
          <div className="text-white">{icon}</div>
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <svg
              className={`w-4 h-4 ${trend.isPositive ? '' : 'transform rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {trend.value}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className={`text-3xl font-black ${colorScheme.text}`}>
          <AnimatedNumber value={value} suffix={suffix} />
        </div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
      </div>
    </div>
  );
};
