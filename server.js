import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { mongooseConnect } from "./atlasConnect.js";
import {ALLELIGIBLE} from "./costmetologyData/fileParsing.js"; //This is going to be called in the logins backend once we figure that out now that we have create user/stylist functionality implemented
const app = express();
app.use(cors());
app.use(express.json());
mongooseConnect();
const a = ALLELIGIBLE(); //This is going to be called in the logins backend once we figure that out now that we have create user/stylist functionality implemented
// console.log(a);
//routes to our app
app.get("/", (req, res) => {
  res.send("/ is running just fine");
});

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
