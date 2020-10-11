import mongoose from "mongoose";

const amTesting = true; // this is a bool to test on my mongo database
// Can get rid of when ready to move into actual DB
const testName = // again this is just a testing environment for me atm.
  "mongodb+srv://elisego45:120060@segoviacluster0.zz1fg.mongodb.net/testHaircutBE?retryWrites=true&w=majority";

<<<<<<< HEAD
export const ATLAS_URL = amTesting ? testName : process.env.MONGO_URI; // setting the uri to appropriate.
// ---- can delete this line and up (except import obviously) when done...----------------

export const mongooseConnect = async () => {
  await mongoose
    .connect(ATLAS_URL, { useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log(
        `${process.env.MONGO_DB} database connection established successfully`
      );
    });
};
=======
export const ATLAS_URL = `mongodb+srv://dfurner:smu2020@cluster0.tkm1w.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const mongooseConnect = async () => {
await mongoose.connect(ATLAS_URL, { useUnifiedTopology: true, useCreateIndex: true })
.then(() => {

    console.log("MongoDB database connection established successfully");
  });
};

module.exports = mongooseConnect;

>>>>>>> 6477959719d243c526def3ec0c07d550b4bb806c
