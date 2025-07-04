import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
import { connectDB } from "./src/lib/db.js";
import authRoutes from './src/routes/auth.route.js';
import messageRoute from './src/routes/message.route.js'
import { app ,server} from "./src/lib/socket.js";

dotenv.config();

const PORT=process.env.PORT;
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoute);

if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*splat}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log("Server is Running on PORT:"+PORT);
    connectDB();
});