import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      minlength: 6,
      select: false, // hide by default
    },
    googleId: {
      type: String,
      default: null,
    },
    role: {
  type: String,
  enum: ['admin', 'recruiter', 'candidate'],
  default: 'candidate'
},
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive info
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

export default mongoose.model("User", userSchema);
