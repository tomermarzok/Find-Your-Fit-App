const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const traineeSchema = new Schema({
    Name:String,
    Address:String,
    Age:String,
    PhoneNumber:String,
    Gender:String,
    Limitation:String

});

const Trainee = mongoose.model('Trainee',traineeSchema);

module.exports = Trainee;





