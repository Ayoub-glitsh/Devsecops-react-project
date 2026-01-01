import React from 'react';
import './App.css';
import UserInput from './components/UserInput';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 DevSecOps Demo - React App</h1>
        <p>This application contains intentional vulnerabilities for security testing</p>
      </header>
      
      <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ marginBottom: '30px' }}>
          <UserInput />
        </section>
        
        <section style={{ marginBottom: '30px' }}>
          <SearchBar />
        </section>
        
        <section style={{ 
          backgroundColor: '#fff3cd', 
          padding: '15px', 
          border: '1px solid #ffeaa7',
          borderRadius: '5px'
        }}>
          <h3>⚠️ Security Notes</h3>
          <ul style={{ textAlign: 'left' }}>
            <li><strong>Vulnerability 1:</strong> eval() usage - Command Injection</li>
            <li><strong>Vulnerability 2:</strong> InnerHTML usage - XSS Risk</li>
            <li><strong>Vulnerability 3:</strong> Hardcoded API keys</li>
            <li><strong>Vulnerability 4:</strong> SQL Injection pattern</li>
            <li><strong>Vulnerability 5:</strong> Outdated dependencies</li>
          </ul>
        </section>
      </main>
      
      <footer style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <p>DevSecOps Pipeline Demonstration Project</p>
      </footer>
    </div>
  );
}

export default App;