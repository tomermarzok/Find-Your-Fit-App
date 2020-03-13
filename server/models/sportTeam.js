const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sportTeamSchema = new Schema({
    name:String,
    category:String,
    number_of_participants:{type:Number,default:0},
    cost: Boolean,
    price:Number,
    details:String,
    owner:Schema.Types.ObjectId,
    //time:Date,
    users :[Schema.Types.ObjectId]
});

const sportTeam = mongoose.model('sportTeam',sportTeamSchema);

module.exports = sportTeam;