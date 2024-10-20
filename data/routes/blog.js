var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, (file.originalname));
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

// Fetch all blogs
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const blogCollection = db.collection("blog");
    const blogs = await blogCollection.find().toArray();

    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch blog by _ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const blog = await db.collection('blog').findOne({ _id: ObjectId(req.params.id) });

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// API to add a new blog
router.post("/add", upload.single('Anh'), async (req, res) => {
  try {

    // Parse newBlog from req.body
    const newBlog = JSON.parse(req.body.newBlog);

    let Anh = req.file ? `/images/${req.file.filename}` : ""; // Ensure correct path

    const blogData = {
      _id: new ObjectId(),
      TenBlog: newBlog.TenBlog,
      Anh: Anh,
      LuotXem: newBlog.LuotXem,
      NoiDung: newBlog.NoiDung || "", // Default empty string if not provided
      TacGia: newBlog.TacGia || "",   // Default empty string if not provided
      NgayDang: newBlog.NgayDang || new Date(), // Default to current date if not provided
    };

    const db = await connectDb();
    const blogCollection = db.collection("blog");
    await blogCollection.insertOne(blogData);

    res.status(201).json(blogData);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Failed to add blog", error: error.message });
  }
});


// API to edit a blog
router.put("/edit/:id", upload.single('Anh'), async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Incoming newBlog data:", req.body.newBlog);
    const updatedBlog = JSON.parse(req.body.newBlog); // Make sure this is correct

    const updateData = {
      TenBlog: updatedBlog.TenBlog,
      LuotXem: updatedBlog.LuotXem,
    };

    if (req.file) {
      updateData.Anh = `/images/blogs/${req.file.filename}`;
    }

    const db = await connectDb();
    const blogCollection = db.collection("blog");
    const result = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog: updateData });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog", error: error });
  }
});


// Delete blog by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const { id } = req.params;

    const result = await db.collection('blog').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;