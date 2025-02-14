import axios from 'axios';

const API_BASE = 'https://localhost:7019';

export const registerClient = async (clientData) => {
  const response = await axios.post(`${API_BASE}/connect/register`, clientData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const getClients = async () => {
  const response = await axios.get(`${API_BASE}/connect/register`);
  return response.data;
};