const express = require("express");
const router = express.Router();
const fs = require('fs');

const {isEmpty, uploadDir} = require('../../helpers/file-upload');


const Event = require('../../models/Event');

const {isUserAuthenticated}  = require('../../helpers/authentication');

//loads admin layout
router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

//loads my event view
router.get('/', (req, res, next) => {
    Event.find()
    .then(events => {
        res.render('admin/home-page/events', {events: events})
    })
    .catch(error => {
    })
    
});


//loads create event view
router.get('/create-event', (req, res, next) => {
    res.render('admin/home-page/create-event');
});

//creates an event
router.post('/create-event', (req, res, next) => {

    let errors = [];

    if(!req.body.title){
        errors.push({errorMessage: 'Please enter title!'});
    }

    if(!req.body.description){
        errors.push({errorMessage: 'Please enter description!'});
    }

    if(errors.length > 0){
        res.render('admin/home-page/create-event', {messages: errors});

    } else {

        //we set default filename as empty incase of file is empty
        let filename = '';

        //checks if image uploaded is empty
        if(!isEmpty(req.files)) {

            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            file.mv('./public/uploads/' + filename, (error) => {
                if(error) throw error;
            });

            const newEvent = new Event({
                title: req.body.title,
                file: filename,
                description: req.body.description
            });

            newEvent.save()
                .then(savedEvent => {
                    req.flash('success_message', `Post ${savedEvent.title} saved successfully.`)
                    res.redirect('/admin/events');
                })
                .catch(error => {
                    console.log(error);
                })
            
        } else {
            errors.push({errorMessage:'Please upload one image!'});
            res.render('admin/home-page/create-event', {messages: errors});
        }

    }

});


//delete event 
router.delete('/:id', (req, res, next) => {

    Event.findOne({_id:req.params.id})
    .then(event => {
        fs.unlink(uploadDir + event.file, (error) => {
            if(error) return error;
        });

        event.remove().then(removedPost => {
            req.flash('success_message', `Post ${removedPost.title} deleted successfully.`)
            res.redirect('/admin/events');
        })
    })
    .catch(error => {
        if(error) throw error;
    });

    
});


module.exports = router;