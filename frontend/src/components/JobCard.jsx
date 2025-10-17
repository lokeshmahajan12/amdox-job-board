import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaBriefcase, FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";

export default function JobCard({ job }) {
  const [applied, setApplied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleApply = () => {
    setApplied(true);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      layout
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 relative border border-violet-100"
    >
      {/* Real-time alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-violet-100 text-violet-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <FaCheckCircle /> Applied Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job Header */}
      <h3 className="text-2xl font-bold text-violet-800 mb-1">{job.title}</h3>
      <p className="text-violet-600 font-semibold mb-2">{job.company}</p>
      <p className="text-gray-600 mb-3 flex items-center gap-1">
        <FaMapMarkerAlt className="text-violet-500" /> {job.location}
      </p>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-gray-700">
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-violet-500" /> {job.salary || "Negotiable"}
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-violet-500" /> {job.experience || "Fresher"}
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <FaBriefcase className="text-violet-500" /> {job.jobType || "Full-time"}
        </div>
      </div>

      {/* Skills / Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.map((skill, idx) => (
          <span
            key={idx}
            className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Short Description */}
      <p className="text-gray-500 mb-4 text-sm">
        {job.description?.slice(0, 120)}...
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 text-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl transition"
        >
          View Details
        </Link>
        <button
          onClick={handleApply}
          disabled={applied}
          className={`flex-1 text-center ${
            applied
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-violet-100 hover:bg-violet-200 text-violet-700"
          } font-semibold px-4 py-2 rounded-xl transition`}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>

      {/* Posted Date */}
      {job.postedDate && (
        <p className="text-gray-400 text-xs mt-3">
          Posted on: {job.postedDate}
        </p>
      )}
    </motion.div>
  );
}
