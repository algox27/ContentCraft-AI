import { useCredits } from '../hooks/useCredits';
import CreditBanner from '../components/CreditBanner';
import UpgradeModal from '../components/UpgradeModal';
import { useState } from 'react';

export default function TestCredits() {
  const { credits, loading, useCredit, hasCredits } = useCredits();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleTestAction = async () => {
    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    const success = await useCredit('test_action', 'test_tool', { test: true });
    if (success) {
      alert(`Action successful! Credits remaining: ${credits - 1}`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Credit System Test</h1>
      
      <CreditBanner credits={credits} loading={loading} />
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

      <div style={{ marginTop: '100px', background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h2>Test Credit System</h2>
        <p>Current Credits: <strong>{credits}</strong></p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Has Credits: {hasCredits() ? 'Yes' : 'No'}</p>

        <button
          onClick={handleTestAction}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Use 1 Credit (Test)
        </button>

        <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
          <h3>Instructions:</h3>
          <ol>
            <li>Click "Use 1 Credit" button</li>
            <li>Watch credits decrease</li>
            <li>When credits reach 0, upgrade modal will show</li>
            <li>Check Supabase dashboard to see data</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px', padding: '20px', background: '#fef3c7', borderRadius: '8px' }}>
          <h4>Check Supabase:</h4>
          <p>Go to: <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></p>
          <p>→ Table Editor → user_credits (should have 1 row)</p>
          <p>→ Table Editor → usage_logs (should have entries)</p>
        </div>
      </div>
    </div>
  );
}
