'use client'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSignOutAlt, faIdCard, faUser, faTags, faTasks, faTicketAlt, faCommentDots, faFilm, faCalendarCheck, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter hook

const Header = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();  // Initialize router

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];

        // Nếu không có token, điều hướng về trang login
        if (!tokenValue) {
            router.push('http://localhost:3001/page/login');
        } else {
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
        }
    }, [router]);

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        setIsLoggedIn(false);
        router.push('http://localhost:3001/page/login');  // Redirect to homepage after logout
    };

    return (
        <>
            {/* Navbar */}
            <header className="app-header">
                {/* Sidebar toggle button */}
                <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
                {/* Navbar Right Menu */}
                <ul className="app-nav">
                    {/* User Menu */}
                    <li>{/* nơi chứa  nút đăng xuất */}
                        <button onClick={handleLogout} className="app-nav__item">
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
                        </button>
                    </li>
                </ul>
            </header>
            {/* Sidebar menu */}
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">
                {/* nơi hiện ảnh, tên admin */}
                <Link href="/">
                    <div className="app-sidebar__user mb-2">
                        <img className="app-sidebar__user-avatar mb-2" src={`http://localhost:3000/${user?.Anh}`} alt="User Image" />
                        <div>
                            <p className="app-sidebar__user-name"><b>{user?.HoTen || "Admin"}</b></p>
                            <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
                        </div>
                    </div>
                </Link>
                <hr />
                <ul className="app-menu">
                    <li>
                        <Link className="app-menu__item" href="/">
                            <FontAwesomeIcon icon={faCartShopping} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">POS Bán Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/thongkedoanhthu">
                            <FontAwesomeIcon icon={faChartPie} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Báo cáo doanh thu</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/suatchieu">
                            <FontAwesomeIcon icon={faFilm} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý suất chiếu</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/nhanvien">
                            <FontAwesomeIcon icon={faIdCard} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý nhân viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/khachhang">
                            <FontAwesomeIcon icon={faUser} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/sanpham">
                            <FontAwesomeIcon icon={faTags} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý phim</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/theloai">
                            <FontAwesomeIcon icon={faTasks} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý thể loại</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/ve">
                            <FontAwesomeIcon icon={faTicketAlt} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý vé</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/combo">
                            <FontAwesomeIcon icon={faTasks} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý Combo</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/binhluan">
                            <FontAwesomeIcon icon={faCommentDots} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý bình luận</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/rap">
                            <FontAwesomeIcon icon={faFilm} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lý rạp</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/khuyenmai">
                            <FontAwesomeIcon icon={faCalendarCheck} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lí khuyến mãi</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/blog">
                            <FontAwesomeIcon icon={faChartPie} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Quản lí Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="#">
                            <FontAwesomeIcon icon={faCog} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Cài đặt hệ thống</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Header;
