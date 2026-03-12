/**
 * Main App Component - Navigation and layout
 */
import React, { useState } from 'react';
import DataEntry from './components/DataEntry';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRecordAdded = () => {
    // Trigger dashboard refresh
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>📊 Sales Analytics</h1>
          </div>
          <ul className="navbar-menu">
            <li>
              <button
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'entry' ? 'active' : ''}`}
                onClick={() => setCurrentPage('entry')}
              >
                Data Entry
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && (
          <Dashboard refreshTrigger={refreshTrigger} />
        )}
        {currentPage === 'entry' && (
          <DataEntry onRecordAdded={handleRecordAdded} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sales Analytics Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
