import React from 'react';

function FilterBar({ onRegionChange, onLanguageChange, regions, languages }) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center my-4">
      <select
        className="p-2 border rounded shadow-sm"
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded shadow-sm"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Filter by Language</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
