'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Suatchieu = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentShowtime, setCurrentShowtime] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const response = await fetch('http://localhost:3000/suatchieu');
                const data = await response.json();
                setShowtimes(data);
                setLoading(false);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu suất chiếu:', error);
                setLoading(false);
            }
        };

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

        fetchShowtimes();
        fetchMovies();
        fetchRooms();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    const handleEditClick = (showtimeId) => {
        const showtime = showtimes.find((s) => s._id === showtimeId);
        setCurrentShowtime(showtime);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentShowtime(null);
        setErrorMessage('');
    };

    const handleSave = async () => {
        if (currentShowtime) {
            try {
                const response = await fetch(`http://localhost:3000/suatchieu/edit/${currentShowtime._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentShowtime),
                });

                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi cập nhật suất chiếu.');
                }

                setShowtimes((prev) =>
                    prev.map((s) => (s._id === currentShowtime._id ? currentShowtime : s))
                );

                toast.success('Cập nhật suất chiếu thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                handleCloseModal();
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    };

    const handleDelete = async (showtimeId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa suất chiếu này không?');

        if (confirmDelete) {
            try {
                await fetch(`http://localhost:3000/suatchieu/delete/${showtimeId}`, {
                    method: 'DELETE',
                });

                setShowtimes((prev) => prev.filter((s) => s._id !== showtimeId));
                toast.success('Xóa suất chiếu thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } catch (error) {
                console.error('Có lỗi xảy ra khi xóa suất chiếu:', error);
            }
        }
    };

    const handleMovieChange = (e) => {
        const selectedMovie = movies.find(movie => movie.id.toString() === e.target.value);
        if (selectedMovie) {
            const updatedShowtime = {
                ...currentShowtime,
                IdPhim: selectedMovie.id,
                Ten: selectedMovie.Ten,
            };
            setCurrentShowtime(updatedShowtime);
            setShowtimes((prev) =>
                prev.map((s) => (s._id === updatedShowtime._id ? updatedShowtime : s))
            );
        }
    };

    const handleRoomChange = (e) => {
        const selectedRoom = rooms.find(room => room.id.toString() === e.target.value);
        if (selectedRoom) {
            const updatedShowtime = {
                ...currentShowtime,
                IdPhong: selectedRoom.id,
                TenPhongChieu: selectedRoom.TenPhongChieu,
            };
            setCurrentShowtime(updatedShowtime);
            setShowtimes((prev) =>
                prev.map((s) => (s._id === updatedShowtime._id ? updatedShowtime : s))
            );
        }
    };

    return (
        <>
            <main className="app-content">
                <Head>
                    <title>Danh sách suất chiếu</title>
                </Head>
                <div className="app-title">
                    <ul className="app-breadcrumb breadcrumb side">
                        <li className="breadcrumb-item active">
                            <a href="#"><b>Danh sách suất chiếu</b></a>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="tile-body">
                                <div className="row element-button">
                                    <div className="col-sm-2">
                                        <Link href="/page/themsuatchieu" className="btn btn-add">
                                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                                        </Link>
                                    </div>
                                </div>
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Thời gian</th>
                                            <th>Ngày chiếu</th>
                                            <th>ID Phim</th>
                                            <th>Tên phim</th>
                                            <th>ID Phòng</th>
                                            <th>Tên phòng</th>
                                            <th>Tính năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showtimes.length > 0 ? (
                                            showtimes.map((showtime) => (
                                                <tr key={showtime._id}>
                                                    <td>{showtime.id}</td>
                                                    <td>{showtime.ThoiGian}</td>
                                                    <td>{showtime.NgayChieu}</td>
                                                    <td>{showtime.IdPhim}</td>
                                                    <td>{showtime.Ten || 'Không xác định'}</td>
                                                    <td>{showtime.IdPhong}</td>
                                                    <td>{showtime.TenPhongChieu || 'Không xác định'}</td>
                                                    <td>
                                                        <button className="btn btn-primary mr-3" type="button" onClick={() => handleEditClick(showtime._id)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </button>
                                                        <button className="btn btn-danger" type="button" onClick={() => handleDelete(showtime._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8">Không có suất chiếu nào được tìm thấy</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal chỉnh sửa suất chiếu */}
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="ModalUP" tabIndex="-1" role="dialog" aria-hidden={!isModalOpen} data-backdrop="static" data-keyboard="false" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <h5>Chỉnh sửa thông tin nhân viên</h5>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="control-label">ID suất chiếu</label>
                                    <input className="form-control" type="text" value={currentShowtime?._id || ''} disabled />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Thời gian</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="ThoiGian"
                                        value={currentShowtime?.ThoiGian || ''}
                                        onChange={(e) => setCurrentShowtime({ ...currentShowtime, ThoiGian: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Ngày chiếu</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="NgayChieu"
                                        value={currentShowtime?.NgayChieu || ''}
                                        onChange={(e) => setCurrentShowtime({ ...currentShowtime, NgayChieu: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">ID Phim</label>
                                    <select
                                        className="form-control"
                                        value={currentShowtime?.IdPhim || ''}
                                        onChange={handleMovieChange}
                                        required
                                    >
                                        <option value="">Chọn phim</option>
                                        {movies.map(movie => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.Ten}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="control-label">Tên Phòng Chiếu</label>
                                    <select
                                        className="form-control"
                                        value={currentShowtime?.IdPhong || ''}
                                        onChange={handleRoomChange}
                                        required
                                    >
                                        <option value="">Chọn phòng chiếu</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>
                                                {room.TenPhongChieu}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errorMessage && (
                                    <div className="alert alert-danger">{errorMessage}</div>
                                )}
                                <div className="form-group col-md-12">
                                    <button className="btn btn-save mr-3" type="button" onClick={handleSave}>
                                        Lưu lại
                                    </button>
                                    <button className="btn btn-cancel" type="button" onClick={handleCloseModal}>
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer transition={Bounce} />
        </>
    );
};

export default Suatchieu;
