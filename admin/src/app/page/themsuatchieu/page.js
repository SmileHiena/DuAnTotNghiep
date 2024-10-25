'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemSuatchieu = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ThoiGian: '',
    NgayChieu: '',
    IdPhim: '',
    IdPhong: '',
  });

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu phim:', error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/suatchieu/phongchieu');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu phòng chiếu:', error);
      }
    };

    fetchMovies();
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.info('Đang gửi...');

    try {
      const response = await fetch('http://localhost:3000/suatchieu/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        toast.error(`Có lỗi xảy ra: ${errorResult.message || 'Vui lòng thử lại sau.'}`);
        return;
      }

      const result = await response.json();
      toast.success(result.message);

      // Chờ 3 giây trước khi chuyển hướng
      setTimeout(() => {
        router.push('/page/suatchieu');
      }, 3000);

      // Reset form sau khi thành công
      setFormData({
        ThoiGian: '',
        NgayChieu: '',
        IdPhim: '',
        IdPhong: '',
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thêm suất chiếu</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm suất chiếu mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới suất chiếu</h3>
              <div className="tile-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label className="control-label">Thời gian</label>
                    <input
                      className="form-control"
                      type="text"
                      name="ThoiGian"
                      value={formData.ThoiGian}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ngày chiếu</label>
                    <input
                      className="form-control"
                      type="date"
                      name="NgayChieu"
                      value={formData.NgayChieu}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Phim</label>
                    <select
                      className="form-control"
                      name="IdPhim"
                      value={formData.IdPhim}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn phim --</option>
                      {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                          {movie.Ten}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Phòng chiếu</label>
                    <select
                      className="form-control"
                      name="IdPhong"
                      value={formData.IdPhong}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn phòng chiếu --</option>
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.TenPhongChieu}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/page/suatchieu">Hủy bỏ</a>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemSuatchieu;
