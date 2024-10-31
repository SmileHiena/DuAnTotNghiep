import Image from 'next/image';
import Link from 'next/link';
import '../../../public/css/main.css'; // Đường dẫn đến file CSS của bạn


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
                            <i className='bx bx-log-out bx-rotate-180'></i>
                        </Link>
                    </li>
                </ul>
            </header>
            {/* Sidebar menu */}
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">
                <div className="app-sidebar__user">
                    <Image className="app-sidebar__user-avatar" src="/images/user/hoai.jpg" width={50} height={50} alt="User Image" />
                    <div>
                        <p className="app-sidebar__user-name"><b>ScreenTime</b></p>
                        <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
                    </div>
                </div>
                <hr />
                <ul className="app-menu">
                    <li>
                        <Link className="app-menu__item haha" href="/">
                            <i className='app-menu__icon bx bx-cart-alt'></i>
                            <span className="app-menu__label">POS Bán Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item active" href="/">
                            <i className='app-menu__icon bx bx-tachometer'></i>
                            <span className="app-menu__label">Bảng điều khiển</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/suatchieu">
                            <i className='app-menu__icon bx bx-id-card'></i>
                            <span className="app-menu__label">Quản lý suất chiếu</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/nhanvien">
                            <i className='app-menu__icon bx bx-id-card'></i>
                            <span className="app-menu__label">Quản lý nhân viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/khachhang">
                            <i className='app-menu__icon bx bx-user-voice'></i>
                            <span className="app-menu__label">Quản lý khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/sanpham">
                            <i className='app-menu__icon bx bx-purchase-tag-alt'></i>
                            <span className="app-menu__label">Quản lý sản phẩm</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/theloai">
                            <i className='app-menu__icon bx bx-task'></i>
                            <span className="app-menu__label">Quản lý thể loại</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/ve">
                            <i className='app-menu__icon bx bxs-coupon'></i>
                            <span className="app-menu__label">Quản lý vé</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/combo">
                            <i className='app-menu__icon bx bx-list-ul text-xl'></i>
                            <span className="app-menu__label">Quản lý Combo</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/binhluan">
                            <i className='app-menu__icon bx bx-comment-dots text-xl'></i>
                            <span className="app-menu__label">Quản lý bình luận</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/rap">
                            <i className='app-menu__icon bx bx-film text-xl'></i>
                            <span className="app-menu__label">Quản lý rạp</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/khuyenmai">
                            <i className='app-menu__icon bx bx-calendar-check text-xl'></i>
                            <span className="app-menu__label">Quản lí khuyến mãi</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page/blog">
                            <i className='app-menu__icon bx bx-chart text-xl'></i>
                            <span className="app-menu__label">Quản lí Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/table-data-banned.html">
                            <i className='app-menu__icon bx bx-run'></i>
                            <span className="app-menu__label">Quản lý nội bộ</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/table-data-money.html">
                            <i className='app-menu__icon bx bx-dollar'></i>
                            <span className="app-menu__label">Bảng kê lương</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/quan-ly-bao-cao.html">
                            <i className='app-menu__icon bx bx-pie-chart-alt-2'></i>
                            <span className="app-menu__label">Báo cáo doanh thu</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="/page-calendar.html">
                            <i className='app-menu__icon bx bx-calendar-check'></i>
                            <span className="app-menu__label">Lịch công tác</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" href="#">
                            <i className='app-menu__icon bx bx-cog'></i>
                            <span className="app-menu__label">Cài đặt hệ thống</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Header;
