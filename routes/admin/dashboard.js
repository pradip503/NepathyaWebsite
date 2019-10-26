const express = require("express");
const router = express.Router();

const {isUserAuthenticated}  = require('../../helpers/authentication')



//loads admin layout
router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

//loads dashboard page
router.all('/*', (req, res, next) => {
    res.render('admin/dashboard')
})

module.exports = router;