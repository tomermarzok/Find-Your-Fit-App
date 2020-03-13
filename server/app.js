const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;



//connect to datebase
// mongoose.connect('localhost','App2',{ useMongoClient: true });
mongoose.connect('mongodb://admin:l7dt3v2m1@ds257590.mlab.com:57590/find_my_fit',()=>{
    console.log('connnected to mongodb')
});
let db = mongoose.connection;
mongoose.Promise = global.Promise;

// const MONGO_URL = 'mongodb://admin:l7dt3v2m1@ds257590.mlab.com:57590/find_my_fit';



//Check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
})

//check for db errors
db.on('error',function(err){
    console.log(err);
});

//import Routes models
const users = require('./routes/users');
const coachs = require('./routes/coachs');
const trainers = require('./routes/trainers');
const login = require('./routes/login');
const sportTeam = require('./routes/sportTeam');

//Middelwares
app.use(logger('Dev'));
app.use(bodyParser.json());

//Routes
app.use('/users',users);
app.use('/coachs',coachs);
app.use('/trainers',trainers);
app.use('/Authentication',login);
app.use('/sportTeam',sportTeam);

//Cathc 404 Errors and forwared them to error handler
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler fucntion
app.use((err,req,res,next)=>{
    const error =app.get('env')=== 'development' ? err:{};
    const status = err.status || 500;

    //Respo to client
    res.status(status).json({
        error:{
            message:error.message
        }
    });
})

//start server
const port = app.get('port') || 3000;

app.listen(process.env.PORT || 8888,()=> console.log(`Server is listening on port ${port} `));