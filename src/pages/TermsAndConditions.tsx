export default function TermsAndConditions() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>📜 Terms & Conditions</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ContentCraft AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2>2. Use of Service</h2>
          <p>
            ContentCraft AI provides AI-powered content generation tools for YouTube and Instagram. The Service is provided "as is" without any warranties.
          </p>
          <ul>
            <li>Free users receive 5 credits that reset every 7 days</li>
            <li>Credits are non-transferable and non-refundable</li>
            <li>Premium plans offer additional credits and features</li>
          </ul>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the Service for lawful purposes only</li>
            <li>Not abuse or exploit the Service</li>
            <li>Not attempt to bypass credit limitations</li>
            <li>Comply with YouTube and Instagram's terms of service</li>
          </ul>
        </section>

        <section>
          <h2>4. Content Ownership</h2>
          <p>
            All content generated using ContentCraft AI belongs to you. However, you are solely responsible for:
          </p>
          <ul>
            <li>The content you create and publish</li>
            <li>Ensuring content complies with platform guidelines</li>
            <li>Any copyright or trademark violations</li>
            <li>Consequences of using generated content</li>
          </ul>
        </section>

        <section>
          <h2>5. Disclaimer of Liability</h2>
          <div className="disclaimer-box">
            <h3>⚠️ IMPORTANT DISCLAIMER</h3>
            <p>
              <strong>ContentCraft AI is NOT responsible for:</strong>
            </p>
            <ul>
              <li>❌ Views, likes, or engagement metrics on your content</li>
              <li>❌ Account bans, suspensions, or penalties from YouTube/Instagram</li>
              <li>❌ Copyright strikes or content violations</li>
              <li>❌ Loss of revenue or monetization issues</li>
              <li>❌ Any damages resulting from use of generated content</li>
            </ul>
            <p className="warning-text">
              <strong>USE AT YOUR OWN RISK:</strong> We provide tools to assist content creation. 
              Success depends on many factors including content quality, audience, timing, and platform algorithms. 
              We make no guarantees about results.
            </p>
          </div>
        </section>

        <section>
          <h2>6. No Guarantees</h2>
          <p>
            ContentCraft AI does NOT guarantee:
          </p>
          <ul>
            <li>Increased views, subscribers, or followers</li>
            <li>Viral content or trending status</li>
            <li>Monetization approval or revenue</li>
            <li>Algorithm favorability</li>
            <li>Any specific results or outcomes</li>
          </ul>
        </section>

        <section>
          <h2>7. Service Availability</h2>
          <p>
            We reserve the right to:
          </p>
          <ul>
            <li>Modify or discontinue the Service at any time</li>
            <li>Change pricing and credit allocations</li>
            <li>Suspend accounts for violations</li>
            <li>Update these terms without prior notice</li>
          </ul>
        </section>

        <section>
          <h2>8. Privacy & Data</h2>
          <p>
            We collect minimal data:
          </p>
          <ul>
            <li>Anonymous usage statistics</li>
            <li>Credit usage tracking</li>
            <li>No personal information is stored</li>
            <li>No content is saved on our servers</li>
          </ul>
        </section>

        <section>
          <h2>9. Refund Policy</h2>
          <p>
            <strong>All sales are final.</strong> Credits and premium plans are non-refundable. 
            Contact us on Telegram (@H9rsh_x1) for support issues.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            For questions or support, contact us on Telegram: 
            <a href="https://t.me/H9rsh_x1" target="_blank" rel="noopener noreferrer">@H9rsh_x1</a>
          </p>
        </section>

        <div className="acceptance-box">
          <p>
            <strong>By using ContentCraft AI, you acknowledge that you have read, understood, and agree to these Terms & Conditions.</strong>
          </p>
        </div>
      </div>

      <style>{`
        .terms-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 40px 20px;
        }

        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .terms-container h1 {
          font-size: 36px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .last-updated {
          color: #64748b;
          font-size: 14px;
          margin: 0 0 32px 0;
        }

        section {
          margin-bottom: 32px;
        }

        section h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
        }

        section p {
          font-size: 16px;
          line-height: 1.6;
          color: #475569;
          margin: 0 0 12px 0;
        }

        section ul {
          margin: 12px 0;
          padding-left: 24px;
        }

        section li {
          font-size: 16px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 8px;
        }

        .disclaimer-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
        }

        .disclaimer-box h3 {
          color: #92400e;
          margin-bottom: 16px;
        }

        .disclaimer-box p {
          color: #78350f;
          font-weight: 500;
        }

        .disclaimer-box ul {
          margin: 12px 0;
        }

        .disclaimer-box li {
          color: #78350f;
          font-weight: 500;
        }

        .warning-text {
          background: #fbbf24;
          padding: 16px;
          border-radius: 8px;
          margin-top: 16px;
          color: #78350f !important;
        }

        .acceptance-box {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 2px solid #3b82f6;
          border-radius: 12px;
          padding: 20px;
          margin-top: 32px;
          text-align: center;
        }

        .acceptance-box p {
          color: #1e40af;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .terms-container {
            padding: 24px;
          }

          .terms-container h1 {
            font-size: 28px;
          }

          section h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
