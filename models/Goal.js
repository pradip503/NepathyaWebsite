const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GoalSchema = new Schema({
    goal: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('goal',GoalSchema);