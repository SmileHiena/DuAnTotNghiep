// Trang chủ

// pages/index.js
import MovieList from '../components/MovieList';
    
export default function Home({ movies }) {
    return (
    <div>
      <h1>Danh sách phim</h1>
      <MovieList movies={movies} />
      </div>
    );
  }
  
// Fetch danh sách phim
export async function getStaticProps() {
  const res = await fetch('https://phimapi.com/phim/khi-anh-chay-ve-phia-em');
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
}
  