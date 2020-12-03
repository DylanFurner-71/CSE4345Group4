import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { mongooseConnect } from "./atlasConnect.js";
const app = express();
app.use(cors());
app.use(express.json());
mongooseConnect();
//routes to our app
app.get("/", (req, res) => {
  res.send("/ is running just fine");
});

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});