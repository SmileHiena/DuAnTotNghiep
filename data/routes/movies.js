var express = require('express');
var router = express.Router();

// GET /movies
router.get('/', function(req, res) {
    res.json({ message: 'Danh sách phim' });
});

// POST /movies
router.post('/', function(req, res) {
    res.json({ message: 'Phim đã được thêm' });
});

// Xuất router
module.exports = router;
