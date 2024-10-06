const Banner = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] py-6">
      <div className="max-w-[1410px] mx-auto bg-black py-6 rounded-lg h-[440px]">
        <div className="flex flex-col md:flex-row items-center justify-between h-full"> {/* Thêm h-full để căn giữa nội dung */}
          <div className="textBox mb-4 md:mb-0 text-center md:text-left text-white ml-20">
            <h2 className="text-2xl font-bold mb-2">Đặt vé xem phim tại Ticker Man</h2>
            <p className="mt-1 text-gray-300 ">Ưu đãi giảm giá 40% cho nhân viên</p>
            <p className="mt-1 text-gray-300 ">Ưu đãi giảm giá 40% cho nhân viên</p>
            <div className="text-center mt-20 ">
              <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">
                Xem thêm
              </button>
            </div>
          </div>
          <div className="imageBox flex justify-center mr-20"> {/* Căn giữa và cách lề phải 20px */}
            <img
              src="/images/image.png"
              alt="Banner Image 1"
              className="w-500 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
