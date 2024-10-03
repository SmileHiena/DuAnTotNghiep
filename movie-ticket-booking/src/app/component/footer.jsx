import '../../../public/styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-butoom">
          {/* <h3 className="logo-footer">Ticker Man</h3> */}
          <img className="footer-img" src="images/logo.jpg" alt="" />
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className="footer-column">
          <h4>Xem Phim</h4>
          <ul>
            <li>Phim Đang Chiếu</li>
            <li>Phim Sắp Chiếu</li>
            <li>Suất Chiếu Đặc Biệt</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Ticker Man</h4>
          <ul>
            <li>Giới Thiệu</li>
            <li>Liên Hệ</li>
            <li>Tuyển Dụng</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Thuê Sự Kiện</h4>
          <ul>
            <li>Thuê Rạp</li>
            <li>Các Hoạt Động Thuê Khác</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Tickerman. All rights reserved.</p>
        <ul className="footer-links">
          <li>Chính Sách Bảo Mật</li>
          <li>Tin Điện Ảnh</li>
          <li>Hỏi và Đáp</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;