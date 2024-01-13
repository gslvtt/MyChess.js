const router = require('express').Router();

router.get('/', (req, res) => {res.send('Routed!')})

module.exports = router;