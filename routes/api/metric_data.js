var express = require('express');
var router = express.Router();

/* GET all metric data */
router.get('/', function(req, res,  next) {
    var time = req.query.time;
    var group = null;

    if (time === 'week') {
        time = '7d';
        group = '1h';
    } else if (time === 'month') {
        time = '30d';
        group = '1h';
    } else {
        time = '1d';
        group = '5m';
    }

    var calculation = req.metric.calculation;
    var selectClause = 'select ' + calculation + '(value) from 5m.metric-' + req.metric.id + '-' + calculation;
    var whereClause = 'group by time(' + group + ') fill(0) where time > now() - ' + time;

    req.influx.query(selectClause + ' ' + whereClause, function(err, data) {
        if (err) return next(err);
        res.json(data[0].points);
    });
});

/* POST a metric data point */
router.post('/', function(req, res, next) {
    var points = null;
    var data = req.body;

    if (!Array.isArray(data)) {
        data = [data];
    }

    var points = data.map(function(value) {
        return {
            value: value.value,
            time: value.time || new Date()
        };
    });

    var options = {
        database: req.service.id.toString()
    };

    req.influx.writePoints('metric-' + req.metric.id + '-' + req.metric.calculation, points, options, function(err) {
        console.log(err);
        if (err) return next(err);
        res.send(200);
    });
});

/* DELETE all data for this metric */
router.delete('/', function(req, res) {
    res.send(200);
});

module.exports = router;
