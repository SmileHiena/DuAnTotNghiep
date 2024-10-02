import '../../../public/styles/header.css';
import Link from 'next/link';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-name">
          <h3>
            <img
              src="/image/logo.png"
              alt="Logo"
              className="logo-img"
            />
          </h3>
        </div>
        <nav className="menu">
          <ul>
            <li><Link href="/">Trang Chủ</Link></li>
            <li><Link href="/page/about">Giới Thiệu</Link></li>
            <li><a href="#services">Dịch Vụ</a></li>
            <li><a href="#contact">Liên Hệ</a></li>
          </ul>
        </nav>
        <div className="change-language">
          <img src="/image/logovn.png" alt="Ngôn ngữ" className="language-img" />
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
