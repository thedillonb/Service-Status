var express = require('express');
var router = express.Router();

/* Load the incident if it's available */
router.param('incident_id', function(req, res, next, id) {
    next();
});

/* GET all incidents */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

/* POST (create) an incident */
router.post('/', function(req, res) {
    res.send(200);
});

/* PATCH (update) an incident */
router.patch('/:incident_id', function(req, res) {
    res.send(200);
});

/* GET an incident */
router.get('/:incident_id', function(req, res) {
    res.send(200);
});

/* DELETE an incident */
router.delete('/:incident_id', function(req, res) {
    res.send(200);
});

module.exports = router;
