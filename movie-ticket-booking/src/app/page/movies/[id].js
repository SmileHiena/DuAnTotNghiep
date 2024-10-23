// app/page/Details.jsx
"use client"; // Mark as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SeatSelection from '../../components/SeatSelection';

const MovieDetails = () => {
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const id = router.query.id; // Get movie ID from router
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };

    if (router.query.id) {
      fetchMovie();
    }
  }, [router.query.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <SeatSelection seats={movie.seats} />
    </div>
  );
};

export default MovieDetails;