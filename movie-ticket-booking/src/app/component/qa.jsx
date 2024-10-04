import '../../../public/styles/qa.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const QA = () => {
    return (
        <section className="faq-section">
            <div className="mx-auto py-16 px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h1 className="text-4xl font-bold " style={{ color: "#F5CF49" }}>Bạn hỏi, chúng tôi trả lời</h1>
                        <p className="mt-4 text-gray-300">Không tìm thấy câu hỏi của bạn. Vui lòng xem thêm <a href="#" className=" underline" style={{ color: "#F5CF49" }}>tại đây</a></p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <ul className="space-y-4">
                            <li className="border-b border-gray-600 py-4 flex justify-between items-center">
                                <span>Có thể mua vé xem phim những rạp nào trên TickerMan</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-4 flex justify-between items-center">
                                <span>Lợi ích của việc mua vé xem phim trên TickerMan?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-4 flex justify-between items-center">
                                <span>Có thể mua vé xem phim kèm bắp nước hay không?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-4 flex justify-between items-center">
                                <span>Mua vé xem phim tại Tickerman có đắt hơn mua trực tiếp tại rạp không?</span>
                                <i className="fas fa-chevron-down"></i>
                            </li>
                            <li className="border-b border-gray-600 py-4 flex justify-between items-center">
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
