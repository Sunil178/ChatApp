//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/chatDB';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)

db.on('connected', function(){
    console.log("Mongoose default connection is open to ", mongoDB);
 });

db.on('error', function(err){
     console.log("Mongoose default connection has occured "+err+" error");
});

db.on('disconnected', function(){
     console.log("Mongoose default connection is disconnected");
});
