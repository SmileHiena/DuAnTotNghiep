var express = require("express");
var router = express.Router();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db");
const cors = require("cors");

router.use(cors());

// Set storage and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

// Check uploaded file (accept only images)
function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can only upload image files"));
  }
  cb(null, true);
}

// Upload file with image check
let upload = multer({ storage: storage, fileFilter: checkFileUpload });

// API to get the list of products
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const phim = await phimCollection.find().toArray();

    if (phim.length > 0) {
      res.status(200).json(phim);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to upload an image
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ message: "File uploaded successfully", file: req.file });
});


// API để xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const phimCollection = db.collection("phim");
    const result = await phimCollection.deleteOne({ _id: ObjectId(req.params.id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
