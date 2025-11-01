import { type FC, useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';

interface SavedContent {
  id: string;
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  score: number;
  createdAt: string;
  platform: 'youtube' | 'instagram';
}

interface ContentLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onReuse: (content: SavedContent) => void;
}

const ContentLibrary: FC<ContentLibraryProps> = ({ isOpen, onClose, onReuse }) => {
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [filter, setFilter] = useState<'all' | 'youtube' | 'instagram'>('all');

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('contentLibrary');
    if (stored) {
      setSavedContent(JSON.parse(stored));
    }
  }, [isOpen]);

  const filteredContent = savedContent.filter(
    (item) => filter === 'all' || item.platform === filter
  );

  const handleDelete = (id: string) => {
    const updated = savedContent.filter((item) => item.id !== id);
    setSavedContent(updated);
    localStorage.setItem('contentLibrary', JSON.stringify(updated));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📚 Content Library" size="xl">
      <div className="space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 border-b pb-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({savedContent.length})
          </button>
          <button
            onClick={() => setFilter('youtube')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'youtube'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🎥 YouTube ({savedContent.filter((c) => c.platform === 'youtube').length})
          </button>
          <button
            onClick={() => setFilter('instagram')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'instagram'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📸 Instagram ({savedContent.filter((c) => c.platform === 'instagram').length})
          </button>
        </div>

        {/* Content List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredContent.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">📭</div>
              <p>No saved content yet</p>
              <p className="text-sm mt-1">Save your best content to reuse later!</p>
            </div>
          ) : (
            filteredContent.map((content) => (
              <div
                key={content.id}
                className="p-4 border rounded-lg hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{content.title}</h3>
                      <Badge
                        variant={
                          content.score >= 80
                            ? 'success'
                            : content.score >= 60
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {content.score}/100
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{content.platform === 'youtube' ? '🎥' : '📸'}</span>
                      <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{content.tags.length} tags</span>
                      <span>•</span>
                      <span>{content.hashtags.length} hashtags</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => onReuse(content)}
                      className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all"
                    >
                      ♻️ Reuse
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="px-3 py-1.5 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {savedContent.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-3 border-t">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {savedContent.length}
              </div>
              <div className="text-xs text-gray-600">Total Saved</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  savedContent.reduce((sum, c) => sum + c.score, 0) / savedContent.length
                )}
              </div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {savedContent.filter((c) => c.score >= 80).length}
              </div>
              <div className="text-xs text-gray-600">High Quality</div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ContentLibrary;

// Helper function to save content
export const saveToLibrary = (content: Omit<SavedContent, 'id' | 'createdAt'>) => {
  const stored = localStorage.getItem('contentLibrary');
  const library: SavedContent[] = stored ? JSON.parse(stored) : [];
  
  const newContent: SavedContent = {
    ...content,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  library.unshift(newContent);
  
  // Keep only last 50 items
  if (library.length > 50) {
    library.pop();
  }
  
  localStorage.setItem('contentLibrary', JSON.stringify(library));
};
