var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bcryptjs = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var eventsRouter = require('./routes/events');
var searchRouter = require('./routes/search');
var sapchieuRouter = require('./routes/sapchieu');
var employeesRouter = require('./routes/employees');
var admin_sanphamRouter = require('./routes/admin_sanpham');
var admin_theloaiRouter = require('./routes/admin_theloai');
var blogRouter = require('./routes/blog');
var dangchieuRouter = require('./routes/dangchieu');
var taikhoanRouter = require('./routes/taikhoan');
var authRouter = require('./routes/auth');
var comboRouter = require('./routes/combo');
var rapRouter = require('./routes/rap');
var suatchieuRouter = require('./routes/suatchieu');
var loaiveRouter = require('./routes/loaive');
var doanhthuRouter = require('./routes/doanhthu');
var commentRouter = require('./routes/comments');
var checkoutRouter = require('./routes/checkout');
var hoadonRouter = require('./routes/hoadon');
var orderRouter = require('./routes/order');
var adminRouter = require('./routes/admin');
var blogdetailRouter = require('./routes/blogdetail');
var app = express();

// Cấu hình middleware CORS
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'], // Cho phép truy cập từ các địa chỉ này
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  credentials: true // Cho phép cookie và các thông tin xác thực khác
}));

// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/event', eventsRouter);
app.use('/search', searchRouter);
app.use('/sapchieu', sapchieuRouter);
app.use('/employees', employeesRouter);
app.use('/sanpham', admin_sanphamRouter);
app.use('/theloai', admin_theloaiRouter);
app.use('/blog', blogRouter);
app.use('/blogdetail', blogdetailRouter);
app.use('/dangchieu', dangchieuRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/auth', authRouter);
app.use('/combo', comboRouter);
app.use('/rap', rapRouter);
app.use('/suatchieu', suatchieuRouter);
app.use('/loaive', loaiveRouter);
app.use('/doanhthu', doanhthuRouter);
app.use('/comments', commentRouter);
app.use('/checkout', checkoutRouter);
app.use('/hoadon', hoadonRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;