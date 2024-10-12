import Link from 'next/link';
import '../../../public/styles/header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo">
          <h3>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="logo-img"
            />
          </h3>
        </div>

        {/* Menu */}
        <nav className="menu">
          <ul className="menu-list">
            <li>
              <Link 
                href="/" 
                className="menu-link"
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link 
                href="/page/about" 
                className="menu-link"
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="menu-link"
              >
                Xem vé
              </Link>
            </li>
            <li>
              <a 
                href="#services" 
                className="menu-link"
              >
                Dịch Vụ
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="menu-link"
              >
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Change Language */}
        <div className="language">
          <img
            src="/images/logovn.png"
            alt="Ngôn ngữ"
            className="language-img"
          />
        </div>

        {/* Search Area */}
        <div className="search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
            />
          </div>
        </div>

        {/* Login Button */}
        <div className="login">
          <Link href="/page/login">
            <button className="login-button">
              Đăng Nhập
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
