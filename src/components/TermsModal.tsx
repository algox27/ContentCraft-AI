import { useState, useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onAccept }: TermsModalProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (scrolledToBottom && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal-content">
        <div className="terms-header">
          <div className="terms-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h2>Terms & Conditions</h2>
          <p>Please read and accept our terms to continue</p>
        </div>

        <div className="terms-body" onScroll={handleScroll}>
          <div className="terms-content">
            <h3>Welcome to ContentCraft AI</h3>
            <p>By using our service, you agree to the following terms and conditions:</p>

            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using ContentCraft AI, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h4>2. Use License</h4>
            <p>Permission is granted to temporarily use ContentCraft AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

            <h4>3. Credit System</h4>
            <ul>
              <li>Free users receive 5 credits every 7 days</li>
              <li>Credits are used for AI-powered features</li>
              <li>Unused credits do not roll over</li>
              <li>Premium plans offer unlimited or higher credit limits</li>
            </ul>

            <h4>4. User Responsibilities</h4>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree not to use the service for any unlawful purpose</li>
              <li>You will not attempt to gain unauthorized access to any portion of the service</li>
              <li>You will not use the service to generate spam or misleading content</li>
            </ul>

            <h4>5. Content Ownership</h4>
            <p>All content generated using ContentCraft AI belongs to you. However, you are responsible for ensuring that your content complies with YouTube's and Instagram's terms of service.</p>

            <h4>6. Service Availability</h4>
            <p>We strive to provide uninterrupted service but do not guarantee 100% uptime. We reserve the right to modify or discontinue the service at any time.</p>

            <h4>7. Privacy Policy</h4>
            <p>We collect minimal data necessary to provide our services. We do not sell your personal information to third parties. Your generated content is not stored on our servers.</p>

            <h4>8. Payment Terms</h4>
            <ul>
              <li>All payments are processed securely</li>
              <li>Refunds are handled on a case-by-case basis</li>
              <li>Premium subscriptions auto-renew unless cancelled</li>
              <li>One-time purchases are non-refundable after 7 days</li>
            </ul>

            <h4>9. Limitation of Liability</h4>
            <p>ContentCraft AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.</p>

            <h4>10. Changes to Terms</h4>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

            <h4>11. Contact Information</h4>
            <p>For questions about these terms, please contact us on Telegram: @H9rsh_x1</p>

            <div className="scroll-indicator">
              {!hasScrolled && (
                <p>👇 Please scroll down to read all terms</p>
              )}
            </div>
          </div>
        </div>

        <div className="terms-footer">
          <button
            onClick={onAccept}
            disabled={!hasScrolled}
            className="accept-btn"
          >
            {hasScrolled ? '✓ I Accept Terms & Continue' : '📜 Scroll to Accept'}
          </button>
          <p className="terms-note">
            By clicking accept, you agree to our Terms & Conditions
          </p>
        </div>
      </div>

      <style>{`
        .terms-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        .terms-modal-content {
          background: white;
          border-radius: 24px;
          max-width: 700px;
          width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease-out;
        }

        .terms-header {
          text-align: center;
          padding: 32px 32px 24px;
          border-bottom: 2px solid #e2e8f0;
        }

        .terms-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(145deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: white;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .terms-header h2 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 800;
          color: #1e293b;
        }

        .terms-header p {
          margin: 0;
          font-size: 15px;
          color: #64748b;
        }

        .terms-body {
          flex: 1;
          overflow-y: auto;
          padding: 32px;
        }

        .terms-body::-webkit-scrollbar {
          width: 8px;
        }

        .terms-body::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .terms-body::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 10px;
        }

        .terms-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .terms-content h4 {
          font-size: 17px;
          font-weight: 700;
          color: #334155;
          margin: 24px 0 12px 0;
        }

        .terms-content p {
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          margin: 0 0 16px 0;
        }

        .terms-content ul {
          margin: 12px 0;
          padding-left: 24px;
        }

        .terms-content li {
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 8px;
        }

        .scroll-indicator {
          text-align: center;
          padding: 24px 0 0;
          margin-top: 24px;
          border-top: 2px dashed #e2e8f0;
        }

        .scroll-indicator p {
          font-size: 14px;
          font-weight: 600;
          color: #3b82f6;
          animation: bounce 2s infinite;
        }

        .terms-footer {
          padding: 24px 32px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
        }

        .accept-btn {
          width: 100%;
          padding: 16px 32px;
          background: linear-gradient(145deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
        }

        .accept-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.6);
        }

        .accept-btn:disabled {
          background: linear-gradient(145deg, #cbd5e1 0%, #94a3b8 100%);
          cursor: not-allowed;
          box-shadow: none;
        }

        .terms-note {
          margin: 12px 0 0 0;
          font-size: 13px;
          color: #64748b;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .terms-modal-content {
            max-height: 90vh;
          }

          .terms-header {
            padding: 24px 20px 20px;
          }

          .terms-body {
            padding: 24px 20px;
          }

          .terms-footer {
            padding: 20px;
          }

          .terms-header h2 {
            font-size: 24px;
          }

          .accept-btn {
            font-size: 16px;
            padding: 14px 24px;
          }
        }
      `}</style>
    </div>
  );
}
