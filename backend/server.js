import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
})
const  port = 3000;
connectDB();


app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})

