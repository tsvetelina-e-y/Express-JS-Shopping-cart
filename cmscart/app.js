var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');

var passport = require('passport');

//init app
var app = express();
mongoose.connect('mongodb://localhost:27017/ellate', { useNewUrlParser: true });
// require('./config/passport');

require('./config/passport');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//set public folder
app.use(express.static(path.join(__dirname, '/public')));

app.locals.errors = null;

//Get page model
var Page = require('./models/page');

//Get all pages to pass to header.ejs

Page.find({}).sort({ sorting: 1 }).exec(function (err, pages) {
    if (err) {
        console.log(err);
    } else {
        app.locals.pages = pages;
    }
})

//Get category model
var Category = require('./models/category');

//Get all categories to pass to header.ejs

Category.find(function (err, categories) {
    if (err) {
        console.log(err);
    } else {
        app.locals.categories = categories;
    }

});

//Express file uplaod middleware

app.use(fileUpload());

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

//express session middleware

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}))


//express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case ".jpg":
                    return ".jpg";
                case ".jpeg":
                    return ".jpeg";
                case ".png":
                    return ".png";
                default: return false;

            }
        }

    }
}));

//express messages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//Passport config
require('./config/passport2')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.cart = req.session.cart;
    res.locals.favourites = req.session.favourites;
    res.locals.user = req.user || null;
    next();
});

//set routes

var pages = require('./routes/pages.js');
var products = require('./routes/products.js');
var cart = require('./routes/cart.js');
var favourites = require('./routes/favourites.js');
var users = require('./routes/users.js');
var categories = require('./routes/categories.js');
var adminPages = require('./routes/admin_pages.js');
var adminUser = require('./routes/admin_user.js');
var adminCategories = require('./routes/admin_categories.js');
var adminProducts = require('./routes/admin_products.js');
var adminUsers = require('./routes/admin_users.js');

app.use('/admin/pages', adminPages);


app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/admin/users', adminUser);
app.use('/products', products);
app.use('/categories', categories);
app.use('/user', adminUsers);
app.use('/users', users);
app.use('/cart', cart);
app.use('/favourites', favourites);
app.use('/', pages);

app.use('/admin', router.get('/login', function (req, res) {
    res.render('admin/login');
}));


app.use('/admin', router.post('/login', function (req, res, next) {

    console.log('admin login');
    passport.authenticate('local', {
        successRedirect: '/admin/categories',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);


}));


//start the server
var port = 3000;
app.listen(port, function () {
    console.log('server started on port ' + port);
})

