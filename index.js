import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/restaraunt', router);

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Connected to DB');
        app.listen(process.env.PORT, err => {
            if (err) {
                throw new Error(err);
            }
            console.log('SERVER STARTED ON PORT ' + process.env.PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

startApp();
