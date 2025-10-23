// backend/src/server.js
import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js"; // Load Google OAuth config

// ----------------------------
// Connect to MongoDB
// ----------------------------
connectDB();

// ----------------------------
// Express App
// ----------------------------
const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, // Allow cookies from frontend
}));
app.use(express.json());
app.use(cookieParser());

// Optional: session for passport (needed if you want sessions)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ----------------------------
// Routes
// ----------------------------
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("🚀 Job Portal API Running"));

// ----------------------------
// Start server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

console.log("MONGO_URI:", process.env.MONGO_URI);
