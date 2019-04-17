var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    parent: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category'
        type: String
    },
    image: {
        type: String,
        required:false
    }
    
});

CategorySchema.statics.findParent = function () {
    this.find({ _id: this.parent }, function (err, parent) {
        console.log(parent);
        category.parentName = parent ? parent.title : '-';
    });
}

var Category = module.exports = mongoose.model('Category', CategorySchema);