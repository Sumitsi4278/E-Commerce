const Product = require("../models/product");
const Review = require("../models/review");

module.exports.reviewUpload = async(req,res)=>{
    const { productId } = req.params;

    // await Review.create(req.body);
// this can be done in above way to!
    const newReview = new Review(req.body);
    await newReview.save();

    const product = await Product.findById(productId);
    
    const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAvgRating.toFixed(1));
    // console.log(product);
    product.reviews.push(newReview);
    
    await product.save();
    await newReview.save();

    req.flash('success', 'Review added successfully');
    res.redirect('back');
}