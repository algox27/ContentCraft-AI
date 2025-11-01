import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { generateWithPromptAPI } from '../services/chromeAI';

interface ScriptGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScriptGenerator: FC<ScriptGeneratorProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState<'30' | '60'>('30');
  const [tone, setTone] = useState<'funny' | 'motivational' | 'informative'>('informative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState('');

  const generateScript = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate a ${duration}-second video script for:

Topic: "${topic}"
Tone: ${tone}
Duration: ${duration} seconds

Include:
- Hook (first 3 seconds)
- Main content (middle section)
- Call-to-action (last 3 seconds)
- Timestamps

Format as a ready-to-read script.`;

      const result = await generateWithPromptAPI(prompt);
      setScript(result);
    } catch (error) {
      console.error('Script generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📝 Script Generator" size="xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Video Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., How AI is changing fitness"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Duration:</label>
            <div className="flex gap-2">
              {['30', '60'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d as any)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                    duration === d
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="funny">😂 Funny</option>
              <option value="motivational">💪 Motivational</option>
              <option value="informative">📚 Informative</option>
            </select>
          </div>
        </div>

        {!script && (
          <button
            onClick={generateScript}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Writing Script...
              </span>
            ) : (
              '✨ Generate Script'
            )}
          </button>
        )}

        {script && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-900">{script}</pre>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(script);
                }}
                className="flex-1 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
              >
                📋 Copy Script
              </button>
              <button
                onClick={() => setScript('')}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
              >
                🔄 Generate New
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ScriptGenerator;
