const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/'); // Thư mục lưu trữ ảnh
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname); // Sử dụng tên file gốc
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

// Lấy danh sách nhân viên theo quyền 'NhanVien'
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection('admin');
        const employees = await collection.find({ Quyen: 'NhanVien' }).toArray();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Lấy thông tin nhân viên theo id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');
        const employee = await collection.findOne({ _id: new ObjectId(id) });

        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Thêm nhân viên
router.post('/add', upload.single('Anh'), async (req, res) => {
    try {
        const { HoTen, TenDangNhap, MatKhau, DiaChi, NgaySinh, GioTinh, SDT, ChucVu, Tinhtrang } = req.body;
        const db = await connectDb();
        const collection = db.collection('admin');

        // Tạo đường dẫn ảnh đầy đủ
        const Anh = req.file ? `/images/${req.file.filename}` : null; // Lưu đường dẫn ảnh

        // Tạo ID mới tự động
        const lastEmployees = await collection.find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastEmployees.length > 0 ? lastEmployees[0].id + 1 : 1; // Tạo ID mới

        const newEmployee = {
            id: newId, // Gán ID mới vào đối tượng nhân viên
            HoTen,
            TenDangNhap,
            MatKhau,
            Anh, // Sử dụng đường dẫn ảnh
            DiaChi,
            NgaySinh,
            GioTinh,
            SDT,
            ChucVu,
            Tinhtrang,
            Quyen: 'NhanVien', // Quyền mặc định cho nhân viên
        };

        await collection.insertOne(newEmployee);
        res.status(201).json({ message: 'Nhân viên đã được thêm thành công', employee: newEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});


// Sửa thông tin nhân viên
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
    try {
        const { id } = req.params;
        const { HoTen, TenDangNhap, MatKhau, DiaChi, NgaySinh, GioTinh, SDT, ChucVu, Tinhtrang } = req.body;
        const db = await connectDb();
        const collection = db.collection('admin');

        const updatedEmployee = {
            HoTen,
            TenDangNhap,
            MatKhau,
            DiaChi,
            NgaySinh,
            GioTinh,
            SDT,
            ChucVu,
            Tinhtrang
        };

        // Lấy thông tin nhân viên hiện tại để xóa ảnh cũ
        const currentEmployee = await collection.findOne({ _id: new ObjectId(id) });

        // Nếu có ảnh mới, cập nhật tên file ảnh
        if (req.file) {
            updatedEmployee.Anh = req.file.filename; // Lưu tên file ảnh mới

            // Xóa ảnh cũ nếu có
            if (currentEmployee.Anh) {
                const oldImagePath = path.join(__dirname, '../public/images/', currentEmployee.Anh);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Có lỗi xảy ra khi xóa ảnh cũ:', err);
                    }
                });
            }
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedEmployee });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
        } else {
            res.json({ message: 'Cập nhật thông tin nhân viên thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Xóa nhân viên
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
        } else {
            res.json({ message: 'Nhân viên đã được xóa thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Khóa nhân viên
router.put('/lock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('admin');

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { Tinhtrang: 'Đã khóa' } });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy nhân viên để khóa' });
        } else {
            res.json({ message: 'Nhân viên đã bị khóa' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

module.exports = router;
