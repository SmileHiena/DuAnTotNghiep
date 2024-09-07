// pages/movies/[id].js
import { useRouter } from 'next/router';
import SeatSelection from '../../components/SeatSelection';

export default function MovieDetails({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <SeatSelection seats={movie.seats} />
    </div>
  );
}

// Fetch chi tiết phim theo ID
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/movies/${id}`);
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}
