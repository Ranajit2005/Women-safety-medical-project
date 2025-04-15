import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//const http = require("http");
import http from 'http';
//const { Server } = require("socket.io");
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/dbConnection.js';
import authRouter from './routes/auth.route.js';
import articleRouter from './routes/article.route.js';
import chatRouter from './routes/chat.route.js';
import BlogRouter from './routes/blog.route.js';


dotenv.config();

const app = express();

//connect to database
connectDB();


//set up middlewares
const PORT = process.env.PORT || 5000;
const mode = process.env.OPERATION;
const FRONTEND_URL = mode === "production" ? process.env.FRONTEND_URL : 'http://localhost:5173';




const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.set("io", io); //Make io globally accessible in routes



app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [FRONTEND_URL],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))




//routes
app.use('/api/auth', authRouter);

app.use('/api/article', articleRouter);

app.use('/api/chat', chatRouter);

app.use('/api/posts', BlogRouter);







app.get('/', (req, res) => {
    res.send('Hello World , frontend url is ' + FRONTEND_URL);
});





io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});




server.listen(PORT, () => console.log(`Server is running at  http://localhost:${PORT}`));