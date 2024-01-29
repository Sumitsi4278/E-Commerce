const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    
    email:{
        type: String,
        trim: true,
        required: true
    },
    username:{
        type: String,
        trim: true,
        required: true
    },
    role:{
        type: String,
        // required: true,
        default: 'buyer'
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    cart:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            }
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;