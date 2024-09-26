
const router = require('express').Router();

router.get('/', (req, res) => {
    return res.send('user');
})

module.exports = router