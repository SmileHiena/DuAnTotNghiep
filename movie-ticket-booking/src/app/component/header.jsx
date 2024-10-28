'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      setIsLoggedIn(true);
      const getUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/users/detailuser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenValue}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
            setIsLoggedIn(false);
            alert('Vui lòng đăng nhập lại.');
          }
        } catch (error) {
          console.error('An error occurred while fetching user data:', error);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      };
      getUser();
    } else {
      setIsLoggedIn(false); // Cập nhật khi token không tồn tại
    }
  }, []);
  


  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(prev => !prev);
  };

  const toggleMobileSubMenu = () => {
    setIsMobileSubMenuOpen(prev => !prev);
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
        {/* Logo Section */}
        <div className="flex items-center h-[100px]">
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="w-[200px] h-[100px]" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleMenu} className="text-white">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="ml-8 w-full xl:w-auto hidden xl:block">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center justify-center">
            <li>
              <Link href="/" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Trang Chủ</Link>
            </li>
            <li className="relative">
              <button onClick={toggleSubMenu} className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Pages</button>
              {isSubMenuOpen && (
                <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-20">
                  <li><Link href="/page/lienhe" className="block no-underline py-2 text-black hover:bg-gray-200">Liên hệ</Link></li>
                  <li><Link href="/page/danhsach" className="block no-underline py-2 text-black hover:bg-gray-200">Danh sách phim</Link></li>
                  <li><Link href="/page/dangchieu" className="block no-underline py-2 text-black hover:bg-gray-200">Phim đang chiếu</Link></li>
                  <li><Link href="/page/sapchieu" className="block no-underline py-2 text-black hover:bg-gray-200">Phim sắp chiếu</Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/page/about" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Giới thiệu</Link>
            </li>
            <li>
              <Link href="/page/lichchieu" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Lịch chiếu</Link>
            </li>
            <li>
              <Link href="/page/sukien" className="text-[#FFFFFF] no-underline hover:text-[#F5CF49] transition-colors duration-300">Sự kiện</Link>
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

        {/* User Name or Login Button */}
        <div className="ml-8">
          {isLoggedIn ? (
            <div className='flex gap-4 items-center'>
              <div className='text-center'>
                <Link className='no-underline text-white uppercase' href="/page/profile">
                  <Image src={`http://localhost:3000/images/${user.Anh}`} className="rounded-full" width={50} height={50} style={{ width: '50px', height: '50px', border: 'none' }} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link href="/page/login">
                <button className="hidden sm:inline-block border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[117px] h-[30px] rounded hover:bg-[#F5CF49] hover:text-[#000000] hover:font-bold transition uppercase text-[14px]">
                  Đăng Nhập
                </button>
              </Link>
              <Link href="/page/login">
                <button className="sm:hidden">
                  <i className="fas fa-user text-[#FFFFFF] text-2xl"></i>
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[200px] bg-white z-50 xl:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link href="/" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Trang Chủ</Link>
              </li>
              <li className="relative">
                <button onClick={toggleMobileSubMenu} className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Pages</button>
                {isMobileSubMenuOpen && (
                  <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg w-[200px] z-50" ref={menuRef}>
                    <li><Link href="/page/lienhe" className="block px-4 py-2 text-black hover:bg-gray-200">Liên hệ</Link></li>
                    <li><Link href="/page/danhsachphim" className="block px-4 py-2 text-black hover:bg-gray-200">Danh sách phim</Link></li>
                    <li><Link href="/page/dangchieu" className="block px-4 py-2 text-black hover:bg-gray-200">Phim đang chiếu</Link></li>
                    <li><Link href="/page/sapchieu" className="block px-4 py-2 text-black hover:bg-gray-200">Phim sắp chiếu</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="/page/about" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Giới thiệu</Link></li>
              <li><Link href="#" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Xem vé</Link></li>
              <li><Link href="/page/event" className="text-black no-underline hover:text-[#F5CF49] hover:font-bold transition-colors duration-300">Sự kiện</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
