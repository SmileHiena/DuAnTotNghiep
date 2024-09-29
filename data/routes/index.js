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

//---------------------------Products--------------------------------//
// Generate a token for password reset
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

router.get('/', async (req, res, next) => {
  res.render('api');
});


// Lấy sản phẩm hot
router.get('/products/hot', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const hotProducts = await productCollection.find({ hot: 1 }).toArray();
    if (hotProducts.length > 0) {
      res.status(200).json(hotProducts);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm nào được đánh dấu là hot" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy sản phẩm bestsale
router.get('/products/bestsale', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const bestsaleProducts = await productCollection.find({ bestsale: 1 }).toArray();
    if (bestsaleProducts.length > 0) {
      res.status(200).json(bestsaleProducts);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm nào được đánh dấu là bestsale" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

//Trả về json danh sách sản phẩm
router.get('/phim', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('phim');
  const phim = await productCollection.find().toArray();
  if (phim) {
    res.status(200).json(phim);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Trả về json sản phẩm theo id
router.get('/products/:id', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  let id = req.params.id;
  const product = await productCollection.findOne({ id: parseInt(id) });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Thêm sản phấm
router.post('/addproduct',  upload.single('image'), async (req, res, next) => {
  let { name, price, categoryId, description } = req.body;
  const db = await connectDb();
  const image = req.file.originalname;
  const productCollection = db.collection('products');
  let lastProduct = await productCollection.find().sort({ id: - 1 }).limit(1).toArray();
  let id = lastProduct[0] ? lastProduct[0].id + 1 : 1;
  let newProduct = { id, name, price, categoryId, image, description };
  try {
    const result = await productCollection.insertOne(newProduct);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});

//Sửa sản phấm trả về json
router.put('/products/:id', upload.single('image'), async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const productCollection = db.collection('products');
  let { name, price, categoryId, description } = req.body;
  if (req.file) {
      var image = req.file.originalname;
  } else {
      let product = await productCollection.findOne({ id: parseInt(id) });
      var image = product.image;
  }
  let editProduct = { name, price, categoryId, image, description };
  product = await productCollection.updateOne({ id: parseInt(id) }, { $set: editProduct });
  if (product) {
      res.status(200).json(editProduct);
  } else {
      res.status(404).json({ message: 'Not found' });
  }
})

router.put('/updateproduct/:id', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const id = new ObjectId(req.params.id);
  const { name, price, description, categoryId } = req.body;
  let updatedProduct = { name, price, description, categoryId }; 

  if (req.file) {
    const image = req.file.originalname;
    updatedProduct.image = image; //
  }

  try {
    const result = await productCollection.updateOne({ id: id }, { $set: updatedProduct });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// router.post('/addproduct', upload.single('image'), async (req, res, next) => {
//   const db = await connectDb();
//   const productCollection = db.collection('products');
//   const { name, price, description, categoryId } = req.body;
//   const image = req.file.originalname;
//   const newProduct = { name, price, description, categoryId, image };

//   try {
//     const result = await productCollection.insertOne(newProduct);
//     // Check if insertedId exists (indicates successful insertion)
//     if (result.insertedId) {
//       res.status(200).json({ message: "Thêm sản phẩm thành công" });
//     } else {
//       res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
//   }
// });


//Xóa sản phẩm trả về json
router.delete('/products/:id', async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const productCollection = db.collection('products');
  let product = await productCollection.deleteOne({ id: parseInt(id) });
  if (product) {
    res.status(200).json({ message: 'Xóa thành công' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
})

//---------------------------Categories--------------------------------//

// Lấy danh sách các danh mục
router.get('/categories', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('categories');
    const categories = await categoriesCollection.find().toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm danh mục mới
router.post('/categories', upload.single('image'), async (req, res, next) => {
  try {
      const db = await connectDb();
      const image = req.file ? req.file.filename : null;
      const categoriesCollection = db.collection('categories');
      let { name } = req.body;
      let lastCategory = await categoriesCollection.find().sort({ id: -1 }).limit(1).toArray();
      let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
      let newCategory = { id, name, image };
      await categoriesCollection.insertOne(newCategory);
      res.status(201).json(newCategory);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Lấy danh mục theo ID
router.get('/categories/:id', async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const db = await connectDb();
    const categoriesCollection = db.collection('categories');
    const category = await categoriesCollection.findOne({ id: categoryId });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sửa danh mục
router.put('/categories/:id', upload.single('image'), async (req, res, next) => {
  try {
    const db = await connectDb();
    const image = req.file ? req.file.filename : null;
    const categoriesCollection = db.collection('categories');
    let { name } = req.body;
    let editCategory = { name, image };
    await categoriesCollection.updateOne({ id: parseInt(req.params.id) }, { $set: editCategory });
    res.status(200).json(editCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa danh mục
router.delete('/categories/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const db = await connectDb();
    const categoriesCollection = db.collection('categories');
    await categoriesCollection.deleteOne({ id: parseInt(id) });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//---------------------------Mới Học--------------------------------//

// Lấy danh sách sản phẩm theo Mã danh mục
router.get('/products/categoryId/:id', async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id); // Lấy category ID từ request params
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ categoryId: categoryId }).toArray();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm cho danh mục này.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách sản phẩm theo Tên danh mục
router.get('/products/categoryName/:name', async (req, res, next) => {
  try {
    const categoryName = req.params.name;
    const db = await connectDb();
    const categoriesCollection = db.collection('categories');
    const category = await categoriesCollection.findOne({ name: { $regex: categoryName, $options: 'i' } });
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    }
    const categoryId = category.id;
    const productCollection = db.collection('products');
    const products = await productCollection.find({ categoryId: categoryId }).toArray();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm cho danh mục này.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trả về danh sách sản phẩm dựa trên từ khóa tìm kiếm
router.get('/products/search/:keyword', async (req, res, next) => {
  try {
    let keyword = req.params.keyword;
    const regexKeyword = new RegExp(keyword, 'i');
    const regexKeywordWithK = new RegExp(keyword.replace(/[kK]/g, '[kK]?'), 'i');
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ $or: [{ name: regexKeyword }, { name: regexKeywordWithK }] }).toArray();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào phù hợp với từ khóa tìm kiếm.' });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//---------------------------Users--------------------------------//

//Trả về json danh sách users
router.get('/users', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
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
  const userCollection = db.collection('users');
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
    const userCollection = db.collection('users');
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
  const userCollection = db.collection('users');
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
  const userCollection = db.collection('users');
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
    const userCollection = db.collection('users');
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

