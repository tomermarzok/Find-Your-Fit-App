const Joi = require('joi');


module.exports = {
    validateParam: (schema,name) =>{
        return (req,res,next)=>{
            //valid the param
            const result =Joi.validate({param:req['params'][name]},schema);

            //check if validtion error exsit
            if(result.error){
                return res.status(400).json(result.error);
            }
            
            else{
                //if no value obj ,create one !
                if(!req.value)
                    req.value={};

                //if no 'params' field exsit ,create one
                if(!req.value['params'])
                    req.value['params']={};
                
                //insert the valid param to 'params' field
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    validateBody:(schema)=>{
        return(req,res,next)=>{
            const result = Joi.validate(req.body,schema);
            if (result.error){
                return res.status(404).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }
    },

    

    schemas:{
        idSchema: Joi.object().keys({
            param:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        autoSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
    }
}