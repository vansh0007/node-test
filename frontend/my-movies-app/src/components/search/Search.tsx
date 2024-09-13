import React, { useState } from 'react';

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

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID"
        value={filters.id}
        onChange={(e) => setFilters({ ...filters, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={filters.year}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      />
      <input
        type="text"
        placeholder="Actor"
        value={filters.actor}
        onChange={(e) => setFilters({ ...filters, actor: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
