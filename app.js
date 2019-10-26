const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

const exphbs = require('express-handlebars');
const upload = require('express-fileupload');

const {mongoDbUrl} = require('./config/database')

const {displaySemesterList} = require('./helpers/handlebar-helper')



//making app to use static file
app.use(express.static(path.join(__dirname, 'public')));

//define template engine
app.set('view engine', 'handlebars');

//use default engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers : {displaySemesterList: displaySemesterList}}));

//upload middlewares
app.use(upload());

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//using to override post method to put
app.use(methodOverride('_method'));


//database connection
mongoose.connect(mongoDbUrl, {useNewUrlParser: true})
.then(db => {
    console.log('MONGO CONNECTED!');
})
.catch(error => {
    console.log('Error in database connection' + error);
})

//flash and session
app.use(session({
    secret: 'pradipbhattarai',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


//set local variable for success and failure flash message
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.failure_message = req.flash('failure_message');
    res.locals.error = req.flash('error');
    next();
})


//home routes
const home = require('./routes/home/index');
const questions_collection_faculty = require('./routes/home/questions_collections')

//admin routes

//admin home page routes
const signup = require('./routes/admin/signup');
const admin = require('./routes/admin/index');
const dashboard = require('./routes/admin/dashboard');
const events = require('./routes/admin/events');
const team_Members = require('./routes/admin/team');
const users_View = require('./routes/admin/users-view');
const our_Goal = require('./routes/admin/our-goal');

//admin questions collection routes
const faculty = require('./routes/admin/questions-collection/faculty');
const semester  = require('./routes/admin/questions-collection/semester');
const subjects  = require('./routes/admin/questions-collection/subjects');
const questions  = require('./routes/admin/questions-collection/question');


//load home home page routes
app.use('/', home);
app.use('/questions_collection', questions_collection_faculty);

//use admin homepage routes
app.use('/admin', admin);
app.use('/admin/signup', signup);
app.use('/admin/dashboard', dashboard);
app.use('/admin/events', events);
app.use('/admin/team-members', team_Members);
app.use('/admin/users-view', users_View);
app.use('/admin/our-goal', our_Goal);

//use admin questions collection routes
app.use('/admin/faculties', faculty);
app.use('/admin/semester', semester);
app.use('/admin/subject', subjects);
app.use('/admin/question', questions);


// creating server
const port = process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log('Listening to port: ' + port);
});
