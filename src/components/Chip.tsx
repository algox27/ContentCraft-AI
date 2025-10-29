import type { ReactNode } from 'react';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export const Chip = ({ label, onDelete, icon, color = 'blue', size = 'md' }: ChipProps) => {
  const colors = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    green: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
    red: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    gray: 'bg-gray-200 text-gray-800',
  };

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all ${colors[color]} ${sizes[size]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="hover:bg-white/20 rounded-full p-0.5 transition-all"
          aria-label={`Remove ${label}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};
