/*eslint-disable*/
import { default as mongodb } from "mongodb";
const MongoClient = mongodb.MongoClient;

//const dbName = "testHaircutBE"; //the name of our database
//our db
//export const ATLAS_URL = `mongodb+srv://dfurner:<smu2020>@cluster0.tkm1w.azure.mongodb.net/<${dbName}>?retryWrites=true&w=majority`;
//my db
const dbName = "Testing";
export const ATLAS_URL = `mongodb+srv://Corey:dyell1414@cluster0.i9dup.mongodb.net/${dbName}?retryWrites=true&w=majority`; //We are configuring urls here
const client = new MongoClient(ATLAS_URL);
export default class atlassConnect {

}

 export async function connect(){
    console.log('we are here234234234234');
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
 


  
  
