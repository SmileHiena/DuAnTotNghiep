

import "../../../../public/styles/danhsachphim.css"

export default function danhSachPhim() {
    const movies = [
        { title: "LÀM GIÀU VỚI MA (T16)", img: "https://storage.googleapis.com/a1aa/image/4iIXbe6JNAR8Ey4GukYqNXv96mVcfwVQxDo7aSR7ZSlBySjTA.jpg" },
        { title: "ANH TRAI VƯỢT MỌI TÂM TA (T16)", img: "https://storage.googleapis.com/a1aa/image/z9BCZjDok2a0N9NvTcERIF4OnVJXIKMmpbXwozUh1MyfYpxJA.jpg" },
        { title: "KHÔNG NÓI ĐIỀU DỮ (T18)", img: "    https://storage.googleapis.com/a1aa/image/7F4wlaTOLporHRPhSkn2d1UeDBGNyqNEAMqqaaxe9fsujlGnA.jpg" },
        { title: "TÌM KIẾM TÀI NĂNG ẨM PHỦ (T16)", img: "https://storage.googleapis.com/a1aa/image/3WYqJkfLpC2kLiqb1lfAPFTxQzuhCzwkZBfqjsLvNvpxjlGnA.jpg" },
        { title: "THE CROW: BÁO THÙ (T18)", img: "https://storage.googleapis.com/a1aa/image/EObsWvAwmf3bJKivv7j2J4Fj6nWAcWsJi0oJrteXaQePjlGnA.jpg" },
        { title: "HAI MƯƠI (T13)", img: "https://storage.googleapis.com/a1aa/image/eCyDmJ2xPqUf6UklebWwv4L9THeAVfQtDgfOBNHaF6uSas04E.jpg" },
        { title: "HAI MƯƠI (T13)", img: " https://storage.googleapis.com/a1aa/image/M6s8AabxhAZkC52KmV8MBqLRhpHWWG63SMjjVRWdzRHds04E.jpg" },
        { title: "LONGLEGS: THẢM KỊCH ĐI GIÁO (T18)", img: " https://storage.googleapis.com/a1aa/image/FR173OnVABJsON33Ogc7nKWe99Ic8ru7G5I5ofbLL8MejlGnA.jpg" },
        { title: "XUYÊN KHÔNG CÁI MỆNH GIA TỘC (T16)", img: " https://storage.googleapis.com/a1aa/image/Oimf3lSEBdX9PqOgsDh9Fbtqnnga2l1DNKUkRPzefhsGjlGnA.jpg" },
        { title: "BEETLEJUICE BEETLEJUICE: MA SIÊU QUẬY (T13)", img: "https://storage.googleapis.com/a1aa/image/tlUfGweeFZDBEJji1GnceangU12AJPLBFwaDfEOFuQ58NWacC.jpg" },
        { title: "CHÀNG NỮ PHI CÔNG (T13)", img: "    https://storage.googleapis.com/a1aa/image/GjUvFC5xyOaYHpB3cqVC0a3wfmxt1npGdRaduKbCRlpexSjTA.jpg" },
        { title: "MA DA (T16)", img: "    https://storage.googleapis.com/a1aa/image/9f9Y0GGRhK2cWyRJ7eisFHfZ5p04oBfUFPnNqwV3N6wpHLNOB.jpg" },
        { title: "PHIM SINH CẬU BÉ BÚT CHÌ (L1) 2D: NHẬT KÝ KHỦNG...", img: "    https://storage.googleapis.com/a1aa/image/xXsloKuRLr76GxOLdWkbegVeCuCZe2Srf1HnzrBFJR1NHLNOB.jpg" },
        { title: "OAN HỒN BÁO ÁN (T18)", img: "    https://storage.googleapis.com/a1aa/image/5NmzK75XV8KuGhqgcFKS79pQADlHeyItKXaCFJBcXD09YpxJA.jpg" },
        { title: "KẺ TRỘM MẶT TRĂNG 4 2D LT (P)", img: "    https://storage.googleapis.com/a1aa/image/GPDaWoZ9MRpBHZBENbIt8hSjMsIlH3tVLopZ3PBf0fM1xSjTA.jpg" }
    ];

    return (
        <>
                <div className="container1 mx-auto px-4 py-8">
                    <h1 className="text-center text-yellow-500 text-3xl font-bold mb-8">DANH SÁCH PHIM</h1>
                    <div className="flex justify-end mb-4">
                        <select className=" select bg-gray-800 text-base text-white py-2 px-4 rounded">
                            <option>TẤT CẢ</option>
                            <option>PHIM MỚI</option>
                            <option>PHIM SẮP CHIẾU</option>
                            <option>PHIM ĐANG CHIẾU</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {movies.map((movie, index) => (
                            <div key={index} className="">
                                <img src={movie.img} alt={`Poster of ${movie.title}`} className="w-full h-auto" />
                                <p className="movie-title">{movie.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>
                </div>
            
        
          </>
    )
}