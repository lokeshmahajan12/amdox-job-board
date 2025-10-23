import { Router } from "express";
import { createJob, listJobs, getJob, updateJob, deleteJob } from "../controllers/jobs.controller.js";
import requireAuth from "../middlewares/auth.js";
import requireRole from "../middlewares/requireRole.js";

const r = Router();
r.get("/", listJobs);
r.get("/:id", getJob);
r.post("/", requireAuth, createJob);
r.patch("/:id", requireAuth, requireRole("admin"), updateJob);
r.delete("/:id", requireAuth, requireRole("admin"), deleteJob);

export default r;
