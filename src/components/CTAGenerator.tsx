import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface CTAGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (cta: string) => void;
}

const CTAGenerator: FC<CTAGeneratorProps> = ({ isOpen, onClose, onApply }) => {
  const [goal, setGoal] = useState<'subscribe' | 'like' | 'comment' | 'download' | 'visit'>('subscribe');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ctas, setCtas] = useState<string[]>([]);

  const generateCTAs = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate 5 creative call-to-action (CTA) phrases for: ${goal}

Requirements:
- Engaging and action-oriented
- Include relevant emoji
- Short and punchy
- Varied approaches

Format: One CTA per line.`;

      const result = await generateWithPromptAPI(prompt);
      const lines = result.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .slice(0, 5);

      setCtas(lines.length > 0 ? lines : [
        '👉 Subscribe for weekly tips!',
        '💡 Hit that like button if this helped!',
        '💬 Drop your thoughts in comments!',
        '⬇️ Download the free guide below!',
        '🔗 Visit our website for more!'
      ]);
    } catch (error) {
      console.error('CTA generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🪄 Smart CTA Generator" size="lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">CTA Goal:</label>
          <select
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value as any);
              setCtas([]);
            }}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
          >
            <option value="subscribe">📺 Subscribe</option>
            <option value="like">👍 Like</option>
            <option value="comment">💬 Comment</option>
            <option value="download">⬇️ Download</option>
            <option value="visit">🔗 Visit Website</option>
          </select>
        </div>

        {ctas.length === 0 && (
          <button
            onClick={generateCTAs}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Generating CTAs...
              </span>
            ) : (
              '🪄 Generate CTAs'
            )}
          </button>
        )}

        {ctas.length > 0 && (
          <div className="space-y-2">
            {ctas.map((cta, index) => (
              <div
                key={index}
                onClick={() => {
                  onApply(cta);
                  onClose();
                }}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all"
              >
                <p className="text-gray-900 font-medium">{cta}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CTAGenerator;
