'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HoaDon = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCancelledTickets, setTotalCancelledTickets] = useState(0);
    const [monthFilter, setMonthFilter] = useState("");
    const [datasets, setDatasets] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/hoadon/');
                setData(response.data);
                setFilteredData(response.data);
                calculateTotals(response.data);
                prepareChartData(response.data); // Prepare chart data after fetching
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            }
        };
        fetchData();
    }, []);

    const calculateTotals = (filteredData) => {
        // Lọc ra các vé chưa bị hủy (trạng thái khác 'Đã Hủy')
        const validData = filteredData.filter(item => item.TrangThai !== 'Đã Hủy');

        // Tính tổng số vé bán ra (bao gồm cả vé đã hủy)
        const tickets = filteredData.length;  // Thay đổi ở đây: tính tất cả vé

        // Tính tổng doanh thu (chỉ tính vé chưa hủy)
        const revenue = validData.reduce((acc, item) => acc + (item.TongTien || item.GiaVe), 0);

        // Tính số vé đã hủy
        const cancelledTickets = filteredData.filter(item => item.TrangThai === 'Đã Hủy').length;

        setTotalTickets(tickets);
        setTotalRevenue(revenue);
        setTotalCancelledTickets(cancelledTickets); // Cập nhật số vé đã hủy
    };


    const handleMonthFilter = (event) => {
        
        const selectedMonth = event.target.value;
        setMonthFilter(selectedMonth);

        let filtered = data; // Mặc định không lọc

        if (selectedMonth) {
            filtered = data.filter(item => new Date(item.NgayMua || item.NgaySuatChieu).getMonth() + 1 === parseInt(selectedMonth));
        }

        setFilteredData(filtered);
        calculateTotals(filtered); // Tính toán lại tổng sau khi lọc
        prepareChartData(filtered); // Cập nhật dữ liệu biểu đồ
    };


    const prepareChartData = (data) => {
        // Tạo một mảng các tháng từ 1 đến 12
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        // Tạo một mảng tháng và tổng doanh thu cho mỗi tháng, chỉ tính vé chưa hủy
        const monthRevenue = allMonths.map(month => {
            const filteredDataForMonth = data.filter(item => {
                // Lọc dữ liệu cho mỗi tháng (tháng từ 1 đến 12) và vé chưa hủy
                const itemMonth = new Date(item.NgayMua || item.NgaySuatChieu).getMonth() + 1;
                return itemMonth === month && item.TrangThai !== 'Đã Hủy'; // Kiểm tra vé chưa hủy
            });

            // Tính tổng doanh thu cho tháng này (chỉ tính vé chưa hủy)
            const totalRevenueForMonth = filteredDataForMonth.reduce((acc, item) => acc + (item.TongTien || item.GiaVe), 0);

            return totalRevenueForMonth;
        });

        // Tạo mảng tên tháng để hiển thị trong biểu đồ
        const monthLabels = allMonths.map(month => `Tháng ${month}`);

        // Dữ liệu cho biểu đồ
        const chartData = {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Doanh thu theo tháng',
                    data: monthRevenue,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                },
            ],
        };

        setDatasets(chartData);
    };



    return (
        <>
            <Head>
                <title>Thống kê doanh thu</title>
            </Head>
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb side">
                    <li className="breadcrumb-item active">
                        <a href="#"><b>Thống kê doanh thu</b></a>
                    </li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <div className="font-semibold">Lọc </div>
                                    <select
                                        value={monthFilter}
                                        onChange={handleMonthFilter}
                                        className="form-select block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150"
                                    >
                                        <option value="">Lọc theo tháng</option>
                                        {[...Array(12).keys()].map(month => (
                                            <option key={month + 1} value={month + 1}>{`Tháng ${month + 1}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4 flex space-x-4">
                                <div className="bg-blue-100 text-blue-600 font-semibold py-3 px-6 rounded-md shadow-sm text-center flex flex-col items-center">
                                    <p><strong>Tổng số vé đã bán:</strong></p>
                                    <p className="text-2xl font-bold">{totalTickets}</p>
                                </div>
                                <div className="bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-md shadow-sm text-center flex flex-col items-center">
                                    <p><strong>Số vé đã hủy:</strong></p>
                                    <p className="text-2xl font-bold">{totalCancelledTickets}</p>
                                </div>
                                <div className="bg-green-100 text-green-600 font-semibold py-3 px-6 rounded-md shadow-sm text-center flex flex-col items-center">
                                    <p><strong>Tổng số tiền đã nhận:</strong></p>
                                    <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} VND</p>
                                </div>
                            </div>

                            <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th with="50">STT</th>
                                        <th>Ngày Mua/Suất Chiếu</th>
                                        <th>Tên Phim</th>
                                        <th>Ghế Ngồi</th>
                                        <th>Phòng Chiếu</th>
                                        <th>Giá Vé</th>
                                        <th>Combo</th>
                                        <th>Trạng thái</th>
                                        <th>Tổng Tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.NgayMua || item.NgaySuatChieu}</td>
                                                <td>{item.TenPhim || 'N/A'}</td>
                                                <td>{item.GheNgoi || item.SoGhe}</td>
                                                <td>{item.TenPhong || item.PhongChieu}</td>
                                                <td>{(item.GiaVe || 0).toLocaleString()} VND</td>
                                                <td>{item.Combo || 'Không'}</td>
                                                <td>{item.TrangThai || 'Không'}</td>
                                                <td>{(item.TongTien || 0).toLocaleString()} VND</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9">Không có hóa đơn nào được tìm thấy</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {datasets && (
                                <div className="mb-4">
                                    <h3 className="text-center font-semibold text-lg">Biểu đồ doanh thu theo tháng</h3>
                                    <Line data={datasets} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </>
    );
};

export default HoaDon;
