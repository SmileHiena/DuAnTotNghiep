import "../../../public/styles/blog.css";

const BlogSection = () => {
    const posts = [
        {
            id: 1,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 2,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 3,
            title: 'Phim C',
            excerpt: 'Đoạn trích về phim C.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 4,
            title: 'Phim D',
            excerpt: 'Đoạn trích về phim D.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 5,
            title: 'Phim E',
            excerpt: 'Đoạn trích về phim E.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 6,
            title: 'Phim F',
            excerpt: 'Đoạn trích về phim F.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 7,
            title: 'Phim G',
            excerpt: 'Đoạn trích về phim G.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 8,
            title: 'Phim H',
            excerpt: 'Đoạn trích về phim H.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 9,
            title: 'Phim I',
            excerpt: 'Đoạn trích về phim I.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 10,
            title: 'Phim J',
            excerpt: 'Đoạn trích về phim J.',
            thumbnail: '/images/logovn.png',
        },
    ];

    return (
        <section className="text-white py-8 event-section1">
            <h2 className="font-bold text-yellow text-center h24">Blog Phim Ảnh</h2>
            <h6 className="mb-6 text-center h16">Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày</h6>
            <div className="container row ">
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
                                    borderRadius: '4px',
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

export default BlogSection;
