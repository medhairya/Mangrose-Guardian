import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReport = () => {
    navigate('/report');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <p>Help us protect mangrove forests by reporting cutting incidents</p>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h3>Your Information</h3>
          <div className="info-item">
            <span className="label">Username:</span>
            <span className="value">{user?.username}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{user?.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">User ID:</span>
            <span className="value">{user?.id}</span>
          </div>
        </div>

        <div className="action-cards">
          <div className="action-card primary" onClick={handleReport}>
            <div className="card-icon">📸</div>
            <h3>Report Incident</h3>
            <p>Upload a photo and report mangrove cutting</p>
            <button className="action-btn">Report Now</button>
          </div>

          <div className="action-card secondary">
            <div className="card-icon">📊</div>
            <h3>View Reports</h3>
            <p>See all your submitted reports</p>
            <button className="action-btn" disabled>Coming Soon</button>
          </div>

          <div className="action-card secondary">
            <div className="card-icon">🌿</div>
            <h3>Mangrove Info</h3>
            <p>Learn about mangrove conservation</p>
            <button className="action-btn" disabled>Coming Soon</button>
          </div>
        </div>

        <div className="quick-stats">
          <h3>Quick Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Reports Submitted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Photos Uploaded</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Locations Mapped</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
