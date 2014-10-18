var express = require('express');
var router = express.Router();

// Router children
router.use('/services', require('./services'));

module.exports = router;
