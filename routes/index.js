var express  = require('express'),
    router   = express.Router(),
    passport = require('passport');
    
var User = require('../models/user');


router.get('/', function (req, res) {
    res.render('landing');
});

// REGISTER ROUTE
router.get('/register', function(req, res) {
    res.render('register');
});

// REGISTER CREATE
router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// LOGIN ROUTE
router.get('/login', function(req, res) {
    res.render('login'); 
});

// LOGIN AUTH
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {
     
});

// LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});

module.exports = router;