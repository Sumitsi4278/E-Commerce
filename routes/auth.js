const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

router.get('/check', (req,res)=>{
    console.log(req.user);
    res.send('done!')
})

// router.get('/got', (req,res)=>{
//     res.send('Working thik thak');
// })

// router.get('/fakeuser', async(req,res)=>{
//     const user = {
//         email: 'sumit@gmail.com',
//         username: 'Sumit'
//     }
//     const newUser = await User.register(user, '1234');
//     res.send(newUser);
// })

router.get('/login', (req,res)=>{
    res.render('auth/login');
})


router.get('/signup', (req,res)=>{
    res.render('auth/signup');
})

router.post('/signup', async(req,res)=>{
    try {
        const {username, email, password, role} = req.body;
        const user = new User({username, email, role});

       const newUser = await  User.register(user, password);

       req.login(newUser, function(error){
            if(error){
               return next(error) 
            }
            req.flash('success', `Welcome, ${req.user.username} You are Registered Successfully!`);
            res.redirect('/products');
       })
        // res.render('/login');
        // res.send(newUser);
    } catch (e) {
        req.flash('reject', e.message);
        res.redirect('/signup');
    } 
})

router.post('/login', 
    passport.authenticate(
        'local',
         {
            failureRedirect: '/login', failureFlash:true
        }
    ), 
    (req,res)=>{
        req.flash('success', `Welcome, ${req.user.username}!`);
        res.redirect('/products');        
})

router.get('/logout', (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out successfully');
        res.redirect('/products');
      });
})

module.exports = router;