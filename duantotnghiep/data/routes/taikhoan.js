const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const multer = require("multer");
const sharp = require('sharp');
const path = require('path');
const bcrypt = require('bcrypt');

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Đường dẫn lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Sử dụng tên gốc của file
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
const upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

router.post('/register', upload.single('Anh'), async (req, res) => {
  const { Ten, Email, PassWord, TenDangNhap, SDT } = req.body;
  const Anh = req.file ? `/images/${req.file.filename}` : null; // Đường dẫn ảnh đã lưu
  if (!PassWord || PassWord.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan'); 

    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await collection.findOne({ Email });
    const nameLogin = await collection.findOne({ TenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại!' });
    }
    if (nameLogin) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
    }

    // Lấy id tiếp theo từ bộ đếm
    const newId = (await collection.countDocuments()) + 1;

    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(PassWord, 10); // Bcrypt mã hóa với saltRounds = 10

    // Tạo người dùng mới
    const newUser = {
      id: newId,
      Ten: Ten || "",
      SDT,
      NgaySinh: new Date("1990-10-10"), // Giá trị mặc định
      GioiTinh: "",
      Anh,
      TenDangNhap,
      PassWord: hashedPassword,
      Email,
      FullName: Ten || "",
      IsAdmin: false,
      DiaChi: "123 Đường ABC, Quận 1, TP. HCM", // Giá trị mặc định
    };

    // Chèn người dùng mới vào database
    await collection.insertOne(newUser);
    res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error); // Ghi log lỗi
    res.status(500).json({ message: 'Có lỗi xảy ra!', error: error.message });
  }
});


const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Thay thế bằng khóa bí mật của bạn

router.post('/login', async (req, res) => {
  const { EmailOrUsername, PassWord } = req.body; // Nhận cả email hoặc tên đăng nhập

  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    // Tìm người dùng bằng email hoặc tên đăng nhập
    const user = await collection.findOne({
      $or: [
        { Email: EmailOrUsername },      // Tìm theo email
        { TenDangNhap: EmailOrUsername } // Hoặc tìm theo tên đăng nhập
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    // So sánh mật khẩu đã mã hóa
    const isPasswordValid = bcrypt.compareSync(PassWord, user.PassWord); // Sử dụng bcrypt để so sánh

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác!' });
    }

    // Tạo token
    const token = jwt.sign(
      { id: user.id, email: user.Email, username: user.TenDangNhap, anh: user.Anh },
      secretKey,
      { expiresIn: '3h' }
    );

    // Gửi thông tin người dùng và token về client
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      user: {
        id: user.id,
        email: user.Email,
        username: user.TenDangNhap,
        anh: user.Anh,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra!', error: error.message });
  }
});



// Lấy danh sách tài khoản (nếu cần)
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan'); 
    const accounts = await collection.find().toArray();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Lấy thông tin tài khoản theo id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const db = await connectDb();
    const collection = db.collection('taikhoan');
    const account = await collection.findOne({ id: id });

    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản với ID này' });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Kiểm tra tên đăng nhập và số điện thoại có tồn tại hay không
router.post('/check-username', async (req, res) => {
  const { TenDangNhap, SDT } = req.body;

  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const existingUser = await collection.findOne({ TenDangNhap });
    const existingPhone = await collection.findOne({ SDT });

    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
    }

    if (existingPhone) {
      return res.status(400).json({ message: 'Số điện thoại đã tồn tại.' });
    }

    return res.status(200).json({ message: 'Tên đăng nhập và số điện thoại hợp lệ.' });
  } catch (error) {
    console.error('Có lỗi xảy ra khi kiểm tra tên đăng nhập hoặc số điện thoại:', error);
    return res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình kiểm tra.' });
  }
});





// Thêm tài khoản
router.post('/add', upload.single('Anh'), async (req, res) => {
  try {
    const { Ten, TenDangNhap, DiaChi, NgaySinh, GioiTinh, SDT, Email } = req.body;

    if (!req.body.MatKhau) {
      return res.status(400).json({ message: 'Mật khẩu là bắt buộc' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Ảnh là bắt buộc' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.MatKhau, 10);

    const db = await connectDb();
    const collection = db.collection('taikhoan'); // Thay 'taikhoan' bằng tên collection thực tế

    const Anh = `/images/${req.file.filename}`;

    const newId = (await collection.countDocuments()) + 1; // Tạo ID mới

    const newAccount = {
      id: newId,
      Ten,
      TenDangNhap,
      MatKhau: hashedPassword,
      Anh,
      DiaChi,
      NgaySinh,
      GioiTinh,
      SDT,
      Email,
      FullName: Ten,
      IsAdmin: false, // Mặc định là false, có thể thay đổi
    };

    await collection.insertOne(newAccount);
    res.status(201).json({ message: 'Tài khoản đã được thêm thành công', account: newAccount });
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm tài khoản:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm tài khoản', error: error.message });
  }
});

// Sửa thông tin tài khoản
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
  try {
    const { id } = req.params;
    const { Ten, TenDangNhap, DiaChi, NgaySinh, GioiTinh, SDT, Email } = req.body;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const updatedAccount = {
      Ten,
      TenDangNhap,
      DiaChi,
      NgaySinh,
      GioiTinh,
      SDT,
      Email
    };

    // Lấy thông tin tài khoản hiện tại để xóa ảnh cũ
    const currentAccount = await collection.findOne({ _id: new ObjectId(id) });

    // Nếu có ảnh mới, cập nhật tên file ảnh
    if (req.file) {
      updatedAccount.Anh = req.file.filename; // Lưu tên file ảnh mới

      // Xóa ảnh cũ nếu có
      if (currentAccount.Anh) {
        const oldImagePath = path.join(__dirname, '../public/images/', currentAccount.Anh);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Có lỗi xảy ra khi xóa ảnh cũ:', err);
          }
        });
      }
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedAccount });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để cập nhật' });
    } else {
      res.json({ message: 'Cập nhật thông tin tài khoản thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Xóa tài khoản
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để xóa' });
    } else {
      res.json({ message: 'Tài khoản đã được xóa thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Khóa tài khoản
router.put('/lock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { IsAdmin: false } }); // Hoặc một trường trạng thái khác
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để khóa' });
    } else {
      res.json({ message: 'Tài khoản đã bị khóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Mở khóa tài khoản
router.put('/unlock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { IsAdmin: true } }); // Hoặc trường trạng thái khác để mở khóa
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để mở khóa' });
    } else {
      res.json({ message: 'Tài khoản đã được mở khóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

module.exports = router;
