import '../../../public/styles/banner.css'; 

const Banner = () => {
  return (
    <div className="bannerContainer">
      <div className="textBox">
        <h2>Đặt vé xem phim tại Ticker Man</h2>
        <p>Ưu đãi giảm giá 40% cho nhân viên</p>
        <button className="see-more-button">
          Xem thêm
        </button>
      </div>
      <div className="imageBox">
        <img
<<<<<<< HEAD
          src="/images/image.png" 
=======
          src="/image/image.png" 
>>>>>>> origin/Son_dev
          alt="Banner Image 1"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}

export default Banner;
