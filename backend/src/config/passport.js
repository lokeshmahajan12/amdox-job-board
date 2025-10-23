import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g., "http://localhost:5000/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for existing user by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not found, create a new user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: "candidate",
            password: null, // optional
          });
        }

        // Generate JWT token (you can send it to frontend)
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // short expiry recommended
        );

        // Pass user & token to callback
        done(null, { user, token });
      } catch (err) {
        console.error("Google Strategy Error:", err);
        done(err, null);
      }
    }
  )
);

// Optional: Only needed if you use sessions
passport.serializeUser((data, done) => {
  done(null, data.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
