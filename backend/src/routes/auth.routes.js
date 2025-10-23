// auth.routes.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken"; // <<--- ADD THIS
import { register, login, me, logout } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// --- Normal Auth Routes ---
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", logout);

// --- Google OAuth Routes ---
// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=not_registered`);
    }

    // Generate JWT using imported jwt
    const token = jwt.sign(
      { id: req.user.user._id, role: req.user.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect with token to frontend
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}&google_login=success`);
  }
);

export default router;
