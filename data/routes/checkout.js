var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb'); // Ensure ObjectId is imported for MongoDB document querying
const connectDb = require('../models/db');
let currentId = 0; 

async function getNextSequenceValue(sequenceName) {
    const db = await connectDb();
    const countersCollection = db.collection('counters');
    const sequenceDocument = await countersCollection.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { returnOriginal: false }
    );
    return sequenceDocument.value.seq;
}

// GET: Retrieve all invoices
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        // Fetch all invoices
        const invoices = await invoicesCollection.find().toArray();
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Failed to fetch invoices' });
    }
});

// POST: Create a new invoice
router.post('/', async (req, res) => {
    try {
        const {
            NgayMua,
            Rap,
            PhuongThucThanhToan,
            TenPhim,
            ThoiGian,
            NgayChieu,
            SoGhe,
            PhongChieu,
            GiaVe,
            TongTien,
            TenKhachHang,
            Email,
            selectedSeats,
            Combo,
        } = req.body;

        // Validate input data
        if (!NgayMua || !Rap || !PhuongThucThanhToan || !TenPhim || !ThoiGian || !NgayChieu || !SoGhe || !PhongChieu || !GiaVe || !TongTien || !TenKhachHang || !Email || !Combo) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Use currentId for the new invoice ID
        const newInvoiceId = ++currentId; // Increment currentId for new invoice

        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        // Construct the new invoice object
        const newInvoice = {
            id: newInvoiceId, // Set the auto-incremented ID here
            NgayMua,
            Rap,
            PhuongThucThanhToan,
            TenPhim,
            ThoiGian,
            NgayChieu,
            SoGhe,
            PhongChieu,
            GiaVe,
            TongTien,
            TenKhachHang,
            Email,
            Combo,
            createdAt: new Date(),
        };

        // Insert the new invoice into the collection
        const result = await invoicesCollection.insertOne(newInvoice);
        res.status(201).json({ id: newInvoiceId, ...newInvoice }); // Respond with the new invoice ID
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Failed to create invoice' });
    }
});
// GET: Retrieve an invoice by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        // Parse the ID from the request parameters and convert it to an integer
        const invoiceId = parseInt(req.params.id, 10); // Convert to integer

        // Check if the provided ID is a valid number
        if (isNaN(invoiceId) || invoiceId <= 0) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        // Fetch the invoice by ID
        const invoice = await invoicesCollection.findOne({ id: invoiceId }); // Use the integer ID

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Failed to fetch invoice' });
    }
});

module.exports = router;