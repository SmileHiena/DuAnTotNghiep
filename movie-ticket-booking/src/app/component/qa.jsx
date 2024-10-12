import '@fortawesome/fontawesome-free/css/all.min.css';

const QA = () => {
    return (
        <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', padding: '40px' }}>
            <div className=" mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-start"> {/* Căn giữa và căn lề trên */}
                    <div className="mb-8 md:mb-0 text-center md:text-left"> {/* Căn giữa cho màn hình nhỏ, căn trái cho màn hình lớn */}
                        <h1 className="text-4xl font-bold text-[#F5CF49]">Bạn hỏi, chúng tôi trả lời</h1>
                        <p className="mt-4 text-gray-300">
                            Không tìm thấy câu hỏi của bạn. Vui lòng xem thêm 
                            <a href="#" className="underline text-[#F5CF49]"> tại đây</a>
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 md:ml-8"> {/* Thêm khoảng cách bên trái cho hàng thứ hai */}
                        <ul className="space-y-4">
                            <li className="border-b border-gray-600 py-2 flex justify-between items-center text-white" style={{ fontSize: '18px' }}>
                                <span>Có thể mua vé xem phim những rạp nào trên ScreenTime</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-2 flex justify-between items-center text-white" style={{ fontSize: '18px' }}>
                                <span>Lợi ích của việc mua vé xem phim trên ScreenTime?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-2 flex justify-between items-center text-white" style={{ fontSize: '18px' }}>
                                <span>Có thể mua vé xem phim kèm bắp nước hay không?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-2 flex justify-between items-center text-white" style={{ fontSize: '18px' }}>
                                <span>Mua vé xem phim tại ScreenTime có đắt hơn mua trực tiếp tại rạp không?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-2 flex justify-between items-center text-white" style={{ fontSize: '18px' }}>
                                <span>Vé xem phim có được đổi trả, hoàn hủy không?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QA;
