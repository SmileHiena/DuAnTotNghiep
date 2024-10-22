var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb'); // Import ObjectId để tìm kiếm theo ID

// Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    // Thêm timestamp để tránh xung đột tên file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Import model
const connectDb = require("../models/db");

router.post("/register", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("khachhang");
  const { email, password, phone, username, fullname } = req.body;
  const image = req.file ? req.file.path : null;

  // Kiểm tra xem email đã tồn tại chưa
  const user = await userCollection.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }

  // Mã hóa mật khẩu
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    password: hashPassword,
    phone,
    username,
    fullname,
    image: req.file ? req.file.filename : null, // Lưu tên file ảnh nếu có
    isAdmin: 0, // Gán role mặc định là 'user'
  };

  try {
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      res.status(200).json({ message: "Đăng ký thành công" });
    } else {
      res.status(500).json({ message: "Đăng ký thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// Đăng nhập người dùng
router.post("/login", async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("khachhang");

    // Tìm người dùng bằng username hoặc email
    const user = await userCollection.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res
        .status(403)
        .json({
          message: "Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.",
        });
    }

    // So sánh mật khẩu không đồng bộ
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        phone: user.phone,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
      token: token,
      username: user.username,
      email: user.email,
      phone: user.phone,
      fullname: user.fullname,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});

router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("khachhang");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("khachhang");
  let id = req.params.id;
  
  // Sử dụng ObjectId nếu id là ObjectId trong MongoDB
  const users = await usersCollection.findOne({ _id: ObjectId(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Thêm API để lấy tên người dùng theo ID
router.get("/users/:id/fullname", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("khachhang");
  let id = req.params.id;

  try {
    const user = await userCollection.findOne(
      { _id: ObjectId(id) }, // Sử dụng ObjectId
      { projection: { fullname: 1 } } // Chỉ lấy trường fullname
    ); 
    if (user) {
      res.status(200).json({ fullname: user.fullname });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});

// API để lấy thông tin người dùng chi tiết
router.get('/detailuser', async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        const db = await connectDb();
        const userCollection = db.collection('khachhang');
        const userInfo = await userCollection.findOne({ email: user.email });
        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
    });
});


module.exports = router;