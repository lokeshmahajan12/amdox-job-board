import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDollarSign, FaStar } from "react-icons/fa";

export default function RecommendedJobs({ userId }) {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [demoJobs, setDemoJobs] = useState([]);
  const [smartTips, setSmartTips] = useState("");

  useEffect(() => {
    if (!userId) return; // skip fetch if userId is not ready

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`/api/jobs/recommend/${userId}`);
        const jobList = res.data || [];
        setRecommendedJobs(jobList);

        const smartRes = await axios.post("/api/gemini/analyze-resume", { userId });
        setSmartTips(
          smartRes?.data?.tip ||
            "💡 Tip: Highlight projects demonstrating problem-solving and measurable results."
        );

        setDemoJobs([
          { _id: "demo1", title: "Frontend Developer", company: "TechNova", location: "Remote", salary: "₹8L-12L" },
          { _id: "demo2", title: "Backend Engineer", company: "CloudEdge", location: "Bangalore", salary: "₹10L-15L" },
          { _id: "demo3", title: "AI/ML Engineer", company: "NeuraTech", location: "Hyderabad", salary: "₹12L-18L" },
        ]);
      } catch (err) {
        console.error("Error fetching job recommendations:", err);
        setRecommendedJobs([]);
        setDemoJobs([]);
        setSmartTips("💡 Unable to fetch AI suggestions right now.");
      }
    };
    fetchJobs();
  }, [userId]);

  const JobCard = ({ job }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-gray-600 font-medium mb-1">{job.company}</p>
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <FaMapMarkerAlt className="mr-2 text-blue-500" />
        {job.location}
      </div>
      {job.salary && (
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaDollarSign className="mr-2 text-green-600" /> {job.salary}
        </div>
      )}
      {job.matchScore && (
        <div className="flex items-center text-yellow-500 text-sm font-medium mb-3">
          <FaStar className="mr-1" /> Match Score: {job.matchScore}%
        </div>
      )}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        View Details
      </button>
    </motion.div>
  );

  return (
    <div className="px-6 py-10 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        🔍 Recommended Jobs
      </h2>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto mb-10 bg-blue-100 text-blue-800 p-4 rounded-xl shadow-md border border-blue-200"
      >
        <strong>AI Suggestion:</strong> {smartTips}
      </motion.div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">AI Recommended Jobs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {recommendedJobs.length > 0 ? (
          recommendedJobs.map((job) => <JobCard key={job._id || job.title} job={job} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">No AI recommendations yet.</div>
        )}
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Suggested Jobs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoJobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  );
}
