var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, (file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  }
});
// API để lấy danh sách phim theo danh mục
router.get("/danhmuc/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const movieCollection = db.collection("phim");

    // Lấy id danh mục từ tham số
    const categoryId = parseInt(req.params.id, 10);

    // Tìm kiếm phim theo IdDanhMuc
    const movies = await movieCollection.find({ IdDanhMuc: categoryId }).toArray();

    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.status(404).json({ message: "No movies found for this category." });
    }
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to get the list of products
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const theloaiCollection = db.collection("theloai");
    const theloai = await theloaiCollection.find().toArray();

    if (theloai.length > 0) {
      res.status(200).json(theloai);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to add a new event
router.post("/add", upload.single('Anh'), async (req, res) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection("theloai");

    // Retrieve the last inserted document to get the highest ID
    const lastCategory = await categoryCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastCategory.length > 0 ? lastCategory[0].id + 1 : 1; // Start from 1 if no entries exist

    // Create new event object
    const newCategory = {
      _id: new ObjectId(), // New ObjectId for MongoDB
      id: newId,
      Ten: req.body.Ten,
      Anh: req.file ? `/images/theloai/${req.file.filename}` : "", // Save file path if file is uploaded
    };

    // Insert new event
    await categoryCollection.insertOne(newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category", error: error.message });
  }
});


// Route để xóa một bài blog
router.delete("/theloai/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection("theloai");

    // Convert id to an integer if it is a number
    const id = parseInt(req.params.id, 10);

    const result = await categoryCollection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Category deleted successfully." });
    } else {
      res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
});


module.exports = router;