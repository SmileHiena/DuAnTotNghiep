'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Lấy email từ localStorage
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kiểm tra mật khẩu xác nhận có khớp không
    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu và mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Mật khẩu đã được thay đổi thành công');
        // Sau khi thay đổi mật khẩu, xóa email khỏi localStorage và chuyển hướng
        localStorage.removeItem('resetEmail');
        setTimeout(() => {
          router.push('/login');  // Điều hướng đến trang đăng nhập
        }, 2000);
      } else {
        setMessage(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
      console.error('Password reset failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/10.jpg')]">

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Đặt lại mật khẩu</h1>
        {message && <p className="text-red-500 mb-3">{message}</p>}
        <div>
          <label htmlFor="newPassword" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Mật khẩu mới:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" placeholder="Nhập mật khẩu mới" />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">Xác nhận mật khẩu mới:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base bg-[#E8F0FE] text-black" placeholder="Xác nhận mật khẩu mới" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-black rounded-full text-sm sm:text-lg font-bold cursor-pointer mt-5"
        >
          {loading ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
        </button>


      </form>


    </div>
  );
};

export default ResetPassword;
