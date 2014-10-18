var express = require('express');
var router = express.Router();

/* GET all metric data */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* POST a metric data point */
router.post('/', function(req, res) {
    res.send(200);
});

/* DELETE all data for this metric */
router.delete('/', function(req, res) {
    res.send(200);
});

module.exports = router;
