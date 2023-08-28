import dotenv from 'dotenv'
dotenv.config()
// Viene importato il modulo dotenv per caricare le variabili d'ambiente da un file .env

import express from 'express';
import cors from 'cors';
import bookRouter from './routers/book.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/db.config';

dbConnect();

const app = express(); // Viene creata un'istanza dell'applicazione Express
app.use(express.json()) // JSON è il formato utilizzato per le richieste
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"] // consente solo richiesto cors provenienti dal frontend
}))

// registrazione dei router
app.use("/api/books", bookRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

const port = 5000;
app.listen(port, ()=>{
    console.log("Servito su http://localhost:" + port);
})
