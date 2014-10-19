var express = require('express');
var _ = require('underscore');
var router = express.Router();


router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});



/* Load the service if it's available */
router.param('service_id', function(req, res, next, id) {
    console.trace('fuck');
    req.user.getServices({ where: { id: id }, include: [ req.db.User ]})
        .then(function(result) {
            if (result.length == 0) {
                res.send(404);
            }
            else {
                req.service = result[0];
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
    res.json(req.user.createService(_.pick(req.body, 'name'))
        .then(function (result) {
            return req.user.getServices({ where: { id: result.id }, include: [ req.db.User ] });
        })
        .then(function (results) {
            return results[0];
        }));
});

/* PATCH (update) a service */
router.patch('/:service_id', function(req, res) {
    res.json(req.service.updateAttributes(_.pick(req.body, 'name')));
});

/* GET a service */
router.get('/:service_id', function(req, res) {
    res.json(req.service);
});

/* DELETE a service */
router.delete('/:service_id', function(req, res, next) {
    req.service.destroy().done(function() { res.send(200); }, next);
});

// Child routes
router.use('/:service_id/metrics', require('./metrics'));
router.use('/:service_id/incidents', require('./incidents'));
router.use('/:service_id/subscribers', require('./subscribers'));

module.exports = router;
