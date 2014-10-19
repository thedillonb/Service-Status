var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
var routes = require('./routes');
var passport = require('passport');
var session = require('express-session');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(require('express-promise')());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'supersecretsecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new BasicStrategy(function(username, password, done) {
    models.User.findOne({ where: { email: username } })
        .success(function(result) {
            result.comparePassword(password, function(err) {
                return done(err, result);
            });
        })
        .error(done);
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Inject models
app.use(function(req, res, next) {
    req.db = models;
    next();
});

app.use('/', routes);
