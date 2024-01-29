const User = require("../models/user");


module.exports.addToCart = async(req, res)=>{
    
    const { productId } = req.params;
    
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    const cartItem = user.cart.find((item) => {
        return item.productId.toString() === productId;
    })

    if(cartItem){
        cartItem.quantity++;
    }
    else{
        user.cart.push({productId});
    }
    await user.save();
    req.flash('success', "Item has been added successfully!");
    res.redirect('back');
}

module.exports.quantityremoveFromCart = async(req,res)=>{
    const { productId } = req.params;
    const userId = req.user._id;
    
    const user = await User.findById(userId);

    
    const cartItem = user.cart.find((item)=>{
        return item.productId.toString() === productId ;
    })

    if(cartItem && cartItem.quantity > 1){
        cartItem.quantity--;
    }

    await user.save();
    req.flash('success', "Quantity updated successfully!");
    res.redirect('back');
}

module.exports.deleteFromcart = async(req,res)=>{
   const { productId } = req.params;
   const userId = req.user._id;

   const user = await User.findById(userId);
   
   const itemIndex = user.cart.findIndex((item)=>{
    return item.productId.toString() === productId;
    });

    if(itemIndex !== -1){
    user.cart.splice(itemIndex, 1);
    }

   await user.save();

   req.flash('success', "product has been removed");
   res.redirect('back');
}

module.exports.showCart = async(req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart.productId');
    
    let totalAmount = 0;
    user.cart.forEach(item => {
        totalAmount += item.quantity * item.productId.price;
    });
    res.render('cart/index', {user, totalAmount});
}