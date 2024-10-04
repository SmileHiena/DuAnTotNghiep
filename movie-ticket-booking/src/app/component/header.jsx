import '../../../public/styles/header.css';
import Link from 'next/link';
// import danhSachPhim from './danhSachPhim';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-name">
          <h3>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="logo-img"
            />
          </h3>
        </div>
        <nav className="menu">
          <ul>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/page/DanhSachPhim">Danh Sách Phim</Link></li>
            <li><Link href="/page/admin">Giới thiệu</Link></li>
            <li><a href="#services">Dịch vụ</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>
        </nav>
        <div className="change-language">
          <img src="/images/logovn.png" alt="Ngôn ngữ" className="language-img" />
        </div>
        <div className="search-area">
          <div className="input-container">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
        </div>
        <button className="login-button">Đăng Nhập</button>
      </div>
    </header>
  );
}

export default Header;