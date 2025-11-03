import { useState, useEffect } from 'react';

export default function ChromeAINotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if Chrome AI is available
    // @ts-ignore
    const hasAI = !!(window.ai?.writer || window.ai?.summarizer);
    const wasDismissed = localStorage.getItem('chromeAI_notification_dismissed') === 'true';
    
    if (!hasAI && !wasDismissed) {
      setShowNotification(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowNotification(false);
    setDismissed(true);
    localStorage.setItem('chromeAI_notification_dismissed', 'true');
  };

  const handleSetup = () => {
    window.open('https://github.com/algox27/ContentCraft-AI/blob/main/CHROME_AI_SETUP.md', '_blank');
  };

  if (!showNotification || dismissed) return null;

  return (
    <div className="chrome-ai-notification">
      <div className="notification-content">
        <div className="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div className="notification-text">
          <h4>🚀 Enable Chrome AI for Better Experience!</h4>
          <p>Get faster, more accurate AI features by enabling Chrome's Built-in AI APIs</p>
        </div>
        <div className="notification-actions">
          <button onClick={handleSetup} className="setup-btn">
            📖 Setup Guide
          </button>
          <button onClick={handleDismiss} className="dismiss-btn">
            ✕
          </button>
        </div>
      </div>

      <style>{`
        .chrome-ai-notification {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.4);
          z-index: 9999;
          max-width: 500px;
          width: 90%;
          animation: slideDown 0.3s ease-out;
        }

        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notification-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-text {
          flex: 1;
        }

        .notification-text h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 700;
        }

        .notification-text p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .notification-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .setup-btn {
          padding: 8px 16px;
          background: white;
          color: #4f46e5;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .setup-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .dismiss-btn {
          padding: 8px;
          background: transparent;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .dismiss-btn:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .chrome-ai-notification {
            top: 70px;
            left: 10px;
            right: 10px;
            transform: none;
            width: auto;
            max-width: none;
          }

          .notification-content {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }

          .notification-actions {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}