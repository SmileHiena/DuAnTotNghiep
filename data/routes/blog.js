// blog.js (API Router)
var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');

// Lấy danh sách tất cả Blog
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const blogCollection = db.collection("blog");
    const blogs = await blogCollection.find().toArray(); // Sửa biến thành blogs

    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" }); // Sửa thông báo
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Lấy Blog theo _ID
router.get('/:id', async (req, res) => {
  const db = await connectDb();
  const blog = await db.collection('blog').findOne({ _id: ObjectId(req.params.id) }); // Đúng tên collection
  if (blog) {
      res.status(200).json(blog);
  } else {
      res.status(404).json({ message: 'Không tìm thấy Blog' });
  }
});

// Thêm Blog mới
router.post('/add', async (req, res) => {
  const db = await connectDb();
  const newBlog = {
      TenBlog: req.body.TenBlog,
      Anh: req.body.Anh,
      LuotXem: req.body.LuotXem
  };
  const result = await db.collection('blog').insertOne(newBlog); // Đúng tên collection
  res.status(201).json({ message: 'Blog đã được thêm', id: result.insertedId });
});

// Sửa Blog theo _ID
router.put('/edit/:id', async (req, res) => {
  const db = await connectDb();
  const updatedBlog = {
      TenBlog: req.body.TenBlog,
      Anh: req.body.Anh,
      LuotXem: req.body.LuotXem
  };
  const result = await db.collection('blog').updateOne({ _id: ObjectId(req.params.id) }, { $set: updatedBlog });
  if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Blog đã được cập nhật' });
  } else {
      res.status(404).json({ message: 'Không tìm thấy Blog để cập nhật' });
  }
});

// Xóa Blog theo _ID
router.delete('/delete/:id', async (req, res) => {
  const db = await connectDb();
  const result = await db.collection('blog').deleteOne({ _id: ObjectId(req.params.id) });
  if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Blog đã được xóa' });
  } else {
      res.status(404).json({ message: 'Không tìm thấy Blog để xóa' });
  }
});

module.exports = router;
