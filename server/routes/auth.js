import express from 'express'
import { register } from '../controllers/register.js';
import { login, logout } from '../controllers/login.js';
import jwt from "jsonwebtoken";

const router=express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

router.get('/login/success',(req,res)=>
{
    if(req.user)
    {
        res.status(200).json({
            success:true,
            message:"success",
            user:{
                username:req.user.username,
                email:req.user.email,
                id:req.user.id,
                img:req.user.img
            },
            token:jwt.sign({ id: req.user.id }, 'secret'),
            typeLogin:"google",
            cookies:req.cookies
        })
    }
    
})

export default router;

