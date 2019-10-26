const express = require("express");
const router = express.Router();

const Faculty = require('../../../models/Faculty');
const Subject = require('../../../models/Subject');


//loads admin layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


//loads default route view
router.get('/', (req, res, next) => {
    Faculty.find()
    .then(faculties => {
        Subject.find()
        .then(subjects => {
             res.render("admin/Questions_collection/question", {faculties, subjects});
        });
    });
   
});

//get subjects for specific semester on ajax dropdown

router.post('/get-subjects', (req, res, next) => {

    Subject.find()
    .populate('faculties')
    .then(semesters => {
        console.log(semesters);
    })

});

module.exports = router;