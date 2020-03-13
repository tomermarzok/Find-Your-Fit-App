const User= require('../models/user');
const Coach= require('../models/coach');
const mongoose = require('mongoose');
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const  ObjectId = mongoose.Types.ObjectId;

const {JWT_SECRET} =require('../configuration/config');

createToken = user =>{

    return  JWT.sign({
        iss:'findme',
        sub:user.id,
        iat:new Date().getTime()
        // exp:new Date.setDate(new Date.getDate()+1)//current time + 1 day ahaed
    },JWT_SECRET);

}
module.exports = {
    getAllUsers : async (req,res,next)=>{

        const users = await User.find({});
        res.status(200).json({users})
    },

    
    newUser: async (req,res,next)=>{

        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },


    getUser: async (req,res,next)=>{
        
        const userId = new ObjectId(req.value.params.userId);
        const query = {"_id":userId}
    
        const user = await User.find(query);
        res.status(200).json(user)
    },

    replaceUser: async (req,res,next)=>{
        //enforce that req.body contian all fielids
        const userId = req.params.userId;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({'success':true});


    },
    updateUser: async (req,res,next)=>{
        //req.body may contain any singel field 
        const userId = req.params.usersId;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({'success':true});

    },

    //we need to add remove coach or trainee befor remove the user object
    deleteUser: async (req,res,next)=>{

        const userId = req.params.userId;
        const query = {"_id":userId}
        const result = await User.findOneAndRemove(query);
        res.status(200).json({'success':true});
        

    },

    getUserCoach: async(req,res,next)=>{
        
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const coach = await Coach.findById(user.coach);
        res.status(200).json(coach);
    },

    newCoach: async(req,res,next)=>{

        //get user id
        const userId = req.params.userId;
        
        //create new coach
        const newCoach = new Coach(req.body);
        
        //find the user object by the id
        const user = await User.findById(userId);
        
        //connect the coach object with his user object
        newCoach.user = user;

        //save coach to database
        await newCoach.save();
        
        //connect user object with his coach object
        user.coach = newCoach;
        
        //save user changes to database
        await user.save();

        res.status(200).json({'success':true});
    },



};