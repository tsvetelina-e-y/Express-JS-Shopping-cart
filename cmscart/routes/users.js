var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');

//Get Users model
var User = require('../models/user2');

router.get('/register', function (req, res) {

    res.render('users/register', {
        title: 'Register'
    });
})

router.post('/register', function (req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('firstName', 'Името не може да бъде празно!').notEmpty();
    req.checkBody('lastName', 'Името не може да бъде празно!').notEmpty();
    req.checkBody('email', 'Имейлът е задължителен!').notEmpty();
    req.checkBody('password', 'Паролата е задължителна!').notEmpty();
    req.checkBody('password2', 'Паролите не съвпадат!').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('users/register', {
            errors: errors,
            title: 'Register'
        });
    } else {
        User.findOne({ email: email }, function (err, user) {

            if (err) console.log(err);

            if (user) {
                req.flash('danger', 'Вече има потребител с този имейл.');
                res.redirect('/users/register');
            } else {
                var user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: email,
                    // username: username,
                    password: password,
                    admin: 0
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('success', 'Регистрацията е успешна!');
                                res.redirect('/');
                            }
                        });
                    });
                });

            }
        });
    }
});

//have a popup so..
// router.get('/login', function(req, res) {
//     if(res.locals.user) res.redirect('/');

//     res.render('users/login', {
//         title: 'Вход в системата'
//     });
// });


//post login
router.post('/login', function(req, res, next){

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);


});


router.get('/logout', function (req, res) {

    req.logOut();

    // req.flash('success', 'You are logged out');
    res.redirect('/');

});

module.exports = router;
