import { type FC } from 'react';

interface SEOScoreBreakdownProps {
  titleScore: number;
  descriptionScore: number;
  tagsScore: number;
  hashtagsScore: number;
}

const SEOScoreBreakdown: FC<SEOScoreBreakdownProps> = ({
  titleScore,
  descriptionScore,
  tagsScore,
  hashtagsScore,
}) => {
  const metrics = [
    { label: 'Title', score: titleScore, color: 'from-blue-500 to-blue-600', icon: '📝' },
    { label: 'Description', score: descriptionScore, color: 'from-purple-500 to-purple-600', icon: '📄' },
    { label: 'Tags', score: tagsScore, color: 'from-pink-500 to-pink-600', icon: '🏷️' },
    { label: 'Hashtags', score: hashtagsScore, color: 'from-orange-500 to-orange-600', icon: '#️⃣' },
  ];

  const totalScore = Math.round((titleScore + descriptionScore + tagsScore + hashtagsScore) / 4);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>SEO Score Breakdown</span>
      </h3>

      {/* Overall Score Circle */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${
          totalScore >= 80 ? 'border-green-500 bg-green-50' :
          totalScore >= 60 ? 'border-yellow-500 bg-yellow-50' :
          'border-red-500 bg-red-50'
        }`}>
          <div className="text-center">
            <div className={`text-5xl font-black ${
              totalScore >= 80 ? 'text-green-600' :
              totalScore >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {totalScore}
            </div>
            <div className="text-xs text-gray-500 font-semibold">Overall</div>
          </div>
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{metric.icon}</span>
                <span className="font-semibold text-gray-900">{metric.label}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{metric.score}%</span>
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${metric.score}%`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
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

export default SEOScoreBreakdown;
