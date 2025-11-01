import { type FC, useEffect, useState } from 'react';

interface XPLevelSystemProps {
  className?: string;
}

const XPLevelSystem: FC<XPLevelSystemProps> = ({ className = '' }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem('userXP') || '0');
    const savedLevel = parseInt(localStorage.getItem('userLevel') || '1');
    setXp(savedXP);
    setLevel(savedLevel);
  }, []);

  const xpForNextLevel = level * 100;
  const progress = (xp % 100) / xpForNextLevel * 100;

  const addXP = (amount: number) => {
    const newXP = xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    if (newLevel > level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    setXp(newXP);
    setLevel(newLevel);
    localStorage.setItem('userXP', newXP.toString());
    localStorage.setItem('userLevel', newLevel.toString());
  };

  // Expose addXP globally for other components
  useEffect(() => {
    (window as any).addUserXP = addXP;
  }, [xp, level]);

  const getLevelBadge = () => {
    if (level >= 10) return '🏆';
    if (level >= 5) return '⭐';
    return '🌟';
  };

  const getLevelTitle = () => {
    if (level >= 10) return 'Master Creator';
    if (level >= 5) return 'Pro Creator';
    return 'Beginner Creator';
  };

  return (
    <>
      <div className={`bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-lg ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{getLevelBadge()}</span>
            <div>
              <p className="text-xs opacity-90">Level {level}</p>
              <p className="font-bold">{getLevelTitle()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black">{xp}</p>
            <p className="text-xs opacity-90">XP</p>
          </div>
        </div>

        <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-center mt-2 opacity-90">
          {xpForNextLevel - (xp % 100)} XP to Level {level + 1}
        </p>
      </div>

      {showLevelUp && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 text-center animate-in zoom-in">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Level Up!</h2>
            <p className="text-2xl text-purple-600 font-bold">Level {level}</p>
            <p className="text-gray-600 mt-2">{getLevelTitle()}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default XPLevelSystem;

// Helper function to add XP from anywhere
export const addXP = (amount: number) => {
  if ((window as any).addUserXP) {
    (window as any).addUserXP(amount);
  }
};
