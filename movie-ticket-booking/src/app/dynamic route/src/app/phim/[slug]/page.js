
// src/app/phim/[slug]/page.js

export default async function MovieDetail({ params }) {
    const { slug } = params;
  
    // Fetch chi tiết phim từ API dựa trên slug
    const res = await fetch(`https://phimapi.com/phim/${khi-anh-chay-ve-phia-em}`);
    
    // Kiểm tra nếu có lỗi khi fetch
    if (!res.ok) {
      console.error('Lỗi khi fetch dữ liệu từ API');
      return <div>Không thể tải chi tiết phim</div>;
    }
  
    const movie = await res.json();
  
    return (
      <div className="container mt-5">
        <div className="row">
          {/* Hình ảnh phim */}
          <div className="col-md-4">
            <img src={movie.image} alt={movie.title} className="img-fluid" />
          </div>
          
          {/* Chi tiết phim */}
          <div className="col-md-8">
            <h1>{movie.title}</h1>
            <p><strong>Thể loại:</strong> {movie.genre}</p>
            <p><strong>Năm sản xuất:</strong> {movie.year}</p>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Mô tả:</strong> {movie.description}</p>
          </div>
        </div>
      </div>
    );
  }
  