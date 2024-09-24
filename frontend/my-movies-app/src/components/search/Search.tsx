import React, { useState } from 'react';
import './Search.css'; // Import the CSS file

interface SearchProps {
  onSearch: (query: string, filters: { id?: string; name?: string; year?: string; actor?: string }) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    year: '',
    actor: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <div className={`filter-container ${isExpanded ? 'expanded' : ''}`}>
        {Object.entries(filters).map(([key, value]) => (
          <input
            key={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            className="filter-input"
          />
        ))}
      </div>
    </div>
  );
};

export default Search;