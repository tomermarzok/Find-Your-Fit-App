const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    coach:{
                type:Schema.Types.ObjectId,
                ref:'Coach'
            },
    trainee:{

                type:Schema.Types.ObjectId,
                ref:'Trainee'
        }

    

});

userSchema.pre('save',async function(next){

   try{
        //Genarate salt
        const salt = await bcrypt.genSalt(10);

        //Genarate a password hash {salt+hash}
        const passwordHash = await bcrypt.hash(this.password,salt);
        //Re-assgin hashed version over original plain text password
        this.password =passwordHash;
        next();

   }catch(error){
     next(error);
   }

});

userSchema.methods.isValidPassword = async function(newPassword){
  try{
        
      return await bcrypt.compare(newPassword,this.password)
      

  }catch(error){
          throw new Error(error);
  }

}

const User = mongoose.model('user',userSchema);

module.exports = User;
