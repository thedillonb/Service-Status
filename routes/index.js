var express = require('express');
var router = express.Router();

// Router children
router.use('/api', require('./api'));

// Router children
router.use(require('./web'));

// Export all the good stuff
module.exports = router;
