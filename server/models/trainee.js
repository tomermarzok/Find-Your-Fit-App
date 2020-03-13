
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const traineeSchema = new Schema({
    Name:String,
    Address:String,
    Gender:String,
    Phone:String,
    Height:String,
    Wegiht:String,
    Age:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }


});

const Trainee = mongoose.model('trainee',traineeSchema);

module.exports = Trainee;