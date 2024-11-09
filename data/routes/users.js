// users.js ( api phía người dùng: http://localhost:3000/users/login )
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const path = require('path');
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

// Đăng ký người dùng
router.post("/register", upload.single("Anh"), async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const { Email, MatKhau, SDT, TenDangNhap, Ten, NgaySinh, DiaChi, GioiTinh } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Kiểm tra nếu email hoặc tên đăng nhập đã tồn tại
    const existingEmail = await userCollection.findOne({ Email });
    const existingUsername = await userCollection.findOne({ TenDangNhap });
    
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(MatKhau, 10);

    // Tạo người dùng mới
    const newUser = {
      Email,
      MatKhau: hashedPassword,
      SDT,
      TenDangNhap,
      Ten,
      NgaySinh,
      DiaChi,
      GioiTinh,
      Anh: imagePath ? req.file.filename : null,
      IsAdmin: 1, // Hoặc 0 tùy vào yêu cầu
    };

    // Thêm vào cơ sở dữ liệu
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


// Route cập nhật thông tin người dùng
router.put("/updateUser/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const userId = req.params.id; // Lấy userId từ tham số URL

    // Lấy thông tin cần cập nhật từ req.body
    const { Ten, Email, DiaChi, SDT, NgaySinh } = req.body;

    // Kiểm tra xem email mới có trùng với email của người dùng khác hay không
    const existingUser = await userCollection.findOne({ Email, id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Thực hiện cập nhật thông tin người dùng
    const updateUser = await userCollection.updateOne(
      { id: userId }, // Sử dụng userId thay vì uuidv4()
      {
        $set: {
          Ten,
          Email,
          DiaChi,
          SDT,
          NgaySinh,
          // không cần truyền userId vào đây nữa
        },
      }
    );

    if (updateUser.modifiedCount > 0) {
      return res.status(200).json({ message: "Cập nhật thành công" });
    } else {
      return res.status(400).json({ message: "Không có thay đổi nào" });
    }
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.put('/updateprofilepicture/:id', upload.single("Anh"), async (req, res) => {
  try {
    const userId = req.params.id;
    const fileName = req.file ? req.file.filename : null; // Lấy tên file thay vì đường dẫn

    const db = await connectDb(); // Đảm bảo kết nối đến MongoDB
    const userCollection = db.collection('taikhoan');

    // Kiểm tra nếu fileName là null
    if (!fileName) {
      return res.status(400).json({ message: 'Không có ảnh nào được tải lên.' });
    }

    // Cập nhật tên file trong cơ sở dữ liệu
    await userCollection.updateOne(
      { id: userId },
      { $set: { Anh: fileName } } // Cập nhật trường 'Anh' với tên file
    );

    return res.status(200).json({ message: 'Cập nhật ảnh thành công!', image: fileName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi!' });
  }
});

router.put("/updatepassword/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Kết nối tới MongoDB và chọn collection 'taikhoan'
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng theo ID
    const user = await userCollection.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Kiểm tra nếu user.MatKhau không hợp lệ
    if (!user.MatKhau) {
      return res.status(400).json({ message: 'Mật khẩu không hợp lệ.' });
    }

    console.log('Old Password:', oldPassword); // Kiểm tra giá trị oldPassword
    console.log('User Password Hash:', user.MatKhau); // Kiểm tra giá trị mật khẩu hash trong DB

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.MatKhau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng.' });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Sử dụng newPassword

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await userCollection.updateOne(
      { id: userId },
      { $set: { MatKhau: hashedPassword } } // Đảm bảo tên biến đồng nhất
    );

    return res.status(200).json({ message: 'Đổi mật khẩu thành công.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đổi mật khẩu.' });
  }
});

// Đăng nhập người dùng

// Đăng nhập người dùng
// Đăng nhập người dùng
router.post("/login", async (req, res, next) => {
  const { usernameOrEmail, MatKhau } = req.body;
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng bằng username hoặc email
    const user = await userCollection.findOne({
      $or: [{ TenDangNhap: usernameOrEmail }, { Email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(403).json({
        message: "Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.",
      });
    }

    // So sánh mật khẩu không đồng bộ
    const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo access token (ngắn hạn, ví dụ 15 phút)
    const token = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
        Ten: user.Ten,
        IsAdmin: user.IsAdmin,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: '15m' } // access token có thời gian sống ngắn
    );

    // Tạo refresh token (dài hạn, ví dụ 7 ngày)
    const refreshToken = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
      },
      process.env.JWT_REFRESH_SECRET || "refreshsecretkey",
      { expiresIn: '7d' } // refresh token có thời gian sống dài hơn
    );

    // Lưu refresh token vào cookie HttpOnly (bảo mật hơn)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Giúp cookie không thể bị truy cập từ JavaScript (giảm tấn công XSS)
      secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    // Trả về access token và thông tin người dùng (không trả mật khẩu)
    res.status(200).json({
      token: token,
      TenDangNhap: user.TenDangNhap,
      Email: user.Email,
      SDT: user.SDT,
      Ten: user.Ten,
      IsAdmin: user.IsAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});


// Refresh token
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token không tồn tại." });
  }

  try {
    // Xác minh refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "refreshsecretkey");

    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    // Tìm người dùng dựa trên email hoặc tên đăng nhập trong refresh token
    const user = await userCollection.findOne({ Email: decoded.Email });

    if (!user) {
      return res.status(403).json({ message: "Tài khoản không tồn tại." });
    }

    // Tạo lại access token (ngắn hạn)
    const newAccessToken = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
        Ten: user.Ten,
        IsAdmin: user.IsAdmin,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: '15m' } // Access token mới có thời gian sống ngắn
    );

    // Trả về access token mới
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Refresh token không hợp lệ hoặc đã hết hạn." });
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
router.get("/users/:id/Ten", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  let id = req.params.id;

  try {
    const user = await userCollection.findOne(
      { _id: ObjectId(id) }, // Sử dụng ObjectId
      { projection: { Ten: 1 } } // Chỉ lấy trường Ten
    );
    if (user) {
      res.status(200).json({ Ten: user.Ten });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});



// API lấy thông tin người dùng dựa trên token
router.get("/detailuser", async (req, res, next) => {
  // Lấy token từ header 'Authorization'
  const token = req.headers.authorization;

  // Kiểm tra xem có token không
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Tách token từ "Bearer <token>"
  const bearerToken = token.split(' ')[1];

  // Xác minh token
  jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // Nếu token hợp lệ, tiến hành truy vấn người dùng từ cơ sở dữ liệu
    try {
      const db = await connectDb();
      const userCollection = db.collection('taikhoan');
      
      // Tìm người dùng dựa trên email trong token (decoded.Email)
      const userInfo = await userCollection.findOne({ Email: decoded.Email });

      if (userInfo) {
        // Trả về thông tin người dùng
        return res.status(200).json(userInfo);
      } else {
        // Nếu không tìm thấy người dùng
        return res.status(404).json({ message: "Không tìm thấy người dùng với email này" });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ message: 'Lỗi truy vấn cơ sở dữ liệu' });
    }
  });
});




module.exports = router;