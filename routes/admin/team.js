const express = require("express");
const router = express.Router();
const fs = require('fs');

const {isEmpty, uploadDir} = require('../../helpers/file-upload');


const TeamMember = require('../../models/TeamMember');

const {isUserAuthenticated}  = require('../../helpers/authentication')



router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

router.get('/', (req, res, next) => {

    TeamMember.find()
    .then(teamMembers => {
        res.render('admin/home-page/team', {
            teamMembers: teamMembers
        })
    })
    .catch(error => {

    })
    
})


//loads create event 
router.get('/add-member', (req, res, next) => {
    res.render('admin/home-page/add-team-member')
})


//create an event
router.post('/add-member', (req, res, next) => {
    let errors = [];

    if(!req.body.name){
        errors.push({errorMessage: 'Please enter name!'});
    }

    if(!req.body.position){
        errors.push({errorMessage: 'Please enter position!'});
    }

    if(errors.length > 0){
        res.render('admin/home-page/add-team-member', {messages: errors});

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

            const newTeamMember = new TeamMember({
                name: req.body.name,
                position: req.body.position,
                file: filename,
                facebookLink: req.body.fb_link,
                linkedInLink: req.body.linkedIn_link
            });

            newTeamMember.save()
                .then(savedMember => {
                    req.flash('success_message', `Member ${savedMember.name} added successfully.`)
                    res.redirect('/admin/team-members');
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            errors.push({errorMessage:'Please upload one image!'});
            res.render('admin/home-page/add-team-member', {messages: errors});
        }
    }
});

//loads edit team members view
router.get('/edit/:id', (req, res, next) => {
    TeamMember.findOne({_id:req.params.id},(error, member) => {

        if(member) {
            res.render('admin/home-page/edit-team-member', {
                member: member
            })
        }
        if(error) console.log(error);
    })
});

//Edits team member
router.put('/edit/:id', (req, res, next) => {
    let errors = [];

    if(!req.body.name){
        errors.push({errorMessage: 'Please enter name!'});
    }

    if(!req.body.position){
        errors.push({errorMessage: 'Please enter position!'});
    }

    if(errors.length > 0){
        res.render('admin/home-page/add-team-member', {messages: errors});

    } else {

        TeamMember.findOne({_id: req.params.id})
        .then(member => {
            member.name = req.body.name;
            member.position = req.body.position;
            member.facebookLink = req.body.fb_link;
            member.linkedInLink = req.body.linkedIn_link;

            //checks if image uploaded is empty
            if(!isEmpty(req.files)) { 


                //removes previous image
                fs.unlink(uploadDir + member.file, (error) => {
                    if(error) return error;
                });

                //add new image
                let filename = "";
                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                file.mv('./public/uploads/' + filename, (error) => {
                    if(error) throw error;
                });

                //replaces filename
                member.file = filename

            }

            member.save().then(updatedmember => {
                req.flash('success_message', `Member ${updatedmember.name} updated successfully.`);
                res.redirect('/admin/team-members');
            })
        })
    }

});



//delete Team Member 
router.delete('/:id', (req, res, next) => {

    TeamMember.findOne({_id:req.params.id})
    .then(teamMember => {
        fs.unlink(uploadDir + teamMember.file, (error) => {
            if(error) return error;
        });

        teamMember.remove().then(removedMember => {
            req.flash('success_message', `Member ${removedMember.name} deleted successfully.`)
            res.redirect('/admin/team-members');
        })
    })
    .catch(error => {
        if(error) throw error;
    });  
});



module.exports = router;