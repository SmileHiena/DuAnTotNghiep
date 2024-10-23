var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, (file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  }
});

// API to get the list of products
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const theloaiCollection = db.collection("theloai");
    const theloai = await theloaiCollection.find().toArray();

    if (theloai.length > 0) {
      res.status(200).json(theloai);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API to add a new event
router.post("/add", upload.single('Anh'), async (req, res) => {
  try {
    
    const eventId = new ObjectId(); 

    const newCategory = {
      _id: eventId,
      Ten: req.body.Ten, // Accessing the 'Ten' property directly
      Anh: req.file ? `/images/theloai/${req.file.filename}` : "", // Use the correct path
    };

   

    const db = await connectDb();
    const categoryCollection = db.collection("theloai"); // Assuming your collection is named "theloai"
    await categoryCollection.insertOne(newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category", error: error.message });
  }
});


// API để xóa thể loại
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const theloaiCollection = db.collection("theloai");
    const result = await theloaiCollection.deleteOne({ _id: ObjectId(req.params.id) });

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