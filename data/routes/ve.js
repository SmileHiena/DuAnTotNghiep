const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');

//--------------------------- API vé --------------------------------//

// Lấy danh sách vé, kèm thông tin khách hàng
router.get('/tickets', async (req, res) => {
  try {
    const db = await connectDb();
    const ticketsCollection = db.collection('ve');
    const customersCollection = db.collection('khachhang');

    // Lấy danh sách vé
    const tickets = await ticketsCollection.find().toArray();

    // Kết hợp thông tin khách hàng dựa trên MaTaiKhoan
    const ticketsWithCustomers = await Promise.all(
      tickets.map(async (ticket) => {
        const customer = await customersCollection.findOne({ id: ticket.MaTaiKhoan });
        return {
          ...ticket,
          KhachHang: customer, // Gắn thông tin khách hàng vào mỗi vé
        };
      })
    );

    res.status(200).json(ticketsWithCustomers);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});

// Lấy chi tiết vé theo id
router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDb();
    const ticketsCollection = db.collection('ve');
    const customersCollection = db.collection('khachhang');

    // Tìm vé theo id
    const ticket = await ticketsCollection.findOne({ id: Number(id) });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Lấy thông tin khách hàng
    const customer = await customersCollection.findOne({ id: ticket.MaTaiKhoan });
    res.status(200).json({ ...ticket, KhachHang: customer });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
});

// Thêm vé mới
router.post('/tickets', async (req, res) => {
  const { NgayXuatChieu, GheNgoi, SoLuong, GiaVe, TrangThai, MaXuatChieu, MaTaiKhoan } = req.body;
  try {
    const db = await connectDb();
    const ticketsCollection = db.collection('ve');

    // Lấy mã vé mới
    const lastTicket = await ticketsCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastTicket.length > 0 ? lastTicket[0].id + 1 : 1;

    // Thêm vé vào DB
    const newTicket = {
      id: newId,
      NgayXuatChieu,
      GheNgoi,
      SoLuong,
      GiaVe,
      TrangThai,
      MaXuatChieu,
      MaTaiKhoan,
    };
    await ticketsCollection.insertOne(newTicket);

    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
});

// Cập nhật vé
router.put('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { NgayXuatChieu, GheNgoi, SoPhong, GiaVe, TrangThai, MaXuatChieu, MaTaiKhoan } = req.body;
  try {
    const db = await connectDb();
    const ticketsCollection = db.collection('ve');

    // Tìm vé theo id và cập nhật
    const updatedTicket = await ticketsCollection.findOneAndUpdate(
      { id: Number(id) },
      { $set: { NgayXuatChieu, GheNgoi, SoPhong, GiaVe, TrangThai, MaXuatChieu, MaTaiKhoan } },
      { returnDocument: 'after' }
    );

    if (!updatedTicket.value) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(updatedTicket.value);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Failed to update ticket' });
  }
});

// Xóa vé
router.delete('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDb();
    const ticketsCollection = db.collection('ve');

    // Xóa vé theo id
    const deletedTicket = await ticketsCollection.deleteOne({ id: Number(id) });

    if (deletedTicket.deletedCount === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
});

module.exports = router;
