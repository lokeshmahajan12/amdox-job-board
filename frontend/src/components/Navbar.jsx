// import { Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import { FaBriefcase } from "react-icons/fa";
// import { AuthContext } from "../context/AuthContext.jsx";
// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   // Safe destructuring in case AuthContext is undefined
//   const context = useContext(AuthContext) || {};
//   const { user, logout } = context;

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link 
//             to="/" 
//             className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//           >
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded flex items-center justify-center">
//               <FaBriefcase className="text-white text-xl" />
//             </div>
//             <span className="text-2xl font-semibold text-gray-900">JobPortal</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
            
//             <Link 
//               to="/" 
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Home
//             </Link>
//             <Link 
//               to="/jobs" 
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Jobs
//             </Link>
//             <Link 
//               to="/post-job" 
//               className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
//             >
//               Post Job
//             </Link>

//             {/* Auth Section */}
//             {user ? (
//               <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
//                 <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
//                 <button
//                   onClick={logout}
//                   className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
//                 <Link 
//                   to="/register" 
//                   className="text-gray-600 hover:text-purple-600 font-semibold transition-colors"
//                 >
//                   Join now
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
//                 >
//                   Sign in
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden text-gray-700 text-2xl focus:outline-none"
//           >
//             {open ? (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
//             <Link 
//               to="/" 
//               className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
//               onClick={() => setOpen(false)}
//             >
//               Home
//             </Link>
//             <Link 
//               to="/jobs" 
//               className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
//               onClick={() => setOpen(false)}
//             >
//               Jobs
//             </Link>
//             <Link 
//               to="/post-job" 
//               className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
//               onClick={() => setOpen(false)}
//             >
//               Post Job
//             </Link>

//             {user ? (
//               <div className="pt-3 border-t border-gray-200 space-y-3">
//                 <span className="block text-gray-700 font-medium">Welcome, {user.name}</span>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setOpen(false);
//                   }}
//                   className="w-full bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="pt-3 border-t border-gray-200 space-y-3">
//                 <Link 
//                   to="/register" 
//                   className="block text-center text-gray-600 hover:text-purple-600 font-semibold py-2 transition-colors"
//                   onClick={() => setOpen(false)}
//                 >
//                   Join now
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="block text-center px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
//                   onClick={() => setOpen(false)}
//                 >
//                   Sign in
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FaBriefcase, FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [desktopDropdown, setDesktopDropdown] = useState(false); // desktop click dropdown
  const [mobileDropdown, setMobileDropdown] = useState(false); // mobile click dropdown

  const context = useContext(AuthContext) || {};
  const { user, logout } = context;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded flex items-center justify-center">
              <FaBriefcase className="text-white text-xl" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Jobs
            </Link>
            <Link
              to="/post-job"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Post Job
            </Link>

            {/* Desktop Dropdown (click-based) */}
            <div className="relative">
              <button
                onClick={() => setDesktopDropdown(!desktopDropdown)}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Smart Recruitment <FaChevronDown className="text-sm mt-0.5" />
              </button>
              {desktopDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  <Link
                    to="/recommendedjobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Recommended Jobs
                  </Link>
                  <Link
                    to="/resume-upload"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Resume Upload
                  </Link>
                  <Link
                    to="/chatbot"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Chatbot
                  </Link>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/interview-schedule"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Interview Schedule
                  </Link>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
                <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-purple-600 font-semibold transition-colors"
                >
                  Join now
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
          >
            {open ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to="/post-job"
              className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              Post Job
            </Link>

            {/* Mobile Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileDropdown(!mobileDropdown)}
                className="flex justify-between w-full px-4 py-2 text-gray-700 font-medium transition-colors hover:text-purple-600"
              >
                Smart Recruitment <FaChevronDown className="mt-0.5" />
              </button>

              {mobileDropdown && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/recommendedjobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => {
                      setOpen(false);
                      setMobileDropdown(false);
                    }}
                  >
                    Recommended Jobs
                  </Link>
                  <Link
                    to="/resume-upload"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => {
                      setOpen(false);
                      setMobileDropdown(false);
                    }}
                  >
                    Resume Upload
                  </Link>
                  <Link
                    to="/chatbot"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => {
                      setOpen(false);
                      setMobileDropdown(false);
                    }}
                  >
                    Chatbot
                  </Link>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => {
                      setOpen(false);
                      setMobileDropdown(false);
                    }}
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/interview-schedule"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => {
                      setOpen(false);
                      setMobileDropdown(false);
                    }}
                  >
                    Interview Schedule
                  </Link>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <span className="block text-gray-700 font-medium">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <Link
                  to="/register"
                  className="block text-center text-gray-600 hover:text-purple-600 font-semibold py-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Join now
                </Link>
                <Link
                  to="/login"
                  className="block text-center px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

