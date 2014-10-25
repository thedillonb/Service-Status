var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

router.get('/:service_id', function(req, res, next) {
    req.db.Service.find({ where: { id: req.params.service_id } })
        .then(function(service) {
            if (service === null) {
                return res.status(404).render('404');
            }

            req.influx.options.database = service.id.toString();

            return service.getMetrics()
                .then(function(metrics) {
                    return Promise.map(metrics, function(metric) {
                            var group = '5m';
                            var time = '1d';
                            var calculation = metric.calculation;
                            var selectClause = 'select ' + calculation + '(value) from 5m.metric-' + metric.id + '-' + calculation;
                            var whereClause = 'group by time(' + group + ') fill(0) where time > now() - ' + time;
                            return new Promise(function(good, bad) {
                                req.influx.query(selectClause + ' ' + whereClause, function(err, data) {
                                    if (err) return bad(err);
                                    return good({
                                        metric: metric,
                                        data: data[0].points
                                    });
                                })
                            });
                        }).then(function(data) {
                            res.render('public',{
                                title: 'Public',
                                metrics: data
                            });
                        });
                });
        })
        .catch(next);
});

router.get('/:service_id/assets/style.css', function(req, res) {

});

module.exports = router;