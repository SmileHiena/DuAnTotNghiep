'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Dropdown cho "Pages"
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false); // Dropdown cho menu di động
  const menuRef = useRef(null); // Tham chiếu đến menu di động

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSubMenu = () => setIsSubMenuOpen((prev) => !prev);
  const toggleMobileSubMenu = () => setIsMobileSubMenuOpen((prev) => !prev);

  // Đóng menu khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMobileSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  return (
    <header className="bg-black relative z-10">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center h-[100px]">
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="w-[200px] h-[100px]" />
          </Link>
        </div>

        {/* Menu Toggle Button (Hiển thị trên màn hình nhỏ hơn 1200px) */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className="fas fa-bars text-xl"></i> {/* Biểu tượng nút toggle menu */}
          </button>
        </div>

        {/* Menu chính (Ẩn khi màn hình nhỏ hơn 1200px) */}
        <nav className="ml-8 w-full xl:w-auto hidden xl:block">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center justify-center">
            <li>
              <Link href="/" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Trang Chủ
              </Link>
            </li>

            {/* Dropdown cho "Pages" */}
            <li className="relative">
              <button onClick={toggleSubMenu} className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Pages
              </button>
              {isSubMenuOpen && (
                <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-20">
                  {['Liên hệ', 'Danh sách phim', 'Phim đang chiếu', 'Phim sắp chiếu'].map((page, index) => (
                    <li key={index}>
                      <Link href={`/page/${page.toLowerCase().replace(/\s+/g, '')}`} className="block px-4 py-2 text-black hover:bg-gray-200">
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {['Giới thiệu', 'Lịch chiếu', 'Sự kiện', 'Liên hệ'].map((item, index) => (
              <li key={index}>
                <Link href={`/page/${item.toLowerCase().replace(/\s+/g, '')}`} className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Area */}
        <div className="ml-8 relative hidden lg:block">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 w-full max-w-lg lg:max-w-md md:max-w-sm" style={{ height: '30px' }}>
            <i className="fas fa-search text-white" style={{ fontSize: '14px', marginRight: '10px' }}></i>
            <input type="text" placeholder="Tìm kiếm..." className="bg-transparent outline-none text-white w-full h-full text-left" style={{ fontSize: '16px', paddingLeft: '2px' }} />
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
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[200px] bg-white z-50 xl:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link href="/" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Trang Chủ
                </Link>
              </li>

              {/* Dropdown cho "Pages" trong menu di động */}
              <li className="relative">
                <button onClick={toggleMobileSubMenu} className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Pages
                </button>
                {isMobileSubMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-50" ref={menuRef}>
                    {['Liên hệ', 'Danh sách phim', 'Phim đang chiếu', 'Phim sắp chiếu'].map((page, index) => (
                      <li key={index}>
                        <Link href={`/page/${page.toLowerCase().replace(/\s+/g, '')}`} className="block px-4 py-2 text-black hover:bg-gray-200">
                          {page}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {['Giới thiệu', 'Xem vé', 'Sự kiện', 'Liên hệ'].map((item, index) => (
                <li key={index}>
                  <Link href={`/page/${item.toLowerCase().replace(/\s+/g, '')}`} className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
