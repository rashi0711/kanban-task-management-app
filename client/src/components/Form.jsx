import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Form = () => {
    
    const [inputs,setInputs]=useState({task:"",category:""})
    const navigate=useNavigate()
    const handleChange=(e)=>{
        e.preventDefault()
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const boardId=JSON.parse(localStorage.getItem('board')).id
          const result=await axios.post(`/postCategory/${boardId}`,inputs)
          if(result.status===200){
            console.log("success");
            navigate('/')
          }
          else{
            console.log("error")
          }
        }
        catch(err)
        {
          console.log(err)
        }
       }
      return (
        <div className='register'>
          
          <div className='form'>
          <h4>Add New Task</h4>
            <form className='register-form'>
            <div className="row mb-3">
              <div className="col">
                <input type="text"  placeholder="Enter task to be completed..." name="task" className="form-control" id="inputname3"  onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
               <select name="category" id="category" className='form-select category' onChange={handleChange}>
                <option className='category main'>Select category you want to add task in it...</option>
                <option  className="category" value="todo">Todo</option>
                <option className="category" value="doing">Doing</option>
                <option className="category" value="done">Done</option>
               </select>
              </div>
            </div>
            <button type="submit" className="btn w-100" onClick={handleSubmit}>Create</button>
          </form>
          
       </div>
       </div>
      )
    }
    
    export default Form