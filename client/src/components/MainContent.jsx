import React, { useEffect } from 'react'
import './style.css'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MainContent = ({query}) => {
  const [todos, setTodos] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [board,setBoard]=useState(query!==null?query.name:"")
  const navigate=useNavigate();
  useEffect(() => {
   
    
    
    const boardId=JSON.parse(localStorage.getItem('board')).id
    const getTodos=async()=>{
   
    try{
      const res=await axios.get(`/getCategory/todo/${boardId}`);
      if(res.status===200){
        setTodos(res.data)
        
      }}
      catch(err){
        console.log(err)
        }
    }
    const getDoing=async()=>{
      
      try{
        const res=await axios.get(`/getCategory/doing/${boardId}`);
        
        if(res.status===200){
          setDoing(res.data)
          
        }}
        catch(err){
          console.log(err)
          }
      }
      const getDone=async()=>{
       
        try{
          const res=await axios.get(`/getCategory/done/${boardId}`);
          if(res.status===200){
            
            setDone(res.data)
            
          }}
          catch(err){
            console.log(err)
            }
        }
    
    getTodos()
    getDoing()
    getDone()
    setBoard(query.name)
  }, [query],[todos],[done],[doing])
   
  const handleDeleteTodo=async(id)=>{
   try{
    const boardId=JSON.parse(localStorage.getItem('board')).id
    const res=await axios.post('/deleteTask/todo',{id:id,bid:boardId});
    if(res.status===200){
      todos.splice(todos.findIndex(e => e.id ===id ),1)
      setTodos(todos)
      console.log("Deleted successfully")
      navigate('/')
    }
    else{
      console.log("Not deleted")
    }
   }
   catch(err){
    console.log(err)
   }}
   const handleDeleteDoing=async(id)=>{
    try{
     const boardId=JSON.parse(localStorage.getItem('board')).id
     const res=await axios.post('/deleteTask/doing',{id:id,bid:boardId});
     if(res.status===200){
       doing.splice(doing.findIndex(e => e.id ===id ),1)
       setDoing(doing)
       console.log("Deleted successfully")
       navigate('/')
     }
     else{
       console.log("Not deleted")
     }
    }
    catch(err){
     console.log(err)
    }}
    const handleDeleteDone=async(id)=>{
      try{
       const boardId=JSON.parse(localStorage.getItem('board')).id
       const res=await axios.post('/deleteTask/done',{id:id,bid:boardId});
       if(res.status===200){
         done.splice(done.findIndex(e => e.id ===id ),1)
         setDone(done)
         console.log("Deleted successfully")
         navigate('/')
       }
       else{
         console.log("Not deleted")
       }
      }
      catch(err){
       console.log(err)
      }
  }
  return (
    <>
    <div className="main1">
    <div className="main1items">
    <h4 className='mainContent-mainheading'>{board.substring(0,1).toUpperCase()+board.substring(1)}</h4>
    <Link to='/addTasks'><button className='add-button' type='submit'><i className="fa-solid fa-plus "></i>Add New Task</button></Link>
    </div>
    <div className="mainContent">
      <div className="todo">
      <div className='circle circle1'></div>
       <span className='small sideContent-heading mainContent-heading'>
        TODO ({todos.length})
       </span>
       <ul className="list-group mainContent-list">
        {todos.length>0 && todos.map((todo)=>{
        return (<li className="list-group-item mainContent-list-item " key={todo.id}>
        
        <h6>{todo.content.substring(0,1).toUpperCase()+todo.content.substring(1)}</h6>
        <span className='small mainContent-subtask'>0 of 3 subtasks</span>
        <div className="icons">
       <i className="fa-solid fa-trash" onClick={()=>handleDeleteTodo(todo.id)}></i>
        
        </div>
        
        </li>)})}
      </ul>
      </div>
      <div className="doing">
      <div className='circle circle2'></div>
      <span className='small sideContent-heading mainContent-heading'>
        DOING ({doing.length})
       </span>
       <ul className="list-group mainContent-list">
       {doing.length>0 && doing.map((d)=>{
        return (<li className="list-group-item mainContent-list-item " key={d.id}>
        
        <h6>{d.content1.substring(0,1).toUpperCase()+d.content1.substring(1)}</h6>
        <span className='small mainContent-subtask'>0 of 3 subtasks</span>
        <div className="icons">
        <i className="fa-solid fa-trash" onClick={()=>handleDeleteDoing(d.id)}></i>
        
        </div>
        </li>)})}
      </ul>
      </div>
      <div className="done">
      <div className='circle circle3'></div>
      <span className='small sideContent-heading mainContent-heading'>
        DONE ({done.length})
       </span>
       <ul className="list-group mainContent-list">
       {done.length>0 && done.map((don)=>{
        return (<li className="list-group-item mainContent-list-item " key={don.id}>
        
        <h6>{don.content2.substring(0,1).toUpperCase()+don.content2.substring(1)}</h6>
        <span className='small mainContent-subtask'>0 of 3 subtasks</span>
        <div className="icons">
        <i className="fa-solid fa-trash" onClick={()=>handleDeleteDone(don.id)}></i>
        
        </div>
        </li>)})}
      </ul>
      </div>
    </div>
    </div>
    </>
  )
}

export default MainContent