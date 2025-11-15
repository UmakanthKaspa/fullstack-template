import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pingAPI } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [pingResponse, setPingResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handlePing = async () => {
    setLoading(true);
    setError('');
    setPingResponse(null);

    try {
      const response = await pingAPI.ping();
      setPingResponse(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to ping server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
        </div>

        <div className="ping-section">
          <h3>Test API Connection</h3>
          <button
            onClick={handlePing}
            disabled={loading}
            className="ping-btn"
          >
            {loading ? 'Pinging...' : 'Ping Server'}
          </button>

          {error && <div className="error-message">{error}</div>}

          {pingResponse && (
            <div className="ping-response">
              <h4>Response:</h4>
              <pre>{JSON.stringify(pingResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
