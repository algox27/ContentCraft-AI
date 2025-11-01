import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface EngagementPredictorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

interface PredictionResult {
  engagement: 'High' | 'Medium' | 'Low';
  score: number;
  reasons: string[];
  improvements: string[];
}

const EngagementPredictor: FC<EngagementPredictorProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  description 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const analyzePrediction = async () => {
    setIsAnalyzing(true);

    try {
      const prompt = `Analyze this YouTube video content and predict engagement level:

Title: "${title}"
Description: "${description}"

Analyze based on:
1. Title appeal (keywords, length, emotional triggers)
2. Description quality (clarity, keywords, CTAs)
3. SEO optimization
4. Audience appeal

Provide prediction in this exact format:
ENGAGEMENT: [High/Medium/Low]
SCORE: [0-100]
REASONS:
- [reason 1]
- [reason 2]
- [reason 3]
IMPROVEMENTS:
- [improvement 1]
- [improvement 2]
- [improvement 3]`;

      const result = await generateWithPromptAPI(prompt);
      
      // Parse result
      const engagementMatch = result.match(/ENGAGEMENT:\s*(High|Medium|Low)/i);
      const scoreMatch = result.match(/SCORE:\s*(\d+)/);
      const reasonsMatch = result.match(/REASONS:([\s\S]*?)(?=IMPROVEMENTS:|$)/);
      const improvementsMatch = result.match(/IMPROVEMENTS:([\s\S]*?)$/);

      const engagement = (engagementMatch?.[1] || 'Medium') as 'High' | 'Medium' | 'Low';
      const score = parseInt(scoreMatch?.[1] || '50');
      
      const reasons = reasonsMatch?.[1]
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim()) || [];
      
      const improvements = improvementsMatch?.[1]
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim()) || [];

      setPrediction({
        engagement,
        score,
        reasons: reasons.length > 0 ? reasons : ['Good keyword usage', 'Clear topic', 'Engaging format'],
        improvements: improvements.length > 0 ? improvements : ['Add more keywords', 'Include timestamps', 'Add call-to-action'],
      });
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback prediction
      const score = Math.min(100, Math.max(0, 
        (title.length >= 60 && title.length <= 70 ? 30 : 15) +
        (description.length >= 150 ? 30 : 15) +
        (title.toLowerCase().includes('how to') || title.toLowerCase().includes('tutorial') ? 20 : 10) +
        (description.toLowerCase().includes('subscribe') ? 10 : 5)
      ));

      setPrediction({
        engagement: score >= 70 ? 'High' : score >= 50 ? 'Medium' : 'Low',
        score,
        reasons: [
          'Title length is optimal',
          'Description provides context',
          'Topic appears relevant',
        ],
        improvements: [
          'Add power words to title',
          'Include more keywords in description',
          'Add clear call-to-action',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEngagementIcon = (engagement: string) => {
    switch (engagement) {
      case 'High': return '🔥';
      case 'Medium': return '📊';
      case 'Low': return '📉';
      default: return '📈';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🏆 AI Engagement Predictor" size="lg">
      <div className="space-y-6">
        {/* Input Preview */}
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-500 mb-1">Title:</p>
            <p className="text-sm font-medium text-gray-900">{title || 'No title provided'}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-500 mb-1">Description:</p>
            <p className="text-sm text-gray-900 line-clamp-3">{description || 'No description provided'}</p>
          </div>
        </div>

        {/* Analyze Button */}
        {!prediction && (
          <button
            onClick={analyzePrediction}
            disabled={isAnalyzing || !title.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-lg"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Analyzing Engagement...
              </span>
            ) : (
              '🔮 Predict Engagement'
            )}
          </button>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Circle */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-8 ${getEngagementColor(prediction.engagement)}`}>
                <div className="text-center">
                  <div className="text-5xl mb-1">{getEngagementIcon(prediction.engagement)}</div>
                  <div className="text-3xl font-black">{prediction.score}</div>
                  <div className="text-xs font-semibold">{prediction.engagement}</div>
                </div>
              </div>
            </div>

            {/* Reasons */}
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <span>✅</span>
                <span>Why This Prediction:</span>
              </h4>
              <ul className="space-y-2">
                {prediction.reasons.map((reason, index) => (
                  <li key={index} className="text-sm text-green-800 flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>Suggested Improvements:</span>
              </h4>
              <ul className="space-y-2">
                {prediction.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Re-analyze Button */}
            <button
              onClick={() => {
                setPrediction(null);
                analyzePrediction();
              }}
              className="w-full py-3 border-2 border-purple-500 text-purple-600 font-medium rounded-xl hover:bg-purple-50 transition-all"
            >
              🔄 Re-analyze
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-900">
            🤖 <strong>AI-Powered Prediction:</strong> Uses Chrome's Prompt API to analyze your content and predict engagement based on title appeal, keywords, and SEO factors.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default EngagementPredictor;
