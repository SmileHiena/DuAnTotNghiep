'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Tải react-slick chỉ khi component được mounted
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Tắt mũi tên điều hướng nếu bạn không cần
  };

  if (!isMounted) return null; // Trả về null nếu chưa mounted

  return (
    <section className="bg-[rgba(0,0,0,0.5)] py-6">
    <div className="max-w-[1410px] mx-auto ">  
        <Slider {...settings}>
        {/* Slide 1 */}
        <div className=" mx-auto bg-black py-6 rounded-lg h-[440px] ">
          <div className="flex flex-col md:flex-row items-center justify-between h-full">
            <div className="textBox mb-4 md:mb-0 text-center md:text-left text-white ml-20">
              <h2 className="text-2xl font-bold mb-2">Đặt vé xem phim tại ScreenTime</h2>
              <p className="mt-1 text-gray-300 ">Ưu đãi giảm giá 40% cho sinh viên</p>
             
              <div className="text-center mt-20 ">
                <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="imageBox flex justify-center mr-20">
              <img
                src="/images/background.png"
                alt="Image 1"
                className="w-500 h-auto"
              />
            </div>
          </div>
        </div>
        {/* Slide 2 */}
        <div className=" mx-auto bg-black py-6 rounded-lg h-[440px] ">
          <div className="flex flex-col md:flex-row items-center justify-between h-full">
            <div className="textBox mb-4 md:mb-0 text-center md:text-left text-white ml-20">
              <h2 className="text-2xl font-bold mb-2">Hello Viet Nam !!!</h2>
              <p className="mt-1 text-gray-300 ">Hoang Sa & Truong Sa belong to Vietnam</p>
              <div className="text-center mt-20 ">
                <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="imageBox flex justify-center mr-20">
              <img
                src="/images/logovn.png"
                alt="Image 2"
                className="w-500 h-auto"
              />
            </div>
          </div>
        </div>
      </Slider>
      </div>

    </section>
  );
};

export default Banner;
