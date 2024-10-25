"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TuongTu from "../../../../app/component/tuongtu";
import Cookies from "js-cookie";

const Detail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract the `id` from the URL
  const [movie, setMovie] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

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
    if (!newComment.trim()) return;

    const commentData = { movieId: id, content: newComment };
    console.log("Comment Data:", commentData); // Log comment data

    try {
      const token = Cookies.get("token"); // Hoặc từ cookie nếu bạn lưu ở đó

      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề
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
                <p className="text-[18px]">
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {movie.TheLoai.KieuPhim}
                </p>
                <p className="text-[18px]">
                  <span className="font-semibold">Thời gian:</span>{" "}
                  {movie.TheLoai.ThoiLuong}
                </p>
                <p className="text-[18px]">
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
                  className="flex flex-col items-center w-full"
                >
                  <textarea
                    placeholder="Mời bạn thảo luận..."
                    className="text-[16px] p-2 border w-full bg-white text-black resize-none"
                    rows="2"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className="mt-2 text-[20px] bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-300"
                    style={{ width: "150px", height: "41px" }}
                    type="submit"
                  >
                    Gửi
                  </button>
                </form>

                {/* Displaying Comments */}
                <div className="w-full max-w-[1200px] mt-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id} // Use the MongoDB _id as the key
                      className="mb-4 p-4 bg-[#423E3E] rounded flex items-start gap-4 w-full border border-white"
                    >
                      {comment.userImage && (
                        <img
                          src={`http://localhost:3000/images/${comment.userImage}`}
                          alt={`${comment.username}'s avatar`}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                      <div className="flex flex-col flex-1 max-w-[1100px]">
                        <span className="font-semibold text-[20px] max-w-[1100px] text-white mb-1">
                          {comment.username}
                        </span>

                        <div className="border-b border-white w-full mb-1"></div>
                        <p className="text-[20px] max-w-[1000px] text-white mb-1 break-words">
                          {expandedComments[comment._id]
                            ? comment.content
                            : `${comment.content.substring(0, 100)}...`}
                        </p>
                        <button
                          onClick={() => toggleExpand(comment._id)} // Pass the comment's ID
                          className="text-[#F5CF49] underline mt-1"
                        >
                          {expandedComments[comment._id]
                            ? "Ẩn bớt"
                            : "Xem thêm"}
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          <TuongTu />
        </div>
      </div>
    </div>
  );
};

export default Detail;
