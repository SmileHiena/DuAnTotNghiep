const Promotions = () => {
    return (
    <section className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Khuyến Mãi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="promotion-card p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Ngày Thành Viên</h3>
            <p>Thứ 45K cho thành viên...</p>
          </div>
          <div className="promotion-card p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Học Sinh Sinh Viên</h3>
            <p>Ưu đãi 45K...</p>
          </div>
          {/* Add more promotion cards as needed */}
        </div>
      </div>
    </section>
  )};
  
  export default Promotions;
  