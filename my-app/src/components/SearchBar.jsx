import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-grow ml-auto relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customGreen">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input
        type="text"
        className="py-2 pl-10 pr-4 block max-w-72 rounded-full bg-white border-customGreen focus:outline-customGreen"
        placeholder="Search users by email"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
