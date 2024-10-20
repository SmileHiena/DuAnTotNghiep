var express = require("express");
var router = express.Router();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db");
const cors = require("cors");
const path = require('path');

router.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  }
});

// API to get the list of movies
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const phim = await phimCollection.find().toArray();

    if (phim.length > 0) {
      res.status(200).json(phim);
    } else {
      res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('phim');
    const movie = await collection.findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

router.post("/add", upload.single('Anh'), async (req, res) => {
  try {
    const newPhim = JSON.parse(req.body.newPhim); // Parse movie data from the form
    let Anh = req.file ? `/images/phim/${req.file.filename}` : ""; // Handle the uploaded image

    const newMovie = {
      _id: new ObjectId(),
      Ten: newPhim.Ten,
      Anh: Anh, // Use the uploaded image path
      TrangThai: newPhim.TrangThai,
      TheLoai: newPhim.TheLoai,
      MoTa: {
        DaoDien: newPhim.MoTa.DaoDien,
        DienVien: newPhim.MoTa.DienVien,
        NgayKhoiChieu: newPhim.MoTa.NgayKhoiChieu,
      },
      ThongTinPhim: newPhim.ThongTinPhim || "", // Ensure this is handled
    };

    const db = await connectDb();
    const phimCollection = db.collection("phim");
    await phimCollection.insertOne(newMovie);

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Failed to add movie", error: error.message });
  }
});


// Route to edit a movie
router.put("/edit/:id", upload.single('Anh'), async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPhim = JSON.parse(req.body.newPhim);
    const updateData = {
      Ten: updatedPhim.Ten,
      TrangThai: updatedPhim.TrangThai,
      TheLoai: updatedPhim.TheLoai,
      MoTa: {
        DaoDien: updatedPhim.MoTa.DaoDien,
        DienVien: updatedPhim.MoTa.DienVien,
        NgayKhoiChieu: updatedPhim.MoTa.NgayKhoiChieu,
      },
      ThongTinPhim: updatedPhim.ThongTinPhim || "", // Đảm bảo rằng trường này không null
      ThoiLuong: updatedPhim.ThoiLuong || "", // Thêm trường Thời gian
      QuocGia: updatedPhim.QuocGia || "", // Thêm trường Quốc gia
      NgonNgu: updatedPhim.NgonNgu || "", // Thêm trường Ngôn ngữ
      KhuyenCao: updatedPhim.KhuyenCao || "", // Thêm trường Khuyến cáo
    };
    

    // Only add the image if it was uploaded
    if (req.file) {
      updateData.Anh = `/uploads/${req.file.filename}`;
    }

    const db = await connectDb();
    const phimCollection = db.collection("phim");

    const result = await phimCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie updated successfully", updatedPhim });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Failed to update movie", error: error.message });
  }
});


// Route để xóa một bài blog
router.delete("/delete/:id", async (req, res) => { 
  const { id } = req.params; // Lấy ID từ params
  try {
    const db = await connectDb(); // Kết nối đến DB
    const blogCollection = db.collection("blog"); // Lấy collection 'blog'

    // Xóa bài blog dựa trên ID
    const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" }); // Nếu không tìm thấy bài blog
    }

    res.sendStatus(204); // Trả về status 204 nếu xóa thành công
  } catch (error) {
    console.error("Error deleting blog:", error); // Ghi log lỗi
    res.status(500).json({ message: "Failed to delete blog", error: error.message }); // Trả về lỗi
  }
});


module.exports = router;