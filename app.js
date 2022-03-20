import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load config
dotenv.config({ path: `./config/.env` });

// Connect to DB
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
