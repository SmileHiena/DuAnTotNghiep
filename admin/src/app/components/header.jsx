// src/app/components/Header.tsx
import '../../../public/css/main.css';
import Link from "next/link";

const Header = () => {
    return (
        <>
            {/* Navbar */}
            <header className="bg-[#212529] p-3 flex justify-between items-center">
                {/* Sidebar toggle button */}
                <Link href="#" className="text-white" aria-label="Hide Sidebar">
                    <span className="sr-only">Toggle sidebar</span>
                    <i className="bx bx-menu"></i> {/* Icon for the toggle button (optional) */}
                </Link>
                {/* Navbar Right Menu */}
                <ul className="flex space-x-4">
                    {/* User Menu */}
                    <li>
                        <Link className="text-white" href="/index.html">
                            <i className='bx bx-log-out bx-rotate-180'></i>
                        </Link>
                    </li>
                </ul>
            </header>

            {/* Sidebar menu */}
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="bg-[#212529] w-[250px] h-full">
                <div className="app-sidebar__user flex items-center p-4">
                    <img className="app-sidebar__user-avatar rounded-full" src="/images/hay.jpg" height="50" width="50" alt="User Image" />
                    <div className="ml-2">
                        <p className="app-sidebar__user-name text-white font-bold">Võ Trường</p>
                        <p className="app-sidebar__user-designation text-gray-400">Chào mừng bạn trở lại</p>
                    </div>
                </div>
                <hr className="border-gray-600" />
                <ul className="app-menu space-y-2">
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-black bg-[#F5CF49] hover:bg-[#C6DEFD] hover:text-[#161648] transition rounded-lg h-[55px] w-[220px] p-2" href="phan-mem-ban-hang.html">
                            <i className='app-menu__icon bx bx-cart-alt'></i>
                            <span className="app-menu__label font-semibold  ml-2">POS Bán Hàng</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="index.html">
                            <i className='app-menu__icon bx bx-tachometer'></i>
                            <span className="app-menu__label font-semibold  ml-2">Bảng điều khiển</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="table-data-table.html">
                            <i className='app-menu__icon bx bx-id-card'></i>
                            <span className="app-menu__label font-semibold  ml-2">Quản lý nhân viên</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="#">
                            <i className='app-menu__icon bx bx-user-voice'></i>
                            <span className="app-menu__label font-semibold  ml-2">Quản lý khách hàng</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="table-data-product.html">
                            <i className='app-menu__icon bx bx-purchase-tag-alt'></i>
                            <span className="app-menu__label font-semibold  ml-2">Quản lý sản phẩm</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="table-data-oder.html">
                            <i className='app-menu__icon bx bx-task'></i>
                            <span className="app-menu__label font-semibold  ml-2">Quản lý đơn hàng</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="table-data-banned.html">
                            <i className='app-menu__icon bx bx-run'></i>
                            <span className="app-menu__label font-semibold  ml-2">Quản lý nội bộ</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="table-data-money.html">
                            <i className='app-menu__icon bx bx-dollar'></i>
                            <span className="app-menu__label font-semibold  ml-2">Bảng kê lương</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="quan-ly-bao-cao.html">
                            <i className='app-menu__icon bx bx-pie-chart-alt-2'></i>
                            <span className="app-menu__label font-semibold  ml-2">Báo cáo doanh thu</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="page-calendar.html">
                            <i className='app-menu__icon bx bx-calendar-check'></i>
                            <span className="app-menu__label font-semibold  ml-2">Lịch công tác</span>
                        </Link>
                    </li>
                    <li className=" w-[230px] flex justify-center">
                        <Link className="flex items-center text-white hover:bg-[#C6DEFD] transition rounded-lg h-[55px] w-[220px] p-2" href="#">
                            <i className='app-menu__icon bx bx-cog'></i>
                            <span className="app-menu__label font-semibold  ml-2">Cài đặt hệ thống</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="app-content">

<h1>Chèo mừng với nhân lên</h1>
</main>
        </>
    );
};

export default Header;
