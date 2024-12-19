var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db"); // Giả sử đây là file kết nối DB
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Bạn chỉ được upload file ảnh"));
        }
        cb(null, true);
    },
});

// Fetch all blogs
router.get("/", async (req, res) => {
    try {
        const db = await connectDb();
        const blogCollection = db.collection("blog");
        const blogs = await blogCollection.find().toArray();

        if (blogs.length > 0) {
            res.status(200).json(blogs);
        } else {
            res.status(404).json({ message: "No blogs found" });
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;  // Lấy id từ URL params
        const db = await connectDb();
        const blogCollection = db.collection("blogdetial");  // Giả sử tên collection là "blogdetial"

        // Tìm blog theo id
        const blog = await blogCollection.findOne({ id: Number(id) });

        if (blog) {
            res.status(200).json(blog);  // Trả về thông tin blog nếu tìm thấy
        } else {
            res.status(404).json({ message: "Blog not found" });  // Nếu không tìm thấy blog
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Received request body:", req.body);  // Log the whole request body

    try {
        const updatedBlog = req.body.newBlog;  // No need to parse if the body is JSON
        console.log("Parsed newBlog data:", updatedBlog);  // Log the parsed data

        // Check if the blog data is valid
        if (!updatedBlog || isNaN(id)) {
            return res.status(400).json({ message: "Invalid blog data or ID" });
        }

        // Prepare the update data
        const updateData = {
            MaBlog: Number(updatedBlog.MaBlog),
            NoiDung1: updatedBlog.NoiDung1,
            NoiDung2: updatedBlog.NoiDung2,
            NoiDung3: updatedBlog.NoiDung3,
            NoiDung4: updatedBlog.NoiDung4,
            NoiDung5: updatedBlog.NoiDung5,
            Anh: updatedBlog.Anh
        };

        const db = await connectDb();
        const blogCollection = db.collection("blogdetial");

        // Update the blog document by numeric ID
        const result = await blogCollection.updateOne(
            { id: Number(id) },  // Assuming 'id' is a numeric field in MongoDB
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", updatedBlog: updateData });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
});

router.post("/add", async (req, res) => {
    try {
        const { MaBlog, NoiDung1, NoiDung2, NoiDung3, NoiDung4, NoiDung5, Anh } = req.body;
        console.log("Received new blog data:", req.body);

        // Kiểm tra dữ liệu blog có hợp lệ không
        if (!MaBlog || !NoiDung1 || !NoiDung2 || !NoiDung3 || !NoiDung4 || !NoiDung5 || !Anh) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const db = await connectDb();
        const blogCollection = db.collection("blogdetial");
        const lastBlog = await blogCollection.find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastBlog.length > 0 ? lastBlog[0].id + 1 : 1;
        const blogdata = {
            id: newId, 
            MaBlog: Number(MaBlog),
            NoiDung1: NoiDung1,
            NoiDung2: NoiDung2,
            NoiDung3: NoiDung3,
            NoiDung4: NoiDung4,
            NoiDung5: NoiDung5,
            Anh: Anh,
        };
        const result = await blogCollection.insertOne(blogdata);
        res.status(201).json({ message: "Blog added successfully", blog: blogdata });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Failed to add blog", error: error.message });
    }
});



router.delete("/delete/:id", async (req, res) => {
    try {
        const db = await connectDb();
        const { id } = req.params;

        const result = await db
            .collection("blogdetial")
            .deleteOne({ id: Number(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blogdetail deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;