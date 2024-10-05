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
        },  {
            id: 3,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 4,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: '/images/logovn.png',
        },  {
            id: 5,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 6,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: '/images/logovn.png',
        },  {
            id: 7,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 8,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: '/images/logovn.png',
        },  {
            id: 9,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: '/images/logovn.png',
        },
        {
            id: 10,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: '/images/logovn.png',
        },
        // ... các bài viết khác
    ];

    return (
        <section className="text-white py-8 event-section1">
            <h2 className="font-bold text-yellow text-center h24">Blog Phim Ảnh</h2>
            <h6 className="mb-6 text-center h16">Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày</h6>
            <div className="container row">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="blog-card">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="thumbnail" // Đã thêm class
                            />
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
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
