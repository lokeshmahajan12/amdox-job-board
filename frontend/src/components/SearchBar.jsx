import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white flex items-center rounded-full shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search for jobs, keywords..."
        className="flex-grow px-4 py-2 outline-none text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-600 p-3 text-white">
        <FaSearch />
      </button>
    </div>
  );
}
