const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");

// All routes protected by JWT middleware
router.use(authMiddleware);

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
