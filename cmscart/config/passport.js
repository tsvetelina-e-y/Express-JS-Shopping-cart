// var passport = require('passport');
// var User = require('../models/user');
// var LocalStrategy = require('passport-local').Strategy;

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });


// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

// passport.use('local.signup', new LocalStrategy({
//     firstField: 'first',
//     lastField: 'last',
//     usernameField: 'email',
//     passwordField: 'password',
//     confirmPasswordField: 'confirmPassword',

//     passReqToCallback: true
// }, function (req,firstName, lastName, email, password,  done) {
    
//     req.checkBody('firstName', 'Name is required').notEmpty();
//     req.checkBody('lastName', 'Name is required').notEmpty();
//     req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
//     req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 4 });
//     var errors = req.validationErrors();
//     if (errors) {
//         var messages = [];
//         errors.forEach(function (error) {
//             messages.push(error.msg);
//         });
//         return done(null, false, req.flash('error', messages));
//         console.log("----" + firstName + " "+ lastName);
//         return done(null, false, messages);
//     }

//     User.findOne({ 'email': email }, function (err, user) {
//         if (err) {
//             return done(err);
//         }

//         if (user) {
//             console.log("-------------------"+done);
//             return done(null, false, { message: 'Email is aladeady in use' });
//         }

//         console.log("----" + firstName + " "+ lastName);

//         var newUser = new User();
//         newUser.firstName = firstName;
//         newUser.lastName = lastName;
//         newUser.email = email;
//         newUser.password = password;
//         newUser.password = newUser.encryptPassword(password);
//         newUser.save(function (err, result) {
//             if (err) {
//                 return done(err);
//             }
//             return done(null, newUser);
//         });
//     });
// }));