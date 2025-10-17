import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaVideo, FaExternalLinkAlt, FaClock, FaUserTie } from "react-icons/fa";

export default function InterviewSchedule() {
const [formData, setFormData] = useState({
email: "",
date: "",
time: "",
interviewer: "",
meetLink: "",
notes: "",
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [preview, setPreview] = useState(false);
const [interviewHistory, setInterviewHistory] = useState([]);

// ✅ Fetch previous interviews safely
const fetchHistory = async () => {
try {
const res = await axios.get("/api/interview/history");
setInterviewHistory(Array.isArray(res.data) ? res.data : []);
} catch (error) {
console.error("Error fetching history:", error);
setInterviewHistory([]);
}
};

useEffect(() => {
fetchHistory();
}, []);

// ✅ Handle form input changes
const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

// ✅ Schedule interview and send email notifications
const handleSchedule = async () => {
const { email, date, time, interviewer } = formData;


if (!email || !date || !time || !interviewer) {
  setMessage("⚠️ Please fill all required fields.");
  return;
}

setLoading(true);
setMessage("");

try {
  // 1️⃣ Pre-scheduling notification email
  await axios.post("/api/interview/pre-notify", formData);

  // 2️⃣ Schedule + final email confirmation
  const res = await axios.post("/api/interview/schedule", formData);

  if (res.data?.success) {
    setMessage("✅ Interview scheduled successfully! Email notifications sent.");
    setPreview(true);
    fetchHistory();
    setFormData({
      email: "",
      date: "",
      time: "",
      interviewer: "",
      meetLink: "",
      notes: "",
    });
  } else {
    setMessage("❌ Failed to schedule interview.");
  }
} catch (err) {
  console.error("Schedule error:", err);
  setMessage("❌ Error scheduling interview.");
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 to-white p-6">
{/* Schedule Form */}
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-purple-200 mb-10"
> <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
Schedule an Interview </h2>


    <div className="space-y-4">
      {["email", "date", "time", "interviewer"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-semibold text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)} *
          </label>
          <input
            type={field === "email" ? "email" : field === "date" ? "date" : field === "time" ? "time" : "text"}
            name={field}
            placeholder={`Enter ${field}`}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border border-purple-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Google Meet / Zoom Link
        </label>
        <input
          type="url"
          name="meetLink"
          placeholder="https://meet.google.com/xyz"
          value={formData.meetLink}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Notes
        </label>
        <textarea
          name="notes"
          rows="3"
          placeholder="Optional notes or instructions..."
          value={formData.notes}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400"
        />
      </div>
    </div>

    <button
      onClick={handleSchedule}
      disabled={loading}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 mt-6 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? "Scheduling..." : "Send Email & Schedule"}
    </button>

    {message && (
      <p
        className={`mt-4 text-center font-medium ${
          message.includes("✅") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}

    {preview && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 border border-green-300 rounded-lg bg-green-50"
      >
        <h3 className="font-semibold text-green-700 mb-2">
          Interview Summary
        </h3>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Time:</strong> {formData.time}</p>
        <p><strong>Interviewer:</strong> {formData.interviewer}</p>
        {formData.meetLink && (
          <p>
            <strong>Meeting Link:</strong>{" "}
            <a
              href={formData.meetLink}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 underline"
            >
              Join Meeting
            </a>
          </p>
        )}
        {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
      </motion.div>
    )}
  </motion.div>

  {/* Interview History */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 border border-purple-200"
  >
    <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
      Interview History
    </h2>

    {interviewHistory.length === 0 ? (
      <p className="text-gray-500 text-center">No interviews scheduled yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-purple-100 text-purple-700">
              <th className="p-3 text-left">Candidate</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Interviewer</th>
              <th className="p-3 text-left">Meeting Link</th>
              <th className="p-3 text-left">Recording</th>
            </tr>
          </thead>
          <tbody>
            {interviewHistory.map((item, index) => (
              <tr key={index} className="border-b hover:bg-purple-50 transition">
                <td className="p-3">{item.email || "—"}</td>
                <td className="p-3">{item.date || "—"}</td>
                <td className="p-3 flex items-center gap-1">
                  <FaClock className="text-purple-500" /> {item.time || "—"}
                </td>
                <td className="p-3 flex items-center gap-1">
                  <FaUserTie className="text-purple-500" /> {item.interviewer || "—"}
                </td>
                <td className="p-3">
                  {item.meetLink ? (
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-600 underline flex items-center gap-1"
                    >
                      Join <FaExternalLinkAlt size={12} />
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3">
                  {item.recording ? (
                    <a
                      href={item.recording}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 underline flex items-center gap-1"
                    >
                      Watch <FaVideo size={14} />
                    </a>
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>
</div>

);
}
