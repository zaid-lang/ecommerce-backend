// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");  // <-- Import auth routes

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MONGO_URL not defined in .env");
  process.exit(1);
}
mongoose.connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);  // <-- Use auth routes

// Default route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
