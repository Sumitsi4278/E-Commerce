const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../../middleware');
const User = require('../../../models/user');


router.post('/API/V1/products/:productId/like', isLoggedIn, async(req,res)=>{
    const { productId } = req.params;
    const user = req.user;
    const isLiked = req.user.wishList.includes(productId);

    if(isLiked){
        req.user = await User.findByIdAndUpdate(user._id, {$pull: {wishList: productId}}, {new: true});
    }
    else{
        req.user = await User.findByIdAndUpdate(user._id, {$addToSet: {wishList: productId}}, {new: true});
    }

    res.json({
        success: true
    });
})

module.exports = router;