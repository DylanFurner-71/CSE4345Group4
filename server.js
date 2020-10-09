import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { mongooseConnect } from "./atlasConnect.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
mongooseConnect();

//routes to our app
app.get("/", (req, res) => {
  res.send("/ is running just fine");
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
