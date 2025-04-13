require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
// const paymentRoutes = require("./routes/paymentRoutes"); // Optional

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
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes); 

// Default route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
