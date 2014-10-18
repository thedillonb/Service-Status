var express = require('express');
var router = express.Router();

/* Load the metric if it's available */
router.param('metric_id', function(req, res, next, id) {
    // Load the metric
    next();
});

/* GET all metrics */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

/* POST (create) a metric */
router.post('/', function(req, res) {
    res.send(200);
});

/* PATCH (update) a metric */
router.patch('/:metric_id', function(req, res) {
    res.send(200);
});

/* GET a metric */
router.get('/:metric_id', function(req, res) {
    res.send(200);
});

/* DELETE a metric */
router.delete('/:metric_id', function(req, res) {
    res.send(200);
});

// Child routes
router.use('/data', require('./metric_data'));

module.exports = router;
