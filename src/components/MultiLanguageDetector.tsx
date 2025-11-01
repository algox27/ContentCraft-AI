import { type FC, useEffect, useState } from 'react';
import { Toast } from './Toast';
import { translateText } from '../services/chromeAI';

interface MultiLanguageDetectorProps {
  onLanguageDetected: (lang: string) => void;
}

const MultiLanguageDetector: FC<MultiLanguageDetectorProps> = ({ onLanguageDetected }) => {
  const [detectedLang, setDetectedLang] = useState<string>('en');
  const [showToast, setShowToast] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'hi', 'es', 'fr', 'de', 'ja', 'ko'];
    
    if (supportedLangs.includes(browserLang) && browserLang !== 'en') {
      setDetectedLang(browserLang);
      onLanguageDetected(browserLang);
      setShowToast(true);
    }
  }, [onLanguageDetected]);

  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    es: 'Español (Spanish)',
    fr: 'Français (French)',
    de: 'Deutsch (German)',
    ja: '日本語 (Japanese)',
    ko: '한국어 (Korean)',
  };

  return (
    <>
      {detectedLang !== 'en' && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-2xl border-2 border-blue-500 p-4 max-w-sm animate-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🌍</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">
                Language Detected: {languageNames[detectedLang]}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Would you like to auto-translate all AI outputs to your language?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAutoTranslate(true);
                    localStorage.setItem('autoTranslate', 'true');
                    localStorage.setItem('preferredLang', detectedLang);
                    setShowToast(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium"
                >
                  ✅ Yes, Enable
                </button>
                <button
                  onClick={() => setShowToast(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  ❌ No Thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {autoTranslate && (
        <Toast
          message={`Auto-translate enabled for ${languageNames[detectedLang]}! 🌍`}
          type="success"
          onClose={() => setAutoTranslate(false)}
        />
      )}
    </>
  );
};

export default MultiLanguageDetector;

// Helper function to auto-translate if enabled
export const autoTranslateIfEnabled = async (text: string): Promise<string> => {
  const autoTranslate = localStorage.getItem('autoTranslate') === 'true';
  const preferredLang = localStorage.getItem('preferredLang');

  if (autoTranslate && preferredLang && preferredLang !== 'en') {
    try {
      return await translateText(text, preferredLang as any);
    } catch (error) {
      console.error('Auto-translate failed:', error);
      return text;
    }
  }

  return text;
};
