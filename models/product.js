const mongoose = require('mongoose');
const Review = require('./review');
// const User = require('./user');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        requesred: true
    },
    img:{
        type: String,
        trim: true,
        default: '../images/product.jpg'
    },
    price:{
        type: Number,
        min: 0,
        default: 0
    },
    desc:{
        type:String,
        trim: true

    },
    avgRating:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

productSchema.post('findOneAndDelete', async(product)=>{
    if(product.reviews.length > 0){
        await Review.deleteMany({_id: {$in: product.reviews}})
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;