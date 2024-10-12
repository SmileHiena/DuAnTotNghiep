import React from 'react';

const Info = () => {
    return (
        <section
            className="bg-cover mb bg-center"
            style={{
                backgroundImage: 'url(/images/background.png)',
                backgroundSize: 'contain', // Dãn hình ảnh nền theo tỷ lệ mà không bị cắt
                backgroundRepeat: 'no-repeat', // Không lặp lại hình ảnh nền
                backgroundPosition: 'center', // Căn giữa hình ảnh nền
            }}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col md:flex-row w-full max-w-[1224px] bg-opacity-80 p-6 rounded-lg">
                    {/* Căn giữa, linh hoạt */}
                    <div className="w-full md:w-[276px] h-[450px] p-4 bg-gradient-to-r from-[#F5CF49] to-[#DA70D6] rounded-lg mt-4 text-white">
                        {/* rộng 276px */}
                        <div className="flex items-center mb-2">
                            <i className="fas fa-user-circle text-4xl"></i>
                            <div className="ml-2 text-base">
                                <p className="font-bold text-black">Trần Ngọc Thành</p>
                                <a href="#" className="text-sm font-semibold text-black no-underline">Thay đổi ảnh đại diện</a>
                            </div>
                        </div>
                        <hr className="mt-2" />
                        <nav className="space-y-4">
                            <a href="#" className="flex items-center text-lg text-black hover:text-[#F5CF49] no-underline transition-colors duration-200">
                                <i className="fas fa-user mr-2 text-black hover:text-white transition-colors duration-200"></i>
                                Thông tin khách hàng
                            </a>
                            <a href="#" className="flex items-center text-lg text-black hover:text-[#F5CF49] no-underline transition-colors duration-200">
                                <i className="fas fa-comments mr-2 text-black hover:text-white transition-colors duration-200"></i>
                                Lịch sử bình luận
                            </a>
                            <a href="#" className="flex items-center text-lg text-black hover:text-[#F5CF49] no-underline transition-colors duration-200">
                                <i className="fas fa-shopping-cart mr-2 text-black hover:text-white transition-colors duration-200"></i>
                                Lịch sử mua hàng
                            </a>
                            <hr className="mt-5" />
                            <a href="#" className="flex items-center text-lg text-black hover:text-[#F5CF49] no-underline transition-colors duration-200">
                                <i className="fas fa-sign-out-alt mr-2 text-black hover:text-white transition-colors duration-200"></i>
                                Đăng xuất
                            </a>
                        </nav>
                    </div>

                    <div className="w-full md:w-[900px] ml-0 md:ml-8 mt-4 md:mt-0">
                        {/* rộng 900px */}
                        <div className="bg-black bg-opacity-70 p-6 rounded-lg mb-6">
                            <h2 className="text-xl text-white mb-4">Thông tin cá nhân</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-white mb-2">Họ và tên</label>
                                    <input type="text" className="w-full p-1 border border-white bg-[#212529] text-white" value="Trần Ngọc Thành" style={{ borderRadius: 0 }} />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Ngày sinh</label>
                                    <input type="text" className="w-full p-1 border border-white bg-[#212529] text-white" value="22/01/2004" style={{ borderRadius: 0 }} />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Số điện thoại</label>
                                    <input type="text" className="w-full p-1 border border-white bg-[#212529] text-white" value="0394533600" style={{ borderRadius: 0 }} />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Email</label>
                                    <input type="text" className="w-full p-1 border border-white bg-[#212529] text-white" value="nam2204200789@gmail.com" style={{ borderRadius: 0 }} />
                                </div>
                            </div>
                            <button className="bg-[#DA70D6] text-white px-4 py-2 rounded text-base w-[140px] h-[40px] flex items-center justify-center" style={{ fontSize: '16px' }}>
                                Lưu
                            </button>
                        </div>
                        <div className="bg-black bg-opacity-70 p-6 rounded-lg mt-6">
                            <h2 className="text-xl text-white mb-4">Đổi mật khẩu</h2>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Mật khẩu cũ <span className="text-red-500">*</span></label>
                                <input type="password" className="w-full p-1 border border-white bg-[#212529] text-white" style={{ borderRadius: 0 }} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Mật khẩu mới <span className="text-red-500">*</span></label>
                                <input type="password" className="w-full p-1 border border-white bg-[#212529] text-white" style={{ borderRadius: 0 }} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Xác thực mật khẩu <span className="text-red-500">*</span></label>
                                <input type="password" className="w-full p-1 border border-white bg-[#212529] text-white" style={{ borderRadius: 0 }} />
                            </div>
                            <button className="bg-[#DA70D6] text-white px-4 py-2 rounded text-base w-[140px] h-[40px] flex items-center justify-center" style={{ fontSize: '16px' }}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;
