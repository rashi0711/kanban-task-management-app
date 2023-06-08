
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import 'dotenv/config'
export const login=(req,res)=>{
  const {username,password}=req.body;
  const q="SELECT * FROM users WHERE username=?"
  db.query(q,[username],(err,data)=>{
    if(err){return res.status(500).json(err)}
    if(data.length===0){return res.status(404).json("User not found!")}
    const result=bcrypt.compareSync(password,data[0].password)
    if(result){
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET)
        const typeLogin="simple"
        const {password,...other}=data[0] 
        res.cookie("access_token", token)
        .status(200)
        .json({other,token,typeLogin}  )
        
    }
    else{
        return res.status(500).json("Invalid username or password!!")
    }
  })
}
export const logout=(req,res)=>{
    res.clearCookie('access_token',{sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
}