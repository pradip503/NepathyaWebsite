const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    position: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    facebookLink: {
        type: String
    },
    linkedInLink: {
        type: String
    }
    
});

module.exports = mongoose.model('teamMembers',TeamMemberSchema);