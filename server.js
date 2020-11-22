import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { mongooseConnect } from './atlasConnect.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { __dirname } from './Util.mjs';
const app = express();
app.use(cors());
app.use(express.json());
mongooseConnect();
const thing = __dirname;
const dir = fileURLToPath(thing).replace('\\server.js', '');
app.use(express.static(path.join(dir, 'client', 'build')));

//routes to our app
app.get('/', (req, res) => {
    console.log(dir);
    res.send('/ is running just fine');
});

routes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
