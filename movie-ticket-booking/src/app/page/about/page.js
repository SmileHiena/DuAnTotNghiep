// about.jsx
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto my-12 px-4 bg-black text-white">
      {/* Giới thiệu về ScreenTime */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Giới thiệu về ScreenTime</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/500x300"
              className="w-full h-auto object-cover"
              alt="Phim ảnh"
            />
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-yellow-500 mb-4">Khám Phá Thế Giới Phim Ảnh</h5>
              <p className="text-gray-300">
                Tại ScreenTime, chúng tôi mang đến cho bạn một trải nghiệm tuyệt vời về việc mua vé xem phim trực tuyến. 
                Chúng tôi cung cấp hàng ngàn bộ phim với các thể loại phong phú, từ hành động, hài hước đến lãng mạn.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/500x300"
              className="w-full h-auto object-cover"
              alt="Mua vé trực tuyến"
            />
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-yellow-500 mb-4">Mua Vé Nhanh Chóng</h5>
              <p className="text-gray-300">
                Bạn chỉ cần chọn bộ phim yêu thích, chọn suất chiếu và làm theo hướng dẫn để hoàn tất giao dịch. 
                Dễ dàng và nhanh chóng, chỉ trong vài cú nhấp chuột!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liên hệ với chúng tôi */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">Liên hệ với chúng tôi</h2>
        <p className="text-gray-300">
          Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email: 
          <a href="mailto:support@screentime.com" className="text-yellow-500"> support@screentime.com</a>
        </p>
      </section>

      {/* Câu hỏi thường gặp (FAQ) */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">Câu hỏi thường gặp (FAQ)</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 shadow-lg rounded-lg p-6">
            <strong className="block text-yellow-500 mb-2">Cách mua vé xem phim như thế nào?</strong>
            <p className="text-gray-300">Bạn chỉ cần chọn bộ phim, chọn suất chiếu và làm theo hướng dẫn để hoàn tất giao dịch.</p>
          </div>
          <div className="bg-gray-900 shadow-lg rounded-lg p-6">
            <strong className="block text-yellow-500 mb-2">ScreenTime có cung cấp vé giảm giá không?</strong>
            <p className="text-gray-300">Có, chúng tôi thường xuyên có các chương trình khuyến mãi và giảm giá cho người dùng.</p>
          </div>
          <div className="bg-gray-900 shadow-lg rounded-lg p-6">
            <strong className="block text-yellow-500 mb-2">Tôi có thể hủy vé đã mua không?</strong>
            <p className="text-gray-300">Các quy định về hủy vé phụ thuộc vào từng rạp chiếu phim, vui lòng kiểm tra kỹ trước khi mua.</p>
          </div>
        </div>
      </section>

      {/* Kết thúc */}
      <section>
        <div className="text-gray-300">
          <p>Hãy cùng chúng tôi khám phá thế giới điện ảnh ngay hôm nay!</p>
        </div>
      </section>
    </div>
  );
};

export default About;
