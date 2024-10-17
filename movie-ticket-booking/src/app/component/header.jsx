'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchFullName = async (userId) => {
      try {
          const response = await fetch(`http://localhost:3000/users/${userId}/fullname`);
          if (!response.ok) {
              throw new Error('Failed to fetch user fullname');
          }
          const data = await response.json();
          return data.fullname; // Trả về tên người dùng
      } catch (error) {
          console.error(error);
      }
  };
  


  fetchFullName();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  const toggleMobileSubMenu = () => {
    setIsMobileSubMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMobileSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="bg-black relative z-10">
      <div className="max-w-[1410px] mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center h-[100px] mx-auto">
          <Link href="/">
            <h3>
              <img src="/images/logo.png" alt="Logo" className="w-[200px] h-[100px]" />
            </h3>
          </Link>
        </div>

        {/* Menu Toggle Button */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className={`fas fa-bars text-xl`}></i>
          </button>
        </div>

        {/* Menu chính */}
        <nav className="ml-8 w-full xl:w-auto hidden xl:block">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center justify-center" style={{ marginBottom: '0px' }}>
            <li>
              <Link href="/" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Trang Chủ
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleSubMenu}
                className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300"
              >
                Pages
              </button>
              {isSubMenuOpen && (
                <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-20">
                  <li>
                    <Link href="/page/lienhe" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/danhsachphim" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Danh sách phim
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/dangchieu" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Phim đang chiếu
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/sapchieu" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Phim sắp chiếu
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            <li>
              <Link href="/page/about" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Giới thiệu
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
              <Link href="/page/lienhe" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">
                Liên hệ
              </Link>
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

        {/* Tên người dùng hoặc nút đăng nhập */}
        <div className="ml-8">
          {username ? (
            <span className="text-white">{username}</span> // Hiển thị tên người dùng
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[200px] bg-white z-50 xl:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link href="/" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Trang Chủ
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleMobileSubMenu}
                  className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300"
                >
                  Pages
                </button>
                {isMobileSubMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-50" ref={menuRef}>
                    <li>
                      <Link href="/page/lienhe" className="block px-4 py-2 text-black hover:bg-gray-200">
                        Liên hệ
                      </Link>
                    </li>
                    <li>
                      <Link href="/page/danhsachphim" className="block px-4 py-2 text-black hover:bg-gray-200">
                        Danh sách phim
                      </Link>
                    </li>
                    <li>
                      <Link href="/page/dangchieu" className="block px-4 py-2 text-black hover:bg-gray-200">
                        Phim đang chiếu
                      </Link>
                    </li>
                    <li>
                      <Link href="/page/sapchieu" className="block px-4 py-2 text-black hover:bg-gray-200">
                        Phim sắp chiếu
                      </Link>
                    </li>
                  </ul>
                )}
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
                  Sự kiện
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link href="/page/lienhe" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;