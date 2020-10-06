import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://elisego45:120060@segoviacluster0.zz1fg.mongodb.net/testHaircutBE?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//routes to our app
app.get("/", (req, res) => {
  res.send("/ is running just fine");
});

routes(app);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
