import React from "react";
import { Search, Filter } from "lucide-react";

const SearchBar = ({
  placeholder,
  onSearch,
  categories = [],
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="my-6 w-full max-w-4xl mx-auto flex items-center bg-white rounded-full px-6 py-2 gap-4">
      <Search className="text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-grow outline-none text-black"
      />
      <div className="flex items-center gap-2">
        <Filter className="text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-transparent text-black outline-none"
        >
          <option value="">All</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SearchBar;
=======
export default SearchBar;
>>>>>>> master
