var express = require('express');
var router = express.Router();

/* Load the service if it's available */
router.param('subscriber_id', function(req, res, next, id) {
    // Load the metric
    next();
});

/* GET all subscriptions */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

/* POST (create) a subscription */
router.post('/', function(req, res) {
    res.send(200);
});

/* PATCH (update) a subscription */
router.patch('/:subscriber_id', function(req, res) {
    res.send(200);
});

/* GET a subscription */
router.get('/:subscriber_id', function(req, res) {
    res.send(200);
});

/* DELETE a subscription */
router.delete('/:subscriber_id', function(req, res) {
    res.send(200);
});

module.exports = router;
