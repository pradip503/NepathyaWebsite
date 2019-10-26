const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FacultySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    semesters: [{
        type: String
    }]
           
});

module.exports = mongoose.model('faculties',FacultySchema);