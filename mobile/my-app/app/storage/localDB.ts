import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'expenses';
const QUEUE_KEY = 'pending_expenses'; // for offline-added expenses
const DELETE_QUEUE_KEY = 'deleted_expenses';

export const saveExpenses = async (expenses:any) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Pending (unsynced) expenses
export const addToQueue = async (expense:any) => {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  const pending = data ? JSON.parse(data) : [];
  pending.push(expense);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(pending));
};

export const getPendingExpenses = async () => {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearQueue = async () => {
  await AsyncStorage.removeItem(QUEUE_KEY);
};

// Deleted expenses
export const addToDeleteQueue = async (id:any) => {
  const data = await AsyncStorage.getItem(DELETE_QUEUE_KEY);
  const queue = data ? JSON.parse(data) : [];
  if (!queue.includes(id)) queue.push(id);
  await AsyncStorage.setItem(DELETE_QUEUE_KEY, JSON.stringify(queue));
};

export const getDeleteQueue = async () => {
  const data = await AsyncStorage.getItem(DELETE_QUEUE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearDeleteQueue = async () => {
  await AsyncStorage.removeItem(DELETE_QUEUE_KEY);
};