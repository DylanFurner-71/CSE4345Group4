const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { log } = require('console');
const https = require('https')
import routes from './routes/index.js';
import { MongoClient } from 'mongodb';
require('dotenv').config();

export async function runClient(){
  try {
      await client.connect();
      console.log("Connected correctly to server");

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
};

const dbName = "testHaircutBE"; //the name of our database
let ATLAS_URL = `mongodb://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<${dbName}>?retryWrites=true&w=majority`; //We are configuring urls here
//create the express.js object
const app = express(); //CREATE EXPRESS app
app.use(cors()); //configure the app
app.use(express.json()); //configure the app
const port = 3000;
const url = ATLAS_URL;
/**
    * Middleware
    */
   const fs = require('fs');
   const key = fs.readFileSync('./key.pem');
   const cert = fs.readFileSync('./cert.pem');
   mongoose.connect( url);
const connection = mongoose.connection;
connection.set({useNewUrlParser: true, useCreateIndex: true});
connection.once('open', () => { //i think this is where you do calls to the database. Probably going to make it asynchronous
  console.log("Mongo DB database connection established successfully");
})
const client = new MongoClient(url);

runClient();

//set up some configs for express.
const config = {
  name: 'haircut-uber',
  port: port,
  host: '0.0.0.0',    //this can be changed to local host for personal testing
};
//we can expand our error checking here and should to make sure mongo db and connection are set up 
// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});
//create a logger object.  Using logger is preferable to simply writing to the console.
// const logger = log({ console: true, file: false });
//Attempting to connect to the database

//GET /
app.get('/', (req, res) => {
  res.send({}`${config.host} / is running just fine`);
});

/* need to install the comment thing */

//GET request
app.get('/home', (req, res) => {
  res.status(200).send('Go to home.')
});


const server = https.createServer({key: key, cert: cert }, app);
//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.log('We made it baby');
  console.log(`${config.name} running on ${config.host}:${config.port}`);
});

/*

async function runClient() {
  try {
      await client.connect();
      console.log("Connected correctly to server");

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

run().catch(console.dir);
*/

routes(app);