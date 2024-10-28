var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');

//---------------------------Showtimes (Suất Chiếu)--------------------------------//

// Lấy danh sách suất chiếu
router.get('/', async (req, res) => {
  try {
    const { IdPhong } = req.query; // Get IdPhong from query parameters
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');

    const query = IdPhong ? { IdPhong: parseInt(IdPhong) } : {}; // Filter by IdPhong if provided
    const showtimes = await showtimesCollection.find(query).toArray();

    res.status(200).json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ message: 'Failed to fetch showtimes' });
  }
});

// Thêm suất chiếu mới
router.post('/', async (req, res) => {
  try {
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');
    const newShowtime = {
      id: req.body.id,
      NgayChieu: req.body.NgayChieu,
      IdPhim: parseInt(req.body.IdPhim),
      IdPhong: parseInt(req.body.IdPhong)
    };

    const result = await showtimesCollection.insertOne(newShowtime);
    res.status(201).json({ message: 'Showtime added successfully', showtimeId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding showtime', error });
  }
});

// Sửa suất chiếu theo ID
router.put('/:id', async (req, res) => {
  const showtimeId = req.params.id;

  try {
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');
    
    const updateData = {
      id: req.body.id,
      NgayChieu: req.body.NgayChieu,
      IdPhim: parseInt(req.body.IdPhim),
      IdPhong: parseInt(req.body.IdPhong)
    };

    const result = await showtimesCollection.updateOne({ _id: new ObjectId(showtimeId) }, { $set: updateData });
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Showtime updated successfully' });
    } else {
      res.status(404).json({ message: 'Showtime not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating showtime', error });
  }
});

// Xóa suất chiếu theo ID
router.delete('/:id', async (req, res) => {
  const showtimeId = req.params.id;

  try {
    const db = await connectDb();
    const showtimesCollection = db.collection('suatchieu');
    const result = await showtimesCollection.deleteOne({ _id: new ObjectId(showtimeId) });
    
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Showtime deleted successfully' });
    } else {
      res.status(404).json({ message: 'Showtime not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting showtime', error });
  }
});

module.exports = router;
