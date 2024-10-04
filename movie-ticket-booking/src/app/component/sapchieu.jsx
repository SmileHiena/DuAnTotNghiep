import "../../../public/styles/sapchieu.css";
const SapChieu = () => {
    const posts = [
        {
            id: 1,
            Ten: "ĐỐ ANH CỒNG ĐƯỢC TÔI (T18)",
            TheLoai: {
                KieuPhim: "Hài, Hành Động",
                ThoiLuong: "118'",
                QuocGia: "Hàn quốc",
                NgonNgu: "Phụ Đề",
                KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
            },
            Anh: "Do-anh-cong-duoc-toi.jpg",
            IdDanhMuc: 4,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "RYOO Seung-wan",
                DienVien: "HWANG Jung-min, JUNG Hae-in",
                NgayKhoiChieu: "Thứ Sáu, 27/09/2024"
            },
            ThongTinPhim: "Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! ..."
        },
        {
            id: 2,
            Ten: "CÁM (T18)",
            TheLoai: {
                KieuPhim: "Kinh Dị",
                ThoiLuong: "122'",
                QuocGia: "Việt Nam",
                NgonNgu: "Tiếng Việt",
                KhuyenCao: "T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)"
            },
            Anh: "cam.jpg",
            IdDanhMuc: 2,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "Trần Hữu Tấn",
                DienVien: "Quốc Cường, Thúy Diễm...",
                NgayKhoiChieu: "Thứ Sáu, 20/09/2024"
            },
            ThongTinPhim: "Câu chuyện phim là dị bản kinh dị đẫm máu..."
        },
        {
            "id": 3,
            "Ten": "LÀM GIÀU VỚI MA (T16)",
            "TheLoai": {
                "KieuPhim": "Hài, Tâm Lý",
                "ThoiLuong": "112'",
                "QuocGia": "Việt Nam",
                "NgonNgu": "Tiếng Việt",
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
        // Các phim khác...
    ];    

    return (
        <section className="sap-chieu">
            <h2 className="sap-chieu__title">Phim sắp chiếu</h2>
            <div className="sap-chieu__container">
                <div className="sap-chieu__row">
                    {posts.map((post) => (
                        <div key={post.id} className="sap-chieu__card">
                            <img src={`/images/phim/${post.Anh}`} alt={post.Ten} className="sap-chieu__image" />
                            <div className="sap-chieu__overlay">
                                <p className="sap-chieu__card-title">{post.Ten} </p>
                                <ul className="sap-chieu__info">
                                    <li> <i class="fa-solid fa-tag" style={{color: '#FFD43B',}}></i> &nbsp; {post.TheLoai.KieuPhim}</li>
                                    <li><i class="fa-solid fa-clock"  style={{color: '#FFD43B',}}></i> &nbsp; {post.TheLoai.ThoiLuong}</li>
                                    <li><i class="fa-solid fa-earth-americas"  style={{color: '#FFD43B',}}></i> &nbsp; {post.TheLoai.QuocGia}</li>
                                    <li><i class="fa-solid fa-comment"  style={{color: '#FFD43B',}}></i> &nbsp; {post.TheLoai.NgonNgu}</li>
                                </ul>
                                {/* <p className="sap-chieu__date">Khởi chiếu: {post.MoTa.NgayKhoiChieu}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-container">
                <button className="button-hover">
                    Xem thêm
                </button>
            </div>
        </section>
    );
};

export default SapChieu;