import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.js';
import { mongooseConnect } from './atlasConnect.js';
import { fileURLToPath } from 'url';
import __dirname from './dirname.js';
const app = express();
app.use(cors());
app.use(express.json());
mongooseConnect();

app.use(express.static(path.join(__dirname, 'client', 'build')));

//routes to our app
app.get('/', (req, res) => {
    res.send('/ is running just fine');
});

routes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
