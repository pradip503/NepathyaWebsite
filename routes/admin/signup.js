const express = require("express");
const router = express.Router();
const bcryptjs = require('bcryptjs');

const User = require("../../models/User");

//loads admin layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})


//loads main signup view
router.get('/', (req, res, next) => {
    res.render('admin/signup');
})

//create a user
router.post('/', (req, res, next) => {

    let errors = [];

    if(!req.body.firstName) {
        errors.push({'error_message': 'Please enter firstname.'});
    }
    if(!req.body.lastName) {
        errors.push({'error_message': 'Please enter lastname.'});
    }
    if(!req.body.email) {
        errors.push({'error_message': 'Please enter email.'});
    }
    if(!req.body.password) {
        errors.push({'error_message': 'Please enter password.'});
    }
    if(!req.body.passwordConfirm) {
        errors.push({'error_message': 'Please enter confirm password.'});
    }

    if(req.body.password !== req.body.passwordConfirm){
        errors.push({'error_message': 'Password fields donot matched!'});
    }

    if(errors.length > 0){
        res.render( 'admin/signup', 
        {errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
    } else {

        //checks is user with that email already exists

        User.findOne({email: req.body.email})
        .then(user => {
            if(user){

                req.flash('error_message', "User with that email already exists. You can login directly!");
                res.redirect('/admin');
                
            } else {


                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email : req.body.email,
                    password : req.body.password
            
                });
        
        
                //hashes password before saving to database
                bcryptjs.genSalt(10, (error, salt) => {
        
                        if(error){
                            console.log(error);
                        }
        
                    bcryptjs.hash(newUser.password, salt, (error, hash) => {
        
                        newUser.password = hash;
        
                        newUser.save().then(savedUser => {
                            req.flash('success_message', 'User was registered successfully! Please login to continue!');
                            res.redirect('/admin');
                        });
        
                    });
                });

            }
        });
    }
})


module.exports = router;