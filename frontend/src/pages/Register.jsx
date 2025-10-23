// Register.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // --- Handle token or error from Google OAuth redirect ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error === "not_registered") {
      toast.error("You need to register first before logging in with Google!");
    }

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Google login successful!");
      setTimeout(() => navigate("/dashboard"), 500); // Delay to show toast
    }
  }, [location.search, navigate]);

  // --- Normal Register handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.warning("Please agree to the terms and privacy policy");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 500); // Delay navigation
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Google OAuth signup ---
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            Make the most of your professional life
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-400 rounded focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-400 rounded focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password (6+ characters)
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-400 rounded focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            {/* Show Password */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
              />
              <label htmlFor="show-password" className="ml-2 text-sm text-gray-700">
                Show password
              </label>
            </div>

            {/* Terms */}
            <div className="pt-2">
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                By clicking Agree & Join or Continue, you agree to the JobPortal{" "}
                <a href="#" className="text-purple-600 hover:underline">User Agreement</a>,{" "}
                <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>, and{" "}
                <a href="#" className="text-purple-600 hover:underline">Cookie Policy</a>.
              </p>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600 mt-0.5"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-700">
                  I agree to the terms and privacy policy
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Agree & Join"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-400 rounded-full hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already on JobPortal?{" "}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
