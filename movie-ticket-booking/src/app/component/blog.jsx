import "../../../public/styles/blog.css";

const sapchieu = () => {
    const posts = [
        {
            id: 1,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 2,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 3,
            title: 'Phim C',
            excerpt: 'Đoạn trích về phim C.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 4,
            title: 'Phim D',
            excerpt: 'Đoạn trích về phim D.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 5,
            title: 'Phim E',
            excerpt: 'Đoạn trích về phim E.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 6,
            title: 'Phim F',
            excerpt: 'Đoạn trích về phim F.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 7,
            title: 'Phim G',
            excerpt: 'Đoạn trích về phim G.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 8,
            title: 'Phim H',
            excerpt: 'Đoạn trích về phim H.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 9,
            title: 'Phim I',
            excerpt: 'Đoạn trích về phim I.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        },
        {
            id: 10,
            title: 'Phim J',
            excerpt: 'Đoạn trích về phim J.',
            thumbnail: 'http://localhost:3000/images/phim/cam.jpg',
        }
    ];

    return (
        <section className="text-white py-8 event-section1">
            <h2 className="font-bold text-yellow text-center h24">Blog Phim Ảnh</h2>
            <h6 className="mb-6 text-center h16">Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày</h6>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="blog-card">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                style={{
                                    width: '254px',
                                    height: '122px',
                                    marginBottom: '11px',
                                    borderRadius: '8px',
                                }}
                            />
                            <h3 style={{ fontSize: '16px', marginBottom: '11px' }} className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p style={{ fontSize: '11.25px' }}>{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-6 flex justify-center">
                <button className="see-more-button">
                    Xem thêm
                </button>
            </div>
        </section>
    );
};

export default sapchieu;
