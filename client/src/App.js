

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Form from './components/Form.jsx';

import {useCookies } from 'react-cookie';





function App(){
  const [cookies,setCookies]=useCookies(['access_token'])
  const Layout = () => {
  
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };
  const ProtectedRoute=({children})=>{
    
  if(!cookies.access_token){
      
      return <Navigate to='/auth/login'/>
    }
     return children
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:'/',
          element:<ProtectedRoute><Home/></ProtectedRoute>
        },
        
        {
          path:'/addTasks',
          element:<Form/>
        },
        
        {
        path: "/auth/register",
        element: <Register/>
        },
        {
          path: "/auth/login",
          element: <Login/>
        }
      ]
    },
    
  ]);
  return (
    <div className="app">
      <div>
      <RouterProvider router={router} ></RouterProvider>
      </div>
    </div>
  )
}



export default App;
