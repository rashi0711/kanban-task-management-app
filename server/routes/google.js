import express from 'express'
import passport from 'passport';
const router=express.Router();
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/users/auth/google/callback',passport.authenticate('google',{failureRedirect:'/auth/login'}))
export default router;