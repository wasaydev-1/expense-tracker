const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "food",
        "transport",
        "bills",
        "entertainment",
        "shopping",
        "other",
      ],
      default: "other",
    },
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
    receiptPath: String, // for future file uploads
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
