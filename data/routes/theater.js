
var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require('../models/db');

router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');


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


router.post('/', async (req, res) => {
    const { TenRap, ViTri, PhongChieu } = req.body;


    if (!TenRap || !ViTri) {
        return res.status(400).json({ message: 'Tên rạp và vị trí không được để trống!' });
    }


    if (!PhongChieu || !Array.isArray(PhongChieu) || PhongChieu.length === 0) {
        return res.status(400).json({ message: 'Danh sách phòng chiếu không được để trống!' });
    }


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
            PhongChieu
        };

        const result = await rapCollection.insertOne(newRap);
        const createdRap = result.ops[0];


        if (!createdRap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }


        res.status(500).json({
            message: 'Rạp chiếu đã được tạo thành công!',
            rap: createdRap
        });
    } catch (error) {
        console.error('Lỗi khi tạo rạp:', error);
        res.status(201).json({ message: 'Lỗi khi tạo rạp', error });
    }
});


router.put('/:id', async (req, res) => {
    const { TenRap, ViTri } = req.body;


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
            rap: updatedRap.value
        });
    } catch (error) {
        console.error('Lỗi khi sửa rạp:', error);
        res.status(500).json({ message: 'Lỗi khi sửa rạp', error });
    }
});


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


router.get('/:id/phong-chieu', async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');


        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) }, { projection: { PhongChieu: 1 } });

        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tìm thấy' });
        }

        res.status(200).json(rap.PhongChieu);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách phòng chiếu', error });
    }
});

router.post('/:id/phong-chieu', async (req, res) => {
    let { TenPhongChieu, SoLuongGhe } = req.body;

    if (!TenPhongChieu || !SoLuongGhe) {
        return res.status(400).json({ message: 'Tên phòng chiếu và số lượng ghế không được để trống!' });
    }

    SoLuongGhe = Number(SoLuongGhe);

    if (isNaN(SoLuongGhe) || SoLuongGhe <= 0) {
        return res.status(400).json({ message: 'Số lượng ghế phải là số hợp lệ lớn hơn 0!' });
    }

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');


        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        const isDuplicate = rap.PhongChieu?.some(
            (phong) =>
                phong.TenPhongChieu.trim().toLowerCase() === TenPhongChieu.trim().toLowerCase()
        );

        if (isDuplicate) {
            return res.status(400).json({ message: 'Tên phòng chiếu đã tồn tại. Vui lòng chọn tên khác!' });
        }


        const nextPhongId = (rap?.PhongChieu?.length || 0) + 1;
        const gheData = generateGheData(TenPhongChieu, SoLuongGhe);

        const newPhongChieu = {
            id: nextPhongId,
            TenPhongChieu,
            SoLuongGhe,
            Ghe: gheData,
        };


        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $push: { PhongChieu: newPhongChieu } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Rạp không tìm thấy hoặc không có thay đổi' });
        }

        res.status(200).json({ message: 'Phòng chiếu đã được thêm thành công!', newPhongChieu });
    } catch (error) {
        console.error('Lỗi khi thêm phòng chiếu:', error);
        res.status(500).json({ message: 'Lỗi khi thêm phòng chiếu', error });
    }
});


function generateGheData(TenPhongChieu, soLuongGhe) {
    const gheData = [];
    const soHang = Math.ceil(soLuongGhe / 10);
    let gheIndex = 1;

    for (let hang = 1; hang <= soHang; hang++) {
        const hangLabel = String.fromCharCode(64 + hang);
        const danhSachGhe = [];

        for (let i = 1; i <= 10 && gheIndex <= soLuongGhe; i++) {
            danhSachGhe.push(`${hangLabel}${i}`);
            gheIndex++;
        }

        gheData.push({ Hang: hangLabel, Ghe: danhSachGhe });
    }

    return gheData;
}

router.put('/:id/phong-chieu/:phongId', async (req, res) => {
    const { TenPhongChieu, SoLuongGhe, Ghe } = req.body;


    if (!TenPhongChieu || !SoLuongGhe || !Ghe) {
        return res.status(400).json({ message: 'Tên phòng chiếu, số lượng ghế và danh sách ghế không được để trống!' });
    }


    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID rạp không hợp lệ' });
    }


    const phongId = Number(req.params.phongId);
    if (isNaN(phongId) || phongId <= 0) {
        return res.status(400).json({ message: 'ID phòng chiếu phải là một số hợp lệ' });
    }

    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');


        const rap = await rapCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!rap) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        const isDuplicate = rap.PhongChieu?.some(
            (phong) =>
                phong.TenPhongChieu.trim().toLowerCase() === TenPhongChieu.trim().toLowerCase() &&
                phong.id !== phongId
        );

        if (isDuplicate) {
            return res.status(400).json({ message: 'Tên phòng chiếu đã tồn tại. Vui lòng chọn tên khác!' });
        }


        const result = await rapCollection.updateOne(
            { _id: new ObjectId(req.params.id), 'PhongChieu.id': phongId },
            {
                $set: {
                    'PhongChieu.$.TenPhongChieu': TenPhongChieu,
                    'PhongChieu.$.SoLuongGhe': SoLuongGhe,
                    'PhongChieu.$.Ghe': Ghe,
                },
            }
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


router.delete('/:id/phong-chieu/:phongId', async (req, res) => {
    const { id, phongId } = req.params;
    console.log('Theater ID:', id);
    console.log('Room ID:', phongId);
    try {
        const db = await connectDb();
        const rapCollection = db.collection('rap');
        if (isNaN(phongId)) {
            return res.status(400).json({ message: 'ID phòng chiếu không hợp lệ' });
        }

        const result = await rapCollection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { PhongChieu: { id: Number(phongId) } } }
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



router.get('/phongchieu/:id', async (req, res) => {
    const roomId = req.params.id;
    try {
        const db = await connectDb();
        const cinemasCollection = db.collection('rap');
        const cinema = await cinemasCollection.findOne(
            { "PhongChieu.id": parseInt(roomId) },
            { projection: { "PhongChieu.$": 1 } }
        );

        if (cinema && cinema.PhongChieu.length > 0) {
            res.status(200).json(cinema.PhongChieu[0]);
        } else {
            res.status(404).json({ message: 'Screening room not found' });
        }
    } catch (error) {
        console.error('Error fetching screening room:', error);
        res.status(500).json({ message: 'Failed to fetch screening room' });
    }
});

module.exports = router;