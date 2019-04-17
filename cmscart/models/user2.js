var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number
    }
});

var User = module.exports = mongoose.model('User', UserSchema);