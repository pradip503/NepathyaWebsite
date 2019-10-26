const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({

    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'faculties'
    },

    semester: {
        type: Schema.Types.ObjectId,
        ref: 'semesters'
    },

    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    },
    file: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    }    
});

module.exports = mongoose.model('questions',QuestionSchema);