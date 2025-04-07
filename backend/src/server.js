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


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [FRONTEND_URL],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))



let posts = []; // { id, user, content, comments: [{ user, text }] }

//routes
app.use('/api/auth', authRouter);

app.use('/api/article', articleRouter);

app.use('/api/chat', chatRouter);







app.get('/', (req, res) => {
    res.send('Hello World , frontend url is ' + FRONTEND_URL);
});



app.get("/api/posts", (req, res) => {
    res.json(posts);
});

app.post("/api/posts", (req, res) => {
    const post = { id: Date.now(), ...req.body, comments: [] };
    posts.push(post);
    io.emit("new_post", post);
    res.status(201).json(post);
});

app.post("/api/posts/:id/comment", (req, res) => {
    const post = posts.find(p => p.id === +req.params.id);
    if (post) {
        const comment = req.body;
        post.comments.push(comment);
        io.emit("new_comment", { postId: post.id, comment });
        res.status(201).json(comment);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// app.listen(PORT, () => {
//     console.log(`Server is running at  http://localhost:${PORT}`);

// })


server.listen(PORT, () => console.log(`Server is running at  http://localhost:${PORT}`));