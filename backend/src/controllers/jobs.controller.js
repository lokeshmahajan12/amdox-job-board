import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, postedBy: req.user.id });
  res.status(201).json({ job });
};

export const listJobs = async (_req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json({ jobs });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json({ job });
};

export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ job });
};

export const deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
