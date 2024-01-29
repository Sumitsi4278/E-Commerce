const Product = require("../models/product");

module.exports.showAllProducts = async(req, res)=>{
    try {
    const products = await Product.find({});

    res.render('products/index', {products});
        
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
}

module.exports.newProduct = (req,res)=>{
    // One way is this and secon is by usining a middleware;
    // if(!req.isAuthenticated()){
    //     req.flash('reject', "You need to login first to access this page!");
    //     return res.redirect('/login');
    // }
    try {
        res.render('products/new');
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
    
}

module.exports.createProduct = async(req,res)=>{
    // console.log(req.body);
    try {
        await Product.create({...req.body, author: req.user._id});
        req.flash('success', 'Product added successfully')
        res.redirect('/products');
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
    
}

module.exports.showProduct = async(req,res)=>{
    try {
        const {id} = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('products/show', {product});
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
    
}

module.exports.editProduct = async(req,res)=>{
    try {
        const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
    
}

module.exports.updatedProduct = async(req,res)=>{
    try {
        const {id} = req.params;

    await Product.findByIdAndUpdate(id, req.body);
    req.flash('success', 'Product edited successfully')
    res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.render('error', {err: e.message});
    }
}

module.exports.deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id);
        for(reviewId of product.reviews){
            await Review.findByIdAndDelete(reviewId);
        }
    
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully')
        res.redirect('/products');
    } 
    catch (e) {
        res.render('error', {err: e.message});
    }
}