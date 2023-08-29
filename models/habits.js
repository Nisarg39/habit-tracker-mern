const mongoose = require('mongoose');
const habitsSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    desc:{
        type: String
    },
    dates: [{
        day:String,
        month: String,
        year: String,
        status: String
    }]  
}, {
    toJSON: { virtuals: true }
})

const HabitsList = mongoose.model('habit', habitsSchema);
module.exports  = HabitsList;