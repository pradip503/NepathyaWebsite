module.exports = {
    isUserAuthenticated: function(req, res, next) {

        if(req.isAuthenticated()) {
            return next();
        }

        res.redirect('/admin');
    }
}