const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'Ticker_Movie';

async function connectDb() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Kết nối thành công đến server MongoDB');
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Không thể kết nối đến MongoDB', err);
        throw err;
    }
}

module.exports = connectDb;
