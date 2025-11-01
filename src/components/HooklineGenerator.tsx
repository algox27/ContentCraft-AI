import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface HooklineGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  onApply: (hookline: string) => void;
}

const HooklineGenerator: FC<HooklineGeneratorProps> = ({ isOpen, onClose, topic, onApply }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hooklines, setHooklines] = useState<string[]>([]);

  const generateHooklines = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate 5 engaging video opening lines (first 5 seconds) for this topic:

Topic: "${topic}"

Each hookline should:
- Grab attention immediately
- Create curiosity
- Be under 15 words
- Use questions, bold statements, or surprising facts

Format: One hookline per line, numbered 1-5.`;

      const result = await generateWithPromptAPI(prompt);
      const lines = result.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(line => line.length > 10)
        .slice(0, 5);

      setHooklines(lines.length > 0 ? lines : [
        `What if ${topic.toLowerCase()} changed everything you know?`,
        `Here's the truth about ${topic.toLowerCase()} nobody tells you...`,
        `Stop! Before you ${topic.toLowerCase()}, watch this.`,
        `The secret to ${topic.toLowerCase()} in just 60 seconds.`,
        `Why ${topic.toLowerCase()} is easier than you think.`
      ]);
    } catch (error) {
      console.error('Hookline generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎣 Hookline Generator" size="lg">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
          <p className="text-sm text-gray-600 mb-1">Topic:</p>
          <p className="font-bold text-gray-900">{topic}</p>
        </div>

        {hooklines.length === 0 && (
          <button
            onClick={generateHooklines}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Generating Hooklines...
              </span>
            ) : (
              '🎣 Generate Opening Lines'
            )}
          </button>
        )}

        {hooklines.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900">Choose Your Opening Line:</h4>
            {hooklines.map((line, index) => (
              <div
                key={index}
                onClick={() => {
                  onApply(line);
                  onClose();
                }}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {index === 0 ? '🔥' : index === 1 ? '⚡' : index === 2 ? '💡' : index === 3 ? '🎯' : '✨'}
                  </span>
                  <p className="flex-1 text-gray-900 font-medium">{line}</p>
                  <span className="text-gray-400 group-hover:text-orange-500">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <strong>Pro Tip:</strong> The first 5 seconds determine if viewers stay or leave. Use these hooklines to grab attention instantly!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default HooklineGenerator;
