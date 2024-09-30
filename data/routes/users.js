var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


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
const connectDb = require('../model/db');



//---------------------------Users--------------------------------//

//Trả về json danh sách users
router.get('/', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('taikhoan');
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Trả về json users theo id
router.get('/users/:id', async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let id = req.params.id;
  const users = await usersCollection.findOne({ id: parseInt(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Sửa thông tin người dùng
router.put('/users/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    // Kiểm tra định dạng ObjectId hợp lệ
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    const db = await connectDb();
    const usersCollection = db.collection('users');
    const { fullname, phoneNumber } = req.body;
    const editUserInfo = { fullname, phoneNumber };

    const result = await usersCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: editUserInfo }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    res.status(200).json(editUserInfo);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
  }
});

//Thêm người dùng
router.post('/users', upload.single('image'), async (req, res, next) => {
  try {
    const {firstName, lastName, userName, password, email, role} = req.body;
    const image = req.file ? req.file.filename : null;
    const db = await connectDb();
    const usersCollection = db.collection('users');
    const lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    const id = lastUser[0] ? lastUser[0].id + 1 : 1;
    const newUser = {
    id,
    firstName,
    lastName,
    email,
    userName,
    password,
    image,
    isAdmin: false
  };
    await usersCollection.insertOne(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Xóa users
router.delete('/users/:id', async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let user = await usersCollection.deleteOne({ id: parseInt(id) });
  if (user) {
    res.status(200).json({ message: 'Xoa thanhkong.' });
  } else {
    res.status(404).json({ message: 'Xoa khong thanhkong.' });
  }
});

router.post('/users/register', upload.single('image'), async (req, res, next) => {
  let { email, password, username, fullname  } = req.body;
  const image = req.file ? req.file.filename : null;
  const db = await connectDb();
  const userCollection = db.collection('taikhoan');
  let user = await userCollection.findOne({ email: email });
  if (user) {
    res.status(409).json({ message: "Email đã tồn tại" });
  } else {
    let lastuser = await userCollection.find().sort({ id: -1 }).limit(1).toArray();
    let id = lastuser[0] ? lastuser[0].id + 1 : 1;
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    let newUser = { id: id, email, password: hashPassword, image, username, fullname, isAdmin: 0 };
    try {
      let result = await userCollection.insertOne(newUser);
      console.log(result);
      res.status(200).json({ message: "Đăng ký thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi thêm người dùng mới" });
    }
  }
})

const jwt = require('jsonwebtoken');

router.post('/users/login', upload.single('image'), async (req, res, next) => {
  let { email, password } = req.body;
    
    const db = await connectDb();
    const userCollection = db.collection('taikhoan');
  let user = await userCollection.findOne({ email: email });

    if (user) {
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin
      }, 'secretkey', { expiresIn: '1h' });

      res.status(200).json({ token: token, email: user.email, username: user.username, fullname: user.fullname, image: user.image });
      } else {
      res.status(403).json({ message: 'Email hoặc mật khẩu không đúng cho lắm' })
      }
    } else {
    res.status(403).json({ messsage: 'Đăng ký cái nhẹ đi bạn ơi' });
  }
});

// const bcrypt = require('bcryptjs');
router.post('/register', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('taikhoan');
  const { email, password, name, username, fullname } = req.body;
  const image = req.file ? req.file.path : null;
  const user = await userCollection.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashPassword,
      name,
      username,
      fullname,
      image: req.file.filename,
      role: 'user'
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
  }
});

//đăng nhập
// const jwt = require('jsonwebtoken');
router.post('/login', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('taikhoan');
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }
  const token = jwt.sign({ email: user.email, role: user.role }, 'secret', { expiresIn: '1h' });
  res.status(200).json({ token });
});



//Kiểm tra token qua Bearer

router.get('/checktoken', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  }
  );
}
);


//lấy thông tin chi tiết user qua token
router.get('/detailuser', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret', async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    const db = await connectDb();
    const userCollection = db.collection('taikhoan');
    const userInfo = await userCollection.findOne({ email: user.email });
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  });
});

//Xác thực token
function authenToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Không có quyền truy cập" });
      } else {
        next();
      }
    })
  } else {
    res.status(403).json({ message: "Không có quyền truy cập" });
  }
}
// Trong tệp routes/api.js
router.put('/users/email/:email', async (req, res, next) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection('users');
    const { fullname, phoneNumber } = req.body;
    const editUserInfo = { fullname, phoneNumber };
    const email = req.params.email;

    const updatedUser = await usersCollection.updateOne({ email: email }, { $set: editUserInfo });

    if (updatedUser.modifiedCount > 0) {
      res.status(200).json(editUserInfo);
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng hoặc không có sự thay đổi.' });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
  }
});

router.put('/users/update', upload.single('image'), async (req, res) => {
  try {
      const { id, username, fullname, email } = req.body;
      const updateUser = await User.findById(id);

      if (!updateUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      updateUser.username = username || updateUser.username;
      updateUser.fullname = fullname || updateUser.fullname;
      updateUser.email = email || updateUser.email;
      if (req.file) {
          updateUser.image = req.file.path;
      }

      await updateUser.save();
      res.status(200).json({ message: 'User updated successfully', image: updateUser.image });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
