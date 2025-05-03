import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
