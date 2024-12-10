const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://screntime12:Y3PO2213Sq4kcmlM@cluster0.zv8zx.mongodb.net/";
const dbName = "Ticker_Movie";

const data = {
  // ----- Phim -----
  Phim: [
    {
      id: 1,
      Ten: "ĐỐ ANH CỒNG ĐƯỢC TÔI",
      Trailer: "https://www.youtube.com/embed/JgUWVooKSrA",
      TheLoai: {
        KieuPhim: "Hài, Hành Động",
        ThoiLuong: "118'",
        QuocGia: "Hàn quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/Do-anh-cong-duoc-toi.jpg",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "RYOO Seung-wan",
        DienVien: "HWANG Jung-min, JUNG Hae-in",
        NgayKhoiChieu: "Thứ Sáu, 27/09/2024",
      },
      ThongTinPhim: "Nội dung phim...",
    },
    {
      id: 2,
      Ten: "VENOM: KÈO CUỐI",
      Trailer: "https://www.youtube.com/embed/I1q-jmvPNn0",
      TheLoai: {
        KieuPhim: "Hành Động, Khoa Học Viễn Tưởng",
        ThoiLuong: "109'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/venom.jpg",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kelly Marcel",
        DienVien: "Tom Hardy, Juno Temple, Chiwetel Ejiofor, Clark Backo, Stephen Graham",
        NgayKhoiChieu: "25/10/2024",
      },
      ThongTinPhim:
        "Tom Hardy sẽ tái xuất trong bom tấn Venom: The Last Dance (Tựa Việt: Venom: Kèo Cuối) và phải đối mặt với kẻ thù lớn nhất từ trước đến nay - toàn bộ chủng tộc Symbiote.",
    },
    {
      id: 3,
      Trailer: "https://www.youtube.com/embed/3Q6ILUwMwM4",
      Ten: "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH (T16)",
      TheLoai: {
        KieuPhim: "Tình Cảm",
        ThoiLuong: "118'",
        QuocGia: "Việt Nam",
        NgonNgu: "Việt Nam",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/ngay-xua-co-mot-chuyen-tinh-official.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Trịnh Đình Lê Minh",
        DienVien: "Avin Lu, Ngọc Xuân, Đỗ Nhật Hoàng, Thanh Tú, Bảo Tiên, Hạo Khang",
        NgayKhoiChieu: "01/11/2024",
      },
      ThongTinPhim:
        "Ngày Xưa Có Một Chuyện Tình xoay quanh câu chuyện tình bạn, tình yêu giữa hai chàng trai và một cô gái từ thuở ấu thơ cho đến khi trưởng thành, phải đối mặt với những thử thách của số phận. Trải dài trong 4 giai đoạn từ năm 1987 - 2000, ba người bạn cùng tuổi - Vinh, Miền, Phúc đã cùng yêu, cùng bỡ ngỡ bước vào đời, va vấp và vượt qua.",
    },
    {
      id: 4,
      Trailer: "https://www.youtube.com/embed/G95mJ72aY28",
      Ten: "LOOK BACK: LIỆU TA CÓ DÁM NHÌN LẠI (T13)",
      TheLoai: {
        KieuPhim: "Anime",
        ThoiLuong: "58'",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/look-back.jpg",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kiyotaka Oshiyama",
        DienVien: "Yumi Kawai, Mizuki Yoshida",
        NgayKhoiChieu: "Thứ Sáu, 20/09/2024",
      },
      ThongTinPhim:
        "Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… “Look Back - Liệu ta có dám nhìn lại” là một câu chuyện trưởng thành đầy xúc động và day dứt.",
    },
    {
      id: 5,
      Trailer: "https://www.youtube.com/embed/MtZ_hf7tLxk",
      Ten: "LÀM GIÀU VỚI MA (T16)",
      TheLoai: {
        KieuPhim: "Hài, Tâm Lý",
        ThoiLuong: "112'",
        QuocGia: "Việt Nam",
        NgonNgu: "VN",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/lam-giau-voi-ma.jpg",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Trung Lùn",
        DienVien: "Hoài Linh, Tuấn Trần, Lê Giang",
        NgayKhoiChieu: "Thứ Sáu, 30/08/2024",
      },
      ThongTinPhim:
        "Làm Giàu Với Ma kể về Lanh (Tuấn Trần) - con trai của ông Đạo làm nghề mai táng (Hoài Linh), lâm vào đường cùng vì cờ bạc. Trong cơn túng quẫn, “duyên tình” đẩy đưa anh gặp một ma nữ (Diệp Bảo Ngọc) và cùng nhau thực hiện những “kèo thơm” để phục vụ mục đích của cả hai.",
    },
    {
      id: 6,
      Ten: "ANH TRAI VƯỢT MỌI TAM TAI (T16)",
      Trailer: "https://www.youtube.com/embed/hBbndPyAPeg",
      TheLoai: {
        KieuPhim: "Hài",
        ThoiLuong: "96'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/anh-trai-vuot-moi-tam-tai.jpg",
      IdDanhMuc: 3,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kim Jae-hoon",
        DienVien: "Park Sung-woong, Kwak Si-yang, Yoon Kyung-ho",
        NgayKhoiChieu: "Thứ Sáu, 13/09/2024",
      },
      ThongTinPhim:
        "Cho Su-gwang là một thanh tra cực kỳ nóng tính, dù có tỷ lệ bắt giữ tội phạm ấn tượng nhưng anh luôn gặp khó khăn trong việc kiểm soát cơn giận của mình. Vì liên tục tấn công các nghi phạm, Cho Su-gwang bị chuyển đến đảo Jeju. Tại đây, vị thanh tra nhận nhiệm vụ truy bắt kẻ lừa đảo giỏi nhất Hàn Quốc - Kim In-hae với 7 tiền án, nổi tiếng thông minh và có khả năng “thiên biến vạn hoá” để ngụy trang hoàn hảo mọi nhân dạng. Cùng lúc đó, Kim In-hae bất ngờ dính vào vụ án mạng nghiêm trọng có liên quan đến tên trùm xã hội đen đang nhăm nhe “thôn tính” đảo Jeju. Trước tình hình nguy cấp phải “giải cứu” hòn đảo Jeju và triệt phá đường dây nguy hiểm của tên trùm xã hội đen, thanh tra Cho Su-gwang bất đắc dĩ phải hợp tác cùng nghi phạm Kim In-hae, tận dụng triệt để các kỹ năng từ phá án đến lừa đảo trên hành trình rượt đuổi vừa gay cấn vừa hài hước để có thể hoàn thành nhiệm vụ cam go.",
    },
    {
      id: 7,
      Trailer: "https://www.youtube.com/embed/QJ8E9R70csY",
      Ten: "CÔ DÂU HÀO MÔN (T18)",
      TheLoai: {
        KieuPhim: "Tình Cảm, Tâm Lý",
        ThoiLuong: "114'",
        QuocGia: "Việt Nam",
        NgonNgu: "Việt Nam",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/co-dau-hao-mon-official.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Vũ Ngọc Đãng",
        DienVien: "Uyển Ân, Samuel An, Kiều Minh Tuấn, Thu Trang, Lê Giang, NSND Hồng Vân",
        NgayKhoiChieu: "18/10/2024",
      },
      ThongTinPhim: "Uyển Ân chính thức lên xe hoa trong thế giới thượng lưu của đạo diễn Vũ Ngọc Đãng qua bộ phim Cô Dâu Hào Môn. Bộ phim xoay quanh câu chuyện làm dâu nhà hào môn dưới góc nhìn hài hước và châm biếm, hé lộ những câu chuyện kén dâu chọn rể trong giới thượng lưu. Phối hợp cùng Uyển Ân ở các phân đoạn tình cảm trong bộ phim lần này là diễn viên Samuel An. Anh được đạo diễn Vũ Ngọc Đãng “đo ni đóng giày” cho vai cậu thiếu gia Bảo Hoàng với ngoại hình điển trai, phong cách lịch lãm và gia thế khủng.",
    },
    {
      id: 8,
      Trailer: "https://www.youtube.com/embed/AfybuJ8zOAI",
      Ten: "VÂY HÃM TẠI ĐÀI BẮC (T18)",
      TheLoai: {
        KieuPhim: "Hồi Hộp, Tâm Lý",
        ThoiLuong: "100'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/vay-ham-tai-dai-bac-poster.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "George Huang",
        DienVien: "Luke Evans, Sung Kang, Gwei Lun-Mei",
        NgayKhoiChieu: "31/10/2024"
      },
      ThongTinPhim: "Theo chân John Lawlor là một đặc vụ DEA cừ khôi bất khả chiến bại, anh sẽ không tiếc hi sinh bất cứ điều gì để hoàn thành nhiệm vụ được giao. Trong khi đó, Joey Kwang là \"người vận chuyển\" hàng đầu ở Đài Bắc với tốc độ không ai sánh bằng và tư duy nhạy bén mà không ai có thể theo kịp cô. Vô tình số phận đã đưa họ đến với nhau trước khi thế lực tội phạm chia cắt họ. 15 năm sau, số phận một lần nữa đẩy Joey và John va chạm nhau trong tình cảnh bất đắc dĩ vào cuối tuần tại Đài Bắc. Và cả hai sẽ khám phá ra rằng điều duy nhất khó hơn việc yêu… chính là yêu lại."
    },
    {
      id: 9,
      Trailer: "https://www.youtube.com/embed/9tDZpBbg8Ow",
      Ten: "ELLI VÀ BÍ ẨN CHIẾC TÀU MA LT (P)",
      TheLoai: {
        KieuPhim: "Hoạt hình",
        ThoiLuong: "86'",
        QuocGia: "Khác",
        NgonNgu: "Lồng Tiếng",
        KhuyenCao: "P: Phim dành cho khán giả mọi lứa tuổi"
      },
      Anh: "/images/phim/elli.webp",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Piet De Rycker, Jesper Moller, Jens Moller",
        DienVien: "Dalia Schmidt-FoB, Oliver Kalkofe",
        NgayKhoiChieu: "25/10/2024"
      },
      ThongTinPhim: "Một hồn ma nhỏ vô gia cư gõ cửa nhà những cư dân lập dị của Chuyến tàu ma để tìm kiếm một nơi thuộc về, cô bé vô tình thu hút sự chú ý từ \"thế giới bên ngoài\" và phải hợp tác với phi hành đoàn quái vật hỗn tạp trong một nhiệm vụ điên rồ."
    },
    {
      id: 10,
      Trailer: "https://www.youtube.com/embed/O_JcwpDergM",
      Ten: "HỌC VIỆN ANH HÙNG: YOU'RE THE NEXT",
      TheLoai: {
        KieuPhim: "Anime",
        ThoiLuong: "99'",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "K: Phim dành cho khán giả từ dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ"
      },
      Anh: "/images/phim/hoc-vien-anh-hung.webp",
      IdDanhMuc: 5,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Okamura Tensai",
        DienVien: "Gerard Caster, Van Barr Jr., Nasim Benelkour",
        NgayKhoiChieu: "08/11/2024"
      },
      ThongTinPhim: "My Hero Academia: You're Next chuyển thể từ bộ truyện tranh ăn khách My Hero Academia. Vào mùa xuân năm thứ hai, trong khi Nhật Bản đang bị tàn phá bởi các cuộc chiến, một người đàn ông bí ẩn bất ngờ xuất hiện có tên là Dark Might. Đối mặt với Deku và những người bạn, hắn tự xưng mình là biểu tượng mới thay thế All Might với tuyên bố hùng hồn: \"Tiếp theo là đến lượt ta!\". Với dã tâm của mình, Dark Might sử dụng năng lực để tạo ra một pháo đài khổng lồ và nhốt người dân cùng anh hùng vào đó. Deku, Bakugo, Todoroki cùng lớp 1-A của trường U.A. dũng cảm đối đầu với Dark Might và tổ chức tội phạm bí ẩn do hắn cầm đầu, mang tên \"Gia đình Gollini\". Liệu họ có thể ngăn chặn tham vọng của biểu tượng mới Dark Might và bảo vệ thế giới?"
    },
    {
      id: 11,
      Trailer: "https://www.youtube.com/embed/L8GYbHu20nQ",
      Ten: "NHỮNG NHÀ VÔ ĐỊCH (T16)",
      TheLoai: {
        KieuPhim: "Hoạt hình, Chính Kịch",
        ThoiLuong: "119'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/Nh_ng_nh_v_ch_09.webp",
      IdDanhMuc: 4,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Soleen Yusef",
        DienVien: "",
        NgayKhoiChieu: "09/11/2024"
      },
      ThongTinPhim: "Bộ phim đưa người xem dõi theo hành trình của Mona, một cô bé 11 tuổi trốn khỏi Syria bị chiến tranh tàn phá cùng gia đình và định cư tại Berlin. Gặp khó khăn trong việc thích nghi với môi trường mới, Mona phải đối mặt với sự bắt nạt và cô lập tại trường học mới. Tuy nhiên, cuộc sống của cô bước sang một trang mới khi một giáo viên tận tâm, ông Che, nhận ra tài năng chơi bóng đá của cô và khuyến khích cô tham gia đội bóng nữ của trường. Qua bóng đá, Mona học được tầm quan trọng của tinh thần đồng đội, sự kiên cường và việc tìm kiếm chỗ đứng của mình trong một thế giới mới."
    },
    {
      id: 12,
      Trailer: "https://www.youtube.com/embed/jz-LPOpWBqM",
      Ten: "PHÒNG GIÁO VIÊN (T13)",
      TheLoai: {
        KieuPhim: "Chính Kịch",
        ThoiLuong: "98'",
        QuocGia: "Khác",
        NgonNgu: "VN",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/Ph_ng_Gi_o_Vi_n__06.webp",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "İlker Çatak",
        DienVien: "",
        NgayKhoiChieu: "06/11/2024"
      },
      ThongTinPhim: "Carla Nowak là một giáo viên thể dục và toán tận tâm, bắt đầu công việc đầu tiên tại một trường trung học ở Đức. Chủ nghĩa lý tưởng của cô nhanh chóng khiến cô nổi bật giữa các đồng nghiệp. Khi một loạt vụ trộm xảy ra trong trường và một trong những học sinh của cô bị cáo buộc, Carla quyết tâm tìm ra sự thật. Trong quá trình đối mặt với những bậc phụ huynh giận dữ, đồng nghiệp cứng đầu và học sinh nổi loạn, cô bị cuốn vào những thực tế khắc nghiệt của hệ thống giáo dục."
    },
    {
      id: 13,
      Trailer: "https://www.youtube.com/embed/2T_mKyH17mY",
      Ten: "MẬT MÃ ĐỎ",
      TheLoai: {
        KieuPhim: "Hài, Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/mat-ma-do.webp",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Jake Kasdan",
        DienVien: "Dwayne Johnson, Chris Evans, Lucy Liu, J.K. Simmons",
        NgayKhoiChieu: "15/11/2024"
      },
      ThongTinPhim: "Red One / Mật Mã Đỏ kể về Callum Drift, người đứng đầu lực lượng an ninh Bắc Cực, phải hợp tác với Jack O'Malley, một thợ săn tiền thưởng, để tìm và giải cứu Ông già Noel sau khi ông bị bắt cóc."
    },
    {
      id: 14,
      Trailer: "https://www.youtube.com/embed/bmkR2EY_hcY",
      Ten: "CÔNG TỬ BẠC LIÊU",
      TheLoai: {
        KieuPhim: "Hài, Gia đình",
        ThoiLuong: "99'",
        QuocGia: "Việt Nam",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/cong-tu-bac-lieu.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Lý Minh Thắng",
        DienVien: "Song Luân, Kaity Nguyễn, Thiên Ân, Thành Lộc, Thanh Thủy, Hữu Châu, Công Dương, ...",
        NgayKhoiChieu: "20/12/2024"
      },
      ThongTinPhim: "Sáng tạo dựa trên những giai thoại về chàng công tử đệ nhất chơi ngông xứ Nam Kỳ, bộ phim Công Tử Bạc Liêu sẽ đưa khán giả trở về những năm đầu thế kỷ 20, khi giới thượng lưu miền Nam khiến cho vùng đất này trở thành điểm đến của những cuộc vui chơi, hình thức giải trí phô trương và tốn kém chưa từng có trước đây."
    },
    {
      id: 15,
      Trailer: "https://www.youtube.com/embed/ST08liEjNsw",
      Ten: "CHÚA TỂ CỦA NHỮNG CHIẾC NHẪN: CUỘC CHIẾN CỦA ROHIRRIM",
      TheLoai: {
        KieuPhim: "Hoạt hình, Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/chua-te-cua-nhung-chiec-nhan.webp",
      IdDanhMuc: 9,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Kenji Kamiyama",
        DienVien: "Brian Cox, Gaia Wise, Luke Pasqualino, Miranda Otto,…",
        NgayKhoiChieu: "13/12/2024"
      },
      ThongTinPhim: "Lấy bối cảnh 183 năm trước những sự kiện trong bộ ba phim gốc, “Chúa Tể Của Những Chiếc Nhẫn: Cuộc Chiến Của Rohirrim\" kể về số phận của Gia tộc của Helm Hammerhand, vị vua huyền thoại của Rohan. Cuộc tấn công bất ngờ của Wulf, lãnh chúa xảo trá và tàn nhẫn của tộc Dunlending, nhằm báo thù cho cái chết của cha hắn, đã buộc Helm và thần dân của ngài phải chống cự trong pháo đài cổ Hornburg - một thành trì vững chãi sau này được biết đến với tên gọi Helm's Deep. Tình thế ngày càng tuyệt vọng, Héra, con gái của Helm, phải dốc hết sức dẫn dắt cuộc chiến chống lại kẻ địch nguy hiểm, quyết tâm tiêu diệt bọn chúng."
    },
    {
      id: 16,
      Trailer: "https://www.youtube.com/embed/T-aJxCFUN_8",
      Ten: "CAPTAIN AMERICA: THẾ GIỚI MỚI",
      TheLoai: {
        KieuPhim: "Phiêu Lưu, Siêu Anh Hùng, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/captain-america-the-gioi-moi.webp",
      IdDanhMuc: 2,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Julius Onah",
        DienVien: "Harrison Ford, Anthoy Mackie, Giancarlo Esposito, Rosa Salazar, Seth Rollins, Shira Haas",
        NgayKhoiChieu: "14/02/2025"
      },
      ThongTinPhim: "Sau cuộc gặp gỡ với tân Tổng thống Hoa Kỳ Thaddeus Ross, Sam Wilson vô tình bị cuốn vào cuộc xung đột tại một sự kiện quốc tế. Trong vai trò Captain America mới, Wilson buộc phải điều tra và lật tẩy một âm mưu toàn cầu bất chính, trước khi kẻ thủ ác nhấn chìm cả thế giới vào cảnh suy tàn."
    },
    {
      id: 17,
      Trailer: "https://www.youtube.com/embed/R4AFSgUGEEs",
      Ten: "VÕ SĨ GIÁC ĐẤU II",
      TheLoai: {
        KieuPhim: "Phiêu Lưu, Hành Động",
        ThoiLuong: "99'",
        QuocGia: "Khác",
        NgonNgu: "VN",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/vo-si-giac-dau-ii.webp",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Ridley Scott",
        DienVien: "Paul Mescal, Joseph Quinn, Pedro Pascal, Connie Nielsen, Denzel Washington,…",
        NgayKhoiChieu: "15/11/2024"
      },
      ThongTinPhim: "Sau khi đánh mất quê hương vào tay hoàng đế bạo chúa – người đang cai trị Rome, Lucius trở thành nô lệ giác đấu trong đấu trường Colosseum và phải tìm kiếm sức mạnh từ quá khứ để đưa vinh quang trở lại cho người dân Rome."
    },
    {
      id: 18,
      Trailer: "https://www.youtube.com/embed/-OV2Fv-shro",
      Ten: "TRANSFORMERS MỘT",
      TheLoai: {
        KieuPhim: "Gia đình, Hành động, Phiêu lưu, Hoạt hình, Khoa học - Viễn tưởng",
        ThoiLuong: "123 phút",
        QuocGia: "Mỹ",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
      },
      Anh: "/images/phim/transformers-mot.jpg",
      IdDanhMuc: 2,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Josh Cooley",
        DienVien: "Chris Hemsworth; Brian Tyree Henry; Scarlett Johansson",
        NgayKhoiChieu: "27/09/2024"
      },
      ThongTinPhim: "Câu chuyện về nguồn gốc chưa từng được hé lộ của Optimus Prime và Megatron. Hai nhân vật được biết đến như những kẻ thù truyền kiếp, nhưng cũng từng là những người anh em gắn bó, đã thay đổi vận mệnh của Cybertron mãi mãi."
    },
    {
      id: 19,
      Trailer: "https://www.youtube.com/embed/CpcQcKIDYFs",
      Ten: "MỘ ĐOM ĐÓM",
      TheLoai: {
        KieuPhim: "Chiến tranh, Chính kịch, Hoạt hình",
        ThoiLuong: "89 phút",
        QuocGia: "Nhật Bản",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "K: Phim dành cho khán giả mọi lứa tuổi"
      },
      Anh: "/images/phim/mo-dom-dom.jpg",
      IdDanhMuc: 5,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Takahata Isao",
        DienVien: "Tatsumi Tsutomu, Shiraishi Ayano, Shinohara Yoshiko",
        NgayKhoiChieu: "04/10/2024"
      },
      ThongTinPhim: "Bộ phim được đặt trong bối cảnh giai đoạn cuối chiến tranh thế giới thứ 2 ở Nhật, kể về câu chuyện cảm động về tình anh em của hai đứa trẻ mồ côi."
    },
    {
      id: 20,
      Trailer: "https://www.youtube.com/embed/tp_borHTCKI",
      Ten: "GÃ TRÙM VÔ DANH",
      TheLoai: {
        KieuPhim: "Chính kịch, Hành động, Hình sự",
        ThoiLuong: "110 phút",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
      },
      Anh: "/images/phim/ga-trum-vo-danh.jpg",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Lim Sung-yong",
        DienVien: "Chun Jung-myung, Jin Yi-han, Lee Shi-ah, Lee Ha-yul, Kwak Hee-sung, Kim Do-hoon-I,...",
        NgayKhoiChieu: "04/10/2024"
      },
      ThongTinPhim: "Phim kể về gã giang hồ mới nổi Kwon Sang-Gon trở thành một ông trùm băng đảng hùng mạnh. Tưởng chừng gã sẽ được sống quyền lực đứng trên xã hội, nhưng sự thật phũ phàng trong thế giới giang hồ khiến cuộc đời của gã trở thành địa ngục của âm mưu và phản bội."
    },
    {
      id: 21,
      Trailer: "https://www.youtube.com/embed/LaHRWAsZNzs",
      Ten: "Biệt Đội Hot Girl",
      TheLoai: {
        KieuPhim: "Hài, Hành động, Hình sự, Lãng mạn",
        ThoiLuong: "110 phút",
        QuocGia: "Việt Nam",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
      },
      Anh: "/images/phim/vimage.jpg",
      IdDanhMuc: 2,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "Vĩnh Khương",
        DienVien: "NSND Hoàng Dũng, Mr Kim, Yu CHU, Sam Sony, Bảo Uyên, Tuệ Minh, Thuỳ Trang, Ái Vân, Anna Linh",
        NgayKhoiChieu: "25/10/2024"
      },
      ThongTinPhim: "Câu chuyện của 6 cô gái đến từ 3 quốc gia Châu Á. Họ không biết mình là ai? Đến từ quốc gia nào? HẮC VÔ ĐẠO một tay trùm mafia buôn ma túy, buôn người giải thoát cứu sống 6 cô gái từ lúc nhỏ và nuôi dạy các cô gái trên hoang đảo. Các cô gái trưởng thành, khao khát được yêu nhưng cuộc sống và số phận buộc họ phải thực hiện những phi vụ mạo hiểm, kể cả giết người để bảo vệ những trẻ em vô tội."
    },
    {
      id: 22,
      Trailer: "https://www.youtube.com/embed/lbLk9PzHWfg",
      Ten: "NGÀY TA ĐÃ YÊU",
      TheLoai: {
        KieuPhim: "Tình Cảm, Tâm Lý",
        ThoiLuong: "104'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      },
      Anh: "/images/phim/ngay-ta-da-yeu.webp",
      IdDanhMuc: 1,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "John Crowley",
        DienVien: "Andrew Garfield, Florence Pugh, ...",
        NgayKhoiChieu: "15/11/2024",
      },
      ThongTinPhim: "Định mệnh đã đưa một nữ đầu bếp đầy triển vọng và một người đàn ông vừa trải qua hôn nhân đổ vỡ đến với nhau trong tình cảnh đặc biệt. Bộ phim là cuộc tình mười năm sâu đậm của cặp đôi này, từ lúc họ rơi vào lưới tình, xây dựng tổ ấm, cho đến khi một biến cố xảy đến thay đổi hoàn toàn cuộc đời họ."
    },
    {
      id: 23,
      Trailer: "https://www.youtube.com/embed/EIARKqcXILM",
      Ten: "ĐÔI BẠN HỌC YÊU",
      TheLoai: {
        KieuPhim: "Tình Cảm, Hài",
        ThoiLuong: "99'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      },
      Anh: "/images/phim/doi-ban-hoc-yeu.webp",
      IdDanhMuc: 1,
      TrangThai: "sapchieu",
      MoTa: {
        DaoDien: "E.Oni",
        DienVien: "Kim Go Eun, Steve Sanghyun Noh",
        NgayKhoiChieu: "08/11/2024",
      },
      ThongTinPhim: "Bộ phim xoay quanh đôi bạn ngỗ nghịch Jae-hee và Heung-soo cùng những khoảnh khắc “dở khóc dở cười” khi cùng chung sống trong một ngôi nhà. Jae-hee là một cô gái “cờ xanh” với tâm hồn tự do, sống hết mình với tình yêu. Ngược lại, Heung-soo lại là một “cờ đỏ” chính hiệu khi cho rằng tình yêu là sự lãng phí cảm xúc không cần thiết. Bỏ qua những tin đồn lan tràn do người khác tạo ra, Jae-hee và Heung-soo chọn sống chung nhưng yêu theo cách riêng của họ. Hai quan điểm tình yêu trái ngược sẽ đẩy cả hai sang những ngã rẽ và kết cục khác nhau. Sau cùng, Jae-hee hay Heung-soo sẽ về đích trong hành trình “học yêu” này?"
    },
    {
      id: 24,
      Trailer: "https://www.youtube.com/embed/4ALt4VT7grw",
      Ten: "CƯỜI XUYÊN BIÊN GIỚI",
      TheLoai: {
        KieuPhim: "Hài",
        ThoiLuong: "99'",
        QuocGia: "Hàn Quốc",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      },
      Anh: "/images/phim/cuoi-xuyen-bien-gioi.webp",
      IdDanhMuc: 3,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "KIM Chang-ju",
        DienVien: "Ryu Seung-ryong, Jin Sun-kyu, Igor Rafael P EDROSO, Luan B RUM DE ABREU E LIMA, JB João Batista GOMES DE O LIVEIRA, Yeom Hye-ran, Go Kyoung-pyo, Lee Soon-won",
        NgayKhoiChieu: "15/11/2024",
      },
      ThongTinPhim: "Cười Xuyên Biên Giới kể về hành trình của Jin-bong (Ryu Seung-ryong) - cựu vô địch bắn cung quốc gia, sau khi nghỉ hưu, anh đã trở thành một nhân viên văn phòng bình thường. Đứng trước nguy cơ bị sa thải, Jin-bong phải nhận một nhiệm vụ bất khả thi là bay đến nửa kia của trái đất trong nỗ lực tuyệt vọng để sinh tồn. Sống sót sau một sự cố đe doạ tính mạng, Jin-bong đã “hạ cánh” xuống khu rừng Amazon, nơi anh gặp bộ ba thổ dân bản địa có kỹ năng bắn cung thượng thừa: Sika, Eeba và Walbu. Tin rằng đã tìm ra cách để tự cứu mình, Jin-bong hợp tác với phiên dịch ngáo ngơ Bbang-sik (Jin Sun-kyu) và đưa ba chiến thần cung thủ đến Hàn Quốc cho một nhiệm vụ táo bạo."
    },
    {
      id: 25,
      Trailer: "https://www.youtube.com/embed/gm8Y562kgfs",
      Ten: "HỘI CÁ VÀNG",
      TheLoai: {
        KieuPhim: "Chính Kịch",
        ThoiLuong: "111'",
        QuocGia: "Khác",
        NgonNgu: "Phụ Đề",
        KhuyenCao: "P: Phim dành cho khán giả mọi lứa tuổi",
      },
      Anh: "/images/phim/hoi-ca-vang.webp",
      IdDanhMuc: 4,
      TrangThai: "dangchieu",
      MoTa: {
        DaoDien: "Alireza Golafshan",
        DienVien: "Ryu Seung-ryong , Jin Sun-kyu, Igor Rafael P EDROSO, Luan B RUM DE ABREU E LIMA, JB João Batista GOMES DE O LIVEIRA, Yeom Hye-ran và Go Kyoung- pyo, Lee Soon-won",
        NgayKhoiChieu: "21/11/2024"
      },
      ThongTinPhim: "Oliver sống cuộc đời bận rộn của một nhà quản lý ngân hàng. Sau tai nạn kinh hoàng khiến anh liệt nửa người và phải ngồi xe lăn, cuộc sống của Oliver hoàn toàn đảo lộn. Những sự tình cờ đưa đẩy anh gặp gỡ Hội Cá vàng – một nhóm bốn người khuyết tật sống chung nhà. Một ngày nọ, các rắc rối tài chính trong quá khứ khiến Oliver và Hội Cá vàng phải lên kế hoạch thực hiện một chuyến phiêu lưu tới Thụy Sĩ; nhiệm vụ của họ: làm sao để buôn một lượng tiền bẩn về Đức trót lọt."
    },
  ],

  // ----- Thể Loại -----
  TheLoai: [
    {
      id: 1,
      Ten: "Tình Cảm",
    },
    {
      id: 2,
      Ten: "Hành động",
    },
    {
      id: 3,
      Ten: "Hài Hước",
    },
    {
      id: 4,
      Ten: "Chính kịch",
    },
    {
      id: 5,
      Ten: "Hoạt Hình - Phiêu lưu",
    },
  ],

  // ----- Blog -----
  Blog: [
    {
      id: 1,
      TenBlog: "Top phim Địch Lệ Nhiệt Ba đã làm nên tên tuổi",
      Anh: "/images/blog/blog1.jpg",
      LuotXem: "314 lượt xem",
    },
  ],

  Blogditals: [
    {
      id: 1,
      MaBlog: 7,
      NoiDung1: "Trảm Thần: Phàm Trần Thần Vực",
      NoiDung2: "hể loại: Anime bộ, Fantasy, Adventure, Action",
      NoiDung3: "Quốc gia: Trung Quốc",
      NoiDung4: "Ngôn ngữ: VietSub",
      NoiDung6: "Năm sản xuất: 2024",
      NoiDung5: "Câu chuyện lấy bối cảnh thời kỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh: "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918160932-638622725722888616.jpg"
    },
  ],

  // ----- Rạp -----
  Rap: [
    {
      id: 1,
      TenRap: "Rạp ScreenTime Quận 12",
      ViTri: "Vincom Center, Quận 12, TP.HCM",
      // Phòng trong rạp
      PhongChieu: [
        // phòng 1
        {
          id: 1,
          TenPhongChieu: "Phòng chiếu 1",
          SoLuongGhe: 10,
          // Thêm danh sách ghế
          Ghe: [
            { Hang: "A", Ghe: ["P1_A01", "P1_A02", "P1_A03", "P1_A04", "P1_A05"] },
            { Hang: "B", Ghe: ["P1_B01", "P1_B02", "P1_B03", "P1_B04", "P1_B05"] },
          ],
        },
        // phòng 2
        {
          id: 2,
          TenPhongChieu: "Phòng chiếu 2",
          SoLuongGhe: 10,
          // Thêm danh sách ghế
          Ghe: [
            { Hang: "C", Ghe: ["P2_C01", "P2_C02", "P2_C03", "P2_C04", "P2_C05"] },
            { Hang: "D", Ghe: ["P2_D01", "P2_D02", "P2_D03", "P2_D04", "P2_D05"] },
          ],
        }
      ],
    },
  ],

  // ----- Suất Chiếu -----
  SuatChieu: [
    // Ngày 26/09/2024
    { id: 1, IdPhim: 1, IdPhong: 1, NgayChieu: "26/09/2024", GioChieu: "15:00", TrangThai: "DangChieu", DaDatGhe: [] },
    { id: 2, IdPhim: 1, IdPhong: 2, NgayChieu: "26/09/2024", GioChieu: "18:00", TrangThai: "DangChieu", DaDatGhe: [] }
  ],

  // ----- Loại Vé -----
  LoaiVe: [
    {
      id: 1,
      TenVe: "Người Lớn - Đơn",
      GiaVe: 75000,
    },
    {
      id: 2,
      TenVe: "HSSV-Người Cao Tuổi",
      GiaVe: 45000,
    },
    {
      id: 3,
      TenVe: "Người Lớn - Đôi",
      GiaVe: 155000,
    },
  ],

  // ----- Combo -----
  Combo: [
    {
      id: 1,
      Anh: "/images/combo/combo1.jpg",
      TenCombo: "COMBO PARYPARY",
      NoiDung: "2 Bắp Ngọt 60oz + 4 Coke 22oz",
      Gia: 209000,
    },
    {
      id: 2,
      Anh: "/images/combo/combo2.jpg",
      TenCombo: "COMBO SOLO",
      NoiDung: "1 Bắp Ngọt 60oz + 1 Coke 32oz",
      Gia: 94000,
    },
    {
      id: 3,
      Anh: "/images/combo/combo3.jpg",
      TenCombo: "COMBO COUPLE",
      NoiDung: "1 Bắp Ngọt 60oz + 2 Coke 32oz",
      Gia: 115000,
    },
    {
      id: 4,
      Anh: "/images/combo/combo4.jpg",
      TenCombo: "NƯỚC SUỐI DASANI",
      NoiDung: "500/510ML",
      Gia: 20000,
    },
    {
      id: 5,
      Anh: "/images/combo/combo5.jpg",
      TenCombo: "NƯỚC TRÁI CÂY NUTRIBOOST",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 6,
      Anh: "/images/combo/combo6.jpg",
      TenCombo: "NƯỚC CAM TEPPY",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 7,
      Anh: "/images/combo/combo7.jpg",
      TenCombo: "FANTA",
      NoiDung: "",
      Gia: 30000,
    },
    {
      id: 8,
      Anh: "/images/combo/combo8.jpg",
      TenCombo: "SPRITE",
      NoiDung: "",
      Gia: 30000,
    },
    {
      id: 9,
      Anh: "/images/combo/combo9.jpg",
      TenCombo: "COCACOLA",
      NoiDung: "",
      Gia: 30000,
    },
  ],

  // ----- TÀI_KHOẢN -----
  TaiKhoan: [
    {
      id: 1,
      Ten: "Nguyen Thai Son",
      SDT: "0987654321",
      NgaySinh: "1990-10-10",
      GioiTinh: "Nam",
      Anh: "path/to/son_image.jpg",
      TenDangNhap: "NguyenThaiSon",
      MatKhau: "12345678",
      Email: "nguyenthaison@example.com",
      IsAdmin: 0,
      DiaChi: "123 Đường ABC, Quận 1, TP. HCM",
    },
  ],

  // ----- BÌNH_LUẬN -----
  BinhLuan: [
    {
      id: 1,
      NoiDung: "Phim hay",
      NgayBinhLuan: "26-09-2024",
      IdPhim: 1,
      IdTaiKhoan: 1,
    },
  ],

  // ----- Hóa_Đơn -----
  HoaDon: [
    {
      id: 1,
      NgaySuatChieu: "29/10 - T6",
      GheNgoi: "A01",
      TenPhong: 1,
      GiaVe: 200000,
      SoLuongVe: 1,
      TrangThai: "Đã thanh toán",
      IdSuatChieu: 1,
      IdTaiKhoan: 1,
      IdCombo: 1,
    },
  ],

  // ----- ADMIN -----
  Admin: [
    {
      id: 1,
      Quyen: "Admin",
      HoTen: "Nguyễn Thái Sơn",
      TenDangNhap: "Sondev",
      MatKhau: "12345678",
      Anh: "/images/combo/combo4.jpg",
      DiaChi: "Quận 12, TP. HCM",
      NgaySinh: "29-09-2004",
      GioTinh: "Nam",
      SDT: "0395427399",
      ChucVu: "Nhân viên",
      Tinhtrang: "Hoạt động",
      IsAdmin: 0,
    },
  ],

  // ----- Sukien -----
  Sukien: [
    {
      id: 1,
      Ten: "SINHNHAT1",
      NoiDung: "Khuyến mãi giảm giá khi mua vé tại ScreenTime",
      Anh: "/images/event/sinhnhat.jpg",
      NgayBatDau: "20/10/2024",
      NgayKetThuc: "22/10/2024",
      Luuy: "Áp dụng vào ngày 28 tháng 6.",
      Giam: "20%",
      DieuKien: "Áp dụng tại web 28 tháng 6.",
    },
    {
      id: 2,
      Ten: "HAIPHUONG45",
      Anh: "/images/event/haiphuong.jpg",
      NoiDung: "Đặt vé phim Hai Phượng - Bộ phim hành động kịch tính do Ngô Thanh Vân thủ vai chính",
      NgayBatDau: "05-10-2024",
      NgayKetThuc: "05-11-2024",
      Luuy: "Áp dụng vào ngày 28 tháng 6.",
      Giam: "20%",
      DieuKien:
        "Áp dụng cho học sinh sinh viên xuất trình thẻ học sinh hoặc CCCD dưới 22 tuổi.",
    },
    {
      id: 3,
      Ten: "GIANGSINH2024",
      NoiDung: "Ưu đãi vé xem phim mùa Giáng Sinh 2024 tại tất cả các rạp.",
      Anh: "/images/event/giangsinh2024.jpg",
      NgayBatDau: "01/12/2024",
      NgayKetThuc: "25/12/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu.",
      Giam: "20%",
      DieuKien: "Áp dụng khi mua trực tuyến qua ứng dụng ScreenTime.",
    },
    {
      id: 4,
      Ten: "TET2025",
      NoiDung: "Mua vé xem phim và nhận ngay lì xì Tết 2025.",
      Anh: "/images/event/tet2025.jpg",
      NgayBatDau: "01/02/2025",
      NgayKetThuc: "15/02/2025",
      Luuy: "Áp dụng trong dịp Tết Nguyên Đán.",
      Giam: "20%",
      DieuKien: "Áp dụng cho đơn hàng từ 2 vé trở lên.",
    },
    {
      id: 5,
      Ten: "BLACKFRIDAY2024",
      NoiDung: "Giảm giá 50% tất cả các phim nhân dịp Black Friday.",
      Anh: "/images/event/Black_Friday.jpg",
      NgayBatDau: "28/11/2024",
      NgayKetThuc: "29/11/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu trong ngày.",
      Giam: "20%",
      DieuKien: "Áp dụng cho các giao dịch trực tuyến.",
    },
    {
      id: 6,
      Ten: "SUMMERSALE2025",
      NoiDung: "Giảm 30% vé xem phim mùa hè 2025 tại ScreenTime.",
      Anh: "/images/event/summer.jpg",
      NgayBatDau: "01/06/2025",
      NgayKetThuc: "30/06/2025",
      Luuy: "Áp dụng vào các ngày cuối tuần.",
      Giam: "20%",
      DieuKien: "Áp dụng cho tất cả thành viên ScreenTime.",
    },
    {
      id: 7,
      Ten: "HALLOWEEN2024",
      NoiDung: "Mua vé phim kinh dị giảm 40% trong dịp Halloween.",
      Anh: "/images/event/halloween.jpg",
      NgayBatDau: "25/10/2024",
      NgayKetThuc: "31/10/2024",
      Luuy: "Áp dụng cho phim thuộc thể loại kinh dị.",
      Giam: "20%",
      DieuKien: "Áp dụng cho học sinh, sinh viên xuất trình thẻ.",
    },
    {
      id: 8,
      Ten: "QUOCKHANH2025",
      NoiDung: "Ưu đãi đặc biệt nhân dịp Quốc Khánh 2/9.",
      Anh: "/images/event/quockhanh.jpg",
      NgayBatDau: "01/09/2025",
      NgayKetThuc: "02/09/2025",
      Luuy: "Áp dụng trong ngày lễ Quốc Khánh.",
      Giam: "20%",
      DieuKien: "Áp dụng cho tất cả các khách hàng.",
    },
    {
      id: 9,
      Ten: "VALENTINE2025",
      NoiDung: "Giảm 50% cho các cặp đôi nhân dịp Valentine 2025.",
      Anh: "/images/event/valentine.jpg",
      NgayBatDau: "14/02/2025",
      NgayKetThuc: "14/02/2025",
      Luuy: "Áp dụng cho các suất chiếu buổi tối.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng mua 2 vé trở lên.",
    },
    {
      id: 10,
      Ten: "WOMENSDAY2025",
      NoiDung: "Miễn phí vé cho khách hàng nữ nhân ngày 8/3.",
      Anh: "/images/event/womenday.jpg",
      NgayBatDau: "08/03/2025",
      NgayKetThuc: "08/03/2025",
      Luuy: "Áp dụng cho khách hàng nữ.",
      Giam: "20%",
      DieuKien: "Áp dụng cho suất chiếu đầu tiên trong ngày.",
    },
    {
      id: 11,
      Ten: "MOTHERSDAY2025",
      NoiDung: "Giảm giá 30% cho khách hàng đi cùng mẹ vào ngày 10/5.",
      Anh: "/images/event/mothersday.jpg",
      NgayBatDau: "10/05/2025",
      NgayKetThuc: "10/05/2025",
      Luuy: "Áp dụng cho tất cả các phim.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng mua 2 vé trở lên.",
    },
    {
      id: 12,
      Ten: "THANKSGIVING2024",
      NoiDung: "Khuyến mãi dịp lễ Tạ Ơn - Mua vé xem phim giảm 20%.",
      Anh: "/images/event/thanksgiving.jpg",
      NgayBatDau: "27/11/2024",
      NgayKetThuc: "29/11/2024",
      Luuy: "Áp dụng cho tất cả các suất chiếu.",
      Giam: "20%",
      DieuKien: "Áp dụng cho giao dịch mua online.",
    },
    {
      id: 13,
      Ten: "TRUNGTET2024",
      NoiDung: "Ưu đãi Trung Thu - Giảm 25% vé phim thiếu nhi.",
      Anh: "/images/event/trungthu.jpg",
      NgayBatDau: "15/09/2024",
      NgayKetThuc: "20/09/2024",
      Luuy: "Áp dụng cho phim thiếu nhi.",
      Giam: "20%",
      DieuKien: "Áp dụng cho khách hàng dưới 12 tuổi.",
    },
  ],

};

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Kết nối thành công đến server MongoDB");
    const db = client.db(dbName);

    const collections = [
      { name: "phim", data: data.Phim },
      { name: "theloai", data: data.TheLoai },
      { name: "blog", data: data.Blog },
      { name: "rap", data: data.Rap },
      { name: "suatchieu", data: data.SuatChieu },
      { name: "loaive", data: data.LoaiVe },
      { name: "hoadon", data: data.HoaDon },
      { name: "combo", data: data.Combo },
      { name: "taikhoan", data: data.TaiKhoan },
      { name: "binhluan", data: data.BinhLuan },
      { name: "admin", data: data.Admin },
      { name: "sukien", data: data.Sukien },
      { name: "blogdetial", data: data.Blogditals },
    ];

    for (const { name, data } of collections) {
      await insertData(db, name, data);
    }

    console.log("Dữ liệu đã được nhập thành công.");
  } catch (error) {
    console.error("Lỗi khi kết nối hoặc thao tác với MongoDB:", error);
  } finally {
    await client.close();
    console.log("Đã ngắt kết nối khỏi MongoDB.");
  }
}

async function insertData(db, collectionName, data) {
  const collection = db.collection(collectionName);

  try {
    // Drop collection if it exists
    await collection.drop();
    console.log(`Đã xóa collection: ${collectionName}`);
  } catch (error) {
    console.log(
      `Không thể xóa collection ${collectionName} (có thể không tồn tại):`,
      error.message
    );
  }

  if (data && data.length) {
    await collection.insertMany(data);
    console.log(`Đã thêm dữ liệu vào collection: ${collectionName}`);
  } else {
    console.log(`Không có dữ liệu cho collection: ${collectionName}`);
  }
}

main().catch(console.error);
