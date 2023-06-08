
import { db } from "../db.js";
import passport from 'passport'
import crypto from 'crypto'
import {Strategy as GoogleStrategy} from 'passport-google-oauth2'
import 'dotenv/config'
passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:8800/users/auth/google/callback"
    
},

function(req,accessToken,refreshToken,profile,done)
{
    
    const q="SELECT * FROM users WHERE email=?"
    db.query(q,[profile.emails[0].value],(err,data)=>{
        if(err)
        {
            console.log("err....1",err)
        }
        else if(data.length!==0)
        {
            
            const {password,...other}=data[0] 
            return done(null,data[0])
        }
        else
        {
            const q1="INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?,?,?,?)";
            db.query(q1,[profile.displayName,profile.emails[0].value,crypto.randomBytes(20).toString('hex'),profile.photos[0].value],(err,data)=>{
            
                if(err)
                {console.log(err)}
                else
                {
                const {password,...other}=data[0] 
                return done(null,data[0])
                }
        })
            
            
        }
    })
}
)
)
passport.serializeUser(function(user,cb)
{
  cb(null,user)
})
passport.deserializeUser(function(user,cb)
{
  cb(null,user)
})
export default passport;