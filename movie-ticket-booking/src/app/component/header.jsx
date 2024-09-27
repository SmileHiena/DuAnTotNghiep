import Link from 'next/link';

const Header = () => {
    return (
  <header className="bg-black text-white">
    <div className="container mx-auto flex justify-between items-center py-4 px-6">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="TickerMan Logo" className="h-10 mr-4" />
        <Link href="/" className="text-xl font-bold">TickerMan</Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        <Link href="/" className="hover:text-yellow-300">Trang chủ</Link>
        <Link href="/schedule" className="hover:text-yellow-300">Lịch chiếu</Link>
        <Link href="/about" className="hover:text-yellow-300">Giới thiệu</Link>
        <Link href="/new-movies" className="hover:text-yellow-300">Phim mới</Link>
      </nav>

      {/* Search and Login */}
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Tìm kiếm..." className="bg-gray-800 text-white px-4 py-2 rounded-md" />
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600">Đăng nhập</button>
      </div>
    </div>
  </header>
)};

export default Header;
