var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var Category = require('../models/category');
var Product = require('../models/product');


router.get('/:id', function(req, res){

    var loggedIn = (req.isAuthenticated()) ? true : false;

   Category.findById(req.params.id, function(err, category) {

        if(err) {
            console.log(err);
        }

        Product.find({category: category.slug}, function(err, products){
            if(err) console.log(err);

        
            res.render('products/category_products', {products: products, loggedIn: loggedIn});
        });

   })

});



module.exports = router;