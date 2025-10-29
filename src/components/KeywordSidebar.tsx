import { useState } from 'react';

interface KeywordSuggestion {
  keyword: string;
  searchVolume: 'high' | 'medium' | 'low';
  competition: 'high' | 'medium' | 'low';
  relevance: number;
}

interface KeywordSidebarProps {
  onSelectKeyword: (keyword: string, type: 'keyword' | 'tag' | 'hashtag') => void;
}

export default function KeywordSidebar({ onSelectKeyword }: KeywordSidebarProps) {
  const [keywordSearch, setKeywordSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [hashtagSearch, setHashtagSearch] = useState('');
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [hashtagSuggestions, setHashtagSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'keywords' | 'tags' | 'hashtags'>('keywords');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Generate keyword suggestions based on search query
  const generateKeywordSuggestions = (query: string): KeywordSuggestion[] => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase().trim();
    const allSuggestions: KeywordSuggestion[] = [];

    // Category-based keyword database
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
      javascript: [
        { keyword: 'javascript tutorial', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'javascript for beginners', searchVolume: 'high', competition: 'high', relevance: 95 },
        { keyword: 'javascript basics', searchVolume: 'high', competition: 'medium', relevance: 90 },
        { keyword: 'javascript array methods', searchVolume: 'medium', competition: 'medium', relevance: 85 },
        { keyword: 'javascript promises', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'javascript async await', searchVolume: 'medium', competition: 'medium', relevance: 85 },
        { keyword: 'javascript es6', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'javascript dom manipulation', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'javascript projects', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'javascript interview questions', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'javascript functions', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'javascript objects', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'javascript closures', searchVolume: 'low', competition: 'low', relevance: 65 },
        { keyword: 'javascript tips', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'javascript tricks', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'javascript course', searchVolume: 'high', competition: 'high', relevance: 80 },
        { keyword: 'javascript roadmap', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'javascript frameworks', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'javascript vs python', searchVolume: 'medium', competition: 'medium', relevance: 60 },
        { keyword: 'javascript full course', searchVolume: 'high', competition: 'high', relevance: 85 },
      ],
      python: [
        { keyword: 'python tutorial', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'python for beginners', searchVolume: 'high', competition: 'high', relevance: 95 },
        { keyword: 'python programming', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'python projects', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'python data science', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'python machine learning', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'python pandas', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'python numpy', searchVolume: 'medium', competition: 'low', relevance: 75 },
        { keyword: 'python django', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'python flask', searchVolume: 'medium', competition: 'low', relevance: 75 },
        { keyword: 'python automation', searchVolume: 'medium', competition: 'low', relevance: 80 },
        { keyword: 'python web scraping', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'python interview questions', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'python course', searchVolume: 'high', competition: 'high', relevance: 80 },
        { keyword: 'python basics', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'python functions', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'python lists', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'python dictionaries', searchVolume: 'low', competition: 'low', relevance: 60 },
        { keyword: 'python oop', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'python full course', searchVolume: 'high', competition: 'high', relevance: 90 },
      ],
      gaming: [
        { keyword: 'gaming setup', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'gaming pc build', searchVolume: 'high', competition: 'high', relevance: 95 },
        { keyword: 'gaming laptop', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'gaming headset', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'gaming keyboard', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'gaming mouse', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'gaming chair', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'gaming monitor', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'gaming tips', searchVolume: 'medium', competition: 'low', relevance: 75 },
        { keyword: 'gaming highlights', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'gaming montage', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'gaming news', searchVolume: 'medium', competition: 'medium', relevance: 65 },
        { keyword: 'gaming review', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'gaming stream', searchVolume: 'medium', competition: 'high', relevance: 75 },
        { keyword: 'gaming channel', searchVolume: 'low', competition: 'high', relevance: 60 },
        { keyword: 'gaming room tour', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'gaming accessories', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'gaming desk setup', searchVolume: 'medium', competition: 'low', relevance: 75 },
        { keyword: 'gaming graphics card', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'gaming performance', searchVolume: 'low', competition: 'low', relevance: 60 },
      ],
      cooking: [
        { keyword: 'cooking recipes', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'cooking for beginners', searchVolume: 'high', competition: 'medium', relevance: 95 },
        { keyword: 'cooking tips', searchVolume: 'medium', competition: 'low', relevance: 90 },
        { keyword: 'cooking hacks', searchVolume: 'medium', competition: 'low', relevance: 85 },
        { keyword: 'cooking techniques', searchVolume: 'medium', competition: 'low', relevance: 80 },
        { keyword: 'cooking chicken', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'cooking pasta', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'cooking rice', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'cooking vegetables', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'cooking steak', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'cooking fish', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'cooking eggs', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'cooking basics', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'cooking show', searchVolume: 'medium', competition: 'high', relevance: 70 },
        { keyword: 'cooking channel', searchVolume: 'low', competition: 'high', relevance: 60 },
        { keyword: 'cooking tutorial', searchVolume: 'high', competition: 'medium', relevance: 80 },
        { keyword: 'cooking easy recipes', searchVolume: 'high', competition: 'high', relevance: 90 },
        { keyword: 'cooking healthy meals', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'cooking quick meals', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'cooking desserts', searchVolume: 'medium', competition: 'medium', relevance: 75 },
      ],
      fitness: [
        { keyword: 'fitness workout', searchVolume: 'high', competition: 'high', relevance: 100 },
        { keyword: 'fitness motivation', searchVolume: 'high', competition: 'high', relevance: 95 },
        { keyword: 'fitness tips', searchVolume: 'medium', competition: 'low', relevance: 90 },
        { keyword: 'fitness for beginners', searchVolume: 'high', competition: 'medium', relevance: 90 },
        { keyword: 'fitness transformation', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'fitness routine', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'fitness exercises', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'fitness at home', searchVolume: 'high', competition: 'medium', relevance: 85 },
        { keyword: 'fitness gym', searchVolume: 'medium', competition: 'high', relevance: 75 },
        { keyword: 'fitness diet', searchVolume: 'medium', competition: 'medium', relevance: 80 },
        { keyword: 'fitness weight loss', searchVolume: 'high', competition: 'high', relevance: 85 },
        { keyword: 'fitness muscle gain', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'fitness cardio', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'fitness strength training', searchVolume: 'medium', competition: 'low', relevance: 70 },
        { keyword: 'fitness yoga', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'fitness challenge', searchVolume: 'medium', competition: 'medium', relevance: 75 },
        { keyword: 'fitness journey', searchVolume: 'medium', competition: 'low', relevance: 65 },
        { keyword: 'fitness goals', searchVolume: 'low', competition: 'low', relevance: 60 },
        { keyword: 'fitness equipment', searchVolume: 'medium', competition: 'medium', relevance: 70 },
        { keyword: 'fitness nutrition', searchVolume: 'medium', competition: 'medium', relevance: 75 },
      ],
    };

    // Find matching category
    for (const [category, keywords] of Object.entries(keywordDatabase)) {
      if (queryLower.includes(category)) {
        allSuggestions.push(...keywords);
      }
    }

    // If no category match, generate generic suggestions
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

    // Sort by relevance and return top 20
    return allSuggestions
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 20);
  };

  const handleKeywordSearch = (query: string) => {
    setKeywordSearch(query);
    
    if (query.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        const results = generateKeywordSuggestions(query);
        setSuggestions(results);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleTagSearch = (query: string) => {
    setTagSearch(query);
    
    if (query.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        const results = generateTagSuggestions(query);
        setTagSuggestions(results);
        setIsLoading(false);
      }, 300);
    } else {
      setTagSuggestions([]);
    }
  };

  const handleHashtagSearch = (query: string) => {
    setHashtagSearch(query);
    
    if (query.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        const results = generateHashtagSuggestions(query);
        setHashtagSuggestions(results);
        setIsLoading(false);
      }, 300);
    } else {
      setHashtagSuggestions([]);
    }
  };

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Generate tag suggestions with trending tags
  const generateTagSuggestions = (query: string): string[] => {
    const queryLower = query.toLowerCase().trim();
    const allTags: string[] = [];
    
    // Trending tags database
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
      music: [
        'music video', 'music cover', 'music tutorial', 'music production',
        'music theory', 'music remix', 'music playlist', 'music live',
        'music reaction', 'music review', 'music lesson', 'music beats',
        'music instrumental', 'music mashup', 'music acoustic',
        'music studio', 'music mixing', 'music recording', 'music tips',
        'music channel'
      ],
      food: [
        'food recipe', 'food vlog', 'food review', 'food challenge',
        'food mukbang', 'food asmr', 'food tutorial', 'food cooking',
        'food street', 'food travel', 'food tasting', 'food preparation',
        'food healthy', 'food easy', 'food quick', 'food delicious',
        'food homemade', 'food restaurant', 'food delivery', 'food channel'
      ],
      fitness: [
        'fitness workout', 'fitness motivation', 'fitness tips',
        'fitness transformation', 'fitness routine', 'fitness gym',
        'fitness home', 'fitness beginner', 'fitness advanced',
        'fitness diet', 'fitness nutrition', 'fitness weight loss',
        'fitness muscle gain', 'fitness cardio', 'fitness strength',
        'fitness yoga', 'fitness challenge', 'fitness journey',
        'fitness goals', 'fitness lifestyle'
      ],
    };

    // Check if query matches any category
    for (const [category, tags] of Object.entries(trendingTags)) {
      if (queryLower.includes(category) || category.includes(queryLower)) {
        allTags.push(...tags);
      }
    }

    // If no category match, generate generic tags
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

  // Generate hashtag suggestions with trending hashtags
  const generateHashtagSuggestions = (query: string): string[] => {
    const queryLower = query.toLowerCase().trim();
    const words = queryLower.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1));
    const combined = words.join('');
    
    const allHashtags: string[] = [];

    // Trending hashtags database
    const trendingHashtags: Record<string, string[]> = {
      world: [
        '#World', '#WorldNews', '#WorldCup', '#WorldTour', '#WorldRecord',
        '#WorldWide', '#WorldTravel', '#WorldMusic', '#WorldCulture',
        '#WorldHistory', '#WorldPolitics', '#WorldEconomy', '#WorldEvents',
        '#WorldDocumentary', '#WorldFacts', '#WorldWonders', '#WorldHeritage',
        '#WorldLeaders', '#WorldMap', '#WorldPopulation'
      ],
      tech: [
        '#Tech', '#Technology', '#TechNews', '#TechReview', '#TechTips',
        '#TechTutorial', '#TechGadgets', '#Tech2025', '#TechTrends',
        '#TechSetup', '#TechGuide', '#TechHacks', '#TechExplained',
        '#TechChannel', '#TechVlog', '#TechDeals', '#TechInnovation',
        '#TechStartup', '#TechCareer', '#TechEducation'
      ],
      gaming: [
        '#Gaming', '#Gamer', '#GamingSetup', '#GamingPC', '#GamingLaptop',
        '#GamingTips', '#GamingNews', '#GamingReview', '#GamingStream',
        '#GamingHighlights', '#GamingMontage', '#GamingWalkthrough',
        '#GamingGuide', '#GamingChannel', '#GamingGear', '#GamingCommunity',
        '#GamingLife', '#GamingDaily', '#GamingContent', '#GamingCreator'
      ],
      music: [
        '#Music', '#MusicVideo', '#MusicCover', '#MusicTutorial',
        '#MusicProduction', '#MusicTheory', '#MusicRemix', '#MusicPlaylist',
        '#MusicLive', '#MusicReaction', '#MusicReview', '#MusicLesson',
        '#MusicBeats', '#MusicInstrumental', '#MusicMashup', '#MusicAcoustic',
        '#MusicStudio', '#MusicMixing', '#MusicRecording', '#MusicChannel'
      ],
      food: [
        '#Food', '#FoodRecipe', '#FoodVlog', '#FoodReview', '#FoodChallenge',
        '#FoodMukbang', '#FoodASMR', '#FoodTutorial', '#FoodCooking',
        '#FoodStreet', '#FoodTravel', '#FoodTasting', '#FoodPreparation',
        '#FoodHealthy', '#FoodEasy', '#FoodQuick', '#FoodDelicious',
        '#FoodHomemade', '#FoodRestaurant', '#FoodChannel'
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

    // Check if query matches any category
    for (const [category, hashtags] of Object.entries(trendingHashtags)) {
      if (queryLower.includes(category) || category.includes(queryLower)) {
        allHashtags.push(...hashtags);
      }
    }

    // If no category match, generate generic hashtags
    if (allHashtags.length === 0) {
      const hashtagVariations = [
        `#${combined}`,
        `#${combined}Tutorial`,
        `#${combined}Tips`,
        `#${combined}Guide`,
        `#Learn${combined}`,
        `#${combined}2025`,
        `#${combined}ForBeginners`,
        `#${combined}Explained`,
        `#${combined}Course`,
        `#${combined}Hacks`,
        `#${combined}Tricks`,
        `#${combined}Pro`,
        `#${combined}Master`,
        `#${combined}Expert`,
        `#${combined}Community`,
        `#${combined}Life`,
        `#${combined}Daily`,
        `#${combined}Channel`,
        `#${combined}Content`,
        `#${combined}Creator`,
      ];
      
      allHashtags.push(...hashtagVariations);
    }

    return allHashtags.slice(0, 20);
  };

  const handleItemClick = (item: string, type: 'keyword' | 'tag' | 'hashtag') => {
    // Add to selected items list
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    // Also call the original handler
    onSelectKeyword(item, type);
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
    <div className="keyword-sidebar">
      <div className="sidebar-header">
        <h2>🔍 Keyword Research</h2>
        <p>Find trending keywords for your content</p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'keywords' ? 'active' : ''}`}
          onClick={() => setActiveTab('keywords')}
        >
          <span className="tab-icon">🔑</span>
          <span>Keywords</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          <span className="tab-icon">🏷️</span>
          <span>Tags</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'hashtags' ? 'active' : ''}`}
          onClick={() => setActiveTab('hashtags')}
        >
          <span className="tab-icon">#</span>
          <span>Hashtags</span>
        </button>
      </div>

      <div className="search-container">
        {activeTab === 'keywords' && (
          <input
            type="text"
            placeholder="Search keywords... (e.g., react, python, gaming)"
            value={keywordSearch}
            onChange={(e) => handleKeywordSearch(e.target.value)}
            className="keyword-search-input"
          />
        )}
        {activeTab === 'tags' && (
          <input
            type="text"
            placeholder="Search tags... (e.g., world, tech, music)"
            value={tagSearch}
            onChange={(e) => handleTagSearch(e.target.value)}
            className="keyword-search-input"
          />
        )}
        {activeTab === 'hashtags' && (
          <input
            type="text"
            placeholder="Search hashtags... (e.g., fitness, food, gaming)"
            value={hashtagSearch}
            onChange={(e) => handleHashtagSearch(e.target.value)}
            className="keyword-search-input"
          />
        )}
        {isLoading && <div className="loading-spinner">⏳</div>}
      </div>

      <div className="suggestions-container">
        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <>
            {suggestions.length > 0 ? (
              <>
                <div className="suggestions-header">
                  <span className="result-count">{suggestions.length} keywords found</span>
                </div>
                <div className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-card"
                    >
                      <button
                        className="copy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(suggestion.keyword);
                        }}
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <div className="suggestion-main" onClick={() => handleItemClick(suggestion.keyword, 'keyword')}>
                        <span className="suggestion-rank">#{index + 1}</span>
                        <span className="suggestion-keyword">{suggestion.keyword}</span>
                      </div>
                      <div className="suggestion-metrics">
                        <div className="metric">
                          <span className="metric-label">Volume</span>
                          <span 
                            className="metric-badge"
                            style={{ backgroundColor: getVolumeColor(suggestion.searchVolume) }}
                          >
                            {suggestion.searchVolume}
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Competition</span>
                          <span 
                            className="metric-badge"
                            style={{ backgroundColor: getCompetitionColor(suggestion.competition) }}
                          >
                            {suggestion.competition}
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Score</span>
                          <span className="metric-score">{suggestion.relevance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : keywordSearch ? (
              <div className="empty-state">
                <div className="empty-icon">🔎</div>
                <p>No keywords found</p>
                <span>Try: react, python, gaming, cooking</span>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💡</div>
                <p>Start searching</p>
                <span>Enter a keyword to get 20 suggestions</span>
              </div>
            )}
          </>
        )}

        {/* Tags Tab */}
        {activeTab === 'tags' && (
          <>
            {tagSuggestions.length > 0 ? (
              <>
                <div className="suggestions-header">
                  <span className="result-count">{tagSuggestions.length} tags found</span>
                </div>
                <div className="suggestions-list">
                  {tagSuggestions.map((tag, index) => (
                    <div
                      key={index}
                      className="suggestion-card tag-card"
                    >
                      <button
                        className="copy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(tag);
                        }}
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <div className="suggestion-main" onClick={() => handleItemClick(tag, 'tag')}>
                        <span className="suggestion-rank">#{index + 1}</span>
                        <span className="suggestion-keyword">{tag}</span>
                      </div>
                      <div className="tag-badge">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span>Click to add</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : tagSearch ? (
              <div className="empty-state">
                <div className="empty-icon">🔎</div>
                <p>No tags found</p>
                <span>Try: world, tech, music, food</span>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🏷️</div>
                <p>Start searching</p>
                <span>Enter a topic to get 20 trending tags</span>
              </div>
            )}
          </>
        )}

        {/* Hashtags Tab */}
        {activeTab === 'hashtags' && (
          <>
            {hashtagSuggestions.length > 0 ? (
              <>
                <div className="suggestions-header">
                  <span className="result-count">{hashtagSuggestions.length} hashtags found</span>
                </div>
                <div className="suggestions-list hashtag-list">
                  {hashtagSuggestions.map((hashtag, index) => (
                    <div
                      key={index}
                      className="suggestion-card hashtag-card"
                    >
                      <button
                        className="copy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(hashtag);
                        }}
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                      <div className="hashtag-content" onClick={() => handleItemClick(hashtag, 'hashtag')}>
                        <span className="hashtag-rank">#{index + 1}</span>
                        <span className="hashtag-text">{hashtag}</span>
                        <span className="trending-badge">
                          {index < 5 ? '🔥' : index < 10 ? '📈' : '⭐'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : hashtagSearch ? (
              <div className="empty-state">
                <div className="empty-icon">🔎</div>
                <p>No hashtags found</p>
                <span>Try: fitness, gaming, world, tech</span>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">#️⃣</div>
                <p>Start searching</p>
                <span>Enter a topic to get 20 trending hashtags</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Selected Items List */}
      {selectedItems.length > 0 && (
        <div className="selected-items-section">
          <div className="selected-header">
            <h3>📋 Your List ({selectedItems.length})</h3>
            <div className="selected-actions">
              <button onClick={copyAllSelected} className="action-btn copy-all-btn" title="Copy all">
                📋 Copy All
              </button>
              <button onClick={clearAllSelected} className="action-btn clear-btn" title="Clear all">
                🗑️ Clear
              </button>
            </div>
          </div>
          <div className="selected-items-container">
            <div className="selected-items-list">
              {selectedItems.map((item, index) => (
                <div key={index} className="selected-pill">
                  <span className="pill-text">{item}</span>
                  <button
                    onClick={() => removeFromSelected(item)}
                    className="pill-remove"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="selected-text-area">
              <textarea
                value={selectedItems.join(', ')}
                readOnly
                className="selected-textarea"
                placeholder="Click on suggestions to add them here..."
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .keyword-sidebar {
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .keyword-sidebar * {
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar-header h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 700;
        }

        .sidebar-header p {
          margin: 0;
          font-size: 14px;
          opacity: 0.7;
        }

        .tabs-container {
          display: flex;
          gap: 4px;
          padding: 16px 20px 0;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          user-select: none !important;
        }

        .tab-button:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-button.active {
          color: white;
          border-bottom-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }

        .tab-icon {
          font-size: 18px;
        }

        .search-container {
          padding: 20px;
          position: relative;
        }

        .keyword-search-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .keyword-search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .keyword-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .loading-spinner {
          position: absolute;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        .suggestions-container {
          flex: 1;
          overflow-y: auto;
          padding: 0 20px 20px;
        }

        .suggestions-container::-webkit-scrollbar {
          width: 8px;
        }

        .suggestions-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .suggestions-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .suggestions-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .suggestions-header {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .result-count {
          font-size: 14px;
          opacity: 0.7;
          font-weight: 500;
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .suggestion-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .suggestion-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #3b82f6;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .suggestion-card:hover .copy-button {
          opacity: 1;
        }

        .copy-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 16px;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
          user-select: none !important;
        }

        .copy-button:hover {
          background: rgba(59, 130, 246, 0.4);
          transform: scale(1.1);
        }

        .copy-button:active {
          transform: scale(0.95);
        }

        .suggestion-main {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          cursor: pointer;
          padding-right: 40px;
        }

        .suggestion-rank {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
        }

        .suggestion-keyword {
          font-size: 15px;
          font-weight: 600;
          flex: 1;
          user-select: text !important;
          -webkit-user-select: text !important;
          cursor: text;
        }

        .suggestion-keyword::selection {
          background: rgba(59, 130, 246, 0.5);
          color: white;
        }

        .suggestion-metrics {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          font-size: 11px;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .metric-score {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          color: white;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state p {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .empty-state span {
          font-size: 14px;
          opacity: 0.6;
        }

        .tag-card {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .tag-card:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
        }

        .tag-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          padding: 6px 12px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          font-size: 11px;
          color: #60a5fa;
          font-weight: 600;
        }

        .tag-badge svg {
          width: 14px;
          height: 14px;
        }

        .hashtag-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .hashtag-card {
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.3);
          padding: 12px 16px;
        }

        .hashtag-card:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: #a855f7;
        }

        .hashtag-content {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding-right: 40px;
        }

        .hashtag-rank {
          background: rgba(168, 85, 247, 0.2);
          color: #a855f7;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
        }

        .hashtag-text {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: #c084fc;
          user-select: text !important;
          -webkit-user-select: text !important;
          cursor: text;
        }

        .hashtag-text::selection {
          background: rgba(168, 85, 247, 0.5);
          color: white;
        }

        .trending-badge {
          font-size: 20px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .selected-items-section {
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 16px 20px;
          max-height: 300px;
          display: flex;
          flex-direction: column;
        }

        .selected-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .selected-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: white;
        }

        .selected-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none !important;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .copy-all-btn:hover {
          background: rgba(59, 130, 246, 0.3);
          border-color: #3b82f6;
        }

        .clear-btn:hover {
          background: rgba(239, 68, 68, 0.3);
          border-color: #ef4444;
        }

        .selected-items-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          max-height: 200px;
        }

        .selected-items-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          min-height: 60px;
        }

        .selected-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
          user-select: text !important;
        }

        .selected-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .pill-text {
          user-select: text !important;
          cursor: text;
        }

        .pill-text::selection {
          background: rgba(255, 255, 255, 0.3);
        }

        .pill-remove {
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
          line-height: 1;
          color: white;
          transition: all 0.2s ease;
          user-select: none !important;
        }

        .pill-remove:hover {
          background: rgba(239, 68, 68, 0.8);
          transform: scale(1.1);
        }

        .selected-text-area {
          padding: 0;
        }

        .selected-textarea {
          width: 100%;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 13px;
          font-family: inherit;
          resize: none;
          user-select: text !important;
          cursor: text;
        }

        .selected-textarea::selection {
          background: rgba(59, 130, 246, 0.5);
          color: white;
        }

        .selected-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(0, 0, 0, 0.3);
        }

        .selected-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .keyword-sidebar {
            height: auto;
            min-height: 100vh;
          }

          .suggestion-metrics {
            gap: 8px;
          }

          .metric {
            flex: 1;
            min-width: calc(33.333% - 8px);
          }

          .selected-actions {
            flex-direction: column;
            gap: 4px;
          }

          .action-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
