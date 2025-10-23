import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config(); // loads .env variables

export const listUsers = async (_req, res) => {
  const users = await User.find().select("-password");
  res.json({ users });
};

export const updateRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  res.json({ user });
};

export const removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
