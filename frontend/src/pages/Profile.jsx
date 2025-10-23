// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import {
  FaEdit,
  FaSave,
  FaCloudUploadAlt,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaSun,
  FaMoon,
  FaFileAlt,
  FaTrash,
  FaPlus,
  FaImage,
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null); // Lightbox state

  // Load profile from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setProfile({
        name: storedUser.name || "Lokesh Mahajan",
        email: storedUser.email || "lokesh@example.com",
        role: storedUser.role || "Frontend Developer",
        location: storedUser.location || "Pune, India",
        bio: storedUser.bio || "Creative web developer passionate about building interactive web apps.",
        phone: storedUser.phone || "+91 9876543210",
        linkedin: storedUser.linkedin || "https://linkedin.com/in/lokesh",
        github: storedUser.github || "https://github.com/lokesh",
        experience: storedUser.experience || [],
        education: storedUser.education || [],
        certifications: storedUser.certifications || [],
        projects: storedUser.projects || [],
        skills: storedUser.skills || [],
        image: storedUser.image || null,
      });
      setImage(storedUser.image || null);
    }
    setLoading(false);
  }, []);

  const toggleEdit = () => {
    if (editing) localStorage.setItem("user", JSON.stringify(profile));
    setEditing(!editing);
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        setProfile({ ...profile, image: base64String });
        localStorage.setItem("user", JSON.stringify({ ...profile, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (section, item) => {
    const updated = { ...profile, [section]: [...(profile[section] || []), item] };
    setProfile(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleRemoveItem = (section, index) => {
    const updated = profile[section].filter((_, i) => i !== index);
    const newProfile = { ...profile, [section]: updated };
    setProfile(newProfile);
    localStorage.setItem("user", JSON.stringify(newProfile));
  };

  // Export resume
  const exportResume = () => {
    const doc = new jsPDF();
    let y = 20;

    if (profile.image) doc.addImage(profile.image, "JPEG", 150, 10, 40, 40);

    doc.setFontSize(18);
    doc.text(profile.name, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text(`Role: ${profile.role}`, 10, y);
    y += 10;
    doc.text(`Location: ${profile.location}`, 10, y);
    y += 10;
    doc.text(`Email: ${profile.email}`, 10, y);
    y += 10;
    doc.text(`Phone: ${profile.phone}`, 10, y);
    y += 10;

    doc.text("Bio:", 10, y);
    y += 10;
    const splitBio = doc.splitTextToSize(profile.bio, 180);
    doc.text(splitBio, 10, y);
    y += splitBio.length * 10;

    const sections = ["experience", "education", "certifications", "projects", "skills"];
    sections.forEach((sec) => {
      if (profile[sec] && profile[sec].length > 0) {
        doc.setFontSize(16);
        doc.text(sec.charAt(0).toUpperCase() + sec.slice(1) + ":", 10, y);
        y += 10;
        doc.setFontSize(12);
        profile[sec].forEach((item) => {
          const text = typeof item === "object" && item.name ? item.name : item;
          doc.text(`- ${text}`, 15, y);
          y += 8;
        });
        y += 5;
      }
    });

    doc.save(`${profile.name}-Resume.pdf`);
  };

  const completion = Math.floor(
    (Object.values(profile || {}).filter((v) => v && (Array.isArray(v) ? v.length > 0 : true)).length / 10) * 100
  );

  if (loading)
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading profile...</div>;
  if (!profile)
    return <div className="flex justify-center items-center h-screen text-gray-600">Please login to view your profile.</div>;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all duration-500`}>
      {/* Theme Toggle */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </div>

      {/* Header */}
      <motion.div
        className={`relative h-64 rounded-b-3xl shadow-md ${
          darkMode
            ? "bg-gradient-to-r from-purple-800 to-indigo-900"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        }`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={image || profile.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="profile"
            className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg cursor-pointer"
            onClick={() => setLightboxImage(image || profile.image)}
          />
          {editing && (
            <>
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700"
              >
                <FaCloudUploadAlt />
              </label>
              <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </>
          )}
        </div>
      </motion.div>

      {/* Profile Info */}
      <motion.div
        className="max-w-5xl mx-auto px-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className={`rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex-1 text-center sm:text-left mt-20 sm:mt-0">
            <div className="flex justify-between items-center mb-2">
              {editing ? (
                <input
                  className={`text-3xl font-bold border-b w-full bg-transparent focus:outline-none ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              ) : (
                <h2 className="text-3xl font-bold">{profile.name}</h2>
              )}
              <button onClick={toggleEdit} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
                {editing ? <FaSave /> : <FaEdit />} {editing ? "Save" : "Edit"}
              </button>
            </div>
            <p className="text-gray-400">{profile.role}</p>
            <p className="text-gray-500">{profile.location}</p>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-3 text-indigo-500 text-lg">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href={`mailto:${profile.email}`}>
                <FaEnvelope />
              </a>
              <a href={`tel:${profile.phone}`}>
                <FaPhone />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editable Sections */}
      <EditableSection
        title="About / Bio"
        section="bio"
        profile={profile}
        editing={editing}
        darkMode={darkMode}
        handleAddItem={(sec, item) => setProfile({ ...profile, bio: item })}
        handleRemoveItem={() => {}}
      />

      {["Experience", "Education", "Projects", "Skills"].map((sec) => (
        <EditableSection
          key={sec}
          title={sec}
          section={sec.toLowerCase()}
          profile={profile}
          editing={editing}
          darkMode={darkMode}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
      ))}

      {/* Certifications */}
      <EditableSectionWithImages
        title="Certifications"
        section="certifications"
        profile={profile}
        editing={editing}
        darkMode={darkMode}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        setLightboxImage={setLightboxImage} // pass to child
      />

      {/* Completion */}
      <AnimatedCard title="Profile Completion" darkMode={darkMode}>
        <div className="w-full bg-gray-300 h-5 rounded-full">
          <div className="bg-green-500 h-5 rounded-full" style={{ width: `${completion}%` }}></div>
        </div>
        <button
          onClick={exportResume}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <FaFileAlt /> Export Resume
        </button>
      </AnimatedCard>

      {/* Analytics */}
      <AnimatedCard title="Analytics" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[
              { name: "Skills", value: profile.skills.length },
              { name: "Projects", value: profile.projects.length },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </AnimatedCard>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full Screen"
            className="max-h-[90%] max-w-[90%] object-contain shadow-lg rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

// Animated Card Component
function AnimatedCard({ title, children, darkMode }) {
  return (
    <motion.div
      className={`max-w-5xl mx-auto mt-6 p-6 rounded-2xl shadow-lg relative ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

// Editable Text Sections
function EditableSection({ title, section, profile, editing, darkMode, handleAddItem, handleRemoveItem }) {
  const [newItem, setNewItem] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addItem = () => {
    if (!newItem) return;
    const item = { name: newItem };
    handleAddItem(section, item);
    setNewItem("");
    setShowInput(false);
  };

  return (
    <AnimatedCard title={title} darkMode={darkMode}>
      {editing && (
        <div className="flex justify-end mb-2">
          <button onClick={() => setShowInput(!showInput)} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            <FaPlus /> Add
          </button>
        </div>
      )}
      {showInput && editing && (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className={`flex-1 border rounded p-2 bg-transparent ${darkMode ? "border-gray-700" : "border-gray-300"}`}
            placeholder={`Add new ${title}`}
          />
          <button onClick={addItem} className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            <FaPlus />
          </button>
        </div>
      )}
      <ul className="list-disc ml-5 space-y-1">
        {Array.isArray(profile[section]) &&
          profile[section].map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              {item.name}
              {editing && (
                <button onClick={() => handleRemoveItem(section, i)} className="ml-2 text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              )}
            </li>
          ))}
      </ul>
    </AnimatedCard>
  );
}

// Editable Certifications Section (with image upload + editable name)
function EditableSectionWithImages({ title, section, profile, editing, darkMode, handleAddItem, handleRemoveItem, setLightboxImage }) {
  const [certs, setCerts] = useState(profile[section] || []);

  useEffect(() => {
    setCerts(profile[section] || []);
  }, [profile, section]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const newCert = { name: file.name.replace(/\.[^/.]+$/, ""), image: base64String };
      const updatedCerts = [...certs, newCert];
      setCerts(updatedCerts);
      const updatedProfile = { ...profile, [section]: updatedCerts };
      localStorage.setItem("user", JSON.stringify(updatedProfile));
      handleAddItem(section, newCert);
    };
    reader.readAsDataURL(file);
  };

  const handleEditName = (index, newName) => {
    const updatedCerts = [...certs];
    updatedCerts[index].name = newName;
    setCerts(updatedCerts);
    const updatedProfile = { ...profile, [section]: updatedCerts };
    localStorage.setItem("user", JSON.stringify(updatedProfile));
  };

  const handleRemove = (index) => {
    const updatedCerts = certs.filter((_, i) => i !== index);
    setCerts(updatedCerts);
    const updatedProfile = { ...profile, [section]: updatedCerts };
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    handleRemoveItem(section, index);
  };

  return (
    <AnimatedCard title={title} darkMode={darkMode}>
      {editing && (
        <div className="flex justify-end mb-3">
          <label className="cursor-pointer text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
            <FaImage /> Upload Certificate
            <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {certs.map((cert, index) => (
          <div
            key={index}
            className={`relative group p-2 rounded-lg shadow-md transition ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
          >
            <div className="relative w-full h-40">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-40 object-cover rounded-md border border-gray-300 cursor-pointer"
                  onClick={() => setLightboxImage(cert.image)}
                />
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-200 text-gray-500 text-sm">
                  No image
                </div>
              )}
              {editing && (
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTrash size={12} />
                </button>
              )}
            </div>

            {editing ? (
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleEditName(index, e.target.value)}
                className={`w-full mt-2 p-1 text-center rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:outline-none`}
                placeholder="Certificate name"
              />
            ) : (
              <p className="text-center mt-2 text-sm font-medium truncate">{cert.name}</p>
            )}
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
