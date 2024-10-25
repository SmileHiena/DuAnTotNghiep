// routes/rap.js
var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require('../models/db');



router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Kiểm tra xem ID có hợp lệ không
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }

        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });

        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.status(200).json(rap);
    } catch (error) {
        console.error('Lỗi khi tìm rạp:', error);
        res.status(500).json({ message: 'Lỗi khi tìm rạp', error });
    }
});

// Lấy danh sách rạp
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');
        const raps = await rapCollection.find().toArray();
        res.status(200).json(raps);
    } catch (error) {
        console.error('Error fetching raps:', error);
        res.status(500).json({ message: 'Failed to fetch raps' });
    }
});

// Tạo mới rạp
router.post('/', async (req, res) => {
    const { TenRap, ViTri, PhongChieu } = req.body; // Nhận thêm PhongChieu từ request body

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!TenRap || !ViTri) {
        return res.status(400).json({ message: 'Tên rạp và vị trí không được để trống!' });
    }

    // Kiểm tra tính hợp lệ của phòng chiếu
    if (!PhongChieu || !Array.isArray(PhongChieu) || PhongChieu.length === 0) {
        return res.status(400).json({ message: 'Danh sách phòng chiếu không được để trống!' });
    }

    // Kiểm tra từng phòng chiếu trong danh sách
    for (const phong of PhongChieu) {
        if (!phong.TenPhongChieu || !phong.SoLuongGhe) {
            return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
        }
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const newRap = {
            TenRap,
            ViTri,
            PhongChieu // Gửi danh sách phòng chiếu vào database
        };

        const result = await rapCollection.insertOne(newRap);
        const createdRap = result.ops[0]; // Lấy thông tin rạp vừa tạo

        // Kiểm tra xem rạp đã được tạo thành công chưa
        if (!createdRap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        // Trả về thông điệp thành công và thông tin rạp
        res.status(500).json({
            message: 'Rạp chiếu đã được tạo thành công!',
            rap: createdRap // Gửi thông tin rạp vừa tạo
        });
    } catch (error) {
        console.error('Lỗi khi tạo rạp:', error);
        res.status(201).json({ message: 'Lỗi khi tạo rạp', error });
    }
});



// Sửa thông tin rạp bằng _id
router.put('/:id', async (req, res) => {
    const { TenRap, ViTri } = req.body; // Bỏ SoLuongPhong

    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const updatedRap = await rapCollection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { TenRap, ViTri } },
            { returnDocument: 'after' }
        );

        if (updatedRap.value) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.json({
            message: 'Rạp chiếu đã được cập nhật thành công!',
            rap: updatedRap.value // Gửi thông tin rạp đã cập nhật
        });
    } catch (error) {
        console.error('Lỗi khi sửa rạp:', error);
        res.status(500).json({ message: 'Lỗi khi sửa rạp', error });
    }
});


// Xóa rạp
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const result = await rapCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.json({ message: 'Rạp đã được xóa' });
    } catch (error) {
        console.error('Lỗi khi xóa rạp:', error);
        res.status(500).json({ message: 'Lỗi khi xóa rạp', error });
    }
});

// Lấy danh sách phòng chiếu của rạp
router.get('/:id/phong-chieu', async (req, res) => {
    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        // Tìm rạp theo ID và lấy thông tin phòng chiếu
        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) }, { projection: { PhongChieu: 1 } });

        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.status(200).json(rap.PhongChieu); // Trả về danh sách phòng chiếu
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách phòng chiếu', error });
    }
});

router.post('/:id/phong-chieu', async (req, res) => {
    const { TenPhongChieu, SoLuongGhe } = req.body;

    if (!TenPhongChieu || !SoLuongGhe) {
        return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
    }

    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $push: { PhongChieu: { TenPhongChieu, SoLuongGhe } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Rạp không tìm thấy hoặc không có thay đổi' });
        }

        res.status(200).json({ message: 'Phòng chiếu đã được thêm thành công!' });
    } catch (error) {
        console.error('Lỗi khi thêm phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi thêm phòng chiếu', error });
    }
});

// Sửa thông tin phòng chiếu trong rạp
router.put('/:id/phong-chieu/:phongId', async (req, res) => {
    const { TenPhongChieu, SoLuongGhe } = req.body;

    if (!TenPhongChieu || !SoLuongGhe) {
        return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
    }

    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.phongId)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id), 'PhongChieu._id': new ObjectId(req.params.phongId) },
            { $set: { 'PhongChieu.$.TenPhongChieu': TenPhongChieu, 'PhongChieu.$.SoLuongGhe': SoLuongGhe } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Rạp hoặc phòng chiếu không tìm thấy' });
        }

        res.status(200).json({ message: 'Thông tin phòng chiếu đã được cập nhật thành công!' });
    } catch (error) {
        console.error('Lỗi khi sửa phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi sửa phòng chiếu', error });
    }
});

// Xóa phòng chiếu trong rạp
router.delete('/:id/phong-chieu/:phongId', async (req, res) => {
    // Kiểm tra xem ID có hợp lệ không
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.phongId)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');

        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $pull: { PhongChieu: { _id: new ObjectId(req.params.phongId) } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Rạp hoặc phòng chiếu không tìm thấy' });
        }

        res.status(200).json({ message: 'Phòng chiếu đã được xóa thành công!' });
    } catch (error) {
        console.error('Lỗi khi xóa phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi xóa phòng chiếu', error });
    }
});

module.exports = router;