import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors';
import bookRouter from './routers/book.router';
import loginRouter from './routers/login.router';
import { dbConnect } from './configs/db.config';

dbConnect();

const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.use("/api/books", bookRouter)

app.use("/api/users/login", loginRouter)

const port = 5000;
app.listen(port, ()=>{
    console.log("Servito su http://localhost:" + port);
})