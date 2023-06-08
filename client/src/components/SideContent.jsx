import React from 'react'
import './style.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'
const SideContent = () => {
  const {currentUser}=useContext(AuthContext)
  return (
   <div className='sidebody'><h2>Welcome {currentUser && currentUser.username} to Kanban Management ✨</h2></div>
  )
}

export default SideContent