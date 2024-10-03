import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../public/styles/events.css";


const Event = () => {
  const Sukien = [
    {
      "id": 1,
      "Anh": "/images/image.png",
    },
    {
      "id": 2,
      "Anh": "/images/image.png",
    },
    {
      "id": 3,
      "Anh": "/images/image.png",
    },
    {
      "id": 4,
      "Anh": "/images/image.png",
    },
    {
      "id": 5,
      "Anh": "/images/image.png",
    },
    {
      "id": 6,
      "Anh": "/images/image.png",
    },
    {
      "id": 7,
      "Anh": "/images/image.png",
    },
    {
      "id": 8,
      "Anh": "/images/image.png",
    },
    {
      "id": 9,
      "Anh": "/images/image.png",
    },
    {
      "id": 10,
      "Anh": "/images/image.png",
    },
    {
      "id": 11,
      "Anh": "/images/image.png",
    },
    {
      "id": 12,
      "Anh": "/images/image.png",
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
                    alt={`Image ${item.id}`} style={{width: '440px', height: '200px' }}
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