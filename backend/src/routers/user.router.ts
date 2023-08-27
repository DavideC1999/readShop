import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import { User, UserDocument, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs'

const router = Router();

router.get("/seed", asyncHandler( async (req, res) => { // la connessione tra il database e il nostro codice è asincrona
    const usersCount = await UserModel.countDocuments();
       if(usersCount > 0){
           res.send("Seed is already done!");
           return;
       }
   
       await UserModel.create(sample_users);
       res.send("Seed is Done!");
   }))

  /*router.post("/editUser", asyncHandler(async(req, res) => {
    const {id} = req.body

    const user = await UserModel.findOne({ _id: id })

    if(user){
      res.send(user)
    }else{
      res.status(HTTP_BAD_REQUEST).send("Utente non trovato, riprova")
    }
  }))*/

router.post("/login", asyncHandler( async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.send(generateTokenResponse(user))
    }else{
        res.status(HTTP_BAD_REQUEST).send("Email or Password not valid!")
    }
}))

router.post('/register', asyncHandler( async (req, res) => {
      const {name, email, password, address, isAdmin} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST).send('User is already exist, please login!');
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

const generateTokenResponse = (user: UserDocument) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin 
    }, process.env.JWT_SECRET!, { 
        expiresIn: "30d"
    }) 

    return {
        id: user._id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;