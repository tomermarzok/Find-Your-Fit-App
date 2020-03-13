const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//connect to datebase
mongoose.connect('localhost','App2',{ useMongoClient: true });
let db = mongoose.connection;
mongoose.Promise = global.Promise;

//Check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
})

//check for db errors
db.on('error',function(err){
    console.log(err);
});

//Routes
const users = require('./routes/users');
const coachs = require('./routes/coachs');
const trainers = require('./routes/trainers');
const login = require('./routes/login')
//Middelwares
app.use(logger('Dev'));
app.use(bodyParser.json());

//Routes
app.use('/users',users);
app.use('/coachs',coachs);
app.use('/trainers',trainers);
app.use('/Authentication',login);

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

app.listen(port,()=> console.log(`Server is listening on port ${port} `));