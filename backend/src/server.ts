import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors';
import bookRouter from './routers/book.router'
import { dbConnect } from './configs/db.config';
dbConnect();

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.use("/api/books", bookRouter)

const port = 5000;
app.listen(port, ()=>{
    console.log("Servito su http://localhost:" + port);
})