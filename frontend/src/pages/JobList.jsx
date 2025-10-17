import { useState } from "react";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard.jsx";
import { jobsData } from "../utils/data.js";

export default function JobList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  const categories = ["All", "IT", "Finance", "Marketing", "Design", "Engineering", "HR", "Sales"];
  const locations = ["All", "Remote", "New York", "Bangalore", "London", "San Francisco"];
  const experiences = ["All", "Fresher", "1-3 Years", "3-5 Years", "5+ Years"];

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter;
    const matchesLocation = locationFilter === "All" || job.location === locationFilter;
    const matchesExperience = experienceFilter === "All" || job.experience === experienceFilter;
    return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* PAGE TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-violet-700 mb-4"
        >
          Explore Career Opportunities
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Find the perfect job that matches your skills, passion, and goals. Use filters below to refine your search.
        </p>

        {/* FILTER BAR */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-violet-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="border border-violet-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {experiences.map((exp) => (
              <option key={exp}>{exp}</option>
            ))}
          </select>
        </div>

        {/* JOB GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No jobs found matching your criteria.
            </p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-violet-700 mb-4">
            Want to Post a Job?
          </h2>
          <a
            href="/post-job"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Post Job
          </a>
        </motion.div>
      </div>
    </div>
  );
}
