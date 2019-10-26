const express = require('express');
const router = express.Router();

const Faculty = require('../../../models/Faculty');



//loads home layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});



//loads faculty and semester choosing screen in question collectio
router.get('/', (req, res, next) => {

    Faculty.find()
    .then(faculties => {
                res.render('home/questions', {
                    questions_collection: true,
                    faculties: faculties
        });
    })
    
});


//loads year subject lists with each year question papaer with accordian
router.get('/subject-list', (req, res, next) => {
    res.render('home/questions/subjects', {questions_collection: true});
});

module.exports = router;