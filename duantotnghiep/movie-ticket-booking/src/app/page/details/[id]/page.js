"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faReply, faPlay } from "@fortawesome/free-solid-svg-icons";
import DangChieu from "../../../component/dangchieu.jsx";
import TuongTu from "@/app/component/tuongtu.jsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Detail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract the `id` from the URL
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
      setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        console.error("Movie ID is missing");
        return;
      }

      // Log the ID to ensure it's being passed correctly
      console.log(`Fetching data for movie ID: ${id}`);

      try {
        // Fetch movie data
        const movieResponse = await fetch(
          `http://localhost:3000/sanpham/${id}`
        );
        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie data: ${movieResponse.statusText} (Status Code: ${movieResponse.status})`
          );
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch comments
        const commentsResponse = await fetch(`/api/comments?movieId=${id}`);
        if (!commentsResponse.ok) {
          throw new Error(
            `Failed to fetch comments: ${commentsResponse.statusText} (Status Code: ${commentsResponse.status})`
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

    try {
      // API call to post the new comment
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: id, content: newComment }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setNewComment(""); // Clear the comment input
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
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
                alt={movie.title}
                className="object-cover"
                style={{ height: "650px", width: "auto" }}
              />
            </div>

            {/* Right box for information - slightly wider */}
            <div className="md:w-[65%] flex flex-col">
              {" "}
              {/* Adjust width here */}
              <h1 className="text-[30px] font-semibold mt-4 mb-4">{movie.Ten}</h1>
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
              <p className="text-[18px]">
                <span className="font-semibold">Thể loại:</span>{" "}
                {movie.TheLoai.KieuPhim}
              </p>
              <h1 className="text-[20px] font-bold mt-7 mb-2">Nội Dung</h1>
        
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
                  {/* <button 
                onClick={handleToggle} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {isVisible ? 'Ẩn Trailer' : 'Xem Trailer'}
            </button> */}
                  <button 
                    onClick={handleToggle}  className="text-[20px] underline text-white font-light px-4 flex-1 max-w-[150px] h-[41px] md:max-w-[200px]">
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
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-4 p-4 bg-[#423E3E] rounded flex items-start gap-4 w-full border border-white"
                  >
                    {comment.avt && (
                      <img
                        src={comment.avt}
                        alt={`${comment.name}'s avatar`}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div className="flex flex-col flex-1">
                      <p className="font-semibold text-[28px] text-white mb-1">
                        {comment.name}
                      </p>
                      <div className="border-b border-white w-full mb-1"></div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comment.timestamp}
                      </p>
                      <div className="flex items-center gap-4 text-gray-400 mt-2">
                        <button className="flex items-center gap-1 hover:text-yellow-500">
                          <FontAwesomeIcon icon={faThumbsUp} />
                          <span className="text-sm ml-1">
                            {comment.likes || 0}
                          </span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-yellow-500">
                          <FontAwesomeIcon icon={faReply} />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                <button className="border-2 border-yellow-500 rounded px-4 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Related Movies Section */}
          <TuongTu />
        </div>
      </div>
    </div>
  );
};

export default Detail;
