import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Issue JWT and set cookie
const issueAuthCookie = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "100d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role });

    const token = issueAuthCookie(res, { id: user._id, role: user.role });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = issueAuthCookie(res, { id: user._id, role: user.role });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GOOGLE OAUTH LOGIN / REGISTER
export const googleAuth = async (req, res) => {
  try {
    const profile = req.user; 
    if (!profile) return res.status(400).json({ message: "Google login failed" });

    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
    }

    const token = issueAuthCookie(res, { id: user._id, role: user.role || "user" });
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}&google_login=success`);
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// CURRENT USER
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
export const logout = (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};
