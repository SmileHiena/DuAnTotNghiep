"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TuongTu from "../../../../app/component/tuongtu";
import DangChieu from "@/app/component/dangchieu";
import Cookies from "js-cookie";

const Detail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract the `id` from the URL
  const [movie, setMovie] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        console.error("Movie ID is missing");
        return;
      }

      console.log(`Fetching data for movie ID: ${id}`);

      try {
        // Fetch movie data
        const movieResponse = await fetch(
          `http://localhost:3000/sanpham/${id}`
        );
        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie data: ${movieResponse.statusText}`
          );
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch comments
        const commentsResponse = await fetch(
          `http://localhost:3000/comments?movieId=${id}`
        );
        if (!commentsResponse.ok) {
          throw new Error(
            `Failed to fetch comments: ${commentsResponse.statusText}`
          );
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching movie data or comments:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    if (!newComment.trim()) return;

    const commentData = { movieId: id, content: newComment };
    console.log("Comment Data:", commentData);

    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment(""); // Clear the comment input
      } else {
        const errorResponse = await response.json();
        console.error("Error:", errorResponse); // Log error from API
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const toggleExpand = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the expanded state for the clicked comment
    }));
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white">
      <div className="flex justify-center">
        <div className="bg-[rgba(0,0,0,0.3)] shadow-lg w-full max-w-[1410px] mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10 mt-8">
            {/* Left box for image */}
            <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
              <img
                src={movie.Anh}
                alt={movie.Ten}
                className="object-cover"
                style={{ height: "650px", width: "auto" }}
              />
            </div>

            {/* Right box for movie information */}
            <div className="md:w-[65%] flex flex-col">
              <h1 className="text-[30px] font-semibold mt-4 mb-4">
                {movie.Ten}
              </h1>
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Đạo diễn:</span>{" "}
                {movie.MoTa.DaoDien}
              </p>
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Diễn viên:</span>{" "}
                {movie.MoTa.DienVien}
              </p>
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Ngày khởi chiếu:</span>{" "}
                {movie.MoTa.NgayKhoiChieu}
              </p>
              <p className="text-[18px] mb-2">
                <span className="font-semibold">Thể loại:</span>{" "}
                {movie.TheLoai.KieuPhim}
              </p>
              <h1 className="text-[20px] font-bold mt-7 mb-2">Nội Dung</h1>
              <div className="flex items-center justify-between mb-4 max-w-[690px]">
                <p className="text-[16px] mb-2">
                  {isExpanded
                    ? movie.ThongTinPhim
                    : `${movie.ThongTinPhim.substring(0, 300)}...`}{" "}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#F5CF49] underline"
                  >
                    {isExpanded ? "Ẩn bớt" : "Xem thêm"}
                  </button>
                </p>
              </div>

              <div className="flex space-x-4 mb-6">
                <p className="text-[18px] w-2/4">
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {movie.TheLoai.KieuPhim}
                </p>
                <p className="text-[18px] w-1/3">
                  <span className="font-semibold">Thời gian:</span>{" "}
                  {movie.TheLoai.ThoiLuong}
                </p>
                <p className="text-[18px] w-1/3">
                  <span className="font-semibold">Quốc gia:</span>{" "}
                  {movie.TheLoai.QuocGia}
                </p>
              </div>

              {/* Buttons for booking and trailer */}
              <div className="flex mt-7 space-x-2">
                <div className="flex">
                  <p className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1">
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{
                        color: "#DA70D6",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </p>
                  <button className="text-[20px] underline text-white font-light px-4 flex-1 max-w-[150px] h-[41px] md:max-w-[200px]">
                    Xem trailer
                  </button>
                  {/* <button 
                onClick={handleToggle} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {isVisible ? 'Ẩn Trailer' : 'Xem Trailer'}
            </button> */}
                  <button
                    onClick={handleToggle} className="text-[20px] underline text-white font-light px-4 flex-1 max-w-[150px] h-[41px] md:max-w-[200px]">
                    {isVisible ? 'Ẩn Trailer' : 'Xem Trailer'}
                  </button>
                </div>
                <Link href={`/page/datve/${movie.id}`}>
                  <button
                    className="text-[20px] bg-[#F5CF49] text-[#000000] font-semibold rounded hover:bg-yellow-300"
                    style={{ width: "150px", height: "41px" }}
                  >
                    Đặt vé
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {isVisible && (
            <iframe
              className="flex mt-8 items-center justify-center w-full min-h-[700px] bg-blue-500"
              style={{ zIndex: 9999 }}
              src={movie.Trailer}
              title="ĐỐ ANH CÒNG ĐƯỢC TÔI - MAIN TRAILER | KHỞI CHIẾU: 27.09.2024"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>

          )}

          {/* Comment Form Section */}
          <div className="flex justify-center mt-10 w-full">
            <div className="w-full max-w-[1410px]">
              <div className="bg-[rgba(0,0,0,0.5)] p-6 flex flex-col items-center w-full">
                <h2 className="text-[28px] font-bold mb-4 text-center">
                  Bình luận
                </h2>

                {/* Comment Input */}
                <form
                  onSubmit={handleCommentSubmit}
                  className="flex flex-col items-center max-w-[1200px] w-full"
                >
                  <textarea
                    placeholder="Mời bạn thảo luận..."
                    className="text-[16px] p-2 border w-full bg-white text-black resize-none"
                    rows="2"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  {/* Nút gửi chuyển sang bên trái */}
                  <button
                    className="mt-2 text-[20px] bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-300 self-start"
                    style={{ width: "150px", height: "41px" }}
                    type="submit"
                  >
                    Gửi
                  </button>
                </form>

                {/* Displaying Comments */}
                <div className="w-full max-w-[1200px] mt-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="mb-6 p-6 bg-[#2D2D2D] rounded-lg flex items-start gap-6 w-full border border-gray-700 hover:shadow-lg transition-all duration-300">
                      {comment.userImage && (
                        <img src={`http://localhost:3000/images/${comment.userImage}`} alt={`${comment.username}'s avatar`} className="w-14 h-14 rounded-full border-2 border-[#F5CF49]" />
                      )}
                      <div className="flex flex-col flex-1 max-w-[1100px]">
                        <span className="font-semibold text-[20px] text-white mb-2">{comment.username}</span>
                        <div className="border-b border-white opacity-20 w-full mb-2"></div>
                        <p className="text-[18px] text-white mb-2 break-words">
                          {comment.content.length > 100
                            ? (expandedComments[comment._id] ? comment.content : `${comment.content.substring(0, 250)}...`)
                            : comment.content
                          }
                        </p>

                        {comment.content.length > 100 && (
                          <button onClick={() => toggleExpand(comment._id)} className="text-[#F5CF49] underline mt-2 hover:text-[#F1D600]">
                            {expandedComments[comment._id] ? "Ẩn bớt" : "Xem thêm"}
                          </button>
                        )}

                        <p className="text-xs text-gray-400 mt-2">{new Date(comment.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>


          {/* Similar Movies Section */}
          <TuongTu movieId={movie.id} />
          <DangChieu />
        </div>
      </div>
    </div>
  );
};

export default Detail;
