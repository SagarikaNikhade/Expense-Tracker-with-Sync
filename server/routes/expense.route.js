const express = require("express");
const { ExpenseModel } = require("../models/expense.model");
const ExpenseRouter = express.Router();

// POST /expenses - Add new expense
ExpenseRouter.post('/', async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const newExpense = await ExpenseModel.create({
      amount,
      category,
      date: date || new Date(),
      description: description || '',
      updatedAt: new Date()
    });
    
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /expenses/:id - Soft delete expense (for sync purposes)
ExpenseRouter.delete('/:id', async (req, res) => {
  try {
    const expense = await ExpenseModel.findByIdAndUpdate(
      req.params.id, 
      { 
        isDeleted: true,
        updatedAt: new Date() 
      },
      { new: true }
    );
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.status(200).json({ message: 'Expense deleted successfully', expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /expenses - Fetch all expenses with sync support
ExpenseRouter.get('/', async (req, res) => {
  try {
    // Check if client sent a lastSyncTime parameter
    const lastSyncTime = req.query.lastSyncTime ? new Date(req.query.lastSyncTime) : new Date(0);
    
    const expenses = await ExpenseModel.find({
      updatedAt: { $gt: lastSyncTime }
    });
    
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { ExpenseRouter }