import 'bootstrap/dist/css/bootstrap.min.css';
import "../globals.css";

const Event = () => {
  // Danh sách các URL hình ảnh
  const images = [
    "https://via.placeholder.com/440x210?text=Image+1",
    "https://via.placeholder.com/440x210?text=Image+2",
    "https://via.placeholder.com/440x210?text=Image+3",
    "https://via.placeholder.com/440x210?text=Image+4",
    "https://via.placeholder.com/440x210?text=Image+5",
    "https://via.placeholder.com/440x210?text=Image+6",
    "https://via.placeholder.com/440x210?text=Image+7",
    "https://via.placeholder.com/440x210?text=Image+8",
    "https://via.placeholder.com/440x210?text=Image+9",
    "https://via.placeholder.com/440x210?text=Image+10",
    "https://via.placeholder.com/440x210?text=Image+11",
    "https://via.placeholder.com/440x210?text=Image+12",
  ];

  return (
    <div className='event'>
      <h1 className='text-center text-uppercase text-white'>Khuyến mãi</h1>
      <div className="container mt-4">
        <div className="row">
          {/* Hiển thị tất cả hình ảnh mà không cần đếm số lượng */}
          {images.map((src) => (
            <div className="col-md-4 col-12 mb-3" key={src}>
              <div className="card">
                <img
                  src={src}
                  className="card-img-top"
                  alt="Image"
                  style={{ width: '440px', height: '210px' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
