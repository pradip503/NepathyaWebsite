const express = require("express");
const router = express.Router();

const {isUserAuthenticated}  = require('../../helpers/authentication')



router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

router.get('/', (req, res, next) => {
    res.render('admin/home-page/users-view')
})


module.exports = router;