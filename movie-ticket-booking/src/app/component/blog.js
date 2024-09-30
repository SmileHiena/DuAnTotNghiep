const BlogSection = () => {
    const posts = [
        {
            id: 1,
            title: 'Phim A',
            excerpt: 'Đoạn trích về phim A.',
            thumbnail: 'url_đến_hình_ảnh_A.jpg',
        },
        {
            id: 2,
            title: 'Phim B',
            excerpt: 'Đoạn trích về phim B.',
            thumbnail: 'url_đến_hình_ảnh_B.jpg',
        },
        {
            id: 3,
            title: 'Phim C',
            excerpt: 'Đoạn trích về phim C.',
            thumbnail: 'url_đến_hình_ảnh_C.jpg',
        },
        {
            id: 4,
            title: 'Phim D',
            excerpt: 'Đoạn trích về phim D.',
            thumbnail: 'url_đến_hình_ảnh_D.jpg',
        },
        {
            id: 5,
            title: 'Phim E',
            excerpt: 'Đoạn trích về phim E.',
            thumbnail: 'url_đến_hình_ảnh_E.jpg',
        },
        {
            id: 6,
            title: 'Phim F',
            excerpt: 'Đoạn trích về phim F.',
            thumbnail: 'url_đến_hình_ảnh_F.jpg',
        },
        // Thêm nhiều bài viết nếu cần
    ];

    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Blog Phim Ảnh</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="blog-card p-6 bg-gray-800 rounded-lg shadow-lg">
                            <img src={post.thumbnail} alt={post.title} className="mb-4 rounded-lg" />
                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                            {/* Bạn có thể thêm đoạn trích nếu muốn */}
                            {/* <p>{post.excerpt}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
