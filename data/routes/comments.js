var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { getUserFromToken } = require('./middleware');


//Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/'); // Thư mục lưu trữ ảnh
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Tên file độc nhất
  }
});

//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
const connectDb = require('../models/db');

//---------------------------Products--------------------------------//
// Generate a token for password reset
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

// GET /api/comments?movieId=:movieId

router.get("/", async (req, res) => {
    try {
      const movieId = req.query.movieId; // Lấy movieId từ query (nếu có)
      const userId = req.query.userId; // Lấy userId từ query (nếu có)
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan"); // Đảm bảo collection tên đúng
  
      // Xây dựng query để lọc
      const query = {};
  
      // Nếu có movieId, thêm điều kiện lọc theo movieId
      if (movieId) {
        query.movieId = movieId;
      }
  
      // Nếu có userId, thêm điều kiện lọc theo userId
      if (userId) {
        query.userId = userId;
      }
  
      // Tìm bình luận dựa trên query đã xây dựng
      const comments = await commentsCollection.find(query).toArray();
  
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });


  router.get("/:movieId", async (req, res) => {
    try {
        const { movieId } = req.params;
        const db = await connectDb();
        const commentsCollection = db.collection("binhluan");
        
        const comments = await commentsCollection.find({ movieId }).toArray();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Failed to fetch comments" });
    }
});
  
  // Thêm bình luận mới
  router.post("/", getUserFromToken, async (req, res) => {
    try {
        const { movieId, content } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!movieId || !content) {
            return res.status(400).json({ message: "movieId và content là bắt buộc" });
        }

        const { user } = req; // Lấy thông tin người dùng từ req

        const db = await connectDb();
        const commentsCollection = db.collection("binhluan");

        const newComment = {
            movieId,
            userId: user._id, // Sử dụng user ID từ req.user
            content,
            username: user.TenDangNhap, // Tên người dùng
            userImage: user.Anh, // Ảnh người dùng
            timestamp: new Date(),
        };

        await commentsCollection.insertOne(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Failed to add comment" });
    }
});
  
  // Cập nhật bình luận
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan");
  
      const updatedComment = await commentsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { content } },
        { returnDocument: "after" }
      );
  
      res.status(200).json(updatedComment.value);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ message: "Failed to update comment" });
    }
  });
  
  // Xóa bình luận
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const db = await connectDb();
      const commentsCollection = db.collection("binhluan");
  
      await commentsCollection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });






module.exports = router;