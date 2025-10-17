// import JobCard from "../components/JobCard.jsx";
// import { jobsData } from "../utils/data.js";
// import SearchBar from "../components/SearchBar.jsx";
// import { useState } from "react";

// export default function Home() {
//   const [search, setSearch] = useState("");

//   const filteredJobs = jobsData.filter(
//     (job) =>
//       job.title.toLowerCase().includes(search.toLowerCase()) ||
//       job.company.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Job Listing Portal</h1>
//       <SearchBar search={search} setSearch={setSearch} />
//       <div>
//         {filteredJobs.length ? (
//           filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
//         ) : (
//           <p>No jobs found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBriefcase, FaUsers, FaRocket, FaSearch } from "react-icons/fa";

import { jobsData } from "../utils/data.js";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  useEffect(() => {
    setFilteredJobs(
      jobsData.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (<div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
    {/* HERO SECTION */} <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative overflow-hidden"> <div className="max-w-4xl mx-auto"> <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Find Your Dream Job with <span className="text-yellow-300">JobPortal</span> </h1> <p className="text-lg mb-8 opacity-90">
        Explore thousands of opportunities, connect with top companies, and take your career to new heights. </p> <div className="flex justify-center"> <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full mr-4 transition">
         <a
        href="/register">
          Get Started </a></button> <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-purple-700 transition">
           <a
        href="/post-job">
          Post a Job </a>
        </button> </div> </div> </section>

    {/* SEARCH SECTION */}
    <section className="max-w-5xl mx-auto mt-[-3rem] bg-white rounded-2xl shadow-lg p-8 relative z-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Search Jobs That Fit Your Skills
      </h2>
      <SearchBar search={search} setSearch={setSearch} />
    </section>

    {/* JOB CATEGORIES */}
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Engineering",
            "Design",
            "Marketing",
            "Sales",
            "Finance",
            "Healthcare",
            "Education",
            "IT & Software",
          ].map((category) => (
            <div
              key={category}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <FaBriefcase className="text-purple-600 mx-auto mb-3 text-2xl" />
              <h3 className="font-semibold text-gray-800">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* STATS COUNTER */}
    <section className="bg-white py-16 text-center">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <FaBriefcase />, label: "Jobs Posted", value: "24,000+" },
          { icon: <FaBuilding />, label: "Companies", value: "1,200+" },
          { icon: <FaUsers />, label: "Active Users", value: "85,000+" },
          { icon: <FaRocket />, label: "Placements", value: "10,500+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 rounded-xl shadow p-6"
          >
            <div className="text-purple-600 text-3xl mb-3">{stat.icon}</div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* TOP COMPANIES */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Top Companies Hiring</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["Google", "Microsoft", "Amazon", "Netflix", "Adobe", "Tesla"].map((company) => (
            <motion.div
              key={company}
              whileHover={{ scale: 1.1 }}
              className="bg-white shadow-md rounded-xl px-6 py-4 text-gray-700 font-semibold"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Create Account",
            desc: "Sign up and set up your profile in minutes.",
            icon: <FaUsers />,
          },
          {
            title: "Apply for Jobs",
            desc: "Browse thousands of job listings tailored to your skills.",
            icon: <FaBriefcase />,
          },
          {
            title: "Get Hired",
            desc: "Connect directly with employers and land your dream job.",
            icon: <FaRocket />,
          },
        ].map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-8 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="text-purple-600 text-4xl mb-4 flex justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* NEWSLETTER */}
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">Stay Updated with New Job Alerts</h2>
      <p className="mb-6 opacity-90">
        Join thousands of professionals who receive the latest job opportunities every week.
      </p>
      <form className="flex justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 w-full rounded-l-full focus:outline-none text-gray-800"
          required
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 rounded-r-full transition">
          Subscribe
        </button>
      </form>
    </section>

    {/* CALL TO ACTION */}
    <section className="text-center py-20 bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Ready to take your career to the next level?
      </h2>
      <a
        href="/register"
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition inline-block"
      >
        Join Now
      </a>
    </section>
  </div>
  );
}