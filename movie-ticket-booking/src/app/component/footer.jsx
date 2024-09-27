const Footer = () => {
    return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4">Xem Phim</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Phim đang chiếu</a></li>
              <li><a href="#" className="hover:text-white">Phim sắp chiếu</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">StickerMan</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
            </ul>
          </div>
          {/* Add more footer sections as needed */}
        </div>
        <p className="text-center mt-8">&copy; 2024 StickerMan. All rights reserved.</p>
      </div>
    </footer>
  )};
  
  export default Footer;
  