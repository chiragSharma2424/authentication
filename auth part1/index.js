import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './utils/db.js';
import User from './models/user-model.js';
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

app.get('/', (req, res) => {
    res.send("hello world");
});

app.post('/', (req, res) => {
    const {firstName} = req.body;
    User.insertOne(firstName).then(() => {
        console.log("user created successfully")
    }).catch((err) => {
        console.log('something went wrong', err);
    });
    res.send({
        msg: "user created"
    })
})

db();

app.listen(port, () => {
    console.log(`server started on http://localhost:${process.env.PORT}`);
});