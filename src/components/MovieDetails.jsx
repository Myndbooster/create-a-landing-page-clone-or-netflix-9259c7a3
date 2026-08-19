import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movies/${id}`);
      const data = await response.json();
      setDetails(data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{details.title}</h2>
      <p>{details.description}</p>
      {/* Add more movie details here */}
    </div>
  );
};

export default MovieDetails;
