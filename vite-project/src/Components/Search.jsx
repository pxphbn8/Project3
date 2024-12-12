import React, { useState } from 'react';

function Search({ setSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Products..."
        aria-label="Search"
        value={query}
        onChange={handleSearch}
      />
      <button className="btn btn-outline-success" type="button">
        Search
      </button>
    </div>
  );
}

export default Search;
