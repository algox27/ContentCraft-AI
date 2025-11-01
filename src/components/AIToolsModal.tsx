import { type FC, useState } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { Toast } from './Toast';
import { PencilIcon, CheckCircleIcon, MagicWandIcon, DocumentTextIcon, GlobeIcon, RobotIcon } from './icons/Icons';
import {
  generateTitleAndDescription,
  proofreadText,
  rewriteWithTone,
  summarizeText,
  translateText,
  SUPPORTED_LANGUAGES,
  TONE_OPTIONS,
} from '../services/chromeAI';

interface AIToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (result: string) => void;
}

type AITool = 'generate' | 'proofread' | 'rewrite' | 'summarize' | 'translate';

const AIToolsModal: FC<AIToolsModalProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedTool, setSelectedTool] = useState<AITool>('generate');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Options
  const [selectedTone, setSelectedTone] = useState<'formal' | 'casual' | 'funny' | 'clickbait'>('formal');
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'es' | 'fr' | 'de' | 'ja' | 'ko'>('hi');

  const tools = [
    { id: 'generate', label: 'Generate Title', Icon: PencilIcon, description: 'AI-powered title & description' },
    { id: 'proofread', label: 'Proofread', Icon: CheckCircleIcon, description: 'Fix grammar & clarity' },
    { id: 'rewrite', label: 'Rewrite Tone', Icon: MagicWandIcon, description: 'Change writing style' },
    { id: 'summarize', label: 'Summarize', Icon: DocumentTextIcon, description: 'Shorten long text' },
    { id: 'translate', label: 'Translate', Icon: GlobeIcon, description: 'Multilingual support' },
  ];

  const handleGenerate = async () => {
    if (!inputText.trim() && selectedTool !== 'generate') {
      setToast({ message: 'Please enter some text', type: 'error' });
      return;
    }

    setIsLoading(true);
    setOutputText('');

    try {
      let result = '';

      switch (selectedTool) {
        case 'generate': {
          const { title, description } = await generateTitleAndDescription(inputText || 'React Tutorial');
          result = `TITLE:\n${title}\n\nDESCRIPTION:\n${description}`;
          break;
        }
        case 'proofread':
          result = await proofreadText(inputText);
          break;
        case 'rewrite':
          result = await rewriteWithTone(inputText, selectedTone);
          break;
        case 'summarize':
          result = await summarizeText(inputText, 'short');
          break;
        case 'translate':
          result = await translateText(inputText, selectedLanguage);
          break;
      }

      setOutputText(result);
      setToast({ message: 'AI generation complete!', type: 'success' });
    } catch (error) {
      setToast({ 
        message: error instanceof Error ? error.message : 'AI generation failed', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setToast({ message: 'Copied to clipboard!', type: 'success' });
  };

  const handleApply = () => {
    if (onApply && outputText) {
      onApply(outputText);
      setToast({ message: 'Applied to form!', type: 'success' });
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={<div className="flex items-center gap-2"><RobotIcon className="w-6 h-6" /><span>AI Tools</span></div>} size="xl">
        <div className="space-y-6">
          {/* Tool Selection */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as AITool)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTool === tool.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="mb-1 flex justify-center"><tool.Icon className="w-6 h-6 text-blue-600" /></div>
                <div className="text-xs font-medium">{tool.label}</div>
              </button>
            ))}
          </div>

          {/* Options */}
          {selectedTool === 'rewrite' && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Tone:</label>
              <div className="grid grid-cols-4 gap-2">
                {TONE_OPTIONS.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone.value)}
                    className={`p-2 rounded-lg border transition-all ${
                      selectedTone === tone.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-xl">{tone.icon}</span>
                    <div className="text-xs mt-1">{tone.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTool === 'translate' && (
            <div>
              <label className="block text-sm font-medium mb-2">Target Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="w-full p-2 border rounded-lg"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {selectedTool === 'generate' ? 'Video Topic:' : 'Input Text:'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                selectedTool === 'generate'
                  ? 'e.g., How to build a React app'
                  : 'Enter text to process...'
              }
              className="w-full p-3 border rounded-lg resize-none"
              rows={4}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Generating...
              </span>
            ) : (
              `✨ Generate with AI`
            )}
          </button>

          {/* Output */}
          {outputText && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">AI Output:</label>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm">{outputText}</pre>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                >
                  📋 Copy
                </button>
                {onApply && (
                  <button
                    onClick={handleApply}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    ✅ Apply to Form
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
            💡 <strong>Note:</strong> These features use Chrome's Built-in AI APIs. Make sure you're using Chrome
            Canary/Dev with AI features enabled.
          </div>
        </div>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default AIToolsModal;
