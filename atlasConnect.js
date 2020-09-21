import { default as mongodb } from "mongodb";
const MongoClient = mongodb.MongoClient;

const dbName = "testHaircutBE"; //the name of our database
/* this is the db we will work with */
//export const ATLAS_URL = `mongodb+srv://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<${dbName}>?retryWrites=true&w=majority`; //We are configuring urls here

export const ATLAS_URL = `mongodb+srv://elisego45:120060@segoviacluster0.zz1fg.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(ATLAS_URL);
export default class atlassConnect {}

export async function connect() {
  console.log("we are here234234234234");
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
