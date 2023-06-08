import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../context/authContext.js'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [inputs,setInputs]=useState({username:"",password:""});
  const {login,loginGoogle}=useContext(AuthContext)
  const [user,setUser]=useState(null)
  const navigate=useNavigate()
  const [cookies,setCookies]=useCookies(['access_token'])
  useEffect(()=>{
    setUser(cookies.access_token) 
    if(cookies.access_token)
    {
      navigate('/')
    }
    
  },[user,cookies.access_token])
  const google=async()=>{
    window.open("http://localhost:8800/users/auth/google",'_self')
    loginGoogle()
  }
  const handleChange=(e)=>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      
      await login(inputs);
      navigate('/')
    }
    catch(err)
    { 
      console.log("err")
      console.log(err)
    }
  }
  return (
    <div className='register'>
      
    <div className='form'>
    <h4>Login</h4>
      <form className='register-form'>
      <div className="row mb-3">
        <div className="col">
          <input type="text"  placeholder="Enter your username..." name="username"className="form-control" id="inputname3" onChange={handleChange} autoComplete='true'/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input type="password"  placeholder="Enter your password..." name="password"className="form-control" id="inputPassword3" onChange={handleChange}  autoComplete='true'/>
        </div>
      </div>
      
      <button type="submit" onClick={handleSubmit} className="btn w-100">Sign up</button>
      <div className='ordiv'><span className='or'>OR</span></div>
      <div className="loginButton google" onClick={google}>
            <img src="https://www.outsystems.com/forge/DownloadResource.aspx?FileName=&ImageBinaryId=43951" alt="" className="icon" style={{width:"50px",height:"50px"}} />
            Sign in with Google
          </div>
      
      
        
       
      
    </form>
    <span className='small register-span'>
        Don't have an account? <Link to="/auth/register" className='span-login'>Register</Link>
      </span>
 </div>
 </div>
  )
}

export default Login