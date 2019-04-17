var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();

var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

router.use(csrfProtection);

var User = require('../models/user2');


router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

// router.get('/profile', function(req, res, next) {
//     res.render('users/profile');
// });

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next) {
    res.render('users/signup', {csrfToken: req.csrfToken() });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

module.exports = router;















