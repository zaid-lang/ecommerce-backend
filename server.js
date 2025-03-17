require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import product routes
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("❌ MONGO_URL is not defined in .env file.");
  process.exit(1);
}

mongoose.connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Could not connect to MongoDB", err));

// Default route (Fixes Cannot GET / error)
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running!");
});

// Product API routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
