var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var Category = require('../models/category');

var auth = require('../config/auth');
var isAdmin = auth.isAdmin;


//get categories
router.get('/', isAdmin, function (req, res) {
    Category.find(function (err, categories) {
        if (err)
            console.log(err);

        res.render('admin/categories', {
            categories: categories
        });
    });
});


//get add categories
router.get('/add-category', isAdmin, function (req, res) {
    var title = '';

    res.render('admin/add_category', {
        title: title
    });
});



//post add categories
router.post('/add-category', function (req, res) {
    req.checkBody('title', 'Title must have a value').notEmpty();

    var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";

    var title = req.body.title;
    var slug = req.body.slug;
    var parent = req.body.parent;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_category', {
            errors: errors,
            title: title
        });
    } else {
        Category.findOne({ slug: slug }, function (err, category) {
            if (category) {
                req.flash('danger', 'Категорията съществува!');
                res.render('admin/add_category', {
                    title: title
                });
            } else {

                var category = new Category({
                    title: title,
                    slug: slug,
                    parent: parent,
                    image: imageFile
                });

                category.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/category_images/' + category._id, function (err) {
                        return console.log(err);
                    });

                    console.log(imageFile);

                    if (imageFile != "") {
                        var categoryImage = req.files.image;
                        var path = 'public/category_images/' + category._id + "/" + imageFile;

                        categoryImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    req.flash('Категорията е добавена');
                    Category.find({}, function (err, categories) {
                        req.app.locals.categories = categories;
                    });
                    res.redirect('/admin/categories');
                });


            }
        })
    }
});


// GET EDIT CATEGORY
router.get('/edit-category/:id', isAdmin, function (req, res) {

    console.log('here');
    Category.findById(req.params.id, function (err, category) {

        if (err) {
            return console.log(err);
        } else {
            var imageDir = 'public/category_images/' + category._id;
            var galleryImage = null;


            fs.readdir(imageDir, function (err, file) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImage = file;


                    res.render('admin/edit_category', {

                        title: category.title,
                        id: category._id,
                        parent: category.parent,
                        slug: category.slug,
                        category: category,
                        image: category.image,
                        galleryImage: galleryImage

                    });

                }
            });
        }
    });
})

//post edit category
router.post('/edit-category/:id', function (req, res) {
    var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";

    req.checkBody('title', 'Заглавието не може да бъде празно!').notEmpty();

    var title = req.body.title;
    // var slug = title.replace(/\s+/g, '-').toLowerCase();
    var slug = req.body.slug;
    var id = req.params.id;
    var parent = req.body.parent;
    var pimage = req.body.pimage;


    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/edit_page', {
            errors: errors,
            title: title,
            id: id
        });
    } else {
        Category.findOne({ slug: slug, _id: { '$ne': id } }, function (err, category) {
            if (category) {

                req.flash('danger', "Категорията съществува!");
                res.render('admin/edit_category', {
                    title: title,
                    id: id,
                    parent: parent
                });
            } else {
                Category.findById(id, function (err, category) {
                    if (err)
                        return console.log(err);


                    category.title = title;
                    category.slug = slug;
                    category.parent = req.body.parent;

                    if (imageFile != "") {
                        category.image = imageFile;
                    }


                    category.save(function (err) {
                        if (err) {
                            return console.log(err);
                        }

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/category_images/' + id + '/' + pimage, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }

                            var categoryImage = req.files.image;
                            var path = 'public/category_images/' + id + "/" + imageFile;


                            categoryImage.mv(path, function (err) {
                                return console.log(err);
                            });
                        }

                        Category.find(function (err, categories) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.app.locals.categories = categories;
                            }

                        });


                        req.flash('success', 'Категорията е променена!');
                        res.redirect('/admin/categories');
                    });

                });

            }
        });
    }
});

//get delete page
router.get('/delete-category/:id', isAdmin, function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        }

        Category.find(function (err, categories) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.categories = categories;
            }

        });


        req.flash('success', 'Категорията е изтрита!');
        res.redirect('/admin/categories/');
    });


});




module.exports = router;