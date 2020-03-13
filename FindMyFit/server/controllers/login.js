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


module.exports ={

    signUp: async(req,res,next)=>{
       
        const {email,password,name} = req.body;
        const username = name;

        const newUser = new User({username,email,password});
        await newUser.save();


        const token = createToken(newUser);
        //Respond with token 
        console.log('succes');
        res.status(200).json({token});
    },

    signIn: async(req,res,next)=>{
      //Genarte token
    
      const token = createToken(req.user);
      res.status(200).json({token});
      console.log('succesful login!')
        
    },

    secert: async(req,res,next)=>{
        console.log('i  am in!')
        
    }

}