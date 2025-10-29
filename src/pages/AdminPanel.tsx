import { useState } from 'react';

const ADMIN_PASSWORD = 'harsh@2025'; // Change this password

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userId, setUserId] = useState('');
  const [credits, setCredits] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('❌ Incorrect password!');
      setPasswordInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <div className="lock-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2>Admin Panel</h2>
            <p>Enter password to access</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter admin password"
              className="password-input"
              autoFocus
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            <button type="submit" className="login-button">
              🔓 Unlock Admin Panel
            </button>
          </form>
        </div>

        <style>{`
          .admin-login {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .login-container {
            background: white;
            border-radius: 24px;
            padding: 48px 40px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .login-header {
            text-align: center;
            margin-bottom: 32px;
          }

          .lock-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: white;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          }

          .login-header h2 {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 800;
            color: #1e293b;
          }

          .login-header p {
            margin: 0;
            font-size: 15px;
            color: #64748b;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .password-input {
            width: 100%;
            padding: 16px 20px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            outline: none;
          }

          .password-input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .error-message {
            margin: 0;
            padding: 12px;
            background: #fee2e2;
            color: #dc2626;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
          }

          .login-button {
            width: 100%;
            padding: 16px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 17px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
          }

          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
          }

          @media (max-width: 768px) {
            .login-container {
              padding: 32px 24px;
            }
          }
        `}</style>
      </div>
    );
  }

  const addCredits = () => {
    if (!userId.trim()) {
      setMessage('❌ Please enter User ID');
      return;
    }

    const creditsToAdd = parseInt(credits) || 100;
    
    // For localStorage users (current system)
    const currentUserId = localStorage.getItem('contentcraft_user_id');
    
    if (userId === currentUserId) {
      const currentCredits = parseInt(localStorage.getItem('contentcraft_credits') || '5');
      const newCredits = currentCredits + creditsToAdd;
      
      localStorage.setItem('contentcraft_credits', newCredits.toString());
      setMessage(`✅ Added ${creditsToAdd} credits! New balance: ${newCredits}`);
      
      // Refresh page to update UI
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setMessage('❌ User ID not found on this device');
    }
  };

  const setUnlimitedCredits = () => {
    if (!userId.trim()) {
      setMessage('❌ Please enter User ID');
      return;
    }

    const currentUserId = localStorage.getItem('contentcraft_user_id');
    
    if (userId === currentUserId) {
      localStorage.setItem('contentcraft_credits', '999999');
      setMessage('✅ Set to UNLIMITED credits (999999)!');
      
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setMessage('❌ User ID not found on this device');
    }
  };

  const resetCredits = () => {
    if (!userId.trim()) {
      setMessage('❌ Please enter User ID');
      return;
    }

    const currentUserId = localStorage.getItem('contentcraft_user_id');
    
    if (userId === currentUserId) {
      localStorage.setItem('contentcraft_credits', '5');
      localStorage.setItem('contentcraft_last_reset', new Date().toISOString());
      setMessage('✅ Reset to 5 credits!');
      
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setMessage('❌ User ID not found on this device');
    }
  };

  const getCurrentUserId = () => {
    const id = localStorage.getItem('contentcraft_user_id');
    setUserId(id || '');
    setMessage(id ? `📋 Current User ID copied!` : '❌ No User ID found');
  };

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>🔧 Admin Panel</h1>
          <p>Manage user credits manually</p>
        </div>

        <div className="admin-card">
          <h2>Current Device Info</h2>
          <div className="info-box">
            <p><strong>User ID:</strong> {localStorage.getItem('contentcraft_user_id') || 'Not set'}</p>
            <p><strong>Credits:</strong> {localStorage.getItem('contentcraft_credits') || '5'}</p>
            <p><strong>Last Reset:</strong> {localStorage.getItem('contentcraft_last_reset') ? new Date(localStorage.getItem('contentcraft_last_reset')!).toLocaleString() : 'Not set'}</p>
          </div>
          <button onClick={getCurrentUserId} className="btn-secondary">
            Copy Current User ID
          </button>
        </div>

        <div className="admin-card">
          <h2>Add Credits to User</h2>
          
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="user_1234567890_abc123"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Credits to Add:</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="100"
              className="input-field"
            />
          </div>

          <div className="button-group">
            <button onClick={addCredits} className="btn-primary">
              ➕ Add Credits
            </button>
            <button onClick={setUnlimitedCredits} className="btn-success">
              ♾️ Set Unlimited
            </button>
            <button onClick={resetCredits} className="btn-danger">
              🔄 Reset to 5
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="admin-card">
          <h2>📝 Instructions</h2>
          <ol>
            <li>User ko apna User ID bhejne ko bolo (Settings ya Console se)</li>
            <li>User ID yahan paste karo</li>
            <li>Credits add karo (100, 500, unlimited, etc.)</li>
            <li>User ko page refresh karne bolo</li>
          </ol>
          
          <div className="warning-box">
            ⚠️ <strong>Note:</strong> Ye sirf localStorage users ke liye kaam karega (same device). 
            Supabase integration ke baad remote management possible hoga.
          </div>
        </div>

        <div className="admin-card">
          <h2>🎯 Quick Actions</h2>
          <div className="quick-actions">
            <button onClick={() => { setCredits('100'); setMessage('Set to 100 credits'); }} className="quick-btn">
              100 Credits
            </button>
            <button onClick={() => { setCredits('500'); setMessage('Set to 500 credits'); }} className="quick-btn">
              500 Credits
            </button>
            <button onClick={() => { setCredits('1000'); setMessage('Set to 1000 credits'); }} className="quick-btn">
              1000 Credits
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .admin-panel {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }

        .admin-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .admin-header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .admin-header h1 {
          font-size: 48px;
          margin: 0 0 12px 0;
          font-weight: 800;
        }

        .admin-header p {
          font-size: 18px;
          opacity: 0.9;
        }

        .admin-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .admin-card h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
        }

        .info-box {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .info-box p {
          margin: 8px 0;
          font-size: 14px;
          color: #475569;
        }

        .info-box strong {
          color: #1e293b;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .btn-primary, .btn-secondary, .btn-success, .btn-danger {
          padding: 14px 24px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #64748b;
          color: white;
        }

        .btn-secondary:hover {
          background: #475569;
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        .message {
          padding: 16px;
          border-radius: 10px;
          font-weight: 600;
          text-align: center;
        }

        .message.success {
          background: #d1fae5;
          color: #065f46;
          border: 2px solid #10b981;
        }

        .message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 2px solid #ef4444;
        }

        .warning-box {
          background: #fef3c7;
          border: 2px solid #f59e0b;
          padding: 16px;
          border-radius: 10px;
          margin-top: 20px;
          color: #92400e;
          font-size: 14px;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .quick-btn {
          padding: 12px 20px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: translateY(-2px);
        }

        ol {
          padding-left: 20px;
        }

        ol li {
          margin: 8px 0;
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .admin-header h1 {
            font-size: 32px;
          }

          .button-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
