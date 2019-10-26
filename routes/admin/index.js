const express = require("express");
const router = express.Router();

const User = require('../../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');



router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})


//loads login view as index
router.get('/', (req, res, next) => {
    res.render('admin/index');
});

//app login

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

    User.findOne({email: email})
    .then(user => {
        if(user) {

            bcrypt.compare(password, user.password, (err, success ) => {
                if(err) return err;
                if(success) {
                    return done(null,user);
                } else {
                    return done(null, false, {message: 'Password not matched!'})
                }
            });

        } else {
            return done(null, false, {message: 'No user found!'})
        }
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin',
        failureFlash: true
    })(req,res,next);
});


//logout
router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/admin');
});


module.exports = router;