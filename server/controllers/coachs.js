const Coach = require('../models/coach');
const mongoose = require('mongoose');
const  ObjectId = mongoose.Types.ObjectId;
const QuerysHelper = require('../helpers/searchHelper');

module.exports = {
    
    getAllCoachs: async (req,res,next)=>{

        const coachs = await Coach.find({});
        res.status(200).json({coachs}); 
    },

    newCoach: async (req,res,next)=>{
     try{
        const newCoach = new Coach(req.body);
        const coach = await newCoach.save();
     }catch(error){
         return error;
     }
        res.status(201).json(coach);
    },

    getCoach: async(req,res,next)=>{
        
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
    searchCoachs: async (req, res, next) => {
        try {
            let Query = QuerysHelper.QueryGenerator(req.body);
            Coach.find(Query, function (err, coaches) {
                if (err) return err;
                const data =JSON.stringify(coaches);
                res.status(200).send(data);
            })
        } catch (error) {
            return error;
        }

   
    },


    
    deleteCoach: async (req,res,next)=>{
        
        const coachId = req.params.coachId;
        const query = {"_id":coachId}
        const result = await Coach.findOneAndRemove(query);
        res.status(200).json({'success':true});
        

    }
};