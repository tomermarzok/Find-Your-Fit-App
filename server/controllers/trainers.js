
const Trainee= require('../models/trainee');
const mongoose = require('mongoose');
const  ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user');
// const obj = {   
//     Name:'String',
// Address:'String',
// Gender:'String',
// Limitation:'String',
// Phone:'String',
// Certificates:'String'
// }

module.exports = {

    getAllTrainers: async (req,res,next)=>{
        
        const trainers = await Trainee.find({});
        res.status(200).json({trainers}); 
    },
    newTrainee: async (req, res, next) => {
        try {
            //get user id
            const userId = req.body.userId;

            //create new Trainee
            const newTrainee = new Trainee(req.body);

            //find the user object by the id
            const user = await User.findById(userId).catch((err) => {
                console.log(err);
                return err;
            });

            //connect the coach object with his user object
            newTrainee.user = user;

            //save coach to database
            await newTrainee.save();

            //connect user object with his coach object
            user.Trainee = newTrainee;


            res.status(200).json({ 'success': true });
        } catch(error){
            console.log(error);
            return error;
        }
    },
    getTrainee: async(req,res,next)=>{
        
        try{
            const TraineeId = new ObjectId(req.params.traineeId);
            const query = {"_id":TraineeId}
            const trainers = await Trainee.find(query);

            res.status(200).json(trainers);
        }catch(error){
            console.log(error);
            return error;
        }
    },
    getTraineeProfile: async(req,res,next)=>{
        try{
            const UserId = new ObjectId(req.params.traineeId);
            const query = {"user":UserId};
            const trainers = await Trainee.find(query);

            res.status(200).json(trainers);
        }catch(error){
            console.log(error);
            return error;
        }
 
    },

    replaceTrainee: async (req,res,next)=>{
        
        //enforce that req.body contian all fielids
        const TraineeId = req.params.TraineeId;
        const newTrainee = req.body;
        const result = await Trainee.findByIdAndUpdate(TraineeId,newTrainee);
        res.status(200).json({'success':true});


    },

    updateTrainee: async (req,res,next)=>{
        try{
            //enforce that req.body contian all fielids
            const traineeId = req.params.traineeId;
            const newTrainee = req.body;
            const result = await Trainee.findByIdAndUpdate(traineeId,newTrainee,function(res){
                console.log(res);
            });
            res.status(200).json({'success':true});
        }catch(error){
            console.log(error);
            return error;
        }

    },


    
    deleteTrainee: async (req,res,next)=>{
        
        const TraineeId = req.params.TraineeId;
        const query = {"_id":TraineeId}
        const result = await Trainee.findOneAndRemove(query);
        res.status(204).json({'success':true});
        

    }
};