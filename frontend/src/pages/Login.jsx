import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../components/Toast";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  // Handle Google login token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error === "not_registered") {
      notifyError("You need to register first before logging in with Google!");
    }

    if (token) {
      localStorage.setItem("token", token);
      axios
        .get("http://localhost:5000/api/auth/google/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          login(res.data.user); // Update context
          notifySuccess("Google login successful!");
          navigate("/"); // Navigate home, Navbar updates automatically
        })
        .catch(() => notifyError("Failed to fetch user info"));
    }
  }, [location.search, login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, user, message } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        login(user); // Update context
        notifySuccess("Login successful!");
        navigate("/"); // Navbar updates without reload
      } else {
        notifyError(message || "Login failed!");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password!";
      notifyError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-light text-purple-900 mb-6 leading-tight">
              Welcome to your professional community
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with opportunities, grow your career, and build your professional network.
            </p>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Sign in</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-400 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
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

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-400 rounded-full hover:bg-gray-50 transition-colors"
              >
                Continue with Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              New to JobPortal?{" "}
              <Link to="/register" className="text-purple-600 font-semibold hover:underline">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
