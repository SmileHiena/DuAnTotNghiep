const Hihi = () => {


  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    <h2 className="text-3xl font-bold mb-4">Top Phim</h2>
    <div className="flex justify-between mb-4">
      <div className="flex items-center">
        <span className="text-lg font-bold mr-2">Sắp xếp theo:</span>
        <select className="bg-white border border-gray-300 rounded py-2 px-4">
          <option value="latest">Mới nhất</option>
          <option value="rating">Đánh giá cao nhất</option>
          <option value="view">Xem nhiều nhất</option>
        </select>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-bold mr-2">Hiển thị:</span>
        <select className="bg-white border border-gray-300 rounded py-2 px-4">
          <option value="12">12 phim</option>
          <option value="24">24 phim</option>
          <option value="36">36 phim</option>
        </select>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* <!-- Movie item 1 --> */}
      <div className="bg-white shadow-md rounded p-4">
        <img src="movie-poster-1.jpg" alt="Movie Poster 1" className="w-full h-48 object-cover rounded-t"/>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Movie Title 1</h3>
          <p className="text-gray-600">Movie description 1</p>
          <div className="flex items-center mb-2">
            <span className="text-lg font-bold mr-2">Đánh giá:</span>
            <span className="text-orange-500">8.5/10</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Xem Phim</button>
        </div>
      </div>
      {/* <!-- Movie item 2 --> */}
      <div className="bg-white shadow-md rounded p-4">
        <img src="movie-poster-2.jpg" alt="Movie Poster 2" className="w-full h-48 object-cover rounded-t"/>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Movie Title 2</h3>
          <p className="text-gray-600">Movie description 2</p>
          <div className="flex items-center mb-2">
            <span className="text-lg font-bold mr-2">Đánh giá:</span>
            <span className="text-orange-500">8.2/10</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Xem Phim</button>
        </div>
      </div>
      {/* <!-- Add more movie items here --> */}
    </div>
    <div className="flex justify-center mt-4">
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Xem thêm</button>
    </div>
  </div>
  );
};

export default Hihi;
