var express = require('express');
var router = express.Router();

/* Load the subscriber if it's available */
router.param('subscriber_id', function(req, res, next, id) {
    req.service.getSubscribers({ where: { id: id } })
        .then(function(result) {
            if (result.length == 0) {
                res.send(404);
            }
            else {
                req.subscriber = result[0];
                next();
            }
        })
        .catch(next);
});

/* GET all subscriptions */
router.get('/', function(req, res) {
    res.json(req.service.getSubscribers());
});

/* POST (create) a subscription */
router.post('/', function(req, res) {
    res.json(req.service.createSubscriber(req.db.Subscriber.filter(req.body)));
});

/* GET a subscription */
router.get('/:subscriber_id', function(req, res) {
    res.json(req.subscriber);
});

/* PATCH (update) a subscription */
router.patch('/:subscriber_id', function(req, res) {
    res.json(req.subscriber.updateAttributes(req.db.Subscriber.filter(req.body)));
});


/* DELETE a subscription */
router.delete('/:subscriber_id', function(req, res) {
    req.subscriber.destroy().done(function() { res.send(200); }, next);
});

module.exports = router;
