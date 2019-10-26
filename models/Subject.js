const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'faculties',
        required: true
    },
    semester: {
        type: String,
        required: true
    }

    
});

module.exports = mongoose.model('subjects', SubjectSchema);