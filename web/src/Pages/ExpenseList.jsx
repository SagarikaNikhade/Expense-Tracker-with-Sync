import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, deleteExpense } from "../Redux/action";

const ExpenseList = () => {
  const dispatch = useDispatch();
  // const expenseData = useSelector(
  //   (store) => store.expenseReducer.expenses || []
  // );
  const { expenses, deletingId } = useSelector((store) => store.expenseReducer);
  const lastSyncTime = new Date().toISOString();

  const handleDelete = async (id) => {
    dispatch(deleteExpense(id));
  };

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    // <div className="expense-list-container">
    //   <h2>Expense List</h2>
    //   <table className="expense-table">
    //     <thead>
    //       <tr>
    //         <th>Date</th>
    //         <th>Category</th>
    //         <th>Description</th>
    //         <th>Amount</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {expenseData.map((expense) => (
    //         <tr key={expense._id}>
    //           <td>{new Date(expense.date).toLocaleDateString()}</td>
    //           <td>{expense.category}</td>
    //           <td>{expense.description || "-"}</td>
    //           <td>${expense.amount.toFixed(2)}</td>
    //           <td>
    //             <button
    //               onClick={() => handleDelete(expense._id)}
    //               className={`delete-button ${isDeleting ? "deleting" : ""}`}
    //               disabled={isDeleting}
    //             >
    //               {isDeleting ? "Deleting..." : "Delete"}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="expense-list-container">
      <h2>Expense List</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const isDeleting = deletingId === expense._id;
            return (
              <tr key={expense._id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.description || "-"}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className={`delete-button ${isDeleting ? "deleting" : ""}`}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
