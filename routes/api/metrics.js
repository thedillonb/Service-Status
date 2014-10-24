var express = require('express');
var router = express.Router();

/* Load the metric if it's available */
router.param('metric_id', function(req, res, next, id) {
    req.service.getMetrics({ where: { id: id } })
        .then(function(result) {
            if (result.length == 0) {
                res.send(404);
            }
            else {
                req.metric = result[0];
                next();
            }
        })
        .catch(next);
});

/* GET all metrics */
router.get('/', function(req, res) {
    res.json(req.service.getMetrics());
});

/* POST (create) a metric */
router.post('/', function(req, res) {
    res.json(req.service.createMetric(req.db.Metric.filter(req.body)));
});

/* PATCH (update) a metric */
router.patch('/:metric_id', function(req, res) {
    res.json(req.metric.updateAttributes(req.db.Metric.filter(req.body)));
});

/* GET a metric */
router.get('/:metric_id', function(req, res) {
    res.json(req.metric);
});

/* DELETE a metric */
router.delete('/:metric_id', function(req, res) {
    req.incident.destroy().done(function() { res.send(200); }, next);
});

// Child routes
router.use('/:metric_id/data', require('./metric_data'));

module.exports = router;
