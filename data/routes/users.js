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

router.post("/register", upload.single("Anh"), async (req, res) => { // Thay "image" thành "Anh"
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const { Email, MatKhau, SDT, TenDangNhap, Ten, NgaySinh, DiaChi, GioiTinh } = req.body; // Thay "FullName" thành "Ten"
    const imagePath = req.file ? req.file.path : null;
    
    // Tạo ID mới bằng cách đếm số lượng tài liệu
    const newId = (await userCollection.countDocuments()) + 1;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await userCollection.findOne({ Email });
    const User = await userCollection.findOne({ TenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    
    if (User) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(MatKhau, 10);

    // Tạo đối tượng người dùng mới
    const newUser = {
      userId: newId,  // Sử dụng ID tự động
      Email,
      NgaySinh,
      DiaChi,
      GioiTinh,
      MatKhau: hashPassword,
      SDT,
      TenDangNhap,
      Ten, // Thay "FullName" thành "Ten"
      Anh: imagePath ? req.file.filename : null, // Thay "image" thành "Anh"
      isAdmin: false,
    };

    // Thêm người dùng mới vào bộ sưu tập
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      return res.status(200).json({ message: "Đăng ký thành công" });
    } else {
      return res.status(500).json({ message: "Đăng ký thất bại" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// Đăng nhập người dùng
router.post("/login", async (req, res, next) => {
  const { usernameOrEmail, MatKhau } = req.body;
  console.log(req.body)
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng bằng username hoặc email
    const user = await userCollection.findOne({
      $or: [{ TenDangNhap: usernameOrEmail }, { Email: usernameOrEmail }],
    });

    if (!user) {
      return res
        .status(403)
        .json({
          message: "Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.",
        });
    }

    // So sánh mật khẩu không đồng bộ
    const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
        Ten: user.Ten, // Thay "FullName" thành "Ten"
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
      token: token,
      TenDangNhap: user.TenDangNhap,
      Email: user.Email,
      SDT: user.SDT,
      Ten: user.Ten, // Thay "FullName" thành "Ten"
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});

router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("taikhoan");
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
router.get("/users/:id/ten", async (req, res, next) => { // Thay "/fullname" thành "/ten"
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  let id = req.params.id;

  try {
    const user = await userCollection.findOne(
      { _id: ObjectId(id) }, // Sử dụng ObjectId
      { projection: { Ten: 1 } } // Thay "fullname" thành "Ten"
    ); 
    if (user) {
      res.status(200).json({ Ten: user.Ten }); // Thay "fullname" thành "Ten"
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
        const userCollection = db.collection('taikhoan');
        const userInfo = await userCollection.findOne({ Email: user.Email });
        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
    });
});

module.exports = router;
