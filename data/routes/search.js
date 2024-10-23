const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const connectDb = require('../models/db'); 
function createAccentInsensitiveRegex(str) {
    const accentMap = {
        'a': '[aàáâãäåâă]',
        'c': '[cç]',
        'e': '[eèéêë]',
        'i': '[iìíîï]',
        'n': '[nm]',
        'm': '[mn]',
        'o': '[oòóôõö]',
        'u': '[uùúûü]',
        'y': '[yÿ]',
        'A': '[AÀÁÂÃÄÅ]',
        'C': '[CÇ]',
        'E': '[EÈÉÊ]',
        'I': '[IÌÍÎÏ]',
        'N': '[NÑ]',
        'O': '[OÒÓÔÕÖ]',
        'U': '[UÙÚÛÜ]',
        'Y': '[YŸ]'
    };
    const regexStr = str.split('').map(char => accentMap[char] || char).join('');
    return new RegExp(regexStr, 'i');
}
router.get('/', async (req, res, next) => {
    try {
        const db = await connectDb();
        const productCollection = db.collection('phim');
        let searchTerm = req.query.name;

        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        const searchRegex = createAccentInsensitiveRegex(searchTerm);
        const phim = await productCollection.find({
            $or: [
                { Ten: { $regex: searchRegex } },
            ]
        }).toArray();

        if (phim.length > 0) {
            res.status(200).json(phim);
        } else {
            res.status(404).json({ message: 'No movies or authors found with the given name' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router; 