import { type FC, useState, useRef } from 'react';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { Toast } from './Toast';
import { generateWithPromptAPI } from '../services/chromeAI';

interface VoiceToCaptionProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (caption: string) => void;
}

const VoiceToCaption: FC<VoiceToCaptionProps> = ({ isOpen, onClose, onApply }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    try {
      // @ts-ignore - Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setToast({ message: 'Speech recognition not supported in this browser', type: 'error' });
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setToast({ message: `Error: ${event.error}`, type: 'error' });
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      setToast({ message: 'Failed to start recording', type: 'error' });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const generateCaption = async () => {
    if (!transcript.trim()) {
      setToast({ message: 'No transcript available', type: 'error' });
      return;
    }

    setIsProcessing(true);

    try {
      const prompt = `Convert this voice transcript into an engaging YouTube video title and description:

Transcript: "${transcript}"

Generate:
1. A catchy, SEO-optimized title (60-70 characters)
2. A compelling description (150+ characters) with keywords

Format:
TITLE: [title here]
DESCRIPTION: [description here]`;

      const result = await generateWithPromptAPI(prompt);
      setGeneratedCaption(result);
      setToast({ message: 'Caption generated successfully!', type: 'success' });
    } catch (error) {
      setToast({ 
        message: error instanceof Error ? error.message : 'Generation failed', 
        type: 'error' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = () => {
    if (generatedCaption) {
      onApply(generatedCaption);
      setToast({ message: 'Applied to form!', type: 'success' });
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="🎙️ Voice to Caption" size="lg">
        <div className="space-y-6">
          {/* Recording Section */}
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all ${
              isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-gradient-to-br from-blue-500 to-purple-500'
            }`}>
              <span className="text-6xl">
                {isRecording ? '🔴' : '🎙️'}
              </span>
            </div>

            {!isRecording ? (
              <button
                onClick={startRecording}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all text-lg"
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-8 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all text-lg"
              >
                ⏹️ Stop Recording
              </button>
            )}

            {isRecording && (
              <p className="text-sm text-gray-600 mt-3 animate-pulse">
                🎙️ Listening... Speak clearly about your video topic
              </p>
            )}
          </div>

          {/* Transcript */}
          {transcript && (
            <div>
              <label className="block text-sm font-medium mb-2">Transcript:</label>
              <div className="p-4 bg-gray-50 rounded-lg border min-h-24">
                <p className="text-gray-900">{transcript}</p>
              </div>
              <button
                onClick={generateCaption}
                disabled={isProcessing}
                className="w-full mt-3 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Generating Caption...
                  </span>
                ) : (
                  '✨ Generate Caption from Voice'
                )}
              </button>
            </div>
          )}

          {/* Generated Caption */}
          {generatedCaption && (
            <div className="space-y-3">
              <label className="block text-sm font-medium">AI Generated Caption:</label>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-900">{generatedCaption}</pre>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCaption);
                    setToast({ message: 'Copied to clipboard!', type: 'success' });
                  }}
                  className="flex-1 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
                >
                  📋 Copy
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
                >
                  ✅ Apply to Form
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 <strong>Multimodal AI:</strong> Speak naturally about your video topic. AI will convert your voice into optimized titles and descriptions using Chrome's Prompt API!
            </p>
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

export default VoiceToCaption;
