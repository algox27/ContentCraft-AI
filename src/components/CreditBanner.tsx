interface CreditBannerProps {
  credits: number;
  loading: boolean;
}

export default function CreditBanner({ credits, loading }: CreditBannerProps) {
  if (loading) {
    return (
      <div className="credit-banner loading">
        <div className="spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={`credit-banner ${credits === 0 ? 'no-credits' : ''}`}>
      <div className="credit-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span className="credit-text">
          {credits > 0 ? (
            <>
              <strong>{credits}</strong> Credits Left (Resets in 7 days)
            </>
          ) : (
            <>
              <strong>0</strong> Credits - Contact for More
            </>
          )}
        </span>
      </div>
      
      {credits === 0 && (
        <a 
          href="https://t.me/H9rsh_x1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="upgrade-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Get More Credits
        </a>
      )}

      <style>{`
        .credit-banner {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          color: white;
          padding: 16px 28px;
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(251, 191, 36, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 0 20px rgba(251, 191, 36, 0.3);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 16px;
          animation: slideIn 0.3s ease-out;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 15px;
        }

        .credit-banner.no-credits {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
        }

        .credit-banner.loading {
          background: rgba(100, 116, 139, 0.9);
        }

        .credit-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .credit-text {
          font-size: 14px;
          font-weight: 500;
        }

        .credit-text strong {
          font-size: 18px;
          font-weight: 700;
        }

        .upgrade-btn {
          padding: 10px 20px;
          background: white;
          color: #d97706;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .upgrade-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.3);
          background: linear-gradient(135deg, #ffffff 0%, #fef3c7 100%);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .credit-banner {
            top: auto;
            bottom: 20px;
            right: 20px;
            left: 20px;
            flex-direction: column;
            gap: 12px;
          }

          .upgrade-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
