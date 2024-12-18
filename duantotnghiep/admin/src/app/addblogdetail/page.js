"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddBlogForm = () => {
    const [blogList, setBlogList] = useState([]);
    const [newBlog, setNewBlog] = useState({
        MaBlog: "",
        NoiDung1: "",
        NoiDung2: "",
        NoiDung3: "",
        NoiDung4: "",
        NoiDung5: "",
        Anh: "",
    });

    const router = useRouter();

    // Lấy danh sách blog từ API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:3000/blog");
                if (!response.ok) throw new Error("Failed to fetch blogs.");
                const data = await response.json();
                setBlogList(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchBlogs();
    }, []);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({
            ...prev,
            [name]: name === "MaBlog" ? Number(value) : value, // Convert MaBlog to a number
        }));
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newBlog); // Log dữ liệu để kiểm tra
    
        try {
            const response = await fetch("http://localhost:3000/blogdetail/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    MaBlog: newBlog.MaBlog,
                    NoiDung1: newBlog.NoiDung1,
                    NoiDung2: newBlog.NoiDung2,
                    NoiDung3: newBlog.NoiDung3,
                    NoiDung4: newBlog.NoiDung4,
                    NoiDung5: newBlog.NoiDung5,
                    Anh: newBlog.Anh,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add blog");
            }
    
            const data = await response.json();
            console.log("Blog added:", data.blog); // In thông tin blog vừa thêm vào console
    
            // Cập nhật lại danh sách blog
            setBlogList((prevList) => [...prevList, data.blog]);
    
            alert("Đã thêm thành công!");
            router.push("/blog");
            setNewBlog({
                MaBlog: "",
                NoiDung1: "",
                NoiDung2: "",
                NoiDung3: "",
                NoiDung4: "",
                NoiDung5: "",
                Anh: "",
            });
        } catch (err) {
            console.error("Error adding blog:", err);
        }
    };
    

    return (
        <main className="app-content">
            <div className="app-title">
                <h1>Thêm Blog Mới</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo Mới Blog</h3>
                        <div className="tile-body">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="MaBlog" className="block text-sm font-medium">Mã Blog</label>
                                        <select
                                            id="MaBlog"
                                            name="MaBlog"
                                            value={newBlog.MaBlog}
                                            onChange={handleChange}  // Gọi handleChange
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        >
                                            <option value="">Chọn Mã Blog</option>
                                            {blogList.map((blog) => (
                                                <option key={blog.id} value={blog.id}>
                                                    {blog.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="Anh" className="block text-sm font-medium">Ảnh</label>
                                        <input
                                            type="text"
                                            id="Anh"
                                            name="Anh"
                                            value={newBlog.Anh}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Nội dung 1 */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung1" className="block text-sm font-medium">Nội Dung 1</label>
                                        <textarea
                                            id="NoiDung1"
                                            name="NoiDung1"
                                            value={newBlog.NoiDung1}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Nội dung 2 */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung2" className="block text-sm font-medium">Nội Dung 2</label>
                                        <textarea
                                            id="NoiDung2"
                                            name="NoiDung2"
                                            value={newBlog.NoiDung2}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Nội dung 3 */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung3" className="block text-sm font-medium">Nội Dung 3</label>
                                        <textarea
                                            id="NoiDung3"
                                            name="NoiDung3"
                                            value={newBlog.NoiDung3}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Nội dung 4 */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung4" className="block text-sm font-medium">Nội Dung 4</label>
                                        <textarea
                                            id="NoiDung4"
                                            name="NoiDung4"
                                            value={newBlog.NoiDung4}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Nội dung 5 */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="NoiDung5" className="block text-sm font-medium">Nội Dung 5</label>
                                        <textarea
                                            id="NoiDung5"
                                            name="NoiDung5"
                                            value={newBlog.NoiDung5}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn btn-save mr-3">Lưu lại</button>
                                    <Link href="/blog">
                                        <button type="button" className="btn btn-cancel">Hủy bỏ</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AddBlogForm;
