import { type FC, useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-3xl backdrop-blur-sm flex items-center justify-center animate-pulse">
            <div className="text-6xl animate-bounce">🤖</div>
          </div>
          
          {/* Sparkle Effects */}
          <div className="absolute -top-4 -right-4 text-3xl animate-ping">✨</div>
          <div className="absolute -bottom-4 -left-4 text-3xl animate-ping delay-150">⚡</div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-black text-white mb-2 animate-fade-in">
          ContentCraft AI
        </h1>
        <p className="text-xl text-white/80 mb-8 animate-fade-in delay-100">
          Powered by Chrome Built-in AI
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2">{progress}%</p>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-white/70 text-sm animate-pulse">
          {progress < 30 && '🔄 Initializing AI Models...'}
          {progress >= 30 && progress < 60 && '🧠 Loading Neural Networks...'}
          {progress >= 60 && progress < 90 && '✨ Preparing AI Tools...'}
          {progress >= 90 && '🚀 Ready to Create!'}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
