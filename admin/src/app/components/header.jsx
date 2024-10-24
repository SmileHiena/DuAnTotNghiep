import '../../../public/css/main.css';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTachometerAlt, faIdCard, faUser, faTags, faTasks, faTicketAlt, faCommentDots, faFilm, faCalendarCheck, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <>
            {/* Navbar */}
            <header className="app-header">
                {/* Sidebar toggle button */}
                <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
                {/* Navbar Right Menu */}
                <ul className="app-nav">
                    {/* User Menu */}
                    <li>
                        <Link className="app-nav__item" href="/index.html">
                            <FontAwesomeIcon icon={faCog} className="w-6 h-6" />
                        </Link>
                    </li>
                </ul>
            </header>
            {/* Sidebar menu */}
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">
                <Link  href="/">
                    <div className="app-sidebar__user mb-2">
                        <img className="app-sidebar__user-avatar mb-2" src="/images/user/hoai.jpg" alt="User Image" />
                        <div>
                            <p className="app-sidebar__user-name"><b>ScreenTime</b></p>
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
                        <Link className="app-menu__item" href="/">
                            <FontAwesomeIcon icon={faTachometerAlt} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Bảng điều khiển</span>
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
                            <FontAwesomeIcon icon={faChartPie} className="app-menu__icon w-6 h-6" />
                            <span className="app-menu__label">Báo cáo doanh thu</span>
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
