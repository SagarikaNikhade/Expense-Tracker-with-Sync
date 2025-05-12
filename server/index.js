const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");

// Routes
const { ExpenseRouter } = require("./routes/expense.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker!");
});

// Expense Routes
app.use("/expenses", ExpenseRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is running at port ${process.env.port}`);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
});