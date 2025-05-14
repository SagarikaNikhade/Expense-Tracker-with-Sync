import { getPendingExpenses, clearQueue, saveExpenses, loadExpenses, getDeleteQueue, clearDeleteQueue } from '../storage/localDB';
import { addExpense, deleteExpense, fetchExpenses } from './api';
import { isOnline } from '../services/network';

// export const syncExpenses = async () => {
//   const online = await isOnline();
//   if (!online) return;

//   // 1. Upload pending expenses
//   const pending = await getPendingExpenses();
//   for (const expense of pending) {
//     try {
//       await addExpense(expense); // API call
//     } catch (err) {
//       console.log('Sync failed for:', expense);
//     }
//   }

//   await clearQueue();

//   // 2. Download latest from server
//   const serverExpenses = await fetchExpenses(); // You can also use `?since=timestamp`
//   await saveExpenses(serverExpenses);
// };

export const syncExpenses = async () => {
  const online = await isOnline();
  if (!online) return;

  // 1. Upload offline-added expenses
  const pending = await getPendingExpenses();
  for (const expense of pending) {
    try {
      await addExpense(expense);
    } catch (err) {
      console.log('Failed to sync expense:', expense);
    }
  }
  await clearQueue();

  // 2. Sync offline deletes
  const deletes = await getDeleteQueue();
  for (const id of deletes) {
    try {
      await deleteExpense(id);
    } catch (err) {
      console.log('Failed to delete expense:', id);
    }
  }
  await clearDeleteQueue();

  // 3. Fetch latest server data
  const serverExpenses = await fetchExpenses();
  await saveExpenses(serverExpenses);
};

