import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../public/styles/events.css";


const Event = () => {
  const Sukien = [
    {
      "id": 1,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 2,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 3,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 4,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 5,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 6,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 7,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 8,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 9,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 10,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 11,
      "Anh": "/images/phim/cam.jpg",
    },
    {
      "id": 12,
      "Anh": "/images/phim/cam.jpg",
    }
  ];

  return (
    <section className='event-section'>
      <div className='event'>
        <h1 className='text-center text-uppercase'>Khuyến mãi</h1>
        <div className="container mt-4">
          <div className="row">
              {/* tôi muốn có mũi tên qua lại ở đây */}
            {Sukien.slice(0, 6).map(item => ( // Lấy 6 ảnh đầu tiên
              <div className="col-md-4 col-6 mb-3" key={item.id}>
                <div className="card">
                  <img
                    src={item.Anh} // Sử dụng đường dẫn từ mảng
                    className="card-img-top"
                    alt={`Image ${item.id}`}
                  />
                </div>
              </div>
            ))}
              {/* tôi muốn có mũi tên qua lại ở đây */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
