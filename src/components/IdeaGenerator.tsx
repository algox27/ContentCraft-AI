import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface VideoIdea {
  title: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
}

interface IdeaGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const IdeaGenerator: FC<IdeaGeneratorProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);

  const generateIdeas = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate 10 unique video ideas about: "${topic}"

For each idea provide:
TITLE: [catchy title]
DESC: [short description]
TAGS: [3-5 tags]

Separate each idea with "---"`;

      const result = await generateWithPromptAPI(prompt);
      const ideaBlocks = result.split('---').filter(b => b.trim());
      
      const parsedIdeas: VideoIdea[] = ideaBlocks.map(block => {
        const titleMatch = block.match(/TITLE:\s*(.+)/);
        const descMatch = block.match(/DESC:\s*(.+)/);
        const tagsMatch = block.match(/TAGS:\s*(.+)/);
        
        return {
          title: titleMatch?.[1]?.trim() || 'Video Idea',
          description: descMatch?.[1]?.trim() || 'Description',
          tags: tagsMatch?.[1]?.split(',').map(t => t.trim()) || [],
          isFavorite: false,
        };
      }).slice(0, 10);

      setIdeas(parsedIdeas);
    } catch (error) {
      console.error('Idea generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (index: number) => {
    setIdeas(prev => prev.map((idea, i) => 
      i === index ? { ...idea, isFavorite: !idea.isFavorite } : idea
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💡 Idea Generator Dashboard" size="xl">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., AI Fitness, Cooking Hacks, Travel Tips"
            className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
          />
          <button
            onClick={generateIdeas}
            disabled={isGenerating || !topic.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? <LoadingSpinner size="sm" /> : '💡 Generate'}
          </button>
        </div>

        {ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {ideas.map((idea, index) => (
              <div
                key={index}
                className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 flex-1">{idea.title}</h4>
                  <button
                    onClick={() => toggleFavorite(index)}
                    className="text-2xl hover:scale-110 transition-transform"
                  >
                    {idea.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                <div className="flex gap-1 flex-wrap">
                  {idea.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default IdeaGenerator;
