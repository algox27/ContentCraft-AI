import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  headerColor?: string;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({
  children,
  title,
  subtitle,
  icon,
  headerColor = 'from-blue-600 to-indigo-600',
  className = '',
  hoverable = false,
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${
        hoverable ? 'hover:shadow-2xl transition-shadow duration-300' : ''
      } ${className}`}
    >
      {(title || subtitle) && (
        <div className={`bg-gradient-to-r ${headerColor} px-6 py-5`}>
          <div className="flex items-center gap-2">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="flex-1">
              {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-white/80 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
