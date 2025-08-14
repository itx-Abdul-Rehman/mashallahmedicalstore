import React, { useState } from "react";
import { Search } from "lucide-react"; 


export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    // if (onSearch) onSearch(e.target.value);
  };

  return (
    <div id="home" className="flex justify-center mt-6">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search medicines..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
                     transition-all duration-300 hover:shadow-lg"
        />
      </div>
    </div>
  );
}
