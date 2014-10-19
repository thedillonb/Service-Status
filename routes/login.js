var express = require('express');
var router = express.Router();


router.get('/login', function(req, res) {
    res.render('auth/login', { 
        title: 'Express' 
    });
});

router.post('/login', function(req, res) {

});

router.get('/register', function(req, res) {
    res.render('auth/register', {

    });
});

router.post('/register', function(req, res, next) {
    var user = req.db.User.build(req.body.user);
    user.setPassword(req.body.user.password, function(err) {
        if (err) return next(err);

        user.save()
            .success(function(result) {
                res.redirect('/');
            })
            .error(function(err) {
                next(err);
            });
    });
});

router.post('/logout', function(req, res) {

});

module.exports = router;
