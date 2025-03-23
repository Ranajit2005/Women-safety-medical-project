import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/dbConnection.js';


dotenv.config();

const app = express();
const PORT = 3000;
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
