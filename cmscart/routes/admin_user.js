var express = require('express');
var router = express.Router();

var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

var User = require('../models/user2');

//get users
router.get('/', isAdmin, function (req, res) {
    User.find(function (err, users) {
        if (err)
            console.log(err);

        res.render('admin/users', {
            users: users
        });
    });
});

//get delete users
router.get('/delete-user/:id', isAdmin, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        }

        req.flash('success', 'Потребителят е изтрит.');
        res.redirect('/admin/users/');
    });


});



module.exports = router;