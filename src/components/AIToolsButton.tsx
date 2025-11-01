import { type FC, useState, useEffect } from 'react';
import AIToolsModal from './AIToolsModal';
import { checkAICapabilities } from '../services/chromeAI';

interface AIToolsButtonProps {
  onApply?: (result: string) => void;
}

const AIToolsButton: FC<AIToolsButtonProps> = ({ onApply }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIAvailable, setIsAIAvailable] = useState(false);

  useEffect(() => {
    checkAICapabilities().then((caps) => {
      setIsAIAvailable(
        caps.writer || caps.rewriter || caps.summarizer || caps.translator || caps.promptAPI
      );
    });
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative group bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c.55 0 1 .45 1 1v1h2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2V3c0-.55.45-1 1-1zm-1 6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm2 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM9 13h6v2H9v-2z" />
          </svg>
          <span>AI Tools</span>
          {isAIAvailable && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </span>
      </button>

      <AIToolsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={onApply}
      />
    </>
  );
};

export default AIToolsButton;
