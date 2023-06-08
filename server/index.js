import express from 'express'
import authRoutes from '../server/routes/auth.js'
import contentRoutes from '../server/routes/content.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import multer from 'multer'
import googlepassport from '../server/config/passport-google-oauth-2-strategy.js'
import googleRoutes from '../server/routes/google.js'
import passport from 'passport'
import 'dotenv/config'
const app=express()

app.use(express.json())
app.use(cookieParser());

const corsConfig={
    credentials:true,
    origin:true
}

app.use(cors(corsConfig))
app.use(cookieSession({name:"session",keys:[process.env.COOKIE_SESSION_KEY],maxAge:24*60*60*100,sameSite:true}))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  })
app.use(passport.initialize())
app.use(passport.session())

app.get('/users/auth/google',passport.authenticate('google',{scope:['profile','email']}))
app.get('/users/auth/google/callback',passport.authenticate('google',{failureRedirect:'http://localhost:3000/auth/register',successRedirect:'http://localhost:3000'}))
app.get('/logout',(req,res)=>{
  
  req.logout();
  res.clearCookie('session')
  res.redirect('http://localhost:3000/auth/login')
})
app.use('/auth',authRoutes)

app.use('/',contentRoutes)
app.listen(8800,function(err){
    if(err){console.log(err);}
    else{console.log("Server connected at port 8800")}
})