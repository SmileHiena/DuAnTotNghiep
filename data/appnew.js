const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "Ticker_Movie";

const data = {
  // ----- Phim -----
  Phim: [
    {
      id: 1,
      Ten: "ĐỐ ANH CỒNG ĐƯỢC TÔI",
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
  ],


  // ----- Thể Loại -----
  TheLoai: [
    {
      id: 1,
      Ten: "Tình Cảm",
      Anh:"",
    }
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

  Blogditals:[
    {
      id:1,
      MaBlog:7,
      NoiDung1:"Trảm Thần: Phàm Trần Thần Vực",
      NoiDung2:"hể loại: Anime bộ, Fantasy, Adventure, Action",
      NoiDung3:"Quốc gia: Trung Quốc",
      NoiDung4:"Ngôn ngữ: VietSub",
      NoiDung6:"Năm sản xuất: 2024",
      NoiDung5:"Câu chuyện lấy bối cảnh thời kỳ mạt thế, nơi nguy hiểm luôn rình rập. Bộ phim xoay quanh Lâm Thất Dạ, một thiếu niên được chọn làm đại diện của thần minh. Thông qua sự nỗ lực và giác ngộ của bản thân, Lâm Thất Dạ dần trở thành người gác đêm cho đô thị, với nhiệm vụ bảo vệ quê hương và đất nước khỏi những hiểm nguy. Phim không chỉ mang đến những trận chiến kịch tính mà còn khắc họa hành trình trưởng thành của một người anh hùng giữa thời đại đầy biến động.",
      Anh:"https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-240918160932-638622725722888616.jpg" 
    },
  ],

  // ----- Rạp -----
  Rap: [
    {
      id: 1,
      TenRap: "Rạp ScreenTime Quận 12",
      ViTri: "Vincom Center, Quận 12, TP.HCM",
      PhongChieu: [
        {
          id: 1,
          TenPhongChieu: "Phòng chiếu 1",
          SoLuongGhe: 10,
          // Thêm danh sách ghế
          Ghe: [
            { Hang: "A", Ghe: ["A01", "A02", "A03", "A04", "A05"] },
            { Hang: "B", Ghe: ["B01", "B02", "B03", "B04", "B05"] },
            // Thêm các hàng ghế khác...
          ],
        },
      ],
    },
  ],

  // ----- Suất Chiếu -----
  SuatChieu: [
    {
      id: 1,
      IdPhim: 1,
      IdPhong: 1,
      NgayChieu: "26/09/2024",
      GioChieu: "18:00",
      TrangThai: "DangChieu", 
    },
    // Thêm suất chiếu khác nếu cần
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
      Anh: "/images/combo/combo4.jpg",
      TenCombo: "COMBO PARYPARY",
      NoiDung: "2 Bắp Ngọt 60oz + 4 Coke 22oz",
      Gia: 209000,
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

  // ----- Chi Tiết Hóa Đơn -----
  ChiTietHoaDon: [
    {
      id: 1,
      IdTaiKhoan: 1,
      IdHoaDon: 1,
      NgayXuatHoaDon: "30/09/2024",
      IdXuatChieu: 1,
      SoGhe: 1,
      NgayChieu: "30/09/2024",
      TongTien: 175000,
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
      DiaChi: "Thùng Rác",
      NgaySinh: "29-09-2999",
      GioTinh: "Nữ",
      SDT: "0395427399",
      ChucVu: "Nhân viên",
      Tinhtrang: "Hoạt động",
      IsAdmin: 0,
    },
  ],

  Sukien: [
    {
      id: 1,
      Ten: "SINHNHAT1",
      NoiDung: "Khuyến mãi giảm giá khi mua vé tại ScreenTime",
      Anh: "/images/event/sinhnhat.jpg",
      NgayBatDau: "20/10/2024",
      NgayKetThuc: "22/10/2024",
      Luuy: "Áp dụng vào ngày 28 tháng 6.",
      DieuKien: "Áp dụng tại web 28 tháng 6.",
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
      { name: "chitiethoadon", data: data.ChiTietHoaDon },
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
