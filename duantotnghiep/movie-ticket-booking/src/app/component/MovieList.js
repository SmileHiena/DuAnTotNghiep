//# Danh sách phim

// components/MovieList.js
import Link from 'next/link';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <Link href={`/movies/${movie.id}`}>
            <a>Chi tiết</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
