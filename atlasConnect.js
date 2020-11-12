import mongoose from 'mongoose';

export const ATLAS_URL = process.env.MONGO_URI; // setting the uri to appropriate.

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
