import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cors({
    orgin:"*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cookieParser());
app.use('/', (req,res)=>{
    res.send("hello world");
    console.log("i am on baby ");
}
)

export default app;