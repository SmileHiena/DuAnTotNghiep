// pages/admin/index.js
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href="/admin/movies">
        <a>Quản lý phim</a>
      </Link>
      <Link href="/admin/showtimes">
        <a>Quản lý lịch chiếu</a>
      </Link>
      <Link href="/admin/users">
        <a>Quản lý người dùng</a>
      </Link>
    </div>
  );
}
