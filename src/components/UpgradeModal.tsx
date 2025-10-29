interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2>Upgrade to Premium</h2>
          <p>You've used all your free credits for today!</p>
        </div>

        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="price">₹99<span>/month</span></div>
            <ul className="features">
              <li>✅ 100 Credits/month</li>
              <li>✅ All Features</li>
              <li>✅ Priority Support</li>
              <li>✅ No Daily Limits</li>
            </ul>
          </div>

          <div className="pricing-card featured">
            <div className="badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">₹299<span>/month</span></div>
            <ul className="features">
              <li>✅ Unlimited Credits</li>
              <li>✅ Advanced AI</li>
              <li>✅ API Access</li>
              <li>✅ White-label Option</li>
            </ul>
          </div>

          <div className="pricing-card">
            <h3>Lifetime</h3>
            <div className="price">₹999<span>/one-time</span></div>
            <ul className="features">
              <li>✅ Unlimited Forever</li>
              <li>✅ All Future Updates</li>
              <li>✅ Priority Support</li>
              <li>✅ Commercial License</li>
            </ul>
          </div>
        </div>

        <div className="contact-section">
          <p>Contact us on Telegram to upgrade:</p>
          <a 
            href="https://t.me/H9rsh_x1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="telegram-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            Contact on Telegram
          </a>
        </div>

        <style>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
            animation: fadeIn 0.2s ease-out;
          }

          .modal-content {
            background: white;
            border-radius: 24px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease-out;
          }

          .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #f1f5f9;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #64748b;
          }

          .close-btn:hover {
            background: #e2e8f0;
            transform: rotate(90deg);
          }

          .modal-header {
            text-align: center;
            padding: 40px 40px 20px;
          }

          .icon-wrapper {
            width: 80px;
            height: 80px;
            background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: white;
            box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
          }

          .modal-header h2 {
            margin: 0 0 12px 0;
            font-size: 32px;
            font-weight: 800;
            color: #1e293b;
          }

          .modal-header p {
            margin: 0;
            font-size: 16px;
            color: #64748b;
          }

          .pricing-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px 40px;
          }

          .pricing-card {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            position: relative;
            transition: all 0.3s ease;
          }

          .pricing-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }

          .pricing-card.featured {
            background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            color: white;
            border-color: #fbbf24;
            transform: scale(1.05);
            box-shadow: 0 8px 32px rgba(251, 191, 36, 0.4);
          }

          .pricing-card.featured:hover {
            transform: scale(1.08) translateY(-4px);
          }

          .badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 6px 18px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }

          .pricing-card h3 {
            margin: 0 0 16px 0;
            font-size: 20px;
            font-weight: 700;
          }

          .pricing-card.featured h3 {
            color: white;
          }

          .price {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 20px;
            color: #1e293b;
          }

          .pricing-card.featured .price {
            color: white;
          }

          .price span {
            font-size: 14px;
            font-weight: 500;
            opacity: 0.7;
          }

          .features {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .features li {
            padding: 8px 0;
            font-size: 14px;
            color: #475569;
          }

          .pricing-card.featured .features li {
            color: rgba(255, 255, 255, 0.95);
          }

          .contact-section {
            text-align: center;
            padding: 20px 40px 40px;
            border-top: 1px solid #e2e8f0;
            margin-top: 20px;
          }

          .contact-section p {
            margin: 0 0 16px 0;
            font-size: 16px;
            color: #64748b;
            font-weight: 500;
          }

          .telegram-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 16px 36px;
            background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
            color: white;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 6px 24px rgba(251, 191, 36, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .telegram-btn:hover {
            background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 32px rgba(251, 191, 36, 0.6);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @media (max-width: 768px) {
            .pricing-cards {
              grid-template-columns: 1fr;
              padding: 20px;
            }

            .pricing-card.featured {
              transform: scale(1);
            }

            .modal-header {
              padding: 30px 20px 20px;
            }

            .modal-header h2 {
              font-size: 24px;
            }

            .contact-section {
              padding: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
