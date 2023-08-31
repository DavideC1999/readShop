import { Router } from "express";
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import { User, UserDocument, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs'

const router = Router();


// endpoint per il login dell'utente
router.post("/login", asyncHandler( async (req, res) => {
    const {email, password} = req.body // recupero email e password 
    const user = await UserModel.findOne({email}) // ricerca utente se db

    // compara la password in chiaro inviata dall'utente con quella hashata presente nel db
    if(user && (await bcrypt.compare(password, user.password))){
        res.send(generateTokenResponse(user))
    }else{
        res.status(HTTP_BAD_REQUEST).send("Email or Password not valid!")
    }
}))

// endpoint per la registrazione
router.post('/register', asyncHandler( async (req, res) => {
      const {name, email, password, address, isAdmin} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST).send('Utente già esistente, fare il login!');
        return;
      }
  
      const enPassword = await bcrypt.hash(password, 10);

      const newUser:User = {
        name,
        email: email.toLowerCase(),
        password: enPassword,
        address,
        isAdmin: isAdmin
      }
  
      const dbUser = await UserModel.create(newUser);
      if(dbUser){
        res.send(generateTokenResponse(dbUser))
      }else{
        res.status(HTTP_BAD_REQUEST).send("Utente non registrato, riprova")
      }
}))

// genera un token che viene assegnato all'utente nel momento in cui effettua il login
const generateTokenResponse = (user: UserDocument) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin 
    }, process.env.JWT_SECRET!, { 
        expiresIn: "30d"
    }) 

    return { // struttura che rimando all'utente
        id: user._id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;