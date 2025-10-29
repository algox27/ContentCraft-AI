import { useState } from 'react';
import type { ReactNode } from 'react';

interface FABAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
}

export const FloatingActionButton = ({ actions }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 ${
                action.color || 'bg-white'
              } rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="flex-shrink-0">{action.icon}</span>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform ${
          isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'
        }`}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
