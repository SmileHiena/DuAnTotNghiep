var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  // Render file index.ejs và truyền vào biến title
  res.render('index', { title: 'Chào mừng bạn đến với bình nguyên vô tận' });
});

module.exports = router;
