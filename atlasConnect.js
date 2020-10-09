import mongoose from "mongoose";

export const dbName = "testHaircutBE"; //the name of our database

const amTesting = true; // this is a bool to test on my mongo database
// Can get rid of when ready to move into actual DB

const testName = // again this is just a testing environment for me atm.
  "mongodb+srv://elisego45:120060@segoviacluster0.zz1fg.mongodb.net/testHaircutBE?retryWrites=true&w=majority";

// this is the DB we are actually going to use.
const finalName = `mongodb+srv://dfurner:smu2020@cluster0.tkm1w.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const ATLAS_URL = amTesting ? testName : finalName; // setting the uri to appropriate.

export const mongooseConnect = async () => {
  await mongoose
    .connect(ATLAS_URL, { useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log("MongoDB database connection established successfully");
    });
};
