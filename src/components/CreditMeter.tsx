import { type FC } from 'react';

interface CreditMeterProps {
  credits: number;
  maxCredits: number;
  isAnimating?: boolean;
}

const CreditMeter: FC<CreditMeterProps> = ({ credits, maxCredits, isAnimating = false }) => {
  const percentage = (credits / maxCredits) * 100;
  
  const getColor = () => {
    if (percentage >= 60) return 'from-green-500 to-emerald-500';
    if (percentage >= 30) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getTextColor = () => {
    if (percentage >= 60) return 'text-green-600';
    if (percentage >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-gray-900">AI Credits</span>
        </div>
        <span className={`text-2xl font-black ${getTextColor()}`}>
          {credits}/{maxCredits}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500 ${
            isAnimating ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Status Text */}
      <div className="mt-2 text-center">
        {credits > 0 ? (
          <p className="text-xs text-gray-600">
            {credits === maxCredits ? '✨ Full credits!' : `${credits} credits remaining`}
          </p>
        ) : (
          <p className="text-xs text-red-600 font-semibold">
            ⚠️ No credits left - Upgrade to continue
          </p>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CreditMeter;
