import React, { useContext } from 'react'
import '../Css files/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext';

function Navbar() {
  const {LoggedIn,user,logout} = useContext(UserContext);
  const Navi = useNavigate();
  const HandleLogin = ()=>{
    Navi('/Login');
  }
  const HandleSignUp = ()=>{
    Navi('/Signup');
  }
  const HandleEvents = ()=>{
    Navi('/Events');
  }
  const HandleHome = ()=>{
    Navi('/Home');
  } 
  const HandleCreate = ()=>{
    Navi('/CreateEvent');
  }
  const HandleLogout = ()=>{
    logout();
    Navi('/Home');
  }
  return (
    <div className="NavbarMainDiv">
            <h1>Happenz</h1>
        <div className="NavLinks">

            <button onClick={HandleHome}>Home</button>
            <button onClick={HandleEvents}>Events</button>
            {LoggedIn?<button onClick={HandleCreate}>Create</button>:null}
            {!LoggedIn?<button onClick={HandleLogin}>Login</button>:null}
            {!LoggedIn?<button onClick={HandleSignUp}>Sign Up</button>:null}
            {LoggedIn?<img className='ProfilepicImg' src={user.ProfilePic} alt="" />:null}
            {/* {LoggedIn?<button onClick={HandleLogout}>Logout</button>:null} */}
            
        </div>
    </div>
  )
}

export default Navbar