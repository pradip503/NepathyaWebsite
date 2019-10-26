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
        res.render('admin/Questions_collection/faculty', {faculties: faculties});
    })
    .catch(error => {
        return console.log(error);
    })
    
});

//creates faculty

router.post('/', (req, res, next) => {

    const newFaculty = new Faculty({
        name: req.body.faculty.toUpperCase(),
    });

    newFaculty.save().then(savedFaculty => {
        req.flash('success_message', `Faculty ${savedFaculty.name} added successfully.`)
        res.redirect('/admin/faculties');
    });
});

//deletes faculty
router.delete('/:id', (req, res, next) => {

    Faculty.findOne({_id: req.params.id})
    .then(faculty => {
        faculty.remove()
        .then(removedFaculty => {
            req.flash('success_message', `Faculty ${removedFaculty.name} removed successfully.`)
            res.redirect('/admin/faculties');
        })
        .catch(error => {
            req.flash('error_message', `Problem in removing ${removedFaculty.name} .`)
            res.redirect('/admin/faculties');
        })
    })
    .catch(error => {
        return console.log(error);
    })

});





module.exports = router;