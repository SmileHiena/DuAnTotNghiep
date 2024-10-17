var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var categoriesRouter = require('./routes/categories');
var eventsRouter = require('./routes/events');
var searchRouter = require('./routes/search');
var sapchieuRouter = require('./routes/sapchieu');
var employeesRouter = require('./routes/employees');
var admin_sanphamRouter = require('./routes/admin_sanpham');
var blogRouter = require('./routes/blog');
var dangchieuRouter = require('./routes/dangchieu');
var khachhangRouter = require('./routes/khachhang');
var app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'],// Cho phép truy cập từ địa chỉ này
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  credentials: true // Cho phép cookie và các thông tin xác thực khác
}));

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
app.use('/categories', categoriesRouter);
app.use('/events', eventsRouter);
app.use('/search', searchRouter);
app.use('/sapchieu', sapchieuRouter);
app.use('/employees', employeesRouter);
app.use('/sanpham', admin_sanphamRouter);
app.use('/blog', blogRouter);
app.use('/dangchieu', dangchieuRouter);
app.use('/khachhang', khachhangRouter);

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
