import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import DangChieu from "../../../component/dangchieu.jsx";
import "../../../../../public/styles/sapchieu.css";
import TuongTu from "@/app/component/tuongtu.jsx";

const Detail = () => {
  // Example movie data
  const movies = [
    {
      id: "1",
      title: "CÁM(T18)",
      daodien: "Trần Hữu Tấn",
      dienvien: "Quốc Cường, Thúy Diễm, Rima Thanh Vy, Lâm Thanh Mỹ, Hải Nam",
      theloai: "Kinh dị",
      ngaykhoichieu: "Thứ Sáu, 20/09/2024",
      description:
        "Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen cho khán giả.",
      thoigian: "122 phút",
      quocgia: "Việt Nam",
      image: "/images/phim/cong-tu-bac-lieu.jpg",
    },
  ];

  const lienquan = [
    {
      id: 1,
      title: "Công tử bạc liêu",
      image: "/images/phim/cong-tu-bac-lieu.jpg",
    },
    {
      id: 2,
      title: "Transformers: Một",
      image: "/images/phim/transformers-one.jpg",
    },
    {
      id: 3,
      title: "Làm giàu với ma",
      image: "/images/phim/lam-giau-voi-ma.jpg",
    },
    { id: 4, title: "Cám", image: "/images/phim/cam.jpg" },
    {
      id: 5,
      title: "Đố anh cồng được tôi",
      image: "/images/phim/Do-anh-cong-duoc-toi.jpg",
    },
  ];

  // Sample comments
  const comments = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      content: "Phim hay quá! Tôi rất thích.",
      avt: "./images/logo.png",
      timestamp: "2 hours ago", // Add timestamp
      likes: 12, // Add likes
    },
    {
      id: 2,
      name: "Trần Thị B",
      content: "Nội dung hấp dẫn và diễn xuất tuyệt vờiahahahaaaaaaadddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaa!",
      avt: "./images/logo.png",
      timestamp: "1 hour ago", // Add timestamp
      likes: 5, // Add likes
    },
    {
      id: 3,
      name: "Nguyễn Thái Sơn",
      content: "Web đẹp vậy trờiii!",
      avt: "./images/logo.png",
      timestamp: "10 minutes ago", // Add timestamp
      likes: 7, // Add likes
    },
  ];

  // For demonstration, using the first movie in the array
  const movie = movies[0];

  return (
    <div className="justify-centercontainer mx-auto text-white">
      <div className="flex justify-center">
        <div className="bg-[rgba(0,0,0,0.3)] shadow-lg w-full max-w-[1410px] mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-20 mr-[120px] mt-8">
            {/* Left box for image */}
            <div className="md:w-1/2 flex justify-end mb-8  md:mb-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="object-cover"
                style={{ height: "650px", width: "auto" }}
              />
            </div>

            {/* Right box for information */}
            <div className="md:w-1/2 flex flex-col">
              <h1 className="text-[30px] font-semibold mb-4">
                {movie.title}
              </h1>

              {/* Director */}
              <p className="text-[18px] mt-7 mb-2">
                <span className=" font-semibold">Đạo diễn:</span>{" "}
                {movie.daodien}
              </p>

              {/* Actors */}
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Diễn viên:</span>{" "}
                {movie.dienvien}
              </p>

              {/* Release date */}
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Ngày khởi chiếu:</span>{" "}
                {movie.ngaykhoichieu}
              </p>

              {/* Genre */}
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Thể loại:</span> {movie.theloai}
              </p>

              {/* Description */}
              <h1 className="text-[20px] font-bold mt-7 mb-2">
                Nội Dung
              </h1>
              <p className="text-[18px] mb-4">{movie.description}</p>

              {/* Additional movie information */}
              <div className="boton flex space-x-4 mb-6">
                <p className="text-[18px]">
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {movie.theloai}
                </p>
                <p className="text-[18px]">
                  <span className="font-semibold">Thời gian:</span>{" "}
                  {movie.thoigian}
                </p>
                <p className="text-[18px]">
                  <span className="font-semibold">Quốc gia:</span>{" "}
                  {movie.quocgia}
                </p>
              </div>

              {/* Buttons for booking and trailer */}
              <div className="flex mt-7 space-x-2">
                <div className="flex">
                  <p className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{
                        color: "#F5CF49",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </p>

                  <button className="text-[16px] underline text-white font-light px-4 flex-1 max-w-[150px] h-[41px] md:max-w-[200px]">
                    Xem trailer
                  </button>
                </div>
                <button
                  className="text-[20px] bg-[#F5CF49] text-[#000000] font-semibold rounded hover:bg-yellow-300"
                  style={{ width: '150px', height: '41px' }}
                >
                  Đặt vé
                </button>
              </div>
            </div>
          </div>

          {/* Comment Form Section */}
          <div className="flex justify-center mt-10 w-full">
            <div className="w-full max-w-[1410px]">
              <div className="flex justify-center mt-6 flex flex-col items-center bg-[rgba(0,0,0,0.5)] p-6 w-full">
                <h2 className="text-[28px] font-bold mb-4 text-center text-white">
                  Bình luận
                </h2>
                <div className="max-w-[1000px] mx-auto w-full ">
                  {/* Comment Input Section */}
                  <form className="relative flex flex-col items-center w-full">
                    <div className="relative w-full mb-4">
                      <textarea
                        placeholder="Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu lành mạnh,... để tránh bị khóa tài khoản"
                        className="text-[16px] p-2 border w-full pr-10 text-black bg-white resize-none" // Thêm resize-none để không thể thay đổi kích thước
                        rows="2"
                      />
                      <button
                        className="text-[20px] bg-[#F5CF49] text-[#000000] font-semibold rounded hover:bg-yellow-300"
                        style={{ width: '150px', height: '41px' }}
                      >
                        Gửi
                      </button>
                    </div>
                  </form>

                {/* Displaying Comments */}
{comments.map((comment) => (
  <div
    key={comment.id}
    className="mb-4 p-4 bg-[#423E3E] rounded w-full flex items-start gap-4 border border-white"
  >
    {/* Avatar */}
    {comment.avt && (
      <img
        src={comment.avt}
        alt={`${comment.name}'s avatar`}
        className="w-12 h-12 rounded-full"
      />
    )}
    {/* Comment Content */}
    <div className="flex flex-col flex-1">
      {/* Tên bình luận với gạch ngang */}
      <div className="flex flex-col">
        <p className="font-semibold text-[28px] text-white mb-1">
          {comment.name}
        </p>
        <div className="border-b border-white w-full"></div> {/* Gạch ngang */}
      </div>
      <p className="ml-2 text-sm text-gray-300">
        {comment.content}
      </p>
      {/* Timestamp */}
      <p className="text-xs text-gray-500 mt-1">
        {comment.timestamp}
      </p>
      {/* Actions (Like, Reply) */}
      <div className="flex items-center gap-4 text-gray-400 mt-2">
        {/* Like Button */}
        <button className="flex items-center gap-1 hover:text-yellow-500">
          <span className="text-xs" style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faThumbsUp} />
            {comment.likes || 0}
          </span>
        </button>
        {/* Reply Button */}
        <button className="flex items-center gap-1 hover:text-yellow-500">
          <FontAwesomeIcon icon={faReply} />
          <span className="text-xs" style={{ fontSize: '16px' }}>
            Reply
          </span>
        </button>
      </div>
    </div>
  </div>
))}


                  {/* Load More Button */}
                  <div className="flex justify-center">
                    <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* conponent phim đang chieu */}
      <DangChieu />

      <TuongTu />
    </div>
  );
};

export default Detail;

