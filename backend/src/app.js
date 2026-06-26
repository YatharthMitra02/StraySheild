import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/user.routes.js'
import reportRouter from './routes/report.routes.js' 
import ngoRoutes from './routes/ngo.route.js'
import reelRoutes from './routes/reel.route.js'

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cookieParser());


app.use('/api/auth', authRouter); // for-> login, logout
app.use('/api/reports', reportRouter);// for-> for sending the report from frontend
app.use('/api/ngo', ngoRoutes);// for sending creating the ngo and sending the  all ngo information
app.use('/api/reels', reelRoutes);

// health check — just to verify backend is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running' });
});



export default app;