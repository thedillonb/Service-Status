var express = require('express');
var router = express.Router();

/* Load the service if it's available */
router.param('service_id', function(req, res, next, id) {
    // Load the metric
    next();
});

/* GET all services */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

/* POST (create) a service */
router.post('/', function(req, res) {
    res.send(200);
});

/* PATCH (update) a service */
router.patch('/:service_id', function(req, res) {
    res.send(200);
});

/* GET a service */
router.get('/:service_id', function(req, res) {
    res.send(200);
});

/* DELETE a service */
router.delete('/:service_id', function(req, res) {
    res.send(200);
});

// Child routes
router.use('/metrics', require('./metrics'));
router.use('/incidents', require('./incidents'));
router.use('/subscribers', require('./subscribers'));

module.exports = router;
