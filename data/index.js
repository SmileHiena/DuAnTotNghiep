const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes');
const initRouter = require('./src/routes');


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {
//   return res.send('SERVER ON');
// })
initRouter(app)

const PORT = process.env.PORT || 8888;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port `+ server.address().port);
})