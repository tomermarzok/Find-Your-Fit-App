const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
        email: {
                type: String,
                lowercase: true
        },
        password: {
                type:String
        },
        coach: {
                type: Schema.Types.ObjectId,
                ref: 'Coach'
        },
        trainee: {

                type: Schema.Types.ObjectId,
                ref: 'Trainee'
        }
   

});

userSchema.pre('save', async function (next) {
        try {
           
                //Genarate salt
                const salt = await bcrypt.genSalt(10);

                //Genarate a password hash {salt+hash}
                const passwordHash = await bcrypt.hash(this.password, salt);
                //Re-assgin hashed version over original plain text password
                
                this.password = passwordHash;
                next();

        } catch (error) {
                next(error);
        }

});

userSchema.methods.isValidPassword = async function (Password) {


        try {
                console.log('hash',this.password);
                console.log('send ',Password);
                return await bcrypt.compare(Password, this.password);

        } catch (error) {
                console.lgo(error);
                throw new Error(error);
        }

}

const User = mongoose.model('user', userSchema);

module.exports = User;
