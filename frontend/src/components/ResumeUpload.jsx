import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFileUpload, FaBrain, FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      // STEP 1: Upload resume and extract text
      const uploadRes = await axios.post("/api/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resumeText = uploadRes.data.text;
      setParsedData(uploadRes.data);

      // STEP 2: Send text to Gemini API for AI-based analysis
      const analysisRes = await axios.post("/api/analyze-resume", { text: resumeText });

      setParsedData((prev) => ({
        ...prev,
        ...analysisRes.data.extractedInfo,
      }));
      setRecommendedJobs(analysisRes.data.recommendedJobs || []);
      setAnalysis(analysisRes.data.analysis || {});
    } catch (err) {
      console.error("Resume upload error:", err);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white border border-purple-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6 flex items-center justify-center gap-2">
          <FaBrain className="text-purple-500" /> AI Resume Analyzer
        </h2>

        {/* Upload Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <FaFileUpload />
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>

        {/* Parsed Resume Info */}
        {parsedData && (
          <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl mb-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-700">Extracted Information</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-gray-800">
              {parsedData.name && <p><strong>Name:</strong> {parsedData.name}</p>}
              {parsedData.email && <p><strong>Email:</strong> {parsedData.email}</p>}
              {parsedData.phone && <p><strong>Phone:</strong> {parsedData.phone}</p>}
              {parsedData.education && <p><strong>Education:</strong> {parsedData.education}</p>}
              {parsedData.experience && <p><strong>Experience:</strong> {parsedData.experience}</p>}
              {parsedData.skills && (
                <p><strong>Skills:</strong> {parsedData.skills.join(", ")}</p>
              )}
            </div>

            {/* Toggle Resume Text */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="mt-3 text-purple-600 font-medium flex items-center gap-2 hover:text-purple-800"
            >
              {showPreview ? <FaRegEyeSlash /> : <FaRegEye />}
              {showPreview ? "Hide Resume Text" : "Show Resume Text"}
            </button>

            {showPreview && (
              <pre className="mt-3 bg-white border border-purple-200 p-3 rounded-lg max-h-60 overflow-y-auto text-sm text-gray-600">
                {parsedData.text}
              </pre>
            )}
          </div>
        )}

        {/* AI Analysis */}
        {analysis && (
          <div className="bg-white border border-purple-200 rounded-xl shadow p-5 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-700">AI Insights</h3>
            <div className="space-y-3 text-gray-700">
              {analysis.strengths && (
                <p><strong>Strengths:</strong> {analysis.strengths}</p>
              )}
              {analysis.weaknesses && (
                <p><strong>Weaknesses:</strong> {analysis.weaknesses}</p>
              )}
              {analysis.suggestions && (
                <p><strong>Suggestions:</strong> {analysis.suggestions}</p>
              )}
              {analysis.jobFitScore && (
                <div className="flex items-center gap-2 mt-2">
                  <FaCheckCircle className="text-green-600" />
                  <p><strong>Job Fit Score:</strong> {analysis.jobFitScore}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommended Jobs */}
        {recommendedJobs.length > 0 && (
          <div className="recommendedjobs bg-purple-50 p-5 rounded-xl border border-purple-200">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Recommended Jobs for You</h3>
            <ul className="space-y-3">
              {recommendedJobs.map((job, idx) => (
                <li
                  key={idx}
                  className="p-3 border rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Link
                    to={`/recommendedjobs/${job.id}`}
                    className="text-purple-700 font-medium text-lg"
                  >
                    {job.title} at {job.company}
                  </Link>
                  <p className="text-gray-600 text-sm">{job.location}</p>
                  {job.matchReason && (
                    <p className="text-gray-500 text-xs italic">
                      Match Reason: {job.matchReason}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
