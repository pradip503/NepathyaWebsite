const express = require("express");
const router = express.Router();


const Faculty = require('../../../models/Faculty');


//loads admin layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})


//loads both adding and creating faculty view
router.get('/', (req, res, next) => {

    Faculty.find()
        .then(faculties => {
        
                res.render('admin/Questions_collection/semester', {faculties: faculties});
             
            });
    

   
    
});

//add semester on specific faculty
router.post('/', (req, res, next) => {

    Faculty.findById(req.body.facultyId).then(faculty => {

        faculty.semesters.push(req.body.semester);
        faculty.save().then(savedFaculty => {
            req.flash('success_message', `Semester ${req.body.semester} added successfully.`)
            res.redirect('/admin/semester');
        });

    });


    
});

module.exports = router;