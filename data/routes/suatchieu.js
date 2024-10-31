const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');

// Lấy danh sách phòng chiếu của rạp
router.get('/phongchieu', async (req, res) => {
  try {
    const db = await connectDb();
    const rapCollection = db.collection('rap');

    // Lấy rạp đầu tiên (chỉ có một rạp)
    const rap = await rapCollection.findOne({});

    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    // Trả về danh sách phòng chiếu
    res.status(200).json(rap.PhongChieu);
  } catch (error) {
    console.error('Lỗi khi lấy phòng chiếu:', error);
    res.status(500).json({ message: 'Lỗi khi lấy phòng chiếu', error });
  }
});

// Lấy danh sách suất chiếu
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('suatchieu');
    const showtimes = await collection.find({}).toArray();

    // Lấy danh sách phim để ánh xạ IdPhim với tên phim
    const movieCollection = db.collection('phim');
    const movies = await movieCollection.find({}).toArray();
    const movieMap = {};
    movies.forEach(movie => {
      movieMap[movie.id.toString()] = {
        Ten: movie.Ten,
        Anh: movie.Anh,
        KieuPhim: movie.TheLoai.KieuPhim, // Lấy KieuPhim từ TheLoai
      };
    });

    // Lấy danh sách rạp để ánh xạ IdPhong với tên phòng
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = room.TenPhongChieu; // Giả định bạn có thuộc tính TenPhongChieu trong bảng rạp
      });
    });

    // Thêm tên phim, ảnh, thể loại và DaDatGhe vào danh sách suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => ({
      ...showtime,
      Anh: movieMap[showtime.IdPhim.toString()]?.Anh || 'Không xác định',
      Ten: movieMap[showtime.IdPhim.toString()]?.Ten || 'Không xác định',
      KieuPhim: movieMap[showtime.IdPhim.toString()]?.KieuPhim || 'Không xác định',
      TenPhongChieu: theaterMap[showtime.IdPhong] || 'Không xác định',
      DaDatGhe: showtime.DaDatGhe || [] // Thêm trường DaDatGhe
    }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy danh sách suất chiếu
router.get('/dangchieu', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    // Chỉ lấy những suất chiếu có trạng thái là "DangChieu"
    const showtimes = await collection.find({ TrangThai: "DangChieu" }).toArray();

    // Lấy danh sách phim để ánh xạ IdPhim với tên phim
    const movieCollection = db.collection('phim');
    const movies = await movieCollection.find({}).toArray();
    const movieMap = {};
    movies.forEach(movie => {
      movieMap[movie.id.toString()] = movie.Ten; // Giả định bạn có thuộc tính Ten trong bảng phim
    });

    // Lấy danh sách rạp để ánh xạ IdPhong với tên phòng
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = room.TenPhongChieu;
      });
    });

    // Thêm tên phim và tên phòng vào danh sách suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => ({
      ...showtime,
      Ten: movieMap[showtime.IdPhim.toString()] || 'Không xác định', // Gán tên phim
      TenPhongChieu: theaterMap[showtime.IdPhong] || 'Không xác định' // Gán tên phòng
    }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin suất chiếu theo id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('suatchieu');
    const showtime = await collection.findOne({ _id: new ObjectId(id) });

    if (!showtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }
    res.json(showtime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Thêm suất chiếu
router.post('/add', async (req, res) => {
  try {
    const { NgayChieu, GioChieu, IdPhim, IdPhong, TrangThai, DaDatGhe = [] } = req.body; // Thêm DaDatGhe

    const db = await connectDb();
    const collection = db.collection('suatchieu');

    // Chuyển đổi IdPhim và IdPhong từ chuỗi sang số
    const idPhim = parseInt(IdPhim, 10);
    const idPhong = parseInt(IdPhong, 10);

    // Tạo ID mới bằng cách đếm số tài liệu hiện có
    const newId = await collection.countDocuments() + 1; // Tạo ID mới

    const newShowtime = {
      id: newId, // Gán ID mới
      NgayChieu,
      GioChieu,
      IdPhim: idPhim, // Sử dụng idPhim đã chuyển đổi
      IdPhong: idPhong, // Sử dụng idPhong đã chuyển đổi
      TrangThai,
      DaDatGhe,
    };

    // Thêm suất chiếu vào cơ sở dữ liệu
    await collection.insertOne(newShowtime);

    // Trả về thông báo thành công cùng với suất chiếu vừa tạo
    res.status(201).json({ message: 'Suất chiếu đã được thêm thành công', showtime: newShowtime });
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm suất chiếu:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm suất chiếu', error: error.message });
  }
});

// Sửa thông tin suất chiếu
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayChieu, GioChieu, IdPhim, IdPhong, TrangThai, DaDatGhe } = req.body; // Nhận các trường từ yêu cầu
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    const updatedShowtime = {
      NgayChieu,
      GioChieu,
      IdPhim,
      IdPhong,
      TrangThai,
      DaDatGhe // Cập nhật DaDatGhe
    };

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedShowtime });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy suất chiếu để cập nhật' });
    } else {
      // Trả về thông tin suất chiếu đã được cập nhật
      res.json({ message: 'Cập nhật thông tin suất chiếu thành công', updatedShowtime });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Xóa suất chiếu
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy suất chiếu để xóa' });
    } else {
      res.json({ message: 'Suất chiếu đã được xóa thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin phòng chiếu theo suất chiếu
router.get('/phongchieu/:id', async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ tham số
    const db = await connectDb();
    const suatChieuCollection = db.collection('suatchieu');

    // Lấy thông tin suất chiếu theo ID
    const showtime = await suatChieuCollection.findOne({ _id: new ObjectId(id) });

    if (!showtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    // Lấy rạp đầu tiên (chỉ có một rạp)
    const rapCollection = db.collection('rap');
    const rap = await rapCollection.findOne({});

    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    // Tìm phòng chiếu tương ứng với suất chiếu
    const phongChieu = rap.PhongChieu.find(phong => phong.id === showtime.IdPhong);

    if (!phongChieu) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu tương ứng với suất chiếu' });
    }

    // Trả về thông tin phòng chiếu
    res.status(200).json(phongChieu);
  } catch (error) {
    console.error('Lỗi khi lấy phòng chiếu theo suất chiếu:', error);
    res.status(500).json({ message: 'Lỗi khi lấy phòng chiếu theo suất chiếu', error });
  }
});

// Lấy danh sách suất chiếu theo phim
router.get('/phim/:IdPhim', async (req, res) => {
  try {
    const { IdPhim } = req.params;
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');

    // Lấy danh sách suất chiếu có IdPhim trùng khớp
    const showtimes = await showtimesCollection
      .find({ IdPhim: parseInt(IdPhim) })
      .project({
        _id: 1,
        id: 1,
        IdPhim: 1,
        IdPhong: 1,
        NgayChieu: 1,
        TrangThai: 1,
      })
      .toArray();

    if (showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho phim này' });
    }

    // Lấy danh sách các rạp
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = {
          TenPhongChieu: room.TenPhongChieu,
          TenRap: theater.TenRap,      // Thêm tên rạp
          ViTri: theater.ViTri          // Thêm vị trí
        };
      });
    });

    // Thêm tên phòng chiếu, tên rạp và vị trí vào danh sách suất chiếu
    const showtimesWithDetails = showtimes
      .filter(showtime => theaterMap[showtime.IdPhong]) // Lọc theo IdPhong có trong theaterMap
      .map(showtime => ({
        ...showtime,
        TenPhongChieu: theaterMap[showtime.IdPhong].TenPhongChieu || 'Không xác định',
        TenRap: theaterMap[showtime.IdPhong].TenRap || 'Không xác định', // Thêm tên rạp
        ViTri: theaterMap[showtime.IdPhong].ViTri || 'Không xác định',   // Thêm vị trí
      }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách suất chiếu theo phim:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy danh sách suất chiếu theo phim với trạng thái DangChieu
router.get('/phim/:IdPhim/dangchieu', async (req, res) => {
  try {
    const { IdPhim } = req.params;
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');

    // Lấy danh sách suất chiếu có IdPhim trùng khớp và trạng thái là "DangChieu"
    const showtimes = await showtimesCollection.find({ IdPhim: parseInt(IdPhim), TrangThai: "DangChieu" }).toArray();

    if (showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu đang chiếu cho phim này' });
    }

    // Lấy thông tin phim
    const movieCollection = db.collection('phim');
    const movie = await movieCollection.findOne({ id: parseInt(IdPhim) });

    if (!movie) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin phim' });
    }

    // Lấy thông tin phòng chiếu
    const theaterCollection = db.collection('rap');
    const theaters = await theaterCollection.find({}).toArray();
    const theaterMap = {};
    theaters.forEach(theater => {
      theater.PhongChieu.forEach(room => {
        theaterMap[room.id] = {
          TenPhongChieu: room.TenPhongChieu,
          TenRap: theater.TenRap,      // Thêm tên rạp
          ViTri: theater.ViTri          // Thêm vị trí
        };
      });
    });

    // Thêm tên phòng chiếu, tên phim, tên rạp và vị trí vào danh sách suất chiếu
    const showtimesWithDetails = showtimes.map(showtime => ({
      ...showtime,
      TenPhongChieu: theaterMap[showtime.IdPhong]?.TenPhongChieu || 'Không xác định',
      TenRap: theaterMap[showtime.IdPhong]?.TenRap || 'Không xác định', // Thêm tên rạp
      ViTri: theaterMap[showtime.IdPhong]?.ViTri || 'Không xác định',   // Thêm vị trí
      TenPhim: movie.Ten,
      AnhPhim: movie.Anh,
      KieuPhim: movie.TheLoai.KieuPhim,
    }));

    res.json(showtimesWithDetails);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách suất chiếu đang chiếu theo phim:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy danh sách ghế theo IdPhong
router.get('/ghe/:IdPhong', async (req, res) => {
  try {
    const { IdPhong } = req.params; // Lấy IdPhong từ tham số
    const db = await connectDb();
    const rapCollection = db.collection('rap');

    // Lấy rạp đầu tiên (chỉ có một rạp)
    const rap = await rapCollection.findOne({});

    if (!rap) {
      return res.status(404).json({ message: 'Không tìm thấy rạp' });
    }

    // Tìm phòng chiếu tương ứng với IdPhong
    const phongChieu = rap.PhongChieu.find(phong => phong.id === parseInt(IdPhong));

    if (!phongChieu) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu này' });
    }

    // Trả về danh sách ghế trong phòng chiếu
    res.status(200).json(phongChieu.Ghe || []);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ghế:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách ghế', error });
  }
});


module.exports = router;