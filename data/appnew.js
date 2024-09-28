const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Ticker_Movie';

const data = {
    "Phim": [
        {
            "id": 1,
            "name": "ĐỐ ANH CỒNG ĐƯỢC TÔI",
            "TheLoai": {
                "KieuPhim": "Hài, Hành Động",
                "ThoiLuong": "118'",
                "QuocGia": "Hàn quốc",
                "NgonNgu": "Phụ Đề",
                "KhuyenCao": "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
            },
            "img": "Do-anh-cong-duoc-toi.jpg",
            "id_DanhMuc": 4,
            "TrangThai": "Đang Chiếu",
            "MoTa": {
                "DaoDien": "RYOO Seung-wan",
                "DienVien": "HWANG Jung-min, JUNG Hae-in",
                "NgayKhoiChieu": "Thứ Sáu, 27/09/2024"
            },
            "ThongTinPhim": "Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! Thám tử Seo Do-cheol (HWANG Jung-min) và đội điều tra tội phạm nguy hiểm của anh không ngừng truy lùng tội phạm cả ngày lẫn đêm, đặt cược cả cuộc sống cá nhân của họ. Nhận một vụ án sát hại một giáo sư, đội thanh tra nhận ra những mối liên hệ với các vụ án trong quá khứ và nảy sinh những nghi ngờ về một kẻ giết người hàng loạt. Điều này đã khiến cả nước rơi vào tình trạng hỗn loạn. Khi đội thanh tra đi sâu vào cuộc điều tra, kẻ sát nhân đã chế nhạo họ bằng cách công khai tung ra một đoạn giới thiệu trực tuyến, chỉ ra nạn nhân tiếp theo và làm gia tăng sự hỗn loạn. Để giải quyết mối đe dọa ngày càng leo thang, nhóm đã kết nạp một sĩ quan tân binh trẻ Park Sun-woo (JUNG Hae-in), dẫn đến những khúc mắc và đầy rẫy bất ngờ trong vụ án."
        },

        {
            "id": 2,
            "name": "CÁM(T18)",
            "TheLoai": {
                "KieuPhim": "Kinh Dị",
                "ThoiLuong": "122'",
                "QuocGia": "Việt Nam",
                "NgonNgu": "VN",
                "KhuyenCao": "T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)"
            },
            "img": "cam.jpg",
            "id_DanhMuc": 2,
            "TrangThai": "Đang Chiếu",
            "MoTa": {
                "DaoDien": "Trần Hữu Tấn",
                "DienVien": "Quốc Cường, Thúy Diễm, Rima Thanh Vy, Lâm Thanh Mỹ, Hải Nam",
                "NgayKhoiChieu": "Thứ Sáu, 20/09/2024"
            },
            "ThongTinPhim": "Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen cho khán giả."
        },

        {
            "id": 3,
            "name": "LÀM GIÀU VỚI MA (T16)",
            "TheLoai": {
                "KieuPhim": "Hài, Tâm Lý",
                "ThoiLuong": "112'",
                "QuocGia": "Việt Nam",
                "NgonNgu": "VN",
                "KhuyenCao": "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
            },
            "img": "lam-giau-voi-ma.jpg",
            "id_DanhMuc": 1,
            "TrangThai": "Đang Chiếu",
            "MoTa": {
                "DaoDien": "Trung Lùn",
                "DienVien": "Hoài Linh, Tuấn Trần, Lê Giang",
                "NgayKhoiChieu": "Thứ Sáu, 30/08/2024"
            },
            "ThongTinPhim": "Làm Giàu Với Ma kể về Lanh (Tuấn Trần) - con trai của ông Đạo làm nghề mai táng (Hoài Linh), lâm vào đường cùng vì cờ bạc. Trong cơn túng quẫn, “duyên tình” đẩy đưa anh gặp một ma nữ (Diệp Bảo Ngọc) và cùng nhau thực hiện những “kèo thơm” để phục vụ mục đích của cả hai."
        },

        {
            "id": 4,
            "name": "LOOK BACK: LIỆU TA CÓ DÁM NHÌN LẠI (T13)",
            "TheLoai": {
                "KieuPhim": "Anime",
                "ThoiLuong": "58'",
                "QuocGia": "Nhật Bản",
                "NgonNgu": "Phụ Đề",
                "KhuyenCao": "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
            },
            "img": "look-back.jpg",
            "id_DanhMuc": 5,
            "TrangThai": "Đang Chiếu",
            "MoTa": {
                "DaoDien": "Kiyotaka Oshiyama",
                "DienVien": "Yumi Kawai, Mizuki Yoshida",
                "NgayKhoiChieu": "Thứ Sáu, 20/09/2024"
            },
            "ThongTinPhim": "Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… “Look Back - Liệu ta có dám nhìn lại” là một câu chuyện trưởng thành đầy xúc động và day dứt."
        },
    ],


    "TheLoai": [
        {
            "id": 1,
            "name": "Tình Cảm",
            "img": "theloaitinhcam.jpg"
        },
        {
            "id": 2,
            "name": "Kinh Dị",
            "img": "theloaikinhdi.jpg"
        },
        {
            "id": 3,
            "name": "Hài Hước",
            "img": "theloaihaihuoc.jpg"
        },
        {
            "id": 4,
            "name": "Trinh Thám",
            "img": "theloaitrinhtham.jpg"
        },
        {
            "id": 5,
            "name": "Anime",
            "img": "theloaianime.jpg"
        }
    ],


    "Rap": [
        {
            "id": 1,
            "tên_rạp": "Rạp ScreenTime Quận 12",
            "vị_trí": "Vincom Center, Quận 12, TP.HCM",
            "phòng_chiếu": [

                //Phòng 1
              {
                "id": "screenId1",
                "tên_phòng_chiếu": "Phòng chiếu 1",
                "SoLuongGhe": 50,
                "Ghe": [
                      // Hàng A
                      {
                        "id": 1,
                        "Hang": "A",
                        "SoGhe": "A01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 2,
                        "Hang": "A",
                        "SoGhe": "A02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 3,
                        "Hang": "A",
                        "SoGhe": "A03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 4,
                        "Hang": "A",
                        "SoGhe": "A04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 5,
                        "Hang": "A",
                        "SoGhe": "A05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 6,
                        "Hang": "A",
                        "SoGhe": "A06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 7,
                        "Hang": "A",
                        "SoGhe": "A07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 8,
                        "Hang": "A",
                        "SoGhe": "A08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 9,
                        "Hang": "A",
                        "SoGhe": "A09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 10,
                        "Hang": "A",
                        "SoGhe": "A10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng B
                      {
                        "id": 11,
                        "Hang": "B",
                        "SoGhe": "B01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 12,
                        "Hang": "B",
                        "SoGhe": "B02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 13,
                        "Hang": "B",
                        "SoGhe": "B03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 14,
                        "Hang": "B",
                        "SoGhe": "B04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 15,
                        "Hang": "B",
                        "SoGhe": "B05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 16,
                        "Hang": "B",
                        "SoGhe": "B06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 17,
                        "Hang": "B",
                        "SoGhe": "B07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 18,
                        "Hang": "B",
                        "SoGhe": "B08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 19,
                        "Hang": "B",
                        "SoGhe": "B09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 20,
                        "Hang": "B",
                        "SoGhe": "B10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng C
                      {
                        "id": 21,
                        "Hang": "C",
                        "SoGhe": "C01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 22,
                        "Hang": "C",
                        "SoGhe": "C02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 23,
                        "Hang": "C",
                        "SoGhe": "C03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 24,
                        "Hang": "C",
                        "SoGhe": "C04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 25,
                        "Hang": "C",
                        "SoGhe": "C05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 26,
                        "Hang": "C",
                        "SoGhe": "C06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 27,
                        "Hang": "C",
                        "SoGhe": "C07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 28,
                        "Hang": "C",
                        "SoGhe": "C08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 29,
                        "Hang": "C",
                        "SoGhe": "C09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 30,
                        "Hang": "C",
                        "SoGhe": "C10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng D
                      {
                        "id": 31,
                        "Hang": "D",
                        "SoGhe": "D01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 32,
                        "Hang": "D",
                        "SoGhe": "D02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 33,
                        "Hang": "D",
                        "SoGhe": "D03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 34,
                        "Hang": "D",
                        "SoGhe": "D04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 35,
                        "Hang": "D",
                        "SoGhe": "D05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 36,
                        "Hang": "D",
                        "SoGhe": "D06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 37,
                        "Hang": "D",
                        "SoGhe": "D07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 38,
                        "Hang": "D",
                        "SoGhe": "D08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 39,
                        "Hang": "D",
                        "SoGhe": "D09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 40,
                        "Hang": "D",
                        "SoGhe": "D10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng E
                      {
                        "id": 41,
                        "Hang": "E",
                        "SoGhe": "E01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 42,
                        "Hang": "E",
                        "SoGhe": "E02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 43,
                        "Hang": "E",
                        "SoGhe": "E03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 44,
                        "Hang": "E",
                        "SoGhe": "E04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 45,
                        "Hang": "E",
                        "SoGhe": "E05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 46,
                        "Hang": "E",
                        "SoGhe": "E06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 47,
                        "Hang": "E",
                        "SoGhe": "E07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 48,
                        "Hang": "E",
                        "SoGhe": "E08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 49,
                        "Hang": "E",
                        "SoGhe": "E09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 50,
                        "Hang": "E",
                        "SoGhe": "E10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      }
                    ],
                "lịch_chiếu": [
                  {
                    "IdSuatChieu": 1,
                    "giờ_chiếu": [
                      {
                        "id": "showtimeId1",
                        "giờ": "18:00",
                        "MaPhim": 1,
                        "TrangThai": "Đã đặt"
                      },
                      {
                        "_id": "showtimeId2",
                        "giờ": "20:00",
                        "MaPhim": 2,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId3",
                        "giờ": "22:00",
                        "MaPhim": 3,
                        "TrangThai": "Chưa đặt"
                      }
                    ]
                  }
                ]
              },

              //Phòng 2
              {
                "id": "screenId2",
                "tên_phòng_chiếu": "Phòng chiếu 2",
                "SoLuongGhe": 50,
                "Ghe": [
                      // Hàng A
                      {
                        "id": 1,
                        "Hang": "A",
                        "SoGhe": "A01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 2,
                        "Hang": "A",
                        "SoGhe": "A02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 3,
                        "Hang": "A",
                        "SoGhe": "A03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 4,
                        "Hang": "A",
                        "SoGhe": "A04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 5,
                        "Hang": "A",
                        "SoGhe": "A05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 6,
                        "Hang": "A",
                        "SoGhe": "A06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 7,
                        "Hang": "A",
                        "SoGhe": "A07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 8,
                        "Hang": "A",
                        "SoGhe": "A08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 9,
                        "Hang": "A",
                        "SoGhe": "A09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 10,
                        "Hang": "A",
                        "SoGhe": "A10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng B
                      {
                        "id": 11,
                        "Hang": "B",
                        "SoGhe": "B01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 12,
                        "Hang": "B",
                        "SoGhe": "B02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 13,
                        "Hang": "B",
                        "SoGhe": "B03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 14,
                        "Hang": "B",
                        "SoGhe": "B04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 15,
                        "Hang": "B",
                        "SoGhe": "B05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 16,
                        "Hang": "B",
                        "SoGhe": "B06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 17,
                        "Hang": "B",
                        "SoGhe": "B07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 18,
                        "Hang": "B",
                        "SoGhe": "B08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 19,
                        "Hang": "B",
                        "SoGhe": "B09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 20,
                        "Hang": "B",
                        "SoGhe": "B10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng C
                      {
                        "id": 21,
                        "Hang": "C",
                        "SoGhe": "C01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 22,
                        "Hang": "C",
                        "SoGhe": "C02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 23,
                        "Hang": "C",
                        "SoGhe": "C03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 24,
                        "Hang": "C",
                        "SoGhe": "C04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 25,
                        "Hang": "C",
                        "SoGhe": "C05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 26,
                        "Hang": "C",
                        "SoGhe": "C06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 27,
                        "Hang": "C",
                        "SoGhe": "C07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 28,
                        "Hang": "C",
                        "SoGhe": "C08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 29,
                        "Hang": "C",
                        "SoGhe": "C09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 30,
                        "Hang": "C",
                        "SoGhe": "C10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng D
                      {
                        "id": 31,
                        "Hang": "D",
                        "SoGhe": "D01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 32,
                        "Hang": "D",
                        "SoGhe": "D02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 33,
                        "Hang": "D",
                        "SoGhe": "D03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 34,
                        "Hang": "D",
                        "SoGhe": "D04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 35,
                        "Hang": "D",
                        "SoGhe": "D05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 36,
                        "Hang": "D",
                        "SoGhe": "D06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 37,
                        "Hang": "D",
                        "SoGhe": "D07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 38,
                        "Hang": "D",
                        "SoGhe": "D08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 39,
                        "Hang": "D",
                        "SoGhe": "D09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 40,
                        "Hang": "D",
                        "SoGhe": "D10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng E
                      {
                        "id": 41,
                        "Hang": "E",
                        "SoGhe": "E01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 42,
                        "Hang": "E",
                        "SoGhe": "E02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 43,
                        "Hang": "E",
                        "SoGhe": "E03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 44,
                        "Hang": "E",
                        "SoGhe": "E04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 45,
                        "Hang": "E",
                        "SoGhe": "E05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 46,
                        "Hang": "E",
                        "SoGhe": "E06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 47,
                        "Hang": "E",
                        "SoGhe": "E07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 48,
                        "Hang": "E",
                        "SoGhe": "E08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 49,
                        "Hang": "E",
                        "SoGhe": "E09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 50,
                        "Hang": "E",
                        "SoGhe": "E10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      }
                    ],
                "lịch_chiếu": [
                  {
                    "IdSuatChieu": 1,
                    "giờ_chiếu": [
                      {
                        "id": "showtimeId1",
                        "giờ": "18:00",
                        "MaPhim": 1,
                        "TrangThai": "Đã đặt"
                      },
                      {
                        "_id": "showtimeId2",
                        "giờ": "20:00",
                        "MaPhim": 2,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId3",
                        "giờ": "22:00",
                        "MaPhim": 3,
                        "TrangThai": "Chưa đặt"
                      }
                    ]
                  }
                ]
              },

              //Phòng 3
              {
                "id": "screenId3",
                "tên_phòng_chiếu": "Phòng chiếu 3",
                "SoLuongGhe": 50,
                "Ghe": [
                      // Hàng A
                      {
                        "id": 1,
                        "Hang": "A",
                        "SoGhe": "A01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 2,
                        "Hang": "A",
                        "SoGhe": "A02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 3,
                        "Hang": "A",
                        "SoGhe": "A03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 4,
                        "Hang": "A",
                        "SoGhe": "A04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 5,
                        "Hang": "A",
                        "SoGhe": "A05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 6,
                        "Hang": "A",
                        "SoGhe": "A06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 7,
                        "Hang": "A",
                        "SoGhe": "A07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 8,
                        "Hang": "A",
                        "SoGhe": "A08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 9,
                        "Hang": "A",
                        "SoGhe": "A09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 10,
                        "Hang": "A",
                        "SoGhe": "A10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng B
                      {
                        "id": 11,
                        "Hang": "B",
                        "SoGhe": "B01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 12,
                        "Hang": "B",
                        "SoGhe": "B02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 13,
                        "Hang": "B",
                        "SoGhe": "B03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 14,
                        "Hang": "B",
                        "SoGhe": "B04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 15,
                        "Hang": "B",
                        "SoGhe": "B05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 16,
                        "Hang": "B",
                        "SoGhe": "B06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 17,
                        "Hang": "B",
                        "SoGhe": "B07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 18,
                        "Hang": "B",
                        "SoGhe": "B08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 19,
                        "Hang": "B",
                        "SoGhe": "B09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 20,
                        "Hang": "B",
                        "SoGhe": "B10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng C
                      {
                        "id": 21,
                        "Hang": "C",
                        "SoGhe": "C01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 22,
                        "Hang": "C",
                        "SoGhe": "C02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 23,
                        "Hang": "C",
                        "SoGhe": "C03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 24,
                        "Hang": "C",
                        "SoGhe": "C04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 25,
                        "Hang": "C",
                        "SoGhe": "C05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 26,
                        "Hang": "C",
                        "SoGhe": "C06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 27,
                        "Hang": "C",
                        "SoGhe": "C07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 28,
                        "Hang": "C",
                        "SoGhe": "C08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 29,
                        "Hang": "C",
                        "SoGhe": "C09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 30,
                        "Hang": "C",
                        "SoGhe": "C10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng D
                      {
                        "id": 31,
                        "Hang": "D",
                        "SoGhe": "D01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 32,
                        "Hang": "D",
                        "SoGhe": "D02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 33,
                        "Hang": "D",
                        "SoGhe": "D03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 34,
                        "Hang": "D",
                        "SoGhe": "D04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 35,
                        "Hang": "D",
                        "SoGhe": "D05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 36,
                        "Hang": "D",
                        "SoGhe": "D06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 37,
                        "Hang": "D",
                        "SoGhe": "D07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 38,
                        "Hang": "D",
                        "SoGhe": "D08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 39,
                        "Hang": "D",
                        "SoGhe": "D09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 40,
                        "Hang": "D",
                        "SoGhe": "D10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng E
                      {
                        "id": 41,
                        "Hang": "E",
                        "SoGhe": "E01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 42,
                        "Hang": "E",
                        "SoGhe": "E02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 43,
                        "Hang": "E",
                        "SoGhe": "E03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 44,
                        "Hang": "E",
                        "SoGhe": "E04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 45,
                        "Hang": "E",
                        "SoGhe": "E05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 46,
                        "Hang": "E",
                        "SoGhe": "E06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 47,
                        "Hang": "E",
                        "SoGhe": "E07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 48,
                        "Hang": "E",
                        "SoGhe": "E08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 49,
                        "Hang": "E",
                        "SoGhe": "E09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 50,
                        "Hang": "E",
                        "SoGhe": "E10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      }
                    ],
                "lịch_chiếu": [
                  {
                    "IdSuatChieu": 2,
                    "giờ_chiếu": [
                      {
                        "id": "showtimeId1",
                        "giờ": "18:00",
                        "MaPhim": 1,
                        "TrangThai": "Chưa đặt"

                      },
                      {
                        "_id": "showtimeId2",
                        "giờ": "20:00",
                        "MaPhim": 2,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId3",
                        "giờ": "22:00",
                        "MaPhim": 3,
                        "TrangThai": "Chưa đặt"
                      }
                    ]
                  }
                ]
              },

              //Phòng 4
              {
                "id": "screenId4",
                "tên_phòng_chiếu": "Phòng chiếu 4",
                "SoLuongGhe": 50,
                "Ghe": [
                      // Hàng A
                      {
                        "id": 1,
                        "Hang": "A",
                        "SoGhe": "A01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 2,
                        "Hang": "A",
                        "SoGhe": "A02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 3,
                        "Hang": "A",
                        "SoGhe": "A03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 4,
                        "Hang": "A",
                        "SoGhe": "A04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 5,
                        "Hang": "A",
                        "SoGhe": "A05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 6,
                        "Hang": "A",
                        "SoGhe": "A06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 7,
                        "Hang": "A",
                        "SoGhe": "A07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 8,
                        "Hang": "A",
                        "SoGhe": "A08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 9,
                        "Hang": "A",
                        "SoGhe": "A09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 10,
                        "Hang": "A",
                        "SoGhe": "A10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng B
                      {
                        "id": 11,
                        "Hang": "B",
                        "SoGhe": "B01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 12,
                        "Hang": "B",
                        "SoGhe": "B02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 13,
                        "Hang": "B",
                        "SoGhe": "B03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 14,
                        "Hang": "B",
                        "SoGhe": "B04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 15,
                        "Hang": "B",
                        "SoGhe": "B05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 16,
                        "Hang": "B",
                        "SoGhe": "B06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 17,
                        "Hang": "B",
                        "SoGhe": "B07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 18,
                        "Hang": "B",
                        "SoGhe": "B08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 19,
                        "Hang": "B",
                        "SoGhe": "B09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 20,
                        "Hang": "B",
                        "SoGhe": "B10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng C
                      {
                        "id": 21,
                        "Hang": "C",
                        "SoGhe": "C01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 22,
                        "Hang": "C",
                        "SoGhe": "C02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 23,
                        "Hang": "C",
                        "SoGhe": "C03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 24,
                        "Hang": "C",
                        "SoGhe": "C04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 25,
                        "Hang": "C",
                        "SoGhe": "C05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 26,
                        "Hang": "C",
                        "SoGhe": "C06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 27,
                        "Hang": "C",
                        "SoGhe": "C07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 28,
                        "Hang": "C",
                        "SoGhe": "C08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 29,
                        "Hang": "C",
                        "SoGhe": "C09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 30,
                        "Hang": "C",
                        "SoGhe": "C10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng D
                      {
                        "id": 31,
                        "Hang": "D",
                        "SoGhe": "D01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 32,
                        "Hang": "D",
                        "SoGhe": "D02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 33,
                        "Hang": "D",
                        "SoGhe": "D03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 34,
                        "Hang": "D",
                        "SoGhe": "D04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 35,
                        "Hang": "D",
                        "SoGhe": "D05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 36,
                        "Hang": "D",
                        "SoGhe": "D06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 37,
                        "Hang": "D",
                        "SoGhe": "D07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 38,
                        "Hang": "D",
                        "SoGhe": "D08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 39,
                        "Hang": "D",
                        "SoGhe": "D09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 40,
                        "Hang": "D",
                        "SoGhe": "D10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng E
                      {
                        "id": 41,
                        "Hang": "E",
                        "SoGhe": "E01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 42,
                        "Hang": "E",
                        "SoGhe": "E02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 43,
                        "Hang": "E",
                        "SoGhe": "E03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 44,
                        "Hang": "E",
                        "SoGhe": "E04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 45,
                        "Hang": "E",
                        "SoGhe": "E05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 46,
                        "Hang": "E",
                        "SoGhe": "E06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 47,
                        "Hang": "E",
                        "SoGhe": "E07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 48,
                        "Hang": "E",
                        "SoGhe": "E08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 49,
                        "Hang": "E",
                        "SoGhe": "E09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 50,
                        "Hang": "E",
                        "SoGhe": "E10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      }
                    ],
                "lịch_chiếu": [
                  {
                    "IdSuatChieu": 2,
                    "giờ_chiếu": [
                      {
                        "id": "showtimeId1",
                        "giờ": "18:00",
                        "MaPhim": 1,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId2",
                        "giờ": "20:00",
                        "MaPhim": 2,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId3",
                        "giờ": "22:00",
                        "MaPhim": 3,
                        "TrangThai": "Chưa đặt"
                      }
                    ]
                  }
                ]
              },

              //Phòng 5
              {
                "id": "screenId5",
                "tên_phòng_chiếu": "Phòng chiếu 5",
                "SoLuongGhe": 50,
                "Ghe": [
                      // Hàng A
                      {
                        "id": 1,
                        "Hang": "A",
                        "SoGhe": "A01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 2,
                        "Hang": "A",
                        "SoGhe": "A02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 3,
                        "Hang": "A",
                        "SoGhe": "A03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 4,
                        "Hang": "A",
                        "SoGhe": "A04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 5,
                        "Hang": "A",
                        "SoGhe": "A05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 6,
                        "Hang": "A",
                        "SoGhe": "A06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 7,
                        "Hang": "A",
                        "SoGhe": "A07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 8,
                        "Hang": "A",
                        "SoGhe": "A08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 9,
                        "Hang": "A",
                        "SoGhe": "A09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 10,
                        "Hang": "A",
                        "SoGhe": "A10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng B
                      {
                        "id": 11,
                        "Hang": "B",
                        "SoGhe": "B01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 12,
                        "Hang": "B",
                        "SoGhe": "B02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 13,
                        "Hang": "B",
                        "SoGhe": "B03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 14,
                        "Hang": "B",
                        "SoGhe": "B04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 15,
                        "Hang": "B",
                        "SoGhe": "B05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 16,
                        "Hang": "B",
                        "SoGhe": "B06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 17,
                        "Hang": "B",
                        "SoGhe": "B07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 18,
                        "Hang": "B",
                        "SoGhe": "B08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 19,
                        "Hang": "B",
                        "SoGhe": "B09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 20,
                        "Hang": "B",
                        "SoGhe": "B10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng C
                      {
                        "id": 21,
                        "Hang": "C",
                        "SoGhe": "C01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 22,
                        "Hang": "C",
                        "SoGhe": "C02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 23,
                        "Hang": "C",
                        "SoGhe": "C03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 24,
                        "Hang": "C",
                        "SoGhe": "C04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 25,
                        "Hang": "C",
                        "SoGhe": "C05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 26,
                        "Hang": "C",
                        "SoGhe": "C06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 27,
                        "Hang": "C",
                        "SoGhe": "C07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 28,
                        "Hang": "C",
                        "SoGhe": "C08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 29,
                        "Hang": "C",
                        "SoGhe": "C09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 30,
                        "Hang": "C",
                        "SoGhe": "C10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng D
                      {
                        "id": 31,
                        "Hang": "D",
                        "SoGhe": "D01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 32,
                        "Hang": "D",
                        "SoGhe": "D02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 33,
                        "Hang": "D",
                        "SoGhe": "D03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 34,
                        "Hang": "D",
                        "SoGhe": "D04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 35,
                        "Hang": "D",
                        "SoGhe": "D05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 36,
                        "Hang": "D",
                        "SoGhe": "D06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 37,
                        "Hang": "D",
                        "SoGhe": "D07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 38,
                        "Hang": "D",
                        "SoGhe": "D08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 39,
                        "Hang": "D",
                        "SoGhe": "D09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 40,
                        "Hang": "D",
                        "SoGhe": "D10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                  
                      // Hàng E
                      {
                        "id": 41,
                        "Hang": "E",
                        "SoGhe": "E01",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 42,
                        "Hang": "E",
                        "SoGhe": "E02",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 43,
                        "Hang": "E",
                        "SoGhe": "E03",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 44,
                        "Hang": "E",
                        "SoGhe": "E04",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 45,
                        "Hang": "E",
                        "SoGhe": "E05",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 46,
                        "Hang": "E",
                        "SoGhe": "E06",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 47,
                        "Hang": "E",
                        "SoGhe": "E07",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 48,
                        "Hang": "E",
                        "SoGhe": "E08",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      },
                      {
                        "id": 49,
                        "Hang": "E",
                        "SoGhe": "E09",
                        "LoaiGhe": "VIP",
                        "TrangThai": "Đã Đặt"
                      },
                      {
                        "id": 50,
                        "Hang": "E",
                        "SoGhe": "E10",
                        "LoaiGhe": "Thường",
                        "TrangThai": "Còn Trống"
                      }
                    ],
                "lịch_chiếu": [
                  {
                    "IdSuatChieu": 3,
                    "giờ_chiếu": [
                      {
                        "id": "showtimeId1",
                        "giờ": "18:00",
                        "MaPhim": 1,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId2",
                        "giờ": "20:00",
                        "MaPhim": 2,
                        "TrangThai": "Chưa đặt"
                      },
                      {
                        "_id": "showtimeId3",
                        "giờ": "22:00",
                        "MaPhim": 3,
                        "TrangThai": "Chưa đặt"
                      }
                    ]
                  }
                ]
              },

            ],
          },

        ],


    "SuatChieu": [
        {
            "id": 1,
            "thời_gian": "Thứ Năm",
            "ngày_chiếu": "26/09",
            "MaPhim": 1,
            "MaVe": 1,
        },

        {
            "id": 2,
            "thời_gian": "Thứ Sáu",
            "ngày_chiếu": "27/09",
            "MaPhim": 1,
            "MaVe": 1,
        },

        {
            "id": 3,
            "thời_gian": "Thứ Bảy",
            "ngày_chiếu": "28/09",
            "MaPhim": 1,
            "MaVe": 1,
        },
    ],


    "LoaiVe": [
    {
            "id": 1,
            "TenVe": "Người Lớn - Đơn",
            "GiaVe": 75000,
        },
        {
            "id": 2,
            "TenVe": "HSSV-Người Cao Tuổi",
            "GiaVe": 45000,
        },
        {
            "id": 3,
            "TenVe": "Người Lớn - Đôi",
            "GiaVe": 155000,
        }
    ],


// ----- GHẾ -----
    // "Ghế": [
    //     {
    //         "id": 1, 
    //         "TenGhe": "A",
    //         "IdRap": 1,
    //         "LoaiGhe": [
    //             {
    //                 "Ghe1": "A01",
    //                 "Ghe2": "A02",
    //                 "Ghe2": "A03",
    //                 "Ghe2": "A04",
    //                 "Ghe2": "A05",
    //                 "Ghe2": "A06",
    //                 "Ghe2": "A07",
    //                 "Ghe2": "A08",
    //                 "Ghe2": "A09",
    //                 "Ghe2": "A010",
    //                 "Ghe2": "A011",
    //                 "Ghe2": "A012",
    //                 "Ghe2": "A013",
    //                 "Ghe2": "A014",
    //             }
    //         ]
    //     }
    // ]


// ----- HÓA ĐƠN -----
    "HoaDon": [
      {
        "id": 1,
        "NgayXuatHoaDon": "28/09/2004",
        "SoLuong": 1,
        "IdLoaiVe": 1 
      }
    ],


      "Combo": [
        {
          "id": 1,
          "img": "combo1.jpg",
          "TenCombo": "COMBO PARYPARY",
          "NoiDung": "2 Bắp Ngọt 60oz + 4 Coke 22oz",
          "Gia": 209000
        },
        {
          "id": 2,
          "img": "combo2.jpg",
          "TenCombo": "COMBO SOLO",
          "NoiDung": "1 Bắp Ngọt 60oz + 1 Coke 32oz",
          "Gia": 94000
        },
        {
          "id": 3,
          "img": "combo3.jpg",
          "TenCombo": "COMBO COUPLE",
          "NoiDung": "1 Bắp Ngọt 60oz + 2 Coke 32oz",
          "Gia": 115000
        },
        {
          "id": 4,
          "img": "combo4.jpg",
          "TenCombo": "NƯỚC SUỐI DASANI",
          "NoiDung": "500/510ML",
          "Gia": 20000
        },
        {
          "id": 5,
          "img": "combo5.jpg",
          "TenCombo": "NƯỚC TRÁI CÂY NUTRIBOOST",
          "NoiDung": "",
          "Gia": 28000
        },
        {
          "id": 6,
          "img": "combo6.jpg",
          "TenCombo": "NƯỚC CAM TEPPY",
          "NoiDung": "",
          "Gia": 28000
        },
        {
          "id": 7,
          "img": "combo7.jpg",
          "TenCombo": "FANTA",
          "NoiDung": "",
          "Gia": 37000
        },
        {
          "id": 8,
          "img": "combo8.jpg",
          "TenCombo": "SPRITE",
          "NoiDung": "",
          "Gia": 37000
        },
        {
          "id": 9,
          "img": "combo9.jpg",
          "TenCombo": "COCACOLA",
          "NoiDung": "",
          "Gia": 37000
        }
      ],


// ----- TÀI_KHOẢN -----
      "TaiKhoan": [
        {
          "id": 1,
          "TenDangNhap": "NguyenThaiSon",
          "MatKhau": "12345678",
          "LoaiTaiKhoang": "",
          "LichSuMuaVe": "26-09-2024",
          "LichSuBinhLuan": "30-09-2024"
        }
      ],


// ----- BÌNH_LUẬN -----
      "BinhLuan": [
        {
          "id": 1,
          "NoiDung": "Phim hay",
          "NgayBinhLuan": "26-09-2024",
          "IdPhim": 1,
          "IdTaiKhoan": 1,
        }
      ],



// ----- HỖ_TRỢ -----
      "HoTro": [
        {
          "id": 1,
          "IdTaiKhoan": 1,
          "ThoiGianHoTro": "30 phút",
          "NoiDung": "Miễn Phí Ship" 
        },
        {
          "id": 2,
          "IdTaiKhoan": 1,
          "ThoiGianHoTro": "30 phút",
          "NoiDung": "Hoàn Tiền 50%" 
        },
      ],



// ----- KHUYẾN_MÃI_SỰ_KIỆN -----
      "KhuyenMai": [
        {
          "id": 1,
          "NoiDungKhuyenMai": "Sự Kiện Tháng 10, Giảm giá khi mua vé xem phim tại rạp.",
          "ThoiGianBatDau": "10-10-2024",
          "ThoiGianKetThuc": "15-09-2024",
          "IdPhim": 1,
        }
      ],



// ----- ADMIN -----
      "Admin": [
        {
          "id": 1,
          "Quyen": "QuanTri",
          "TenDangNhap": "Sondev",
          "MatKhau": "12345678qt",
        },
        {
          "id": 2,
          "Quyen": "NhanVien",
          "TenDangNhap": "Toandev",
          "MatKhau": "12345678nv",
        }
      ]
    
    };