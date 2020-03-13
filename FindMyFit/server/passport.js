const passport = require('passport');
const jwtstartegy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration/config')
const User = require('./models/user');

//JSON WEB TOKEN STRATEGY
passport.use(new jwtstartegy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
},async (payload,done)=>{
 try{
     //find the user specified in token
    const user = await User.findById(payload.sub);
     //if user dosent exists, handle it
    if(!user){
        return done(null,false);
    }
    

     //Otherwise, return the user
    done(null,user);
 } catch(error){

     done(error,false);
 }
}));


//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}
,async (email,password,done)=>{

    try{
        //Find the user given the email
        const user = await User.findOne({email});

        //If not , handle it
        if(!user){
            return done(null, false, { message: 'Incorrect username.' });
        }

        //check if the password is correct
        const isMatch= await user.isValidPassword(password)

        //if not,handle it
        if(!isMatch){
            return done(null,false, { message: 'bad password' });
        }

        //Otherwise, return the user
        done(null,user);

    }catch(error){
        done(error,false);
    }


}));