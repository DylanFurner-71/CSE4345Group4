import { MongoClient } from 'mongodb';
const dbName = "testHaircutBE"; //the name of our database
const ATLAS_URL = `mongodb+srv://dfurner:smu2020@cluster0.tkm1w.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`; //We are configuring urls here
const mongoose = require('mongoose');
const connectMongoose = async () =>{
        console.log("connecting mongoose");
      await mongoose.connect(ATLAS_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
      })
      .then(() => {
       console.log('MongoDB Connected…');
      });
  };
 
module.exports = connectMongoose;
  
  
