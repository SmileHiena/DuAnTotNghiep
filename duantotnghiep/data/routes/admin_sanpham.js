var express = require("express");
var router = express.Router();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db");
const cors = require("cors");
const path = require("path");

router.use(cors());
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/phim"); // Save files in the public/images folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original name of the uploaded file
  },
});

// File type validation for image uploads
function checkFileUpLoad(req, file, cb) {
  const fileTypes = /\.(jpg|jpeg|png|gif)$/;
  if (!file.originalname.match(fileTypes)) {
    return cb(
      new Error("Bạn chỉ được upload file ảnh (jpg, jpeg, png, gif)."),
      false
    );
  }
  cb(null, true);
}

// Initialize multer with storage and file filter
let upload = multer({
  storage: storage,
  fileFilter: checkFileUpLoad,
});

// POST route to add a new movie
router.post("/add", upload.single("Anh"), async (req, res) => {
  try {
    const newPhim = JSON.parse(req.body.newPhim);
    const Anh = req.file ? `/images/phim/${req.file.originalname}` : null;

    // Get the last movie's id
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const lastMovie = await phimCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastMovie.length > 0 ? lastMovie[0].id + 1 : 1; // Start from 1 if no movies exist

    const newMovie = {
      _id: new ObjectId(),
      id: newId, // Set the new id
      Ten: newPhim.Ten,
      Anh: Anh,
      TrangThai: newPhim.TrangThai,
      TheLoai: newPhim.TheLoai,
      MoTa: {
        DaoDien: newPhim.MoTa.DaoDien,
        DienVien: newPhim.MoTa.DienVien,
        NgayKhoiChieu: newPhim.MoTa.NgayKhoiChieu,
      },
      ThongTinPhim: newPhim.ThongTinPhim || "",
    };

    await phimCollection.insertOne(newMovie);

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({
      message: "Failed to add movie",
      error: error.message,
    });
  }
});



//Get phim data
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

// Ensure you have this part in your Express routes
router.get("/dangchieu", async (req, res) => {
  try {
      const db = await connectDb();
      const phimCollection = db.collection("phim");

      // Find movies with the status "dangchieu"
      const phim = await phimCollection.find({ TrangThai: "dangchieu" }).toArray();

      console.log("Fetched movies:", phim); // Log the fetched movies

      if (phim.length > 0) {
          res.status(200).json(phim);
      } else {
          res.status(404).json({ message: "No movies found with the status 'dangchieu'" });
      }
  } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Ensure you have this part in your Express routes
router.get("/sapchieu", async (req, res) => {
  try {
      const db = await connectDb();
      const limit = parseInt(req.query.limit) || 5;
      const phimCollection = db.collection("phim");

      // Find movies with the status "dangchieu"
      const phim = await phimCollection.find({ TrangThai: "sapchieu" }).limit(limit).toArray();

      console.log("Fetched movies:", phim); // Log the fetched movies

      if (phim.length > 0) {
          res.status(200).json(phim);
      } else {
          res.status(404).json({ message: "No movies found with the status 'dangchieu'" });
      }
  } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  const db = await connectDb();
  const phimCollection = db.collection("phim");
  const id = req.params.id;

  console.log("Requesting movie with ID:", id);
  console.log("Request parameters:", req.params); 
  const movie = await phimCollection.findOne({ id: parseInt(id) }); 
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});



// Route to edit a movie
router.put("/edit/:id", upload.single("Anh"), async (req, res) => {
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
      ThongTinPhim: updatedPhim.ThongTinPhim || "",
    };

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

    res
      .status(200)
      .json({ message: "Movie updated successfully", updatedPhim });
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ message: "Failed to update movie", error: error.message });
  }
});

// Route to lock/unlock a movie
router.put("/lock/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const movie = await phimCollection.findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedLockedStatus = !movie.locked;

    const result = await phimCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { locked: updatedLockedStatus } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to update lock status" });
    }

    res
      .status(200)
      .json({
        message: "Lock status updated successfully",
        locked: updatedLockedStatus,
      });
  } catch (error) {
    console.error("Error locking/unlocking movie:", error);
    res
      .status(500)
      .json({ message: "Failed to update lock status", error: error.message });
  }
});

// Route to explicitly unlock a movie
router.put("/unlock/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const movie = await phimCollection.findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // If already unlocked, just return success
    if (!movie.locked) {
      return res
        .status(200)
        .json({ message: "Movie is already unlocked", locked: false });
    }

    const result = await phimCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { locked: false } } // Explicitly unlock
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to unlock movie" });
    }

    res
      .status(200)
      .json({ message: "Movie unlocked successfully", locked: false });
  } catch (error) {
    console.error("Error unlocking movie:", error);
    res
      .status(500)
      .json({ message: "Failed to unlock movie", error: error.message });
  }
});

// Route để xóa một bài blog
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDb();
    const blogCollection = db.collection("phim");
    const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: error.message });
  }
});


//lọc lịch chiếu theo phim
router.get("/:id/phim", async (req, res) => {
  const PhimId = parseInt(req.params.id); // Chuyển đổi ID từ chuỗi sang số
  console.log(`Fetching details for schedule with ID: ${PhimId}`);

  try {
    const db = await connectDb(); // Kết nối đến MongoDB
    const phimCollection = db.collection('phim');
    const lichCollection = db.collection('Lichchieu'); // Chỉnh sửa tên biến từ lichDetailCollection thành lichCollection

    // Tìm lịch theo ID
    const lich = await phimCollection.findOne({ id: PhimId });
    console.log('Schedule found:', lich);

    if (lich) {
      const phongDetails = await lichCollection.find({ idPhim: lich.id }).toArray(); // Sử dụng find và toArray để lấy tất cả

      console.log('lịch details found:', phongDetails); 

      if (phongDetails.length > 0) {
        res.status(200).json(phongDetails); // Trả về mảng các chi tiết phòng
      } else {
        res.status(404).json({ message: "Chi tiết phòng không tìm thấy!" });
      }
    } else {
      res.status(404).json({ message: "Lịch không tìm thấy!" });
    }
  } catch (error) {
    console.error("Error fetching schedule detail:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});


module.exports = router;