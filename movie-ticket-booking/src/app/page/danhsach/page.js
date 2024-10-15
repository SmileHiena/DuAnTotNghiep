
import MovieList from "../../component/MovieList";

const DanhSachPhim = () => {
  return <MovieList apiUrl="http://localhost:3000/sapchieu" title="Danh Sách Phim" />;
};

export default DanhSachPhim;