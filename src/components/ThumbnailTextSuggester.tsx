import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface ThumbnailTextSuggesterProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ThumbnailTextSuggester: FC<ThumbnailTextSuggesterProps> = ({ isOpen, onClose, title }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate 6 short, catchy thumbnail text options for this video:

Title: "${title}"

Requirements:
- Maximum 3-4 words
- Bold, attention-grabbing
- Include relevant emoji
- Easy to read at small size

Format: One suggestion per line.`;

      const result = await generateWithPromptAPI(prompt);
      const lines = result.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .slice(0, 6);

      setSuggestions(lines.length > 0 ? lines : [
        'MUST WATCH! 🔥',
        'Game Changer 💪',
        'You Won\'t Believe! 😱',
        'Secret Revealed ✨',
        'Pro Tips Inside 🎯',
        'Watch This! 👀'
      ]);
    } catch (error) {
      console.error('Thumbnail text generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎨 Thumbnail Text Suggester" size="lg">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
          <p className="text-sm text-gray-600 mb-1">Video Title:</p>
          <p className="font-bold text-gray-900">{title}</p>
        </div>

        {suggestions.length === 0 && (
          <button
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Generating Text...
              </span>
            ) : (
              '🎨 Generate Thumbnail Text'
            )}
          </button>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900">Click to Copy:</h4>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((text, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 cursor-pointer transition-all text-center group"
                >
                  <p className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            💡 <strong>Thumbnail Tip:</strong> Use bold, contrasting colors and large text. Keep it under 4 words for maximum impact!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ThumbnailTextSuggester;
