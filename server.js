const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const { log } = require('console');
const https = require('https')
import routes from './routes/index.js';
require('dotenv').config();
import {ATLAS_URL} from '/Users/dylanfurner/Desktop/haircutUber/atlasConnect.js';
const app = express();
app.use(cors()); //configure the app
app.use(express.json()); //configure the app
app.use(router);
//create the express.js object
const port = 3000;
const url = ATLAS_URL; //this might be only temporary
/**
    * Middleware
    */
   const fs = require('fs');
   const key = fs.readFileSync('./key.pem');
   const cert = fs.readFileSync('./cert.pem');

// const connection = mongoose.connection;
// connection.set({useNewUrlParser: true, useCreateIndex: true});
// connection.once('open', () => { //i think this is where you do calls to the database. Probably going to make it asynchronous
//   console.log("Mongo DB database connection established successfully");
// })

//set up some configs for express.
const config = {
  name: 'haircut-uber',
  port: port,
  host: 'localhost',    //this can be changed to local host for personal testing
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
// app.use();
routes(app);

//GET /
app.get('/', (req, res) => {
  res.send(`${config.host} / is running just fine`);
});

/* need to install the comment thing */



const server = https.createServer({key: key, cert: cert }, app);
//connecting the express object to listen on a particular port as defined in the config object.
 function connectMongoose(){
  console.log("connecting mongoose");
mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(() => {
 console.log('MongoDB Connected…');
})
}
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.log(`${config.name} running on ${config.host}:${config.port}`);
 connectMongoose();
});
