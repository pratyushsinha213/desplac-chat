import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// const app = express();

import { app, server } from './lib/socket.js';
import { CLIENT_URI, PORT } from './config/env.js';
import connectToDatabase from './database/mongoose.js';
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.route.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  // origin: CLIENT_URI,
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true
}));

app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

// app.get('/', (req, res) => {
//   res.send('Welcome to Desplac Chat!');
// });

server.listen(PORT, () => {
  console.log(`Desplac Chat Backend running on http://localhost:${PORT}`);
  connectToDatabase();
})