var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb'); // Import ObjectId để tìm kiếm theo ID
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

router.post("/register", upload.single("Anh"), async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const { Email, MatKhau, SDT, TenDangNhap, Ten, NgaySinh, DiaChi, GioiTinh } = req.body;
    const imagePath = req.file ? req.file.path : null;
    // const newId = (await collection.countDocuments()) + 1;
    const { v4: uuidv4 } = require('uuid');
    // Check if the email already exists
    const existingUser = await userCollection.findOne({ Email });
    const User = await userCollection.findOne({ TenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });

    // Hash the password
    }
    if ( User) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    // Hash the password
    }
    const hashPassword = await bcrypt.hash(MatKhau, 10);

    // Create new user object
    const newUser = {
      id: uuidv4(),
      Email,
      NgaySinh,
      DiaChi,
      GioiTinh,
      MatKhau: hashPassword,
      SDT,
      TenDangNhap,
      Ten,
      Anh: imagePath ? req.file.filename : null,
      isAdmin: 1,
    };

    // Insert the new user into the collection
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
    const userId = req.params.id; // lấy id trực tiếp dưới dạng chuỗi

    // Lấy thông tin cần cập nhật từ req.body
    const { Ten, Email, DiaChi, SDT, NgaySinh } = req.body;

    // Kiểm tra xem email mới có trùng với email của người dùng khác hay không
    const existingUser = await userCollection.findOne({ Email, id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Thực hiện cập nhật thông tin người dùng
    const updateUser = await userCollection.updateOne(
      { id: userId },
      {
        $set: {
          Ten,
          Email,
          DiaChi,
          SDT,
          NgaySinh,
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
        Ten: user.Ten,
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
      Ten: user.Ten,
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