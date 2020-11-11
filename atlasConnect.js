import mongoose from 'mongoose';

const amTesting = false; // this is a bool to test on my mongo database
// Can get rid of when ready to move into actual DB
const testName = // again this is just a testing environment for me atm.
    'mongodb+srv://elisego45:120060@segoviacluster0.zz1fg.mongodb.net/testHaircutBE?retryWrites=true&w=majority';

export const ATLAS_URL = amTesting ? testName : process.env.MONGO_URI; // setting the uri to appropriate.
// ---- can delete this line and up (except import obviously) when done...----------------

export const mongooseConnect = async () => {
    await mongoose
        .connect(ATLAS_URL, { useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log(
                `${process.env.MONGO_DB} database connection established successfully`
            );
        })
        .catch(err => console.log(err));
};
