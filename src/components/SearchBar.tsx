import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Simulation d'une requête SQL vulnérable
  const handleSearch = () => {
    //  VULNÉRABILITÉ : Injection SQL simulée
    const mockQuery = `SELECT * FROM users WHERE name = '${searchTerm}'`;
    console.log('Executing query:', mockQuery);
    
    // Simulation de résultats
    setResults([
      `Query executed: ${mockQuery}`,
      'User 1: John Doe',
      'User 2: Jane Smith'
    ]);
  };

  return (
    <div className="search-bar">
      <h3>User Search (SQL Injection Demo)</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleSearch}>Search</button>
      
      <div style={{ marginTop: '10px' }}>
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
      
      <div style={{ fontSize: '11px', color: '#666', marginTop: '10px' }}>
        Try input: <code>admin' OR '1'='1</code>
      </div>
    </div>
  );
};

export default SearchBar;