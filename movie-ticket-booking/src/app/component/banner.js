
const HeroSection = () => {
    return (
        <>
        <div className="banner1">
        <section className="banner  text-white py-16 w-[1410px]">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
            {/* Hero Text */}
            <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Đặt vé xem phim tại TickerMan</h1>
            <p className="mb-6">Ưu đãi giảm giá 40% cho nhân viên...</p>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600">Đặt ngay</button>
            </div>
            {/* Hero Image */}
            <div className="md:w-1/2">
            <img src="../public/image/image.png" alt="Promo" className="rounded-lg shadow-lg" />
            </div>
            </div>
        
        </section>
        </div>
        {/* <h1>Đặt vé xem phim tại TickerMan</h1> */}
        </>
    )
    
    };
  
  export default HeroSection;
  