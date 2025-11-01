import { type FC, useState, useEffect } from 'react';

const AITipsCarousel: FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { icon: '✅', text: 'Keep titles under 70 characters for best visibility' },
    { icon: '🔥', text: 'Add power words like "ultimate", "secret", "proven"' },
    { icon: '📊', text: 'First 150 characters of description are crucial' },
    { icon: '#️⃣', text: 'Use 3-5 hashtags for optimal reach' },
    { icon: '🎯', text: 'Include keywords in first 3 seconds of video' },
    { icon: '💡', text: 'Post on Tuesday-Thursday for best engagement' },
    { icon: '⏰', text: 'Best time to post: 2-4 PM in your timezone' },
    { icon: '🏷️', text: 'Mix broad and specific tags for better discovery' },
    { icon: '📈', text: 'Consistency beats perfection - post regularly' },
    { icon: '👥', text: 'Engage with comments in first hour after posting' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl animate-bounce">{tips[currentTip].icon}</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-blue-600 mb-1">💡 AI Pro Tip #{currentTip + 1}</p>
          <p className="text-sm text-gray-900 font-medium">{tips[currentTip].text}</p>
        </div>
      </div>
      <div className="flex gap-1 mt-3">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index === currentTip ? 'bg-blue-500' : 'bg-blue-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AITipsCarousel;
