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
              {
                "id": "screenId1",
                "tên_phòng_chiếu": "Phòng chiếu 1",
                "lịch_chiếu": [
                  {
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

              {
                "id": "screenId2",
                "tên_phòng_chiếu": "Phòng chiếu 2",
                "lịch_chiếu": [
                  {
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

              {
                "id": "screenId3",
                "tên_phòng_chiếu": "Phòng chiếu 3",
                "lịch_chiếu": [
                  {
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

              {
                "id": "screenId4",
                "tên_phòng_chiếu": "Phòng chiếu 4",
                "lịch_chiếu": [
                  {
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

              {
                "id": "screenId5",
                "tên_phòng_chiếu": "Phòng chiếu 5",
                "lịch_chiếu": [
                  {
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


    "Suất Chiếu": [
        {
            "id": 1,
            "thời_gian": "Thứ Năm",
            "ngày_chiếu": "26/09",
            "MaPhim": 1,
            "MaRap": 1,
            "MaVe": 1,
        },

        {
            "id": 2,
            "thời_gian": "Thứ Sáu",
            "ngày_chiếu": "27/09",
            "MaPhim": 1,
            "MaRap": 1,
            "MaVe": 1,
        },

        {
            "id": 3,
            "thời_gian": "Thứ Bảy",
            "ngày_chiếu": "28/09",
            "MaPhim": 1,
            "MaRap": 1,
            "MaVe": 1,
        },
    ]


    };
