import jwt  from "jsonwebtoken";
import { db } from "../db.js";

export const home=(req,res)=>{
    return res.json("home")
}
export const addBoard=(req,res)=>{
    const token=req.cookies.access_token;
    console.log(req.cookies)
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
        const q="INSERT INTO board (`name`,`uid`) VALUES (?,?)"
        db.query(q,[req.body.board,userInfo.id],(err,data)=>{
            if(err){return res.status(500).json(err)}
            console.log(data)
            return res.status(200).json("Board inserted")
        })
    })
    
}
export const getBoards=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
        const q="SELECT b.name,b.id FROM  board b JOIN users u ON b.uid=u.id WHERE u.id=?"
        db.query(q,[userInfo.id],(err,data)=>{
            if(err){return res.status(500).json(err)}
            
            return res.status(200).json(data);
        })
    })
}
export const postCategory=(req,res)=>{
    const token=req.cookies.access_token;
   
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
        let q="";
        
        if(req.body.category==="todo"){
            
            q="INSERT INTO todo (`content`,`userid`,`bid`) VALUES (?,?,?)";
            db.query(q,[req.body.task,userInfo.id,req.params.id],(err,data)=>{
            
                if(err){return res.status(500).json(err)}
                
                return res.status(200).json(data)})
        }
        else if(req.body.category==="doing"){
            q="INSERT INTO doing (`content1`,`uid1`,`bid1`) VALUES (?,?,?)";
            db.query(q,[req.body.task,userInfo.id,req.params.id],(err,data)=>{
                
                if(err){return res.status(500).json(err)}
                
                return res.status(200).json(data)})
        }
        else if(req.body.category==="done"){
            q="INSERT INTO done (`content2`,`uid2`,`bid2`) VALUES (?,?,?)";
            db.query(q,[req.body.task,userInfo.id,req.params.id],(err,data)=>{
            
                if(err){return res.status(500).json(err)}
                
                return res.status(200).json(data)})
        }
        
    })
}
export const getCategory=(req,res)=>{
    const token=req.cookies.access_token;
    
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
    const q="SELECT content,id FROM todo WHERE userid=? AND bid=? "
    db.query(q,[userInfo.id,req.params.id],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
    
    })
}
export const getCategory1=(req,res)=>{
    const token=req.cookies.access_token;
    
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
    const q="SELECT content1,id FROM doing WHERE uid1=? AND bid1=? "
    db.query(q,[userInfo.id,req.params.id],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
    
    })
}
export const getCategory2=(req,res)=>{
    const token=req.cookies.access_token;
    
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
    const q="SELECT content2,id FROM done WHERE uid2=? AND bid2=? "
    db.query(q,[userInfo.id,req.params.id],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
    
    })
}
export const deleteTodoTask=(req,res)=>{
    
    const token=req.cookies.access_token;
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
     const q="DELETE FROM todo WHERE id=? AND userid=? AND bid=?"
     db.query(q,[req.body.id,userInfo.id,req.body.bid],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
     
    })
}
export const deleteDoingTask=(req,res)=>{
    
    const token=req.cookies.access_token;
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
     const q="DELETE FROM doing WHERE id=? AND uid1=? AND bid1=?"
     db.query(q,[req.body.id,userInfo.id,req.body.bid],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
     
    })
}
export const deleteDoneTask=(req,res)=>{
    
    const token=req.cookies.access_token;
    if(!token){return res.status(500).json("Not Authenticated!")}
    jwt.verify(token,'secret',(err,userInfo)=>{
        if(err){return res.status(403).json(err)}
     const q="DELETE FROM done WHERE id=? AND uid2=? AND bid2=?"
     db.query(q,[req.body.id,userInfo.id,req.body.bid],(err,data)=>{
        if(err){return res.status(500).json(err)}
        return res.status(200).json(data)})
     
    })
}