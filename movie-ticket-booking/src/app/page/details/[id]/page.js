  "use client"; 

  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faThumbsUp, faReply, faPlay } from "@fortawesome/free-solid-svg-icons";
  import DangChieu from "../../../component/dangchieu.jsx";
  import "../../../../../public/styles/sapchieu.css";
  import TuongTu from "@/app/component/tuongtu.jsx";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { useRouter } from 'next/router';

  const Detail = () => {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the URL
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);

    // Fetch movie data and comments from API
    useEffect(() => {
      const fetchMovieData = async () => {
        if (!id) return; // Exit if ID is not yet available
        try {
          const movieResponse = await fetch(`http://localhost:3000/${id}`); // Use your API endpoint
          if (!movieResponse.ok) throw new Error('Failed to fetch movie data');
          const movieData = await movieResponse.json();
          setMovie(movieData);

          const commentsResponse = await fetch(`/api/comments?movieId=${id}`); // Fetch comments based on the movie ID
          if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        } catch (error) {
          console.error("Failed to fetch movie data", error);
        }
      };

      fetchMovieData();
    }, [id]); // Dependency on ID

    if (!movie) {
      return <div>Loading...</div>; // Loading state
    }

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
                <h1 className="text-[30px] font-semibold mb-4">{movie.title}</h1>

                {/* Director */}
                <p className="text-[18px] mt-7 mb-2">
                  <span className="font-semibold">Đạo diễn:</span>{" "}
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
                <h1 className="text-[20px] font-bold mt-7 mb-2">Nội Dung</h1>
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
                          className="text-[16px] p-2 border w-full pr-10 text-black bg-white resize-none" 
                          rows="2"
                        />
                        <button
                          className="text-[20px] bg-[#F5CF49] text-[#000000] font-semibold rounded hover:bg-yellow-300"
                          style={{ width: "150px", height: "41px" }}
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
                        {comment.avt && (
                          <img
                            src={comment.avt}
                            alt={`${comment.name}'s avatar`}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div className="flex flex-col flex-1">
                          <div className="flex flex-col">
                            <p className="font-semibold text-[28px] text-white mb-1">
                              {comment.name}
                            </p>
                            <div className="border-b border-white w-full"></div>
                          </div>
                          <p className="ml-2 text-sm text-gray-300">
                            {comment.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.timestamp}
                          </p>
                          <div className="flex items-center gap-4 text-gray-400 mt-2">
                            <button className="flex items-center gap-1 hover:text-yellow-500">
                              <span
                                className="text-xs"
                                style={{ fontSize: "16px" }}
                              >
                                <FontAwesomeIcon icon={faThumbsUp} />
                                {comment.likes || 0}
                              </span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-yellow-500">
                              <FontAwesomeIcon icon={faReply} />
                              <span
                                className="text-xs"
                                style={{ fontSize: "16px" }}
                              >
                                Reply
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Load More Button */}
                    <div className="flex justify-center">
                      <button className="border-2 border-[#F5CF49] rounded px-4 py-2 text-[#F5CF49] hover:bg-[#F5CF49] hover:text-black">
                        Xem thêm
                      </button>
                    </div>
                  </div>
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
