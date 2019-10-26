const express = require("express");
const router = express.Router();

const {canCreateGoal} = require("../../helpers/our-goal")
const Goal = require("../../models/Goal");

const {isUserAuthenticated}  = require('../../helpers/authentication')

//loads admin layout
router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

//loads our goal view
router.get('/', (req, res, next) => {
    Goal.find()
    .then(ourGoal => {
        res.render("admin/home-page/our-goal", {
            ourGoal: ourGoal
        });
    })
    .catch(error => {
        console.log(error);
    })
    
});


//create goal
router.post('/', (req, res, next) => {


    //Checks if goal can be created or not
    Goal.find()
    .then(goals => {
       if(canCreateGoal(goals)) {
            let errors = [];

            if(!req.body.goal){
                errors.push({errorMessage: 'Please enter goal description!'});
            }
        
            if(errors.length > 0){
                res.render('admin/home-page/our-goal', {messages: errors});
        
            } else {
        
                const newGoal = new Goal({
                    goal: req.body.goal
                });
        
                newGoal.save()
                .then(savedGoal => {
                    req.flash('success_message', `Goal created successfully.`)
                    res.redirect('/admin/our-goal');
                })
                .catch(error=> {
                    console.log(error);
                })
        
            }
       } else {
        req.flash('failure_message', `You cannot create more than one goal this time. Please delete the current goal and try creating new one!!`)
        res.redirect('/admin/our-goal');
       }
    });

});

//deletes our goal view
router.delete('/:id', (req, res, next) => {
    Goal.findOne({_id: req.params.id})
    .then(goal => {
        goal.remove()
        .then(deletedGoal => {
            req.flash('success_message', `Goal  deleted successfully.`)
            res.redirect('/admin/our-goal');
        });

    })
    .catch(error => {
        console.log(error);
    })
    
});
module.exports = router;