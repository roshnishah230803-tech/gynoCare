const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    msg: "API working perfectly 🎉"
  });
});

module.exports = serverless(app);