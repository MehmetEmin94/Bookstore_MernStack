import express, { request, response } from "express";
import { port,mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app=express();

app.use(express.json());

app.use(cors());

app.use(
    cors(
        {
           origin:'http://localhost:5173',
           methods:['GET','POST','PUT','DELETE'],
           allowedHeaders: ['Content-Type'] 
        }
    )
);

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome");
    });

app.use('/books',booksRoute);


mongoose.connect(mongoDbUrl)
.then(()=>
{
console.log("App connected to db");
app.listen(port,()=>{
    console.log(`App is listening the port : ${port}`);
});
})
.catch((error)=>
{
console.log(error);
});