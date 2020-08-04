const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost/databasetest';

    
    try {
        mongoose.connect( URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));    
        }catch (error) { 
        console.log("could not connect");    
        }

const connection = mongoose.connection;


connection.once('open', ()=>{
    console.log('db is connected');
})