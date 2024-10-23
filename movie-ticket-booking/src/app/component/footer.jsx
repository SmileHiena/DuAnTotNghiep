import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="text-white bg-black py-8">
      <section className="flex justify-center items-center">
        <div className="mb-4 flex justify-between items-start max-w-[1410px] w-full">
          <div className="flex flex-col items-center pr-4">
            <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Screentime logo"
              width={206}
              height={169}
              className="mx-auto mb-4"
            /></Link>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="flex flex-col pr-8 mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">XEM PHIM</h3>
            <ul className="space-y-1 text-base">
              <li>Phim đang chiếu</li>
              <li>Phim sắp chiếu</li>
              <li>Suất chiếu đặc biệt</li>
            </ul>
          </div>

          <div className="flex flex-col pr-8 mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">STICKER MAN</h3>
            <ul className="space-y-1 text-base">
              <li>Giới thiệu</li>
              <li>Liên hệ</li>
              <li>Tuyển dụng</li>
            </ul>
          </div>

          <div className="flex flex-col mt-20">
            <h3 style={{ fontSize: "20px" }} className="font-bold mb-2 text-left ">THUÊ SỰ KIỆN</h3>
            <ul className="space-y-1 text-base">
              <li>Thuê rạp</li>
              <li>Các loại hình cho thuê khác</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex justify-between items-center mb-4 text-base max-w-[1410px] mx-auto">
        <div>
          <p>© 2024 Tickerman. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 no-underline text-white">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Tin điện ảnh</a>
          <a href="#">Hỏi và đáp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
