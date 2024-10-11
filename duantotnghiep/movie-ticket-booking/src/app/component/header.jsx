import Link from 'next/link';

function Header() {
  return (
    <header className="bg-black w-[1920px]">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center h-[100px]">
          <h3>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-[100px] h-[100px]"
            />
          </h3>
        </div>

        {/* Menu */}
        <nav className="ml-8">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
              >
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link 
                href="/page/about" 
                className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
              >
                Xem vé
              </Link>
            </li>
            <li>
              <a 
                href="#services" 
                className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
              >
                Dịch Vụ
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
              >
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Change Language */}
        <div className="ml-8">
          <img
            src="/images/logovn.png"
            alt="Ngôn ngữ"
            className="w-[41px] h-[30px]"
          />
        </div>

        {/* Search Area kích thước 376x40 */}
        <div className="ml-8 relative">
          <div className="flex items-center border border-gray-400 rounded-lg" style={{ width: '376px', height: '40px' }}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none text-white text-center w-full h-full" // Đảm bảo chữ căn giữa
            />
          </div>
        </div>

        {/* Login Button */}
        <div className="ml-8">
          <Link href="/page/login">
            <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[117px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] hover:font-bold transition uppercase text-[16px]">
              Đăng Nhập
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
