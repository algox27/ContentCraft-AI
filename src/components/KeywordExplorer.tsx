import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';

interface Keyword {
  keyword: string;
  volume: string;
  competition: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface KeywordExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectKeyword: (keyword: string) => void;
}

const KeywordExplorer: FC<KeywordExplorerProps> = ({ isOpen, onClose, onSelectKeyword }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'tech' | 'lifestyle' | 'education' | 'gaming'>('all');

  // Mock trending keywords (in production, fetch from YouTube API)
  const trendingKeywords: Keyword[] = [
    { keyword: 'react hooks tutorial', volume: '50K', competition: 'high', trend: 'up', category: 'tech' },
    { keyword: 'ai content creation', volume: '35K', competition: 'medium', trend: 'up', category: 'tech' },
    { keyword: 'morning routine 2024', volume: '120K', competition: 'high', trend: 'stable', category: 'lifestyle' },
    { keyword: 'productivity tips', volume: '80K', competition: 'medium', trend: 'up', category: 'lifestyle' },
    { keyword: 'python for beginners', volume: '95K', competition: 'high', trend: 'stable', category: 'education' },
    { keyword: 'machine learning basics', volume: '45K', competition: 'medium', trend: 'up', category: 'education' },
    { keyword: 'minecraft survival guide', volume: '200K', competition: 'high', trend: 'stable', category: 'gaming' },
    { keyword: 'valorant tips and tricks', volume: '150K', competition: 'high', trend: 'up', category: 'gaming' },
    { keyword: 'typescript tutorial', volume: '30K', competition: 'low', trend: 'up', category: 'tech' },
    { keyword: 'healthy meal prep', volume: '110K', competition: 'medium', trend: 'stable', category: 'lifestyle' },
    { keyword: 'web development roadmap', volume: '40K', competition: 'medium', trend: 'up', category: 'tech' },
    { keyword: 'study with me', volume: '180K', competition: 'high', trend: 'stable', category: 'education' },
  ];

  const filteredKeywords = trendingKeywords.filter((kw) => {
    const matchesSearch = kw.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || kw.category === category;
    return matchesSearch && matchesCategory;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🔍 Keyword Explorer" size="xl">
      <div className="space-y-4">
        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search trending keywords..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'tech', 'lifestyle', 'education', 'gaming'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Keywords List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredKeywords.map((kw, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-all bg-white cursor-pointer"
              onClick={() => {
                onSelectKeyword(kw.keyword);
                onClose();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getTrendIcon(kw.trend)}</span>
                    <h3 className="font-bold text-gray-900">{kw.keyword}</h3>
                    <Badge variant={getCompetitionColor(kw.competition)}>
                      {kw.competition}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>📊 {kw.volume} searches/month</span>
                    <span>•</span>
                    <span className="capitalize">🏷️ {kw.category}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium">
                  Use Keyword
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <strong>Pro Tip:</strong> Use low-competition keywords with high volume for better ranking chances!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default KeywordExplorer;
