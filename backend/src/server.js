import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routers/routes';
import userRoutes from './routers/user'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

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

