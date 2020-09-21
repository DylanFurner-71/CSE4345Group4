const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import routes from './routes/index.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<sample_airbnb>?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
//routes to our app
app.get('/', (req, res) => {
res.send('/ is running just fine');
});

routes(app);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});






// const mongoose = require('mongoose');
// const express = require('express');
// const router = require('express').Router();
// const cors = require('cors');
// const { log } = require('console');
// const https = require('https')
// import routes from './routes/index.js';
// require('dotenv').config();
// import {ATLAS_URL} from '/Users/dylanfurner/Desktop/haircutUber/atlasConnect.js';
// const app = express();
// app.use(cors()); //configure the app
// app.use(express.json()); //configure the app
// app.use(router);
// //create the express.js object
// const port = 3000;
// const url = port; //this might be only temporary
// const {MongoClient} = require('mongodb');
// // console.log(ATLAS_URL);
// // const client = new MongoClient(ATLAS_URL);
// const client = new MongoClient(uri, { useNewUrlParser: true });

// /**
//     * Middleware
//     */
//    const fs = require('fs');
//    const key = fs.readFileSync('./key.pem');
//    const cert = fs.readFileSync('./cert.pem');

// //set up some configs for express.
// const config = {
//   name: 'haircut-uber',
//   port: port,
//   host: 'localhost',    //this can be changed to local host for personal testing
// };
// /*
//       ------- ERROR HANDLING ------------
// */
// // catch 400
// app.use((err, req, res, next) => {
//     console.log(err.stack);
//     res.status(400).send(`Error: ${res.originUrl} not found`);
//     next();
// });

// // catch 500
// app.use((err, req, res, next) => {
//     console.log(err.stack)
//     res.status(500).send(`Error: ${err}`);
//     next();
// });




// //GET /


// //app mongoose connection
// /* need to install the comment thing */


// function listDatabases(client){
//   console.log('trying to list databases');
// if (!databasesList){
//   console.log("We aren't finding the database");
// }
// console.log(databasesList);
//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - testHaircutBE`));
// };

// client.connect(err => {
//   // perform actions on the collection object
//   console.log('we are inside of client.connect()1234 ');
//   listDatabases(client);
//   client.close();
// });
// const server = https.createServer({key: key, cert: cert }, app);
// //connecting the express object to listen on a particular port as defined in the config object.
// async function connectMongoose (){
//   const uri = "mongodb+srv://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<testHaircutBE>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log('we are inside of client.connect() ');
//   listDatabases(client);
//   client.close();
// });


// //   console.log("connecting mongoose");
// // mongoose.connect(url, {
// //  useNewUrlParser: true,
// //  useUnifiedTopology: true
// // })
// // .then(() => {
// //  console.log('MongoDB Connected…');
// // })
// // try {
// // await client.connect();
// // await listDatabases(client);
// // console.log("just tried connection to mongoDB");
// // } catch(e) {
// //   console.log(e);
// //   console.log('Error connection to mongoDB azure');
// // } finally {
// //   await client.close();
// //}
// }



// app.listen(config.port, config.host, (e) => {
//   if (e) {
//     throw new Error('Internal Server Error');
//   }
//   // connectMongoose();
//   console.log(`${config.name} running on ${config.host}:${config.port}`);

// });
