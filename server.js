require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("❌ Error: MONGO_URL is not defined in .env file.");
    process.exit(1);
}

// Connect to MongoDB without deprecated options
mongoose.connect(mongoUrl)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Could not connect to MongoDB", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
