var express = require('express');
var router = express.Router();

// GET /categories
router.get('/', function(req, res) {
    res.json({ message: 'Danh sách thể loại' });
});

// POST /categories
router.post('/', function(req, res) {
    res.json({ message: 'Thể loại đã được thêm' });
});

// Xuất router
module.exports = router;
