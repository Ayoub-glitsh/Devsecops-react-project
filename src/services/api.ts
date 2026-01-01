import axios from 'axios';

//  VULNÉRABILITÉ : Clé API en dur dans le code
const API_KEY = 'sk_live_1234567890abcdef';
const BASE_URL = 'https://api.vulnerable-service.com';

export const vulnerableApi = {
  // VULNÉRABILITÉ : Endpoint non sécurisé
  getUserData: (userId: string) => {
    return axios.get(`${BASE_URL}/users/${userId}?api_key=${API_KEY}`);
  },
  
  // VULNÉRABILITÉ : Pas de validation des entrées
  executeCommand: (command: string) => {
    return axios.post(`${BASE_URL}/execute`, { command });
  },
  
  // VULNÉRABILITÉ : Logging sensible
  logSensitiveData: (data: any) => {
    console.log('Sensitive data:', data);
    localStorage.setItem('user_data', JSON.stringify(data));
  }
};