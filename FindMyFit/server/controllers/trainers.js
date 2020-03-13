const Trainee = require('../models/trainee');
const mongoose = require('mongoose');
const  ObjectId = mongoose.Types.ObjectId;

const obj ={   
    Name:"String",
    Address:"String",
    Age:"String",
    PhoneNumber:"String",
    Gender:"String",
    Limitation:"ds"}

module.exports = {

    getAllTrainers: async (req,res,next)=>{
        
        const trainers = await Trainee.find({});
        res.status(200).json({trainers}); 
    },

    newTrainee: async (req,res,next)=>{

        try{
            const newTrainee =  new Trainee(obj);
        }catch(err){
            console.log(err)
        }
        const Trainee = await newTrainee.save();
        res.status(201).json(Trainee);
    },

    getTrainee: async(req,res,next)=>{

        const TraineeId = new ObjectId(req.params.TraineeId);
        const query = {"_id":TraineeId}
    
        const Trainee = await Trainee.find(query);
        res.status(200).json(Trainee);
    },

    replaceTrainee: async (req,res,next)=>{
        
        //enforce that req.body contian all fielids
        const TraineeId = req.params.TraineeId;
        const newTrainee = req.body;
        const result = await Trainee.findByIdAndUpdate(TraineeId,newTrainee);
        res.status(200).json({'success':true});


    },

    updateTrainee: async (req,res,next)=>{
        
        //enforce that req.body contian all fielids
        const TraineeId = req.params.TraineeId;
        const newTrainee = req.body;
        const result = await Trainee.findByIdAndUpdate(TraineeId,newTrainee);
        res.status(200).json({'success':true});


    },


    
    deleteTrainee: async (req,res,next)=>{
        
        const TraineeId = req.params.TraineeId;
        const query = {"_id":TraineeId}
        const result = await Trainee.findOneAndRemove(query);
        res.status(200).json({'success':true});
        

    }
};