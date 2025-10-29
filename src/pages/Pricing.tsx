export default function Pricing() {
    return (
        <div className="pricing-page">
            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <h1>💎 Choose Your Plan</h1>
                    <p>Unlock unlimited content creation with our premium plans</p>
                </div>

                {/* Free Plan Banner */}
                <div className="free-plan-banner">
                    <div className="free-icon">🎁</div>
                    <div className="free-info">
                        <h3>Free Plan</h3>
                        <p>5 Credits every 7 days • Perfect for trying out</p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    {/* Starter Plan */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3>Starter</h3>
                            <div className="price">
                                <span className="currency">₹</span>
                                <span className="amount">99</span>
                                <span className="period">/month</span>
                            </div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span><strong>100 Credits</strong> per month</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>All Features Unlocked</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Priority Support</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>No Daily Limits</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Cancel Anytime</span>
                            </li>
                        </ul>

                        <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer" className="plan-button">
                            Get Started
                        </a>
                    </div>

                    {/* Pro Plan - Featured */}
                    <div className="pricing-card featured">
                        <div className="popular-badge">🔥 Most Popular</div>
                        <div className="card-header">
                            <h3>Pro</h3>
                            <div className="price">
                                <span className="currency">₹</span>
                                <span className="amount">299</span>
                                <span className="period">/month</span>
                            </div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span><strong>Unlimited Credits</strong></span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Advanced AI Features</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>API Access</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>White-label Option</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Priority Support 24/7</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Early Access to New Features</span>
                            </li>
                        </ul>

                        <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer" className="plan-button featured-button">
                            Get Pro Now
                        </a>
                    </div>

                    {/* 1 Year Plan */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3>1 Year Plan</h3>
                            <div className="price">
                                <span className="currency">₹</span>
                                <span className="amount">999</span>
                                <span className="period">/one-time</span>
                            </div>
                            <div className="savings">Save ₹2,589 per year!</div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span><strong>Unlimited for 1 Year</strong></span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>All Future Updates</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Priority Support for 1 Year</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Commercial License</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>No Monthly Fees</span>
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Best Value 🎯</span>
                            </li>
                        </ul>

                        <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer" className="plan-button">
                            Get 1 Year Access
                        </a>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>

                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>💳 How do I pay?</h4>
                            <p>Contact us on Telegram (@H9rsh_x1) and we'll guide you through the payment process.</p>
                        </div>

                        <div className="faq-item">
                            <h4>🔄 Can I cancel anytime?</h4>
                            <p>Yes! Monthly plans can be cancelled anytime. No questions asked.</p>
                        </div>

                        <div className="faq-item">
                            <h4>⚡ When do I get credits?</h4>
                            <p>Immediately after payment confirmation. Usually within 5-10 minutes.</p>
                        </div>

                        <div className="faq-item">
                            <h4>🎁 Is there a free trial?</h4>
                            <p>Yes! Everyone gets 5 free credits every 7 days. No credit card required.</p>
                        </div>

                        <div className="faq-item">
                            <h4>💰 What's the best value?</h4>
                            <p>1 Year plan saves you ₹2,589 compared to monthly Pro plan!</p>
                        </div>

                        <div className="faq-item">
                            <h4>🔒 Is payment secure?</h4>
                            <p>Yes! We use secure payment methods. Your data is safe with us.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="cta-section">
                    <h2>Ready to Upgrade?</h2>
                    <p>Join hundreds of content creators using ContentCraft AI</p>
                    <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer" className="cta-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                        Contact on Telegram
                    </a>
                </div>
            </div>

            <style>{`
        .pricing-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 60px 20px;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricing-header h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 16px 0;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pricing-header p {
          font-size: 20px;
          color: #64748b;
          margin: 0;
        }

        .free-plan-banner {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 24px 32px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
        }

        .free-icon {
          font-size: 48px;
        }

        .free-info h3 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 700;
        }

        .free-info p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .pricing-card {
          background: white;
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
          border-color: #fbbf24;
        }

        .pricing-card.featured {
          background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          transform: scale(1.05);
          border-color: #fbbf24;
          box-shadow: 0 16px 48px rgba(251, 191, 36, 0.4);
        }

        .pricing-card.featured:hover {
          transform: scale(1.08) translateY(-8px);
        }

        .popular-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: #10b981;
          color: white;
          padding: 8px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }

        .pricing-card.featured .card-header {
          border-bottom-color: rgba(255, 255, 255, 0.3);
        }

        .card-header h3 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        .price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
        }

        .currency {
          font-size: 24px;
          font-weight: 600;
        }

        .amount {
          font-size: 56px;
          font-weight: 800;
          line-height: 1;
        }

        .period {
          font-size: 18px;
          opacity: 0.7;
        }

        .savings {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 6px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          font-size: 16px;
        }

        .features-list svg {
          flex-shrink: 0;
          color: #10b981;
        }

        .pricing-card.featured .features-list svg {
          color: white;
        }

        .plan-button {
          display: block;
          width: 100%;
          padding: 16px 32px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          text-align: center;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);
        }

        .plan-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(251, 191, 36, 0.5);
        }

        .featured-button {
          background: white;
          color: #f59e0b;
        }

        .faq-section {
          margin-bottom: 64px;
        }

        .faq-section h2 {
          text-align: center;
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 40px 0;
          color: #1e293b;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .faq-item {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .faq-item h4 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .faq-item p {
          margin: 0;
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
        }

        .cta-section {
          text-align: center;
          background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 64px 32px;
          border-radius: 24px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
        }

        .cta-section h2 {
          font-size: 40px;
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .cta-section p {
          font-size: 20px;
          margin: 0 0 32px 0;
          opacity: 0.9;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          border-radius: 14px;
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(251, 191, 36, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 48px rgba(251, 191, 36, 0.6);
        }

        @media (max-width: 768px) {
          .pricing-header h1 {
            font-size: 36px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.featured {
            transform: scale(1);
          }

          .free-plan-banner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </div>
    );
}
