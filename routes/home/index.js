const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');
const TeamMember = require('../../models/TeamMember');
const Goal = require('../../models/Goal');


const nodemailer = require('nodemailer');


//loads home layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});


//loads home screen
router.get('/', (req, res, next) => {

    Event.find()
    .then(events => {

        TeamMember.find()
        .then(members => {

            Goal.find()
            .then(goals => {

                res.render('home/index', {
                    home: true,
                    events: events,
                    members: members,
                    goals: goals
                }); 

            })
            .catch(error => {
                console.log(error);
            })
            
        })
        .catch(error => {
            console.log(error);
        })

    })
    .catch(error => {
        if(error) return error;
    })   
});


//loads login screen
router.get('/login', (req, res, next) => {
    res.render('home/login');
});


//loads signup screen
router.get('/signup', (req, res, next) => {
    res.render('home/signup');
});








router.post('/mail_us', (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cnepathyastudents0627@gmail.com', // generated ethereal user
            pass: 'forbystudents' // generated ethereal password
        }
    });

    let HelperOptions =  {
        from: req.body.name + " "+ req.body.mailId, 
        to: 'cnepathyastudents0627@gmail.com',
        subject: req.body.subject,
        text: req.body.description
    };

    
    transporter.sendMail(HelperOptions, (error, info) => {
        if(error) {
            return console.log(error);
        }
        
        res.send(info);
        
    });  
})

module.exports = router;