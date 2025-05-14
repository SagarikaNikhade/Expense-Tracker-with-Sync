import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'expenses';

type Expense = {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: string;

  synced: boolean; // locally added
};


export const saveExpenses = async (expenses:any) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addLocalExpense = async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt' | 'synced'>) => {
  const existing = await loadExpenses();
  const newExpense: Expense = {
    id: `${Date.now()}`, // temporary id, or use UUID
    ...expense,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    synced: false
  };
  const updated = [...existing, newExpense];
  await saveExpenses(updated);
};