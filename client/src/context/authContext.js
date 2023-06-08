
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {useCookies} from 'react-cookie'
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [typeLogin,setTypeLogin]=useState(JSON.parse(localStorage.getItem("typeLogin")) || "")
  const [toggle,setToggle]=useState(false)
  const [done,setDone]=useState(false)
  const [_,setCookies,removeCookies]=useCookies(['access_token'])
  
  
 
  const login = async (inputs) => {
    
    const res = await axios.post("/auth/login", inputs,{withCredentials:true})
    setCookies('access_token',res.data.token)
    setTypeLogin(res.data.typeLogin)
    setCurrentUser(res.data.other);
  }
 
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    removeCookies('access_token')
  };
  
  const loginGoogle=()=>{
    setToggle(!toggle)
  }
  const setValue=(res)=>{
    setCurrentUser(res.data.user)
    setCookies('access_token',res.data.token)
    setTypeLogin(res.data.typeLogin)
    setDone(!done)
  }
  const logoutGoogle=()=>{
    setCurrentUser(null);
    setTypeLogin("")
    removeCookies('access_token')
  }
  useEffect(() => {
    const details=async()=>{
      const res=await axios.get("http://localhost:8800/auth/login/success",{withCredentials:true})
      if(res && done===false)
       {
        setValue(res)
       }
    }
    details();
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem('typeLogin',JSON.stringify(typeLogin))
    
    
  },[currentUser,typeLogin,toggle]);
   
  
  return (
    <AuthContext.Provider value={{login,logout,currentUser,typeLogin,loginGoogle,logoutGoogle}}>
      {children}
    </AuthContext.Provider>
  );
};