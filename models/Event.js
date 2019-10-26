const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    file: {
        type: String,
        required: true
    } 
    
});

module.exports = mongoose.model('events',EventSchema);