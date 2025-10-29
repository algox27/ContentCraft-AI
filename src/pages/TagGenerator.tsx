import { useState } from 'react';
import { useCredits } from '../hooks/useCredits';
import UpgradeModal from '../components/UpgradeModal';

interface KeywordSuggestion {
  keyword: string;
  searchVolume: 'high' | 'medium' | 'low';
  competition: 'high' | 'medium' | 'low';
  relevance: number;
}

interface TagGeneratorProps {
  onBack?: () => void;
}

export default function TagGenerator({ onBack }: TagGeneratorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'keywords' | 'tags' | 'hashtags'>('tags');
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [hashtagSuggestions, setHashtagSuggestions] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const { useCredit, hasCredits } = useCredits();

  // Generate keyword suggestions
  const generateKeywordSuggestions = (query: string): KeywordSuggestion[] => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase().trim();
    const allSuggestions: KeywordSuggestion[] = [];

    const keywordDatabase: Record<string, KeywordSuggestion[]> = {
      react: [
        { keyword: 'react tutorial', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'react hooks', searchVolume: 'high', competition: 'medium', relevance: 95 },
        { keyword: 'react for beginners', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'react useState', searchVolume: 'medium', competition: 'medium', relevance: 85 },
        { keyword: 'react useEffect', searchVolume: 'medium', competition: 'medium', relevance: 85 },
        { keyword: 'react components', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'react props', searchVolume: 'medium', competition: 'low', relevance: 75 },
        { keyword: 'react router', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'react context api', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'react redux', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'react typescript', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'react best practices', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'react performance', searchVolume: 'low', competition: 'low', relevance: 65 },
        { keyword: 'react interview questions', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'react project', searchVolume: 'high', competition: 'medium', relevance: 80 },
        { keyword: 'react app', searchVolume: 'high', competition: 'high', relevance: 75 },
        { keyword: 'react native', searchVolume: 'high', competition: 'high', relevance: 70 },
        { keyword: 'react forms', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'react animation', searchVolume: 'low', competition: 'low', relevance: 60 },
        { keyword: 'react testing', searchVolume: 'medium', competition: 'low', relevance: 65 },
      ],
      world: [
        { keyword: 'world news', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'world cup', searchVolume: 'high', competition: 'high', relevance: 95 },
        { keyword: 'world tour', searchVolume: 'medium', competition: 'medium', relevance: 85 },
        { keyword: 'world record', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'world war', searchVolume: 'medium', competition: 'high', relevance: 75 },
        { keyword: 'world history', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'world geography', searchVolume: 'low', competition: 'low', relevance: 65 },
        { keyword: 'world music', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'world travel', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'world culture', searchVolume: 'low', competition: 'low', relevance: 60 },
        { keyword: 'world politics', searchVolume: 'medium', competition: 'high', relevance: 75 },
        { keyword: 'world economy', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'world events', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'world documentary', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'world facts', searchVolume: 'low', competition: 'low', relevance: 60 },
        { keyword: 'world wonders', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'world heritage', searchVolume: 'low', competition: 'low', relevance: 55 },
        { keyword: 'world leaders', searchVolume: 'medium', competition: 'medium', relevance: 65 },
        { keyword: 'world map', searchVolume: 'medium', competition: 'low', relevance: 60 },
        { keyword: 'world population', searchVolume: 'low', competition: 'low', relevance: 55 },
      ],
    };

    for (const [category, keywords] of Object.entries(keywordDatabase)) {
      if (queryLower.includes(category)) {
        allSuggestions.push(...keywords);
      }
    }

    if (allSuggestions.length === 0) {
      const genericSuffixes = [
        'tutorial', 'for beginners', 'tips', 'guide', 'how to', 'best',
        'explained', 'course', 'full course', 'step by step', 'easy',
        'advanced', 'complete guide', 'basics', 'projects', 'examples',
        'interview questions', 'tricks', 'hacks', '2025', 'in hindi'
      ];

      genericSuffixes.forEach((suffix, index) => {
        allSuggestions.push({
          keyword: `${queryLower} ${suffix}`,
          searchVolume: index < 5 ? 'high' : index < 12 ? 'medium' : 'low',
          competition: index < 8 ? 'high' : index < 15 ? 'medium' : 'low',
          relevance: 100 - (index * 3),
        });
      });
    }

    return allSuggestions.sort((a, b) => b.relevance - a.relevance).slice(0, 20);
  };

  // Generate tag suggestions
  const generateTagSuggestions = (query: string): string[] => {
    const queryLower = query.toLowerCase().trim();
    const allTags: string[] = [];

    const trendingTags: Record<string, string[]> = {
      world: [
        'world news', 'world cup', 'world tour', 'world record', 'world war',
        'world history', 'world geography', 'world music', 'world travel',
        'world culture', 'world politics', 'world economy', 'world events',
        'world documentary', 'world facts', 'world wonders', 'world heritage',
        'world leaders', 'world map', 'world population'
      ],
      tech: [
        'tech news', 'tech review', 'tech tips', 'tech tutorial', 'tech unboxing',
        'tech gadgets', 'tech 2025', 'tech trends', 'tech comparison',
        'tech setup', 'tech guide', 'tech hacks', 'tech explained',
        'tech channel', 'tech vlog', 'tech deals', 'tech innovation',
        'tech startup', 'tech career', 'tech education'
      ],
      gaming: [
        'gaming setup', 'gaming pc', 'gaming laptop', 'gaming tips',
        'gaming news', 'gaming review', 'gaming tutorial', 'gaming stream',
        'gaming highlights', 'gaming montage', 'gaming walkthrough',
        'gaming guide', 'gaming channel', 'gaming gear', 'gaming keyboard',
        'gaming mouse', 'gaming headset', 'gaming chair', 'gaming desk',
        'gaming room'
      ],
    };

    for (const [category, tags] of Object.entries(trendingTags)) {
      if (queryLower.includes(category) || category.includes(queryLower)) {
        allTags.push(...tags);
      }
    }

    if (allTags.length === 0) {
      const tagSuffixes = [
        'tutorial', 'guide', 'tips', 'tricks', 'hacks', 'explained',
        'for beginners', 'advanced', 'complete guide', 'step by step',
        'easy', 'fast', 'best', 'top', 'how to', '2025',
        'course', 'full course', 'crash course', 'masterclass'
      ];

      allTags.push(...tagSuffixes.map(suffix => `${queryLower} ${suffix}`));
    }

    return allTags.slice(0, 20);
  };

  // Generate hashtag suggestions
  const generateHashtagSuggestions = (query: string): string[] => {
    const queryLower = query.toLowerCase().trim();
    const words = queryLower.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const combined = words.join('');

    const allHashtags: string[] = [];

    const trendingHashtags: Record<string, string[]> = {
      world: [
        '#World', '#WorldNews', '#WorldCup', '#WorldTour', '#WorldRecord',
        '#WorldWide', '#WorldTravel', '#WorldMusic', '#WorldCulture',
        '#WorldHistory', '#WorldPolitics', '#WorldEconomy', '#WorldEvents',
        '#WorldDocumentary', '#WorldFacts', '#WorldWonders', '#WorldHeritage',
        '#WorldLeaders', '#WorldMap', '#WorldPopulation'
      ],
      fitness: [
        '#Fitness', '#FitnessMotivation', '#FitnessWorkout', '#FitnessTips',
        '#FitnessTransformation', '#FitnessRoutine', '#FitnessGym',
        '#FitnessHome', '#FitnessBeginner', '#FitnessAdvanced',
        '#FitnessDiet', '#FitnessNutrition', '#FitnessWeightLoss',
        '#FitnessMuscleGain', '#FitnessCardio', '#FitnessStrength',
        '#FitnessYoga', '#FitnessChallenge', '#FitnessJourney', '#FitnessGoals'
      ],
    };

    for (const [category, hashtags] of Object.entries(trendingHashtags)) {
      if (queryLower.includes(category) || category.includes(queryLower)) {
        allHashtags.push(...hashtags);
      }
    }

    if (allHashtags.length === 0) {
      const hashtagVariations = [
        `#${combined}`, `#${combined}Tutorial`, `#${combined}Tips`,
        `#${combined}Guide`, `#Learn${combined}`, `#${combined}2025`,
        `#${combined}ForBeginners`, `#${combined}Explained`, `#${combined}Course`,
        `#${combined}Hacks`, `#${combined}Tricks`, `#${combined}Pro`,
        `#${combined}Master`, `#${combined}Expert`, `#${combined}Community`,
        `#${combined}Life`, `#${combined}Daily`, `#${combined}Channel`,
        `#${combined}Content`, `#${combined}Creator`,
      ];

      allHashtags.push(...hashtagVariations);
    }

    return allHashtags.slice(0, 20);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Check if user has credits
    if (!hasCredits()) {
      setShowUpgradeModal(true);
      return;
    }

    // Use a credit
    const success = await useCredit('generate', 'YouTube Tag Generator', {
      query: searchQuery,
      type: activeTab,
    });

    if (!success) {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (activeTab === 'keywords') {
        setSuggestions(generateKeywordSuggestions(searchQuery));
      } else if (activeTab === 'tags') {
        setTagSuggestions(generateTagSuggestions(searchQuery));
      } else {
        setHashtagSuggestions(generateHashtagSuggestions(searchQuery));
      }
      setIsLoading(false);
    }, 300);
  };

  const handleItemClick = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeFromSelected = (item: string) => {
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  const copyAllSelected = () => {
    const text = selectedItems.join(', ');
    navigator.clipboard.writeText(text);
  };

  const clearAllSelected = () => {
    setSelectedItems([]);
  };

  return (
    <div className="tag-generator-page">
      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={onBack} className="back-button">
          ← Back to Analyzer
        </button>
      </div>

      {/* Header */}
      <div className="page-header">
        <div className="header-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <h1>YouTube Tag Generator</h1>
        <p>Generate trending tags, keywords, and hashtags for your videos</p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter your keyword (e.g., world, tech, gaming)"
            className="search-input"
          />
          <button onClick={handleSearch} className="generate-btn" disabled={!searchQuery.trim() || isLoading}>
            {isLoading ? '⏳ Generating...' : '🚀 Generate'}
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'keywords' ? 'active' : ''}`}
            onClick={() => setActiveTab('keywords')}
          >
            🔑 Keywords
          </button>
          <button
            className={`tab ${activeTab === 'tags' ? 'active' : ''}`}
            onClick={() => setActiveTab('tags')}
          >
            🏷️ Tags
          </button>
          <button
            className={`tab ${activeTab === 'hashtags' ? 'active' : ''}`}
            onClick={() => setActiveTab('hashtags')}
          >
            # Hashtags
          </button>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="suggestions-section">
        <div className="suggestions-header">
          <h3>Click on a tag you like if you want to temporarily store it in the box below.</h3>
        </div>

        <div className="suggestions-grid">
          {activeTab === 'keywords' && suggestions.map((item, index) => (
            <button
              key={index}
              className="suggestion-pill"
              onClick={() => handleItemClick(item.keyword)}
            >
              {item.keyword}
            </button>
          ))}

          {activeTab === 'tags' && tagSuggestions.map((item, index) => (
            <button
              key={index}
              className="suggestion-pill"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          ))}

          {activeTab === 'hashtags' && hashtagSuggestions.map((item, index) => (
            <button
              key={index}
              className="suggestion-pill hashtag-pill"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Items Section */}
      <div className="selected-section">
        <div className="selected-header">
          <h3>📋 Your tag list</h3>
          <div className="selected-actions">
            <button onClick={copyAllSelected} className="action-btn copy-btn" disabled={selectedItems.length === 0}>
              📋 Copy All
            </button>
            <button onClick={clearAllSelected} className="action-btn clear-btn" disabled={selectedItems.length === 0}>
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="selected-textarea-container">
          <textarea
            value={selectedItems.join(', ')}
            readOnly
            className="selected-textarea"
            placeholder="Click on suggestions above to add them here..."
            rows={4}
          />
        </div>

        {selectedItems.length > 0 && (
          <div className="selected-pills">
            {selectedItems.map((item, index) => (
              <div key={index} className="selected-pill">
                <span>{item}</span>
                <button onClick={() => removeFromSelected(item)} className="remove-btn">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tag-generator-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f0f0f0 100%);
          padding: 20px 20px 40px;
        }

        .back-button-container {
          max-width: 1200px;
          margin: 0 auto 20px;
        }

        .back-button {
          padding: 10px 20px;
          background: white;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .back-button:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #1e293b;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 20px;
          color: white;
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .page-header h1 {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 12px 0;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .page-header p {
          font-size: 18px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }

        .search-section {
          max-width: 900px;
          margin: 0 auto 40px;
        }

        .search-input-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .search-input {
          flex: 1;
          padding: 16px 24px;
          font-size: 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #1e293b;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .generate-btn {
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .tab {
          padding: 12px 32px;
          font-size: 16px;
          font-weight: 600;
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover {
          border-color: #cbd5e1;
          color: #475569;
        }

        .tab.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .suggestions-section {
          max-width: 1200px;
          margin: 0 auto 40px;
          background: white;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .suggestions-header h3 {
          margin: 0 0 24px 0;
          font-size: 15px;
          color: #64748b;
          font-weight: 500;
        }

        .suggestions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .suggestion-pill {
          padding: 10px 18px;
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .suggestion-pill:hover {
          background: #dbeafe;
          border-color: #93c5fd;
          transform: translateY(-1px);
        }

        .hashtag-pill {
          background: #eff6ff;
          color: #1e40af;
          border-color: #dbeafe;
        }

        .hashtag-pill:hover {
          background: #dbeafe;
          border-color: #93c5fd;
        }

        .selected-section {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .selected-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .selected-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .selected-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          color: #475569;
        }

        .copy-btn:hover:not(:disabled) {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .clear-btn:hover:not(:disabled) {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .selected-textarea-container {
          margin-bottom: 20px;
        }

        .selected-textarea {
          width: 100%;
          padding: 16px;
          font-size: 15px;
          font-family: inherit;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          resize: vertical;
          color: #1e293b;
          background: #f8fafc;
        }

        .selected-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .selected-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .selected-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #3b82f6;
          color: white;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .remove-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          color: white;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 32px;
          }

          .search-input-container {
            flex-direction: column;
          }

          .tabs {
            flex-direction: column;
          }

          .selected-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .selected-actions {
            width: 100%;
          }

          .action-btn {
            flex: 1;
          }
        }
      `}</style>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
}
