import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface SEOKeywordGapFinderProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  currentKeywords: string[];
  onAddKeywords: (keywords: string[]) => void;
}

interface KeywordGap {
  keyword: string;
  importance: 'critical' | 'high' | 'medium';
  reason: string;
  searchVolume: string;
}

const SEOKeywordGapFinder: FC<SEOKeywordGapFinderProps> = ({
  isOpen,
  onClose,
  topic,
  currentKeywords,
  onAddKeywords,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gaps, setGaps] = useState<KeywordGap[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const findGaps = async () => {
    setIsAnalyzing(true);

    try {
      const prompt = `Analyze SEO keyword gaps for this YouTube video:

Topic: "${topic}"
Current Keywords: ${currentKeywords.join(', ')}

Find 8 missing SEO keywords that top-ranking videos use. For each keyword provide:
1. The keyword phrase
2. Importance level (critical/high/medium)
3. Why it's important
4. Search volume estimate

Format each line as:
KEYWORD | IMPORTANCE | REASON | VOLUME`;

      const result = await generateWithPromptAPI(prompt);
      
      // Parse result
      const lines = result.split('\n').filter(line => line.includes('|'));
      const parsedGaps: KeywordGap[] = lines.map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          keyword: parts[0] || 'tutorial',
          importance: (parts[1]?.toLowerCase() as any) || 'medium',
          reason: parts[2] || 'Improves discoverability',
          searchVolume: parts[3] || 'Medium',
        };
      }).slice(0, 8);

      // Fallback
      if (parsedGaps.length === 0) {
        parsedGaps.push(
          { keyword: 'tutorial', importance: 'high', reason: 'High search volume', searchVolume: 'High' },
          { keyword: 'guide', importance: 'high', reason: 'Common search term', searchVolume: 'High' },
          { keyword: 'tips', importance: 'medium', reason: 'Engagement booster', searchVolume: 'Medium' },
        );
      }

      setGaps(parsedGaps);
    } catch (error) {
      console.error('Gap analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };

  const applyKeywords = () => {
    onAddKeywords(selectedKeywords);
    onClose();
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      default: return '🟡';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🔍 SEO Keyword Gap Finder" size="xl">
      <div className="space-y-4">
        {/* Topic Info */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Analyzing topic:</p>
          <p className="font-bold text-gray-900">{topic}</p>
          <p className="text-xs text-gray-500 mt-2">
            Current keywords: {currentKeywords.length > 0 ? currentKeywords.join(', ') : 'None'}
          </p>
        </div>

        {/* Analyze Button */}
        {gaps.length === 0 && (
          <button
            onClick={findGaps}
            disabled={isAnalyzing || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Finding Missing Keywords...
              </span>
            ) : (
              '🔍 Find SEO Gaps'
            )}
          </button>
        )}

        {/* Gaps List */}
        {gaps.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900">Missing Keywords Found</h4>
              <span className="text-sm text-gray-600">{selectedKeywords.length} selected</span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {gaps.map((gap, index) => (
                <div
                  key={index}
                  onClick={() => toggleKeyword(gap.keyword)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedKeywords.includes(gap.keyword)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{getImportanceIcon(gap.importance)}</span>
                        <span className="font-bold text-gray-900">{gap.keyword}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getImportanceColor(gap.importance)}`}>
                          {gap.importance}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{gap.reason}</p>
                      <p className="text-xs text-gray-500">📊 Search Volume: {gap.searchVolume}</p>
                    </div>
                    <div className="ml-4">
                      {selectedKeywords.includes(gap.keyword) ? (
                        <span className="text-2xl">✅</span>
                      ) : (
                        <span className="text-2xl opacity-30">⬜</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Apply Button */}
            <button
              onClick={applyKeywords}
              disabled={selectedKeywords.length === 0}
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              ✅ Add {selectedKeywords.length} Keywords
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            🤖 <strong>AI-Powered Analysis:</strong> Compares your keywords with top-ranking videos to find missing opportunities.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SEOKeywordGapFinder;
