import mongoose from "mongoose";

export const dbName = "testHaircutBE"; //the name of our database
/* this is the db we will work with */
//export const ATLAS_URL = `mongodb+srv://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<${dbName}>?retryWrites=true&w=majority`; //We are configuring urls here

export const ATLAS_URL = `mongodb+srv://dfurner:smu2020@cluster0.tkm1w.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const mongooseConnect = async () => {
await mongoose.connect(ATLAS_URL, { useUnifiedTopology: true, useCreateIndex: true })
.then(() => {

    console.log("MongoDB database connection established successfully");
  });
};

module.exports = mongooseConnect;

