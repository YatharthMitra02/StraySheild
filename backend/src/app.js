import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cookieParser());

import authRouter from './routes/user.routes.js'
app.use('api/auth', authRouter);

// health check — just to verify backend is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running' });
});



export default app;