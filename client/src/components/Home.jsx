import React, { useState ,useEffect} from 'react'

import MainContent from './MainContent.jsx'

import axios,{} from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.css'
import SideContent from './SideContent.jsx'
const Home = () => {
 
  const [query, setQuery] = useState(JSON.parse(localStorage.getItem("board")) || null)
  const [board, setBoard] = useState("")
  const [allboard,setAllboard]=useState([])
  const [newboard,setNewboard]=useState("")
  
  const navigate=useNavigate();
  const handleClick=async(e)=>{
    e.preventDefault();
    const res=await axios.post("/addBoard",{board:board});
    if(res.status===200){
     setNewboard(board)
     setBoard("");
     document.getElementById('board_input').value="";
     
    }
   }
   
  
   useEffect(() => {
     const getBoard=async()=>{
       try{
         const result=await axios.get("/getBoards")
         if(result.status===200){
           setAllboard(result.data)
         }

       }catch(err)
       {
         console.log(err)
       }
 
       
     }
   
     getBoard();
    
   }, [newboard])
   
    
  return (
    <div className="home-page">
    <div className="sideContent">
      <span className="small sideContent-heading">
        ALL BOARDS ({allboard.length})
      </span>
      <ul className="list-group sideContent-list">
        {allboard.length!==0 && allboard.map((sboard)=>
            (<li className="list-group-item sideContent-list-item " key={sboard.id} onClick={(e)=>{e.preventDefault();setQuery(sboard);window.localStorage.setItem('board',JSON.stringify(sboard));navigate('/')}}><i className="fa-solid fa-border-all"></i>{sboard.name}</li>)
        )}
      <form>
      <div className="row mb-3">
        <div className="col create">
        <input type="text"  placeholder="Create New Board...." className="new-board-item create-board"  id="board_input"  onChange={(e)=>{setBoard(e.target.value)}}/>
        <Link to="/addBoard"><button type="submit" className='create-button' onClick={handleClick}>+</button></Link>
        </div>
      </div>
      </form>
      </ul>
    </div>
       {query!==null?<MainContent query={query}/>:<SideContent/>}
    </div>
  )
}

export default Home