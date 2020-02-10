import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routers/routes';
import userRoutes from './routers/user'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT | 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(routes, userRoutes);

//connect to mongodb
mongoose.connect(
    `mongodb://127.0.0.1:27017/db_management`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

app.listen(port, () => {
    console.log('Web server is listening on port ' + port +'.')
});

