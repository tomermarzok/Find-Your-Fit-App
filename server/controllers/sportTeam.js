
const mongoose = require('mongoose');
const  ObjectId = mongoose.Types.ObjectId;
const SportTeam = require('../models/sportTeam');
const User = require('../models/user');


module.exports = {
    newSportTeam:async (req,res,next)=>{
        try{
            const userId = req.body.owner;
            const user = await User.findById(userId).catch((err) => {
                console.log(err);
                throw err;
            });
            const newSportTeam = new SportTeam(req.body);
            newSportTeam.owner = user;
            await newSportTeam.save();

            res.status(201).json({'success':true});
            

        }catch(err){
            console.log('Eroor:'+err);
            throw err;
        }
    },
    signToTeam:async (req,res,next)=>{
        
        try{
            const team_id = req.body.team_id;
            const user_id =  req.body.user_id;
            const team =await SportTeam.findById(team_id).catch((err)=>{
                console.log('signToTeam'+err);throw err;
            });
            
            signed_users = team.users;
            signed_users.push(user_id);
            team.number_of_participants= team.number_of_participants+1;
            team.users=signed_users;
            await team.save();
            res.status(201).json('succes');
        }catch(err){
            console.log(err);
            throw err;
        }
        
    },
    unSignTeam:async(req,res,next)=>{
        try{
            const team_id = req.body.team_id;
            const user_id =  req.body.user_id;
            const team =await SportTeam.findById(team_id).catch((err)=>{
                console.log('signToTeam'+err);throw err;
            });
            
            signed_users = team.users;
            user_to_remove = signed_users.indexOf(user_id);
            signed_users.splice(user_to_remove,1);
            team.number_of_participants= team.number_of_participants-1;
            team.users=signed_users;
            await team.save();
            res.status(201).json('user id:'+user_id+' unsign from team!');
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getAllTeam:async (req,res,next)=>{
        const teams = await SportTeam.find({});
        res.status(200).json({teams}); 
    },
    deleteTeam:async(req,res,next)=>{
        const team_id = req.params.teamId;
        const query = {"_id":team_id}
        const result = await SportTeam.findOneAndRemove(query);
        res.status(204).json({'success':true});
    }
    
};