import { useParams } from "react-router-dom";
import { jobsData } from "../utils/data.js";

export default function JobDetail() {
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === parseInt(id));

  if (!job) return <p className="p-6">Job not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700 mb-1">Company: {job.company}</p>
      <p className="text-gray-700 mb-1">Location: {job.location}</p>
      <p className="text-gray-700 mt-4">Job description will go here...</p>
    </div>
  );
}