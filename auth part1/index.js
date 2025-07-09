import express, { urlencoded } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: 'localhost: 3000'
}))

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});