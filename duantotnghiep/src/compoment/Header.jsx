import './Haeder.css'
function Header() {
  return (
      <header className="header">
        <div className="container">
        <div className=" logo-name">
         <h3> Ticker Man</h3>
        </div>
        <nav className=" ryuga menu">
          <ul>
            <li><a href="#home">Trang Chủ</a></li>
            <li><a href="#about">Giới Thiệu</a></li>
            <li><a href="#services">Dịch Vụ</a></li>
            <li><a href="#contact">Liên Hệ</a></li>
          </ul>
        </nav>
        <div className=" ryuga change-language">
            <img src="./../../public/img/logovn.png" alt="" />
        </div>
        <div className="ryuga search-area">
    <div className="input-container">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Tìm kiếm..." />
    </div>
</div>

        <button className=" ryuga login-button">Đăng Nhập</button>
         </div>
      </header>
     
  );
}

export default Header;
