import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [inputs,setInputs]=useState({username:"",email:"",password:""});
  const [file, setFile] = useState(null);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let imgUrl = "";
      if (file) {imgUrl = await upload();}
      await axios.post("/auth/register",{inputs,img:imgUrl})
      navigate('/auth/login')
    }
    catch(err)
    {
      console.log(err)
    }
   }
   const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='register'>
      
      <div className='form'>
      <h4>Register</h4>
        <form className='register-form'>
        <div className="row mb-3">
          <div className="col">
            <input type="text"  placeholder="Enter your username..." name="username"className="form-control" id="inputname3" onChange={handleChange}  autoComplete='true'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="email" className="form-control" name="email" placeholder="Enter your email..." id="inputEmail3" onChange={handleChange}  autoComplete='true'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="password"  placeholder="Enter your password..." name="password"className="form-control" id="inputPassword3" onChange={handleChange} autoComplete='true'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
              <input
              type="file"
              id="file"
              className="form-control file"
              autoComplete='true'
              onChange={(e) => setFile(e.target.files[0])
                }
            />
          </div>
        </div>
        
        <button type="submit" onClick={handleSubmit}className="btn w-100">Sign in</button>
      </form>
      <span className='small register-span'>
          Do you have an account? <Link to="/auth/login" className='span-login'>Login</Link>
        </span>
   </div>
   </div>
  )
}

export default Register