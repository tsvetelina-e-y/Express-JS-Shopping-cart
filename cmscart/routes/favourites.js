var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

var Product = require('../models/product');


//all favourites
router.get('/all', function (req, res) {

    if (req.session.favourites && req.session.favourites.length == 0) {
        delete req.session.favourites;
        res.redirect('/favourites/all');
    } else {
        req.flash('Продуктът е добавен в любими');
        res.render('favourites/all', {
            title: 'favourites',
            favourites: req.session.favourites
        });

    }
});


router.get('/add/:product', function (req, res) {
    var slug = req.params.product;

    Product.findOne({ slug: slug }, function (err, p) {

        if (err) {
            consonle.log(err);
        }

        if (typeof req.session.favourites == 'undefined') {
            req.session.favourites = [];
            req.session.favourites.push({
                title: p.title,
                qty: 1,
                slug: p.slug,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images/' + p._id + '/' + p.image
            });
        } else {
            var favourites = req.session.favourites;
            var newItem = true;

            for (var i = 0; i < favourites.length; i++) {
                if (favourites[i].slug == slug) {
                    favourites[i].qty++;
                    newItem = false;
                    break;
                }
            }

            if (newItem) {
                favourites.push({
                    title: p.title,
                    qty: 1,
                    slug: p.slug,
                    price: parseFloat(p.price).toFixed(2)
                })
            }
        }

        // req.flash('success', 'Product added!');
        res.redirect('back');

    });
});

//update favourites
router.get('/update/:product', function (req, res) {

    var slug = req.params.product;
    var favourites = req.session.favourites;
    var action = req.query.action;

    for (var i = 0; i < favourites.length; i++) {

        if (favourites[i].slug == slug) {
           
            switch (action) {
                case 'remove':
                    favourites[i].qty--;
                    if (favourites[i].qty < 1) favourites.splice(i, 1);
                    break;
                default:
                    console.log('Update problem');
                    break;

            }

            break;

        }
    }

    // req.flash('success', 'Cart updated!');
    res.redirect('/favourites/all');
});




module.exports = router;