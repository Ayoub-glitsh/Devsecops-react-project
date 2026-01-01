import React, { useState } from 'react';
import axios from 'axios';

const UserInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // VULNÉRABILITÉ 1 : Injection de commande via eval
  const handleEval = () => {
    try {
      //  VULNÉRABILITÉ CRITIQUE : Utilisation de eval()
      const evalResult = eval(input);
      setResult(`Eval result: ${evalResult}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  // VULNÉRABILITÉ 2 : Requête non sécurisée
  const handleFetch = async () => {
    try {
      //  VULNÉRABILITÉ : Pas de validation d'URL
      const response = await axios.get(`https://api.example.com/data?query=${input}`);
      setResult(JSON.stringify(response.data));
    } catch (error) {
      setResult('Fetch failed');
    }
  };

  return (
    <div className="user-input">
      <h2>Test Input (Intentional Vulnerabilities)</h2>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter something..."
        style={{ width: '300px', padding: '8px' }}
      />
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleEval} style={{ marginRight: '10px' }}>
          Execute Eval (Dangerous!)
        </button>
        
        <button onClick={handleFetch}>
          Fetch Data
        </button>
      </div>
      
      {/* VULNÉRABILITÉ 3 : XSS via innerHTML */}
      <div 
        style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}
        dangerouslySetInnerHTML={{ __html: `<strong>Result:</strong> ${result}` }}
      />
      
      <div style={{ marginTop: '20px', color: 'red', fontSize: '12px' }}>
         This component contains intentional security vulnerabilities for demonstration purposes.
      </div>
    </div>
  );
};

export default UserInput;