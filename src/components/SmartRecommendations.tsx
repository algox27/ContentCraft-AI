import { useState } from 'react';

interface SmartRecommendationsProps {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  onAddTag: (tag: string) => void;
  onAddHashtag: (hashtag: string) => void;
  onSetTitle: (title: string) => void;
}

interface TrendingHashtag {
  tag: string;
  trend: 'hot' | 'rising' | 'popular';
  category: string;
}

export default function SmartRecommendations({
  title,
  description,
  tags,
  hashtags,
  onAddTag,
  onAddHashtag,
  onSetTitle,
}: SmartRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'tags' | 'hashtags' | 'titles'>('hashtags');

  // Get context from title and description
  const getContext = () => {
    return (title + ' ' + description).toLowerCase();
  };

  // Smart tag suggestions based on input
  const getTagSuggestions = (): string[] => {
    const context = getContext();
    const query = searchQuery.toLowerCase();

    let suggestions: string[] = [];

    // Category-based suggestions
    if (context.includes('react') || context.includes('javascript') || query.includes('react') || query.includes('js')) {
      suggestions = ['react', 'javascript', 'web development', 'coding', 'tutorial', 'frontend', 'programming', 'reactjs'];
    } else if (context.includes('python') || query.includes('python')) {
      suggestions = ['python', 'programming', 'coding', 'tutorial', 'data science', 'machine learning', 'python tutorial'];
    } else if (context.includes('game') || context.includes('gaming') || query.includes('game')) {
      suggestions = ['gaming', 'gameplay', 'game review', 'walkthrough', 'lets play', 'gaming tips', 'gamer'];
    } else if (context.includes('cook') || context.includes('recipe') || query.includes('cook')) {
      suggestions = ['cooking', 'recipe', 'food', 'kitchen', 'chef', 'delicious', 'easy recipe'];
    } else if (context.includes('fitness') || context.includes('workout') || query.includes('fitness')) {
      suggestions = ['fitness', 'workout', 'gym', 'exercise', 'health', 'training', 'bodybuilding'];
    } else if (context.includes('music') || query.includes('music')) {
      suggestions = ['music', 'song', 'cover', 'musician', 'music video', 'audio', 'beats'];
    } else if (context.includes('tutorial') || context.includes('how to') || query.includes('tutorial')) {
      suggestions = ['tutorial', 'guide', 'how to', 'learn', 'education', 'tips', 'beginner'];
    } else if (context.includes('vlog') || query.includes('vlog')) {
      suggestions = ['vlog', 'daily vlog', 'lifestyle', 'vlogger', 'day in the life', 'travel vlog', 'family vlog'];
    } else if (context.includes('review') || query.includes('review')) {
      suggestions = ['review', 'product review', 'unboxing', 'honest review', 'tech review', 'comparison'];
    } else {
      suggestions = ['trending', 'viral', 'popular', 'new', 'best', 'top', 'guide', '2025'];
    }

    // Filter out already used tags
    suggestions = suggestions.filter(tag => !tags.includes(tag));

    // Filter by search query if provided
    if (query) {
      suggestions = suggestions.filter(tag => tag.toLowerCase().includes(query));
    }

    return suggestions.slice(0, 8);
  };

  // Smart hashtag suggestions
  const getHashtagSuggestions = (): TrendingHashtag[] => {
    const context = getContext();
    const query = searchQuery.toLowerCase();

    let suggestedHashtags: TrendingHashtag[] = [];

    if (context.includes('react') || context.includes('javascript') || query.includes('react') || query.includes('js')) {
      suggestedHashtags = [
        { tag: '#ReactJS', trend: 'hot', category: 'tech' },
        { tag: '#JavaScript', trend: 'hot', category: 'tech' },
        { tag: '#WebDev', trend: 'rising', category: 'tech' },
        { tag: '#Coding', trend: 'popular', category: 'tech' },
        { tag: '#Programming', trend: 'popular', category: 'tech' },
        { tag: '#FrontEnd', trend: 'rising', category: 'tech' },
        { tag: '#LearnToCode', trend: 'popular', category: 'education' },
        { tag: '#DevLife', trend: 'rising', category: 'lifestyle' },
      ];
    } else if (context.includes('python') || query.includes('python')) {
      suggestedHashtags = [
        { tag: '#Python', trend: 'hot', category: 'tech' },
        { tag: '#DataScience', trend: 'hot', category: 'tech' },
        { tag: '#MachineLearning', trend: 'rising', category: 'tech' },
        { tag: '#AI', trend: 'hot', category: 'tech' },
        { tag: '#Coding', trend: 'popular', category: 'tech' },
        { tag: '#Programming', trend: 'popular', category: 'tech' },
        { tag: '#PythonTutorial', trend: 'rising', category: 'education' },
        { tag: '#LearnPython', trend: 'popular', category: 'education' },
      ];
    } else if (context.includes('game') || context.includes('gaming') || query.includes('game')) {
      suggestedHashtags = [
        { tag: '#Gaming', trend: 'hot', category: 'gaming' },
        { tag: '#Gamer', trend: 'hot', category: 'gaming' },
        { tag: '#GamePlay', trend: 'popular', category: 'gaming' },
        { tag: '#LetsPlay', trend: 'rising', category: 'gaming' },
        { tag: '#GamingCommunity', trend: 'popular', category: 'gaming' },
        { tag: '#VideoGames', trend: 'popular', category: 'gaming' },
        { tag: '#Twitch', trend: 'rising', category: 'gaming' },
        { tag: '#Streamer', trend: 'rising', category: 'gaming' },
      ];
    } else if (context.includes('cook') || context.includes('recipe') || query.includes('cook')) {
      suggestedHashtags = [
        { tag: '#Cooking', trend: 'hot', category: 'food' },
        { tag: '#Recipe', trend: 'hot', category: 'food' },
        { tag: '#Food', trend: 'popular', category: 'food' },
        { tag: '#Foodie', trend: 'popular', category: 'food' },
        { tag: '#Chef', trend: 'rising', category: 'food' },
        { tag: '#EasyRecipe', trend: 'rising', category: 'food' },
        { tag: '#Delicious', trend: 'popular', category: 'food' },
        { tag: '#HomeCooking', trend: 'rising', category: 'food' },
      ];
    } else if (context.includes('fitness') || context.includes('workout') || query.includes('fitness')) {
      suggestedHashtags = [
        { tag: '#Fitness', trend: 'hot', category: 'health' },
        { tag: '#Workout', trend: 'hot', category: 'health' },
        { tag: '#Gym', trend: 'popular', category: 'health' },
        { tag: '#FitnessMotivation', trend: 'rising', category: 'health' },
        { tag: '#Health', trend: 'popular', category: 'health' },
        { tag: '#Exercise', trend: 'popular', category: 'health' },
        { tag: '#FitLife', trend: 'rising', category: 'lifestyle' },
        { tag: '#Training', trend: 'rising', category: 'health' },
      ];
    } else if (context.includes('music') || query.includes('music')) {
      suggestedHashtags = [
        { tag: '#Music', trend: 'hot', category: 'entertainment' },
        { tag: '#Song', trend: 'hot', category: 'entertainment' },
        { tag: '#MusicVideo', trend: 'popular', category: 'entertainment' },
        { tag: '#Cover', trend: 'rising', category: 'entertainment' },
        { tag: '#Musician', trend: 'popular', category: 'entertainment' },
        { tag: '#NewMusic', trend: 'rising', category: 'entertainment' },
        { tag: '#Audio', trend: 'popular', category: 'entertainment' },
        { tag: '#Beats', trend: 'rising', category: 'entertainment' },
      ];
    } else if (context.includes('tutorial') || context.includes('how to') || query.includes('tutorial')) {
      suggestedHashtags = [
        { tag: '#Tutorial', trend: 'hot', category: 'education' },
        { tag: '#HowTo', trend: 'hot', category: 'education' },
        { tag: '#Learn', trend: 'popular', category: 'education' },
        { tag: '#Education', trend: 'popular', category: 'education' },
        { tag: '#Guide', trend: 'rising', category: 'education' },
        { tag: '#Tips', trend: 'rising', category: 'education' },
        { tag: '#Beginner', trend: 'popular', category: 'education' },
        { tag: '#StepByStep', trend: 'rising', category: 'education' },
      ];
    } else if (context.includes('vlog') || query.includes('vlog')) {
      suggestedHashtags = [
        { tag: '#Vlog', trend: 'hot', category: 'lifestyle' },
        { tag: '#DailyVlog', trend: 'hot', category: 'lifestyle' },
        { tag: '#Vlogger', trend: 'popular', category: 'lifestyle' },
        { tag: '#LifeStyle', trend: 'popular', category: 'lifestyle' },
        { tag: '#DayInTheLife', trend: 'rising', category: 'lifestyle' },
        { tag: '#Travel', trend: 'popular', category: 'lifestyle' },
        { tag: '#Family', trend: 'rising', category: 'lifestyle' },
        { tag: '#VlogLife', trend: 'rising', category: 'lifestyle' },
      ];
    } else {
      suggestedHashtags = [
        { tag: '#Trending', trend: 'hot', category: 'general' },
        { tag: '#Viral', trend: 'hot', category: 'general' },
        { tag: '#YouTube', trend: 'popular', category: 'general' },
        { tag: '#Subscribe', trend: 'popular', category: 'general' },
        { tag: '#New', trend: 'rising', category: 'general' },
        { tag: '#2025', trend: 'rising', category: 'general' },
        { tag: '#MustWatch', trend: 'rising', category: 'general' },
        { tag: '#Popular', trend: 'popular', category: 'general' },
      ];
    }

    // Filter out already used hashtags (from props)
    const usedHashtagsLower = hashtags.map(h => h.toLowerCase());
    let filteredHashtags = suggestedHashtags.filter(h => !usedHashtagsLower.includes(h.tag.toLowerCase()));

    // Filter by search query if provided
    if (query) {
      filteredHashtags = filteredHashtags.filter(h => h.tag.toLowerCase().includes(query));
    }

    return filteredHashtags.slice(0, 10);
  };

  // Smart title suggestions
  const getTitleSuggestions = (): string[] => {
    const currentTitle = title.trim();

    if (!currentTitle) {
      return [
        'How to [Your Topic] in 2025 - Complete Guide',
        '[Number] Tips for [Your Topic] That Actually Work',
        'The Ultimate [Your Topic] Tutorial for Beginners',
        '[Your Topic] Explained: Everything You Need to Know',
        'I Tried [Your Topic] for 30 Days - Here\'s What Happened',
      ];
    }

    const suggestions: string[] = [];
    const titleLower = currentTitle.toLowerCase();

    // Add numbers if missing
    if (!/\d/.test(currentTitle)) {
      suggestions.push(`${currentTitle} - 5 Essential Tips`);
      suggestions.push(`10 Things About ${currentTitle}`);
    }

    // Add year if missing
    if (!titleLower.includes('2025') && !titleLower.includes('2024')) {
      suggestions.push(`${currentTitle} in 2025`);
      suggestions.push(`${currentTitle} - 2025 Guide`);
    }

    // Add power words
    if (!titleLower.includes('ultimate') && !titleLower.includes('complete')) {
      suggestions.push(`The Ultimate ${currentTitle}`);
      suggestions.push(`Complete ${currentTitle} Guide`);
    }

    // Add question format
    if (!titleLower.startsWith('how') && !titleLower.startsWith('what') && !titleLower.startsWith('why')) {
      suggestions.push(`How to ${currentTitle}`);
      suggestions.push(`What is ${currentTitle}?`);
    }

    // Add emotional hooks
    suggestions.push(`${currentTitle} - You Won't Believe This!`);
    suggestions.push(`${currentTitle} Changed My Life`);

    return suggestions.slice(0, 6);
  };

  const tagSuggestions = getTagSuggestions();
  const hashtagSuggestions = getHashtagSuggestions();
  const titleSuggestions = getTitleSuggestions();

  return (
    <div className="smart-recommendations">
      <div className="recommendations-header">
        <h3>🎯 Smart Recommendations</h3>
        <p>AI-powered suggestions based on your content</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'hashtags' ? 'active' : ''}`}
          onClick={() => setActiveTab('hashtags')}
        >
          🏷️ Hashtags
        </button>
        <button
          className={`tab ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          🔖 Tags
        </button>
        <button
          className={`tab ${activeTab === 'titles' ? 'active' : ''}`}
          onClick={() => setActiveTab('titles')}
        >
          📝 Titles
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search suggestions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="suggestions-content">
        {activeTab === 'hashtags' && (
          <div className="hashtag-suggestions">
            {hashtagSuggestions.length > 0 ? (
              <div className="suggestion-grid">
                {hashtagSuggestions.map((hashtag, index) => (
                  <button
                    key={index}
                    className={`suggestion-item hashtag-item ${hashtag.trend}`}
                    onClick={() => onAddHashtag(hashtag.tag)}
                  >
                    <span className="hashtag-text">{hashtag.tag}</span>
                    <span className={`trend-badge ${hashtag.trend}`}>
                      {hashtag.trend === 'hot' && '🔥'}
                      {hashtag.trend === 'rising' && '📈'}
                      {hashtag.trend === 'popular' && '⭐'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No hashtag suggestions found. Try different keywords!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="tag-suggestions">
            {tagSuggestions.length > 0 ? (
              <div className="suggestion-grid">
                {tagSuggestions.map((tag, index) => (
                  <button
                    key={index}
                    className="suggestion-item tag-item"
                    onClick={() => onAddTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No tag suggestions found. Try different keywords!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'titles' && (
          <div className="title-suggestions">
            {titleSuggestions.length > 0 ? (
              <div className="suggestion-list">
                {titleSuggestions.map((titleSuggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-item title-item"
                    onClick={() => onSetTitle(titleSuggestion)}
                  >
                    <span className="title-icon">💡</span>
                    <span className="title-text">{titleSuggestion}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Enter a title to get smart suggestions!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .smart-recommendations {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }

        .recommendations-header h3 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 700;
        }

        .recommendations-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 14px;
        }

        .tabs {
          display: flex;
          gap: 8px;
          margin: 20px 0;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }

        .tab {
          background: transparent;
          border: none;
          color: white;
          padding: 12px 20px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .tab:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        .tab.active {
          opacity: 1;
          border-bottom-color: white;
        }

        .search-box {
          margin: 20px 0;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-input:focus {
          outline: none;
          border-color: white;
          background: rgba(255, 255, 255, 0.15);
        }

        .suggestions-content {
          margin-top: 20px;
        }

        .suggestion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
        }

        .suggestion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .suggestion-item {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
          text-align: left;
        }

        .suggestion-item:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .hashtag-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trend-badge {
          font-size: 18px;
        }

        .title-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
        }

        .title-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .title-text {
          flex: 1;
          font-size: 15px;
          line-height: 1.4;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          opacity: 0.8;
        }

        .empty-state p {
          margin: 0;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .suggestion-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }

          .tabs {
            overflow-x: auto;
          }

          .tab {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}