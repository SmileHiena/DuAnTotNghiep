'use client';
import Link from 'next/link';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between flex-wrap">

        {/* Logo */}
        <div className="flex items-center h-[100px] mx-auto">
          <h3>
            <img src="/images/logo.png" alt="Logo" className="w-[200px] h-[100px]" />
          </h3>
        </div>

        {/* Menu Toggle Button (Hiển thị trên màn hình nhỏ hơn 1200px) */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className={`fas fa-bars text-xl`}></i> {/* Biểu tượng nút toggle menu */}
          </button>
        </div>

        {/* Menu chính (Ẩn khi màn hình nhỏ hơn 1200px) */}
        <nav className="ml-8 w-full xl:w-auto hidden xl:block">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center justify-center" style={{ marginBottom: '0px' }}>
            <li>
              <Link href="/" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link href="/page/danhsachphim" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Danh sách phim
              </Link>
            </li>
            <li>
              <Link href="/page/about" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Xem vé
              </Link>
            </li>
            <li>
              <a href="/page/event" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Sự kiện
              </a>
            </li>
            <li>
              <a href="#contact" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Search Area */}
        <div className="ml-8 relative hidden lg:block">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 w-full max-w-lg lg:max-w-md md:max-w-sm" style={{ height: '30px' }}>
            <i className="fas fa-search text-white" style={{ fontSize: '14px', marginRight: '10px' }}></i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none text-white w-full h-full text-left"
              style={{ fontSize: '16px', paddingLeft: '2px' }}
            />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <div className="ml-8 relative lg:hidden">
          <button className="text-white">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Login Button */}
        <div className="ml-8">
          <Link href="/page/login">
            <button className="hidden sm:inline-block border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[117px] h-[30px] rounded hover:bg-[#F5CF49] hover:text-[#000000] hover:font-bold transition uppercase text-[14px]">
              Đăng Nhập
            </button>
          </Link>

          <Link href="/page/login">
            <button className="sm:hidden">
              <i className="fas fa-user text-[#FFFFFF] text-2xl"></i> {/* Icon người dùng */}
            </button>
          </Link>
        </div>

        {/* Dropdown Menu (Xuất hiện khi nhấn Toggle Button) */}
        {isMenuOpen && (
          <div className="absolute top-[100px] left-0 w-full bg-white z-50 lg:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link href="/" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/page/about" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Xem vé
                </Link>
              </li>
              <li>
                <Link href="/page/event" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  sự kiện
                </Link>
              </li>
              <li>
                <a href="/page/lienhe" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
