 const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/pay", (req, res) => {
  console.log("PAY API HIT");

  const { amount } = req.body;

  res.json({
    url: `http://localhost:5173/success?amount=${amount}`
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});