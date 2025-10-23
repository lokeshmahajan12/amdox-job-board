import { Router } from "express";
import dotenv from "dotenv";
dotenv.config(); // loads .env variables

import { listUsers, updateRole, removeUser } from "../controllers/users.controller.js";
import requireAuth from "../middlewares/auth.js";
import requireRole from "../middlewares/requireRole.js";

const r = Router();
r.use(requireAuth, requireRole("admin"));

r.get("/", listUsers);
r.patch("/:id/role", updateRole);
r.delete("/:id", removeUser);

export default r;
