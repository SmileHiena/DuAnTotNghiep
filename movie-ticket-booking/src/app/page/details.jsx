import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

const Detail = () => {
  // Example movie data
  const movies = [
    { 
      id: '1', 
      title: "CÁM(T18)", 
      daodien: "Trần Hữu Tấn", 
      dienvien: "Quốc Cường, Thúy Diễm, Rima Thanh Vy, Lâm Thanh Mỹ, Hải Nam", 
      theloai: "Kinh dị", 
      ngaykhoichieu: "Thứ Sáu, 20/09/2024", 
      description: "Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen cho khán giả.", 
      thoigian: "122 phút", 
      quocgia: "Việt Nam", 
      image: "/images/phim/cam.jpg" 
    },
  ];

    const lienquan = [
        { id: 1, title: "Công tử bạc liêu", image: "/images/phim/cong-tu-bac-lieu.jpg" },
        { id: 2, title: "Transformers: Một", image: "/images/phim/transformers-one.jpg" },
        { id: 3, title: "Làm giàu với ma", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 4, title: "Cám", image: "/images/phim/cam.jpg" },
        { id: 5, title: "Đố anh cồng được tôi", image: "/images/phim/Do-anh-cong-duoc-toi.jpg" }
    ];

  // Sample comments
  const comments = [
    { id: 1, name: "Nguyễn Văn A", content: "Phim hay quá! Tôi rất thích.", avt: "/images/avt/nghinhphong.jpg" },
    { id: 2, name: "Trần Thị B", content: "Nội dung hấp dẫn và diễn xuất tuyệt vời!", avt: "/images/avt/nghinhphong.jpg" },
    { id: 3, name: "Nguyễn Thái Sơn", content: "Web đẹp vậy trờiii!", avt: "/images/avt/nghinhphong.jpg" },
  ];

  // For demonstration, using the first movie in the array
  const movie = movies[0];

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="flex justify-center">
        <div className="bg-black bg-opacity-40 p-6 rounded-lg shadow-lg w-[1200px]">
          <div className="flex flex-col md:flex-row items-start gap-20">
            {/* Left box for image */}
            <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="object-cover rounded-md" 
                style={{ height: '650px', width: 'auto' }} 
              />
            </div>
            
            {/* Right box for information */}
            <div className="md:w-1/2 flex flex-col">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

              {/* Director */}
              <p className="mt-7 mb-2">
                <span className="font-bold">Đạo diễn:</span> {movie.daodien}
              </p>

              {/* Actors */}
              <p className="mb-2">
                <span className="font-bold">Diễn viên:</span> {movie.dienvien}
              </p>

              {/* Release date */}
              <p className="mb-2">
                <span className="font-bold">Ngày khởi chiếu:</span> {movie.ngaykhoichieu}
              </p>

              {/* Genre */}
              <p className="mb-2">
                <span className="font-bold">Thể loại:</span> {movie.theloai}
              </p>

              {/* Description */}
              <h1 className="font-bold mt-7 mb-2">Nội Dung</h1>
              <p className="text-sm mb-4">{movie.description}</p>

              {/* Additional movie information */}
              <div className="boton flex space-x-4 mb-6">
                <p>
                  <span className="font-bold">Thể loại:</span> {movie.theloai}
                </p>
                <p>
                  <span className="font-bold">Thời gian:</span> {movie.thoigian}
                </p>
                <p>
                  <span className="font-bold">Quốc gia:</span> {movie.quocgia}
                </p>
              </div>

              {/* Buttons for booking and trailer */}
              <div className="flex mt-7 space-x-7">
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
                  Xem trailer
                </button>
                <button className="justify-center bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600">
                  Đặt vé
                </button>
              </div>
            </div>
          </div>

          {/* Comment Form Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Bình luận</h2>
            <form className="relative flex flex-col items-center"> {/* Center the form */}
              <div className="relative w-full">
                <textarea 
                  placeholder="Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu lành mạnh,... để tránh bị khóa tài khoản"
                  className="text p-2 mb-4 rounded border border-gray-300 h-15 resize-none w-full pr-10" // Add padding to the right
                  rows="2" 
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2" 
                  style={{ background: 'none', border: 'none' }} // Remove button background
                >
                  <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#FFD43B", fontSize: '20px' }} />
                </button>
              </div>
            </form>

            {/* Display comments */}
            <div className="mt-6 flex flex-col items-center">   
              {comments.map(comment => (
                <div key={comment.id} className="mb-4 p-4 bg-gray-800 rounded w-full flex items-center"> {/* Set width for comments */}
                  {comment.avt && ( // Check if avatar exists
                    <img 
                      src={comment.avt} 
                      alt={`${comment.name}'s avatar`} 
                      className="w-10 h-10 rounded-full mr-2" // Adjust size and margin
                    />
                  )}
                  <hr />
                  <div className="flex flex-col">
                    <p className="font-bold">{comment.name}</p>
                    <p className="ml-2">{comment.content}</p>
                  </div>
                </div>
              ))}
            {/* Xem thêm button */}
            <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600 mt-4">
            Xem thêm
            </button>
            </div>
          </div>
        </div>
      </div>
        
    {/*Thể loại tương tự*/}
    <div style={{ background: "url('/images/image.png')" }} className="container mx-auto text-center py-8 relative">
            {/* Tiêu đề */}
            <h2 className="text-3xl font-bold text-yellow-500 mb-8">Thể loại tương tự</h2>

            {/* Danh sách phim */}
            <div className="flex justify-center flex-wrap gap-6">
                {lienquan.map((lienquan) => (
                    <div key={lienquan.id} className="text-center">
                        <img
                            src={lienquan.image}
                            alt={lienquan.title}
                            className="object-cover rounded-md mb-4"
                            style={{ height: '350px', width: '250px' }}
                        />
                        <h4 style={{ fontSize: 18 }} className="font-semibold text-white mb-2">{lienquan.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    </div>

    
  );
};

export default Detail;