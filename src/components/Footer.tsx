export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ContentCraft AI</h3>
          <p>AI-Powered Content Tools for Creators</p>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <a href="/terms" onClick={(e) => { e.preventDefault(); window.location.hash = 'terms'; }}>
            Terms & Conditions
          </a>
        </div>

        <div className="footer-section">
          <h4>Contact & Support</h4>
          <a href="https://t.me/ContentCraftAi" target="_blank" rel="noopener noreferrer">
            📢 Channel: @ContentCraftAi
          </a>
          <a href="https://t.me/ContentCraftsupport" target="_blank" rel="noopener noreferrer">
            💬 Support Group
          </a>
          <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer">
            👤 Developer: @H9rsh_x1
          </a>
        </div>

        <div className="footer-section">
          <h4>Disclaimer</h4>
          <p className="disclaimer-text">
            ⚠️ We are NOT responsible for views, engagement, or account issues. Use at your own risk.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ContentCraft AI. All rights reserved.</p>
        <p className="warning">Results not guaranteed. Content success depends on many factors.</p>
      </div>

      <style>{`
        .app-footer {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          color: white;
          padding: 60px 20px 30px;
          margin-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .app-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(251, 191, 36, 0.6),
            rgba(245, 158, 11, 0.6),
            transparent
          );
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        }

        .app-footer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(251, 191, 36, 0.05) 0%,
            transparent 50%
          );
          animation: footerGlow 15s linear infinite;
        }

        @keyframes footerGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .footer-section {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .footer-section:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(251, 191, 36, 0.4);
          transform: translateY(-4px);
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 20px rgba(251, 191, 36, 0.3);
        }

        .footer-section h3 {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 12px 0;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 20px rgba(251, 191, 36, 0.3);
        }

        .footer-section h4 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        }

        .footer-section p {
          font-size: 14px;
          color: #cbd5e1;
          margin: 0;
          line-height: 1.8;
          font-weight: 400;
        }

        .footer-section a {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #94a3b8;
          text-decoration: none;
          margin-bottom: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
        }

        .footer-section a:hover {
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.15);
          border-color: rgba(251, 191, 36, 0.4);
          transform: translateX(8px);
          box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
        }

        .disclaimer-text {
          font-size: 13px !important;
          color: #fbbf24 !important;
          font-weight: 600;
          padding: 12px;
          background: rgba(251, 191, 36, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(251, 191, 36, 0.2);
          line-height: 1.6 !important;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .footer-bottom p {
          font-size: 14px;
          color: #94a3b8;
          margin: 8px 0;
          font-weight: 500;
        }

        .footer-bottom .warning {
          font-size: 12px;
          color: #fbbf24;
          font-weight: 600;
          padding: 8px 16px;
          background: rgba(251, 191, 36, 0.1);
          border-radius: 20px;
          display: inline-block;
          margin-top: 8px;
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .app-footer {
            padding: 40px 20px 20px;
            margin-top: 60px;
          }
        }
      `}</style>
    </footer>
  );
}
