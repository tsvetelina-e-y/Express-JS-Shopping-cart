var express = require('express');
var router = express.Router();

//Get page model
var Page = require('../models/page');
var Product = require('../models/product');
var Category = require('../models/category');
var fs = require('fs-extra');

router.get('/', function (req, res) {
    Product.find(function (err, products) {

        if (err) {
            console.log(err);
        }

        res.render('products/all', {
            // todo make home page
            title: 'ALl products',
            products: products
        });
    });
});

router.get('/:slug', function(req, res) {

    console.log(req.params.slug);
    Product.findOne({slug: req.params.slug}, function(err, product) {

        if(err) console.log(err);


        // start

        var galleryDir = 'public/product_images/' + product._id + '/gallery';
        var galleryImages = null;


        fs.readdir(galleryDir, function (err, files) {
            if (err) {
                console.log(err);
            } else {
                galleryImages = files;
                

                res.render('products/single-product', {
                    product: product,
                    galleryImages: galleryImages,
                });

            }
        });

    });

});




//exports
module.exports = router;