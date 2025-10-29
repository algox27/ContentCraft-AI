import { useState } from 'react';

export default function SupportButton() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="support-button-container">
        <button
          className="support-button"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Support & Contact"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {showMenu && (
          <div className="support-menu">
            <div className="support-menu-header">
              <h3>Contact & Support</h3>
              <button onClick={() => setShowMenu(false)} className="close-btn">×</button>
            </div>
            <div className="support-menu-content">
              <a
                href="https://t.me/ContentCraftAi"
                target="_blank"
                rel="noopener noreferrer"
                className="support-link channel"
              >
                <div className="support-icon">📢</div>
                <div className="support-info">
                  <strong>Official Channel</strong>
                  <span>@ContentCraftAi</span>
                </div>
              </a>

              <a
                href="https://t.me/ContentCraftsupport"
                target="_blank"
                rel="noopener noreferrer"
                className="support-link group"
              >
                <div className="support-icon">💬</div>
                <div className="support-info">
                  <strong>Support Group</strong>
                  <span>Get help from community</span>
                </div>
              </a>

              <a
                href="https://t.me/H9rsh_x1"
                target="_blank"
                rel="noopener noreferrer"
                className="support-link developer"
              >
                <div className="support-icon">👤</div>
                <div className="support-info">
                  <strong>Developer</strong>
                  <span>@H9rsh_x1</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .support-button-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
        }

        .support-button {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 30%, #d97706 60%, #b45309 100%);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 
            0 8px 32px rgba(251, 191, 36, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 2px 4px rgba(0, 0, 0, 0.1) inset,
            0 0 20px rgba(251, 191, 36, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .support-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .support-button:hover {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 
            0 12px 48px rgba(251, 191, 36, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset,
            0 4px 8px rgba(0, 0, 0, 0.2) inset,
            0 0 30px rgba(251, 191, 36, 0.6),
            0 0 60px rgba(251, 191, 36, 0.3);
        }

        .support-button:active {
          transform: scale(0.95) rotate(0deg);
        }

        .support-menu {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 360px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 0 100px rgba(102, 126, 234, 0.2);
          overflow: hidden;
          animation: slideUpBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes slideUpBounce {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .support-menu-header {
          background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 30%, #d97706 60%, #b45309 100%);
          color: white;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(251, 191, 36, 0.3);
        }

        .support-menu-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 70%
          );
          animation: headerShine 3s infinite;
        }

        @keyframes headerShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .support-menu-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .support-menu-content {
          padding: 16px;
          background: rgba(255, 255, 255, 0.5);
        }

        .support-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          text-decoration: none;
          color: #1e293b;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          position: relative;
          overflow: hidden;
        }

        .support-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s ease;
        }

        .support-link:hover::before {
          left: 100%;
        }

        .support-link:hover {
          transform: translateX(8px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
        }

        .support-link.channel {
          border-color: rgba(251, 191, 36, 0.3);
        }

        .support-link.channel:hover {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(252, 211, 77, 0.15) 100%);
          border-color: #fbbf24;
          box-shadow: 
            0 8px 32px rgba(251, 191, 36, 0.4),
            0 0 0 1px rgba(251, 191, 36, 0.5) inset,
            0 0 20px rgba(251, 191, 36, 0.2);
        }

        .support-link.group {
          border-color: rgba(251, 191, 36, 0.3);
        }

        .support-link.group:hover {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%);
          border-color: #f59e0b;
          box-shadow: 
            0 8px 32px rgba(245, 158, 11, 0.4),
            0 0 0 1px rgba(245, 158, 11, 0.5) inset,
            0 0 20px rgba(245, 158, 11, 0.2);
        }

        .support-link.developer {
          border-color: rgba(217, 119, 6, 0.3);
        }

        .support-link.developer:hover {
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%);
          border-color: #d97706;
          box-shadow: 
            0 8px 32px rgba(217, 119, 6, 0.4),
            0 0 0 1px rgba(217, 119, 6, 0.5) inset,
            0 0 20px rgba(217, 119, 6, 0.2);
        }

        .support-icon {
          font-size: 32px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #ffffff, #f0f0f0);
          border-radius: 14px;
          box-shadow: 
            6px 6px 12px rgba(0, 0, 0, 0.1),
            -6px -6px 12px rgba(255, 255, 255, 0.9),
            inset 2px 2px 4px rgba(255, 255, 255, 0.5),
            inset -2px -2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .support-link:hover .support-icon {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 
            8px 8px 16px rgba(0, 0, 0, 0.15),
            -8px -8px 16px rgba(255, 255, 255, 1),
            inset 3px 3px 6px rgba(255, 255, 255, 0.6),
            inset -3px -3px 6px rgba(0, 0, 0, 0.1);
        }

        .support-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .support-info strong {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.3px;
        }

        .support-info span {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .support-button-container {
            bottom: 20px;
            right: 20px;
          }

          .support-button {
            width: 56px;
            height: 56px;
          }

          .support-menu {
            width: calc(100vw - 40px);
            right: -10px;
          }
        }
      `}</style>
    </>
  );
}
