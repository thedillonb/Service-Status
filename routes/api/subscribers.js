var express = require('express');
var _ = require('underscore');
var router = express.Router();

// White listed attributes
var whiteListAttributes = ['email', 'phone_number', 'url_endpoint'];

/* Load the subscriber if it's available */
router.param('fuck_you', function(req, res, next, id) {
    console.trace('here i am');
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
    res.json(req.service.createSubscriber(_.pick(req.body, whiteListAttributes)));
});

/* GET a subscription */
router.get('/:fuck_you', function(req, res) {
    console.log('why god...');
    res.json(req.subscriber);
});

/* PATCH (update) a subscription */
router.patch('/:fuck_you', function(req, res) {
    res.json(req.subscriber.updateAttributes(_.pick(req.body, whiteListAttributes)));
});


/* DELETE a subscription */
router.delete('/:subscriber_id', function(req, res) {
    req.subscriber.destroy().done(function() { res.send(200); }, next);
});

module.exports = router;
