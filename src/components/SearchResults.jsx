import React, { useState } from 'react';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Search Results</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="input mb-4" />
      <button onClick={handleSearch} className="btn-primary">Search</button>
      <ul>
        {results.map(result => (
          <li key={result.id} className="mb-2">
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
