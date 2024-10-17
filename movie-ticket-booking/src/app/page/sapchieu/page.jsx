import MovieList from "../../component/MovieList";

const SapChieu = () => {
  return <MovieList apiUrl="http://localhost:3000/movies?trangThai=dangchieu" title="Phim Sắp Chiếu" />;
};

export default SapChieu;