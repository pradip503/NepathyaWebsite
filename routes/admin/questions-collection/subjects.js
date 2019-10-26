const express = require("express");
const router = express.Router();

const Faculty = require('../../../models/Faculty');
const Subject = require('../../../models/Subject');



//loads admin layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})


//loads both adding and creating faculty view
router.get('/', (req, res, next) => {

    Faculty.find()
        .then(faculties => {
            Subject.find()
                .then(subjects => {
                    res.render('admin/Questions_collection/subjects', {faculties: faculties, subjects: subjects});
                })
             });
});


//get semester for showing in dropdown while adding subjects on ajax request
router.post('/get-semester', (req, res, next) => {


    Faculty.findById(req.body.facultyId)
    .then(faculty => {
        res.send(faculty.semesters)
    })
 
});


//create new subjects
router.post('/add-subject', (req, res, next) => {

    const newSubject = new Subject({

        name: req.body.subject,
        faculty: req.body.facultyId,
        semester: req.body.semester

    });

    newSubject.save()
    .then(savedSubject => {
        req.flash('success_message', `${savedSubject.name} saved successfully.`)
        res.redirect('/admin/subject');
    });
    
    
});


//deletes subject
router.delete("/:id", (req, res, next) => {
    Subject.findById(req.params.id)
    .then(subject => {
        subject.remove().then(removedSubject => {
            req.flash('success_message', `${removedSubject.name} deleted successfully.`)
            res.redirect('/admin/subject');   
        });
    });
});



module.exports = router;