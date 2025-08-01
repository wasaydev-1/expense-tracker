const Expense = require("../models/expenseModel");

exports.createExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    const expense = new Expense({
      user: req.userId,
      amount,
      category,
      description,
      date,
    });
    await expense.save();
    res.status(201).json({ message: "Expense added", expense });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add expense", error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({
      date: -1,
    });
    res.json({ expenses });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch expenses", error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.deleteOne({ _id: id, user: req.userId });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete expense", error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json({ message: "Expense updated", expense: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update expense", error: err.message });
  }
};
