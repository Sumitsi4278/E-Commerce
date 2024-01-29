const Product = require('./models/product');
const {productSchema, reviewSchema} = require('./schemas');

module.exports.validateProduct = (req, res, next)=>{
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', {err: msg});
    }
    // console.log(error);
    next();
}

module.exports.validateReview = (req, res, next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating, comment})
    
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', {err: msg});
    }
    // console.log(error);
    next();

}

module.exports.isLoggedIn = (req, res, next) => {
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            success: false,
            msg: 'login first'
        })
    }

    if(!req.isAuthenticated()){
        req.flash('error', "You need to login first to access this page!");
        // const originalUrl = req.url; // Store original URL
        // req.session.originalUrl = req.url;
        return res.redirect('/login');
}
    next();
}

module.exports.isSeller = (req,res,next)=>{
    const userRole = req.user.role;
    if(userRole === 'buyer'){
        req.flash('error', "You're not authorised");
        return res.redirect('/products');
    }
    next();
}
module.exports.isBuyer = (req,res,next)=>{
    const userRole = req.user.role;
    if(userRole === 'seller'){
        req.flash('error', "You're seller");
        return res.redirect('back');
    }
    next();
}

module.exports.isAuthor = async(req, res, next)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product.author || !product.author.equals(req.user._id)){

        req.flash('error', "You're not authorised",);
        return res.redirect('back');
    }
    next();
}