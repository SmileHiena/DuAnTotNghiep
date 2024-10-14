const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Ticker_Movie';

const data = {
  "Phim": [
    {
      "id": 1,
      "Ten": "ĐỐ ANH CỒNG ĐƯỢC TÔI",
      "TheLoai": {
        "KieuPhim": "Hài, Hành Động",
        "ThoiLuong": "118'",
        "QuocGia": "Hàn quốc",
        "NgonNgu": "Phụ Đề",
        "KhuyenCao": "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      "Anh": "Do-anh-cong-duoc-toi.jpg",
      "IdDanhMuc": 4,
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
      "Ten": "CÁM(T18)",
      "TheLoai": {
        "KieuPhim": "Kinh Dị",
        "ThoiLuong": "122'",
        "QuocGia": "Việt Nam",
        "NgonNgu": "VN",
        "KhuyenCao": "T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)"
      },
      "Anh": "cam.jpg",
      "IdDanhMuc": 2,
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
      "Ten": "LÀM GIÀU VỚI MA (T16)",
      "TheLoai": {
        "KieuPhim": "Hài, Tâm Lý",
        "ThoiLuong": "112'",
        "QuocGia": "Việt Nam",
        "NgonNgu": "VN",
        "KhuyenCao": "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      "Anh": "lam-giau-voi-ma.jpg",
      "IdDanhMuc": 1,
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
      "Ten": "LOOK BACK: LIỆU TA CÓ DÁM NHÌN LẠI (T13)",
      "TheLoai": {
        "KieuPhim": "Anime",
        "ThoiLuong": "58'",
        "QuocGia": "Nhật Bản",
        "NgonNgu": "Phụ Đề",
        "KhuyenCao": "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      "Anh": "look-back.jpg",
      "IdDanhMuc": 5,
      "TrangThai": "Đang Chiếu",
      "MoTa": {
        "DaoDien": "Kiyotaka Oshiyama",
        "DienVien": "Yumi Kawai, Mizuki Yoshida",
        "NgayKhoiChieu": "Thứ Sáu, 20/09/2024"
      },
      "ThongTinPhim": "Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… “Look Back - Liệu ta có dám nhìn lại” là một câu chuyện trưởng thành đầy xúc động và day dứt."
    },

    {
      "id": 5,
      "Ten": "ANH TRAI VƯỢT MỌI TAM TAI (T16)",
      "TheLoai": {
        "KieuPhim": "Hài",
        "ThoiLuong": "96'",
        "QuocGia": "Hàn Quốc",
        "NgonNgu": "Phụ Đề",
        "KhuyenCao": "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      "Anh": "anh-trai-vuot-moi-tam-tai.jpg",
      "IdDanhMuc": 3,
      "TrangThai": "Đang Chiếu",
      "MoTa": {
        "DaoDien": "Kim Jae-hoon",
        "DienVien": "Park Sung-woong, Kwak Si-yang, Yoon Kyung-ho",
        "NgayKhoiChieu": "Thứ Sáu, 13/09/2024"
      },
      "ThongTinPhim": "Cho Su-gwang là một thanh tra cực kỳ nóng tính, dù có tỷ lệ bắt giữ tội phạm ấn tượng nhưng anh luôn gặp khó khăn trong việc kiểm soát cơn giận của mình. Vì liên tục tấn công các nghi phạm, Cho Su-gwang bị chuyển đến đảo Jeju. Tại đây, vị thanh tra nhận nhiệm vụ truy bắt kẻ lừa đảo giỏi nhất Hàn Quốc - Kim In-hae với 7 tiền án, nổi tiếng thông minh và có khả năng “thiên biến vạn hoá” để ngụy trang hoàn hảo mọi nhân dạng. Cùng lúc đó, Kim In-hae bất ngờ dính vào vụ án mạng nghiêm trọng có liên quan đến tên trùm xã hội đen đang nhăm nhe “thôn tính” đảo Jeju. Trước tình hình nguy cấp phải “giải cứu” hòn đảo Jeju và triệt phá đường dây nguy hiểm của tên trùm xã hội đen, thanh tra Cho Su-gwang bất đắc dĩ phải hợp tác cùng nghi phạm Kim In-hae, tận dụng triệt để các kỹ năng từ phá án đến lừa đảo trên hành trình rượt đuổi vừa gay cấn vừa hài hước để có thể hoàn thành nhiệm vụ cam go."
    },
  ],


  "TheLoai": [
    {
      "id": 1,
      "Ten": "Tình Cảm",
      "Anh": "theloaitinhcam.jpg"
    },
    {
      "id": 2,
      "Ten": "Kinh Dị",
      "Anh": "theloaikinhdi.jpg"
    },
    {
      "id": 3,
      "Ten": "Hài Hước",
      "Anh": "theloaihaihuoc.jpg"
    },
    {
      "id": 4,
      "Ten": "Trinh Thám",
      "Anh": "theloaitrinhtham.jpg"
    },
    {
      "id": 5,
      "Ten": "Anime",
      "Anh": "theloaianime.jpg"
    }
  ],


  "Rap": [
    {
      "id": 1,
      "TenRap": "Rạp ScreenTime Quận 12",
      "ViTri": "Vincom Center, Quận 12, TP.HCM",
      "PhongChieu": [

        //Phòng 1
        {
          "id": "screenId1",
          "TenPhongChieu": "Phòng chiếu 1",
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
          "LichChieu": [
            {
              "IdSuatChieu": 1,
              "GioChieu": [
                {
                  "id": "showtimeId1",
                  "Gio": "18:00",
                  "MaPhim": 1,
                  "TrangThai": "Đã đặt"
                },
                {
                  "id": "showtimeId2",
                  "Gio": "20:00",
                  "MaPhim": 2,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId3",
                  "Gio": "22:00",
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
          "TenPhongChieu": "Phòng chiếu 2",
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
          "LichChieu": [
            {
              "IdSuatChieu": 1,
              "GioChieu": [
                {
                  "id": "showtimeId1",
                  "Gio": "18:00",
                  "MaPhim": 1,
                  "TrangThai": "Đã đặt"
                },
                {
                  "id": "showtimeId2",
                  "Gio": "20:00",
                  "MaPhim": 2,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId3",
                  "Gio": "22:00",
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
          "TenPhongChieu": "Phòng chiếu 3",
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
          "LichChieu": [
            {
              "IdSuatChieu": 2,
              "GioChieu": [
                {
                  "id": "showtimeId1",
                  "Gio": "18:00",
                  "MaPhim": 1,
                  "TrangThai": "Chưa đặt"

                },
                {
                  "id": "showtimeId2",
                  "Gio": "20:00",
                  "MaPhim": 2,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId3",
                  "Gio": "22:00",
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
          "TenPhongChieu": "Phòng chiếu 4",
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
          "LichChieu": [
            {
              "IdSuatChieu": 2,
              "GioChieu": [
                {
                  "id": "showtimeId1",
                  "Gio": "18:00",
                  "MaPhim": 1,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId2",
                  "Gio": "20:00",
                  "MaPhim": 2,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId3",
                  "Gio": "22:00",
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
          "TenPhongChieu": "Phòng chiếu 5",
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
          "LichChieu": [
            {
              "IdSuatChieu": 3,
              "GioChieu": [
                {
                  "id": "showtimeId1",
                  "Gio": "18:00",
                  "MaPhim": 1,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId2",
                  "Gio": "20:00",
                  "MaPhim": 2,
                  "TrangThai": "Chưa đặt"
                },
                {
                  "id": "showtimeId3",
                  "Gio": "22:00",
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
      "ThoiGian": "Thứ Năm",
      "NgayChieu": "26/09",
      "MaPhim": 1,
      "IdVe": 1,
    },

    {
      "id": 2,
      "ThoiGian": "Thứ Sáu",
      "NgayChieu": "27/09",
      "MaPhim": 1,
      "IdVe": 1,
    },

    {
      "id": 3,
      "ThoiGian": "Thứ Bảy",
      "NgayChieu": "28/09",
      "MaPhim": 1,
      "IdVe": 1,
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


  // ----- GHẾ -----\
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
      "Anh": "combo1.jpg",
      "TenCombo": "COMBO PARYPARY",
      "NoiDung": "2 Bắp Ngọt 60oz + 4 Coke 22oz",
      "Gia": 209000
    },
    {
      "id": 2,
      "Anh": "combo2.jpg",
      "TenCombo": "COMBO SOLO",
      "NoiDung": "1 Bắp Ngọt 60oz + 1 Coke 32oz",
      "Gia": 94000
    },
    {
      "id": 3,
      "Anh": "combo3.jpg",
      "TenCombo": "COMBO COUPLE",
      "NoiDung": "1 Bắp Ngọt 60oz + 2 Coke 32oz",
      "Gia": 115000
    },
    {
      "id": 4,
      "Anh": "combo4.jpg",
      "TenCombo": "NƯỚC SUỐI DASANI",
      "NoiDung": "500/510ML",
      "Gia": 20000
    },
    {
      "id": 5,
      "Anh": "combo5.jpg",
      "TenCombo": "NƯỚC TRÁI CÂY NUTRIBOOST",
      "NoiDung": "",
      "Gia": 28000
    },
    {
      "id": 6,
      "Anh": "combo6.jpg",
      "TenCombo": "NƯỚC CAM TEPPY",
      "NoiDung": "",
      "Gia": 28000
    },
    {
      "id": 7,
      "Anh": "combo7.jpg",
      "TenCombo": "FANTA",
      "NoiDung": "",
      "Gia": 37000
    },
    {
      "id": 8,
      "Anh": "combo8.jpg",
      "TenCombo": "SPRITE",
      "NoiDung": "",
      "Gia": 37000
    },
    {
      "id": 9,
      "Anh": "combo9.jpg",
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
      "LoaiTaiKhoang": 0,
      "LichSuMuaVe": [
        {
          "id": 1,
          "IdVe": 1,
          "NgayMua": "2024-09-28",
          "GiaVe": 500000
        },
        {
          "id": 2,
          "IdVe": 1,
          "NgayMua": "2024-09-27",
          "GiaVe": 450000
        }
      ]
    },
    {
      "id": 2,
      "TenDangNhap": "LeThiMinhChau",
      "MatKhau": "987654321",
      "LoaiTaiKhoang": 1,
      "LichSuMuaVe": [
        {
          "id": 1,
          "IdVe": 2,
          "NgayMua": "2024-09-26",
          "GiaVe": 300000
        }
      ]
    },
    {
      "id": 3,
      "TenDangNhap": "TranVanBinh",
      "MatKhau": "abcd1234",
      "LoaiTaiKhoang": 0,
      "LichSuMuaVe": [
        {
          "id": 1,
          "IdVe": 3,
          "NgayMua": "2024-09-25",
          "GiaVe": 600000
        },
        {
          "id": 2,
          "IdVe": 1,
          "NgayMua": "2024-09-24",
          "GiaVe": 400000
        }
      ]
    },
    {
      "id": 4,
      "TenDangNhap": "NguyenVanAn",
      "MatKhau": "qwerty123",
      "LoaiTaiKhoang": 1,
      "LichSuMuaVe": []
    },
    {
      "id": 5,
      "TenDangNhap": "PhamThiHoa",
      "MatKhau": "pass12345",
      "LoaiTaiKhoang": 0,
      "LichSuMuaVe": [
        {
          "id": 1,
          "IdVe": 2,
          "NgayMua": "2024-09-23",
          "GiaVe": 550000
        }
      ]
    }
  ],


  // ----- BÌNH_LUẬN -----
  "BinhLuan": [
    {
      "id": 1,
      "NoiDung": "Phim hay",
      "NgayBinhLuan": "26-09-2024",
      "IdPhim": 1,
      "IdTaiKhoan": 1
    },
    {
      "id": 2,
      "NoiDung": "Phim rất hấp dẫn",
      "NgayBinhLuan": "27-09-2024",
      "IdPhim": 2,
      "IdTaiKhoan": 2
    },
    {
      "id": 3,
      "NoiDung": "Kỹ xảo đẹp mắt",
      "NgayBinhLuan": "28-09-2024",
      "IdPhim": 3,
      "IdTaiKhoan": 3
    },
    {
      "id": 4,
      "NoiDung": "Nội dung dễ hiểu",
      "NgayBinhLuan": "28-09-2024",
      "IdPhim": 1,
      "IdTaiKhoan": 4
    },
    {
      "id": 5,
      "NoiDung": "Phim đáng xem",
      "NgayBinhLuan": "29-09-2024",
      "IdPhim": 2,
      "IdTaiKhoan": 5
    }
  ],

  "ChoTietHoaDon": [
    {
      "id": 1,
      "IdHoaDon": 1,
      "NgayXuatHoaDon": "30/09/2024",
      "IdXuatChieu": 1,
      "SoGhe": 1,
      "NgayChieu": "30/09/2024",
      "TongTien": 175000
    },
    {
      "id": 2,
      "IdHoaDon": 2,
      "NgayXuatHoaDon": "01/10/2024",
      "IdXuatChieu": 2,
      "SoGhe": 5,
      "NgayChieu": "01/10/2024",
      "TongTien": 200000
    },
    {
      "id": 3,
      "IdHoaDon": 3,
      "NgayXuatHoaDon": "02/10/2024",
      "IdXuatChieu": 3,
      "SoGhe": 12,
      "NgayChieu": "02/10/2024",
      "TongTien": 180000
    },
    {
      "id": 4,
      "IdHoaDon": 4,
      "NgayXuatHoaDon": "02/10/2024",
      "IdXuatChieu": 4,
      "SoGhe": 8,
      "NgayChieu": "03/10/2024",
      "TongTien": 250000
    },
    {
      "id": 5,
      "IdHoaDon": 5,
      "NgayXuatHoaDon": "03/10/2024",
      "IdXuatChieu": 5,
      "SoGhe": 15,
      "NgayChieu": "03/10/2024",
      "TongTien": 220000
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
  ],
  // ------ Sukien ---- //
  "Sukien": [
    {
      "id": 1,
      "idPhim": "P001",
      "Ten": "Mua vé phim Bố Già",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Mua vé xem phim Bố Già - Bộ phim tình cảm gia đình đầy cảm xúc với diễn xuất đỉnh cao của Trấn Thành.",
      "NgayBatDau": "01-10-2024",
      "NgayKetThuc": "01-11-2024"
    },
    {
      "id": 2,
      "idPhim": "P002",
      "Ten": "Mua vé phim Hai Phượng",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Đặt vé phim Hai Phượng - Bộ phim hành động kịch tính do Ngô Thanh Vân thủ vai chính.",
      "NgayBatDau": "05-10-2024",
      "NgayKetThuc": "05-11-2024"
    },
    {
      "id": 3,
      "idPhim": "P003",
      "Ten": "Mua vé phim Mắt Biếc",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Xem ngay bộ phim Mắt Biếc, câu chuyện tình yêu lãng mạn chuyển thể từ tiểu thuyết nổi tiếng của Nguyễn Nhật Ánh.",
      "NgayBatDau": "10-10-2024",
      "NgayKetThuc": "10-11-2024"
    },
    {
      "id": 4,
      "idPhim": "P004",
      "Ten": "Mua vé phim Lật Mặt: 48H",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Đừng bỏ lỡ Lật Mặt: 48H - Bộ phim hành động, hài hước đầy kịch tính của Lý Hải.",
      "NgayBatDau": "15-10-2024",
      "NgayKetThuc": "15-11-2024"
    },
    {
      "id": 5,
      "idPhim": "P005",
      "Ten": "Mua vé phim Ròm",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Thưởng thức Ròm, bộ phim phản ánh hiện thực xã hội với giải thưởng quốc tế danh giá.",
      "NgayBatDau": "20-10-2024",
      "NgayKetThuc": "20-11-2024"
    },
    {
      "id": 6,
      "idPhim": "P006",
      "Ten": "Mua vé phim Tiệc Trăng Máu",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Tiệc Trăng Máu - Phim tâm lý hài kịch với sự tham gia của dàn diễn viên đình đám Việt Nam.",
      "NgayBatDau": "25-10-2024",
      "NgayKetThuc": "25-11-2024"
    },
    {
      "id": 7,
      "idPhim": "P007",
      "Ten": "Mua vé phim Cua Lại Vợ Bầu",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Cua Lại Vợ Bầu - Bộ phim hài lãng mạn về tình yêu và gia đình không thể bỏ lỡ.",
      "NgayBatDau": "01-11-2024",
      "NgayKetThuc": "01-12-2024"
    },
    {
      "id": 8,
      "idPhim": "P008",
      "Ten": "Mua vé phim Đôi Mắt Âm Dương",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Đôi Mắt Âm Dương - Bộ phim kinh dị Việt Nam khiến khán giả không thể rời mắt.",
      "NgayBatDau": "05-11-2024",
      "NgayKetThuc": "05-12-2024"
    },
    {
      "id": 9,
      "idPhim": "P009",
      "Ten": "Mua vé phim Em Chưa 18",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Xem ngay Em Chưa 18 - Bộ phim tình cảm hài hước đã làm mưa làm gió tại các rạp phim Việt Nam.",
      "NgayBatDau": "10-11-2024",
      "NgayKetThuc": "10-12-2024"
    },
    {
      "id": 10,
      "idPhim": "P010",
      "Ten": "Mua vé phim Song Lang",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Song Lang - Bộ phim nghệ thuật về tình yêu và cải lương, đầy cảm xúc và ấn tượng.",
      "NgayBatDau": "15-11-2024",
      "NgayKetThuc": "15-12-2024"
    },
    {
      "id": 11,
      "idPhim": "P011",
      "Ten": "Mua vé phim Trạng Quỳnh",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Trạng Quỳnh - Bộ phim hài cổ trang mang đậm văn hóa Việt với những tình huống dở khóc dở cười.",
      "NgayBatDau": "20-11-2024",
      "NgayKetThuc": "20-12-2024"
    },
    {
      "id": 12,
      "idPhim": "P012",
      "Ten": "Mua vé phim Tháng Năm Rực Rỡ",
      "Anh": "./public/images/phim/cam.jpg",
      "Noidung": "Tháng Năm Rực Rỡ - Bộ phim về tình bạn tuổi thanh xuân đầy hoài niệm và cảm xúc.",
      "NgayBatDau": "25-11-2024",
      "NgayKetThuc": "25-12-2024"
    }
  ]


};

async function main() {
    const client = await MongoClient.connect(url); // Không sử dụng các tùy chọn deprecated
    const db = client.db(dbName);

    const collections = [
        { name: 'phim', data: data.Phim },
        { name: 'theloai', data: data.TheLoai },
        { name: 'rap', data: data.Rap },
        { name: 'suatchieu', data: data.SuatChieu },
        { name: 'loaive', data: data.LoaiVe },
        { name: 'hoadon', data: data.HoaDon },
        { name: 'taikhoan', data: data.TaiKhoan },
        { name: 'binhluan', data: data.BinhLuan },
        { name: 'sukien', data: data.Sukien }
    ];

    // Chèn dữ liệu vào các collection
    for (const { name, data } of collections) {
        await insertData(db, name, data);
    }

    // Tạo chỉ mục văn bản cho collection 'phim' sau khi dữ liệu đã được chèn
    await db.collection('phim').createIndex({
        Ten: "text",
        "MoTa.DienVien": "text",
        "MoTa.DaoDien": "text"
    });

    console.log("Dữ liệu đã được chèn và chỉ mục văn bản đã được tạo thành công.");
    client.close();
}

async function insertData(db, collectionName, data) {
    const collection = db.collection(collectionName);

    // Drop collection nếu tồn tại
    await collection.drop().catch(() => { });

    if (data && data.length) {
        await collection.insertMany(data);
    }
}

main().catch(console.error);
