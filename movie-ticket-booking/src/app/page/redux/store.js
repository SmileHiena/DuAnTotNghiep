import { configureStore } from '@reduxjs/toolkit';
import userSlice, { setUserFromLocalStorage } from './slices/userSlices'; // Thêm import setUserFromLocalStorage


// Tạo store mà không cần preloadedState
export const store = configureStore({
  reducer: {
    user: userSlice,

  },
});

// Đăng ký cập nhật trạng thái vào localStorage chỉ trên client-side
if (typeof window !== 'undefined') {
  // Nếu có dữ liệu người dùng trong localStorage, thiết lập trạng thái người dùng
  const user = localStorage.getItem('user');
  if (user) {
    store.dispatch(setUserFromLocalStorage(JSON.parse(user)));
  }
}