import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'expenses';

export const saveExpenses = async (expenses) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
