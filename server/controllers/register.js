import bcrypt from 'bcrypt'
import { db } from '../db.js';
export const register=(req,res)=>{
  console.log(req.body)
  const {username,email,password}=req.body.inputs;
  const img=req.body.img;
  const q="SELECT * FROM users WHERE email=? OR username=?"
  db.query(q,[email,username],(err,data)=>{
    if(err){return res.status(500).json(err)}
    if(data.length){return res.status(409).json("User already exists!")}
    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt);
    const q1="INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?,?,?,?)";
    db.query(q1,[username,email,hashPassword,img],(err,data)=>{
    
        if(err){return res.status(409).json(err)}
        
        return res.status(200).json("User signed in successfully!! ");
    })
  })
}