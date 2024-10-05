const BlogSection = () => {
    const posts = [
        { id: 1, title: 'Phim A', excerpt: 'Đoạn trích về phim A.', thumbnail: '/images/logovn.png' },
        { id: 2, title: 'Phim B', excerpt: 'Đoạn trích về phim B.', thumbnail: '/images/logovn.png' },
        { id: 3, title: 'Phim C', excerpt: 'Đoạn trích về phim C.', thumbnail: '/images/logovn.png' },
        { id: 4, title: 'Phim D', excerpt: 'Đoạn trích về phim D.', thumbnail: '/images/logovn.png' },
        { id: 5, title: 'Phim E', excerpt: 'Đoạn trích về phim E.', thumbnail: '/images/logovn.png' },
        { id: 6, title: 'Phim F', excerpt: 'Đoạn trích về phim F.', thumbnail: '/images/logovn.png' },
        { id: 7, title: 'Phim G', excerpt: 'Đoạn trích về phim G.', thumbnail: '/images/logovn.png' },
        { id: 8, title: 'Phim H', excerpt: 'Đoạn trích về phim H.', thumbnail: '/images/logovn.png' },
        { id: 9, title: 'Phim I', excerpt: 'Đoạn trích về phim I.', thumbnail: '/images/logovn.png' },
        { id: 10, title: 'Phim J', excerpt: 'Đoạn trích về phim J.', thumbnail: '/images/logovn.png' },
    ];

    return (
        <section className="text-white py-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}> {/* Thay đổi màu nền */}
            <h2 className="font-bold text-[#F5CF49] text-center text-[30px] mb-2">Blog Phim Ảnh</h2>
            <h6 className="mb-6 text-center text-[#737373] text-[17px] font-normal mb-[55px]">
                Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày
            </h6>
            <div className="container mx-auto mb-[40px]" style={{ maxWidth: '1410px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[15px]"> {/* Khoảng cách giữa các ảnh */}
                    {posts.map((post) => (
                        <div key={post.id} className="rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-[270px] h-[122px] object-cover rounded-[4px]" // Kích thước ảnh 270px
                            />
                            <div className="p-2"> {/* Thêm padding để nội dung không dính vào ảnh */}
                                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                <p className="text-sm">{post.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mb-[20px]">
                <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">
                    Xem thêm
                </button>
            </div>
        </section>
    );
};

export default BlogSection;
