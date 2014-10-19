var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');

// All API access is auth protected
router.use('*', passport.authenticate('basic', { session: false }));

// Router children
router.use('/services', require('./services'));

/// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    router.use(function(err, req, res, next) {
        res.json(err.status || 500, {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
    res.json(err.status || 500, {
        message: err.message
    });
});

module.exports = router;
