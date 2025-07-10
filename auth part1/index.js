import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './utils/db.js';
import userRoutes from './routes/user-routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(cors({
    origin: 'localhost: 3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1/users', userRoutes);

db();

app.listen(port, () => {
    console.log(`server started on http://localhost:${process.env.PORT}`);
});