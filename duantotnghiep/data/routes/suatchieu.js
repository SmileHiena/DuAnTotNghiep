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
      movieMap[movie.id.toString()] = movie.Ten; // Giả định bạn có thuộc tính Ten trong bảng phim
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
    const { ThoiGian, NgayChieu, IdPhim, IdPhong } = req.body;

    const db = await connectDb();
    const collection = db.collection('suatchieu');

    // Tạo ID mới bằng cách đếm số tài liệu hiện có
    const newId = await collection.countDocuments() + 1; // Tạo ID mới

    const newShowtime = {
      id: newId, // Gán ID mới
      ThoiGian,
      NgayChieu,
      IdPhim,
      IdPhong,
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
    const { ThoiGian, NgayChieu, IdPhim, IdPhong } = req.body; // Nhận các trường từ yêu cầu
    const db = await connectDb();
    const collection = db.collection('suatchieu');

    const updatedShowtime = {
      ThoiGian,
      NgayChieu,
      IdPhim,
      IdPhong,
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

module.exports = router;
