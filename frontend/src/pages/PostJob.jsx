import { useState } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [postedDate, setPostedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      title,
      company,
      location,
      salary,
      experience,
      jobType,
      skills: skills.split(",").map((s) => s.trim()),
      description,
      postedDate,
    };
    console.log("Job Posted:", jobData);
    alert("Job posted successfully!");
    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setExperience("");
    setJobType("Full-time");
    setSkills("");
    setDescription("");
    setPostedDate("");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-violet-200">
        <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Salary (e.g., $50,000/yr)"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience Required (e.g., 1-3 years)"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>

          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />

          <textarea
            placeholder="Job Description"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />

          <input
            type="date"
            className="w-full p-3 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={postedDate}
            onChange={(e) => setPostedDate(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold text-lg transition-all"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
