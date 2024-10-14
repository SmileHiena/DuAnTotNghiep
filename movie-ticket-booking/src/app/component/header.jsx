'use client';
import Link from 'next/link';
import { useState } from 'react';

function Header() {
  // State để điều khiển hiển thị menu con trên di động
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm để toggle menu con
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between flex-wrap">

        {/* Logo */}
        <div className="flex items-center h-[100px] mx-auto">
          <h3>
            <img src="/images/logo.png" alt="Logo" className="w-[100px] h-[100px]" />
          </h3>
        </div>

        {/* Menu Toggle Button (Chuyển sang bên phải) */}
        <div className="md:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className={`fas fa-bars text-xl`}></i> {/* Chuyển đổi biểu tượng */}
          </button>
        </div>

        {/* Menu chính (Ẩn khi màn hình nhỏ hơn 1000px) */}
        <nav className="ml-8 w-full md:w-auto hidden md:block">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center justify-center" style={{ marginBottom: '0px' }}>
            <li>
              <Link href="/" className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link href="/page/about" className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                Xem vé
              </Link>
            </li>
            <li>
              <a href="#services" className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                Dịch Vụ
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Search Area */}
        <div className="ml-8 relative hidden md:block">
          <div className="flex items-center border border-gray-400 rounded-lg px-3" style={{ width: '376px', height: '40px' }}>
            {/* Icon Tìm kiếm */}
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
        <div className="ml-8 relative md:hidden">
          <button className="text-white">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Login Button */}
        <div className="ml-8">
          <Link href="/page/login">
            <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[117px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] hover:font-bold transition uppercase text-[16px]">
              Đăng Nhập
            </button>
          </Link>
        </div>

        {/* Dropdown Menu (Xuất hiện khi nhấn Toggle Button) */}
        {isMenuOpen && (
          <div className="absolute top-[100px] left-0 w-full bg-white z-50 md:hidden">
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
                <a href="#services" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Dịch Vụ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
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
