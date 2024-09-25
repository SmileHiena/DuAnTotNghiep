import 'bootstrap/dist/css/bootstrap.min.css';

// src/app/page.js
export default async function Home() {
  // Giả sử dữ liệu được lấy từ JSON tĩnh
  const res = await fetch('https://phimapi.com/v1/api/danh-sach/phim-le');
  const jsonData = await res.json();
  const movies = jsonData.data.items; // Mảng chứa danh sách phim lẻ

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center">Danh sách phim lẻ</h1>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <img
                src={`https://phimimg.com/${movie.poster_url}`}
                className="card-img-top"
                alt={movie.name}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">
                  <strong>Thời lượng:</strong> {movie.time} <br />
                  <strong>Chất lượng:</strong> {movie.quality} <br />
                  <strong>Năm sản xuất:</strong> {movie.year} <br />
                  <strong>Thể loại:</strong>{" "}
                  {movie.category.map((cat) => cat.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    </>
  );
}
