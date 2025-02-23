/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/User.js";
import client from "../PGAdminDatabase/databasepg.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {userName, email, password} = req.body;
    console.log("Received Data:", req.body);

    console.log("Checking MongoDB for existing user...");
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({error: "User already exists in MongoDB"});
    }

    console.log("Checking PostgreSQL for existing user...");
    const userExist = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if(userExist.rows.length > 0){
        return res.status(400).json({error: "User already exists in PostgreSQL"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    console.log("Making New User...");

    try{
        //MongoDB
        console.log("Creating User to MongoDB...");
        const newUser = new User({userName, email, password: hashedPassword});
        console.log("User object:", newUser);
        await newUser.save();
        console.log("✅ User MongoDB registered successfully");

        //PGAdmin
        console.log("Inserting user into PostgreSQL...");
        const addUser = await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [userName, email, hashedPassword]);
        console.log("✅ User PGAdmin registered successfully:", addUser.rows[0]);
        
        res.status(201).json({
            Message: "User registered successfully"
        });
    }
    catch(error){
        console.error("❌ Error during signup:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        //Check in MongoDB
        let user = await User.findOne({email});
        let userQuery = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if(!user && !userQuery){
            return res.status(401).json({ error: "User not found" });
        }

        user = userQuery.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({ error: "Wrong Password" });
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m"
            }
        );

        res.status(200).json(
            { 
                message: "Login successful", 
                token, 
                user: {  email: user.email, userName: user.name }
            }
        );
    }
    catch(err){
        console.error("Login error:", err);
        return res.status(400).json({ error: "Error" });
    }
})

export default router;