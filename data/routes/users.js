var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

// Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Import model
const connectDb = require('../models/db');

// Đăng ký người dùng
router.post('/register', async (req, res, next) => {
    let { email, password, phone, fullname, username } = req.body;
    const db = await connectDb();
    const userCollection = db.collection('users');
    
    let user = await userCollection.findOne({ email: email });
    if (user) {
        return res.status(409).json({ message: "Email đã tồn tại" });
    } 
    
    let lastuser = await userCollection.find().sort({ id: -1 }).limit(1).toArray();
    let id = lastuser[0] ? lastuser[0].id + 1 : 1;
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    let newUser = { id: id, email, password: hashPassword, phone, fullname, username, isAdmin: 0 };
    
    try {
        await userCollection.insertOne(newUser);
        res.status(200).json({ message: "Đăng ký thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm người dùng mới" });
    }
});

// Đăng nhập người dùng
router.post('/login', async (req, res, next) => {
    let { usernameOrEmail, password } = req.body; // Sử dụng usernameOrEmail

    try {
        const db = await connectDb();
        const userCollection = db.collection('users');

        // Tìm người dùng bằng username hoặc email
        let user = await userCollection.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            return res.status(403).json({ message: 'Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.' });
        }

        // So sánh mật khẩu
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                username: user.username,
                email: user.email,
                phone: user.phone,
                fullname: user.fullname,
                isAdmin: user.isAdmin // Đảm bảo isAdmin được bao gồm trong payload
            }, 'secretkey', { expiresIn: '1h' });
        
            res.status(200).json({ 
                token: token,
                username: user.username, 
                email: user.email, 
                phone: user.phone, 
                fullname: user.fullname, 
                isAdmin: user.isAdmin // Trả về thông tin isAdmin
            });
        }else {
            return res.status(403).json({ message: 'Mật khẩu không chính xác.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});
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

// Thêm API để lấy tên người dùng theo ID
router.get('/users/:id/fullname', async (req, res, next) => {
    const db = await connectDb();
    const userCollection = db.collection('users');
    let id = req.params.id;

    try {
        const user = await userCollection.findOne({ id: parseInt(id) }, { projection: { fullname: 1 } }); // Chỉ lấy trường fullname
        if (user) {
            res.status(200).json({ fullname: user.fullname });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});



// // Xác thực token
// function authenToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1];
//         req.token = bearerToken;
//         jwt.verify(req.token, 'secretkey', (err, authData) => {
//             if (err) {
//                 return res.status(403).json({ message: "Không có quyền truy cập" });
//             } 
//             next();
//         });
//     } else {
//         return res.status(403).json({ message: "Không có quyền truy cập" });
//     }
// }

module.exports = router;
