import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-white py-8">
      <section className="flex justify-center items-center">      
      <div className="mb-4 flex justify-center items-center max-w-[1400px]">
        <div className="pr-[189px]">
          <Image src="/images/logo.jpg" alt="Screentime logo" width={206} height={169} className="mx-auto mb-4" />
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
            <a href="#" className="text-white"><i className="fab fa-tiktok"></i></a>
            <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        <div className="pr-[210px]">
          <h3 className="font-bold mb-2">XEM PHIM</h3>
          <ul style={{width: "max-content"}}>
            <li>Phim đang chiếu</li>
            <li>Phim sắp chiếu</li>
            <li>Suất chiếu đặc biệt</li>
          </ul>
        </div>
        <div className="pr-[210px]">
          <h3  style={{width: "max-content"}} className="font-bold mb-2">STICKER MAN</h3>
          <ul  style={{width: "max-content"}}>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>
        <div className="">
          <h3  style={{width: "max-content"}} className="font-bold mb-2">THUÊ SỰ KIỆN</h3>
          <ul>
            <li>Thuê rạp</li>
            <li>Các loại hình cho thuê khác</li>
          </ul>
        </div>

      </div>
      </section>
      <div className="flex justify-center space-x-8 mb-4">
        <div>
          <p>© 2024 Tickerman. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Tin điện ảnh</a>
          <a href="#">Hỏi và đáp</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
