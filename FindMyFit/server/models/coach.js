const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coachSchema = new Schema({
    specialitation:String,
    experience:String,
    certificates:String,
    price:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

});

const Coach = mongoose.model('coach',coachSchema);

module.exports = Coach;