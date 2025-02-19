/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());
console.log("Connecting to MongoDB...");

mongoose
    .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const db = mongoose.connection;
        console.log("Connected to MongoDB, using :", db.name);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173",`http://localhost:${PORT}`],
    credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});