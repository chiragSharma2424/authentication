import express from 'express';
import { Server } from 'socket.io'
const app = express();
const port = 3000;
const server = new Server(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});