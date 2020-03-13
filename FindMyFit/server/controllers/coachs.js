const Coach = require('../models/coach');
const mongoose = require('mongoose');
const  ObjectId = mongoose.Types.ObjectId;

module.exports = {
    
    getAllCoachs: async (req,res,next)=>{

        const coachs = await Coach.find({});
        res.status(200).json({coachs}); 
    },

    newCoach: async (req,res,next)=>{
        const newCoach = new Coach(req.body);
        const coach = await newCoach.save();
        res.status(201).json(coach);
    },

    getCoach: async(req,res,next)=>{
        console.log('in')
        const CoachId = new ObjectId(req.params.CoachId);
        const query = {"_id":CoachId}
    
        const coach = await Coach.find(query);
        res.status(200).json(coach);
    },

    replaceCoach: async (req,res,next)=>{
        
        //enforce that req.body contian all fielids
        const coachId = req.params.coachId;
        const newCoach = req.body;
        const result = await Coach.findByIdAndUpdate(coachId,newCoach);
        res.status(200).json({'success':true});


    },

    updateCoach: async (req,res,next)=>{
        
        //enforce that req.body contian all fielids
        const coachId = req.params.coachId;
        const newCoach = req.body;
        const result = await Coach.findByIdAndUpdate(coachId,newCoach);
        res.status(200).json({'success':true});


    },


    
    deleteCoach: async (req,res,next)=>{
        
        const coachId = req.params.coachId;
        const query = {"_id":coachId}
        const result = await Coach.findOneAndRemove(query);
        res.status(200).json({'success':true});
        

    }
};