var express = require('express');
var Promise = require('bluebird');
var router = express.Router();

/* Load the service if it's available */
router.param('service_id', function(req, res, next, id) {
    req.user.getServices({ where: { id: id }, include: [ req.db.User ]})
        .then(function(result) {
            if (result.length == 0) {
                res.send(404);
            }
            else {
                req.service = result[0];
                req.influx.options.database = req.service.id.toString();
                next();
            }
        })
        .catch(next);
});

/* GET all services */
router.get('/', function(req, res) {
    res.json(req.user.getServices({ include: [ req.db.User ]}));
});

/* POST (create) a service */
router.post('/', function(req, res, next) {
    res.json(req.user.createService(req.db.Service.filter(req.body))
        .then(function (result) {
            var createDbAsync = Promise.promisify(req.influx.createDatabase, req.influx);
            return createDbAsync(result.id.toString())
                .then(function() {
                    return req.user.getServices({ where: { id: result.id }, include: [ req.db.User ] });
                })
                .then(function (results) { 
                    return results[0]; 
                });
        }));
});

/* PATCH (update) a service */
router.patch('/:service_id', function(req, res) {
    res.json(req.service.updateAttributes(req.db.Service.filter(req.body)));
});

/* GET a service */
router.get('/:service_id', function(req, res) {
    res.json(req.service);
});

/* DELETE a service */
router.delete('/:service_id', function(req, res, next) {
    var deleteDbAsync = Promise.promisify(req.influx.deleteDatabase);
    deleteDbAsync(req.service.id)
        .then(function() { return req.service.destroy(); })
        .done(function() { res.send(200); }, next)
});

// Child routes
router.use('/:service_id/metrics', require('./metrics'));
router.use('/:service_id/incidents', require('./incidents'));
router.use('/:service_id/subscribers', require('./subscribers'));

module.exports = router;
