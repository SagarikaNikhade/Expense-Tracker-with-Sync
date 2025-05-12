import React, { useState } from 'react';
import { addExpense } from '../Redux/action';

const ExpenseForm = () => {
    const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Convert amount to number
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      await addExpense(expenseData);
      
      // Reset form after successful submission
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().slice(0, 10)
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form 
      onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm
