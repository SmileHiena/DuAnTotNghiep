const FAQSection = () => {
  return (
  <section className="bg-gray-800 text-white py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6">Bạn hỏi, chúng tôi trả lời</h2>
      <div className="space-y-4">
        <details className="p-4 bg-gray-700 rounded-lg">
          <summary className="font-bold">Có thể mua vé xem phim những rạp nào?</summary>
          <p className="mt-2">Bạn có thể mua vé tại tất cả các rạp...</p>
        </details>
        <details className="p-4 bg-gray-700 rounded-lg">
          <summary className="font-bold">Lợi ích của việc mua vé online?</summary>
          <p className="mt-2">Bạn sẽ được giảm giá và ưu tiên chỗ ngồi...</p>
        </details>
        {/* Add more FAQs as needed */}
      </div>
    </div>
  </section>
)};

export default FAQSection;
