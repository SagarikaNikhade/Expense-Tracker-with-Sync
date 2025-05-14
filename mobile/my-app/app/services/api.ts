import axios from 'axios';

const API_URL = 'https://expense-tracker-be-8n3q.onrender.com'
// 'http://192.168.1.7:8080'; // Replace with your actual API URL
// 'http://localhost:8080';

export const fetchExpenses = async (since = null) => {
  const res = await axios.get(`${API_URL}/expenses`);
  return res.data;
};

export const addExpense = async (expense:any) => {
  const res = await axios.post(`${API_URL}/expenses/`, expense);
  return res.data;
};

export const deleteExpense = async (id:any) => {
  await axios.delete(`${API_URL}/expenses/${id}`);
  // return res.data;
};
