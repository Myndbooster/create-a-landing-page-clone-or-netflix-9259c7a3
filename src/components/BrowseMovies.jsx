import React from 'react';
import { Link } from 'react-router-dom';

const BrowseMovies = () => {
  // Mock movies
  const movies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Browse Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className="mb-2">
            <Link to={`/movie/${movie.id}`} className="hover:underline">{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseMovies;