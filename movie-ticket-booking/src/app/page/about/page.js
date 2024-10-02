// about.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-4">Giới thiệu về ScreenTime</h1>
      
      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card">
            <img 
              src="https://via.placeholder.com/500x300" 
              className="card-img-top img-fluid" 
              alt="Phim ảnh"
            />
            <div className="card-body">
              <h5 className="card-title">Khám Phá Thế Giới Phim Ảnh</h5>
              <p className="card-text">
                Tại ScreenTime, chúng tôi mang đến cho bạn một trải nghiệm tuyệt vời về việc mua vé xem phim trực tuyến.
                Chúng tôi cung cấp hàng ngàn bộ phim với các thể loại phong phú, từ hành động, hài hước đến lãng mạn.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <img 
              src="https://via.placeholder.com/500x300" 
              className="card-img-top img-fluid" 
              alt="Mua vé trực tuyến"
            />
            <div className="card-body">
              <h5 className="card-title">Mua Vé Nhanh Chóng</h5>
              <p className="card-text">
                Bạn chỉ cần chọn bộ phim yêu thích, chọn suất chiếu và làm theo hướng dẫn để hoàn tất giao dịch. 
                Dễ dàng và nhanh chóng, chỉ trong vài cú nhấp chuột!
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>
      <p className="text-center">
        Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email: 
        <a href="mailto:support@screentime.com" className="text-primary"> support@screentime.com</a>
      </p>

      <h2 className="text-center mb-4">Câu hỏi thường gặp (FAQ)</h2>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Cách mua vé xem phim như thế nào?</strong>
          <p>Bạn chỉ cần chọn bộ phim, chọn suất chiếu và làm theo hướng dẫn để hoàn tất giao dịch.</p>
        </li>
        <li className="list-group-item">
          <strong>ScreenTime có cung cấp vé giảm giá không?</strong>
          <p>Có, chúng tôi thường xuyên có các chương trình khuyến mãi và giảm giá cho người dùng.</p>
        </li>
        <li className="list-group-item">
          <strong>Tôi có thể hủy vé đã mua không?</strong>
          <p>Các quy định về hủy vé phụ thuộc vào từng rạp chiếu phim, vui lòng kiểm tra kỹ trước khi mua.</p>
        </li>
      </ul>

      <div className="text-center mb-4">
        <p>Hãy cùng chúng tôi khám phá thế giới điện ảnh ngay hôm nay!</p>
      </div>
    </div>
  );
};

export default About;
