import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { createServer } from 'http';
const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("hello world");
})

io.on('connection', (socket) => {
    console.log("user connected");
    console.log("Id ", socket.id);
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
});